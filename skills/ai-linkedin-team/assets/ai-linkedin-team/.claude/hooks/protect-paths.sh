#!/usr/bin/env bash
# Blocks shell commands that touch the files agents may never change.
# The deny rules in settings.json cover the file tools; this covers Bash.
# Exit code 2 blocks the tool call and shows the message to Claude.
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
INPUT="$(cat)"
# Drop the session paths so only the command itself is checked.
CMD="$(printf '%s' "$INPUT" | sed -e 's/"transcript_path"[[:space:]]*:[[:space:]]*"[^"]*"//g' -e 's/"cwd"[[:space:]]*:[[:space:]]*"[^"]*"//g')"
if printf '%s' "$CMD" | grep -Eq '(^|[^[:alnum:]_-])(owner/|tests/|\.claude/|logs/system-log)'; then
  echo "Blocked: shell commands may not touch owner/, tests/, .claude/ or logs/system-log.md. Report this to the owner." >&2
  printf '%s | hook | blocked: protected path in shell command | -\n' "$(date '+%Y-%m-%d %H:%M')" >> "$PROJECT_DIR/logs/system-log.md"
  exit 2
fi
exit 0
