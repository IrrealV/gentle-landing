# Tasks: Interactive TUI and Demo Page

## Phase 1: Foundation & Page Integration

- [x] 1.1 Create `src/pages/demo.astro` reusing `Layout.astro`, `Navbar.astro`, and `Footer.astro` per `demo-page` spec.
- [x] 1.2 Update `src/components/ui/Navbar.astro` to include the `/demo` link in the navigation array for internal routing.
- [x] 1.3 Create `src/components/ui/InteractiveTUI.astro` skeleton with Functional Brutalism styles (mono, 0-4px radius, hard borders).

## Phase 2: Core TUI Implementation (FSM & Logic)

- [x] 2.1 Implement Vanilla JS IIFE in `InteractiveTUI.astro` to encapsulate terminal state and lifecycle.
- [x] 2.2 Implement the 3-state machine logic: State 1 (Prompt), State 2 (Menu Loop), State 3 (Climax).
- [x] 2.3 Implement deterministic state transitions and terminal output rendering with brand-neutral copy.
- [x] 2.4 Implement `AbortController` and `astro:page-load` / `astro:before-preparation` listeners for lifecycle management.

## Phase 3: Interaction & Accessibility

- [x] 3.1 Implement keyboard-first event listeners (Enter, Arrow keys, etc.) with `preventDefault` for handled shortcuts.
- [x] 3.2 Implement pointer/click fallbacks for all keyboard-driven actions to ensure device parity.
- [x] 3.3 Add ARIA labels, semantic headings, and focus management to the TUI interactive region for accessibility compliance.

## Phase 4: Testing & Verification

- [x] 4.1 Create `tests/interactive-tui-demo.test.mjs` using Node.js assert to verify component rendering and initial state.
- [x] 4.2 Manually verify keyboard-only navigation through the 3-state flow on the `/demo` route.
- [x] 4.3 Verify 100% brand independence in all rendered text and ARIA labels.
