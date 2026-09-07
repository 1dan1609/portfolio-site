# Design

<!-- impeccable:design-schema 1 -->

## World

**The Forge, reforged as a build/deploy dashboard.** Replaces "The Shadow
Board" (locksmith/tool-tray) entirely after explicit user rejection of both
its color grading and its concept ("not remarkable," "forgettable"). Resolved
via a bolder-register re-roll (seed key `97a554ae`) against the catalog's
blacksmith power-hammer-forging direction, which the user picked over the
assigned "Hatch Show Print" gig-poster leader. The user then steered
mid-build: keep the orientation and heat-gradient color language, but make it
read unmistakably as an AI-engineer/SWE dashboard — not literal
blacksmithing. The site now reads as a live build/deploy monitor for a
career: real numbers (users scaled, model accuracy, concurrent sessions)
rendered in true-black-and-heat-orange instrument language.

## Palette — Committed strategy (one accent, ~55-60% via mass + numerals + fills)

- `board.black` `#0B0B0D` (page ground) / `board.panel` `#1A1917` (card
  surfaces, barely lifted off black) / `board.line` `#2A2D31` (borders).
- `accent.orange` `#FF5A11` — the single committed accent: CTAs, active nav
  state, numerals, icons, checkmarks.
- `accent.heat` `#FFF3C4` and `accent.cherry` `#C21E0E` — reserved for the
  heat-gradient fill only (real before/after deltas); cherry is never used as
  foreground text (3.26:1 on black, fails contrast) — swatch/fill only.
- `ink.display` `#FFFDF7` / `ink.body` `#EDE9E2` / `ink.muted` `#b2a99f` /
  `ink.subtle` `#9f988f` (tuned so even the tertiary tone clears 4.5:1 against
  both `board.black` and `board.panel` — learned from the prior world's
  near-miss).

Single dark ground throughout (no light-card sections this time) — the
prior world's contrast bugs came from mixing light cream cards into a dark
system; this world stays one ground, avoiding that failure class entirely.

## Type

- **Display** (headline, section-scale statements): Big Shoulders Stencil
  Display — genuine stencil cut character, not a training-data reflex face.
- **Body/labels/nav**: Archivo — technical grotesque.
- **Mono** (real metrics only, never decorative): JetBrains Mono,
  `font-variant-numeric: tabular-nums`.

Self-hosted via `next/font/google` (`app/layout.tsx`).

## Composition

- **Navbar** (`Navbar.tsx`): a persistent icon rail — fixed left sidebar on
  desktop (Profile/Stack/Build Log/Releases/Deploy, active item tracked via
  `IntersectionObserver`), fixed bottom tab bar on mobile. Replaces the old
  top navbar entirely; every section carries `md:pl-28` to clear the rail.
- **Hero** (`Hero.tsx`): two-column dashboard — oversized stencil headline +
  CTAs + build-status line on the left two-thirds; a "Live Build Feed" panel
  on the right third (`HeatDelta` for the AI-defenses accuracy delta, two
  `HeatBar`s for real scale metrics, a footer stat). Below: three pillar
  tiles (RAG/LLM, Full-Stack & Mobile, Security Research) and a "Stack
  Certified" strip.
- **About → Profile**, **Skills → Stack**, **Education → Training Record**:
  same content, reskinned into forge panels; Stack drops the pegboard-peg
  sizing in favor of a flat certified-checkmark list (no fabricated
  proficiency levels).
- **Experience → Build Log**: each job is a numbered build
  (`BUILD #NNN`, DEPLOYED/ARCHIVED), real metrics rendered via `HeatBar`
  (ruled scale + heat-gradient fill), replacing the prior circular gauges.
- **Projects → Releases**: each project is a version-tagged row
  (`v1.0`…`v8.0`); the AI-defenses project carries `HeatDelta` inline,
  always visible (no tap-to-reveal gimmick this time — a dashboard shows its
  state, it doesn't hide it).
- **Footer → Deploy**: "READY TO SHIP." + contact CTAs + a "Query Assistant"
  trigger.
- **Chat** (`Chat.tsx`): reskinned to "System Query — Ask Vandan"; opened by
  any trigger via a shared `open-assistant` window event.

## New shared components

- `HeatBar.tsx` — ruled scale, tick labels, heat-gradient fill to a real
  value. Replaces `InstrumentGauge.tsx` (deleted).
- `HeatDelta.tsx` — before/after readout; numerals sit beside the gradient
  swatch, never on top of it (no flat text color survives a gradient
  spanning cherry-red to near-white — caught before shipping, not after).
  Replaces `CorrectionSheet.tsx` (deleted).

## Verified

- TypeScript strict mode: clean.
- Mechanical anti-pattern detector (`detect.mjs`): zero findings.
- Font imports (`Big_Shoulders_Stencil_Display`, `Archivo`) confirmed valid
  against Next's font-loader type declarations before writing any component.
- Full contrast audit performed *before* building this time (not after):
  computed every foreground/background pairing up front, caught that cherry
  fails as foreground text and that a naive `ink.subtle` guess would repeat
  the prior world's near-miss, and tuned both before writing components.
- Full desktop interactive pass (1568-1920px) via Chrome automation: rail
  navigation + active-state tracking, all six sections, Build Log
  expand/collapse with real `HeatBar` fills, Releases expand with the
  `HeatDelta` accuracy strip, Footer CTAs, and the chat open/query flow —
  all confirmed rendering and functioning correctly.

## Not verified

- Mobile/narrow-viewport rendering could not be visually confirmed in this
  session — `resize_window` does not change the actual browser viewport in
  this environment (`window.innerWidth` stays 1920 regardless of the
  requested size). The bottom tab bar and responsive classes are reasoned
  from the same breakpoint conventions as the rest of the site, not
  screenshotted. Check on a real device or a working resize path before
  calling this shipped.
