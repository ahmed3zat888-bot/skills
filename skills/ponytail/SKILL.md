---
name: ponytail
description: >
  Token-economy mode: produce the smallest correct output. Before writing
  code or long text, ask whether it needs writing at all, whether existing
  code, the standard library or a one-liner covers it, and whether a short
  answer serves the user. Use when the user types /ponytail, says "use the
  ponytail skill", or asks to save tokens, cut cost, keep it minimal, or
  stop over-engineering. Subcommands: /ponytail audit (find code that can be
  deleted or replaced), /ponytail review (check a diff for excess),
  /ponytail debt (list complexity that costs tokens on every future read).
license: Complete terms in LICENSE.txt
---

# Ponytail: say less, write less, read less

Tokens are spent three ways: reading context, thinking, and writing output.
Output is the most expensive per token and also adds to every later turn's
context. Less code and less text, when still correct, lowers cost now and
later.

## The ladder (stop at the first rung that works)

1. **Is this needed?** If the request is solved by an existing file,
   setting, command or answer already given, point to it. Write nothing.
2. **Can existing code do it?** Search the repo before writing. Reuse or
   extend a function instead of adding a parallel one.
3. **Does the standard library or an installed dependency do it?** Use it.
   Do not add a new dependency for something a few lines handle.
4. **Can it be one line or one sentence?** Prefer it, unless that hurts
   readability.
5. **Only then write new code**, the smallest version that meets the stated
   requirement. No speculative options, flags, abstractions or "future"
   hooks.

## Reading rules

- Search (grep, glob) before opening files. Read the relevant line range,
  not the whole file, when the location is known.
- Do not re-read a file already in context unless it changed.
- Run independent lookups in parallel, once.

## Writing rules

- Edit in place with minimal diffs. Do not rewrite whole files to change a
  few lines.
- No restating the request, no preamble, no closing recap of what the diff
  already shows.
- Comments only where the code is not self-explanatory.
- Prose answers: answer first; add detail only if the user needs it to act.
- Do not cut correctness, safety checks, error handling the task needs, or
  tests the repo expects. Ponytail removes excess, not substance.

## Subcommands

**`/ponytail audit [path]`**: list code that can be deleted or replaced:
dead code, duplicates, hand-rolled versions of standard-library functions,
unused dependencies, and wrappers that only pass through. For each: file
and line, what replaces it, approximate lines saved. Change nothing until
the user approves.

**`/ponytail review [diff|PR]`**: check a change for excess: new code that
duplicates existing code, unneeded abstractions, unused parameters, over-
long comments, scope beyond the request. Output one line per finding with
a smaller alternative.

**`/ponytail debt [path]`**: rank the files and modules that cost the most
to load and understand (size, duplication, indirection) and suggest the one
simplification with the biggest payoff.

## Output for subcommands

```
| # | File:line | Excess | Smaller alternative | Est. lines saved |
|---|-----------|--------|---------------------|------------------|
```
End with a total and the single highest-value change.

## Evidence and limits

The approach is modelled on the open-source Ponytail skill. Its published
claims range from about 22% to 94% token savings, but those come from the
project and secondary blog coverage, not controlled studies. A reported
JetBrains test of three token-saving tools found Ponytail cut cost by about
10% per task. Treat savings as task-dependent and measure them on your own
workload (for example by comparing token counts for the same task with and
without the skill) before relying on a figure.

This file is an independent implementation, not a copy of the upstream
skill.

## Sources

- Pillitteri, P. Caveman vs Ponytail vs rtk vs pxpipe vs headroom: Cut
  Claude Code Tokens. https://pasqualepillitteri.it/en/news/7881/caveman-rtk-pxpipe-headroom-claude-code-tokens
- Stork.ai. This plugin slashed my Claude costs by 80%.
  https://www.stork.ai/blog/this-plugin-slashed-my-claude-costs-by-80
- MindStudio. Claude token saving plugins tested.
  https://www.mindstudio.ai/blog/claude-token-saving-plugins-tested/
