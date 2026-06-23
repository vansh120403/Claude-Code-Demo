# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

`vansh-portfolio` — a personal portfolio site built with **Astro 5** in static output
mode. **Phase 1 (static site, no backend) is built and verified.** Phases 2 (backend)
and 3 (database) are intentionally deferred; the code is structured so they slot in
without a rewrite. See `tasks.md` for the phase-wise tracker and `decisions/` for the
architecture decision records.

## Commands

- `npm run dev` — local dev server (`astro dev`)
- `npm run build` — production build to `dist/` (`astro build`)
- `npm run preview` — preview the built `dist/` locally
- `npm run check` — type/diagnostics check (`astro check`); should report 0 errors

There is no test suite or linter configured yet. Type safety comes from TypeScript
strict mode (`tsconfig.json`) plus `astro check`.

## Architecture

- **Static, host-agnostic output.** `astro.config.mjs` pins `output: 'static'` so the
  build produces a portable `dist/`. Do NOT change this to `'server'`; on-demand
  routes will opt in per-route with `export const prerender = false` once an adapter
  is added in Phase 2.
- **Data-access abstraction (the phase swap point).** `src/lib/` isolates how project
  data is sourced:
  - `types.ts` — normalized `Project` type
  - `github.ts` — build-time GitHub fetch (optional `GITHUB_TOKEN`, see `.env.example`)
  - `projects.ts` — `getProjects()/getFeaturedProjects()/getProject()`: filter → merge
    overrides → sort, with a committed fallback when offline/CI
  Swapping the data source (e.g. to a DB in Phase 3) means changing `lib/`, not the UI.
- **Content lives in `src/data/`** — edit these without touching components:
  `site.ts` (name/role/bio/contact/SEO), `skills.ts`, `experience.ts`,
  `projects.overrides.ts` (curated titles/descriptions/featured flags),
  `projects.fallback.json` (offline snapshot).
- **UI in `src/`** — `layouts/BaseLayout.astro` (SEO + no-FOUC inline theme script),
  `components/` (Hero, About, Skills, Experience, ProjectCard/Grid, Contact,
  SocialLinks, ThemeToggle, Nav, SEO), `pages/` (`index.astro`, `404.astro`),
  `styles/` (`tokens.css` dark-first + light, `global.css`).

## Conventions

- A permission rule in `.claude/settings.local.json` asks for confirmation before any
  folder creation. Prompt the user before creating new directories.
