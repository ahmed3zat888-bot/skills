---
name: ahmed-linkedin-to-x-converter
description: "Ahmed's LinkedIn-to-X converter: turns a published or drafted bilingual LinkedIn post into native X content, either one post or a thread, with separate Arabic and English versions sized to X's character limits. Use for 'post this on X', 'make a thread from this', 'repurpose my LinkedIn post for Twitter'."
---

# LinkedIn to X Converter (Ahmed edition)

LinkedIn rewards a longer post read in one view. X splits attention across short units, and each unit has to stand alone. Pasting a LinkedIn post into X wastes both. This skill rebuilds the idea for X while keeping the argument, the data and the source.

## Before you start

1. Load the `ahmed-linkedin-house-rules` skill. Its voice, banned words, evidence and employer rules apply to X output too. The bilingual-in-one-post rule does not: on X, Arabic and English go out as two separate posts or threads, because one post cannot hold both.
2. No em dashes, semicolons, markdown, asterisks or emoji. Hashtags: none by default, one at most if the user asks.
3. Personal brand only. No employer data.
4. Nothing is published or scheduled without the user's explicit go.

## When to trigger

"Turn this into a thread", "post this on X", "repurpose for Twitter", or after a LinkedIn post performed above the user's median and they want more reach from it.

## Inputs

1. The LinkedIn post (both language versions) or its Typefully draft id.
2. Target languages on X: Arabic, English or both. Default both.
3. Whether the X account has Premium (longer posts allowed). Default no: 280 characters per post.
4. Whether an X account is connected in Typefully. Check with `list_social_sets` and `get_social_set_details`. Social set 342889 is LinkedIn only unless the check shows an X account on it.

## Format decision

- Single post: the idea fits one claim plus one source. Use when the LinkedIn post has one insight.
- Thread (3 to 7 posts): the LinkedIn post has steps, a framework, a story arc or more than one data point.
- Never more than 7 posts. If the content needs more, the LinkedIn post should become a carousel or article, not a long thread.

## Thread structure

1. Post 1, the hook: the claim or result, stated plainly. It must make sense if it is the only post someone sees. No "a thread" label.
2. Posts 2 to n-1: one point each. Each post stands alone. Data goes with its source in the same post.
3. Last post: the takeaway or the open question, plus "Full version on LinkedIn" only if the user wants the cross-link (put the link in a reply, not in post 1).

## Character limits

- X counts 280 characters per post for standard accounts. Arabic letters count as 1 each. URLs count as 23 regardless of length. Some symbols count as 2.
- Count in code for each post, then confirm with Typefully's counter after creating the draft. If they disagree, trust Typefully.
- Target 220 to 260 characters per post to leave room for edits.

## Process

1. Extract the core: one-sentence claim, the supporting points, the data with sources, the CTA.
2. Choose single post or thread.
3. Write the Arabic version as its own native text, not a translation of the English thread. Then the English version. Check that both carry the same claim and data.
4. Count characters in code for every post.
5. Run the house-rules linter on each post (ignore the "Arabic is not first" flag for the English-only thread).
6. Run the employer check.
7. If an X account is connected in Typefully, offer to save as a draft with no `publish_at`. Otherwise deliver the text for the user to paste.

## Output format

```
X VERSION OF: "[LinkedIn post first line]"
Format: [single post / thread of n]
X account in Typefully: [yes, social set id / no, paste mode]

ARABIC THREAD
1/ [text] ([chars])
2/ [text] ([chars])
...

ENGLISH THREAD
1/ [text] ([chars])
...

What changed from LinkedIn: [2 to 3 lines: what was cut, what was split, why]
Linter: PASS (or flags with reason)
Sources:
- [carried from the LinkedIn post]
```

## Rules

- Do not invent a stronger claim for X than the LinkedIn post made. Shorter is not looser.
- Keep the source with the number, in the same post.
- Do not post the same thread in both languages within minutes from one account without the user deciding that. Ask which goes first.
