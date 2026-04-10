# interactive-tui Specification

## Purpose

Define the interactive terminal demo as a faithful browser representation of the real Gentle-AI welcome experience, including logo/tagline fidelity, per-option behavior fidelity, and keyboard-first accessibility.

## Requirements

### Requirement: Startup and Welcome Flow Fidelity

`InteractiveTUI` MUST implement a deterministic flow that starts in `Prompt`, transitions to `Menu`, and then transitions to a selected option-specific sub-screen/state (or exits on `Quit`).

#### Scenario: Prompt transitions to welcome menu
- GIVEN `InteractiveTUI` is initialized
- WHEN the startup sequence completes
- THEN the component SHALL transition from `Prompt` to `Menu`

#### Scenario: Menu selection transitions to option-specific state
- GIVEN `InteractiveTUI` is in `Menu`
- WHEN the user selects one of the eight options
- THEN the component MUST transition to that option's own behavior state
- AND the result MUST NOT be represented as a generic one-size-fits-all success log

#### Scenario: Illegal transitions are prevented
- GIVEN `InteractiveTUI` is in any state
- WHEN an unsupported transition is attempted
- THEN state MUST remain unchanged

### Requirement: Logo Fidelity and Per-Band Coloring

The welcome screen MUST render the canonical 17-line braille-art lips/face logo, and line coloring MUST be discrete by band (top-to-bottom), not a smooth CSS gradient.

Canonical logo block (17 lines):

```text
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⡽⠟⠛⠻⣶⣄⠀⢀⣐⣒⣒⣶⣴⣾⡿⢷⣶⣽⡢⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⣿⣿⢿⠋⠀⠀⠀⠀⠀⠉⠛⠓⠒⠛⠚⠛⠉⣿⠀⠀⣧⡏⠻⣷⣽⡦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣻⡾⠋⣇⢸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠉⠀⠀⢸⠙⠻⣿⣷⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⠋⠈⠀⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠈⡿⣷⣽⣇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣞⡿⠟⣟⠀⠀⠀⠀⠀⠀⠀⠀⠸⡆⠀⠀⠀⣆⠀⠀⡀⢸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠈⠻⣯⡳⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣽⠟⠁⠀⠘⠃⠀⠀⠀⠀⢰⡀⠀⠀⢹⡀⠀⠀⢸⡄⢀⣇⡾⣠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣾⣅⠀⠀⠀⠀
⣀⣀⣠⡴⠿⣅⠐⢦⡀⠀⠀⠀⠲⣄⠀⠀⣙⣦⣶⣾⣻⣶⣶⠾⠿⠾⢿⣿⣿⣻⢷⣢⢤⣀⠀⠀⠀⠀⠀⠀⠀⡀⠀⣴⠛⣿⣷⣄⡀⠀
⠹⠿⢿⣷⣦⣼⣷⣤⣻⣶⣤⣀⣀⣬⣷⡯⠷⠾⢿⣿⣭⣄⣀⣀⣀⣀⣀⣤⣭⡿⠿⢾⣿⣿⣿⣦⣤⣤⣤⣶⢾⡷⣿⣷⣾⣷⣿⡿⠿⠟
⠀⠀⠘⣿⡝⣿⡿⢻⣿⡿⢩⡞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠰⡄⠀⠀⠀⠀⠘⢦⠹⣮⢷⠹⣷⣿⠀⠀⠀
⠀⠀⠀⠙⣷⣿⠁⡞⣾⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⡇⠀⠀⠀⠀⠀⢸⡆⢸⢸⣦⡟⠁⠀⠀⠀
⠀⠀⠀⠀⠈⢻⣄⡏⣿⠀⡇⠀⠀⠀⠀⠀⢰⠀⠀⠀⠀⠀⠀⠀⢐⣧⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⣼⡇⠘⣼⠏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⠻⣧⣧⢣⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠸⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⢹⣠⡾⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣧⡘⣆⠀⠀⠘⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠀⠀⣴⣷⣿⡋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠷⣤⣀⣹⣄⠀⠀⠀⠀⠀⠀⡇⠀⠀⢀⠀⡆⠀⠀⣀⣴⣧⣴⣟⠯⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠽⠿⠿⠷⠶⢤⣤⣴⣿⣦⣶⣾⣿⣷⣾⣻⣿⠝⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠛⠛⠛⠛⠛⠊⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
```

Band coloring contract (line ranges are 1-indexed):
- Lines 1-4: Mauve
- Lines 5-7: Lavender
- Lines 8-11: Blue
- Lines 12-14: Teal
- Lines 15-17: Green

#### Scenario: Logo content and line count are exact
- GIVEN `InteractiveTUI` renders the welcome logo
- WHEN the logo text is inspected line-by-line
- THEN exactly 17 lines SHALL be present
- AND each line SHALL match the canonical braille-art block

#### Scenario: Coloring uses discrete bands
- GIVEN the logo is rendered
- WHEN line colors are inspected from top to bottom
- THEN colors MUST follow the five band ranges in order (Mauve → Lavender → Blue → Teal → Green)
- AND the implementation SHALL NOT define logo coloring as a smooth CSS gradient

### Requirement: Tagline Fidelity with Version

The welcome tagline MUST include the version string and SHALL follow the real TUI wording pattern.

#### Scenario: Tagline includes version
- GIVEN the welcome screen is rendered
- WHEN tagline text is inspected
- THEN it MUST include a version token in the same position as the real TUI
- AND it SHALL follow `AI Gentle Stack {version} — One command. Any agent. Any OS.`

### Requirement: Per-Option Behavior Contracts

Each welcome menu option MUST map to its own realistic sub-screen/state contract.

#### Scenario: Start installation opens install flow
- GIVEN `Menu` is active
- WHEN the user selects `Start installation`
- THEN the next state MUST present a multi-step installation flow

#### Scenario: Upgrade tools opens upgrade results state
- GIVEN `Menu` is active
- WHEN the user selects `Upgrade tools` (including status variants)
- THEN the next state MUST present upgrade progress/results semantics

#### Scenario: Sync configs requires confirmation then result
- GIVEN `Menu` is active
- WHEN the user selects `Sync configs`
- THEN the next state MUST include sync confirmation semantics and a sync result state

#### Scenario: Upgrade + Sync runs combined flow
- GIVEN `Menu` is active
- WHEN the user selects `Upgrade + Sync`
- THEN the next state MUST represent combined upgrade-and-sync flow semantics

#### Scenario: Configure models opens model selection
- GIVEN `Menu` is active
- WHEN the user selects `Configure models`
- THEN the next state MUST present a model selection screen

#### Scenario: Create Agent opens wizard
- GIVEN `Menu` is active
- WHEN the user selects `Create your own Agent`
- THEN the next state MUST present a multi-step agent creation wizard

#### Scenario: Manage backups opens backup manager
- GIVEN `Menu` is active
- WHEN the user selects `Manage backups`
- THEN the next state MUST present an interactive backup manager

#### Scenario: Quit exits silently
- GIVEN `Menu` is active
- WHEN the user selects `Quit` or triggers quit key behavior
- THEN the session SHALL exit without rendering a synthetic success screen

### Requirement: Keyboard-First Interactivity with Pointer Fallbacks

The component MUST support keyboard interaction as primary control, MUST prevent conflicting browser-default actions only for owned shortcuts, SHOULD provide click/tap fallbacks for equivalent actions, and MUST clean up listeners across Astro navigation lifecycle transitions.

#### Scenario: Owned key actions are handled safely
- GIVEN focus is inside `InteractiveTUI`
- WHEN a supported control key is pressed
- THEN the component MUST handle the action
- AND `preventDefault` SHALL be applied only for owned shortcuts

#### Scenario: Pointer fallback mirrors keyboard actions
- GIVEN a user does not use keyboard controls
- WHEN the user activates UI controls via click/tap
- THEN the same state transitions and outputs SHOULD occur as with keyboard controls

#### Scenario: Astro navigation does not duplicate handlers
- GIVEN `/demo` is visited, left, and revisited through Astro navigation
- WHEN keyboard input is used after remount
- THEN exactly one active listener set SHALL handle the input

### Requirement: Accessibility and ARIA Contracts

`InteractiveTUI` MUST preserve keyboard navigation across actionable items, MUST expose accessible names for interactive controls, and SHOULD communicate meaningful state changes to assistive technologies.

#### Scenario: Keyboard navigation across controls
- GIVEN focus enters the component
- WHEN the user navigates controls using keyboard
- THEN each actionable item SHALL be reachable and operable without a pointer

#### Scenario: ARIA labels expose control intent
- GIVEN assistive technology inspects actionable controls
- WHEN controls are announced
- THEN each control MUST expose a clear accessible name via ARIA label or equivalent semantic text

#### Scenario: State changes are perceivable
- GIVEN a state transition occurs
- WHEN users remain in the component context
- THEN transition-relevant feedback SHOULD be programmatically perceivable
