// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Phase 1: plain static output -> host-agnostic `dist/` (GitHub Pages, Netlify, Cloudflare, etc.).
  // Astro 5 merged the old `hybrid` mode into `static`: pages prerender by default, and any single
  // route can opt into on-demand rendering with `export const prerender = false` once we add an
  // adapter in Phase 2 (`npx astro add node` / vercel / netlify). Do NOT change this to 'server'.
  output: 'static',

  // Set this once a host/domain is chosen. It enables absolute URLs for SEO canonical tags,
  // sitemaps, and OpenGraph images. Until then the SEO component falls back to relative URLs.
  // site: 'https://your-domain.example',
});
