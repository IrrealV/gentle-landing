# Decisions — gentle-landing

## Product / Layout

- The hero should be install-first.
- The hero install window should show real platform-specific commands via tabs.
- The hero should keep the main text on the left and the install window on the right.
- The hero heading should use explicit three-line blocks to avoid mixed-color wrapping in ES.
- The demo terminal should remain width-stable and not expand the layout when selected.
- The docs page should prioritize mobile readability, even if that means a stacked fallback.

## Truthfulness

- Do not invent commands, presets, agent IDs, or capability counts.
- Treat the demo as a browser reconstruction, not the native runtime.
- Use explicit labels when something is an example.

## Interaction

- Command/code blocks should have copy buttons.
- Install method tabs should auto-select by OS, with a Go fallback.
- Spanish translation should remain neutral unless a product decision explicitly allows Rioplatense wording.

## Performance / UX

- Background mesh is interactive on desktop and simplified on mobile.
- Avoid layout overflow on mobile docs/demo pages.
- Keep motion stable across revisits and view transitions.
