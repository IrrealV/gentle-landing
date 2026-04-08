# configurator-page Specification

## Purpose

Define the tentative `/configurator` page behavior for realistic Gentle-AI ecosystem configuration using Functional Brutalism UI patterns.

## Requirements

### Requirement: Realistic Ecosystem Data Presentation

The system MUST present `/configurator` with realistic Gentle-AI ecosystem data, including agent list, skill list, and memory persistence toggles.

#### Scenario: Agent and skill catalogs are visible
- GIVEN a user opens `/configurator`
- WHEN configuration content is displayed
- THEN the page SHALL list realistic agent entries and skill entries representative of the Gentle-AI ecosystem
- AND each entry SHALL include at least a name and role/capability label

#### Scenario: Memory persistence controls are explicit
- GIVEN memory settings are shown
- WHEN the user inspects persistence options
- THEN toggles SHALL include project-scoped and session-scoped persistence controls
- AND default states SHALL be visibly indicated

### Requirement: Terminal-Centric Configuration Experience

The system SHOULD present configuration feedback using terminal-oriented UI patterns and shared primitives.

#### Scenario: Config output uses terminal visual model
- GIVEN a user interacts with configuration sections
- WHEN status or preview output is rendered
- THEN output SHOULD be displayed within `TerminalWindow` semantics

#### Scenario: Multi-profile presets use tabbed primitives
- GIVEN multiple environment or profile presets exist
- WHEN user switches presets
- THEN preset content SHOULD use `CodeTabs`-style tab interaction with accessible tab semantics

### Requirement: Tentative Scope and Internal-Only Behavior

The system MUST mark `/configurator` interactions as tentative/static (no backend execution) while preserving internal-only navigation.

#### Scenario: Tentative behavior is non-destructive
- GIVEN a user toggles options or selects presets
- WHEN actions complete
- THEN the interface SHALL update local UI state only
- AND no external API or command execution SHALL occur

#### Scenario: Configurator links remain internal
- GIVEN links from `/configurator` to docs/features/how-it-works
- WHEN activated
- THEN destinations MUST be internal routes or anchors only
