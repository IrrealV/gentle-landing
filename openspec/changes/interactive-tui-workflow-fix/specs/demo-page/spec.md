# Delta for demo-page

## ADDED Requirements

### Requirement: Demo Copy-Only Update Contract

When applying the interactive workflow fidelity fix, `/demo` MUST preserve the current page layout and structure, and SHALL update only explanatory copy related to the submenu-driven terminal behavior.

#### Scenario: Layout is preserved
- GIVEN the current `/demo` page composition (hero, main content region, sidebar, shared shell)
- WHEN the workflow-fix change is applied
- THEN section structure and layout MUST remain unchanged
- AND navbar/footer composition SHALL remain unchanged

#### Scenario: Explanatory copy reflects submenu fidelity
- GIVEN `/demo` explanatory text is displayed
- WHEN copy is updated for this change
- THEN it MUST explain that each menu option enters a distinct representative sub-screen flow
- AND it SHALL mention silent quit behavior and versioned logo/tagline fidelity in user-facing terms
