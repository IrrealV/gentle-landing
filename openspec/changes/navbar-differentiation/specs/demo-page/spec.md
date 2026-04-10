# Delta for demo-page

## ADDED Requirements

### Requirement: Interactive Navbar for TUI-First Density

On `/demo`, the shared navbar MUST use the `interactive` variant to reduce vertical footprint and free usable viewport space for `InteractiveTUI`.

#### Scenario: Demo shell prioritizes terminal workspace
- GIVEN a user opens `/demo`
- WHEN the page shell is rendered
- THEN the `interactive` navbar SHALL consume less vertical space than the current shared baseline
- AND the released space MUST increase the immediately visible terminal interaction area

#### Scenario: Interactive variant preserves navigation behavior
- GIVEN the `interactive` variant is active
- WHEN users navigate using desktop links, mobile menu, or language toggle
- THEN existing destinations and active-state behavior MUST remain unchanged
- AND navigation MUST remain internal and non-breaking
