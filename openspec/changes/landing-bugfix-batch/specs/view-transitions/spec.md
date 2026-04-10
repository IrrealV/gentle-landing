# Delta for view-transitions

## ADDED Requirements

### Requirement: Language Toggle Lifecycle Stability

El selector de idioma compartido MUST sobrevivir navegación interna de Astro y SHALL re-vincular sus handlers exactamente una vez por ciclo de swap, sin duplicación.

#### Scenario: Navegación interna preserva idioma activo
- GIVEN un usuario cambia idioma en una página interna
- WHEN navega a otra ruta interna con View Transitions
- THEN la preferencia de idioma SHALL mantenerse aplicada
- AND los controles SHALL seguir respondiendo

#### Scenario: Rebind único por swap
- GIVEN múltiples navegaciones internas consecutivas
- WHEN se completa cada transición
- THEN el toggle SHALL tener una sola vinculación activa
- AND MUST NOT disparar eventos duplicados por interacción

## MODIFIED Requirements

### Requirement: Internal Route Transition Continuity

The system MUST apply Astro View Transitions for navigation between internal pages in the landing experience (`/`, `/features`, `/docs`, `/how-it-works`, `/demo`).
(Previously: incluía `/configurator` como ruta soportada.)

#### Scenario: Transition executes on internal route navigation
- GIVEN a user clicks an internal route link in shared navigation
- WHEN navigating between supported pages
- THEN the page change SHALL use View Transition behavior instead of abrupt full redraw

#### Scenario: Anchor-only navigation does not break UX
- GIVEN a user clicks an in-page anchor link
- WHEN the browser scrolls to target section
- THEN navigation SHALL remain functional without requiring view-transition animation
