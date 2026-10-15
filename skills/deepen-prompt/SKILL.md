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
  user explicitly wants more scope, more sections, or more output. Not for
  directly executing a programme design or a training impact evaluation
  (use program-design-standard or ld-impact-evaluation when available), and
  not for raising ambition or scale (use 10x-this). Use this skill only when
  the request itself should be rethought before anything is produced.
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
5. **Label epistemic status.** Mark the load-bearing claims (those the
   conclusion depends on) as Fact (verifiable), Inference (reasoned from
   facts), or Assumption (needs confirming). Do not label every sentence.
   Market, regional, cultural, or customer-mix context (e.g. client
   nationalities, seasonality, nationalisation effects) is an Assumption
   unless a source is given.
6. **Evidence floor.** If the evidence-grading skill is available, apply
   its source order, A/B/C/D levels, transfer-risk flag, and exclusions to
   every cited claim, and do not use a second grading scheme. If it is not
   available, fall back to this rule: do not cite or recommend low-grade
   evidence (vendor marketing, unsourced statistics, opinion pieces,
   popular frameworks without empirical support) as if it were validated;
   if it is the only evidence available, say so; state the strength of each
   cited finding (e.g. "small effect", "mixed results", "single study").
   Either way, list in Sources only what the body actually uses.

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

### Routing to companion skills

This skill rethinks the request; it does not replace skills that hold the
method for producing the deliverable. Check which of these are available
and route to them instead of restating their method:

| If the deepened task is... | Route to | This skill still adds |
|---|---|---|
| Evaluating a training programme's impact, ROI, or business case | ld-impact-evaluation (design hierarchy, confounders, minimum detectable effect, ROI) | Reframing, raw-source table, first-run falsifier, kill criterion |
| Designing or redesigning a learning programme | program-design-standard (and the specialist skills it calls) | Reframing, raw-source table, falsifier and kill criterion for the programme |
| Any output that cites research | evidence-grading | Nothing extra; follow its levels |
| Making the idea much bigger or more scalable | 10x-this | Do not deepen; hand off |

When routing applies: keep Steps 1, 2 and 4 in full, shorten Step 3 to the
choice of primary method and why (leave the detailed design to the companion
skill), and have the deepened prompt instruct the executing model to apply
that skill. If no companion skill is available, run every step in full.

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

For Retail Academy work, first check the organisation's reference pack (e.g.
the "KSA Retail Academy Reference Pack": definitions, workforce, programmes
and stakeholders, retail calendar, plan targets, competency framework). Use
only rows marked Approved as fact; carry any other status into Assumptions.
If the pack exists but is not supplied, list it as a required input.

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

Commit to a provisional number now, labelled "illustrative, not a
benchmark", and give the rule for replacing it once the baseline is known
(e.g. "replace with baseline + 2 standard errors"). A threshold that is only
"to be set later" cannot fail and does not count. Also give at least one
falsifier that can be checked on the first run with the inputs listed, not
only one that needs months of follow-up.

The test describes how the result will be validated. It must not smuggle in
new deliverables (new instruments, rollouts, or programmes) that the
original prompt did not ask for. If validation needs something that does
not exist yet, list it under "Would need" rather than inside the rewrite.

## Step 5: The deepened prompt

Write it in the second person to the model that will execute it, ready to
paste. It must:

- State the decision it serves and keep the user's original goal and scope.
- Remove any embedded conclusion from the original wording.
- List the raw inputs to use, and mark each as **required** (cannot
  proceed without it) or **improving** (work proceeds without it, with the
  limit stated). Instruct the executing model to stop and request only the
  required inputs, and otherwise proceed with what is supplied, stating what
  the missing inputs prevent it from concluding. It must never fill gaps
  with general knowledge presented as the user's data, or invented data.
- Name the primary and supporting methods and require their assumptions to
  be checked and reported. Where a companion skill applies (see Routing),
  instruct the executing model to apply it by name for the detailed method,
  and keep in the prompt only what that skill does not already require.
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
| 10 | Inputs are split into required and improving; the rewrite can run with what exists | |
| 11 | At least one falsifier is checkable on the first run | |
| 12 | Every listed source is used in the body; evidence graded per evidence-grading (or the fallback rule) | |
| 13 | Where a companion skill applies, the rewrite routes to it instead of restating its method | |

Do not print the rubric or a score; a self-awarded score proves nothing.
If a check forced a revision, print one line naming what was changed (e.g.
"Revised: removed a second deliverable from the rewrite"). Otherwise print
nothing.

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

## Would need
[anything validation requires that does not exist yet; omit if none]

[Revised: ... — only if a self-audit check forced a change]

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
- Routing: this is an impact evaluation, so the detailed design goes to
  ld-impact-evaluation. Primary method chosen here: difference-in-differences
  on time-to-productivity and 90-day attrition, using the staggered rollout.
  Assumption: parallel pre-trends; at risk in small stores, so test it.
  Supporting: Brinkerhoff Success Case interviews with top and bottom
  performers for mechanism.
- External test: next two hiring waves, onboarded stores versus comparison
  stores. Threshold (illustrative, not a benchmark): 15% faster
  time-to-productivity. Falsifier: no difference after controlling for store
  and season. Kill criterion: attrition higher in onboarded stores.
- Deepened prompt: evaluates whether, not why; names the data; instructs the
  model to apply ld-impact-evaluation for the design and evidence-grading for
  citations; marks the POS and HRIS extracts as required; requires the test,
  falsifier, and kill criterion to be stated before findings; same single
  report as the original.

## Anti-patterns

- Adding sections, stakeholders, or deliverables to look thorough.
- "More research is needed" without naming the source and method.
- A method chosen for prestige when the data cannot meet its assumptions.
- A validation step that cannot fail, or that the authors grade themselves.
- Thresholds deferred entirely to "once the baseline is known".
- Unsourced regional or market context used as a premise.
- Heavy evaluation machinery on a trivial, reversible task.
- Restating a companion skill's method in the rewrite instead of routing to
  it; two copies of the same method drift apart.
- Citing weakly evidenced ideas (learning styles; 70-20-10 presented as an
  empirical ratio; the "learning pyramid" retention percentages) as
  validated methods.
