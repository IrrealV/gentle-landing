# Design System Documentation: The Technical Monolith

## 1. Overview & Creative North Star
This design system is built upon the philosophy of **"The Technical Monolith."** It rejects the decorative fluff of modern consumer web design in favor of a high-end, editorial approach to Functional Brutalism. It is designed specifically for the developer persona—someone who finds beauty in the terminal, efficiency in the grid, and clarity in the code.

The "North Star" of this system is **Architectural Transparency.** We do not hide the structure of the UI; we celebrate it. By utilizing rigid grids, monochromatic depth, and high-contrast typographic scales, we move away from "standard" layouts and toward a bespoke, editorial experience that feels like a premium technical manual or a high-end IDE. We break the "template" look through intentional asymmetry—using large swaths of "Deep Void" space to create tension against dense, data-rich information clusters.

---

## 2. Colors & Surface Logic
The palette is rooted in a high-contrast, low-light environment. It prioritizes legibility and ocular comfort during long-form technical work.

### Color Tokens
- **Background (`surface`):** `#11131b` — The void. All work begins here.
- **Primary (`primary`):** `#9ad0e6` (Wave Blue) — Used for primary actions and state-heavy indicators.
- **Secondary (`secondary`):** `#e3c45d` (Gold) — Used sparingly for high-value callouts, AI-generated insights, or "Golden Path" interactions.
- **Neutral/Text:**
    - `on_surface`: `#e1e2ed` (High-contrast light)
    - `on_surface_variant`: `#c0c8cc` (Muted technical text)

### The "Subtle Shift" Rule
While the user request mentions 1px borders, this design system dictates that **structural sectioning must first be achieved through background color shifts.** Use `surface_container_low` (`#191b23`) and `surface_container_high` (`#272a32`) to define regions. 1px borders (`#1a1f2e`) should be reserved for the smallest functional units (inputs, buttons, cards) to maintain a "blueprint" aesthetic without cluttering the macro-layout.

### Signature Textures
To avoid a flat, "cheap" feel, use **Tonal Layering.** An inner container should always be slightly lighter or darker than its parent. For example, a code block should sit on `surface_container_lowest` (`#0c0e15`) to create a "recessed" feel, making the text appear as if it is etched into the screen.

---

## 3. Typography
The typographic soul of this system lies in the tension between the rigid **Space Grotesk** (Headings/Labels) and the utilitarian **Inter** (Body).

- **Display & Headlines:** Use `display-lg` through `headline-sm` in Space Grotesk. These should be set with tight letter-spacing (-0.02em) to evoke a modern, editorial feel. Use these for section headers and high-level technical stats.
- **The Monospace Accent:** All labels (`label-md`, `label-sm`) and data points must use the monospace scale. This reinforces the "developer-centric" nature of the tool, treating metadata as first-class code-like objects.
- **Body Text:** Use `body-md` (Inter) for documentation and long-form descriptions. Maintain a generous line-height (1.6) to provide relief against the otherwise rigid, dense grid.

---

## 4. Elevation & Depth: Tonal Architecture
In Functional Brutalism, we do not use "soft" shadows or glassmorphism. Depth is a matter of logic, not light.

- **The Layering Principle:** Hierarchy is achieved by stacking `surface-container` tiers. A "floating" command palette should not have a shadow; instead, it should be set to `surface_bright` (`#373941`) with a high-contrast `primary` border to physically separate it from the `surface` below.
- **The Ghost Border:** For non-interactive containers, use the `outline_variant` token at 20% opacity. This creates a "blueprint" line that guides the eye without creating visual noise.
- **Vertical Rhythm:** Use the spacing scale to create asymmetrical layouts. For example, a left-hand navigation may have 0px of padding against the screen edge, while the main content area has a massive 64px gutter, creating an intentional, high-end editorial "pull."

---

## 5. Components

### Buttons
- **Primary:** Background: `primary_container` (`#7fb4ca`), Text: `on_primary`. 0px border-radius. No gradient.
- **Secondary:** Border: 1px solid `primary`. Background: transparent.
- **State Change:** On hover, buttons should "invert"—the background fills with the text color and the text takes the background color. This provides a high-contrast, "binary" feedback loop.

### Terminal Inputs
- **Style:** Background: `surface_container_lowest`. Border-bottom: 1px solid `outline`.
- **Focus State:** The border-bottom shifts to `secondary` (Gold). A blinking 2px block cursor is preferred over a standard line cursor to maintain the terminal aesthetic.

### Cards & Data Lists
- **Rule:** Prohibit divider lines between list items.
- **Solution:** Use `surface_container_low` for the card body and `surface_container_high` for the header. Separate items using 8px of vertical white space or a subtle background toggle (zebra-striping) using `surface` and `surface_container_low`.

### Technical Chips
- **Style:** Monospace font. Background: `surface_container_highest`. 4px max border-radius. Use these for tags, language indicators, and status metadata.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace the Grid:** Align every element to a strict 8px baseline grid. If an element feels "off," it probably is.
- **Use High-Contrast Monospace:** Use `secondary_fixed` (Gold) for critical syntax highlighting or success states within the terminal.
- **Intentional Asymmetry:** Allow for large "empty" areas of `surface_dim`. This focuses the user’s attention on the density of the functional tools.

### Don’t:
- **No Softness:** Never use border-radii above 4px. Never use blur, shadows, or gradients.
- **No "Grey" Text:** Avoid using low-contrast grey for body text. Use `on_surface_variant` for secondary information, but ensure it meets AA accessibility standards against the deep background.
- **No Traditional Dividers:** Avoid using `<hr>` tags or 1px lines to separate content unless it is inside a form or a dense data table. Let space and color shifts do the heavy lifting.