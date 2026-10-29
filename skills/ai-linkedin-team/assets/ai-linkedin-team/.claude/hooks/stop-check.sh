#!/usr/bin/env bash
# Kill switch. Runs before every write, edit or shell command.
# Exit code 2 blocks the tool call and shows the message to Claude.
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
if [ -f "$PROJECT_DIR/owner/STOP" ]; then
  echo "System paused: owner/STOP is present. Stop and report 'System paused by the owner'. Do not retry." >&2
  printf '%s | hook | blocked: owner/STOP present | -\n' "$(date '+%Y-%m-%d %H:%M')" >> "$PROJECT_DIR/logs/system-log.md"
  exit 2
fi
exit 0
