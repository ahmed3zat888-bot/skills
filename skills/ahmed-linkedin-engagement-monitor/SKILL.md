---
name: ahmed-linkedin-engagement-monitor
description: "Ahmed's engagement monitor: keeps a running log of the comment threads the user joined on other people's posts and on their own, flags which threads got a reply and need a follow-up, and lists what to answer today. Paste mode by default. Use for 'what threads do I need to follow up', 'did anyone reply to my comments', 'update my engagement log'."
---

# LinkedIn Engagement Monitor (Ahmed edition)

A thoughtful comment starts a conversation. Most of the value is lost when the author or another reader replies and the user never comes back. `ahmed-linkedin-engagement-tracker` audits activity after the fact. This skill keeps the open threads visible so the user answers on time.

## Before you start

1. Load the `ahmed-linkedin-house-rules` skill and apply it. It overrides this file where they conflict.
2. Replies go in the language the other person used. No em dashes, semicolons, hashtags, markdown, asterisks or emoji. Banned words apply.
3. Personal brand only. No employer data in replies.
4. Never post a reply. The user posts. Taplio comment tools are paid and not used (house rules section 8).

## When to trigger

"Who replied to my comments", "update my engagement log", "follow-ups for today", "what threads are open", or at the end of `ahmed-linkedin-daily-engagement-routine`.

## The log

The log is a table the user keeps (a sheet, a note or a CSV) and pastes in each session. Claude never relies on memory for it. Columns:

```
id | date | where (own post / other's post) | author | post link | my comment (first 10 words) | status | last check | next action | due
```

Status values: open (no reply yet), replied (someone answered, user has not), answered (user replied), closed (no further action), moved to DM.

If the user has no log, create one from today's activity and return it as CSV text.

## Process

1. Ask the user to paste the current log and, for each open thread, what they now see under their comment (new replies, likes from the author, nothing).
2. Update each row:
   - New reply from the post author or a relevant person: status "replied", due today.
   - No change for 7 days: status "closed" unless the user wants to keep it.
   - The other person asked a question or suggested talking: status "replied", next action "answer, then consider DM" with a hand-off to `ahmed-linkedin-dm-opener`.
3. For each row due today, draft one reply option per the comment-writer rules: specific, one point, no pitch, at most one question.
4. Spot patterns: which authors reply, which topics draw replies, threads where the user's comment got no response. Report counts only from the log, labelled "From user's log".
5. Return the updated log as CSV for the user to save.

## Output format

```
ENGAGEMENT MONITOR, [date]
Open threads: [n]   Need a reply today: [n]   Closed this session: [n]

REPLY TODAY
1. [author], "[post first line]"
   They said: "[reply]"
   Draft: "[reply option]"
   After: [close / keep open / consider DM]

PATTERNS (from user's log, [date range])
- Authors who reply most: [names]
- Topics with most replies: [ ]
- Comments with no response after 7 days: [n] of [n]

UPDATED LOG (save this)
[CSV]

Sources:
- User's engagement log, [date range]
```

## Rules

- Reply speed: answer within 24 hours where possible. This is a practitioner heuristic, labelled as one.
- Two exchanges in public, then move to DM only if the other person shows interest. Do not push.
- A log holds other people's names. Keep it with the user, not in Claude memory, and delete closed rows older than 90 days.
