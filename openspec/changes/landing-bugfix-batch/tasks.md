# Tasks: landing-bugfix-batch

## Phase 1: Cleanup & Foundation

- [x] 1.1 Remove Configurator page and data.
    - Delete `src/pages/configurator.astro`.
    - Delete `src/data/configuratorData.ts`.
- [x] 1.2 Remove Configurator references in shared navigation.
    - Remove link from `links` array in `src/components/ui/Navbar.astro`.
    - Remove entry from `community` array in `src/components/ui/Footer.astro`.
- [x] 1.3 Ensure `openspec` directory exists for the change.
    - `mkdir -p openspec/changes/landing-bugfix-batch` (already exists).

## Phase 2: Core Fixes - Shared Components

- [x] 2.1 Fix language toggle lifecycle in `src/components/ui/Navbar.astro`.
    - Move `initLangSwitcher()` call inside an `astro:page-load` listener.
    - Ensure it is idempotent using the `dataset.langInit` guard.
- [x] 2.2 Update Community links in `src/components/ui/Footer.astro`.
    - Replace current `community` array with verified GitHub and Discord links from `../gentle-ai`.
- [x] 2.3 Make Hero tricolor slogan wrap-safe in `src/components/ui/Hero.astro`.
    - Add `whitespace-nowrap` class to the spans inside `data-i18n-en` and `data-i18n-es` attributes.
    - Add `whitespace-nowrap` class to the default spans in the innerHTML.

## Phase 3: Core Fixes - Docs & Animations

- [x] 3.1 Remove Docs section flicker in `src/pages/docs.astro`.
    - Update `goTo` function to keep `oldEl` visible (active) while `newEl` animates in.
    - Add a `setTimeout` to remove `active` from `oldEl` only after the transition completes (~400ms).
- [x] 3.2 Support Docs section overlap in `src/styles/global.css`.
    - Use CSS Grid `grid-area: 1/1` or absolute positioning to overlay `.docs-section` elements within their container.
- [x] 3.3 Differentiate page animations in `src/styles/global.css`.
    - Adjust `@keyframes` and `[data-page-animation]` values (duration, distance, easing) so each page has a distinct motion profile.

## Phase 4: Verification

- [x] 4.1 Verify language toggle survives navigation.
    - Test: Change language -> Navigate to Docs -> Verify language is still correct and toggle works.
- [x] 4.2 Verify Hero wrap safety.
    - Test: Resize browser to mobile width -> Verify colored text segments don't split mid-word.
- [x] 4.3 Verify Docs navigation stability.
    - Test: Navigate between docs sections -> Verify no white/blank flicker occurs.
- [x] 4.4 Verify Footer links.
    - Test: Check that Community block only has GitHub and Discord links.
- [x] 4.5 Verify removal of Configurator.
    - Test: Navigate to `/configurator` -> Verify 404.
    - Test: Search codebase for "configurator" -> Verify no functional references remain.
