# Delta for interactive-tui

## ADDED Requirements

### Requirement: gentle-ai Workflow Fidelity

The demo MUST mirror the documented `gentle-ai` welcome workflow using `../gentle-ai/README.md`, `../gentle-ai/docs/usage.md`, and the upstream welcome screen as source of truth.

#### Scenario: Startup uses install wording but launches the TUI command
- GIVEN the demo starts in the prompt phase
- WHEN the startup sequence is shown
- THEN visible copy SHALL describe the Homebrew install path (`brew tap` + `brew install gentle-ai`)
- AND the typed command that launches the interactive demo MUST be `gentle-ai`

#### Scenario: Menu labels and order match the real welcome screen
- GIVEN the demo enters the welcome menu
- WHEN options are rendered
- THEN labels and order SHALL match the upstream `gentle-ai` welcome menu for the supported browser demo subset

#### Scenario: Selection output matches the chosen welcome section
- GIVEN a user selects a welcome option
- WHEN the demo renders the follow-up section
- THEN the output SHALL reflect the same documented workflow for that option using browser-safe wording only

## MODIFIED Requirements

### Requirement: Deterministic Three-State Flow

`InteractiveTUI` MUST implement a deterministic state machine with exactly three states: `Prompt`, `Menu Loop`, and `Climax`. The `Prompt` state SHALL show the corrected install/launch story, the `Menu Loop` SHALL mirror the real `gentle-ai` welcome menu, and `Climax` SHALL render the selected section output.

(Previously: three generic states existed, but they did not require the real `gentle-ai` startup and welcome workflow.)

#### Scenario: Prompt transitions to menu loop
- GIVEN `InteractiveTUI` is initialized
- WHEN the startup sequence completes
- THEN the component SHALL transition from `Prompt` to `Menu Loop`
- AND the transition MUST occur only after showing brew-based install wording and launching from `gentle-ai`

#### Scenario: Menu loop transitions to climax
- GIVEN `InteractiveTUI` is in `Menu Loop`
- WHEN the user selects a supported welcome option
- THEN the component SHALL transition to `Climax`
- AND the terminal output MUST reflect the chosen real-workflow section

#### Scenario: Illegal transitions are prevented
- GIVEN `InteractiveTUI` is in any state
- WHEN an unsupported transition is attempted
- THEN state MUST remain unchanged

### Requirement: Keyboard-First Interactivity with Pointer Fallbacks

The component MUST support keyboard interaction as primary control, MUST prevent conflicting browser-default actions only for owned shortcuts, SHOULD provide click/tap fallbacks for equivalent actions, and MUST keep exactly one active listener set per mounted demo instance with cleanup on Astro navigation lifecycle events.

(Previously: keyboard and pointer parity were required, but single-listener lifecycle cleanup was not explicit.)

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
- AND prior listeners MUST be cleaned up before the new instance becomes interactive

### Requirement: Accessibility and ARIA Contracts

`InteractiveTUI` MUST preserve keyboard navigation across actionable items, MUST keep focus on the active interactive region through phase changes, MUST expose ARIA labels for interactive controls, and SHOULD communicate visible state changes to assistive technologies.

(Previously: accessibility covered navigation and labels, but not explicit focus continuity across phase changes.)

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
- THEN focus and visible selection state MUST stay coherent
- AND transition-relevant feedback SHOULD be programmatically perceivable

## REMOVED Requirements

### Requirement: Strict Brand Independence

(Reason: this demo must now faithfully represent the first-party `gentle-ai` workflow and command wording rather than a brand-neutral abstraction.)
