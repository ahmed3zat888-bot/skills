---
description: Playbook. A LinkedIn post seems to be doing well. Checks it against the owner's rule and the minimum sample, then proposes follow-ups. No paid promotion, ever.
argument-hint: "<post date or calendar ID, and the export file name with its numbers>"
---
# Playbook: a post performs

The event: $ARGUMENTS

## Before anything
Read the four owner files. If any still contains `[FILL IN:`, stop and name the file.

## Steps
1. Use the results-roi agent to test the post against the "Above normal" rule and the minimum-sample
   rule in brand-os/reporting/kpi-model.md, using the export named above.
   - If kpi-model.md sets no rule, do not guess: queue a request for the owner and stop.
   - If fewer posts exist than the minimum sample, report "too early to call" and stop.
   - If the post does not meet the rule, report the numbers and stop.
2. If it meets the rule, results-roi proposes its hook as a `proposed` row in hook-bank.md.
3. Use the orchestrator agent to propose up to two follow-ups as calendar rows with status `idea` and
   `Source: agent`, each reusing the same belief, not the same text:
   - a deeper follow-up post on the same belief
   - a carousel outline built from the same point
   It adds one queue item listing the proposals.
4. Report: the numbers with the export file and date, the rule it was tested against, the proposals.

## Never
- Recommend or prepare paid promotion.
- Edit the original post.
- Quote any number that is not in the export.
- Call one post a pattern.
