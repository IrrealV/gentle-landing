# Implementation Plan: Pixel-Perfect Stitch Design Match

## Executive Summary

This document provides a precise implementation plan to rebuild the Gentle-AI landing pages using Astro, ensuring **1:1 match** with the provided `/stitch` HTML/CSS designs. The plan is based on direct analysis of the raw stitch files, NOT previous implementations.

---

## 1. Design Token Extraction

### 1.1 Color Tokens (EXACT VALUES FROM STITCH FILES)

The stitch files define TWO slightly different color palettes:

#### Palette A - Landing Page (`gentle_ai_landing_page_real_data`)
```css
--background: #06080f
--surface: #06080f
--surface-container-lowest: #0c0e15
--surface-container-low: #191b23
--surface-container: #1d1f27
--surface-container-high: #272a32
--surface-container-highest: #32343d
--surface-variant: #32343d
--surface-dim: #11131b
--surface-bright: #373941
--primary: #7FB4CA
--primary-container: #7FB4CA
--primary-fixed: #b9eaff
--primary-fixed-dim: #7FB4CA
--on-primary: #003544
--on-primary-container: #004659
--on-primary-fixed: #001f29
--on-primary-fixed-variant: #0d4d60
--secondary: #E0C15A
--secondary-container: #806800
--secondary-fixed: #ffe07f
--secondary-fixed-dim: #e3c45d
--on-secondary: #3c2f00
--on-secondary-container: #ffebb2
--on-secondary-fixed: #231b00
--on-secondary-fixed-variant: #564500
--tertiary: #bec8d7
--tertiary-container: #a3adbc
--tertiary-fixed: #d9e3f3
--tertiary-fixed-dim: #bdc7d6
--on-tertiary: #27313d
--on-tertiary-container: #37414d
--on-tertiary-fixed: #131c27
--on-tertiary-fixed-variant: #3e4854
--outline: #8892A0
--outline-variant: #1a1f2e
--on-surface: #e1e2ed
--on-surface-variant: #8892A0
--on-background: #F3F6F9
--inverse-surface: #e1e2ed
--inverse-on-surface: #2e3038
--inverse-primary: #2e6579
--error: #ffb4ab
--error-container: #93000a
--on-error: #690005
--on-error-container: #ffdad6
```

#### Palette B - Configurator/Features/Docs/HowItWorks
```css
--background: #11131b
--surface: #11131b
--surface-container-lowest: #0c0e15
--surface-container-low: #191b23
--surface-container: #1d1f27
--surface-container-high: #272a32
--surface-container-highest: #32343d
--surface-variant: #32343d
--surface-dim: #11131b
--surface-bright: #373941
--primary: #9ad0e6
--primary-container: #7fb4ca
--primary-fixed: #b9eaff
--primary-fixed-dim: #99cee5
--on-primary: #003544
--on-primary-container: #004659
--on-primary-fixed: #001f29
--on-primary-fixed-variant: #0d4d60
--secondary: #e3c45d
--secondary-container: #806800
--secondary-fixed: #ffe07f
--secondary-fixed-dim: #e3c45d
--on-secondary: #3c2f00
--on-secondary-container: #ffebb2
--on-secondary-fixed: #231b00
--on-secondary-fixed-variant: #564500
--tertiary: #bec8d7
--tertiary-container: #a3adbc
--tertiary-fixed: #d9e3f3
--tertiary-fixed-dim: #bdc7d6
--on-tertiary: #27313d
--on-tertiary-container: #37414d
--on-tertiary-fixed: #131c27
--on-tertiary-fixed-variant: #3e4854
--outline: #8a9296
--outline-variant: #40484c
--on-surface: #e1e2ed
--on-surface-variant: #c0c8cc
--on-background: #e1e2ed
--inverse-surface: #e1e2ed
--inverse-on-surface: #2e3038
--inverse-primary: #2e6579
--error: #ffb4ab
--error-container: #93000a
--on-error: #690005
--on-error-container: #ffdad6
```

### 1.2 Typography Tokens

```css
/* Font Families */
--font-headline: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: ui-monospace, 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
--font-label: monospace; /* Used for small labels */

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
```

### 1.3 Border Radius Tokens

```css
/* Stitch uses MINIMAL radius (brutalist) */
--radius-DEFAULT: 0px;      /* or 0.25rem in some files */
--radius-lg: 4px;          /* or 0.5rem */
--radius-xl: 4px;          /* or 0.75rem */
--radius-full: 9999px;      /* for pills/badges */
```

### 1.4 Custom Utility Classes

From stitch files CSS:
```css
.glass-card { 
  background: rgba(25, 27, 35, 0.7); 
  backdrop-filter: blur(12px); 
  border: 1px solid #1a1f2e; 
}

.text-glow { 
  text-shadow: 0 0 15px rgba(127, 180, 202, 0.4); 
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #0c0e15; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #32343d; }

.technical-grid, .blueprint-grid {
  background-image: radial-gradient(circle, #1a1f2e 1px, transparent 1px);
  background-size: 32px 32px;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

.tonal-shift-bg-surface-container-low { background-color: #191b23; }
.tonal-shift-recessed { background-color: #0c0e15; }
.flat-no-shadows { box-shadow: none; }
.binary-feedback:active { filter: invert(1); }
.invert-on-click:active { filter: invert(1); }
```

---

## 2. Component Breakdown

### 2.1 TopNavBar (Navigation)

**Location**: All pages
**Structure**:
```html
<nav class="bg-[#11131b] border-b border-[#1a1f2e] fixed top-0 w-full z-50">
  <div class="flex justify-between items-center px-8 py-4 max-w-full">
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <span class="text-xl font-bold tracking-tighter text-[#7FB4CA] font-['Space_Grotesk'] uppercase">
        Gentle-AI
      </span>
    </div>
    
    <!-- Navigation Links (hidden on mobile) -->
    <div class="hidden md:flex items-center space-x-8">
      <!-- Active link style -->
      <a class="text-[#7FB4CA] border-b-2 border-[#7FB4CA] pb-1 font-['Space_Grotesk'] tracking-tight">
        Features
      </a>
      <!-- Inactive link style -->
      <a class="text-[#8892A0] font-mono text-xs uppercase tracking-widest hover:text-[#E0C15A]">
        How It Works
      </a>
    </div>
    
    <!-- Right side: Language + CTA -->
    <div class="flex items-center gap-4">
      <!-- Language Selector -->
      <div class="flex items-center gap-1 px-2 py-1 bg-surface-container-high rounded border border-outline-variant">
        <span class="material-symbols-outlined text-sm">language</span>
        <span class="text-xs font-mono">EN</span>
      </div>
      
      <!-- Primary CTA Button -->
      <button class="bg-[#7FB4CA] text-[#003544] font-mono px-4 py-2 text-xs uppercase tracking-widest 
                     hover:bg-[#E0C15A] transition-all duration-200 scale-95 active:scale-90">
        Connect
      </button>
    </div>
  </div>
</nav>
```

**Key Observations**:
- Fixed positioning with `z-50`
- Background uses HARDCODED hex `#11131b` (not CSS variable)
- Border uses HARDCODED hex `#1a1f2e`
- Logo text uses inline `font-['Space_Grotesk']`
- Active link has `border-b-2` underline treatment
- Inactive links use `font-mono text-xs uppercase tracking-widest`

### 2.2 Hero Section

**Structure** (2-column grid):
```html
<section class="pt-32 pb-20 px-6 max-w-7xl mx-auto border-x border-[#1a1f2e]">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <!-- Left: Content -->
    <div class="space-y-8">
      <!-- Version Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-primary/20">
        <span class="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
        <span class="font-mono text-xs">v2.4.0 STABLE RELEASE</span>
      </div>
      
      <!-- Headline -->
      <h1 class="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter text-glow">
        GENTLE-AI: <span class="text-primary-container">AI THAT UNDERSTANDS YOUR CODEBASE.</span>
        <br/>
        <span class="text-on-surface-variant font-light uppercase">NOT JUST YOUR PROMPT.</span>
      </h1>
      
      <!-- Description -->
      <p class="text-on-surface-variant font-mono text-lg max-w-xl">
        One command. Any agent. Supercharged with persistent memory and Spec-Driven Development.
        <span class="block mt-4 text-sm opacity-80">Supported: Claude Code, OpenCode, Gemini CLI, Cursor, Copilot, Codex, Windsurf, Antigravity.</span>
      </p>
      
      <!-- CTAs -->
      <div class="flex gap-4">
        <a class="bg-primary-container text-on-primary font-mono px-8 py-3 hover:bg-[#E0C15A] hover:text-background transition-all">
          GITHUB
          <span class="material-symbols-outlined text-sm">terminal</span>
        </a>
        <a class="border border-primary text-primary font-mono px-8 py-3 hover:bg-primary/10 transition-all">
          DOCS
        </a>
      </div>
    </div>
    
    <!-- Right: Terminal Window -->
    <div class="bg-surface-container-lowest border border-outline-variant p-1 relative">
      <div class="absolute -top-3 -right-3 bg-secondary text-on-secondary text-[10px] font-mono px-2 py-1 font-bold">
        LIVE_TERMINAL
      </div>
      <div class="p-6 font-mono text-sm leading-relaxed min-h-[300px]">
        <div class="flex gap-2 mb-4">
          <div class="w-3 h-3 bg-red-500 opacity-50"></div>
          <div class="w-3 h-3 bg-yellow-500 opacity-50"></div>
          <div class="w-3 h-3 bg-green-500 opacity-50"></div>
        </div>
        <!-- Terminal content -->
      </div>
    </div>
  </div>
</section>
```

### 2.3 Features Bento Grid (3-column)

**Structure**:
```html
<section class="border-y border-[#1a1f2e] bg-surface-container-low" id="features">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1a1f2e]">
    <!-- Card 1 -->
    <div class="p-12 hover:bg-surface-container-high transition-colors group">
      <div class="w-12 h-12 bg-surface-container-highest border border-outline-variant flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
        <span class="material-symbols-outlined text-primary text-3xl">architecture</span>
      </div>
      <h3 class="font-headline text-2xl font-bold mb-4 tracking-tight">SDD</h3>
      <p class="text-on-surface-variant text-sm font-body leading-relaxed mb-6">...</p>
      <div class="text-xs font-mono text-secondary uppercase tracking-widest">Workflow Protocol</div>
    </div>
    <!-- Card 2, 3 similar -->
  </div>
</section>
```

### 2.4 Documentation Box (Sidebar Layout)

**Structure** (flex layout):
```html
<section class="py-24 px-6 max-w-7xl mx-auto border-x border-[#1a1f2e]" id="how-it-works">
  <!-- Header -->
  <div class="mb-12">
    <h2 class="text-3xl font-headline font-bold mb-2 uppercase">How it operates</h2>
    <div class="h-1 w-24 bg-primary"></div>
  </div>
  
  <div class="flex flex-col md:flex-row border border-outline-variant min-h-[600px]">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-surface-container-low border-r border-outline-variant">
      <div class="p-4 border-b border-outline-variant bg-surface-container-high">
        <span class="font-mono text-[10px] text-on-surface-variant uppercase tracking-tighter">
          Documentation / Root
        </span>
      </div>
      <nav class="p-2 space-y-1">
        <button class="w-full text-left p-3 font-mono text-sm bg-primary/10 text-primary border-l-2 border-primary">
          SDD Pipeline
        </button>
        <!-- More items -->
      </nav>
    </aside>
    
    <!-- Content Area -->
    <main class="flex-1 bg-surface-container-lowest p-8 overflow-x-auto">
      <!-- Content -->
    </main>
  </div>
</section>
```

### 2.5 Stats/CTO Section (2-column efficiency)

**Structure**:
```html
<section class="bg-surface-container-high py-20 border-y border-[#1a1f2e]">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
    <!-- Left: Efficiency Gains -->
    <div class="space-y-8">
      <h2 class="text-4xl font-headline font-bold tracking-tight uppercase">Efficiency Gains</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-6 bg-surface-container-lowest border border-outline-variant">
          <div class="text-4xl font-mono text-secondary mb-2">40%</div>
          <div class="text-[10px] font-mono text-on-surface-variant uppercase mb-4 tracking-widest">
            Rework Reduction
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed">...</p>
        </div>
        <!-- More stat cards -->
      </div>
      <ul class="space-y-4 font-mono text-sm">
        <li class="flex items-center gap-3 text-on-surface">
          <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
          Spec-first reduces rework by 40%
        </li>
      </ul>
    </div>
    
    <!-- Right: Integration -->
    <div class="space-y-8">
      <h2 class="text-4xl font-headline font-bold tracking-tight uppercase">Integration</h2>
      <!-- Integration cards -->
    </div>
  </div>
</section>
```

### 2.6 Get Started Terminal (Install commands)

**Structure**:
```html
<section class="py-24 px-6 max-w-4xl mx-auto">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-headline font-bold mb-4 uppercase">Deploy Gentle-AI</h2>
    <p class="text-on-surface-variant font-mono text-sm">Configure your ecosystem in seconds.</p>
  </div>
  
  <div class="bg-surface-container-lowest border border-outline-variant overflow-hidden">
    <!-- Tab buttons -->
    <div class="flex bg-surface-container-low border-b border-outline-variant">
      <button class="px-6 py-3 font-mono text-xs border-r border-outline-variant bg-surface-container-lowest text-primary">
        sh (mac/linux)
      </button>
      <button class="px-6 py-3 font-mono text-xs border-r border-outline-variant text-on-surface-variant">
        pwsh (windows)
      </button>
      <button class="px-6 py-3 font-mono text-xs text-on-surface-variant">
        brew
      </button>
    </div>
    
    <!-- Code content -->
    <div class="p-8 font-mono text-sm relative group">
      <button class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container-high p-2 border border-outline-variant">
        <span class="material-symbols-outlined text-sm">content_copy</span>
      </button>
      <div class="flex gap-4">
        <span class="text-outline-variant select-none">1</span>
        <span class="text-on-surface">curl -fsSL https://gentle-ai.com/install.sh | bash</span>
      </div>
    </div>
  </div>
</section>
```

### 2.7 Footer

**Structure**:
```html
<footer class="bg-[#06080f] border-t border-[#1a1f2e] w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
  <div class="flex flex-col md:flex-row gap-8 items-center">
    <p class="font-mono text-xs text-[#8892A0]">© 2024 Gentle-AI Ecosystem Configurator</p>
    <nav class="flex gap-6">
      <a class="font-mono text-xs text-[#8892A0] hover:text-[#7FB4CA] underline decoration-dotted transition-opacity" href="#">
        GitHub
      </a>
      <!-- More links -->
    </nav>
  </div>
  <div class="flex gap-4">
    <a class="w-10 h-10 border border-outline-variant flex items-center justify-center hover:border-primary transition-colors">
      <span class="material-symbols-outlined text-[#8892A0]">terminal</span>
    </a>
  </div>
</footer>
```

### 2.8 System Configurator Page (Unique Components)

This page has unique components:

#### Sidebar with Platform Info:
```html
<aside class="md:col-span-3 border-r border-outline-variant bg-surface-container-low p-8 flex flex-col gap-12">
  <section>
    <h2 class="font-headline text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-6">
      <span class="w-1.5 h-1.5 bg-secondary"></span>
      PLATFORM_ID
    </h2>
    <div class="p-4 border border-outline-variant bg-surface-container-lowest">
      <div class="flex items-center justify-between mb-1">
        <span class="font-mono text-[10px] text-on-surface-variant">OS_FAMILY</span>
        <span class="material-symbols-outlined text-sm text-primary">desktop_windows</span>
      </div>
      <div class="font-headline text-lg font-bold">macOS Ventura</div>
    </div>
  </section>
  <!-- Install Vector section -->
  <!-- Node Status section -->
</aside>
```

#### Agent Detection Grid:
```html
<div class="flex items-center justify-between p-4 bg-surface-container-low border-l-2 border-primary hover:bg-surface-container-high transition-all">
  <div class="flex items-center gap-4">
    <div class="w-10 h-10 bg-surface-container-highest flex items-center justify-center border border-outline-variant">
      <span class="material-symbols-outlined text-primary">terminal</span>
    </div>
    <div>
      <div class="font-headline font-bold text-sm">Claude Code</div>
      <div class="font-mono text-[10px] text-on-surface-variant">TASK_TOOL: Sub-agents, output styles</div>
    </div>
  </div>
  <span class="font-mono text-[10px] text-primary border border-primary/30 px-2 py-1 bg-primary/5">DETECTED</span>
</div>
```

#### Terminal Window with Progress Bar:
```html
<div class="bg-surface-container-lowest border border-outline-variant rounded-sm overflow-hidden flex flex-col h-[520px] shadow-2xl">
  <div class="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant">
    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-xs">folder_open</span>
      <span class="font-mono text-[10px] uppercase tracking-widest">gentle-ai/init-process</span>
    </div>
    <span class="font-mono text-[10px]">tty -- 80x24</span>
  </div>
  <div class="p-6 font-mono text-sm overflow-y-auto flex-grow custom-scrollbar space-y-2">
    <!-- Terminal output -->
    <div class="w-full bg-surface-container-high h-1 my-2">
      <div class="bg-primary h-full w-[85%]"></div>
    </div>
    <div class="text-on-surface-variant">Indexing [#######################---] 85%</div>
  </div>
</div>
```

### 2.9 Documentation Center Page (Unique Components)

#### Technical Grid Background:
```html
<main class="flex-1 overflow-y-auto technical-grid custom-scrollbar">
```

#### Sidebar Navigation (Multi-level):
```html
<aside class="w-72 bg-surface-container-low border-r border-[#1a1f2e] flex flex-col hidden lg:flex">
  <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
    <div class="mb-8">
      <h3 class="font-label text-[10px] uppercase tracking-[0.2em] text-[#8892A0] mb-4">Void Logic: Core</h3>
      <ul class="space-y-1">
        <li><a class="flex items-center gap-3 px-3 py-2 text-sm font-label text-primary bg-surface-container-high border-l-2 border-primary" href="#">
          System Overview
        </a></li>
        <!-- More items -->
      </ul>
    </div>
    <!-- More sections -->
  </div>
  <div class="p-6 border-t border-[#1a1f2e] bg-surface-container-lowest">
    <div class="flex items-center gap-3">
      <div class="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
      <span class="text-[10px] font-mono text-on-surface-variant uppercase">Logic Status: Operational</span>
    </div>
  </div>
</aside>
```

#### Data Table:
```html
<table class="w-full text-left text-sm">
  <thead>
    <tr class="bg-surface-container-high border-b border-[#1a1f2e]">
      <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-[#8892A0]">Agent</th>
      <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-[#8892A0]">Delegation</th>
      <th class="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-[#8892A0]">Key Feature</th>
    </tr>
  </thead>
  <tbody class="font-mono text-[11px]">
    <tr class="border-b border-[#1a1f2e]/30 hover:bg-surface-container-highest transition-colors">
      <td class="px-6 py-4 text-primary font-bold">Claude Code</td>
      <td class="px-6 py-4">Full (Task tool)</td>
      <td class="px-6 py-4 text-on-surface-variant">Sub-agents, output styles</td>
    </tr>
  </tbody>
</table>
```

#### Code Block with Syntax Highlighting:
```html
<div class="bg-surface-container-lowest border border-[#1a1f2e] overflow-hidden">
  <div class="px-6 py-4 border-b border-[#1a1f2e] bg-surface-container-low flex justify-between items-center">
    <span class="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">engram_schema.sql</span>
  </div>
  <pre class="p-8 text-[11px] overflow-x-auto code-block text-on-surface-variant">
<span class="text-secondary">CREATE TABLE</span> observations (
  id <span class="text-primary-container">INTEGER PRIMARY KEY</span>,
  ...
);
  </pre>
</div>
```

### 2.10 How It Works Page (7-Phase Pipeline)

#### Blueprint Grid Hero:
```html
<header class="relative px-8 pt-24 pb-16 border-b border-outline-variant bg-surface overflow-hidden">
  <div class="absolute inset-0 blueprint-grid opacity-20"></div>
  <div class="max-w-7xl mx-auto relative z-10">
    <!-- Content -->
  </div>
</header>
```

#### 7-Phase Pipeline Grid:
```html
<div class="grid grid-cols-1 md:grid-cols-7 gap-1 mb-12">
  <!-- Phase Card -->
  <div class="p-6 bg-surface border border-outline-variant hover:border-primary transition-colors group relative overflow-hidden">
    <div class="absolute top-0 right-0 p-2 mono text-[10px] text-outline opacity-40">01</div>
    <span class="material-symbols-outlined text-primary mb-4">lightbulb</span>
    <h3 class="font-headline font-bold text-sm uppercase mb-2">Proposal</h3>
    <p class="font-body text-xs text-on-surface-variant leading-relaxed">What & Why. Capture intent, scope, and approach.</p>
    <div class="mt-4 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
  </div>
  <!-- Phases 02-07 similar -->
</div>
```

---

## 3. Implementation Checklist

### Phase 1: Token System Update

- [ ] Create exact color token mapping in `global.css`
- [ ] Remove existing "tertiary" palette confusion
- [ ] Add all surface-container variants
- [ ] Add fixed/dim color variants
- [ ] Ensure outline-variant covers both `#1a1f2e` and `#40484c` uses

**Critical Changes Needed**:
```css
/* Current global.css has wrong naming - secondary gold is called "tertiary" */
--tertiary: #E0C15A;  /* WRONG - should be secondary */

/* Should be: */
--secondary: #e3c45d;
--secondary-fixed: #ffe07f;
--secondary-fixed-dim: #e3c45d;
--on-secondary: #3c2f00;
--secondary-container: #806800;
```

### Phase 2: Typography Fixes

- [ ] Ensure Space Grotesk is ONLY for headlines
- [ ] Ensure Inter is default body font
- [ ] Add ui-monospace fallback chain for mono
- [ ] Verify font weights: 300, 400, 500, 600, 700 for Space Grotesk
- [ ] Verify Inter weights: 400, 500, 600

### Phase 3: Component Rebuild

**TopNavBar.astro**:
- [ ] Match exact hardcoded hex colors from stitch
- [ ] Implement language selector dropdown
- [ ] Add active state with border-b-2 treatment
- [ ] Implement hover: text-[#E0C15A] for links

**Hero.astro**:
- [ ] Match exact grid layout (2-column, items-center)
- [ ] Add text-glow effect class
- [ ] Rebuild terminal window with exact styling
- [ ] Add LIVE_TERMINAL badge positioned absolute

**FeaturesGrid.astro**:
- [ ] Use divide-y/divide-x instead of borders
- [ ] Match padding (p-12)
- [ ] Add category label at bottom
- [ ] Implement group-hover:border-primary for icons

**HowItWorks.astro**:
- [ ] Implement sidebar layout with exact structure
- [ ] Add ASCII pipeline diagram
- [ ] Match numbered list styling

**Stats.astro**:
- [ ] Two-column grid with exact spacing
- [ ] Stat cards with large mono numbers
- [ ] Integration cards with READY badges

**GetStarted.astro**:
- [ ] Tab-based terminal with exact colors
- [ ] Copy button with hover opacity
- [ ] Line numbers in left column

**Footer.astro**:
- [ ] Match exact footer structure
- [ ] Underline decoration-dotted for links
- [ ] Icon buttons with border styling

### Phase 4: Page-Specific Components

**Configurator Page**:
- [ ] Sidebar with PLATFORM_ID section
- [ ] Agent detection grid with DETECTED badges
- [ ] Terminal window with progress bars
- [ ] Action buttons with binary-state-feedback

**Documentation Page**:
- [ ] Technical grid background
- [ ] Multi-level sidebar navigation
- [ ] Data tables with hover states
- [ ] Code blocks with inline syntax highlighting (primary, secondary, outline classes)

**Features Page**:
- [ ] Asymmetric hero (7:5 column split)
- [ ] Bento grid with 3 sections
- [ ] System diagram visualization
- [ ] CTA section

**How It Works Page**:
- [ ] Blueprint grid background
- [ ] 7-phase pipeline grid
- [ ] Phase breakdown table
- [ ] Key principles bento grid
- [ ] Terminal log display

### Phase 5: Utilities & Helpers

- [ ] Add `.text-glow` utility
- [ ] Add `.glass-card` utility
- [ ] Add `.technical-grid` / `.blueprint-grid` utilities
- [ ] Add `.custom-scrollbar` utility
- [ ] Add `.binary-feedback` / `.invert-on-click` utilities
- [ ] Add `.tonal-shift-*` utilities

---

## 4. Critical Discrepancies Found

### 4.1 Color Variable Naming

**Stitch uses**: `secondary` for gold (#E0C15A / #e3c45d)
**Current CSS uses**: `tertiary` for gold

**Fix**: Rename tertiary to secondary throughout.

### 4.2 Background Colors

**Landing page**: `#06080f` (void)
**Other pages**: `#11131b` (surface)

**Fix**: Need to support both palettes, possibly via page-specific overrides.

### 4.3 Border Radius

**Stitch uses**: 0px-4px (brutalist)
**Current CSS uses**: arbitrary rounded values

**Fix**: Remove all rounded-* classes that exceed 4px, enforce brutal radius.

### 4.4 Hardcoded Colors

**Stitch uses inline hex colors extensively**: `text-[#7FB4CA]`, `bg-[#11131b]`, `border-[#1a1f2e]`

**Strategy**: Either:
1. Match with exact hex in component classes
2. Create utility classes for these common patterns

### 4.5 Font Variations

**Material Symbols**:
- Stitch uses: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`
- Must be inlined in style attribute or global CSS

---

## 5. File Structure Recommendation

```
src/
├── styles/
│   ├── global.css          # Token definitions + base styles
│   └── utilities.css       # Custom utility classes
├── components/
│   ├── ui/
│   │   ├── Badge.astro
│   │   ├── Button.astro
│   │   └── TerminalWindow.astro
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── FeaturesGrid.astro
│   ├── HowItWorks.astro
│   ├── Stats.astro
│   └── GetStarted.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro         # Landing page
│   ├── configurator.astro  # System Configurator
│   ├── docs.astro          # Documentation Center
│   ├── features.astro      # Features Detail
│   └── how-it-works.astro  # SDD Pipeline
└── data/
    └── siteConfig.ts
```

---

## 6. Testing Checklist

For each page, verify:
- [ ] Pixel-perfect match with stitch HTML
- [ ] All color tokens render correctly
- [ ] Typography hierarchy matches
- [ ] Hover states work as expected
- [ ] Mobile responsive design
- [ ] Material Symbols icons render correctly
- [ ] Terminal windows animate properly
- [ ] Grid backgrounds display (technical-grid, blueprint-grid)

---

## 7. Priority Order

1. **HIGH**: Fix color token naming (secondary vs tertiary)
2. **HIGH**: Update global.css with complete token set
3. **HIGH**: Rebuild Navbar with exact stitch structure
4. **MEDIUM**: Rebuild Hero with exact terminal styling
5. **MEDIUM**: Rebuild FeaturesGrid with divide approach
6. **MEDIUM**: Create page-specific layouts
7. **LOW**: Add animation utilities
8. **LOW**: Performance optimization

---

This implementation plan ensures pixel-perpixel match with the provided designs while maintaining the brutalist, technical aesthetic defined in the DESIGN.md.