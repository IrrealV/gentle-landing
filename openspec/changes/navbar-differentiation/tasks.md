# Tasks: Adaptive Navbar Differentiation

## Phase 1: Foundation (Component Logic)

- [x] 1.1 Update `Props` interface in `src/components/ui/Navbar.astro` to include optional `variant`.
- [x] 1.2 Create `variantClasses` map in `Navbar.astro` for header (surface) and nav (padding/spacing).
- [x] 1.3 Map `marketing`, `default`, `compact`, and `interactive` to specific Tailwind class strings.
- [x] 1.4 Apply mapped classes to `<header>` and `<nav>` elements using `class:list`.
- [x] 1.5 Add `data-variant` attribute to the `<header>` for potential CSS or JS hooks.

## Phase 2: Integration (Page Entry Points)

- [x] 2.1 Update `src/pages/index.astro` to pass `variant="marketing"` to `<Navbar>`.
- [x] 2.2 Update `src/pages/features.astro` and `how-it-works.astro` to pass `variant="default"`.
- [x] 2.3 Update `src/pages/docs.astro` to pass `variant="compact"`.
- [x] 2.4 Update `src/pages/demo.astro` to pass `variant="interactive"`.
- [x] 2.5 Ensure `currentPath` prop is still passed correctly alongside the new `variant` prop.

## Phase 3: Global Styles & Polish

- [x] 3.1 Add shared CSS helpers in `src/styles/global.css` if variants require unique transitions or blends.
- [x] 3.2 Adjust docs/demo page top offsets in their respective layouts/files if navbar height changes.

## Phase 4: Verification

- [x] 4.1 Verify navigation parity: Links, active states, and sliding indicator work on all 4 variants.
- [x] 4.2 Verify i18n preservation: Language toggle works and persists across variant transitions.
- [x] 4.3 Verify responsive behavior: Mobile menu remains functional and accessible in all variants.
- [x] 4.4 Verify visual differentiation: Confirm `interactive` is compact and `marketing` is prominent.
