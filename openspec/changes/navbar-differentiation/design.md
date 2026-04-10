# Design: navbar-differentiation

## Technical Approach
Modify the `Navbar.astro` component to accept a new `variant` prop (`'marketing' | 'default' | 'compact' | 'interactive'`). We will use a dictionary-based approach to map this prop to specific Tailwind layout classes (padding, gaps). The vanilla JavaScript handling the sliding indicator, mobile menu, and language switcher will remain untouched, ensuring that the IA and functionality are strictly preserved. Each entry page will be updated to pass its mapped variant.

## Architecture Decisions

### Decision: Style Variation via Class Dictionaries
**Choice**: Use JS objects inside Astro's frontmatter to map the `variant` string to padding and spacing classes for the `<nav>` wrapper.
**Alternatives considered**: Multiple component files (e.g., `NavbarMarketing.astro`) or CSS variable scoping.
**Rationale**: Keeps all IA and script bindings in one source of truth, satisfying the constraint of avoiding separate components.

### Decision: Direct Implementation in Pages
**Choice**: Pass the `variant` prop directly from the individual page files (`src/pages/*.astro`).
**Alternatives considered**: Deriving the variant inside `Navbar.astro` by checking `currentPath`.
**Rationale**: Inversion of control. Let the pages define their own layout needs rather than cluttering the component with routing knowledge.

## Data Flow
Page (e.g., `index.astro`) ──(variant="marketing")──→ `Navbar.astro`
`Navbar.astro` uses the `variant` prop to select padding/spacing classes from a class map and injects them into the `<nav>` element.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/ui/Navbar.astro` | Modify | Add `variant` prop, class maps, and apply them to the root/nav elements. |
| `src/pages/index.astro` | Modify | Pass `variant="marketing"` to `<Navbar>`. |
| `src/pages/features.astro` | Modify | Pass `variant="default"` to `<Navbar>`. |
| `src/pages/how-it-works.astro` | Modify | Pass `variant="default"` to `<Navbar>`. |
| `src/pages/docs.astro` | Modify | Pass `variant="compact"` to `<Navbar>`. |
| `src/pages/demo.astro` | Modify | Pass `variant="interactive"` to `<Navbar>`. |

## Interfaces / Contracts

```typescript
// Updated Props for Navbar.astro
interface Props {
	currentPath?: string;
	variant?: 'marketing' | 'default' | 'compact' | 'interactive';
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Component Props | N/A (Astro mostly verified through E2E or manual check) |
| Integration | IA preservation | Verify navigation links, language toggle, and sliding indicator work on all variants. |
| E2E | Layout density | Visually ensure `interactive` is tightest, `marketing` is fullest, and docs has more room. |

## Migration / Rollout
No migration required. The change is isolated to presentation layout.

## Open Questions
- None.
