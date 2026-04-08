# Delta for design-tokens

## MODIFIED Requirements

### Requirement: Material-Derived Dark Token Set

The system MUST expose a complete Functional Brutalism dark token map sourced from all five Stitch references, including surfaces, on-surfaces, primary/secondary/tertiary sets, outline tiers, status accents, and window-control tokens used by terminal-like components.
(Previously: token map required homepage-oriented dark tokens without explicit five-page consolidation.)

#### Scenario: Consolidated token groups resolve across all pages
- GIVEN Tailwind classes reference stitch-aligned token names
- WHEN pages (`/`, `/features`, `/docs`, `/how-it-works`, `/configurator`) render
- THEN required `surface*`, `on-surface*`, `primary*`, `secondary*`, `tertiary*`, `outline*`, and terminal control tokens SHALL resolve

#### Scenario: Contrast hierarchy remains consistent after consolidation
- GIVEN text, container, and divider combinations
- WHEN rendered in dark mode
- THEN content MUST stay legible and depth tiers MUST remain visually distinct

### Requirement: Typography and Icon Contract

The system MUST provide typography and icon primitives matching Functional Brutalism references: mono-forward labels/headlines, sans body text, and Material Symbols Outlined across navigation, docs, and configurator controls.
(Previously: typography and icon contract focused on homepage role-based contexts.)

#### Scenario: Typography roles remain deterministic
- GIVEN headings, labels, body, code, and table cells
- WHEN style roles are applied
- THEN headline/label/code SHALL use mono-first stacks and body SHALL use sans stack

#### Scenario: Material Symbols render across shared components
- GIVEN shared components (Navbar, Footer, CodeTabs, TerminalWindow)
- WHEN icons are requested
- THEN Material Symbols Outlined MUST render without fallback corruption

### Requirement: Shape and Hairline Utility Primitives

The system MUST provide low-radius shape tokens and hairline utility primitives (`border`, `bottom`, `right`) for structural separation across all migrated pages and shared components.
(Previously: shape/hairline primitives were defined for homepage section and panel boundaries.)

#### Scenario: Brutalist shape constraints are preserved
- GIVEN cards, buttons, tab headers, and terminal shells
- WHEN radius utilities are applied
- THEN rounding SHALL remain intentionally low-profile

#### Scenario: Hairline utilities are reusable cross-page
- GIVEN docs sidebar, bento cards, and configurator terminal panels
- WHEN separator utilities are applied
- THEN one-pixel divider utilities MUST be available for full, bottom, and right boundaries
