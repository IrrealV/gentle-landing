# Tasks: Interactive TUI Workflow Fix

## Phase 1: Foundation & Lifecycle Safety

- [ ] 1.1 Implement constants-based FSM in `src/components/ui/InteractiveTUI.astro` with `PROMPT`, `LOOP`, and `CLIMAX` states.
- [ ] 1.2 Add `allowedTransitions` matrix and `transitionTo` logic to `InteractiveTUI.astro` to ensure deterministic behavior.
- [ ] 1.3 Ensure `AbortController` cleanup and single listener set logic is preserved via IIFE and `astro:before-preparation` hook.

## Phase 2: Visual Fidelity (Logo & Tagline)

- [ ] 2.1 Implement the canonical 17-line braille logo in `InteractiveTUI.astro` using discrete per-band coloring (Mauve, Lavender, Blue, Teal, Green).
- [ ] 2.2 Update the welcome tagline in `InteractiveTUI.astro` to use the versioned format: `AI Gentle Stack v{version} — One command. Any agent. Any OS.`

## Phase 3: Sub-screen Architecture

- [ ] 3.1 Replace the generic `PIPELINES` log with discrete sub-screen flow renderers in `InteractiveTUI.astro`.
- [ ] 3.2 Implement representative state sequences for all 8 menu options (Install, Upgrade, Sync, Upgrade+Sync, Models, Agent Builder, Backups, Quit).
- [ ] 3.3 Ensure `Quit` option executes silent teardown without rendering a synthetic success/result state.

## Phase 4: Demo Page Update

- [ ] 4.1 Update explanatory copy in `src/pages/demo.astro` to describe the new submenu-driven flows and logo fidelity.
- [ ] 4.2 Verify `/demo` layout, section structure, and shell components remain unchanged.

## Phase 5: Verification & Testing

- [ ] 5.1 Update `tests/interactive-tui-demo.test.mjs` to assert distinct sub-screen flows for each menu option.
- [ ] 5.2 Add test assertions for 17-line logo line count and versioned tagline format.
- [ ] 5.3 Validate lifecycle cleanup by simulating Astro navigation and checking for duplicate listeners.
- [ ] 5.4 Ensure no generic log remains in any of the menu option flows.
