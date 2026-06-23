# Tasks

Phase-wise task tracker for the portfolio site. Phase 1 (static, no backend) is
complete. Phases 2 and 3 are planned and intentionally deferred — the
code is structured so they slot in without a rewrite (see `decisions/`).

Legend: `[x]` done · `[ ]` todo · `[~]` partial / needs your input · `[-]` decided against / dropped

---

## Phase 1 — Static site (complete ✅)

### Scaffold & tooling
- [x] Astro 5 project (`package.json`, `astro.config.mjs` → `output: 'static'`)
- [x] TypeScript strict (`tsconfig.json`)
- [x] `.gitignore`, `.env.example` (optional `GITHUB_TOKEN`)
- [x] `npm install`

### Data layer (the phase swap point)
- [x] `src/lib/types.ts` — normalized `Project` type
- [x] `src/lib/github.ts` — isolated build-time GitHub fetch (token optional)
- [x] `src/lib/projects.ts` — `getProjects()/getFeaturedProjects()/getProject()`
      with filter → merge overrides → sort, and committed fallback
- [x] `src/data/projects.overrides.ts` — curated titles/descriptions/featured
- [x] `src/data/projects.fallback.json` — offline/CI snapshot

### Content (edit these freely — no component changes needed)
- [x] `src/data/site.ts` — name, role, bio, contact, socials, SEO
- [x] `src/data/skills.ts`
- [x] `src/data/experience.ts`
- [-] Cognizant **start date** / placeholder highlights — keeping `experience.ts` as-is (no change)
- [-] **Résumé** link — decided against; no `site.resumeUrl` and no `public/resume.pdf`
- [-] Curate descriptions for featured repos — none for now; existing `projects.overrides.ts` stands

### Layout, theming, UI
- [x] `tokens.css` (dark-first + light), `global.css` (reset, buttons, reveal)
- [x] `BaseLayout.astro` — SEO + no-FOUC inline theme script + `html.js` flag
- [x] `ThemeToggle.astro` (accessible, persists to localStorage)
- [x] `Nav.astro` (sticky, responsive hamburger)
- [x] `Hero`, `About`, `Skills`, `Experience`, `ProjectCard`, `ProjectsGrid`,
      `Contact` (mailto progressive-enhancement), `SocialLinks`, `SEO`
- [x] `index.astro` (composition + reveal observer), `404.astro`
- [x] `public/favicon.svg`, `public/og-image.svg`

### Verification
- [x] `npx astro check` — 0 errors
- [x] `npm run build` — succeeds (fell back to snapshot offline, by design)
- [x] Built HTML contains curated titles + repo links; fork & profile repo excluded
- [x] `npm run dev` visual pass — theme toggle persists w/ no flash, nav anchors
      scroll, responsive at mobile widths
- [-] Replace SVG OG image with a rasterized PNG — skipped (optional); SVG OG image stands

---

## Phase 2 — Backend (deferred)
- [ ] Add an adapter (`npx astro add node` / vercel / netlify); keep `output: 'static'`
- [ ] `src/pages/api/contact.ts` (`prerender = false`) — real contact handler;
      swap `Contact.astro`'s submit from mailto to `fetch('/api/contact')`
- [ ] Optional `src/pages/api/projects.ts` — server-side GitHub proxy + TTL cache
- [ ] Choose & wire a host

## Phase 3 — Database (deferred)
- [ ] `npx astro add db`; `db/config.ts` with `ContactSubmission` + `ProjectOverride`
- [ ] Point `getProjects()` overrides at the DB (UI unchanged); persist submissions
- [ ] Production libSQL (Turso) or Postgres (Neon/Supabase) via Drizzle
- [ ] Optional blog as a Content Collection (`src/content.config.ts`, `glob()` loader)
