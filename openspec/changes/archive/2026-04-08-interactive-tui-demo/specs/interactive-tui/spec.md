# interactive-tui Specification

## Purpose

Define the interactive terminal experience as a deterministic three-state flow that is keyboard-first, accessible, and brand-neutral.

## Requirements

### Requirement: Deterministic Three-State Flow

`InteractiveTUI` MUST implement a deterministic state machine with exactly three states: `Prompt`, `Menu Loop`, and `Climax`.

#### Scenario: Prompt transitions to menu loop
- GIVEN `InteractiveTUI` is initialized
- WHEN the user confirms the prompt action
- THEN the component SHALL transition from `Prompt` to `Menu Loop`

#### Scenario: Menu loop transitions to climax
- GIVEN `InteractiveTUI` is in `Menu Loop`
- WHEN the user triggers the climax condition
- THEN the component SHALL transition to `Climax`
- AND the terminal output MUST reflect completion semantics

#### Scenario: Illegal transitions are prevented
- GIVEN `InteractiveTUI` is in any state
- WHEN an unsupported transition is attempted
- THEN state MUST remain unchanged

### Requirement: Keyboard-First Interactivity with Pointer Fallbacks

The component MUST support keyboard interaction as primary control, MUST prevent conflicting browser-default actions when handling owned shortcuts, and SHOULD provide click/tap fallbacks for equivalent actions.

#### Scenario: Owned key actions are handled safely
- GIVEN focus is inside `InteractiveTUI`
- WHEN a supported control key is pressed
- THEN the component MUST handle the action
- AND `preventDefault` SHALL be applied only for owned shortcuts

#### Scenario: Pointer fallback mirrors keyboard actions
- GIVEN a user does not use keyboard controls
- WHEN the user activates UI controls via click/tap
- THEN the same state transitions and outputs SHOULD occur as with keyboard controls

### Requirement: Strict Brand Independence

The component MUST remain product-agnostic and MUST NOT render third-party names, trademarks, or vendor-specific branding in labels, copy, prompts, states, or output.

#### Scenario: Terminal copy is vendor neutral
- GIVEN `InteractiveTUI` renders visible copy
- WHEN prompts, menu options, and climax messaging are inspected
- THEN no third-party product names or logos SHALL be present

### Requirement: Accessibility and ARIA Contracts

`InteractiveTUI` MUST support keyboard navigation across actionable items, MUST expose ARIA labels for interactive controls, and SHOULD communicate meaningful state changes to assistive technologies.

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
- WHEN screen-reader users remain in the component context
- THEN transition-relevant feedback SHOULD be programmatically perceivable
