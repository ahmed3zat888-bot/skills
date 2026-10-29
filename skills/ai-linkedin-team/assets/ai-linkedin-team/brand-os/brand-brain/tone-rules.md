# Tone rules
> Read by: content-engine (the voice check), /voice-regression.
> One broken rule sends the draft to queue/held-for-voice-review.md with the rule number, for example "failed N3".
> Every rule is checkable with a yes or a no. After any change here, run /voice-regression.

## Always
| # | Rule | Pass when |
|---|---|---|
| A1 | Arabic version comes first | The first block of the post is Arabic |
| A2 | Both versions carry the same claims | Every fact in one version appears in the other |
| A3 | The first line states the point or the problem | No question-only or setup-only opening line |
| A4 | One idea per paragraph | No paragraph makes two separate points |
| A5 | Ends with one question or one action for the reader | Last line is a single question or instruction |
| A6 | Every factual claim has a source ID or a [VERIFY] mark | Facts table in the draft is complete |
| A7 | Length fits the template | Within the length set in brief-templates.md |

## Never say
Every word or phrase in owner/brand-voice.md "Words I never use" fails on sight (rule N1).
| # | Never say | Say instead |
|---|---|---|
| N1 | Any word in owner/brand-voice.md "Words I never use" | A plain, specific verb or noun |
| N2 | "In today's fast-paced world" and any similar opener | Start with the point |
| N3 | "Let's talk about", "Here's the thing" | Start with the point |
| N4 | "Thrilled", "humbled to announce" | State the fact |

## Never do
| # | Rule |
|---|---|
| D1 | Invent a number, a study, a name, a quote or a result. |
| D2 | Make a claim that is not in messaging-bank.md, unless it is the owner's own experience given in the brief. |
| D3 | Tag or name a real person or company without the owner's permission noted in the brief. |
| D4 | Mention the owner's employer, its brands, people, projects or figures. |
| D5 | Use hashtags, semicolons, em dashes, asterisks or markdown symbols in post text. |
| D6 | Use a metaphor, cliché or generalisation ("everyone knows", "always", "never" as rhetoric). |
| D7 | Present a personal story the owner did not provide. |

## Topics I do not touch
| Topic | What to do instead |
|---|---|
| Politics, religion as argument | Leave it out |
| Saudi labour law or HR regulation | Only with an official source, and the item waits as URGENT for owner check |
| Medical or pharmaceutical advice | Leave it out |
| [FILL IN: any other topic] | [FILL IN] |

## Sensitive moments
- What pauses drafting: a national mourning period, a crisis involving the employer, a regional crisis. The owner creates owner/STOP.
- Who decides when posting restarts: the owner.

## Pass or fail
A draft passes only when every Always rule holds and no Never say or Never do rule is broken.
A failed draft is never quietly fixed.
