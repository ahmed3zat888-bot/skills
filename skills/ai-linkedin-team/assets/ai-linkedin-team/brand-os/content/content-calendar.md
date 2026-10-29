# Content calendar
> Read by: orchestrator, content-engine, results-roi, /content-calendar-looks-thin.
> Agents may add rows only with status `idea` and Source `agent`. Only the owner sets `ready`.
> Agents may change the Status column as the table below allows. Nothing else.

## Status values
| Status | Means | Set by |
|---|---|---|
| idea | Worth considering, nothing written | owner, or an agent (Source: agent) |
| ready | Approved to draft | owner only |
| briefed | Brief written | orchestrator |
| drafted | Draft saved in drafts/ | content-engine |
| held | Failed the voice check | content-engine |
| approved | Owner ticked Approve (committed to git) | orchestrator, mirroring the owner's tick |
| posted | Live on LinkedIn | owner |
| dropped | Not doing it, kept for the record | owner |

## The calendar
| ID | Publish date | Format | Topic | Pillar | Belief (from positioning) | Source | Status | Notes (owner experience, in your words) | Draft file | Hook pattern |
|---|---|---|---|---|---|---|---|---|---|---|
| 001 | [FILL IN: YYYY-MM-DD] | text-post | [FILL IN] | [FILL IN] | [FILL IN] | owner | ready | [FILL IN: one or two lines from your own experience] | | |
| 002 | [FILL IN] | carousel-outline | [FILL IN] | [FILL IN] | [FILL IN] | owner | idea | [FILL IN] | | |

## When the calendar counts as thin
Fewer than 2 rows marked `ready` for the next 14 days. Then run /content-calendar-looks-thin.
