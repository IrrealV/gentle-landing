# Delta for demo-page

## MODIFIED Requirements

### Requirement: Demo Route and Shell Composition

The system MUST expose a `/demo` route that reuses the shared `Navbar` and `Footer`, places `InteractiveTUI` in the main content region, and preserves the existing page structure/layout while updating supporting copy to describe the corrected `gentle-ai` install-and-launch flow.

(Previously: `/demo` had to host `InteractiveTUI`, but the requirement did not constrain copy updates to preserve the existing layout.)

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

#### Scenario: Demo copy explains the corrected workflow without layout drift
- GIVEN the hero and sidebar copy are rendered
- WHEN the page describes how the demo works
- THEN the copy SHALL mention the brew-based install wording and launching the workflow from `gentle-ai`
- AND the existing `/demo` section structure and two-column layout MUST remain intact

### Requirement: Demo Page Accessibility Baseline

The `/demo` page MUST preserve keyboard-first navigation, semantic landmarks, and accurate helper copy so users can reach and operate `InteractiveTUI` without pointer input after the workflow text is updated.

(Previously: the page required keyboard reachability and semantics, but helper copy accuracy after workflow updates was not explicit.)

#### Scenario: Keyboard users can reach interactive region
- GIVEN a keyboard-only user tabs through `/demo`
- WHEN focus advances from `Navbar` into main content
- THEN focus SHALL reach the `InteractiveTUI` interactive region in a predictable order

#### Scenario: Interactive region has accessible name
- GIVEN assistive technology inspects `/demo` main content
- WHEN it encounters the `InteractiveTUI` region
- THEN the region MUST expose an accessible label via semantic heading and/or ARIA labeling

#### Scenario: Keyboard help remains accurate
- GIVEN visible keyboard guidance is shown on `/demo`
- WHEN a user relies on that guidance
- THEN the described keys SHALL match the interactive behavior that remains available on the page
