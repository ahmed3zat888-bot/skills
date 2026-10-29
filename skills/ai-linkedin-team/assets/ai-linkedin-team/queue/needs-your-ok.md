# Needs your OK

Items waiting for an owner decision. Agents add items at the bottom of "Open". Only the owner ticks a box
or writes an owner note.

After ticking:
1. git add -A && git commit -m "approvals YYYY-MM-DD"
2. Before asking Claude to process them, run: git diff HEAD -- queue/
   It must print nothing. Any output means a tick changed after your commit: check it first.
3. Tell Claude: "Process my approvals in queue/needs-your-ok.md."

URGENT items go at the top of "Open".

## Format for every item
### Q-YYYYMMDD-NN: <short title>
- [ ] Approve
- [ ] Reject
- What: <what happens if you approve, in one line>
- Why it waits: <the rule from owner/approval-bar.md or CLAUDE.md>
- Flags: <names a person / mentions employer / has a number / [VERIFY] / agent-sourced idea / none>
- File: <drafts/... path>
- Slot: <day and time>
- Requested by: <agent> for brief <B-YYYYMMDD-NN>
- Owner note:

## Open

## Done
