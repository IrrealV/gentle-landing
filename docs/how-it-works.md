# Gentle-AI Architecture: How It Works

> **Target**: Landing page "How it works" section  
> **Tone**: Functional Brutalism — technical, precise, zero marketing fluff  
> **Format**: Structured Markdown for agent/component consumption

---

## 1. SDD (Spec-Driven Development)

### Purpose

SDD is a structured workflow that forces AI agents to think before coding. Instead of generating code directly from a prompt, the AI follows a deterministic pipeline: understand intent → document requirements → design solution → implement → verify.

This eliminates the "generate-and-pray" pattern where AI produces plausible but incorrect code.

### How It Operates

The SDD workflow is a seven-phase pipeline. Each phase produces an artifact that feeds the next:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  PROPOSAL   │────▶│    SPEC     │────▶│   DESIGN    │
│  What & Why │     │ Requirements│     │    How      │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                    ┌──────────────────────────┘
                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    TASKS    │────▶│    APPLY    │────▶│   VERIFY    │
│  Checklist  │     │    Code     │     │   Check     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                    ┌──────────────────────────┘
                    ▼
              ┌─────────────┐
              │   ARCHIVE   │
              │   Close     │
              └─────────────┘
```

**Phase Breakdown**:

| Phase | Artifact | Purpose |
|-------|----------|---------|
| **Proposal** | `proposal.md` | Capture intent, scope, and approach. What are we building and why? |
| **Spec** | `spec.md` | Define requirements and acceptance scenarios. What must be true when done? |
| **Design** | `design.md` | Architecture decisions, file structure, data models. How will we build it? |
| **Tasks** | `tasks.md` | Implementation checklist. Discrete, verifiable work units. |
| **Apply** | Source code | Actual implementation following specs and design. |
| **Verify** | Verification report | Confirm implementation matches specs. Identify gaps. |
| **Archive** | Closed change | Sync delta specs to main specs. Mark change complete. |

**Key Principle**: No phase can skip artifacts. If Apply produces code that doesn't match Spec, Verify catches it. This creates an audit trail and reduces rework.

**Integration Points**:
- Skills can define phase-specific rules (e.g., "proposals must include rollback plan")
- Engram persists artifacts across sessions — pick up where you left off
- Each phase is executed by a specialized sub-agent

[Placeholder: YouTube Embed - SDD (Spec-Driven Development) Technical Deep Dive]

---

## 2. Agent Ecosystem

### Purpose

Gentle-AI is not a single tool — it's an ecosystem layer that works across multiple AI coding agents. The same skills, memory, and workflows operate whether you're using Claude Code, a community CLI, or Gemini CLI.

This decouples your investment in AI-assisted development from any single vendor.

### How It Operates

The ecosystem has three layers:

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR CODEBASE                        │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│              GENTLE-AI ECOSYSTEM LAYER                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  Skills  │  │  Engram  │  │   SDD    │  │  MCP   │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                  CLI AGENTS (Interchangeable)           │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐    │
│  │ Claude Code│  │ Community CLI │  │ Gemini CLI   │    │
│  └────────────┘  └────────────┘  └────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Supported Agents**:

| Agent | Provider | Notes |
|-------|----------|-------|
| **Claude Code** | Anthropic | Native MCP support, strong reasoning |
| **Community CLI** | Open source | Flexible, multi-model backend |
| **Gemini CLI** | Google | 1M token context, fast iteration |

**Shared Components**:
- **Skills directory**: `~/.config/gentle-ai/skills/` — same skills loaded by all agents
- **Engram memory**: Persisted to SQLite — accessible by any agent
- **MCP servers**: Protocol-level integration — vendor-agnostic

**Why This Matters**:
1. **No lock-in**: Switch agents without losing context or conventions
2. **Team consistency**: Everyone uses the same skills regardless of preferred CLI
3. **Future-proof**: New agents can join the ecosystem by supporting the protocol

[Placeholder: YouTube Embed - Agent Ecosystem Technical Deep Dive]

---

## 3. Skills

### Purpose

Skills are curated, loadable instruction sets that inject domain-specific knowledge into AI agents on demand. Instead of generic AI behavior, skills make the agent behave like a specialist in your stack.

Think of skills as "personality modules" — when you load `go-testing`, the agent knows Bubbletea patterns, table-driven tests, and `teatest` conventions. Without it, you get generic Go advice.

### How It Operates

Skills are Markdown files with frontmatter and structured instructions:

```markdown
---
name: react-19
description: React 19 patterns with Server Components, Actions, and use()
---

## Patterns

### Server Components
- Default to Server Components; add 'use client' only when needed
- Never import useState/useEffect in server components
...

## Anti-Patterns
- Don't use useEffect for data fetching (use Server Components)
- Don't prop-drill when composition works
...
```

**Skill Loading Mechanism**:

```
┌──────────────────┐     ┌──────────────────┐
│  Agent detects   │────▶│  Load skill from │
│  context match   │     │  skill directory │
└──────────────────┘     └──────────────────┘
        │                         │
        │    ┌────────────────────┘
        ▼    ▼
┌──────────────────┐
│ Instructions     │
│ injected into    │
│ agent context    │
└──────────────────┘
```

**Skill Types**:

| Type | Examples | Purpose |
|------|----------|---------|
| **Stack skills** | `react-19`, `dotnet`, `go-testing` | Framework-specific patterns |
| **Workflow skills** | `sdd-propose`, `branch-pr` | Process enforcement |
| **Tool skills** | `docker-essentials`, `github` | CLI/tooling knowledge |

**Skill Registry**:
- Located at `.atl/skill-registry.md` in project root
- Maps triggers to skills (e.g., "When writing Go tests → load `go-testing`")
- Agent auto-loads relevant skills based on file context

**Creating Custom Skills**:
Skills follow a standard structure. The `skill-creator` skill documents the exact format for defining new skills — including frontmatter schema, section conventions, and bundling scripts.

[Placeholder: YouTube Embed - Skills Technical Deep Dive]

---

## 4. Engram

### Purpose

Engram is Gentle-AI's persistent memory system. It survives session restarts, context compaction, and agent switches. Without it, every session starts from zero — you repeat decisions, re-explain conventions, and lose architectural context.

With Engram, the AI remembers what you built yesterday, why you made that tradeoff last week, and what files changed during the auth refactor.

### How It Operates

Engram stores observations in a local SQLite database with full-text search:

```
┌─────────────────────────────────────────────────────────┐
│                     ENGRAM DATABASE                     │
├─────────────────────────────────────────────────────────┤
│  Observations (FTS5 indexed)                            │
│  ├── type: decision | bugfix | architecture | pattern   │
│  ├── title: "Fixed N+1 query in UserList"               │
│  ├── content: What/Why/Where/Learned structured format  │
│  ├── project: "gentle-landing"                          │
│  ├── scope: project | personal                          │
│  └── topic_key: "architecture/auth-model" (for upserts) │
├─────────────────────────────────────────────────────────┤
│  Sessions                                               │
│  ├── id: "session-2024-01-15-abc123"                    │
│  ├── summary: Goal/Discoveries/Accomplished/Next Steps  │
│  └── project: "gentle-landing"                          │
└─────────────────────────────────────────────────────────┘
```

**Core Operations**:

| Operation | Function | When Used |
|-----------|----------|-----------|
| `mem_save` | Store observation | After decisions, bugfixes, discoveries |
| `mem_search` | FTS5 query | "What did we do with auth?" |
| `mem_context` | Recent history | Session start, context recovery |
| `mem_session_summary` | Close session | Before ending work |

**Memory Protocol**:

The agent follows a mandatory protocol:

1. **Session Start**: Call `mem_context` to load recent observations
2. **After Significant Work**: Call `mem_save` with structured content:
   ```
   **What**: One sentence — what was done
   **Why**: What motivated it
   **Where**: Files/paths affected
   **Learned**: Gotchas, edge cases (if any)
   ```
3. **Session End**: Call `mem_session_summary` with full context

**Topic Keys for Evolving Decisions**:

When the same topic evolves (e.g., auth architecture changes over time), use `topic_key` to upsert rather than create duplicates:

```
topic_key: "architecture/auth-model"
```

This keeps one canonical observation per topic, updated as decisions evolve.

[Placeholder: YouTube Embed - Engram Technical Deep Dive]

---

## 5. MCP (Model Context Protocol)

### Purpose

MCP (Model Context Protocol) is a standard protocol for connecting AI agents to external tools, APIs, and services. Instead of each agent implementing custom integrations, MCP provides a universal interface.

This means one integration works across all agents in the ecosystem.

### How It Operates

MCP uses a client-server architecture where the AI agent is the client and external services expose MCP servers:

```
┌─────────────────────────────────────────────────────────┐
│                      AI AGENT (Client)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │              MCP Client Protocol                 │   │
│  │  • Discovers available tools                     │   │
│  │  • Invokes tools with structured parameters      │   │
│  │  • Receives typed responses                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
              │              │              │
              ▼              ▼              ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  MCP Server:  │  │  MCP Server:  │  │  MCP Server:  │
│  Database     │  │  Web Search   │  │  File System  │
│  (Postgres)   │  │  (Context7)   │  │  (Local)      │
└───────────────┘  └───────────────┘  └───────────────┘
```

**How MCP Servers Work**:

Each MCP server exposes:
1. **Tool Definitions**: JSON schema describing available operations
2. **Invocation Endpoint**: Execute tool with parameters
3. **Response Format**: Typed, structured output

Example: A documentation MCP server might expose:
```json
{
  "name": "query-docs",
  "description": "Search library documentation",
  "parameters": {
    "libraryId": "/vercel/next.js",
    "query": "How to set up middleware"
  }
}
```

**Common MCP Integrations**:

| Server | Purpose | Example Use |
|--------|---------|-------------|
| **Context7** | Library documentation | "How does React 19 handle Suspense?" |
| **Engram** | Persistent memory | "What did we decide about auth?" |
| **Database** | Direct queries | "Show me users created today" |
| **GitHub** | Issues, PRs, repos | "Create a PR for this branch" |

**Configuration**:

MCP servers are configured in agent settings:

```json
{
  "mcpServers": {
    "engram": {
      "command": "npx",
      "args": ["-y", "@anthropic/engram-mcp"]
    },
    "context7": {
      "command": "npx", 
      "args": ["-y", "@context7/mcp"]
    }
  }
}
```

**Why MCP Matters**:
- **Composable**: Mix and match servers for your workflow
- **Secure**: Each server runs with explicit permissions
- **Extensible**: Write custom servers for internal tools
- **Standard**: Works across any MCP-compatible agent

[Placeholder: YouTube Embed - MCP (Model Context Protocol) Technical Deep Dive]

---

## Quick Reference: Component Interaction

```
┌─────────────────────────────────────────────────────────┐
│                     USER REQUEST                        │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  SKILLS: Load relevant patterns (react-19, dotnet...)   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  ENGRAM: Check memory for prior decisions/context       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  SDD: Execute workflow (Propose → Spec → Design → ...)  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  MCP: Query external tools (docs, APIs, databases)      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  ENGRAM: Save decisions, discoveries, session summary   │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

| Component | One-Line Summary |
|-----------|------------------|
| **SDD** | Structured pipeline that forces specs before code |
| **Agent Ecosystem** | Vendor-agnostic layer across Claude/community CLI/Gemini |
| **Skills** | Loadable instruction sets for domain expertise |
| **Engram** | Persistent memory across sessions |
| **MCP** | Universal protocol for external integrations |

**The Philosophy**: AI should understand your codebase, your conventions, and your history — not just your current prompt.
