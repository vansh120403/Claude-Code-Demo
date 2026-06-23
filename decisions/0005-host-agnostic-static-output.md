# 0005 — Keep Phase 1 output host-agnostic static

- **Status:** Accepted
- **Date:** 2026-06-23

## Context

A host has not been chosen yet. Phase 1 has no backend, so it can deploy anywhere
that serves static files. We want to avoid locking into a host prematurely.

## Decision

Keep `astro.config.mjs` at `output: 'static'` with **no adapter** in Phase 1. The
build emits a plain `dist/` of static assets deployable to GitHub Pages, Netlify,
Cloudflare Pages, Vercel, S3, etc.

- `site` (absolute URL) is left commented in `astro.config.mjs` and `site.ts`
  until a domain is chosen; the SEO component falls back to relative URLs.

## Consequences

- No host decision is needed to build or ship Phase 1.
- Phase 2 (backend) will require choosing a host that runs Node/serverless and
  adding the matching adapter. Note: GitHub Pages is static-only and cannot host
  the Phase 2 backend — if chosen now, expect a host migration at Phase 2.
