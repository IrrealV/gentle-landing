# Tasks: Landing Differentiation

## Phase 1: Foundation (Motion & Styling)

- [x] 1.1 Update `src/styles/global.css` to include `@keyframes` for differentiated page entry animations (e.g., `page-enter-home`, `page-enter-how-it-works`).
- [x] 1.2 Ensure theme color classes (`text-primary`, `text-secondary`, `text-tertiary`) are correctly mapped in Tailwind/CSS for the Hero slogan treatment.

## Phase 2: Hero Component Update

- [x] 2.1 Refactor `src/components/ui/Hero.astro` to migrate slogan from `data-label-*` to `data-i18n-*` to support HTML injection.
- [x] 2.2 Implement the 3-color treatment in the Hero slogan using `<span>` wrappers with theme palette classes.

## Phase 3: Page-Specific Copy & Motion

- [x] 3.1 Update `src/pages/index.astro`:
    - Add `data-page-animation="home"`.
    - Refactor copy to emphasize ecosystem configurator, workflow entry, and demo entry in neutral Spanish.
- [x] 3.2 Update `src/pages/features.astro`:
    - Set unique `data-page-animation`.
    - Refactor copy to focus on post-install architecture capabilities in neutral Spanish.
- [x] 3.3 Update `src/pages/how-it-works.astro`:
    - Set unique `data-page-animation`.
    - Refactor copy to focus on the sequential install-to-workflow pipeline in neutral Spanish.
- [x] 3.4 Update `src/pages/docs.astro`:
    - Set unique `data-page-animation`.
    - Refactor copy to focus on technical manual/reference framing in neutral Spanish.
- [x] 3.5 Update `src/pages/demo.astro`:
    - Set unique `data-page-animation`.
    - Refactor copy to emphasize TUI fidelity and terminal-first narrative in neutral Spanish.

## Phase 4: Verification & Fidelity

- [x] 4.1 Verify Hero slogan color rendering in both EN and ES (neutral Spanish).
- [x] 4.2 Validate differentiated entry motions for Home, Features, How-it-Works, Docs, and Demo.
- [x] 4.3 Cross-check all revised copy against `../gentle-ai` documentation to ensure technical fidelity.
- [x] 4.4 Confirm `src/pages/configurator.astro` remains unchanged.
