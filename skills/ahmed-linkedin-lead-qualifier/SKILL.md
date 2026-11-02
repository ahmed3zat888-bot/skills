---
name: ahmed-linkedin-lead-qualifier
description: "Ahmed's lead qualifier for personal-brand opportunities: scores any LinkedIn profile the user pastes (not only commenters) against weighted criteria the user defines, for coaching clients, speaking invitations, collaborations, mentors or peers, and returns a ranked list with the reason and the next step. Use for 'is this person worth reaching out to', 'score these profiles', 'qualify this list'."
---

# LinkedIn Lead Qualifier (Ahmed edition)

`ahmed-linkedin-warm-lead-finder` scores people who already commented. This skill scores anyone: a speaker list, a conference attendee page, people who viewed the profile, a list the user built. The criteria come from the user, so the score reflects what the user is building, not a generic sales funnel.

## Before you start

1. Load the `ahmed-linkedin-house-rules` skill and apply it. It overrides this file where they conflict.
2. Personal brand only. Leads are for the user's own opportunities (coaching, speaking, writing, collaborations, learning from peers). No employer business development, no employer clients.
3. Public data only. The user pastes what they see on public profiles. No scraping, no automated profile visits, no third-party data enrichment tools. LinkedIn's User Agreement prohibits scraping and automated access.
4. Personal data: do not save profile details to memory or files unless the user asks. If the user is in Saudi Arabia, the Personal Data Protection Law applies to storing other people's data: keep it to what the user needs and delete it when done.

## When to trigger

"Score these profiles", "who on this list should I connect with", "is this person a fit", "qualify my leads", "rank this speaker list".

## Step 1: define the criteria (once, then reuse)

Ask what the user is looking for this quarter. Offer these goal types and let the user pick one or two:

| Goal | What a fit looks like |
|---|---|
| Coaching or advisory clients | Decision maker who owns people or leadership outcomes |
| Speaking and panels | Event organizer, program chair, association lead, podcast host |
| Collaboration | Creator or expert with an adjacent audience and similar standards |
| Learning and mentors | Senior practitioner or researcher the user wants to learn from |
| Peers | Same level, same field, mutual value |

Then build a scorecard with 4 to 5 criteria, weights adding to 100. Default for coaching or advisory:

| Criterion | Weight | 3 points | 1 point | 0 points |
|---|---|---|---|---|
| Role fit | 30 | Head, director, VP, founder in people or leadership | Manager in a related function | Unrelated |
| Topic overlap | 25 | Posts or headline on L&D, leadership, coaching, psychology | Occasional mention | None |
| Region fit | 15 | GCC or Egypt | MENA or relevant market | Outside target |
| Activity | 15 | Posted or commented in the last 30 days | Last 90 days | Inactive |
| Existing tie | 15 | Mutual connection, prior exchange, same event | Shared group | None |

Each criterion is scored 0, 1, 2 or 3. Weighted score = sum of (points / 3 x weight). Hot is 70 or more, warm 45 to 69, not now below 45. Thresholds are a starting point: adjust after the user reviews the first 10.

Save the scorecard text so the user can paste it into the next session. Do not store it with any person's data.

## Step 2: score

1. The user pastes profiles: name, headline, location, about snippet, recent activity, any shared context.
2. Score each criterion with a one-line reason from the pasted text. If information is missing, score 0 and mark "unknown", never guess.
3. Flag: "peer" (same offer as the user), "competitor", or "conflict" (any employer link that makes outreach inappropriate).
4. Rank and assign the next step:
   - Hot: personal connection note via `ahmed-linkedin-connection-request-hook`, or first DM via `ahmed-linkedin-dm-opener` if already connected.
   - Warm: engage first. Comment on one of their posts via `ahmed-linkedin-smart-comment-writer`, then revisit in 2 to 3 weeks.
   - Not now: no action.

## Output format

```
LEAD QUALIFIER, goal: [goal], scorecard v[date]
Profiles scored: [n]   Hot [n]   Warm [n]   Not now [n]

HOT
1. [Name], [headline], [location]
   Score [x]/100: role [p] ([reason]), topic [p] ([reason]), region [p], activity [p], tie [p]
   Unknowns: [list]
   Next: [action and the skill to use]

WARM
...

NOT NOW
- [Name]: [5-word reason]

SCORECARD USED
[table]

Data note: scored only from text the user pasted on [date]. Unknowns scored 0.
```

## Rules

- A score is a prioritization aid, not a judgement of the person.
- Never message, invite or follow anyone from this skill. The user acts.
- No pitching in the first touch. The next step earns a conversation.
- Re-check the criteria every quarter. A stale scorecard ranks the wrong people.

## Sources

- LinkedIn User Agreement, section 8.2 (prohibited use of scraping, bots and automated access). linkedin.com/legal/user-agreement. Check the current version before relying on the clause number.
- Saudi Personal Data Protection Law, Royal Decree M/19 (2021), in force September 2023, SDAIA. Confirm current implementing regulations on sdaia.gov.sa.
- Scorecard design: weighted-criteria scoring is a standard decision aid. Weights and thresholds here are defaults, not validated values.
