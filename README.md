# vansh-portfolio

Personal portfolio site for **Vansh Mittal** — a software developer focused on backend development with Node.js. Built with [Astro 5](https://astro.build) in **static** output mode: fast, dependency-light, and host-agnostic.

> **Status:** Phase 1 (static site) is complete and verified. Phases 2 (backend) and 3 (database) are intentionally deferred — the code is structured so they slot in without a rewrite. See [`tasks.md`](tasks.md) and [`decisions/`](decisions/).

## Tech stack

- **[Astro 5](https://astro.build)** — static output (`output: 'static'`), HTML-first components
- **TypeScript** (strict mode) — type safety via `tsconfig.json` + `astro check`
- **Vanilla CSS** — custom properties, dark-first theme with a light toggle (no CSS framework)
- **No backend in Phase 1** — the contact form uses a `mailto:` progressive enhancement

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # preview the built dist/ locally
npm run check      # type/diagnostics check (astro check) — should report 0 errors
```

## Project structure

```
src/
  lib/          data-access layer (the phase swap point)
    types.ts        normalized Project type
    github.ts       build-time GitHub fetch (never throws; falls back)
    projects.ts     getProjects() / getFeaturedProjects() / getProject()
  data/         editable content (no component changes needed)
    site.ts         name, role, bio, contact, socials, SEO
    skills.ts, experience.ts
    projects.overrides.ts    curated titles/descriptions/featured flags
    projects.fallback.json   offline/CI snapshot
  components/   Hero, About, Skills, Experience, ProjectCard/Grid, Contact, SocialLinks, ThemeToggle, Nav, SEO
  layouts/      BaseLayout.astro (SEO + no-FOUC inline theme script)
  pages/        index.astro, 404.astro
  styles/       tokens.css (dark-first + light), global.css
decisions/      Architecture Decision Records (ADRs)
```

## How project data works

Projects are sourced **live from the GitHub REST API at build time**, then refined into the normalized `Project` type the UI consumes:

1. **Fetch** — `src/lib/github.ts` pulls public repos for `vansh120403` (build-time only; never shipped to the client).
2. **Refine** — `src/lib/projects.ts` filters out the profile repo, forks, and archived repos, merges curated overrides, and sorts.
3. **Curate** — `src/data/projects.overrides.ts` supplies portfolio-quality titles, descriptions, and featured flags.
4. **Fallback** — if the fetch fails (offline, rate-limited, CI), the committed `src/data/projects.fallback.json` snapshot is used so the build never breaks.

Because components only ever see `Project`, the data **source** can change across phases (GitHub API → cached proxy → database) without touching the UI.

### Optional `GITHUB_TOKEN`

The build works with **no token** (the unauthenticated GitHub API allows 60 requests/hour; it falls back to the snapshot if rate-limited). To raise the limit to 5000/hour in CI, copy `.env.example` to `.env` and set a token — a classic token with **no scopes** is sufficient (we only read public repos). `.env` is gitignored and never committed.

## Deployment

Phase 1 emits a plain static `dist/`, deployable to any static host — **GitHub Pages, Netlify, Cloudflare Pages, Vercel, S3**, and so on. No adapter is configured yet (see [ADR 0005](decisions/0005-host-agnostic-static-output.md)). Set `site` in `astro.config.mjs` once a domain is chosen to enable absolute SEO/OpenGraph URLs.

## Architecture decisions

The [`decisions/`](decisions/) directory holds the ADRs:

| # | Decision |
|---|----------|
| [0001](decisions/0001-framework-astro.md) | Use Astro as the framework |
| [0002](decisions/0002-build-time-github-data.md) | Fetch project data from GitHub at build time |
| [0003](decisions/0003-data-access-abstraction.md) | Funnel all project data through `getProjects()` |
| [0004](decisions/0004-styling-vanilla-css-dark-first.md) | Vanilla CSS variables, dark-first |
| [0005](decisions/0005-host-agnostic-static-output.md) | Keep Phase 1 output host-agnostic static |
| [0006](decisions/0006-phase-wise-roadmap.md) | Phase-wise roadmap (static → backend → database) |

See [`tasks.md`](tasks.md) for the phase-wise task tracker.

## License

[MIT](LICENSE) © 2026 Vansh Mittal
