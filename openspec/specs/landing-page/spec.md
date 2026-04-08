# Landing Page Specification

## Purpose

Define the required behavior for the homepage rebuild to match `stitch/gentle_ai_landing_page_real_data` and enforce strict internal-only navigation.

## Requirements

### Requirement: Functional Brutalism Visual Parity

The system MUST render `/` with Functional Brutalism parity against `stitch/gentle_ai_landing_page_real_data`, using dark layered surfaces, hairline separators, mono-forward uppercase labels, strict grid spacing, and minimal interaction feedback.

#### Scenario: Hero and section styling match updated stitch source
- GIVEN a user opens `/`
- WHEN the landing page renders from navbar through footer
- THEN each section SHALL use the updated stitch token hierarchy and divider rhythm
- AND typography SHALL preserve mono/uppercase emphasis for labels and headings

#### Scenario: Shared brutalist interactions remain restrained
- GIVEN buttons, cards, tabs, and terminal shells are visible
- WHEN the user hovers or focuses actionable elements
- THEN feedback MUST be limited to subtle color, border, or transform changes

### Requirement: Canonical Section Composition

The system MUST compose `/` as Navbar, Hero, Core Protocols grid, Get Started code panel, Procedural Architecture flow, Efficiency/Integration stats, and Footer, while routing cross-page CTAs to internal product pages.

#### Scenario: Full section sequence is present once
- GIVEN a user scrolls from top to bottom
- WHEN traversing `/`
- THEN each canonical section SHALL appear exactly once in the required order

#### Scenario: Cross-page CTAs route internally
- GIVEN hero and body CTAs referencing docs, features, how-it-works, or configurator
- WHEN activated
- THEN each CTA MUST resolve to internal routes (`/docs`, `/features`, `/how-it-works`, `/configurator`) or valid in-page anchors

### Requirement: Internal-Only Navigation Enforcement

The system MUST restrict all landing-page navigation targets to internal routes or in-page anchors, including navbar, hero CTAs, section links, and footer links.

#### Scenario: All primary navigation links are internal
- GIVEN a user inspects all actionable links on `/`
- WHEN any link is activated
- THEN every `href` SHALL start with `/` or `#`
- AND no `href` SHALL use `http`, `https`, `mailto`, or `tel`

#### Scenario: Former external destinations map to internal placeholders
- GIVEN copy mentions docs, GitHub, or community destinations
- WHEN rendered on landing
- THEN actions MUST route to internal pages or `#` placeholders only
