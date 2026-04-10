# gentle-landing

Astro landing site for **GENTLE-AI**.

## What it is

This repo powers the public landing pages for the GENTLE-AI project:

- `/` — product overview
- `/features` — capability map
- `/how-it-works` — install → workflow explanation
- `/docs` — technical documentation
- `/demo` — browser reconstruction of the interactive TUI

The content is intended to stay aligned with the real `../gentle-ai` project.

## Stack

- Astro
- TypeScript
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
- The demo is a browser recreation of the real terminal flow, not a video.
- Prefer small, localized changes to preserve performance and fidelity.
