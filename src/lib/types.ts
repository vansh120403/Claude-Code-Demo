/**
 * The normalized project shape the UI consumes.
 *
 * IMPORTANT: components only ever see `Project` — never the raw GitHub JSON,
 * never a database row. That decoupling is what lets the data SOURCE change
 * across phases (build-time GitHub API -> cached server proxy -> database)
 * without touching a single component. Keep this type source-agnostic.
 */
export interface Project {
  /** Stable unique id (GitHub repo id, or repo name in the fallback snapshot). */
  id: string;
  /** Raw GitHub repository name — the key used to match curated overrides. */
  name: string;
  /** Human display title (curated override, else a prettified repo name). */
  title: string;
  /** Short description (curated override wins over GitHub's sparse text). */
  description: string;
  /** Canonical repository URL. */
  url: string;
  /** Optional live-demo / homepage URL. */
  demoUrl?: string;
  /** Primary language reported by GitHub (null if none). */
  language: string | null;
  /** Topic tags (curated or from GitHub). */
  topics: string[];
  /** Stargazer count. */
  stars: number;
  /** Fork count. */
  forks: number;
  /** Whether to surface this project prominently. */
  featured: boolean;
  /** Sort weight, ascending (lower = earlier). Default 999. */
  order: number;
  /** ISO timestamp of the last push/update. */
  updatedAt: string;
  /** True if this repo is a fork. */
  isFork: boolean;
  /** True if this repo is archived. */
  archived: boolean;
}
