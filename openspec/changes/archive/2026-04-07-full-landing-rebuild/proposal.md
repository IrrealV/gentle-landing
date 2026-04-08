# Proposal: Full Landing Page Rebuild

## Intent

Replace the current landing page with a pixel-perfect reproduction of the Functional Brutalism design from `lading-desing/gentle_ai_landing_page_updated/code.html`. The current implementation diverges significantly from the design tokens, layout structure, and visual identity defined in the reference.

## Scope

### In Scope
- Rebuild `src/pages/index.astro` matching reference design exactly
- Extract modular Astro components (Navbar, Hero, Features, GetStarted, HowItWorks, Stats, Footer)
- Implement Functional Brutalism design tokens in `tailwind.config.mjs`
- Add Material Symbols font and icon system
- Ensure all navigation links are internal only

### Out of Scope
- `/how-it-works` page rebuild (separate change)
- External link integrations (GitHub, Discord, Docs)
- i18n/language selector functionality (visual only)
- Mobile hamburger menu functionality

## Capabilities

### New Capabilities
- `landing-page`: Full landing page layout with hero, features grid, code tabs, process flow, and stats sections
- `design-tokens`: Functional Brutalism color palette, typography, and spacing system

### Modified Capabilities
- None (current implementation has no formal specs)

## Approach

1. **Design Tokens First**: Update `tailwind.config.mjs` with Material Design 3 color tokens from reference
2. **Component Extraction**: Create atomic components from reference HTML sections
3. **Layout Composition**: Rebuild `index.astro` composing extracted components
4. **Visual Polish**: Apply hairline borders, hover states, and typography exactly as reference

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `tailwind.config.mjs` | Modified | Add 30+ color tokens, borderRadius, fontFamily |
| `src/components/Navbar.astro` | Modified | Match reference nav with language dropdown |
| `src/components/Footer.astro` | Modified | Add 4-column grid layout |
| `src/components/Hero.astro` | New | Hero section with terminal preview |
| `src/components/FeaturesGrid.astro` | New | 3-column bento grid |
| `src/components/GetStarted.astro` | New | Code tabs with copy button |
| `src/components/HowItWorks.astro` | New | 4-step process flow |
| `src/components/Stats.astro` | New | Efficiency gains + integration grid |
| `src/pages/index.astro` | Modified | Compose all new components |
| `src/styles/global.css` | Modified | Add `.mono`, `.hairline-*` utilities |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Design token naming conflicts | Low | Prefix all new tokens, test incrementally |
| Breaking existing `/how-it-works` | Med | Verify shared components maintain compatibility |
| Font loading performance | Low | Use `font-display: swap`, preload critical fonts |

## Rollback Plan

Revert to commit before change. All changes are additive to existing component structure; no data migrations required.

## Dependencies

- Google Fonts: JetBrains Mono, Inter, Space Grotesk
- Material Symbols Outlined (icon font)

## Success Criteria

- [ ] Visual parity with `lading-desing/gentle_ai_landing_page_updated/screen.png`
- [ ] All 6 landing sections render correctly
- [ ] No external marketing links (GitHub, Discord) - use `#` or internal routes
- [ ] Lighthouse accessibility score >= 90
- [ ] `/how-it-works` page still functional
