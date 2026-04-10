# Proposal: Interactive TUI Fix

## Intent

Fix `InteractiveTUI` so the browser demo matches the real `gentle-ai` Bubbletea workflow. The current demo starts with the wrong command/copy, diverges from the real welcome/menu flow, and accumulates duplicate key handlers across Astro navigations.

## Scope

### In Scope
- Correct startup copy to use the documented brew-based install wording while launching the interactive flow from `gentle-ai`.
- Align menu options, ordering, and section outcomes with `../gentle-ai` source/docs.
- Replace ad-hoc listener setup with a single-init lifecycle using `AbortController` plus Astro transition cleanup.
- Update `/demo` copy to explain the corrected flow without changing page layout.

### Out of Scope
- Rebuilding the real Bubbletea app in the browser.
- Changing site layout, navigation, or non-demo pages.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `interactive-tui`: startup flow, menu behavior, keyboard lifecycle, and rendered copy must mirror the real `gentle-ai` workflow.
- `demo-page`: supporting copy must describe the corrected demo behavior while preserving the existing shell/layout.

## Approach

Use `../gentle-ai` README, `docs/usage.md`, and TUI welcome/install screens as source of truth. Refactor the demo into an explicit lifecycle/state model: initialize once per page load, bind all listeners with one `AbortController`, clean up on `astro:before-swap` and `astro:page-unload`, and render browser-safe equivalents of the real welcome/menu sections.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/ui/InteractiveTUI.astro` | Modified | Fix startup command/copy, menu flow, section outputs, and event lifecycle |
| `src/pages/demo.astro` | Modified | Update explanatory text only |
| `openspec/specs/interactive-tui/spec.md` | Modified | Capture real-workflow fidelity + lifecycle guarantees |
| `openspec/specs/demo-page/spec.md` | Modified | Capture corrected `/demo` copy expectations |
| `tests/interactive-tui-demo.test.mjs` | Modified | Assert corrected flow and lifecycle contract |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Demo drifts again from upstream `gentle-ai` | Med | Derive behavior from documented/source-backed menu flow |
| Cleanup misses transition edge cases | Med | Standardize on one controller and Astro cleanup hooks |

## Rollback Plan

Revert `InteractiveTUI`, `/demo` copy, and related spec/test updates to the current archived demo behavior.

## Dependencies

- `../gentle-ai` README, `docs/usage.md`, and TUI source as canonical references.

## Success Criteria

- [ ] Demo starts with correct install wording and enters the interactive flow from `gentle-ai`.
- [ ] Menu/options and section behavior match the real `gentle-ai` welcome workflow.
- [ ] Repeated Astro navigations do not create duplicate/triple keyboard handling.
- [ ] `/demo` copy is updated without changing the existing layout/format.
