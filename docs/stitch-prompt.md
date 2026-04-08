# Design Prompt: Gentle-AI Landing Page

> **Target Agent**: Stitch (Design Agent)
> **Project**: gentle-landing (Astro 6.x)
> **GitHub**: https://github.com/Gentleman-Programming/gentle-ai

---

## 1. Design Vision

### Philosophy: Functional Brutalism

Design a landing page that embodies **Functional Brutalism** — a design philosophy that prioritizes:

- **Raw honesty**: Show what the product does, not what marketing wants
- **Grid-based structure**: Rigid, predictable layouts that respect the user's cognitive load
- **Technical aesthetic**: Code blocks, monospace fonts, terminal-inspired elements
- **Anti-trend**: Reject gradients, glassmorphism, floating elements, and AI-generated "futuristic" visuals

**Reference mindset**: Think of a well-documented CLI tool's README, but elevated to a visual medium. The design should feel like it was made BY developers FOR developers.

---

## 2. Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--bg-void` | `#06080f` | Primary background — deep, almost black |
| `--primary-wave` | `#7FB4CA` | Primary accent — links, highlights, interactive elements |
| `--accent-gold` | `#E0C15A` | Secondary accent — CTAs, warnings, emphasis |
| `--text-light` | `#F3F6F9` | Primary text — high contrast on dark bg |
| `--text-muted` | `#8892A0` | Secondary text — descriptions, captions (derive from text-light at 60% opacity) |
| `--border-subtle` | `#1a1f2e` | Grid lines, separators, card borders |
| `--code-bg` | `#0d1117` | Code block backgrounds — slightly lighter than void |

**Constraints**:
- NO gradients except subtle opacity transitions
- NO colored shadows or glows
- Borders must be 1px solid, never rounded beyond 4px
- Maintain WCAG AA contrast ratios (7:1 for text)

---

## 3. Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Headings | `JetBrains Mono` or `IBM Plex Mono` | 700 | Fluid: clamp(1.5rem, 4vw, 3rem) |
| Body | `Inter` or `IBM Plex Sans` | 400 | 1rem (16px base) |
| Code | `JetBrains Mono` | 400 | 0.875rem |
| Labels/Tags | `JetBrains Mono` | 500 | 0.75rem uppercase |

**Constraints**:
- Line height: 1.6 for body, 1.2 for headings
- Letter spacing: -0.02em for headings, 0 for body
- Max paragraph width: 65ch

---

## 4. Target Audience

### Primary: Developers
- Value: Technical depth, workflow efficiency, terminal-native tools
- Pain points: Generic AI tools that don't understand code context
- Expectation: Show me the code, show me the workflow, show me the integration

### Secondary: CTOs / Engineering Leads
- Value: Team efficiency, cost reduction, implementation speed
- Pain points: Evaluating AI tools for team adoption
- Expectation: Clear ROI indicators, enterprise considerations, integration paths

**Design implication**: The page must work on two levels — technical depth for devs who scroll everything, and scannable summaries for CTOs who skim.

---

## 5. Page Structure

### Section 1: Hero (The "Why")

**Purpose**: Immediate value proposition. Answer "What is Gentle-AI?" in 5 seconds.

**Layout**:
```
+----------------------------------------------------------+
|  [Logo: pink lips - small, top-left]                     |
|                                                          |
|  GENTLE-AI                                               |
|  ──────────────────────────────────                      |
|  AI that understands your codebase.                      |
|  Not just your prompt.                                   |
|                                                          |
|  [Terminal preview: animated typing of a real command]   |
|                                                          |
|  [CTA: View on GitHub]  [CTA: Read the Docs]            |
+----------------------------------------------------------+
```

**Elements**:
- Logo: "Pink lips" logo — placed soberly, not as hero centerpiece. Max 40px height.
- Headline: Bold, monospace, centered or left-aligned
- Subheadline: One sentence that differentiates from generic AI tools
- Terminal preview: Show a REAL command being typed, then a REAL response
- CTAs: Two buttons — primary (GitHub) and secondary (Docs)

**Animation**: Terminal typing effect using CSS keyframes. 60-80ms per character. Reveal response after command completes.

---

### Section 2: Features (SDD, Skills, MCP)

**Purpose**: Show the three pillars of Gentle-AI's architecture.

**Layout**: 3-column grid on desktop, stacked on mobile.

```
+------------------+------------------+------------------+
|  SDD             |  SKILLS          |  MCP             |
|  ────            |  ────            |  ────            |
|  Spec-Driven     |  Loadable AI     |  Model Context   |
|  Development     |  behaviors       |  Protocol        |
|                  |                  |                  |
|  [icon]          |  [icon]          |  [icon]          |
|                  |                  |                  |
|  Your AI writes  |  Domain-specific |  Connect to any  |
|  specs first,    |  instructions    |  external tool   |
|  then code.      |  that load on    |  or service.     |
|                  |  demand.         |                  |
+------------------+------------------+------------------+
```

**Elements**:
- Each card: Title, one-line description, simple icon (SVG, monochrome)
- Icons: Abstract, geometric — NOT emoji, NOT illustrations
- Hover state: Border highlight with `--primary-wave`

**Animation**: Cards fade-in on scroll, staggered 100ms apart. Use Intersection Observer + CSS transitions.

---

### Section 3: Workflows / Install

**Purpose**: Show how to get started. Progressive disclosure of complexity.

**Layout**: Terminal-style, full-width code block with tabs.

```
+----------------------------------------------------------+
|  GET STARTED                                              |
|  ──────────                                               |
|                                                          |
|  [Tab: npm] [Tab: pnpm] [Tab: bun]                       |
|  +------------------------------------------------------+|
|  |  $ npm install -g @gentle-ai/cli                     ||
|  |  $ cd your-project                                   ||
|  |  $ gentle-ai init                                    ||
|  |                                                      ||
|  |  > Initializing Gentle-AI...                         ||
|  |  > Loading skills: react-19, typescript, tailwind    ||
|  |  > Ready. Type your first prompt.                    ||
|  +------------------------------------------------------+|
|                                                          |
|  [Copy button]                                           |
+----------------------------------------------------------+
```

**Elements**:
- Package manager tabs (styled as terminal tabs)
- Full command sequence with realistic output
- Copy-to-clipboard button (subtle, positioned top-right of code block)

**Animation**: 
- Lines appear progressively (typewriter effect) ONLY on first view
- Progress indicator (subtle loading bar) during "Initializing..."
- Final "Ready" line pulses once with `--accent-gold`

---

### Section 4: Functionality (How It Works)

**Purpose**: Deep dive into the workflow. Doc-style, flow-based.

**Layout**: Alternating left-right sections with flow arrows.

```
+----------------------------------------------------------+
|  HOW GENTLE-AI THINKS                                     |
|  ───────────────────                                      |
|                                                          |
|  1. UNDERSTAND CONTEXT                                   |
|  ┌──────────────────┐                                    |
|  │ Your codebase    │──→ Skills loaded based on stack    |
|  │ + project rules  │                                    |
|  └──────────────────┘                                    |
|                      ↓                                   |
|  2. SPEC FIRST                                           |
|  ┌──────────────────┐                                    |
|  │ User intent      │──→ Proposal → Design → Specs       |
|  │                  │                                    |
|  └──────────────────┘                                    |
|                      ↓                                   |
|  3. IMPLEMENT                                            |
|  ┌──────────────────┐                                    |
|  │ Tasks generated  │──→ Code written to match specs     |
|  │                  │                                    |
|  └──────────────────┘                                    |
|                      ↓                                   |
|  4. VERIFY                                               |
|  ┌──────────────────┐                                    |
|  │ Implementation   │──→ Verified against specs          |
|  │ complete         │                                    |
|  └──────────────────┘                                    |
+----------------------------------------------------------+
```

**Elements**:
- Numbered steps with box-drawing characters (Unicode)
- Brief description per step
- Flow arrows using CSS (not images)

**Animation**:
- Steps reveal progressively as user scrolls
- Each step "activates" (border pulses with `--primary-wave`) when in viewport
- Flow arrows animate (dash-offset) connecting steps

---

### Section 5: For CTOs / Companies

**Purpose**: Address enterprise concerns. Efficiency, integration, scale.

**Layout**: Two-column — metrics on left, benefits on right.

```
+----------------------------------------------------------+
|  FOR ENGINEERING LEADERS                                  |
|  ───────────────────────                                  |
|                                                          |
|  +------------------------+  +-------------------------+ |
|  |  EFFICIENCY GAINS      |  |  INTEGRATION            | |
|  |  ────────────────      |  |  ───────────            | |
|  |                        |  |                         | |
|  |  • Spec-first reduces  |  |  • Works with existing  | |
|  |    rework by 40%       |  |    CI/CD pipelines      | |
|  |                        |  |                         | |
|  |  • Skills ensure       |  |  • Team conventions     | |
|  |    consistent patterns |  |    enforced via skills  | |
|  |                        |  |                         | |
|  |  • Context-aware AI    |  |  • Persistent memory    | |
|  |    reduces prompt      |  |    across sessions      | |
|  |    engineering time    |  |                         | |
|  +------------------------+  +-------------------------+ |
|                                                          |
|  [CTA: Schedule a Demo] (if applicable, or remove)       |
+----------------------------------------------------------+
```

**Elements**:
- Concrete benefits (not vague promises)
- Bullet points, not paragraphs
- Optional CTA for enterprise contact

**Animation**: Minimal. Fade-in on scroll only.

---

### Section 6: Docs & GitHub

**Purpose**: Final CTA. Direct links to resources.

**Layout**: Centered, minimal footer-style.

```
+----------------------------------------------------------+
|                                                          |
|  EXPLORE                                                 |
|  ───────                                                 |
|                                                          |
|  [GitHub]  [Documentation]  [Discord] (if exists)        |
|                                                          |
|  ──────────────────────────────────────────────────────  |
|                                                          |
|  Built by Gentleman Programming                          |
|  [Pink lips logo - small]                                |
|                                                          |
+----------------------------------------------------------+
```

**Elements**:
- Icon + text links (not just icons)
- GitHub link: https://github.com/Gentleman-Programming/gentle-ai
- Subtle branding footer with logo

---

## 6. Animation Guidelines

### Allowed

| Type | Implementation | Example Use |
|------|----------------|-------------|
| View Transitions | Astro's `transition:*` directives | Page navigation |
| CSS Transitions | `transition` property, 200-300ms ease-out | Hover states, reveals |
| CSS Animations | `@keyframes` for typing, pulse effects | Terminal typing |
| Intersection Observer | Scroll-triggered class additions | Section reveals |
| Lazy loading | `loading="lazy"` on images | All images |

### Forbidden

| Type | Why |
|------|-----|
| JavaScript animation libraries | Bloat, unnecessary |
| Parallax effects | Distracting, dated |
| Particle effects | Generic AI aesthetic |
| 3D transforms | Performance, accessibility |
| Auto-playing video | Intrusive |

### Principles

1. **Purposeful**: Every animation must communicate state change or guide attention
2. **Reducible**: Respect `prefers-reduced-motion` — all animations must have static fallbacks
3. **Fast**: No animation > 400ms. Most should be 200ms.
4. **One-shot**: Animations play once, not loop (except intentional loading states)

---

## 7. Branding: Pink Lips Logo

**Usage Guidelines**:

| Context | Size | Placement |
|---------|------|-----------|
| Header | 32-40px height | Top-left, inline with nav |
| Footer | 24px height | Centered, above copyright |
| Favicon | 32x32, 16x16 | Browser tab |

**Constraints**:
- Never animate the logo
- Never place on colored backgrounds (only on `--bg-void`)
- Maintain aspect ratio
- Minimum clear space: 8px all sides

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked sections |
| Tablet | 640-1024px | 2-column grids, reduced padding |
| Desktop | > 1024px | Full 3-column grids, max-width containers |

**Container max-width**: 1200px, centered with auto margins.

---

## 9. Accessibility Requirements

- All interactive elements: visible focus states (`outline: 2px solid var(--primary-wave)`)
- All images: descriptive `alt` text
- Semantic HTML: proper heading hierarchy (h1 → h2 → h3)
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Keyboard navigation: full support for tab, enter, space
- Screen reader: ARIA labels for icon-only buttons

---

## 10. Technical Constraints

| Constraint | Requirement |
|------------|-------------|
| Framework | Astro 6.x (already configured) |
| Styling | CSS only (no Tailwind, no CSS-in-JS) |
| JavaScript | Minimal — only for interactions that CSS can't handle |
| Build size | < 100KB total (excluding fonts) |
| Fonts | Self-hosted or Fontsource, not Google Fonts CDN |
| Images | WebP preferred, SVG for icons |
| Performance | Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms |

---

## 11. Deliverables Checklist

- [ ] Component structure diagram
- [ ] Color/typography tokens as CSS custom properties
- [ ] Section-by-section wireframes (low-fidelity acceptable)
- [ ] Animation specification (timing, easing, triggers)
- [ ] Responsive behavior notes per section
- [ ] Asset list (icons needed, logo variants)

---

## 12. Anti-Patterns to Avoid

| Pattern | Why It's Wrong |
|---------|----------------|
| Gradient hero backgrounds | Generic, dated, conflicts with brutalism |
| Floating cards with shadows | Breaks grid rigidity |
| Animated SVG mascots | Infantilizes technical product |
| "AI-powered" badge overuse | Meaningless marketing |
| Infinite scroll animations | Distracting, accessibility issue |
| Glassmorphism / blur effects | Performance hit, doesn't fit aesthetic |
| Stock photography | Impersonal, irrelevant |
| Testimonial carousels | Breaks information hierarchy |

---

## Summary for Stitch

**In one sentence**: Design a landing page that looks like beautiful technical documentation — clean grids, monospace typography, terminal aesthetics, and zero visual noise.

**Success metric**: A senior developer should look at this page and think "finally, a tool made by people who get it."
