# 0003 — Funnel all project data through `getProjects()`

- **Status:** Accepted
- **Date:** 2026-06-23

## Context

The data SOURCE will change across phases: build-time GitHub API (Phase 1) → a
cached server proxy (Phase 2) → a database for overrides/metadata (Phase 3). We
do not want UI components to change each time.

## Decision

All components consume **only** the normalized `Project` type (`src/lib/types.ts`)
via three functions in `src/lib/projects.ts`:

- `getProjects()`, `getFeaturedProjects()`, `getProject(name)`

Their signatures are fixed across all phases. Internally `projects.ts`:

1. sources base data (`github.ts` live fetch, else the fallback snapshot),
2. filters (exclude the profile repo, drop forks/archived),
3. merges curated `overrides` (`src/data/projects.overrides.ts`),
4. sorts (explicit order → stars → recency).

`src/lib/github.ts` is the ONLY module that knows GitHub's JSON shape.

## Consequences

- Phase 2 changes only `loadBaseProjects()` (swap to a cached proxy). Phase 3
  changes only where `overrides` come from (file → DB table). **UI untouched.**
- There is one normalized contract (`Project`) to keep stable; raw API/DB shapes
  are mapped to it at the boundary.
