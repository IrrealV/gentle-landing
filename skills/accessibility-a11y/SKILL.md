---
name: accessibility-a11y
description: >
  Accessibility and keyboard interaction rules for gentle-landing.
  Trigger: use when editing tabs, buttons, ARIA labels, focus handling, or interactive UI.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Adding or changing interactive controls
- Working on keyboard navigation and focus states
- Updating ARIA labels or roles
- Building copy buttons, tabs, menus, or demo controls

## Critical Patterns

- Keep ARIA state in sync with visual state.
- Ensure tabs, buttons, and toggles remain keyboard operable.
- Preserve focus order and avoid trapping focus unintentionally.
- Use visible labels or accessible names for icon-only controls.
- Prefer semantic elements (`button`, `a`, `role="tab"`) over div-based controls.

## Code Examples

```astro
<button type="button" aria-pressed="false">Copy</button>
```

```astro
<div role="tablist" aria-label="Installation methods">
```

## Commands

```bash
npm run dev
```

## Resources

- **Templates**: See [assets/](assets/) for accessible interaction patterns.
- **Documentation**: See [references/](references/) for local a11y notes.
