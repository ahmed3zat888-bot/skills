---
name: ponytail
description: >
  Gather the loose strands of a conversation, meeting, project thread or
  document set into one tight, auditable close-out: decisions made, open
  items with a named owner and a due date, unresolved questions, risks,
  and the single next action. Use when the user types /ponytail, or asks
  to "tie up loose ends", "wrap this up", "close out", "what did we
  decide", "summarise actions", or "where are we" at the end of a long
  or messy exchange. Do not use for summarising a single document the
  user wants paraphrased, or for creative or casual chat.
---

# Ponytail: tie up the loose ends

A ponytail pulls scattered strands into one band. This skill does the same
for work: it turns a sprawling thread into a short record that someone who
was not present can act on.

## When to run

Run when the user invokes `/ponytail` or asks to close out, wrap up or
consolidate. Typical inputs: the current conversation, a pasted meeting
transcript or notes, an email thread, or a set of files the user points to.

If the source is unclear (for example the conversation covers several
unrelated topics), ask one question: which topic or time window to close
out. Otherwise proceed without asking.

## Procedure

1. **Collect strands.** Read the whole source. List every statement that is
   a decision, a commitment, a request, an open question, a risk, or a
   dependency. Ignore pleasantries and superseded drafts.
2. **Resolve conflicts.** Where a later statement overrides an earlier one,
   keep only the latest and note the change if it matters. Where two
   statements conflict and neither is clearly final, list it under Open
   questions, not Decisions.
3. **Classify each strand** into exactly one section of the output below.
4. **Make actions executable.** Every action needs a verb, an owner and a
   due date. If the source does not name an owner or date, write
   `Owner: unassigned` or `Due: not set`. Never invent a name or a date.
5. **Separate fact from inference.** Anything Claude inferred rather than
   read directly is marked `(inferred)`.
6. **Pick one next action**: the item that unblocks the most other items,
   or the earliest due date if no dependencies are known.
7. **Self-check before replying:** every action has verb, owner, due date
   or an explicit gap marker; no decision is also listed as open; nothing
   is fabricated; the output fits on one screen where possible.

## Output format

Use these headings in this order. Omit a section only if it has no
content, and say "None" rather than dropping Decisions or Actions.

```
## Ponytail: <topic> (<date or time window>)

**Decisions**
1. <decision> — <who decided, if known>

**Actions**
| # | Action (verb first) | Owner | Due | Depends on |
|---|---------------------|-------|-----|------------|

**Open questions**
- <question> — <who can answer, if known>

**Risks and dependencies**
- <risk> — <likely impact>

**Next action**
<one sentence: who does what, by when>
```

## Style rules

- Direct, neutral, business register. No praise, filler or preamble.
- Short sentences. Bullets or tables only where they organise data.
- Quote exact figures, names and dates from the source. Do not round or
  paraphrase numbers.
- Keep the user's language. If the source is bilingual, follow the
  language the user is writing in.

## Why this structure

Two findings shape the format. Meeting research reports that meetings end
more productively when outcomes are recorded as explicit action items with
assigned responsibility (Rogelberg, 2019). Research on implementation
intentions shows that specifying when, where and how a goal will be acted
on raises follow-through, with a medium-to-large average effect across 94
studies (d = 0.65; Gollwitzer & Sheeran, 2006). The owner and due date
columns turn a vague intent into that form. The evidence comes from
individual goal pursuit and meeting practice; it has not been tested on AI-
generated summaries specifically, so treat the format as a well-grounded
default, not a proven intervention.

## References

- Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of
  simple plans. *American Psychologist, 54*(7), 493–503.
- Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and
  goal achievement: A meta-analysis of effects and processes. *Advances in
  Experimental Social Psychology, 38*, 69–119.
- Rogelberg, S. G. (2019). *The Surprising Science of Meetings: How You Can
  Lead Your Team to Peak Performance*. Oxford University Press.
