# Delta for interactive-tui

## ADDED Requirements

### Requirement: Representative Sub-Screen State Sequences

From `Menu`, each option MUST transition into a distinct representative flow (not a shared generic log) with this expected high-level sequence:

| Option | Required high-level state sequence |
|---|---|
| Start installation | `Detection → Agents → Persona → Preset → Installing → Complete` |
| Upgrade tools | `Upgrade Check → Upgrade Ready → Upgrade Running → Upgrade Result` |
| Sync configs | `Sync Confirm → Sync Running → Sync Result` |
| Upgrade + Sync | `Combined Confirm → Upgrade Running → Sync Running → Combined Result` |
| Configure models | `Model Entry → Model Picker/Config` |
| Create your own Agent | `Engine Select → Agent Prompt → SDD Choice → Generate → Preview → Install → Complete` |
| Manage backups | `Backups List → (Restore \| Delete \| Rename) → Result` |
| Quit | `Teardown/Exit` (silent; no synthetic success state) |

#### Scenario: Menu options branch to distinct flows
- GIVEN `InteractiveTUI` is in `Menu`
- WHEN each of the 8 options is selected
- THEN the first transition MUST enter that option's declared sequence
- AND flows MUST remain distinct instead of converging into one shared generic result log

#### Scenario: Quit exits silently
- GIVEN `InteractiveTUI` is in `Menu`
- WHEN `Quit` is selected
- THEN the component SHALL teardown and exit
- AND it MUST NOT render a synthetic success/result screen

### Requirement: Canonical Logo and Tagline Fidelity Lock

The welcome view MUST render the canonical 17-line braille lips/face logo exactly as defined below, with discrete color bands by line range (1-4 Mauve, 5-7 Lavender, 8-11 Blue, 12-14 Teal, 15-17 Green). The welcome tagline MUST follow `AI Gentle Stack v{version} — One command. Any agent. Any OS.`

Canonical logo block (17 lines):

```text
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
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

#### Scenario: Logo and tagline are exact
- GIVEN the welcome screen is rendered
- WHEN logo lines, per-line colors, and tagline text are inspected
- THEN the logo MUST match the canonical 17-line block with the declared discrete bands
- AND the tagline SHALL include a version token using the versioned format

### Requirement: Lifecycle Cleanup and Single Keyboard Listener Set

The component MUST preserve an `AbortController`-based listener lifecycle and SHALL maintain exactly one active keyboard listener set per mounted instance, including Astro navigation remounts.

#### Scenario: Cleanup occurs through AbortController
- GIVEN listeners are bound for an active instance
- WHEN teardown lifecycle events run
- THEN listener cleanup MUST be executed via the active `AbortController`

#### Scenario: Remount does not duplicate listeners
- GIVEN `/demo` is visited, left, and revisited
- WHEN keyboard input is used after remount
- THEN exactly one listener set SHALL process the event
- AND prior listener sets MUST already be aborted
