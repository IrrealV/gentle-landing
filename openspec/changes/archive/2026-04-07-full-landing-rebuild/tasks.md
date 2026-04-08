# Tasks: Full Landing Page Rebuild

## Phase 1: Foundation / Infrastructure

- [x] 1.1 Update `tailwind.config.mjs` with Functional Brutalism tokens (colors, borderRadius, fontFamilies).
- [x] 1.2 Update `src/styles/global.css` with utility primitives (`.mono`, `.hairline-*`, dark-surface base).
- [x] 1.3 Update `src/layouts/Layout.astro` to load Material Symbols Outlined and required Google Fonts.

## Phase 2: Shared Components (Brutalist Update)

- [x] 2.1 Modify `src/components/Navbar.astro` to match reference layout and enforce internal-only navigation.
- [x] 2.2 Modify `src/components/Footer.astro` to 4-column brutalist layout with internal-safe resource links.
- [x] 2.3 Update `src/components/CodeTabs.astro` to align visuals/ARIA with the new Get Started tabbed structure.

## Phase 3: New Landing Sections

- [x] 3.1 Create `src/components/Hero.astro` with terminal preview shell and internal CTA logic.
- [x] 3.2 Create `src/components/FeaturesGrid.astro` implementing the 3-column "Core Protocols" bento grid.
- [x] 3.3 Create `src/components/GetStarted.astro` with narrative section and code panel (using CodeTabs).
- [x] 3.4 Create `src/components/HowItWorks.astro` with the 4-step procedural flow and connector dividers.
- [x] 3.5 Create `src/components/Stats.astro` featuring efficiency bars and the integration bullet column.

## Phase 4: Page Composition & Wiring

- [x] 4.1 Rebuild `src/pages/index.astro` composing the canonical section sequence defined in specs.
- [x] 4.2 Verify all interactive elements (tabs, buttons) use minimal Functional Brutalism feedback.
- [x] 4.3 Audit all links in `index.astro` to ensure they target internal routes (`/`) or anchors (`#`).

## Phase 5: Testing & Verification

- [x] 5.1 Add static test to assert all `a[href]` on homepage start with `/` or `#`.
- [x] 5.2 Add integration test to verify presence and order of all 7 canonical homepage sections.
- [x] 5.3 Add E2E test for Get Started tab switching and basic mobile layout reflow.
