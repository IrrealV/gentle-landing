# Delta for landing-page

## ADDED Requirements

### Requirement: Community Block Links Curated and Verified

El bloque `Community` del footer MUST incluir únicamente enlaces verificados de GitHub y Discord de `../gentle-ai`, y MUST NOT alterar la estructura de las otras columnas ni la barra inferior.

#### Scenario: Community expone solo dos enlaces válidos
- GIVEN el footer renderizado en cualquier página de landing
- WHEN se inspecciona el bloque `Community`
- THEN SHALL existir solo `GitHub` y `Discord` con URLs verificadas
- AND no SHALL existir enlaces a `/configurator` u otros destinos

## MODIFIED Requirements

### Requirement: Hero Color Differentiation Without Structural Change

The Hero MUST keep the current slogan direction and preserve existing layout and CTA structure, while applying a three-part color treatment using the brand theme colors, and each color group MUST remain visually stable if the text wraps to multiple lines.
(Previously: exigía segmentación por color, pero no garantizaba estabilidad visual en line-wrap.)

#### Scenario: Hero slogan gains color segmentation
- GIVEN `src/components/ui/Hero.astro` is rendered
- WHEN the primary slogan is displayed
- THEN the slogan SHALL be visually segmented across the 3 theme colors
- AND CTA placement/order SHALL remain unchanged

#### Scenario: Color groups remain stable on wrap
- GIVEN un viewport angosto que fuerza salto de línea del slogan
- WHEN el texto se distribuye en más de una línea
- THEN cada grupo de color SHALL conservar su integridad visual

### Requirement: Distinct Motion Language Per Page

Motion behavior MUST differentiate pages so they do not feel cloned, while staying consistent with the existing brand motion character, and each página principal SHALL tener un perfil de entrada distinguible sin cambiar layout ni IA.
(Previously: pedía diferenciación general, sin exigir perfil distinguible por página.)

#### Scenario: Motion patterns are differentiated but coherent
- GIVEN transitions/animations are observed on in-scope pages
- WHEN page behavior is compared
- THEN each page SHALL exhibit a distinct motion emphasis
- AND shared timing/easing conventions SHALL preserve brand cohesion
