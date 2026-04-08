# Design: Pixel-Perfect Stitch Design Rebuild

## Architecture
Astro 6.x based project with CSS Custom Properties for tokens. No external JS libraries.

## Design Tokens
### Colors (Palette A - Landing Page)
- `--background`: #06080f
- `--surface`: #06080f
- `--primary`: #7FB4CA
- `--secondary`: #E0C15A
- `--tertiary`: #bec8d7
- `--outline`: #8892A0
- `--on-background`: #F3F6F9

### Colors (Palette B - Others)
- `--background`: #11131b
- `--surface`: #11131b

### Typography
- Headline: Space Grotesk
- Body: Inter
- Mono: ui-monospace, SFMono-Regular, etc.
- Label: monospace

### Border Radius
- DEFAULT: 0px
- lg/xl: 4px
- full: 9999px

## Components
- Navbar: Fixed, hardcoded hex colors, Space Grotesk logo.
- Hero: 2-column grid, text-glow, terminal window.
- FeaturesGrid: divide-y/divide-x, p-12 padding.
- HowItWorks: Sidebar layout, ASCII pipeline diagram.
- Stats: 2-column, large mono numbers.
- GetStarted: Tab-based terminal, copy button.
- Footer: decoration-dotted links, terminal icon button.

## Utilities
- `.glass-card`: background: rgba(25, 27, 35, 0.7), backdrop-filter: blur(12px).
- `.text-glow`: text-shadow: 0 0 15px rgba(127, 180, 202, 0.4).
- `.technical-grid`, `.blueprint-grid`: radial-gradient(circle, #1a1f2e 1px, transparent 1px), 32px 32px.
- `.custom-scrollbar`: width: 4px, background: #0c0e15, thumb: #32343d.
- `.binary-feedback`: filter: invert(1) on active.
