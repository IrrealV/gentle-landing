# demo-page Specification

## Purpose

Define the behavior of `/demo` as the dedicated host page for `InteractiveTUI`, while preserving the shared global shell.

## Requirements

### Requirement: Demo Route and Shell Composition

The system MUST expose a `/demo` route that reuses the shared `Navbar` and `Footer`, places `InteractiveTUI` in the main content region, and preserves the current demo page structure/layout while updating only behavior/content contracts.

#### Scenario: Demo route renders with global shell
- GIVEN a user opens `/demo`
- WHEN the page loads
- THEN the top-level layout SHALL include the shared `Navbar`
- AND the bottom layout SHALL include the shared `Footer`
- AND the primary content area SHALL contain `InteractiveTUI`

#### Scenario: Demo route is first-class internal page
- GIVEN a user is navigating the site
- WHEN `/demo` is requested directly or via internal navigation
- THEN the page MUST resolve without external redirects
- AND the route MUST remain internal-only (`/demo`)

#### Scenario: Layout remains unchanged when TUI contract updates
- GIVEN `/demo` renders with the current hero, main grid, sidebar sections, and shell
- WHEN `InteractiveTUI` behavior/content fidelity is updated
- THEN the page SHALL keep the existing section and layout structure unchanged
- AND only the `InteractiveTUI` behavior/content contract SHALL change

### Requirement: InteractiveTUI Contract Projection on /demo

The `/demo` host contract MUST reflect the real Gentle-AI welcome behavior projected by `InteractiveTUI`: canonical 17-line braille logo with discrete color bands, tagline including version string, and per-option sub-screen transitions for all 8 menu options.

#### Scenario: Demo host presents logo and tagline fidelity
- GIVEN a user reaches `/demo`
- WHEN the terminal menu view is rendered
- THEN the hosted component MUST display the canonical 17-line braille logo using per-band line coloring (not a smooth gradient)
- AND the tagline MUST include the version string

#### Scenario: Demo host preserves per-option behavior fidelity
- GIVEN the menu options are available in `/demo`
- WHEN each of the 8 options is selected
- THEN each option MUST transition into its own realistic sub-screen/state contract
- AND the behavior SHALL map to install flow, upgrade results, sync confirmation/result, combined upgrade+sync flow, model selection, create-agent wizard, backup manager, and silent quit

### Requirement: Demo Page Accessibility Baseline

The `/demo` page MUST preserve keyboard-first navigation and semantic landmarks so users can reach and operate `InteractiveTUI` without pointer input.

#### Scenario: Keyboard users can reach interactive region
- GIVEN a keyboard-only user tabs through `/demo`
- WHEN focus advances from `Navbar` into main content
- THEN focus SHALL reach the `InteractiveTUI` interactive region in a predictable order

#### Scenario: Interactive region has accessible name
- GIVEN assistive technology inspects `/demo` main content
- WHEN it encounters the `InteractiveTUI` region
- THEN the region MUST expose an accessible label via semantic heading and/or ARIA labeling
