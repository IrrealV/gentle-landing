# demo-page Specification

## Purpose

Define the behavior of `/demo` as the dedicated host page for `InteractiveTUI`, while preserving the shared global shell.

## Requirements

### Requirement: Demo Route and Shell Composition

The system MUST expose a `/demo` route that reuses the shared `Navbar` and `Footer` and places `InteractiveTUI` in the main content region.

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
