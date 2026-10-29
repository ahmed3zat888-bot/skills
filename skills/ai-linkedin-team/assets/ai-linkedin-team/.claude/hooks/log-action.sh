#!/usr/bin/env bash
# Records every file write with a real timestamp. Agents cannot edit this log (denied in settings.json).
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
INPUT="$(cat)"
TOOL="$(printf '%s' "$INPUT" | sed -n 's/.*"tool_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
FILE="$(printf '%s' "$INPUT" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"
FILE="${FILE#$PROJECT_DIR/}"
printf '%s | hook | %s | %s\n' "$(date '+%Y-%m-%d %H:%M')" "${TOOL:-unknown}" "${FILE:--}" >> "$PROJECT_DIR/logs/system-log.md"
exit 0
