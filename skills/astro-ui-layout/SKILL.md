---
name: astro-ui-layout
description: >
  Astro UI and layout conventions for the gentle-landing project.
  Trigger: use when editing Astro components, grids, hero layouts, responsive sections, view transitions, or motion.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Editing `.astro` components
- Adjusting page grids, spacing, or section order
- Working on responsive hero/layout patterns
- Changing view-transition-sensitive UI
- Tuning motion/animation on landing pages

## Critical Patterns

- Prefer explicit DOM/layout order over CSS reversal tricks.
- Keep hero and section layouts readable in both desktop and mobile breakpoints.
- Preserve current grid semantics when changing widths or spans.
- Avoid introducing layout shift when toggling states or tabs.
- Use minimal, localized changes for one component at a time.

## Code Examples

```astro
<section class="grid grid-cols-1 lg:grid-cols-12 gap-10">
  <div class="lg:col-span-5">...</div>
  <div class="lg:col-span-7">...</div>
</section>
```

## Commands

```bash
npm run dev
npm run build
```

## Resources

- **Templates**: See [assets/](assets/) for component/layout examples.
- **Documentation**: See [references/](references/) for local docs and notes.
