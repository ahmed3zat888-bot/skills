# AI LinkedIn Team (reduced kit)

A three-agent Claude Code project for one personal LinkedIn brand: bilingual (Arabic first), evidence-based,
every post approved by the owner. Adapted from Megha Sharma's "AI Native Social Media Agent Team" guide
(OneGTMLab), cut from 9 agents and 8 playbooks to what a personal brand needs, with the guide's
controls made enforceable.

## What it does each week
1. You drop the LinkedIn analytics export into brand-os/reporting/ and mark calendar rows `ready`.
2. /weekly-loop: the orchestrator scores ready rows, briefs content-engine, which drafts each post
   in Arabic then English and runs the voice check. Every draft lands in your queue.
3. You tick Approve or Reject, commit to git, and tell Claude to process approvals.
   Approved text appears in drafts/ready-to-post/. You post it yourself in the slot.
4. End of week: "Use the results-roi agent to write the weekly report for this week."

Expected time: 2 to 3 hours a week, most of it on reviewing drafts and adding your own experience notes.

## What changed from the original guide
| Problem in the original | Fix in this kit |
|---|---|
| Kill switch depended on each agent remembering to check | PreToolUse hook blocks every write while owner/STOP exists |
| "Owner files are read-only" was only an instruction | Deny rules in .claude/settings.json for owner/, .claude/, tests/, logs/system-log.md, plus a hook that blocks shell commands touching those paths |
| Agents wrote guessed timestamps into the log | A hook writes logs/system-log.md with real times; agents log without times |
| Approvals lived in a file the orchestrator can edit | You commit to git after ticking and run `git diff HEAD -- queue/` before processing; any change to a tick shows there |
| Agents could put their own ideas on the calendar as `ready` and pass the gate | Only you set `ready`; agent ideas carry `Source: agent` and are flagged |
| 0 to 3 scores had no anchors | Anchored rubric for Fit, Evidence, Timing in the orchestrator |
| Evidence gate dropped original thought leadership | Your own experience notes count as Evidence 2 |
| Tie-break favoured bland posts | Higher Fit wins ties |
| Winners called on one post | Minimum sample of 8 posts before "Normal" or rankings |
| Thresholds defined in two files | Every threshold lives only in kpi-model.md |
| Rule fixes could break earlier good posts | tests/voice-test-set.md and /voice-regression |
| Agents with full shell (Bash) access | No agent has Bash; WebFetch and WebSearch are denied for the whole project |
| No rule against instructions hidden in pasted text | "Untrusted text" rule in CLAUDE.md |
| Built for a local B2C business | LinkedIn personal profile only, bilingual, employer rule, zero spend |

## Setup (about 60 to 90 minutes, mostly filling files)
1. Install Claude Code and sign in. Check the current install command at docs.claude.com.
   On a managed work laptop, use a personal machine. On Windows, run Claude Code in WSL or Git Bash
   so the bash hooks work.
2. Put this folder where you want it, then in a terminal:
       cd ai-linkedin-team
       chmod +x .claude/hooks/*.sh
       git init && git add -A && git commit -m "kit installed"
3. Fill the minimum to start. The orchestrator stops while any [FILL IN: ...] remains in owner/.
   - owner/brand-voice.md: three lines that sound like you, three that do not (rest is pre-filled; confirm it)
   - owner/approval-bar.md: when you review
   - owner/positioning.md: confirm the pre-filled lines, fill the three prompts
   - brand-os/content/content-calendar.md: at least one row marked `ready`, with your own notes
   - brand-os/social/posting-schedule.md: content mix and dates you do not post
   - tests/voice-test-set.md: 3 of your best past posts
   Fill brand-os/brand-brain/messaging-bank.md research claims as you go. Until then, every
   research claim in a draft gets [VERIFY] and waits for you.
4. Start Claude Code from inside the folder: `claude`.

## Check the controls before the first run
Run these once. Each one tests a control the original guide only described.
1. Rules loaded: "Read CLAUDE.md and list what you must check before any action."
2. Deny rules: "Add a line to owner/positioning.md." Expected: refused by permissions.
   Also type /permissions and confirm the deny list shows.
   Then: "Append a line to owner/positioning.md with a shell command." Expected: blocked by the hook.
3. Kill switch: in your own terminal, `touch owner/STOP`. Then ask Claude to run /weekly-loop.
   Expected: "System paused by the owner" and a "blocked" line in logs/system-log.md.
   Then `rm owner/STOP`.
4. Logging: after any draft, logs/system-log.md shows the write with a real time.
5. /agents lists orchestrator, content-engine, results-roi. Typing / lists the four commands.

If a check fails, do not run the loop. The permission rule syntax and hook format follow the Claude Code
documentation as of 2026 and must be confirmed against the current docs (settings, permissions, hooks).

## Commands
| Command | Use |
|---|---|
| /weekly-loop | Plan, draft and queue the week |
| /content-calendar-looks-thin "next two weeks" | Propose ideas as `idea` rows when slots are empty |
| /post-performs "<post date> <export file>" | Test a post against your rule and propose follow-ups |
| /voice-regression | After any change to voice or tone rules |

## Exports
LinkedIn lets you export post and audience analytics from your profile analytics. Save them as
brand-os/reporting/linkedin-<what>-YYYY-MM-DD.<ext>. Field names in the export vary; if results-roi
reports [MISSING], check which column holds the figure and add the column name to kpi-model.md.

## What this kit does not do
- It never posts. You post or schedule approved text yourself, with any scheduler you choose.
- It does not build visuals. Carousel outlines are text for you to build in Canva with the Bridge identity.
- It does not run unattended. Each run starts when you open Claude Code.
- It does not read LinkedIn directly. Everything comes from what you paste or export.

## Using it in Cowork instead of Claude Code
The files work as plain instructions in a connected Cowork folder, but subagents, slash commands,
permission rules and hooks are Claude Code features. Without them the controls are back to being
instructions only. Use Claude Code if you want the enforced version.

## Assumptions to confirm
- Posting slots (Sunday and Wednesday, 13:15 Riyadh) follow your lunch-break rule; adjust after 8 posts of data.
- Post lengths in brief-templates.md are starting points, not evidence-based optima.
- Pre-filled positioning lines and beliefs are drafted from your earlier instructions; they are yours to rewrite.
- Your employer's social-media policy governs over anything in this kit. Check it against the employer rule in CLAUDE.md.

## Sources
1. Sharma, M. (OneGTMLab). AI Native Social Media Agent Team, Notion guide (read 28 Oct 2026).
   https://dandy-bug-77c.notion.site/AI-Native-Social-Media-Agent-Team-402a1f98521280859feede9319ce1aa0
2. Anthropic. Claude Code documentation: settings, permissions, hooks, subagents, slash commands.
   https://docs.claude.com/en/docs/claude-code/
3. Panickssery, A., Bowman, S. R., and Feng, S. (2024). LLM Evaluators Recognize and Favor Their Own
   Generations. NeurIPS 2024. arXiv:2404.13076. (Reason the human review step is kept for every post.)
