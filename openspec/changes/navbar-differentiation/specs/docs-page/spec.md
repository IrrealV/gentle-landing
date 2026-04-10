# Delta for docs-page

## ADDED Requirements

### Requirement: Compact Navbar Subordinate to Docs Sidebar

On `/docs`, the shared navbar MUST use the `compact` variant and SHALL remain visually subordinate to the persistent documentation sidebar.

#### Scenario: Docs hierarchy prioritizes sidebar
- GIVEN a user views `/docs`
- WHEN the page shell and sidebar are inspected together
- THEN the `compact` navbar SHALL occupy less visual emphasis than the sidebar navigation
- AND sidebar discoverability and section-scanning priority MUST remain dominant

#### Scenario: Compact variant keeps shared contracts
- GIVEN the `compact` navbar is active on `/docs`
- WHEN a user switches language or opens mobile navigation
- THEN language switching and mobile menu behavior MUST remain functional
- AND all existing internal navbar destinations SHALL remain available
