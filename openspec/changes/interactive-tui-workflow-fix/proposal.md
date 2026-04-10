# Proposal: Interactive TUI Workflow Fix

## Intent

Fix `InteractiveTUI` so `/demo` behaves like the real `../gentle-ai` welcome TUI instead of collapsing every selection into one generic `[OK]` log. The current browser demo also uses the wrong logo rendering and omits the versioned tagline, so it no longer represents the real submenu experience.

## Scope

### In Scope
- Replace the flat pipeline outcome with menu-option-specific sub-screens for install, upgrade, sync, upgrade+sync, model config, agent builder, backups, and silent quit.
- Swap in the canonical 17-line braille lips/face logo with discrete 5-band coloring and the real versioned tagline format.
- Preserve the existing `AbortController` cleanup pattern and current `/demo` page layout while updating supporting copy/tests.

### Out of Scope
- Rebuilding the full Bubbletea app in the browser with backend side effects.
- Changing site layout, navbar/footer composition, or non-`/demo` routes.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `interactive-tui`: menu selections must route to faithful representative sub-screen flows, logo/tagline fidelity must match upstream, and quit must exit silently.
- `demo-page`: supporting copy must explain the corrected submenu-driven experience without altering page structure.

## Approach

Use `../gentle-ai/internal/tui` screens as source of truth and refactor the demo into a browser-safe screen/state machine. Keep the existing prompt → menu flow, then branch into representative states per option: install (`Detection → Agents → Persona → Preset → Installing → Complete`), upgrade (check/ready/running/result), sync (confirm/running/result), upgrade+sync (confirm → upgrade → sync → combined result), models (entry + picker/config), agent builder (engine → prompt → SDD choice → generate/preview/install/complete), backups (list/restore/delete/rename flows), and quit (teardown with no synthetic success screen).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/ui/InteractiveTUI.astro` | Modified | Replace generic pipeline renderer with submenu-specific screen contracts; update logo/tagline fidelity; preserve lifecycle cleanup |
| `src/pages/demo.astro` | Modified | Update explanatory copy only |
| `tests/interactive-tui-demo.test.mjs` | Modified | Assert submenu flows, logo/tagline fidelity, and lifecycle behavior |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Browser demo drifts from upstream again | Med | Derive labels/states from `internal/tui/screens` and welcome/router contracts |
| Sub-screen complexity breaks keyboard behavior | Med | Keep one explicit state machine and retain `AbortController` teardown |

## Rollback Plan

Revert `InteractiveTUI`, `/demo` copy, and related test/spec updates to the current demo component.

## Dependencies

- `../gentle-ai/internal/tui/screens/*.go`, `styles/logo.go`, and `styles/styles.go`

## Success Criteria

- [ ] Each of the 8 menu options transitions into its own representative sub-screen flow instead of a shared log.
- [ ] The welcome view shows the exact 17-line logo with discrete color bands and a versioned tagline.
- [ ] Astro navigation/remounts still keep exactly one active keyboard listener set.
- [ ] `/demo` keeps its current layout while its copy accurately describes the corrected workflow.
