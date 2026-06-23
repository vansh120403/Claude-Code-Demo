# 0001 — Use Astro as the framework

- **Status:** Accepted
- **Date:** 2026-06-23

## Context

We need a personal portfolio that ships fully static now but can grow a backend
and a database later without a rewrite. Candidates considered: Next.js, Astro,
plain HTML/CSS/JS, and Vite + React (SPA). The owner knows HTML/CSS/Bootstrap
and core Java, and is learning Node.js.

## Decision

Use **Astro 5.x**.

- Astro renders to static HTML by default (ideal for a content-style portfolio,
  great performance, near-zero client JS).
- It has a first-class upgrade path: add an adapter and opt individual routes
  into on-demand rendering (`prerender = false`) for Phase 2 API endpoints, and
  Astro DB / any Drizzle-backed DB for Phase 3 — all in the same project.
- Component model (`.astro`) is HTML-first, close to what the owner already knows.

Rejected: plain HTML/JS (backend later ≈ rewrite); Vite+React SPA (backend would
be a separate service); Next.js (fine, but Astro is lighter for a content site
and the static-first story is cleaner here).

## Consequences

- The whole site lives in one Astro project across all three phases.
- We follow current Astro 5 conventions (e.g. `src/content.config.ts`, the merged
  `static` output mode). See [0005](./0005-host-agnostic-static-output.md).
