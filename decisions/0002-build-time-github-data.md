# 0002 — Fetch project data from GitHub at build time

- **Status:** Accepted
- **Date:** 2026-06-23

## Context

Projects should reflect the owner's GitHub (`vansh120403`). Options: hardcode a
curated list, fetch the GitHub REST API at build time, or fetch client-side at
runtime. GitHub's unauthenticated API allows 60 requests/hour per IP; descriptions
on the repos are sparse.

## Decision

Fetch repositories from the **GitHub REST API at build time** in `src/lib/github.ts`
(`/users/vansh120403/repos`), then bake the result into the static HTML.

- An **optional** `GITHUB_TOKEN` (read via `import.meta.env` at build) raises the
  rate limit to 5000/hour for CI. It is never sent to the client.
- A committed **fallback snapshot** (`src/data/projects.fallback.json`) is used if
  the fetch fails (offline, rate-limited, non-200) so the build never breaks.
- Sparse GitHub descriptions are polished via a curated overrides layer — see
  [0003](./0003-data-access-abstraction.md).

Rejected: runtime client-side fetch (rate limits hit real visitors, slower first
paint, no curation). Pure hardcoding (loses "live from GitHub").

## Consequences

- Project data refreshes on each build/deploy, not continuously. That's fine for
  a portfolio; Phase 2 can add a cached server proxy for fresher data if wanted.
- The token, if used, must be configured in the CI/host environment.
