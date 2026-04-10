# Tasks: Interactive TUI Fix

## Phase 1: Lifecycle & Foundation

- [ ] 1.1 Implement `AbortController` lifecycle and `data-initialized` guard in `initTUI()` inside `InteractiveTUI.astro`.
- [ ] 1.2 Register cleanup listeners for `astro:before-swap` and `astro:page-unload` that trigger `controller.abort()`.
- [ ] 1.3 Bind all global keyboard listeners to the `controller.signal` to ensure automatic cleanup.

## Phase 2: UI Fidelity & Branding

- [ ] 2.1 Implement the 17-line braille logo in `InteractiveTUI.astro` using discrete `<span>` bands for 5-band coloring.
- [ ] 2.2 Update the TUI heading copy to include the version string (e.g., `gentle-ai v0.x.x`).
- [ ] 2.3 Update the menu selection cursor to `▸ ` and ensure consistent Rose Pine styling.
- [ ] 2.4 Insert static Homebrew install logs (`brew tap`, `brew install gentle-ai`) above the typing line.

## Phase 3: Core Logic & Menu Loop

- [ ] 3.1 Refactor state machine to support three primary states: `Prompt`, `Menu Loop`, and `Sub-Screen`.
- [ ] 3.2 Update `OPTIONS` array with all 8 real Gentle-AI menu items in the correct order.
- [ ] 3.3 Implement the `Menu Loop` selection logic (Up/Down) and transition to `Sub-Screen` on `Enter`.
- [ ] 3.4 Ensure the `Prompt` state transitions correctly to `Menu Loop` after the `gentle-ai` launch sequence.

## Phase 4: Sub-Screen Implementation

- [ ] 4.1 Implement dedicated renderer for the "Start installation" sub-screen flow.
- [ ] 4.2 Implement dedicated renderer for the "Upgrade tools" sub-screen flow.
- [ ] 4.3 Implement dedicated renderer for the "Sync configs" sub-screen flow.
- [ ] 4.4 Implement dedicated renderer for the "Upgrade + Sync" sub-screen flow.
- [ ] 4.5 Implement dedicated renderer for the "Configure models" sub-screen flow.
- [ ] 4.6 Implement dedicated renderer for the "Create Agent" sub-screen flow.
- [ ] 4.7 Implement dedicated renderer for the "Manage backups" sub-screen flow.
- [ ] 4.8 Implement dedicated renderer for the "Quit" sub-screen flow.
- [ ] 4.9 Add "Escape" or "Quit" key handling to return from any sub-screen to the `Menu Loop`.

## Phase 5: Demo Page Integration

- [ ] 5.1 Update `/demo` sidebar and hero explanatory text to reflect the brew-based install and launch story.
- [ ] 5.2 Verify that `/demo` layout, grid structure, and global shell components remain unchanged.

## Phase 6: Testing & Verification

- [ ] 6.1 Manual Test: Verify no duplicate listeners after multiple Astro navigations to/from `/demo`.
- [ ] 6.2 Manual Test: Confirm all 8 menu options route to their correct dedicated sub-screens.
- [ ] 6.3 Visual Check: Ensure logo renders with 17 lines and 5 discrete color bands.
- [ ] 6.4 Logic Check: Verify `r` key resets the entire TUI to the initial `Prompt` state.
