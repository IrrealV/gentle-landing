# Delta for landing-page

## ADDED Requirements

### Requirement: Route-Aware Navbar Variant Matrix

The shared `Navbar` component MUST support route-aware variants in the page shell without changing information architecture: `marketing` for `/`, `default` for `/features` and `/how-it-works`, `compact` for `/docs`, and `interactive` for `/demo`.

#### Scenario: Variant mapping applies per route
- GIVEN a user opens `/`, `/features`, `/how-it-works`, `/docs`, or `/demo`
- WHEN the page shell renders or updates after internal navigation
- THEN the navbar SHALL use the mapped variant for that route
- AND the implementation SHALL continue using one shared `Navbar` component with variant inputs (props/classes)

### Requirement: Navigation Contract Preservation Across Variants

All navbar variants MUST preserve existing navigation destinations, active-link semantics, language switching behavior, and mobile menu availability.

#### Scenario: IA and interaction parity remain intact
- GIVEN any navbar variant is active
- WHEN desktop or mobile navigation is used
- THEN existing destinations (`/`, `/features`, `/how-it-works`, `/docs`, `/demo`) MUST remain available and unchanged
- AND active state, language switcher behavior, and mobile menu behavior SHALL remain equivalent to current behavior

### Requirement: Home Promotional Tone Guardrails

The `marketing` variant on `/` MAY increase promotional emphasis, but MUST remain faithful to verified `../gentle-ai` vocabulary/behavior and SHOULD keep Spanish labels neutral when label text changes are introduced.

#### Scenario: Promotional tone remains faithful
- GIVEN the home navbar variant is `marketing`
- WHEN copy or label styling is adjusted for promotional emphasis
- THEN wording MUST NOT introduce unsupported capability claims
- AND any Spanish labels introduced or changed SHALL use neutral technical Spanish
