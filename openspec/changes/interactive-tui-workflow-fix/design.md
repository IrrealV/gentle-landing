# Design: Interactive TUI Workflow Fix

## Technical Approach

We will replace the simplistic string-based phase tracker in `InteractiveTUI.astro` with a formal Finite State Machine (FSM) using explicit `PROMPT`, `LOOP`, and `CLIMAX` states, and strict `allowedTransitions`. The visual presentation will be upgraded by swapping the current linear-gradient ASCII logo with the canonical 17-line braille logo, applying discrete color banding per section. Finally, instead of reusing a single sequential log for all actions, we will implement dedicated representative sub-screen DOM constructs (e.g., specific layouts for Agent Builder, Backup Manager) that faithfully reflect the real upstream application.

## Architecture Decisions

### Decision: State Machine Implementation

**Choice**: Use a constants-based dictionary (`const STATES = { PROMPT: 'Prompt', LOOP: 'Menu Loop', CLIMAX: 'Climax' }`) and a transition matrix (`allowedTransitions`).
**Alternatives considered**: A full class-based state machine or an external library like XState.
**Rationale**: Keeps the component lightweight and dependency-free while satisfying deterministic behavioral requirements and separating transition logic explicitly.

### Decision: Logo Rendering

**Choice**: Use a multi-line literal string for the 17-line braille logo, splitting it into distinct vertical bands and applying discrete styling colors (using the Rose Pine palette) to each band.
**Alternatives considered**: Linear gradient via CSS `background-clip`.
**Rationale**: A linear gradient merely approximates the upstream styling. Applying discrete color bands guarantees absolute visual fidelity with the genuine terminal experience.

### Decision: Pipeline Sub-screens

**Choice**: Replace the generic `PIPELINES` object with distinct JS render functions or DOM templates for each menu option in the `CLIMAX` state.
**Alternatives considered**: Extending the current log array to support branches.
**Rationale**: The real TUI paths (e.g., Agent Builder vs Backup Manager) have radically different UX patterns (forms, pickers) that cannot be accurately represented by a linear log.

## Data Flow

    [Page Load / astro:page-load]
           │
           ▼
    Initialize FSM (State: PROMPT) ──► Typewriter Animation
                                          │
                                          ▼
    [Transition to LOOP] ────────────► Bubbletea Menu (j/k/enter)
                                          │
                                          ▼
    [Transition to CLIMAX] ──────────► Option-Specific Sub-screen
                                       (e.g., Backup Manager, Agent Builder)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/InteractiveTUI.astro` | Modify | Implement formal FSM, 17-line colored logo, dedicated sub-screens, arrow IIFE (`(() => {`), and `astro:before-preparation` hook. |
| `src/pages/demo.astro` | Modify | Update explanatory copy to reference the new sub-screens and FSM states instead of the generic pipeline. |

## Interfaces / Contracts

```javascript
const STATES = {
    PROMPT: 'Prompt',
    LOOP: 'Menu Loop',
    CLIMAX: 'Climax'
};

const allowedTransitions = {
    [STATES.PROMPT]: [STATES.LOOP],
    [STATES.LOOP]: [STATES.CLIMAX],
    [STATES.CLIMAX]: [STATES.PROMPT] // Reset via 'R'
};

function transitionTo(newState) {
    if (!allowedTransitions[currentState]?.includes(newState)) {
        console.warn(`Illegal transition ignored: ${currentState} -> ${newState}`);
        return false;
    }
    // Execute transition logic...
    currentState = newState;
    return true;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | FSM | Validate existing `test('interactive tui implements deterministic three-state FSM')` assertions pass. |
| Unit | Lifecycle | Validate `astro:before-preparation` and `IIFE` hook tests pass. |
| Demo | Layout | Ensure the page layout in `/demo` does not jump or break with the larger 17-line logo and new screen contents. |

## Migration / Rollout

No migration required. This is a component-level visual and structural update within the Astro site.

## Open Questions

- None.
