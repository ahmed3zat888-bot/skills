#!/usr/bin/env node
/**
 * MCP server for NotebookLM Enterprise (Gemini Notebook Enterprise).
 * Covers every documented v1alpha notebook, source and audio overview method. Serves stdio.
 */
import { readFile, stat } from "node:fs/promises";
import { basename, extname } from "node:path";
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { apiRequest, notebookPath, notebookUrl, PARENT, PROJECT_NUMBER, sourceName } from "./api.js";

const CHARACTER_LIMIT = 25_000;
const MAX_UPLOAD_BYTES = 200 * 1024 * 1024;

// Upload content types documented for notebooks.sources.uploadFile
const CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/m4a",
  ".wav": "audio/wav",
  ".aac": "audio/aac",
  ".ogg": "audio/ogg",
  ".opus": "audio/ogg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".jpeg": "image/jpeg"
};

// ---- Upstream shapes (fields the docs show; extra fields pass through untouched) ----

interface Notebook {
  name?: string;
  notebookId?: string;
  title?: string;
  emoji?: string;
  metadata?: { userRole?: string; isShared?: boolean; isShareable?: boolean; lastViewed?: string; createTime?: string };
  sources?: Source[];
  [key: string]: unknown;
}

interface Source {
  name?: string;
  sourceId?: { id?: string };
  title?: string;
  metadata?: Record<string, unknown>;
  settings?: { status?: string };
  [key: string]: unknown;
}

// ---- Formatting ----

const responseFormat = z
  .enum(["markdown", "json"])
  .default("markdown")
  .describe("'markdown' for readable text, 'json' for the full API response");

const notebookIdArg = z
  .string()
  .min(1)
  .describe("Notebook ID (e.g. '0a1b2c3d-...') or full resource name 'projects/.../notebooks/ID'");

function formatSource(source: Source): string {
  const status = source.settings?.status?.replace("SOURCE_STATUS_", "").toLowerCase() ?? "unknown";
  const words = source.metadata?.wordCount;
  return `- ${source.title ?? "(untitled)"} (id: ${source.sourceId?.id ?? "?"}, status: ${status}${words ? `, ${words} words` : ""})`;
}

function formatNotebook(nb: Notebook): string {
  const lines = [`## ${nb.emoji ? `${nb.emoji} ` : ""}${nb.title || "(untitled)"} (${nb.notebookId})`];
  const meta = nb.metadata ?? {};
  if (meta.userRole) lines.push(`- Your role: ${meta.userRole.replace("PROJECT_ROLE_", "").toLowerCase()}`);
  lines.push(`- Shared: ${meta.isShared ? "yes" : "no"}`);
  if (meta.createTime) lines.push(`- Created: ${new Date(meta.createTime).toUTCString()}`);
  if (meta.lastViewed) lines.push(`- Last viewed: ${new Date(meta.lastViewed).toUTCString()}`);
  if (nb.notebookId) lines.push(`- Open: ${notebookUrl(nb.notebookId)}`);
  if (nb.sources?.length) lines.push(`- Sources (${nb.sources.length}):`, ...nb.sources.map(s => `  ${formatSource(s)}`));
  return lines.join("\n");
}

function reply(format: "markdown" | "json", data: object, markdown: string) {
  if (format === "json") {
    return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }], structuredContent: data as Record<string, unknown> };
  }
  return { content: [{ type: "text" as const, text: markdown }] };
}

const READ = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true };
const WRITE = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true };
const DELETE = { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true };

// ---- Server factory ----

function createServer(): McpServer {
  const server = new McpServer({ name: "notebooklm-mcp-server", version: "1.0.0" });

  server.registerTool(
    "notebooklm_list_notebooks",
    {
      title: "List Recent Notebooks",
      description: `List the NotebookLM Enterprise notebooks the caller viewed recently (the API has no full listing; it returns up to the last 500).

Returns title, notebook ID, role, sharing state and timestamps. When more exist, the result gives next_page_token; call again with it.
Use notebooklm_get_notebook to see a notebook's sources.`,
      inputSchema: z.strictObject({
        page_size: z.number().int().min(1).max(500).default(50).describe("Maximum notebooks to return"),
        page_token: z.string().optional().describe("next_page_token from a previous call"),
        response_format: responseFormat
      }),
      annotations: READ
    },
    async ({ page_size, page_token, response_format }, ctx) => {
      const data = await apiRequest<{ notebooks?: Notebook[]; nextPageToken?: string }>(
        `${PARENT}/notebooks:listRecentlyViewed`,
        { query: { pageSize: page_size, pageToken: page_token }, signal: ctx.mcpReq.signal }
      );
      let notebooks = data.notebooks ?? [];
      const render = (items: Notebook[]) => {
        const truncated = items.length < (data.notebooks ?? []).length;
        const page = {
          count: items.length,
          notebooks: items,
          ...(data.nextPageToken ? { next_page_token: data.nextPageToken } : {}),
          ...(truncated ? { truncated: true, note: "Response shortened to fit; lower page_size to page through all." } : {})
        };
        const md = [`# Recently viewed notebooks (${items.length})`, "", items.map(formatNotebook).join("\n\n")];
        if (truncated) md.push("", "Output shortened to fit. Call again with a smaller page_size.");
        if (data.nextPageToken) md.push("", `More results: call again with page_token="${data.nextPageToken}".`);
        return { page, text: response_format === "json" ? JSON.stringify(page, null, 2) : md.join("\n") };
      };
      let result = render(notebooks);
      while (notebooks.length > 1 && result.text.length > CHARACTER_LIMIT) {
        notebooks = notebooks.slice(0, Math.ceil(notebooks.length / 2));
        result = render(notebooks);
      }
      if (notebooks.length === 0) return { content: [{ type: "text", text: "No recently viewed notebooks in this project." }] };
      return reply(response_format, result.page, result.text);
    }
  );

  server.registerTool(
    "notebooklm_get_notebook",
    {
      title: "Get Notebook",
      description: "Get one notebook with its metadata and the list of its sources (IDs, titles, processing status).",
      inputSchema: z.strictObject({ notebook_id: notebookIdArg, response_format: responseFormat }),
      annotations: READ
    },
    async ({ notebook_id, response_format }, ctx) => {
      const nb = await apiRequest<Notebook>(notebookPath(notebook_id), { signal: ctx.mcpReq.signal });
      return reply(response_format, nb, formatNotebook(nb));
    }
  );

  server.registerTool(
    "notebooklm_create_notebook",
    {
      title: "Create Notebook",
      description: "Create an empty notebook. Returns its notebook ID and browser link. Add content next with notebooklm_add_sources or notebooklm_upload_file.",
      inputSchema: z.strictObject({
        title: z.string().min(1).max(500).describe("Notebook title, e.g. 'Q3 Store Manager Onboarding'"),
        response_format: responseFormat
      }),
      annotations: WRITE
    },
    async ({ title, response_format }, ctx) => {
      const nb = await apiRequest<Notebook>(`${PARENT}/notebooks`, { method: "POST", json: { title }, signal: ctx.mcpReq.signal });
      return reply(response_format, nb, `Created notebook.\n\n${formatNotebook(nb)}`);
    }
  );

  server.registerTool(
    "notebooklm_delete_notebooks",
    {
      title: "Delete Notebooks",
      description: "Permanently delete one or more notebooks and their sources. Cannot be undone. The API returns success even for IDs that do not exist, so confirm IDs with notebooklm_get_notebook first.",
      inputSchema: z.strictObject({ notebook_ids: z.array(notebookIdArg).min(1).max(50).describe("Notebooks to delete") }),
      annotations: DELETE
    },
    async ({ notebook_ids }, ctx) => {
      await apiRequest(`${PARENT}/notebooks:batchDelete`, {
        method: "POST",
        json: { names: notebook_ids.map(notebookPath) },
        signal: ctx.mcpReq.signal
      });
      return { content: [{ type: "text", text: `Delete request accepted for ${notebook_ids.length} notebook(s).` }] };
    }
  );

  server.registerTool(
    "notebooklm_share_notebook",
    {
      title: "Share Notebook",
      description: `Share a notebook with users by email and role. Each user must already hold the Cloud NotebookLM User IAM role in the project.
Role 'not_shared' removes a user's access.`,
      inputSchema: z.strictObject({
        notebook_id: notebookIdArg,
        shares: z
          .array(
            z.strictObject({
              email: z.email().describe("User email, e.g. 'manager@company.com'"),
              role: z.enum(["owner", "writer", "reader", "not_shared"]).describe("Access to grant")
            })
          )
          .min(1)
          .max(100)
      }),
      annotations: { ...WRITE, idempotentHint: true }
    },
    async ({ notebook_id, shares }, ctx) => {
      await apiRequest(`${notebookPath(notebook_id)}:share`, {
        method: "POST",
        json: { accountAndRoles: shares.map(s => ({ email: s.email, role: `PROJECT_ROLE_${s.role.toUpperCase()}` })) },
        signal: ctx.mcpReq.signal
      });
      const list = shares.map(s => `- ${s.email}: ${s.role}`).join("\n");
      return { content: [{ type: "text", text: `Sharing updated:\n${list}\n\nVerify in the Share dialog: ${notebookUrl(notebook_id)}` }] };
    }
  );

  server.registerTool(
    "notebooklm_add_sources",
    {
      title: "Add Sources",
      description: `Add sources to a notebook in one batch: web pages, YouTube videos, raw text, or Google Docs/Slides from Drive.
Each item sets exactly one of url, youtube_url, text, or drive_document_id.
Sources are processed asynchronously; check status with notebooklm_get_notebook. For local files use notebooklm_upload_file.

Examples:
  - {"url": "https://example.com/report", "name": "Market report"}
  - {"text": "Session notes...", "name": "Coaching notes"}
  - {"drive_document_id": "1AbC...", "drive_type": "doc", "name": "SOP"}`,
      inputSchema: z.strictObject({
        notebook_id: notebookIdArg,
        sources: z
          .array(
            z
              .strictObject({
                name: z.string().max(500).optional().describe("Display name in the notebook"),
                url: z.url().optional().describe("Web page URL"),
                youtube_url: z.url().optional().describe("YouTube video URL"),
                text: z.string().min(1).optional().describe("Raw text content"),
                drive_document_id: z.string().optional().describe("Google Drive file ID (from its URL /d/<ID>/)"),
                drive_type: z.enum(["doc", "slides"]).default("doc").describe("Drive file type when drive_document_id is set")
              })
              .refine(s => [s.url, s.youtube_url, s.text, s.drive_document_id].filter(v => v !== undefined).length === 1, {
                message: "Set exactly one of url, youtube_url, text, drive_document_id"
              })
          )
          .min(1)
          .max(50),
        response_format: responseFormat
      }),
      annotations: WRITE
    },
    async ({ notebook_id, sources, response_format }, ctx) => {
      const userContents = sources.map(s => {
        if (s.url) return { webContent: { url: s.url, sourceName: s.name ?? s.url } };
        if (s.youtube_url) return { videoContent: { youtubeUrl: s.youtube_url } };
        if (s.text) return { textContent: { sourceName: s.name ?? "Pasted text", content: s.text } };
        return {
          googleDriveContent: {
            documentId: s.drive_document_id,
            mimeType: s.drive_type === "slides" ? "application/vnd.google-apps.presentation" : "application/vnd.google-apps.document",
            sourceName: s.name ?? s.drive_document_id
          }
        };
      });
      const data = await apiRequest<{ sources?: Source[] }>(`${notebookPath(notebook_id)}/sources:batchCreate`, {
        method: "POST",
        json: { userContents },
        signal: ctx.mcpReq.signal
      });
      const added = data.sources ?? [];
      return reply(response_format, data, `Added ${added.length} source(s):\n${added.map(formatSource).join("\n")}`);
    }
  );

  server.registerTool(
    "notebooklm_upload_file",
    {
      title: "Upload File Source",
      description: `Upload a local file as a notebook source. Supported: PDF, TXT, MD, DOCX, PPTX, XLSX, common audio (MP3, M4A, WAV, AAC, OGG), MP4, PNG, JPG.
The file path is read on the machine running this server.`,
      inputSchema: z.strictObject({
        notebook_id: notebookIdArg,
        file_path: z.string().min(1).describe("Absolute path to the file, e.g. '/Users/me/Docs/policy.pdf'"),
        display_name: z.string().max(500).optional().describe("Name shown in the notebook; defaults to the file name"),
        content_type: z.string().optional().describe("MIME type override; inferred from the extension when omitted")
      }),
      annotations: WRITE
    },
    async ({ notebook_id, file_path, display_name, content_type }, ctx) => {
      const type = content_type ?? CONTENT_TYPES[extname(file_path).toLowerCase()];
      if (!type) {
        return {
          isError: true,
          content: [{ type: "text", text: `Unsupported extension '${extname(file_path)}'. Supported: ${Object.keys(CONTENT_TYPES).join(", ")}, or pass content_type.` }]
        };
      }
      const info = await stat(file_path).catch(() => undefined);
      if (!info?.isFile()) return { isError: true, content: [{ type: "text", text: `No file at ${file_path}.` }] };
      if (info.size > MAX_UPLOAD_BYTES) {
        return { isError: true, content: [{ type: "text", text: `File is ${(info.size / 1e6).toFixed(0)} MB; this server uploads up to 200 MB.` }] };
      }
      const data = await apiRequest<{ sourceId?: { id?: string } }>(`${notebookPath(notebook_id)}/sources:uploadFile`, {
        method: "POST",
        upload: true,
        body: await readFile(file_path),
        headers: {
          "Content-Type": type,
          "X-Goog-Upload-File-Name": display_name ?? basename(file_path),
          "X-Goog-Upload-Protocol": "raw"
        },
        signal: ctx.mcpReq.signal
      });
      return { content: [{ type: "text", text: `Uploaded ${basename(file_path)} (source id: ${data.sourceId?.id ?? "unknown"}). Processing runs in the background.` }] };
    }
  );

  server.registerTool(
    "notebooklm_get_source",
    {
      title: "Get Source",
      description: "Get one source's title, processing status and metadata (word and token counts). Source IDs come from notebooklm_get_notebook.",
      inputSchema: z.strictObject({
        notebook_id: notebookIdArg,
        source_id: z.string().min(1).describe("Source ID or full source resource name"),
        response_format: responseFormat
      }),
      annotations: READ
    },
    async ({ notebook_id, source_id, response_format }, ctx) => {
      const data = await apiRequest<Source & { sources?: Source[] }>(sourceName(notebook_id, source_id), { signal: ctx.mcpReq.signal });
      // The docs show the response wrapped in a sources[] array; accept either shape
      const list = data.sources ?? [data];
      const md = list.map(s => `${formatSource(s)}\n  metadata: ${JSON.stringify(s.metadata ?? {})}`).join("\n");
      return reply(response_format, data, md);
    }
  );

  server.registerTool(
    "notebooklm_delete_sources",
    {
      title: "Delete Sources",
      description: "Permanently remove sources from a notebook. Cannot be undone.",
      inputSchema: z.strictObject({
        notebook_id: notebookIdArg,
        source_ids: z.array(z.string().min(1)).min(1).max(100).describe("Source IDs or full source resource names")
      }),
      annotations: DELETE
    },
    async ({ notebook_id, source_ids }, ctx) => {
      await apiRequest(`${notebookPath(notebook_id)}/sources:batchDelete`, {
        method: "POST",
        json: { names: source_ids.map(id => sourceName(notebook_id, id)) },
        signal: ctx.mcpReq.signal
      });
      return { content: [{ type: "text", text: `Removed ${source_ids.length} source(s).` }] };
    }
  );

  server.registerTool(
    "notebooklm_create_audio_overview",
    {
      title: "Create Audio Overview",
      description: `Start generating the notebook's audio overview (podcast-style discussion of its sources). Takes several minutes; listen in the notebook's Studio panel.
A notebook holds one audio overview at a time: delete the existing one first with notebooklm_delete_audio_overview.`,
      inputSchema: z.strictObject({
        notebook_id: notebookIdArg,
        source_ids: z.array(z.string().min(1)).optional().describe("Limit to these source IDs; all sources when omitted"),
        episode_focus: z.string().max(5000).optional().describe("Topics to emphasise, e.g. 'objection handling for high-value clients'"),
        language_code: z.string().optional().describe("BCP-47 language code, e.g. 'en', 'ar', 'fr'")
      }),
      annotations: WRITE
    },
    async ({ notebook_id, source_ids, episode_focus, language_code }, ctx) => {
      const data = await apiRequest<{ audioOverview?: { status?: string; audioOverviewId?: string } }>(
        `${notebookPath(notebook_id)}/audioOverviews`,
        {
          method: "POST",
          json: {
            ...(source_ids ? { sourceIds: source_ids.map(id => ({ id })) } : {}),
            ...(episode_focus ? { episodeFocus: episode_focus } : {}),
            ...(language_code ? { languageCode: language_code } : {})
          },
          signal: ctx.mcpReq.signal
        }
      );
      const status = data.audioOverview?.status ?? "unknown";
      return { content: [{ type: "text", text: `Audio overview requested (status: ${status}). Ready in a few minutes at ${notebookUrl(notebook_id)}` }] };
    }
  );

  server.registerTool(
    "notebooklm_delete_audio_overview",
    {
      title: "Delete Audio Overview",
      description: "Delete the notebook's existing audio overview so a new one can be generated.",
      inputSchema: z.strictObject({ notebook_id: notebookIdArg }),
      annotations: DELETE
    },
    async ({ notebook_id }, ctx) => {
      await apiRequest(`${notebookPath(notebook_id)}/audioOverviews/default`, { method: "DELETE", signal: ctx.mcpReq.signal });
      return { content: [{ type: "text", text: "Audio overview deleted." }] };
    }
  );

  return server;
}

if (!PROJECT_NUMBER) console.error("Warning: NOTEBOOKLM_PROJECT_NUMBER is not set; every tool call will fail until it is.");
serveStdio(createServer);
console.error("notebooklm-mcp-server running on stdio");
