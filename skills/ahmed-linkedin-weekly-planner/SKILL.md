---
name: ahmed-linkedin-weekly-planner
description: "Ahmed's 7-day personal-brand plan for LinkedIn: one Saudi week (Sunday to Saturday) with the posts, the daily engagement blocks and the prep tasks, sized to 2 to 3 hours and placed outside working hours. Use for 'plan my week', 'what do I do on LinkedIn this week', or when the 4-week calendar is too much."
---

# LinkedIn Weekly Planner (Ahmed edition)

The 4-week calendar plans content. This skill plans the week: what to write, when to write it, when to engage, and what to check, in the time the user actually has. It is the operational layer under the calendar.

## Before you start

1. Load the `ahmed-linkedin-house-rules` skill and apply it. It overrides this file where they conflict.
2. Core rules in short: Arabic version first, English immediately after. No em dashes, semicolons, hashtags, markdown, asterisks or emoji. Every claim carries a source. No employer data. Saudi week, Asia/Riyadh. Never post, schedule or plan inside working hours (Sunday to Thursday 08:00 to 17:00) except 13:00 to 14:00. Nothing is published or scheduled without the user's explicit go.
3. Personal brand only. Topics come from the user's own pillars and expertise, never from employer projects.

## When to trigger

"Plan my week", "what should I do on LinkedIn this week", "7-day plan", "I have X hours this week", or at the start of each week if the user asks for a recurring check-in.

## Inputs (ask only if missing)

1. Hours available this week. Default 2.5.
2. Posts this week. Default 2, maximum 3.
3. Anything already in Typefully for this week (read it with `list_drafts` and `get_queue`).
4. Events this week: travel, holidays, a talk, a public event, news in the user's field.
5. Pillars (from `ahmed-linkedin-content-pillars-builder`). If missing, ask for 3 topics the user wants to be known for.

## Time budget (estimates, adjust from the user's own log)

| Block | Default time | Notes |
|---|---|---|
| Write and check one bilingual post | 45 to 60 min | Includes humanizer, linter and critic |
| Engagement session | 15 min | Replies on own posts plus 3 thoughtful comments |
| Weekly review | 15 min | Numbers from the user's export, one lesson |
| Idea capture | 5 min a day | Phone notes, no writing |

2 posts (about 2 hours) plus 3 engagement sessions (45 minutes) plus review (15 minutes) is about 3 hours. If the user has 2 hours, cut to 1 post plus engagement and say so. Do not compress the checking steps to fit more posts.

## Process

1. Read the inputs and the Typefully pipeline.
2. Pick the post days. Default Sunday and Wednesday. Publish slots 13:15 or 19:30 Riyadh time (heuristic, replace with the user's own best slot from their export when available).
3. Put writing blocks at least one day before each post, in allowed windows (before 08:00, 13:00 to 14:00, after 17:00, or the weekend).
4. Place engagement sessions in the hour after each post goes out, plus one mid-week. Early replies to comments on one's own post are a common practitioner heuristic, not a published LinkedIn rule: label it so.
5. Put the weekly review on Thursday evening or Saturday.
6. For each post, write the brief: pillar, topic, format, hook angle, CTA goal, evidence needed. Hand the writing to `ahmed-linkedin-post-writer` when the user is ready.
7. Check every time slot in code against house rules section 6 before showing the plan.
8. Check Typefully quota (`get_social_set_details`) and warn if the week would exceed what is left.

## Output format

```
WEEK PLAN [Sunday date] to [Saturday date], Asia/Riyadh
Time budget: [h] available, [h] planned
Posts: [n]   Typefully quota left this month: [n] of 10

DAY BY DAY
Sun [date]
- 13:15 Publish post 1 (draft id or "to write")
- 13:20 to 13:35 Engagement: replies on post 1
- 19:30 to 20:15 Write post 2
Mon [date]
- 19:30 Engagement session (15 min)
...

POST BRIEFS
1. Pillar: [ ] Topic: [ ] Format: [ ] Hook: [ ] CTA: [ ] Evidence needed: [ ]
2. ...

WEEKLY REVIEW (Thu evening)
- Pull the export, compare each post to the user's median, one lesson for next week.

CUTS IF THE WEEK GETS BUSY
- First cut: [ ]. Second cut: [ ]. Never cut: replies on own posts.

Sources:
- Typefully pipeline and quota, read [date]
- Time estimates: heuristic, replace with the user's own log after 2 weeks
```

## Rules

- A plan the user cannot keep is worse than a small plan. When hours are short, cut posts, not checks.
- Do not schedule anything from this skill. Planning drafts with `plan_at` needs the user's confirmation of the week, and `publish_at` needs an explicit go per draft.
- No employer topics, events or numbers in briefs.
