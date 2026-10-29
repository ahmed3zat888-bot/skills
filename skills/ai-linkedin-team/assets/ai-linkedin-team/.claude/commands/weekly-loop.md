---
description: Runs the weekly LinkedIn loop in order. Orchestrator plans, content-engine drafts each brief, orchestrator queues everything for the owner. Nothing publishes.
---
# Weekly loop

Run these steps in order. Stop at the first failure and report it.

1. Use the orchestrator agent to run this week's loop: score the ready calendar rows, write the briefs
   and the week plan, and list the hand-offs.
2. For each hand-off line, one at a time: use the content-engine agent on that brief file.
3. Use the orchestrator agent to process the drafts that just returned and queue them for the owner.
4. Report to the owner:
   - the week plan path
   - each draft path with its voice-check result and [VERIFY] count
   - what waits in queue/needs-your-ok.md
   - what is held in queue/held-for-voice-review.md
   - any slot left empty and why

Remind the owner of the next step: review the queue, tick each item, run
`git add -A && git commit -m "approvals YYYY-MM-DD"`, then say "Process my approvals in queue/needs-your-ok.md."
