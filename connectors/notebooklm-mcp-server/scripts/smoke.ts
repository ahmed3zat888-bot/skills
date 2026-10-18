/**
 * Self-check: starts the built server over stdio, checks the tool list and input validation,
 * and, when NOTEBOOKLM_PROJECT_NUMBER and credentials are set, lists notebooks for real.
 * Run with: npm run build && npm run smoke
 */
import { strict as assert } from "node:assert";
import { Client } from "@modelcontextprotocol/client";
import { getDefaultEnvironment, StdioClientTransport } from "@modelcontextprotocol/client/stdio";

const passthrough = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith("NOTEBOOKLM_") || key === "GOOGLE_APPLICATION_CREDENTIALS")
) as Record<string, string>;

const client = new Client({ name: "smoke-test", version: "1.0.0" });
await client.connect(
  new StdioClientTransport({ command: "node", args: ["dist/index.js"], env: { ...getDefaultEnvironment(), ...passthrough } })
);

const { tools } = await client.listTools();
assert.deepEqual(tools.map(t => t.name).sort(), [
  "notebooklm_add_sources",
  "notebooklm_create_audio_overview",
  "notebooklm_create_notebook",
  "notebooklm_delete_audio_overview",
  "notebooklm_delete_notebooks",
  "notebooklm_delete_sources",
  "notebooklm_get_notebook",
  "notebooklm_get_source",
  "notebooklm_list_notebooks",
  "notebooklm_share_notebook",
  "notebooklm_upload_file"
]);
for (const tool of tools) assert.ok(tool.annotations, `${tool.name} has no annotations`);

// Invalid arguments must come back as tool errors the model can read
const twoKinds = await client.callTool({
  name: "notebooklm_add_sources",
  arguments: { notebook_id: "x", sources: [{ url: "https://example.com", text: "both" }] }
});
assert.equal(twoKinds.isError, true, "a source with two content kinds should be rejected");

const badEmail = await client.callTool({
  name: "notebooklm_share_notebook",
  arguments: { notebook_id: "x", shares: [{ email: "not-an-email", role: "reader" }] }
});
assert.equal(badEmail.isError, true, "an invalid email should be rejected");

const badFile = await client.callTool({
  name: "notebooklm_upload_file",
  arguments: { notebook_id: "x", file_path: "/tmp/file.exe" }
});
assert.equal(badFile.isError, true, "an unsupported extension should be rejected");

// Live call: errors must surface as readable tool errors, never crash the server
const list = await client.callTool({ name: "notebooklm_list_notebooks", arguments: { page_size: 5 } });
const text = (list.content as { type: string; text: string }[])[0]?.text ?? "";
console.error(`list_notebooks -> isError=${Boolean(list.isError)}: ${text.slice(0, 300)}`);
if (!process.env.NOTEBOOKLM_PROJECT_NUMBER) {
  assert.equal(list.isError, true);
  assert.match(text, /NOTEBOOKLM_PROJECT_NUMBER/);
}

await client.close();
console.error("Smoke test passed");
