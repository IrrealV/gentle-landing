---
name: content-integrity
description: >
  Content truthfulness and upstream parity rules for gentle-landing.
  Trigger: use when editing docs, command examples, stats, links, or any claim about gentle-ai.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Editing documentation or landing-page copy
- Updating install commands, stats, or capability claims
- Comparing the landing against `../gentle-ai`
- Adding links to the upstream repo or README

## Critical Patterns

- Keep claims grounded in the actual `../gentle-ai` project.
- Do not invent features, counts, presets, or integrations.
- Keep command examples copy/paste safe.
- Distinguish between factual documentation and illustrative UI teasers.
- When in doubt, prefer explicit labels such as "example" or "browser reconstruction".

## Code Examples

```astro
<a href="https://github.com/Gentleman-Programming/gentle-ai/blob/main/README.md">Official docs</a>
```

## Commands

```bash
git diff
```

## Resources

- **Templates**: See [assets/](assets/) for content-check patterns.
- **Documentation**: See [references/](references/) for upstream parity notes.
