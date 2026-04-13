---
name: responsive-visual-regression
description: >
  Responsive layout and visual regression rules for gentle-landing.
  Trigger: use when adjusting mobile/desktop layouts, overflow, spacing, or visual stability.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Fixing mobile overflow or layout breakage
- Adjusting desktop/mobile breakpoint behavior
- Changing backgrounds, meshes, or animated chrome
- Comparing layout stability between languages and breakpoints

## Critical Patterns

- Test both narrow and wide layouts when changing any component width.
- Prevent horizontal overflow on mobile.
- Prefer `min-w-0` in flex/grid children that contain wide content.
- Keep desktop interactions intact while providing mobile-safe fallbacks.
- Avoid introducing layout jumps from animated or tabbed content.

## Code Examples

```astro
<div class="min-w-0 flex-1">...</div>
```

```css
@media (max-width: 1023px) {
  .mobile-only { overflow-x: hidden; }
}
```

## Commands

```bash
npm run dev
npm run preview
```

## Resources

- **Templates**: See [assets/](assets/) for responsive layout examples.
- **Documentation**: See [references/](references/) for layout notes.
