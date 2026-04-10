# Design: Interactive TUI and Demo Page

## Technical Approach

The change introduces a new `/demo` page featuring an `InteractiveTUI` component built with Astro 6.x and Tailwind CSS. The design adheres to the project's Functional Brutalism style (mono typography, dual-palette, hard borders). To ensure smooth navigation between tabs, it leverages Astro's View Transitions (`astro:page-load`). Client-side state and interactivity within the TUI will be managed using a Vanilla JS Immediately Invoked Function Expression (IIFE) and an `AbortController` to handle the event lifecycle cleanly across view transitions without framework overhead.

## Architecture Decisions

### Decision: Vanilla JS IIFE + AbortController for State and Lifecycle

**Choice**: Encapsulate TUI state within a Vanilla JS IIFE and use `AbortController` to manage event listener lifecycles.
**Alternatives considered**: Using a framework like React/Svelte for state management, or global window variables.
**Rationale**: Aligns with Astro's island architecture by keeping client-side JS minimal and vanilla. The IIFE prevents global scope pollution, while `AbortController` provides a reliable mechanism to remove all event listeners during Astro's view transitions, preventing memory leaks and duplicate event bindings when navigating.

### Decision: Native Astro View Transitions Integration

**Choice**: Rely on `astro:page-load` event and standard view transitions for initialization and cleanup.
**Alternatives considered**: SPA router library or full page reloads.
**Rationale**: The project already uses `astro:transitions`. Listening to `astro:page-load` ensures the IIFE logic correctly initializes on entry and tears down via `AbortController` on exit, providing a seamless user experience.

## Data Flow

    [User Interaction] ──→ TUI Event Listener (DOM)
                               │
                               ▼
    [AbortController] ──→ IIFE Closure (Local State Update)
                               │
                               ▼
                        DOM Update (Visual Change)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/demo.astro` | Create | New page to host the TUI demo, extending the base `Layout`. |
| `src/components/ui/InteractiveTUI.astro` | Create | Core TUI component with encapsulated HTML, styling, and vanilla JS IIFE. |
| `src/components/ui/Navbar.astro` | Modify | Add the `/demo` page to the main navigation links array. |

## Interfaces / Contracts

**InteractiveTUI.astro Component Contract:**

```astro
---
interface Props {
  initialCommand?: string;
}
const { initialCommand = 'gentle-ai start' } = Astro.props;
---
```

**Vanilla JS Lifecycle Pattern:**

```javascript
<script is:inline>
  document.addEventListener('astro:page-load', () => {
    // Only initialize if the component is present on the current page
    const tuiContainer = document.getElementById('interactive-tui');
    if (!tuiContainer) return;

    const controller = new AbortController();
    const { signal } = controller;
    
    // Encapsulated state
    let currentInput = '';
    const outputLog = [];

    // Initialization logic
    const initTUI = () => {
        const inputElement = document.getElementById('tui-input');
        if(!inputElement) return;

        inputElement.addEventListener('keydown', (e) => {
            // handle interaction
        }, { signal });
    };

    initTUI();

    // Cleanup on view transition
    document.addEventListener('astro:before-preparation', () => {
      controller.abort();
    }, { once: true });
  });
</script>
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Component Rendering | Use Node.js assert to verify Astro component renders correct initial DOM structure. |
| Integration | N/A | Not configured/available. |
| E2E | N/A | Not configured/available. |

## Migration / Rollout

No migration required. This is an additive feature.

## Open Questions

- None