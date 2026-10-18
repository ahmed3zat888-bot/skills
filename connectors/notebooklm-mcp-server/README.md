# NotebookLM MCP Server

MCP connector for **NotebookLM Enterprise** (Google Cloud, now branded Gemini Notebook Enterprise). It lets Claude create notebooks, load sources, share them and generate Audio Overviews through Google's official `v1alpha` API.

## Scope and limits

| Capability | Status |
|---|---|
| Create, get, list (recently viewed), delete, share notebooks | Supported |
| Add web pages, YouTube videos, raw text, Google Docs/Slides | Supported |
| Upload local files (PDF, DOCX, PPTX, XLSX, TXT, MD, audio, MP4, images) | Supported |
| Get and delete sources | Supported |
| Create and delete Audio Overviews | Supported |
| Ask questions, chat with a notebook, read notes or generated answers | **Not available**: Google publishes no API for it |
| Consumer NotebookLM (notebooklm.google.com, personal Gmail accounts) | **Not available**: no public API exists |

Requirements: a Google Cloud project with NotebookLM Enterprise set up, a NotebookLM Enterprise licence for the caller, and the **Cloud NotebookLM User** IAM role. Tools return clear errors when any of these is missing.

## Tools

| Tool | Purpose |
|---|---|
| `notebooklm_list_notebooks` | Recently viewed notebooks (API cap: last 500) |
| `notebooklm_get_notebook` | Notebook metadata and its sources |
| `notebooklm_create_notebook` | Create an empty notebook |
| `notebooklm_delete_notebooks` | Permanently delete notebooks |
| `notebooklm_share_notebook` | Grant owner / writer / reader access, or revoke it |
| `notebooklm_add_sources` | Batch-add URLs, YouTube, text, Drive Docs/Slides |
| `notebooklm_upload_file` | Upload a local file as a source |
| `notebooklm_get_source` | Source status and word/token counts |
| `notebooklm_delete_sources` | Remove sources |
| `notebooklm_create_audio_overview` | Generate the podcast-style Audio Overview, with optional focus and language |
| `notebooklm_delete_audio_overview` | Remove the existing Audio Overview |

## Install

```bash
cd connectors/notebooklm-mcp-server
npm install
npm run build
```

Node.js 20.3 or later.

## Authenticate

Pick one mode with `NOTEBOOKLM_AUTH_MODE`:

| Mode | Setup | Use when |
|---|---|---|
| `adc` (default) | `gcloud auth application-default login`, or a service-account key in `GOOGLE_APPLICATION_CREDENTIALS` | Notebooks, web/text/YouTube sources, uploads |
| `gcloud` | `gcloud auth login --enable-gdrive-access` | You add Google Docs/Slides from Drive (Google's documented route) |
| `token` | Set `NOTEBOOKLM_ACCESS_TOKEN` | Short tests; tokens expire after about 1 hour |

## Configure

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `NOTEBOOKLM_PROJECT_NUMBER` | Yes | | Google Cloud project **number** (not the project ID) |
| `NOTEBOOKLM_LOCATION` | No | `global` | Data store location: `global`, `us` or `eu` |
| `NOTEBOOKLM_ENDPOINT_LOCATION` | No | matches location | API multi-region host prefix |
| `NOTEBOOKLM_AUTH_MODE` | No | `adc` | `adc`, `gcloud` or `token` |

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "node",
      "args": ["/absolute/path/to/connectors/notebooklm-mcp-server/dist/index.js"],
      "env": {
        "NOTEBOOKLM_PROJECT_NUMBER": "123456789012",
        "NOTEBOOKLM_LOCATION": "global",
        "NOTEBOOKLM_AUTH_MODE": "gcloud"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add notebooklm \
  -e NOTEBOOKLM_PROJECT_NUMBER=123456789012 \
  -e NOTEBOOKLM_AUTH_MODE=gcloud \
  -- node /absolute/path/to/connectors/notebooklm-mcp-server/dist/index.js
```

## Example requests to Claude

- "Create a notebook called 'Clienteling Playbook 2026', add these three URLs and the PDF at ~/Docs/service-standards.pdf, then share it as reader with the store managers' emails."
- "Generate an Audio Overview of notebook X in Arabic focused on objection handling."
- "Which of my recent notebooks have sources still processing?"

## Verify

```bash
npm run build && npm run smoke
```

The smoke test checks the tool list, annotations and input validation. With `NOTEBOOKLM_PROJECT_NUMBER` and credentials set, it also calls the live list endpoint.

## Sources

- Google Cloud, *Create and manage notebooks (API)*: https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks
- Google Cloud, *Add and manage data sources in a notebook (API)*: https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-notebooks-sources
- Google Cloud, *Manage audio overview of your notebook (API)*: https://docs.cloud.google.com/gemini/enterprise/notebooklm-enterprise/docs/api-audio-overview
- Google Cloud, *notebooks.listRecentlyViewed reference*: https://docs.cloud.google.com/gemini/enterprise/docs/reference/rest/v1alpha/projects.locations.notebooks/listRecentlyViewed
- MCP TypeScript SDK v2: https://github.com/modelcontextprotocol/typescript-sdk
