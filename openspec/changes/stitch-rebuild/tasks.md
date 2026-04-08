# Tasks: Pixel-Perfect Stitch Design Rebuild

## Phase 1: Foundation & Tokens (CSS Custom Properties)

- [x] 1.1 Extract hex values and font configurations from `stitch/gentle_ai_landing_page_real_data/code.html` and other stitch files.
- [x] 1.2 Update `src/styles/global.css` with exact color tokens from `stitch/IMPLEMENTATION_PLAN.md` 1.1.
- [x] 1.3 Rename existing "tertiary" palette to "secondary" throughout `src/styles/global.css` for gold (#E0C15A).
- [ ] 1.4 Add surface-container variants (low, lowest, high, highest, dim, bright) to `src/styles/global.css`.
- [ ] 1.5 Add fixed and dim color variants for primary and secondary in `src/styles/global.css`.
- [ ] 1.6 Configure typography tokens in `src/styles/global.css`: Space Grotesk (headline), Inter (body), ui-monospace chain (mono), monospace (label).
- [ ] 1.7 Add custom utility classes to `src/styles/global.css`: `.glass-card`, `.text-glow`, `.technical-grid`, `.blueprint-grid`, `.custom-scrollbar`.
- [ ] 1.8 Set border radius tokens (0px-4px) in `src/styles/global.css` to match Stitch brutalist design.

## Phase 2: Global Shared Components (Navbar/Footer)

- [x] 2.1 Rebuild `src/components/Navbar.astro` with exact structure and hardcoded hex colors from `stitch/IMPLEMENTATION_PLAN.md` 2.1.
- [ ] 2.2 Implement language selector dropdown and active link styling in `src/components/Navbar.astro`.
- [x] 2.3 Rebuild `src/components/Footer.astro` with exact structure, decorative dotted links, and terminal icon button from `stitch/IMPLEMENTATION_PLAN.md` 2.7.

## Phase 3: UI Primitives (TerminalWindow, CodeTabs, BentoCard, Sidebar)

- [x] 3.1 Create `src/components/ui/TerminalWindow.astro` with chrome header, traffic-light dots, and terminal body typography.
- [x] 3.2 Create `src/components/ui/CodeTabs.astro` with ARIA tab semantics and mono labels.
- [x] 3.3 Create `src/components/ui/BentoCard.astro` with title/summary/icon support and brutalist border-accent hover.
- [x] 3.4 Create `src/components/ui/Sidebar.astro` with titled nav groups and internal-only route enforcement.

## Phase 4: Page-by-page migration (Index, HowItWorks, etc.)

- [x] 4.1 Rebuild `src/pages/index.astro` using `Hero.astro`, `FeaturesGrid.astro`, `HowItWorks.astro`, `Stats.astro`, and `GetStarted.astro` with exact stitch logic.
- [x] 4.2 Rebuild `src/pages/how-it-works.astro` with blueprint grid and 7-phase pipeline grid from `stitch/IMPLEMENTATION_PLAN.md` 2.10.
- [x] 4.3 Rebuild `src/pages/configurator.astro` with sidebar platform info and agent detection grid from `stitch/IMPLEMENTATION_PLAN.md` 2.8.
- [x] 4.4 Rebuild `src/pages/docs.astro` with technical grid, multi-level sidebar, and syntax-highlighted code blocks from `stitch/IMPLEMENTATION_PLAN.md` 2.9.
- [x] 4.5 Rebuild `src/pages/features.astro` with asymmetric hero and 3-section bento grid from `stitch/IMPLEMENTATION_PLAN.md` 2.9 (Features Page section).

## Phase 5: Verification & Cleanup

- [ ] 5.1 Verify pixel-perfect match with stitch HTML for each page.
- [ ] 5.2 Verify all color tokens render correctly across all pages.
- [ ] 5.3 Verify typography hierarchy matches across all components.
- [ ] 5.4 Ensure no external JS libraries or Opencode/Claude references are added.
- [ ] 5.5 Maintain internal-only navigation and functional brutalism parity.

## Phase 6: Testing & Verification and Final Archiving

- [x] 6.1 Verify Brand Independence: Run grep to ensure zero occurrences of prohibited terms (OpenCode, Claude, etc.) in `src/`.
- [x] 6.2 Verify Navigation Policy: Run script/grep to ensure all links in `src/` are internal (`/` or `#`).
- [x] 6.3 Verify View Transitions: Ensure navigation between pages is fluid and shell (Navbar/Footer) persists.
- [x] 6.4 Verify Configurator: Ensure toggles and preset switches update UI state correctly using data from `src/data/configuratorData.ts`.
- [ ] 6.5 Final Verification & Archiving: Run 'sdd-verify' and then 'sdd-archive' to conclude the 'stitch-rebuild' change.
