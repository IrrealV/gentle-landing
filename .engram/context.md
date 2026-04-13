# Project Context — gentle-landing

## Overview

Astro landing site for GENTLE-AI.

## Current Stack

- Astro 6.1.4
- TypeScript
- Tailwind CSS 4
- Static site with View Transitions

## Core Pages

- `/` — install-first hero + product overview
- `/features` — capability map
- `/how-it-works` — install → workflow explanation
- `/docs` — technical reference + official upstream docs link
- `/demo` — browser reconstruction of the interactive TUI

## Key Conventions

- Keep English/Spanish copy synchronized.
- Keep public claims factual and aligned with `../gentle-ai`.
- Prefer small, localized changes in Astro components.
- Preserve responsive behavior on mobile and desktop.
- Use explicit layout order; avoid CSS reversal tricks.

## Notable UX Decisions

- Hero prioritizes installation.
- Hero install method auto-detects OS: macOS/Linux → brew, Windows → scoop, fallback → go install.
- Docs mobile falls back to a stacked reading layout.
- Command blocks use copy buttons.
- Background mesh is lighter on mobile.
