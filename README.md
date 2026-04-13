# gentle-landing

Astro landing site for **GENTLE-AI**.

## What it is

This repo powers the public landing pages for the GENTLE-AI project:

- `/` — install-first hero + product overview
- `/features` — capability map
- `/how-it-works` — install → workflow explanation
- `/docs` — technical reference and official upstream docs link
- `/demo` — browser reconstruction of the interactive TUI

## What the landing includes

- OS-aware install tabs in the hero (`brew`, `go install`, `scoop`)
- copy buttons for command blocks and install snippets
- responsive docs and demo layouts for mobile/desktop
- a lightweight interactive background mesh
- localized copy with English/Spanish support

## Stack

- Astro
- TypeScript
- Tailwind CSS
- Static-site generation
- View Transitions

## Development

```sh
npm install
npm run dev
```

## Build & preview

```sh
npm run build
npm run preview
```

## Notes

- Keep public copy factual and synced with `../gentle-ai`.
- The demo is a browser reconstruction of the real terminal flow, not the native runtime.
- Prefer small, localized changes to preserve performance, fidelity, and responsive behavior.
