/**
 * Client for the NotebookLM Enterprise API (Discovery Engine v1alpha, notebooks resources).
 * Docs: https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { GoogleAuth } from "google-auth-library";

const execFileAsync = promisify(execFile);

export const PROJECT_NUMBER = process.env.NOTEBOOKLM_PROJECT_NUMBER ?? "";
export const LOCATION = process.env.NOTEBOOKLM_LOCATION ?? "global";
// Multi-region prefix of the API host: "us", "eu" or "global"
export const ENDPOINT_LOCATION =
  process.env.NOTEBOOKLM_ENDPOINT_LOCATION ?? (["us", "eu"].includes(LOCATION) ? LOCATION : "global");
const AUTH_MODE = process.env.NOTEBOOKLM_AUTH_MODE ?? "adc"; // "adc" | "gcloud" | "token"
const REQUEST_TIMEOUT_MS = 60_000;

const HOST = `https://${ENDPOINT_LOCATION}-discoveryengine.googleapis.com`;
export const PARENT = `projects/${PROJECT_NUMBER}/locations/${LOCATION}`;

// ---- Access tokens ----

const googleAuth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/cloud-platform"] });
let gcloudToken: { value: string; expires: number } | undefined;

async function getAccessToken(): Promise<string> {
  if (AUTH_MODE === "token") {
    const token = process.env.NOTEBOOKLM_ACCESS_TOKEN;
    if (!token) throw new Error("NOTEBOOKLM_AUTH_MODE=token requires NOTEBOOKLM_ACCESS_TOKEN.");
    return token;
  }
  if (AUTH_MODE === "gcloud") {
    // gcloud user credentials are the documented route for Google Drive sources
    if (gcloudToken && gcloudToken.expires > Date.now()) return gcloudToken.value;
    try {
      const { stdout } = await execFileAsync("gcloud", ["auth", "print-access-token"]);
      gcloudToken = { value: stdout.trim(), expires: Date.now() + 45 * 60_000 };
      return gcloudToken.value;
    } catch {
      throw new Error("Could not get a token from gcloud. Run `gcloud auth login --enable-gdrive-access` and retry.");
    }
  }
  try {
    const token = await googleAuth.getAccessToken();
    if (!token) throw new Error("empty token");
    return token;
  } catch {
    throw new Error(
      "No Google credentials found. Run `gcloud auth application-default login`, set GOOGLE_APPLICATION_CREDENTIALS, " +
        "or set NOTEBOOKLM_AUTH_MODE=gcloud."
    );
  }
}

// ---- Errors ----

function httpErrorMessage(status: number, detail: string): string {
  const suffix = detail ? ` Google said: ${detail}` : "";
  switch (status) {
    case 400:
      return `The request was rejected as invalid.${suffix}`;
    case 401:
      return `Google rejected the credentials. Refresh them (gcloud auth login / application-default login).${suffix}`;
    case 403:
      return (
        "Permission denied. The caller needs a NotebookLM Enterprise license and the Cloud NotebookLM User role " +
        `in project ${PROJECT_NUMBER}, and Drive access for Drive sources.${suffix}`
      );
    case 404:
      return `Not found. Check the notebook or source ID; notebooklm_list_notebooks returns valid notebook IDs.${suffix}`;
    case 409:
      return `Conflict. A notebook holds one audio overview at a time; delete the existing one first.${suffix}`;
    case 429:
      return `Rate limit or quota exceeded. Wait a minute before retrying.${suffix}`;
    default:
      return `The NotebookLM API returned HTTP ${status}.${suffix}`;
  }
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    detail: string
  ) {
    super(httpErrorMessage(status, detail));
  }
}

// ---- Requests ----

interface RequestOptions {
  method?: "GET" | "POST" | "DELETE";
  query?: Record<string, string | number | undefined>;
  json?: unknown;
  body?: Uint8Array;
  headers?: Record<string, string>;
  upload?: boolean;
  signal: AbortSignal;
}

export async function apiRequest<T>(path: string, options: RequestOptions): Promise<T> {
  if (!PROJECT_NUMBER) throw new Error("NOTEBOOKLM_PROJECT_NUMBER is not set. Set it to your Google Cloud project number.");

  const url = new URL(`${HOST}/${options.upload ? "upload/" : ""}v1alpha/${path}`);
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${await getAccessToken()}`,
    Accept: "application/json",
    ...options.headers
  };
  let body: string | Uint8Array | undefined;
  if (options.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.json);
  } else if (options.body) {
    body = options.body;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: options.method ?? "GET",
      headers,
      body,
      signal: AbortSignal.any([options.signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)])
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new Error("The NotebookLM API did not respond within 60 seconds. Try again.");
    }
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    const cause = error instanceof Error && error.cause instanceof Error ? error.cause.message : String(error);
    throw new Error(`Could not reach ${HOST}: ${cause}. Check network access and NOTEBOOKLM_ENDPOINT_LOCATION.`);
  }

  const text = await response.text();
  if (!response.ok) {
    let detail = text.slice(0, 500);
    try {
      detail = (JSON.parse(text) as { error?: { message?: string } }).error?.message ?? detail;
    } catch {
      // Non-JSON error body: keep the raw excerpt
    }
    throw new ApiError(response.status, detail);
  }
  return (text ? JSON.parse(text) : {}) as T;
}

// ---- Resource names ----

export function notebookPath(notebookId: string): string {
  return notebookId.startsWith("projects/") ? notebookId : `${PARENT}/notebooks/${encodeURIComponent(notebookId)}`;
}

export function sourceName(notebookId: string, sourceId: string): string {
  return sourceId.startsWith("projects/") ? sourceId : `${notebookPath(notebookId)}/sources/${encodeURIComponent(sourceId)}`;
}

export function notebookUrl(notebookId: string): string {
  const id = notebookId.split("/").pop();
  return `https://notebook.cloud.google.com/${LOCATION}/notebook/${id}?project=${PROJECT_NUMBER}`;
}
