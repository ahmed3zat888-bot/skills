---
name: ahmed-linkedin-humanizer
description: "Ahmed's humanizer for personal-brand LinkedIn text: finds AI-sounding patterns in an Arabic or English draft (post, comment, About, caption), rewrites them in the user's own voice, and returns a diff with the reason for each change. Use when a draft 'sounds like ChatGPT', feels generic, or before running the post critic."
---

# LinkedIn Humanizer (Ahmed edition)

A draft can pass every rule and still read as machine text: even rhythm, safe abstractions, a list of three, a neat moral at the end. Readers skim past text that sounds like everyone else. This skill finds those patterns and replaces them with the user's own voice, specifics and rhythm.

Purpose: readability and a distinct personal voice. This skill does not exist to evade AI detectors. Detection tools are unreliable and misclassify human text, especially text by non-native English writers (Liang et al., 2023, Weber-Wulff et al., 2023), so "passes a detector" is never the goal or the test.

## Before you start

1. Load the `ahmed-linkedin-house-rules` skill and apply it. It overrides this file where they conflict.
2. Core rules in short: Arabic version first, English immediately after. No em dashes, semicolons, hashtags, markdown, asterisks or emoji. The banned word list applies. Every claim carries a source. No employer data. Nothing is published or scheduled without the user's explicit go.
3. Personal brand only. Never add employer names, internal figures or content that reads as speaking for an employer.

## When to trigger

"Humanize this", "this sounds like AI", "make it sound like me", "too generic", "too polished", or the post critic flags voice or authenticity as a weak dimension.

## Inputs

1. The draft (one or both language versions).
2. Optional: 2 to 3 posts the user wrote without AI help, as voice samples. If none, use the voice in house rules section 2.
3. What must not change: data, sources, quotes, names.

## AI-pattern catalogue (check every item)

Structure
1. Uniform sentence length across a paragraph. Fix: mix one short sentence (3 to 6 words) with longer ones.
2. Rule of three everywhere (three adjectives, three bullets, three examples). Fix: use the real number of items, often two or four.
3. "It's not X, it's Y" contrast frames, used more than once. Fix: keep one at most, state Y directly.
4. Every paragraph ends on a moral or summary line. Fix: end some paragraphs on a fact or a question.
5. Symmetric bullet lists where every bullet starts with the same part of speech and has the same length. Fix: vary, or turn into prose.
6. Rhetorical question followed at once by its answer. Fix: remove the question or leave it open.
7. A closing line that restates the opening. Fix: end on the specific action or open question.

Content
8. Abstract nouns with no example (growth, impact, mindset, value). Fix: name the event, number, person role or place, anonymized.
9. Claims of universality ("everyone", "every leader", "always"). Fix: scope it to who, where, when.
10. Hedging stacks ("can potentially help to some extent"). Fix: one verb, one claim, a source if it is a claim.
11. Invented-sounding anecdotes with no detail. Fix: ask the user for one real detail (what was said, what happened next) or cut the anecdote.
12. Statistics without a source line. Fix: add the source per house rules section 4 or remove the number.

Wording
13. Banned words and setup phrases (house rules section 3).
14. Corporate verbs where a plain verb exists (facilitate, enable, drive, optimize). Fix: say what happened: ran, taught, cut, asked.
15. Arabic machine patterns: literal calques from English (يلعب دوراً محورياً، في نهاية اليوم، على حد سواء repeated), passive constructions with تم + مصدر, stacked إضافة إلى ذلك / علاوة على ذلك, and over-formal register for a personal post. Fix: active verb, direct subject, everyday MSA (or the dialect the user asked for).
16. Arabic that reads as a translation of the English. Fix: rewrite the Arabic from the idea, then check meaning parity with the English (house rules section 1).

## Process

1. Read the draft and the voice samples. Note 3 traits of the user's real voice (sentence length, how they open, how they address the reader).
2. Scan against the catalogue. List every hit with the line and pattern number.
3. Rewrite only what the hits require. Keep data, sources and the argument. Do not add new claims.
4. If a fix needs a fact only the user has (pattern 8 or 11), ask one question instead of inventing the detail.
5. Run the house-rules linter on the final text and fix every flag.
6. Check that Arabic and English still carry the same message and data.

## Output format

```
HUMANIZER REPORT
Patterns found: [n] (structure [n], content [n], wording [n])

CHANGES
1. Line: "[original]"
   Pattern: [number and name]
   Now: "[rewrite]"
...

QUESTIONS (only if a real detail is needed)
- [question]

FINAL TEXT
[Arabic version]


[English version]

Linter: PASS (or remaining flags with reason)
Sources:
- [sources carried from the draft]
```

## Rules

- Change the minimum. A humanizer that rewrites everything replaces one generic voice with another.
- Never fabricate a personal story, quote, number or name to make text feel human.
- Keep the user's dialect choice. Do not shift MSA to dialect or the reverse unless asked.
- The user publishes. Never claim text is live.

## Sources

- Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). GPT detectors are biased against non-native English writers. Patterns, 4(7), 100779.
- Weber-Wulff, D., et al. (2023). Testing of detection tools for AI-generated text. International Journal for Educational Integrity, 19, 26.
- Pattern catalogue: practitioner judgement, not a validated instrument. Treat it as a checklist, not a score.
