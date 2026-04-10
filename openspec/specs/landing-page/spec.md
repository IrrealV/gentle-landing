# Landing Differentiation Specification

## Purpose

Define differentiated copy and motion behavior for the landing experience while preserving brand consistency and fidelity to verified `../gentle-ai` documentation.

## Requirements

### Requirement: Corrected Change Scope

The system MUST apply the `landing-differentiation` change only to:

- `src/components/ui/Hero.astro`
- `src/pages/index.astro`
- `src/pages/features.astro`
- `src/pages/how-it-works.astro`
- `src/pages/docs.astro`
- `src/pages/demo.astro`
- shared motion/style utilities when required for consistency

The system MUST NOT modify `src/pages/configurator.astro` for this change.

#### Scenario: Configurator remains out of scope
- GIVEN the landing-differentiation work is planned or reviewed
- WHEN affected files are enumerated
- THEN `src/pages/configurator.astro` SHALL be excluded from edits
- AND only the declared in-scope files SHALL be eligible for updates

### Requirement: Hero Color Differentiation Without Structural Change

The Hero MUST keep the current slogan direction and preserve existing layout and CTA structure, while applying a three-part color treatment using the brand theme colors.

#### Scenario: Hero slogan gains color segmentation
- GIVEN `src/components/ui/Hero.astro` is rendered
- WHEN the primary slogan is displayed
- THEN the slogan SHALL be visually segmented across the 3 theme colors
- AND CTA placement/order SHALL remain unchanged

### Requirement: Page-Specific Copy Roles

The system MUST assign non-overlapping narrative roles to avoid cloned messaging across pages:

- Home (`/`): ecosystem configurator positioning + workflow entry + demo entry
- Features (`/features`): capabilities visible after install
- How It Works (`/how-it-works`): install-to-workflow explanation
- Docs (`/docs`): technical manual/reference framing
- Demo (`/demo`): real TUI fidelity and terminal-first narrative

#### Scenario: Each page has a distinct copy intent
- GIVEN a reader visits each in-scope page
- WHEN headings and lead paragraphs are compared
- THEN each page SHALL reflect its assigned role
- AND repeated cross-page slogans SHALL be minimized

### Requirement: Neutral Spanish Translation Policy

All Spanish (`ES`) strings introduced or updated by this change MUST use neutral Spanish suitable for broad technical audiences.

#### Scenario: ES content avoids regional bias
- GIVEN ES strings are reviewed across in-scope pages
- WHEN lexical and tonal consistency is checked
- THEN vocabulary SHALL remain neutral and technical
- AND meaning SHALL remain equivalent to approved English source copy

### Requirement: Distinct Motion Language Per Page

Motion behavior MUST differentiate pages so they do not feel cloned, while staying consistent with the existing brand motion character.

#### Scenario: Motion patterns are differentiated but coherent
- GIVEN transitions/animations are observed on in-scope pages
- WHEN page behavior is compared
- THEN each page SHALL exhibit a distinct motion emphasis
- AND shared timing/easing conventions SHALL preserve brand cohesion

### Requirement: Verified-Fidelity Copy Policy

All copy changes MUST remain faithful to verified `../gentle-ai` docs and MUST NOT introduce unsupported capability claims.

#### Scenario: Unsupported claims are rejected
- GIVEN new or revised marketing/technical copy
- WHEN content is checked against verified `../gentle-ai` references
- THEN unsupported statements SHALL be removed or rewritten
- AND approved wording SHALL prioritize documented behavior
