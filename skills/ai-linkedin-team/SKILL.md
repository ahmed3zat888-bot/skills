---
name: ai-linkedin-team
description: >
  Weekly operating system for one personal LinkedIn brand: bilingual
  (Arabic first, then English), evidence-based, every post approved by
  the owner before it goes out. Plans the week from a content calendar,
  scores candidate posts on an anchored rubric, drafts each post with a
  voice check and a facts check, queues everything for owner approval,
  and reports results from LinkedIn analytics exports with minimum-sample
  rules. Use when the user says "ai linkedin team", "linkedin team",
  "/ai-linkedin-team", "run my weekly loop", "plan my LinkedIn week",
  "set up my LinkedIn team", "process my approvals", "my calendar looks
  thin", "this post is performing", "voice regression", or "weekly
  LinkedIn report". Never publishes or schedules anything.
---

# AI LinkedIn Team

A small content team for one owner's LinkedIn profile. Three roles:
the orchestrator plans and briefs, the content engine drafts, results-roi
measures. The owner sets voice, positioning, approval bar and budget, and
approves every post. Nothing is published by this skill.

The full working kit lives in `assets/ai-linkedin-team/`. Its `CLAUDE.md`
holds the rules, `.claude/agents/` the three role definitions,
`.claude/commands/` the four workflows. Read those files when running a
workflow; this file is the entry point and does not repeat them in full.

## Step 1: find the working folder

The kit only works on a working copy that holds the owner's own files.
Never write the owner's personal data into `assets/`: that folder is a
blank template in a public repository.

1. Look for a folder containing both `owner/brand-voice.md` and
   `brand-os/content/content-calendar.md` (the current directory first,
   then a folder named `ai-linkedin-team`).
2. If none exists, run Setup (below) and stop after it.
3. If one exists, read its `CLAUDE.md` and follow it in full. Inside the
   working folder, that file wins over this one.

## Two modes

**Enforced mode (Claude Code started inside the working folder).** The
project's `.claude/settings.json` loads: deny rules, the kill switch, the
shell path guard and the real-time system log. Subagents and slash
commands are available: `/weekly-loop`, `/content-calendar-looks-thin`,
`/post-performs`, `/voice-regression`. Use them.

**Instruction mode (any other session: Claude.ai, Cowork, or Claude Code
started elsewhere).** None of the controls load. Play the three roles in
sequence yourself, following the agent files as written, and hold these
rules without exception, because nothing enforces them:

- If `owner/STOP` exists, report "System paused by the owner" and stop.
- Never edit anything in `owner/`, `tests/`, `.claude/` or
  `logs/system-log.md`. Only read them.
- Never tick an approval box, write an owner note, or set a calendar row
  to `ready`.
- Tell the owner at the start of the run that the controls are not
  enforced in this session.

## Setup (first run)

1. Copy `assets/ai-linkedin-team/` to a folder the owner chooses, outside
   this repository. If the owner wants it in the cloud, it must be a
   separate **private** repository.
2. In that folder: `chmod +x .claude/hooks/*.sh`, then
   `git init && git add -A && git commit -m "kit installed"`.
3. Tell the owner which files to fill before the first run (the
   orchestrator stops while any `[FILL IN:` remains in `owner/`):
   `owner/brand-voice.md`, `owner/approval-bar.md`, `owner/positioning.md`,
   `brand-os/brand-brain/messaging-bank.md` (section 1, About me),
   `brand-os/content/content-calendar.md` (one `ready` row with the
   owner's own notes), `brand-os/social/posting-schedule.md`,
   `brand-os/reporting/kpi-model.md` (targets and the "Above normal"
   rule), `tests/voice-test-set.md` (3 past posts).
4. Point the owner to the five control checks in the kit's `README.md`
   ("Check the controls before the first run"). Do not run the weekly
   loop until all five pass.

## Workflows

| Owner says | Do |
|---|---|
| "Run my weekly loop" | `.claude/commands/weekly-loop.md` |
| "Process my approvals" | Orchestrator, section "After the owner ticks". First ask the owner to confirm `git diff HEAD -- queue/` printed nothing |
| "Process the held items" | Orchestrator reads `queue/held-for-voice-review.md`; ticked "Fixed" items go to the approval queue, "Drop it" items are closed |
| "My calendar looks thin for <range>" | `.claude/commands/content-calendar-looks-thin.md` |
| "This post is performing: <date> <export>" | `.claude/commands/post-performs.md` |
| "Write the weekly report" | `.claude/agents/results-roi.md` |
| "I changed my voice rules" | `.claude/commands/voice-regression.md` |

End every run with: what was drafted, what waits for the owner, what was
held, what could not be done.

## Relationship with the ahmed-linkedin-* skills

Those skills do single tasks (one hook set, one critique, one comment)
and may schedule through Typefully or Taplio. This skill runs the weekly
plan-draft-approve loop and never schedules. When working inside the
kit's working folder, its `CLAUDE.md` governs: drafts go to the queue,
not to a scheduler. Outside it, the single-task skills apply as usual.

## Known limits

- Every post still needs a careful human read. A "voice check: pass" is a
  model grading its own family's text, and supervisors of automated
  systems tend to check less over time. Check every number and source
  before ticking Approve.
- The banned-word list in `owner/brand-voice.md` includes "it", "that",
  "can" and "may". Expect many English drafts to be held until the owner
  narrows that rule to filler use only.
- Bash deny rules and the path guard block the obvious routes, not every
  conceivable one. The git history of `queue/` is the final check.

## Sources

1. Anthropic. Claude Code documentation: settings, permissions, hooks,
   subagents, slash commands. https://docs.claude.com/en/docs/claude-code/
2. Panickssery, A., Bowman, S. R., and Feng, S. (2024). LLM Evaluators
   Recognize and Favor Their Own Generations. NeurIPS 2024.
   arXiv:2404.13076.
3. Parasuraman, R., and Manzey, D. H. (2010). Complacency and bias in
   human use of automation: an attentional integration. Human Factors,
   52(3), 381-410. https://doi.org/10.1177/0018720810376055
4. Sharma, M. (OneGTMLab). AI Native Social Media Agent Team (Notion
   guide). Practitioner guide, not research; the base design was adapted
   from it.
