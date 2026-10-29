---
description: Playbook. The calendar has fewer ready rows than open slots. Proposes ideas as `idea` rows for the owner to promote. Never promotes rows and never drafts unapproved ideas.
argument-hint: "<date range to check, for example the next two weeks>"
---
# Playbook: content calendar looks thin

The range: $ARGUMENTS

## Before anything
Read the four owner files. If any still contains `[FILL IN:`, stop and name the file.

## Steps
1. Use the orchestrator agent to compare brand-os/content/content-calendar.md with
   brand-os/social/posting-schedule.md for the range. A slot is empty when the schedule has a slot
   and the calendar has no row marked `ready`, `drafted`, `approved` or `posted` for it.
   If posting-schedule.md sets no cadence, do not guess: queue a request for the owner and stop.
2. For each empty slot, the orchestrator proposes up to two ideas, drawn in this order from:
   - owner notes in existing `idea` rows (Source: owner)
   - proof points in brand-os/brand-brain/messaging-bank.md not used in the last 8 weeks
   - message pillars in messaging-bank.md that had no post in the last 4 weeks
   It adds each as a new calendar row with status `idea` and `Source: agent`, with one line on why.
   It never sets a row to `ready` and never invents a personal story for the owner.
3. The orchestrator adds one queue item: "Calendar thin for <range>: <n> ideas proposed", listing the rows.

## What the owner does next
Promote the ideas worth writing by changing their status to `ready` and adding a line of your own
experience in the Notes column. Then run /weekly-loop. An empty slot beats an off-brand post.

## Never
- Set a row to `ready`.
- Draft a post from an agent-sourced idea the owner has not promoted.
- Invent facts, numbers, stories or quotes to fill a slot.
