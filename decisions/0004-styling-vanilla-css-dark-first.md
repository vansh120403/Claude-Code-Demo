# 0004 — Vanilla CSS variables, dark-first (no Tailwind in Phase 1)

- **Status:** Accepted
- **Date:** 2026-06-23

## Context

The chosen look is modern, minimal, and dark-mode-first with a light toggle. We
needed to pick a styling approach. The owner knows CSS/Bootstrap, not Tailwind.

## Decision

Use **vanilla CSS custom properties + Astro scoped `<style>`**, no Tailwind.

- Theme tokens live in `src/styles/tokens.css`: dark is the `:root` default;
  `:root[data-theme="light"]` overrides it.
- A **no-FOUC inline script** in `BaseLayout.astro` (marked `is:inline` so it runs
  before paint) sets `data-theme` from `localStorage` or `prefers-color-scheme`,
  and adds an `html.js` flag. `ThemeToggle.astro` flips and persists the theme.
- Entrance animations are CSS-only, gated behind `prefers-reduced-motion`, and
  their hidden initial state is gated on `html.js` so no-JS users never get
  stuck-invisible content.

Rejected (for Phase 1): Tailwind — a config/learning tax here, and CSS variables
are the cleaner way to do dark-first theming. It remains an easy later add.

## Consequences

- Styling is approachable for the owner and dependency-free.
- Token-based theming keeps both themes consistent and AA-contrast compliant.
