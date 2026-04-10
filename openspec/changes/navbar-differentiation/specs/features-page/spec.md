# Delta for features-page

## ADDED Requirements

### Requirement: Default Navbar Variant for Product Narrative Pages

The shared navbar MUST use the `default` variant on `/features` and `/how-it-works` to preserve the current technical-explanatory reading flow.

#### Scenario: Default variant on features route
- GIVEN a user opens `/features`
- WHEN the page shell renders
- THEN the navbar SHALL use the `default` variant
- AND current link set, active state, language switcher, and mobile menu behavior MUST remain intact

#### Scenario: Default variant on how-it-works route
- GIVEN a user opens `/how-it-works`
- WHEN the page shell renders
- THEN the navbar SHALL use the same `default` variant contract used by `/features`
- AND internal navigation continuity MUST remain unchanged
