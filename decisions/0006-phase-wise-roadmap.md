# 0006 — Phase-wise roadmap (static → backend → database)

- **Status:** Accepted
- **Date:** 2026-06-23

## Context

The owner asked for a portfolio with no backend now, but built so later phases
can add a backend and a database without a rewrite.

## Decision

Develop in three phases, each self-contained and additive:

- **Phase 1 — Static (now).** No backend. Build-time GitHub data + curated
  overrides, dark-first UI, contact via mailto progressive-enhancement.
- **Phase 2 — Backend.** Add an Astro adapter (Node/serverless), keep pages
  prerendered, add `src/pages/api/*` on-demand routes: a real contact handler
  (swap `Contact.astro` from mailto to `fetch('/api/contact')`) and optionally a
  cached GitHub proxy. No UI restructuring.
- **Phase 3 — Database.** `astro:db` (or Postgres via Drizzle) for contact
  submissions and project overrides; `getProjects()` reads overrides from the DB
  instead of the static file. Optional blog as a Content Collection.

The enabling design is the data-access abstraction in
[0003](./0003-data-access-abstraction.md): each phase changes the data source,
never the components.

## Consequences

- Each phase is shippable on its own; deferred work is genuinely deferred, not
  half-built. Progress and the concrete next steps are tracked in `tasks.md`.
- Phase 2 forces a host choice — see [0005](./0005-host-agnostic-static-output.md).
