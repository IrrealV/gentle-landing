# Design: Landing Differentiation

## Technical Approach
We will refactor the site's presentation layer to establish unique visual identities per page while maintaining the global brutalist theme. We will implement CSS keyframe animations for page-specific motion, apply color chunking to the Hero slogan using `data-i18n-*` attributes with Astro components, and standardize the copy across the site to avoid redundancy and enforce neutral Spanish.

## Architecture Decisions

### Decision: Hero Slogan Color Chunking
**Choice**: Replace `data-label-*` with `data-i18n-*` on the slogan, using `<span>` wrappers with Tailwind color classes (`text-primary`, `text-secondary`, `text-tertiary`) inside `Hero.astro`.
**Alternatives considered**: CSS gradients or JS-based letter-by-letter coloring.
**Rationale**: The site's i18n script natively supports HTML injection via `data-i18n-*` while maintaining language switching. This avoids adding a new translation mechanism and keeps the payload minimal and declarative.

### Decision: Per-Page Motion Implementation
**Choice**: CSS-only animations via `data-page-animation` attributes using `@keyframes` in `global.css`. 
**Alternatives considered**: Framer Motion or JS View Transitions logic.
**Rationale**: The site already uses Astro's `<ClientRouter />` with CSS animations mapped to `data-page-animation`. Expanding `global.css` with page-specific keyframes (e.g., `page-enter-home`) avoids JS overhead and maintains the current brutalist/minimalist technical pattern.

### Decision: Copy Architecture Strategy
**Choice**: Edit content directly within `.astro` page files, refining generic marketing language into specific architectural or technical explanations. Use neutral Spanish for `data-label-es` and `data-i18n-es`.
**Alternatives considered**: Extracting content to JSON files or a headless CMS.
**Rationale**: Centralizing copy would require a larger refactor against the "preserve internal navigation and current IA" constraint. Modifying inline attributes keeps the solution scoped to differentiation.

## Data Flow
User navigates to Page ──→ Astro renders HTML with `data-page-animation="{page}"` ──→ CSS Keyframes trigger on page load ──→ `<ClientRouter />` handles subsequent navigation preserving CSS animations. The i18n script reads `data-i18n-*` strings and injects the chunked HTML into the Hero slogan based on active language.

## File Changes
| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/Hero.astro` | Modify | Update the slogan from `data-label-*` to `data-i18n-*` with `<span>` color chunks. |
| `src/pages/index.astro` | Modify | Add `data-page-animation="home"` and simplify redundant copy. |
| `src/pages/features.astro` | Modify | Update copy to focus solely on architecture. |
| `src/pages/how-it-works.astro` | Modify | Update copy to focus purely on the pipeline motion and sequential steps. |
| `src/pages/docs.astro` | Modify | Clean up reference copy. |
| `src/pages/demo.astro` | Modify | Adjust TUI-focused copy and refine motion if needed. |
| `src/styles/global.css` | Modify | Add `@keyframes` for the new `home` and `how-it-works` or `docs` explicit motion differentiation as needed. |

## Interfaces / Contracts
No new data interfaces required.
The i18n contract is maintained:
- `data-label-*` for plain text (`textContent`).
- `data-i18n-*` for HTML strings (`innerHTML`), required for the chunked Hero slogan.

## Testing Strategy
| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Hero Color Chunking | Verify `text-primary`, `text-secondary`, `text-tertiary` render correctly in EN and ES. |
| Visual | Page Transitions | Navigate through Home, Features, How It Works, Docs, Demo and verify unique CSS entry motions. |
| Content | Neutral Spanish | Check ES toggled text for non-regional, neutral Spanish. |

## Migration / Rollout
No migration required.

## Open Questions
- None.