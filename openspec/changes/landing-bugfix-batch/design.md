# Design: landing-bugfix-batch

## Technical Approach

The change addresses several UX bugs and removes obsolete features without introducing new libraries or changing the underlying stack. The language toggle will hook into Astro's View Transitions lifecycle (`astro:page-load`) to survive DOM replacements. The docs navigation flicker will be resolved by keeping the outgoing section visible while the incoming section animates over it. Finally, the Hero text will use Tailwind utility classes to prevent awkward wrapping, and the motion profiles in `global.css` will be tweaked for better differentiation.

## Architecture Decisions

### Decision: Language Toggle Rebinding

**Choice**: Initialize the language toggle logic idempotently within an `astro:page-load` event listener.
**Alternatives considered**: Document-level event delegation.
**Rationale**: `astro:page-load` perfectly maps to the Astro View Transitions lifecycle, ensuring state variables and DOM references are reliably synced after navigation DOM swaps.

### Decision: Docs Flicker Mitigation

**Choice**: Modify the transition JS to delay removing the `active` class (or use a dedicated `.exiting` class) combined with CSS Grid overlap (`grid-area: 1/1`) for the sections.
**Alternatives considered**: Replacing the custom JS router with Astro View Transitions API for internal docs navigation.
**Rationale**: Modifying the existing lightweight JavaScript router maintains current behavior and avoids the overhead of managing complex View Transition names for dynamically generated internal content, while eliminating the blank-state flash.

### Decision: Hero Wrap Safety

**Choice**: Add `whitespace-nowrap` to each colored text segment in the Hero title.
**Alternatives considered**: Flex container with word-wrap adjustments.
**Rationale**: `whitespace-nowrap` is standard Tailwind, straightforward to implement, and perfectly prevents awkward color splits when text lines wrap on mobile.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/Navbar.astro` | Modify | Bind `initLangSwitcher` on `astro:page-load`; remove Configurator link. |
| `src/components/ui/Footer.astro` | Modify | Update Community links to GitHub and Discord; remove Configurator. |
| `src/components/ui/Hero.astro` | Modify | Add `whitespace-nowrap` to `text-primary/secondary/tertiary` spans. |
| `src/pages/docs.astro` | Modify | Update internal routing JS to cross-fade or overlay sections instead of immediate removal. |
| `src/styles/global.css` | Modify | Refine `data-page-animation` values for stronger page differentiation; support docs overlap. |
| `src/pages/configurator.astro` | Delete | Remove obsolete page. |
| `src/data/configuratorData.ts` | Delete | Remove obsolete data. |

## Interfaces / Contracts

No new interfaces or API contracts required.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Hero visual safety | Visual check of Hero title wrapping in responsive mobile views. |
| Integration | Docs Navigation | Click next/prev in the Docs section to verify no blank frames exist during transitions. |
| E2E | State Persistence | Navigate via View Transitions (e.g., Home -> Docs -> Home) and verify the language toggle remains functional and state is correct. |

## Migration / Rollout

No migration required.

## Open Questions

- None