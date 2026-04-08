# Design: Full Landing Rebuild (Functional Brutalism + Brand Independence)

## Technical Approach

Implement a multi-page Astro 6.x marketing/docs shell by composing existing shared components (`Navbar`, `Footer`, `CodeTabs`, `TerminalWindow`) and adding page-specific sections for `/features`, `/docs`, and `/configurator`. Styling remains Tailwind-first with strict Functional Brutalism tokens (dark surfaces, hairlines, mono labels, low-radius geometry). Navigation is internal-only (`/` or `#`), and page-to-page motion uses Astro View Transitions.

**Crucially, the entire UI and documentation MUST portray Gentle-AI as a standalone ecosystem. All references to external systems like OpenCode, Claude, or other CLIs as dependencies must be completely removed.**

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Brand Independence | Keep existing references vs Remove all | **Remove all external dependencies (OpenCode, Claude, etc.)** | Gentle-AI must be presented as a fully standalone ecosystem. |
| Token authority | Stitch CSS per page vs unified Tailwind/global token layer | **Unified token layer** in `global.css` + `tailwind.config.mjs` | Prevents drift and enforces strict Brutalism parity across all pages. |
| Shared shell | Duplicate nav/footer per page vs shared components | **Modular Astro component hierarchy** (reuse `Navbar` + `Footer`) | Guarantees internal-link policy, brand independence, and visual consistency. |
| Configurator data model | Live backend fetch vs static realistic fixtures | **Static typed fixtures** in Astro for now | Meets requirement for 'realistic' configurator without backend execution risk. |
| Transition behavior | CSS-only transitions vs Astro View Transitions | **Astro View Transitions** + graceful fallback | Native Astro behavior with low implementation complexity for page-to-page motion. |

## Data Flow

`Layout` (ViewTransitions + global fonts/tokens)
→ page route (`/`, `/features`, `/docs`, `/how-it-works`, `/configurator`)
→ shared shell (`Navbar`, content sections, `Footer`)
→ local static data (features/docs/configurator fixtures)
→ rendered UI primitives (`CodeTabs`, `TerminalWindow`, hairline utilities).

Configurator-specific flow:

`configurator.astro` → `configuratorData.ts` (agents, skills, memory toggles, presets) → tab/panel and terminal preview UI.
Data is handled statically/locally within the project to be 'realistic' without any backend execution.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/layouts/Layout.astro` | Modify | Add Astro View Transitions and keep icon/font contracts. |
| `src/components/Navbar.astro` | Modify | Remove external brand references; enforce internal routes and consistent Brutalist styling. |
| `src/components/Footer.astro` | Modify | Enforce internal-only resource links; remove OpenCode/Claude mentions. |
| `src/components/CodeTabs.astro` | Modify | Reuse for docs/configurator presets with accessible tab semantics. |
| `src/components/ui/TerminalWindow.astro` | Modify | Align colors/borders with Functional Brutalism tokens and window controls. |
| `src/pages/index.astro` | Modify | Stitch parity update, internal route CTAs, and ensure standalone brand messaging. |
| `src/pages/features.astro` | Create | Technical bento breakdown highlighting Gentle-AI's independent ecosystem. |
| `src/pages/docs.astro` | Create | Sidebar docs hub + code/terminal content blocks, strictly referencing Gentle-AI. |
| `src/pages/configurator.astro` | Create | Configurator with realistic ecosystem fixtures (handled locally). |
| `src/data/configuratorData.ts` | Create | Typed static fixture data for standalone ecosystem: agents, skills, memory toggles. |
| `src/styles/global.css` | Modify | Finalize Brutalism utilities/hairlines/table/tab classes for all pages. |
| `tailwind.config.mjs` | Modify | Ensure centralized Functional Brutalism design tokens. |

## Interfaces / Contracts

```ts
// src/data/configuratorData.ts
export interface AgentProfile { id: string; name: string; role: string; model: string; temperature: string }
export interface SkillProfile { name: string; trigger: string; scope: 'system' | 'project' }
export interface MemoryToggle { key: 'projectPersistence' | 'sessionPersistence'; label: string; defaultOn: boolean }
export interface ConfigPreset { id: string; label: string; commands: Array<{ tool: string; command: string }>; note: string }

export interface ConfiguratorData {
  agents: AgentProfile[]
  skills: SkillProfile[]
  memoryToggles: MemoryToggle[]
  presets: ConfigPreset[]
}
```

Navigation & Brand Contract:
- All link arrays in shared/page components MUST satisfy `href.startsWith('/') || href.startsWith('#')`.
- NO references to OpenCode, Claude, or other external CLIs are allowed in text, code snippets, or configuration data. Gentle-AI is a standalone ecosystem.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Unit/static | Brand Independence | Grep for prohibited terms (OpenCode, Claude) and assert they are not present. |
| Unit/static | Internal-link policy | Render routes and assert all anchors are `/` or `#` only. |
| Unit/static | Configurator data realism | Validate fixture arrays include non-empty agents, skills, and two persistence toggles. |
| Integration | Shared component reuse | Assert `/docs` and `/configurator` include Navbar/Footer and follow the independent design model. |
| Integration | Token integrity | Assert critical token classes render on each page section shell. |
| E2E | Route transitions | Navigate across all internal routes using View Transitions and verify successful navigation. |

## Migration / Rollout

No data migration required. Rollout is a presentation-layer expansion (new routes + shared component hardening + brand copy update). 

## Open Questions

- [ ] Should `/configurator` persist tentative toggle state in URL/query params, or remain session-local UI only?
- [ ] Should docs sidebar include a generated in-page TOC now, or defer to a later docs information architecture pass?