---
name: i18n-copy-sync
description: >
  Translation and copy synchronization rules for gentle-landing.
  Trigger: use when editing English/Spanish content, data-label attributes, aria labels, or localized UI strings.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Editing translated UI copy
- Adding or fixing `data-label-*`, `data-i18n-*`, or `data-aria-label-*`
- Syncing visible text with English/Spanish variants
- Adjusting copy that wraps differently between languages

## Critical Patterns

- Keep EN and ES content structurally equivalent.
- Prefer explicit line/block structure for headings and hero text.
- Avoid inline spans that wrap differently across languages when color bands matter.
- Keep technical commands, IDs, and file names truthful and untranslated when needed.
- If copy affects layout, validate both languages, not just English.

## Code Examples

```astro
<span data-label-en="Install" data-label-es="Instalar">Install</span>
```

```astro
<span data-i18n-en="Line 1" data-i18n-es="Línea 1">Line 1</span>
```

## Commands

```bash
npm run dev
```

## Resources

- **Templates**: See [assets/](assets/) for localization patterns.
- **Documentation**: See [references/](references/) for copy and translation notes.
