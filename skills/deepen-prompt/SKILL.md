---
name: deepen-prompt
description: >
  Turn a prompt or task into a deeper version of itself, not a bigger one.
  Use when the user asks to deepen, sharpen, or upgrade a prompt or task;
  asks what a top professional or expert would do differently; asks for an
  "expert-level", "rigorous", or "evidence-based" version; or pastes a prompt
  and says it feels shallow, generic, or surface-level. Produces a decision
  anchor, the expert's unasked moves, the raw source material to start from,
  named methods mapped to that material, a pre-committed external test that
  can fail, and a paste-ready rewritten prompt that asks for exactly those.
  Do not use for tone or grammar edits, translation, shortening, or when the
  user explicitly wants more scope, more sections, or more output.
---

# Deepen Prompt

## The standard

A shallow prompt asks for a fluent synthesis of what is already digested. A
deep prompt asks for what a top practitioner would actually do: aim at the
real decision, start from primary material, apply a named method whose
assumptions fit the data, and commit in advance to an independent test that
could prove the work wrong.

Depth is not length. The deepened prompt must keep the user's goal and
produce the same number of deliverables (or fewer). Every addition must be a
better input, a sharper method, or a stricter check. If an addition is a new
topic, section, audience, or deliverable, delete it.

## Hard rules

1. **No generic items.** Every item in the diagnostics must be specific to
   this prompt and this field. Apply the swap test: if the item would read
   just as well under a different prompt in a different field, it fails.
   "Use data", "consult stakeholders", "be rigorous", "benchmark against
   best practice" always fail.
2. **No invented sources, frameworks, authors, statistics, or data.** If an
   attribution is uncertain, name the method without the attribution. If a
   number is illustrative, label it "illustrative, not a benchmark".
3. **No self-validation.** The model's confidence, the user's approval, a
   satisfaction score, or "reviewed by the team that did the work" never
   count as proof.
4. **Every check must be able to fail.** State the threshold, the time
   window, and the result that would falsify the conclusion.
5. **Label epistemic status.** Mark claims as Fact (verifiable), Inference
   (reasoned from facts), or Assumption (needs confirming).
6. **Evidence floor.** Do not cite or recommend low-grade evidence (vendor
   marketing, unsourced statistics, opinion pieces, popular frameworks
   without empirical support) as if it were validated. If it is the only
   evidence available, say so and grade it.

## Step 0: Calibrate before diagnosing

Do this silently, then state the results in two or three lines at the top of
the output.

- **Field and practitioner archetype.** Name the specific expert who would
  be best at this task, at the level of role and setting (e.g. "a people
  analytics lead running programme evaluation in a multi-site retailer", not
  "an HR expert"). All diagnostics are written from that person's view.
- **Decision anchor.** What decision will this output feed, who makes it,
  and what would they do differently if the answer were X versus Y? If no
  decision changes, the expert's first move is to say so and reframe.
- **Stakes and proportionality.** Low-stakes, reversible tasks get a lighter
  deepening (fewer methods, a simpler check). Do not bolt a randomised trial
  onto a welcome email. Say which level applies and why.
- **Missing inputs.** If the field or the decision is genuinely ambiguous and
  the answer would change the diagnostics, ask at most three targeted
  questions and stop. Otherwise proceed and state the assumptions.

If the original prompt is already deep (it names primary data, a method,
and an independent test), say so, make only the specific improvements that
remain, and do not pad.

## Step 1: The expert's unasked moves (1 to 3)

What would the archetype do that the prompt does not ask for? Prioritise, in
this order:

1. **Aim at the decision**, not the topic.
2. **Remove the embedded conclusion.** Prompts often presume the answer
   ("why X works", "best practices for Y"). The expert tests it.
3. **Set the comparison.** Compared to what baseline, counterfactual,
   control, prior period, or competitor?
4. **Seek disconfirmation.** What would the expert look for to prove the
   obvious answer wrong?
5. **Find the mechanism.** Not only whether, but through what causal path.

Each move: one or two sentences, plus why it changes the result.

## Step 2: The rawest material

Name the primary sources the archetype would start from, instead of the
digested versions the user is likely relying on (summaries, dashboards,
vendor reports, slide decks, blog posts, AI answers, meta-analysis
abstracts).

For each source give: what it is concretely, where it lives or who owns it,
what the digested version loses (sample, variance, outliers, wording,
timing, context, denominators), how to get it, and one data-quality check to
run on it before use. Separate **accessible now** from **ideal but likely
out of reach**, and say what the work can still conclude without the latter.

## Step 3: Methods mapped to material

Name methods by their recognised names. Map each one: question it answers →
data it uses → output it produces. Specificity required, for example:

- Evaluation: Kirkpatrick levels 3 and 4 with a comparison group;
  Brinkerhoff Success Case Method; Phillips ROI with isolation of effects.
- Causal inference: difference-in-differences; interrupted time series;
  regression discontinuity; matched comparison; staggered rollout.
- Qualitative: thematic analysis (Braun and Clarke); critical incident
  technique; behavioural event interviews; job task analysis.
- Diagnosis: 5 Whys; Ishikawa; process mapping; Pareto of failure causes.
- Evidence appraisal: GRADE; CEBMa appraisal checklists; the evidence
  hierarchy.
- Instruments: a named, validated scale or tool, not "a survey".

State one **primary** method and why it beats the alternatives here, then
supporting methods. For each, state its key assumption and whether the
user's data is likely to meet it. Flag minimum sample or duration where it
matters. Prefer the simplest method that can answer the decision question.

## Step 4: Pre-committed external test

Define, before the work is done, what other than the model or the user
would show the result is right. It must be independent, observable, and able
to fail. Choose from: a hard outcome metric with threshold and window; a
holdout or comparison group; a prediction made now and scored later;
triangulation against an independent data source; blind review by a named
type of independent expert; replication on another site, cohort, or period;
conformance with a published standard or regulation.

Specify: the check, who or what runs it, the threshold, the time window, the
**falsifier** (the result that shows the work is wrong), and the **kill
criterion** (the result that should stop or reverse the decision).

## Step 5: The deepened prompt

Write it in the second person to the model that will execute it, ready to
paste. It must:

- State the decision it serves and keep the user's original goal and scope.
- Remove any embedded conclusion from the original wording.
- List the raw inputs to use, and instruct the executing model to **stop and
  request** any that are missing rather than fill gaps with general
  knowledge or invented data.
- Name the primary and supporting methods and require their assumptions to
  be checked and reported.
- Require the external test, threshold, falsifier, and kill criterion to be
  stated **before** any findings.
- Require Fact / Inference / Assumption labels, a statement of what the
  evidence cannot support, and a source list at the end with low-grade
  evidence excluded or flagged.
- Produce the same deliverable(s) as the original, no more.

## Step 6: Self-audit, then revise once

Before returning, score the draft against this rubric. Any "no" means revise
the failing part once, then return.

| # | Check | Pass? |
|---|---|---|
| 1 | Every diagnostic item passes the swap test | |
| 2 | The decision anchor is explicit and the rewrite aims at it | |
| 3 | Any embedded conclusion in the original is removed | |
| 4 | Raw sources are primary, concrete, and split by accessibility | |
| 5 | The primary method fits the data and its assumptions are stated | |
| 6 | The external test is independent, has threshold, window, and falsifier | |
| 7 | Deliverable count in the rewrite is no greater than the original | |
| 8 | No invented sources, attributions, or statistics | |
| 9 | Depth is proportionate to the stakes | |
| 10 | The rewrite tells the executing model to stop and ask for missing inputs | |

Do not print the rubric unless the user asks. Print one line stating the
result ("Self-audit: 10/10" or which item was fixed).

## Output format

```
**Archetype:** [specific practitioner]
**Decision anchor:** [decision, decider, what changes between answers]
**Depth level:** [light / standard / full, with one-line reason]

## 1. What a top professional would do that the prompt does not ask for
1. [move] — [why it changes the result]

## 2. Rawest material
| Source | Where it lives / owner | What the digested version loses | Quality check | Accessible now? |
|---|---|---|---|---|
[If key sources are out of reach: what can still be concluded without them]

## 3. Methods mapped to material
- **Primary:** [method] — question → data → output. Why this over alternatives. Assumption: [..., likely met / at risk].
- **Supporting:** [method] — role. Assumption: [...].

## 4. Pre-committed external test
- **Check:** [what, run by whom]
- **Threshold and window:** [...]
- **Falsifier:** [result that shows the work is wrong]
- **Kill criterion:** [result that should stop or reverse the decision]

## 5. Deepened prompt
[paste-ready prompt]

## Assumptions
[labelled assumptions made; omit if none]

Self-audit: [result]

## Sources
[full references for every named method, standard, or study; omit if none]
```

Keep sections 1 to 4 tight. The value is in specificity, not volume.

## Worked example (abbreviated)

Original: "Write a report on why our new sales-associate onboarding
programme is working."

- Archetype: people analytics lead evaluating a programme across a
  multi-site retail network. Decision: scale, fix, or stop the programme
  before the next hiring wave. Depth: full (budget and headcount at stake).
- Unasked moves: remove "is working" and test whether it works; compare
  onboarded cohorts with pre-programme cohorts and with stores not yet on
  the programme; explain the mechanism, not only the effect.
- Raw material: transaction-level sales by associate and week of tenure
  (POS); hire and exit dates (HRIS); floor observation records. Not the
  post-course satisfaction survey or the vendor completion dashboard.
  Quality check: reconcile POS staff IDs with HRIS IDs before analysis.
- Primary method: difference-in-differences on time-to-productivity and
  90-day attrition, using the staggered rollout. Assumption: parallel
  pre-trends; at risk in small stores, so test it. Supporting: Brinkerhoff
  Success Case interviews with top and bottom performers for mechanism.
- External test: next two hiring waves, onboarded stores versus comparison
  stores. Threshold (illustrative, not a benchmark): 15% faster
  time-to-productivity. Falsifier: no difference after controlling for store
  and season. Kill criterion: attrition higher in onboarded stores.
- Deepened prompt: evaluates whether, not why; names the data and design;
  instructs the model to stop and request the POS and HRIS extracts if not
  supplied; requires the test to be stated before findings; same single
  report as the original.

## Anti-patterns

- Adding sections, stakeholders, or deliverables to look thorough.
- "More research is needed" without naming the source and method.
- A method chosen for prestige when the data cannot meet its assumptions.
- A validation step that cannot fail, or that the authors grade themselves.
- Heavy evaluation machinery on a trivial, reversible task.
- Citing weakly evidenced ideas (learning styles; 70-20-10 presented as an
  empirical ratio; the "learning pyramid" retention percentages) as
  validated methods.
