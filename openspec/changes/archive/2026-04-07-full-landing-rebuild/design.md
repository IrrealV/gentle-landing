# Design: Full Landing Page Rebuild

## Technical Approach

Rebuild `src/pages/index.astro` as a composition of section-scoped Astro components that mirror the reference DOM structure in `lading-desing/gentle_ai_landing_page_updated/code.html`, while mapping all visuals to a centralized Functional Brutalism token contract. Behavior stays mostly static, with minimal progressive enhancement (tabs). Navigation is constrained to internal routes/anchors only, as required by spec.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Section decomposition | Single large page vs modular components | Modular components (`Navbar`, `Hero`, `FeaturesGrid`, `GetStarted`, `HowItWorks`, `Stats`, `Footer`) | Preserves readability, enables isolated iteration, and matches proposal scope without introducing framework runtime overhead. |
| Token source of truth | Inline per-component values vs centralized tokens | Centralized tokens in Tailwind + global CSS utilities | Prevents drift from Functional Brutalism palette/shape rules and ensures consistent styling across sections. |
| Link policy | Preserve reference external links vs internal remapping | Internal-only `href` values (`/` or `#...`) | Enforces product requirement and avoids accidental outbound navigation in landing experience. |
| Icon strategy | SVG sprite set vs Material Symbols font | Material Symbols Outlined font | Directly matches reference artifact semantics and minimizes custom icon maintenance. |

## Data Flow

Homepage is static composition with minimal local UI state:

`index.astro` → section components → semantic markup styled by tokens/utilities.

`GetStarted.astro` includes client-side tab activation (button click → active tab id → panel visibility + ARIA state).

No external API calls, no persisted state, no server mutations.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/pages/index.astro` | Modify | Replace current structure with canonical section sequence from spec. |
| `src/components/Navbar.astro` | Modify | Match reference navbar layout, language dropdown shell, internal links only. |
| `src/components/Footer.astro` | Modify | Move to 4-column brutalist footer with internal-safe resource/community actions. |
| `src/components/Hero.astro` | Create | Hero copy, CTAs, and terminal preview shell. |
| `src/components/FeaturesGrid.astro` | Create | 3-column Core Protocols bento-like grid. |
| `src/components/GetStarted.astro` | Create | Left narrative + right tabbed install/code panel and copy affordance. |
| `src/components/HowItWorks.astro` | Create | 4-step procedural flow with connector separators. |
| `src/components/Stats.astro` | Create | Efficiency bars and integration bullet column. |
| `src/components/CodeTabs.astro` | Modify | Align tab visuals/ARIA behavior with new Get Started structure or merge into `GetStarted.astro`. |
| `tailwind.config.mjs` | Modify | Add Functional Brutalism token extensions (colors, borderRadius, font families). |
| `src/styles/global.css` | Modify | Add utility primitives (`.mono`, `.hairline-*`) and base style alignment. |
| `src/layouts/Layout.astro` | Modify | Ensure font/icon links and metadata support new landing composition baseline. |

## Interfaces / Contracts

Component contracts (Astro props):

```ts
// Navbar.astro
interface NavbarProps { currentPath?: string }

// Hero.astro
interface HeroProps {
  ctaPrimaryHref: `/${string}` | `#${string}`
  ctaSecondaryHref: `/${string}` | `#${string}`
}

// Footer.astro
interface FooterLink {
  label: string
  href: `/${string}` | `#${string}`
}
```

Navigation contract:
- All component link collections MUST validate/declare internal-safe href shapes.
- Disallow raw external URLs in section link arrays.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit/static | Link safety and section presence | Parse rendered HTML in Astro tests; assert all `a[href]` start with `/` or `#`; assert canonical sections/headings exist once. |
| Integration | Token-backed rendering stability | Render homepage and verify key class/token hooks are present for hero, grid, tabs, flow, stats, footer. |
| E2E | User navigation and basic interaction | Browser test for top-to-bottom render, anchor navigation, and tab switching state/ARIA updates. |

## Migration / Rollout

No migration required. Rollout is a direct replacement of homepage presentation layer. `/how-it-works` remains unchanged in this change set.

## Open Questions

- [ ] Should placeholder internal routes for docs/community point to existing pages (`/how-it-works`) or temporary anchors (`#docs`)?
- [ ] Keep standalone `CodeTabs.astro` as reusable primitive or absorb into `GetStarted.astro` to reduce component indirection?
