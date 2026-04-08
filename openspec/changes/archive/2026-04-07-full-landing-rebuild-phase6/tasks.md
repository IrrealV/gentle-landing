# Tasks: Full Landing Rebuild (Functional Brutalism + Brand Independence)

## Phase 1: Foundation & Tokens (Visual Identity)

- [x] 1.1 Update `tailwind.config.mjs` with consolidated Functional Brutalism tokens from all 5 Stitch files (surfaces, primary/secondary/tertiary, outline, terminal controls).
- [x] 1.2 Update `src/styles/global.css` with hairline utility classes (`.border-hairline`, `.border-b-hairline`, `.border-r-hairline`), Brutalist radius, and base typography integration.
- [x] 1.3 Modify `src/layouts/Layout.astro` to include `<ViewTransitions />` and ensure Material Symbols Outlined and fonts are correctly loaded across all routes.

## Phase 2: Shared Shell & Brand Independence (Policy Enforcement)

- [x] 2.1 Refactor `src/components/Navbar.astro`: Enforce internal-only links (all hrefs start with `/` or `#`), remove OpenCode/Claude mentions, and apply mono-forward labeling.
- [x] 2.2 Refactor `src/components/Footer.astro`: Enforce internal-only links, remove external brand mentions, and ensure visual consistency with Stitch footer.
- [x] 2.3 Global Brand Audit: Grep `src/` for "OpenCode", "Claude", "OpenAI" and replace with "Gentle-AI" or standalone equivalents to ensure brand independence.

## Phase 3: Core UI Primitives (Component Library)

- [x] 3.1 Update `src/components/ui/TerminalWindow.astro` to align with Functional Brutalism tokens, including window controls (red/amber/green) and dark surface layers.
- [x] 3.2 Update `src/components/CodeTabs.astro`: Ensure reusable docs/configurator tab patterns with accessible ARIA roles and mono labels.
- [x] 3.3 Create `src/components/BentoCard.astro`: New component for the features grid, supporting titles, technical summaries, and icons.
- [x] 3.4 Create `src/components/Sidebar.astro`: New component for the `/docs` page navigation with internal-only route support.

## Phase 4: Data & Fixtures (Standalone Ecosystem)

- [x] 4.1 Create `src/data/configuratorData.ts` with typed static fixtures (AgentProfile, SkillProfile, MemoryToggle, ConfigPreset) based on the design interface.
- [x] 4.2 Populate `configuratorData.ts` with realistic Gentle-AI data (e.g., "gentle-3-flash" agent, "sdd-spec" skill) avoiding all external brand mentions.

## Phase 5: Page Migration (Stitch Visual Parity)

- [x] 5.1 Update `src/pages/index.astro`: Full visual parity with `stitch/gentle_ai_landing_page_real_data`, focusing on section sequence and internal CTAs.
- [x] 5.2 Create `src/pages/features.astro`: Implement bento grid and system architecture diagram zone from `stitch/features_official_technical_breakdown`.
- [x] 5.3 Create `src/pages/docs.astro`: Implement documentation hub with sidebar and code/terminal content blocks from `stitch/documentation_center_official_data`.
- [x] 5.4 Update `src/pages/how-it-works.astro`: Align with `stitch/how_it_works_official_sdd_pipeline` visual and narrative flow.
- [x] 5.5 Create `src/pages/configurator.astro`: Implement configurator UI using fixtures, `TerminalWindow` previews, and `CodeTabs` for presets.

## Phase 6: Testing & Verification (Contract Compliance)

- [x] 6.1 Verify Brand Independence: Run grep command to ensure zero occurrences of prohibited terms (OpenCode, Claude) in `src/`.
- [x] 6.2 Verify Navigation Policy: Run script/grep to ensure all links in `src/` are internal (`/` or `#`).
- [x] 6.3 Verify View Transitions: Manually test navigation between all 5 pages for fluid motion and shell stability.
- [x] 6.4 Verify Configurator: Ensure toggles and preset switches update UI state correctly with realistic fixture data.
