# Decisions

Architecture Decision Records (ADRs) for this project. Each file captures one
decision: the **context** that forced a choice, the **decision** itself, and the
**consequences**. They exist so anyone (including a future AI session) can pick
up the project with full context without re-deriving the reasoning.

One decision per file. Keep them short. When a decision is reversed, add a new
ADR that supersedes the old one (don't delete history) and note it at the top.

## Index

| # | Decision | Status |
|---|----------|--------|
| [0001](./0001-framework-astro.md) | Use Astro as the framework | Accepted |
| [0002](./0002-build-time-github-data.md) | Fetch project data from GitHub at build time | Accepted |
| [0003](./0003-data-access-abstraction.md) | Funnel all project data through `getProjects()` | Accepted |
| [0004](./0004-styling-vanilla-css-dark-first.md) | Vanilla CSS variables, dark-first (no Tailwind in P1) | Accepted |
| [0005](./0005-host-agnostic-static-output.md) | Keep Phase 1 output host-agnostic static | Accepted |
| [0006](./0006-phase-wise-roadmap.md) | Phase-wise roadmap (static → backend → DB) | Accepted |

_Created 2026-06-23._
