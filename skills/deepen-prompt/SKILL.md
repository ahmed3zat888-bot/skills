---
name: deepen-prompt
description: >
  Turn a prompt or task description into a deeper version of itself, not a
  bigger one. Use when the user asks to "deepen", "go deeper on", "make this
  expert-level", "what would a top professional do here", "upgrade my prompt",
  or pastes a prompt and asks for a sharper rewrite. Produces four diagnostic
  answers (the expert's unasked move, the raw source material, the specific
  methods and tools, and an external test of correctness) and then a rewritten
  prompt that asks for exactly those. Do not use for simple rewording, tone
  edits, or when the user wants more scope, more sections, or more output.
---

# Deepen Prompt

## Purpose

Most prompts ask for a polished summary of what is already known. A top
practitioner does something different: they go back to primary material,
apply a named method, and define in advance what evidence would prove the
result right or wrong. This skill exposes that gap and closes it in the
rewritten prompt.

Depth means the same question answered with better inputs, sharper methods,
and an independent check. Breadth means more topics, more sections, more
deliverables. This skill adds depth and refuses breadth. If the rewrite is
longer mainly because it lists more things to produce, it has failed.

## Inputs

1. The user's original prompt or task, verbatim.
2. The field or role it sits in. Infer it from the prompt. If the field is
   genuinely ambiguous (for example "analyse our programme" could be
   evaluation, finance, or design), ask one targeted question before
   proceeding.
3. Any known constraints: data the user has access to, time, audience,
   decision the output will feed. Do not invent constraints. Where one
   matters and is missing, state the assumption explicitly.

## Procedure

Work through the four diagnostics in order. Each must be specific to this
prompt and this field. Generic answers ("use data", "be rigorous", "consult
experts") are not acceptable; name the actual thing.

### 1. The expert's unasked move

State what a top professional in this field would do here that the prompt
does not ask for. Look for:

- The real decision behind the request (what will change if the answer is X
  versus Y) and whether the prompt is aimed at it.
- A reframing of the problem: is the stated problem a symptom of a different
  one?
- The baseline or counterfactual the expert would insist on (compared to
  what, compared to whom, compared to when).
- Disconfirmation: what the expert would look for to prove the obvious answer
  wrong.

Give one to three moves, each in one or two sentences, with the reason it
matters.

### 2. The rawest material

Name the primary sources the expert would start from instead of the digested
version the user is likely relying on (summaries, vendor reports, blog posts,
AI answers, dashboards, slide decks).

For each source, state:

- What it is, concretely (e.g. "POS transaction-level exports by staff ID",
  "verbatim exit-interview transcripts", "the original RCT, not the
  meta-analysis abstract", "the regulation text, not the law-firm summary").
- Who owns it or where it lives, if knowable.
- What the digested version typically loses (sample, variance, outliers,
  context, wording, timing).

Separate what the user can plausibly access from what would be ideal but may
be out of reach.

### 3. Specific methods and tools

Name the methods and tools the expert would use, by their recognised names,
and what each would do to the raw material. Prefer established, citable
methods over improvised ones. Examples of the level of specificity required:

- Evaluation: Kirkpatrick levels 3 and 4 with a matched comparison group;
  Brinkerhoff Success Case Method; Phillips ROI with isolation of effects.
- Analysis: difference-in-differences; interrupted time series; cohort
  analysis; Pareto of root causes; thematic analysis (Braun and Clarke).
- Diagnosis: 5 Whys; Ishikawa diagram; job task analysis; critical incident
  technique; behavioural event interviews.
- Evidence appraisal: GRADE; CEBMa critical appraisal checklists; the
  evidence hierarchy (systematic review > RCT > quasi-experiment > case
  study > expert opinion).
- Tools: the specific software, template, instrument, or validated scale
  (e.g. a named psychometric instrument rather than "a survey").

State which method is primary and why, and which are supporting. Flag any
method whose assumptions the user's data is unlikely to meet.

### 4. External proof of correctness

Say what, other than the model or the user, would show the result is right.
This must be an observable, independent check, defined before the work is
done. Candidates:

- A hard outcome metric that moves (or does not) in a defined window, with
  the threshold stated.
- A holdout, control, or comparison group.
- A prediction made now and scored later.
- Triangulation against a second, independent data source.
- Review by a named type of independent expert or a blind reviewer.
- Replication on a different site, cohort, or period.
- Conformance with a published standard, regulation, or benchmark.

Also state what result would show the work is wrong. A check that cannot
fail is not a check.

### 5. Rewrite the prompt

Write the deepened prompt so that it asks for exactly the four diagnostics
above and nothing extra. Requirements:

- Keep the user's original goal and scope. Do not add new deliverables.
- Specify the raw inputs to use (or to request from the user if not
  supplied).
- Specify the primary method and the supporting methods by name.
- Require the output to separate verified facts, inferences, and
  assumptions.
- Require the external check and the falsifying result to be stated up
  front, before conclusions.
- Require sources to be listed at the end, with low-grade evidence
  (opinion pieces, vendor marketing, unsourced statistics) excluded or
  explicitly flagged.
- Write it in the second person to the model that will execute it, ready to
  paste.

## Output format

Return exactly this structure:

```
## 1. What a top professional would do that the prompt does not ask for
[1 to 3 specific moves, each with its reason]

## 2. Rawest material to start from
| Source | Where it lives | What the digested version loses | Accessible now? |
|---|---|---|---|

## 3. Methods and tools
- Primary: [method] — [what it does to the raw material, why it fits]
- Supporting: [method/tool] — [role]
- Caution: [assumption the data may not meet]

## 4. What would show the result is right (other than the model or the user)
- Check: [independent, observable test with threshold and time window]
- Falsifier: [result that would show the work is wrong]

## 5. Deepened prompt
[paste-ready prompt]

## Assumptions made
[only if any; otherwise omit]

## Sources
[references for named methods and standards; omit if none were cited]
```

## Quality checks before returning

- Is every item in sections 1 to 4 specific enough that a practitioner could
  act on it tomorrow? If an item would fit any prompt in any field, replace
  it.
- Does the rewritten prompt ask for the same outcome as the original, at
  greater depth, rather than more outcomes?
- Is the external check genuinely independent of both the model and the
  user, and can it fail?
- Are facts, inferences, and assumptions labelled?
- Are any cited methods or standards real and correctly attributed? Never
  invent a framework, author, or source. If unsure of an attribution, name
  the method without the attribution.

## Worked example (abbreviated)

Original prompt: "Write a report on why our new sales-associate onboarding
programme is working."

1. Expert move: drop the presumption that it is working. Define the decision
   (scale, fix, or stop) and compare onboarded cohorts against the
   pre-programme cohort and against stores that have not rolled it out yet.
2. Raw material: transaction-level sales and conversion by associate and week
   of tenure; HRIS hire and exit dates; floor observation records; not the
   post-course satisfaction survey or the vendor's completion dashboard.
3. Methods: primary is difference-in-differences on time-to-productivity
   (weeks to reach store median sales per hour) and 90-day attrition,
   staggered rollout as the natural experiment. Supporting: Brinkerhoff
   Success Case interviews with top and bottom 10% to explain the mechanism.
   Caution: small store-level samples; check parallel pre-trends.
4. External check: 90-day attrition and time-to-productivity in the next two
   hiring waves, against a threshold set now (e.g. at least 15% faster
   time-to-productivity than the comparison stores). Falsifier: no
   difference from the comparison stores after controlling for store and
   season.
5. Deepened prompt: asks the model to evaluate whether the programme changed
   time-to-productivity and 90-day attrition, using the named data, the
   difference-in-differences design, the success-case interviews, with the
   threshold and falsifier stated before any conclusion, and facts versus
   assumptions labelled.

The example threshold is illustrative, not a benchmark.

## Anti-patterns

- Adding sections, stakeholders, or deliverables to look thorough.
- Recommending "more research" without naming which source and which method.
- Using the user's satisfaction or the model's own confidence as the proof of
  correctness.
- Citing popular but weakly evidenced frameworks (for example learning
  styles, or the 70-20-10 ratio presented as an empirical finding) as if they
  were validated methods.
