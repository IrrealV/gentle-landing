# Proposal: How It Works Documentation

## Intent

The landing page requires technical documentation for the "How it works" section. Developers need to understand Gentle-AI's internal architecture before adopting it. CTOs need quick comprehension of the value each component provides.

## Scope

### In Scope
- Technical documentation for 5 core components: SDD, Agent Ecosystem, Skills, Engram, MCP
- Component purpose, operation within ecosystem, and video embed placeholders
- Functional Brutalist tone: precise, technical, no marketing fluff
- Markdown format consumable by Astro components

### Out of Scope
- Video production (placeholders only)
- Implementation of Astro components (separate change)
- Interactive diagrams or animations

## Capabilities

### New Capabilities
- `how-it-works-content`: Markdown documentation detailing Gentle-AI architecture components

### Modified Capabilities
- None

## Approach

Create a structured Markdown document with:
1. Each component as a self-contained section
2. Three parts per component: Purpose, Operation, Video Placeholder
3. Consistent formatting for agent consumption
4. Technical precision over marketing language

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `docs/how-it-works.md` | New | Component architecture documentation |
| `src/pages/index.astro` | Future | Will consume this content (separate change) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Technical inaccuracies | Low | Reference actual skill files and architecture |
| Too verbose for landing page | Med | Strict section length limits, bullet points |

## Rollback Plan

Delete `docs/how-it-works.md`. No other files affected.

## Dependencies

- None (documentation-only change)

## Success Criteria

- [ ] All 5 components documented with purpose + operation + video placeholder
- [ ] Tone matches Functional Brutalism (technical, precise, no fluff)
- [ ] Content is agent-consumable Markdown
- [ ] Each section is self-contained and scannable
