---
description: Runs the voice check against the approved posts in tests/voice-test-set.md. Use after every change to tone-rules.md, voice-guide.md or owner/brand-voice.md. Reports only, changes nothing.
---
# Voice regression check

1. Read brand-os/brand-brain/tone-rules.md, brand-os/brand-brain/voice-guide.md and owner/brand-voice.md.
2. Read every post in tests/voice-test-set.md. These are posts the owner approved as on-voice.
3. Test each post against every rule, the same way content-engine runs its voice check.
4. Report a table: post ID, pass or fail, rule numbers that failed, the line that failed.

Any approved post that now fails means a recent rule change is too strict or contradicts another rule.
Name the rule. Recommend the smallest change that makes all test posts pass again. Do not edit any file.
