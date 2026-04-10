# Design: Interactive TUI Fix

## Technical Approach

We will refactor `InteractiveTUI.astro` to act as a deterministic state machine (`Prompt`, `Menu Loop`, and distinct `Sub-screens`) modeling the real `gentle-ai` startup and Bubbletea workflow. The component will leverage a robust lifecycle managed by `AbortController` bound to Astro page transition events to guarantee single initialization and strict cleanup of keyboard listeners. We will replace the generic pipeline output with a dedicated sub-screen architecture where each of the 8 menu options operates its own internal contract and state logic. The 17-line braille logo will be rendered with discrete per-band coloring while preserving the existing page layout. Finally, explanatory text in `src/pages/demo.astro` will be updated to reflect the new flow and sub-screen behaviors.

## Architecture Decisions

### Decision: State & Event Lifecycle Management

**Choice**: Use an idempotency guard (`data-initialized`) coupled with an `AbortController` to register and unregister global keyboard listeners during Astro's `astro:before-swap` and `astro:page-unload` events.
**Alternatives considered**: Ad-hoc `removeEventListener` using a named function reference.
**Rationale**: Ad-hoc cleanup often leaves orphaned listeners in Astro when navigating away and back. `AbortController` ensures robust atomic cleanup of all listeners without tracking individual references.

### Decision: Per-Option Sub-screen Architecture

**Choice**: Replace the generic success-log pipeline with a sub-screen architecture where each of the 8 menu options routes to its own state machine or rendering contract.
**Alternatives considered**: Keep a single generic logging pipeline driven by a static data array.
**Rationale**: Real CLI tools (like `gentle-ai`) have complex interactive sub-screens (e.g., config managers, backup navigators, prompt inputs) that cannot be modeled by static success logs. A sub-screen contract allows for dedicated keyboard handling and specific visual layouts per option.

### Decision: Logo Rendering

**Choice**: Render the full 17-line braille logo as a preformatted `<pre>` block, manually wrapping distinct line bands in `<span>` tags to apply discrete colors.
**Alternatives considered**: Using a CSS `linear-gradient` mask over the entire text block.
**Rationale**: The requirement specifies "discrete per-band coloring." CSS gradients interpolate colors smoothly, violating the "discrete" coloring requirement, while manual spans allow exact mapping of solid colors to specific bands.

## Data Flow

```text
Astro Page Load ──→ initTUI()
                      │
                      ├─► Check dataset.initialized (idempotency guard)
                      ├─► Mount AbortController
                      │
                      ├─► [State: Prompt]
                      │     └─► Type "gentle-ai" ──→ switch to Menu Loop
                      │
                      ├─► [State: Menu Loop]
                      │     └─► Listen to keys (signal bound)
                      │     └─► Update Selection State (cursor)
                      │     └─► On Enter ──→ switch to Sub-Screen (1 of 8)
                      │
                      ├─► [State: Sub-Screens (Option 0-7)]
                      │     └─► Render specialized DOM for the option
                      │     └─► Handle option-specific keyboard input
                      │     └─► On Escape/Quit ──→ return to Menu Loop (or restart)
                      │
Astro Page Swap ──→ controller.abort() & disconnect observers
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/InteractiveTUI.astro` | Modify | Implement `AbortController` lifecycle. Replace generic pipeline phase with 8 discrete sub-screen handlers and state logic. Update logo string to 17-line braille format with discrete per-band color spans. Add shared rendering helpers for sub-screens. |
| `src/pages/demo.astro` | Modify | Update sidebar textual copy to reflect the new architecture and install + launch story, keeping all layout and grid classes intact. |

## Interfaces / Contracts

**TUI Internal State Model:**
```javascript
// State can be 'prompt', 'menu', or a specific sub-screen:
let phase = 'prompt'; 
let cursor = 0;       // tracks selected menu option index (0-7)

// Sub-screen transition map:
const SCREEN_ROUTERS = {
    0: renderInstallScreen,
    1: renderUpgradeScreen,
    2: renderSyncScreen,
    3: renderUpgradeSyncScreen,
    4: renderConfigScreen,
    5: renderAgentScreen,
    6: renderBackupsScreen,
    7: renderQuitScreen
};

// Unified Cleanup Hook Example:
const controller = new AbortController();
document.addEventListener('keydown', keyHandler, { signal: controller.signal });
document.addEventListener('astro:before-swap', cleanup, { once: true, signal: controller.signal });
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit/Node | Lifecycle hooks | Ensure `initTUI` adds `data-initialized` and that `AbortController` handles unmounting safely. |
| E2E (Manual) | Sub-screen Routing | Navigate into each of the 8 menu options to verify the sub-screen renders correctly and keyboard routing delegates properly. |
| E2E (Manual) | Astro navigations | Navigate to `/demo`, return to `/`, then back to `/demo`. Verify only one keypress registers. |

## Migration / Rollout

No migration required. The TUI's internal color palette continues to run independently of the global site's framework.

## Open Questions

- None
