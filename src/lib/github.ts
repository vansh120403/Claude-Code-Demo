import type { Project } from './types';

/**
 * The ONLY module in the app that knows GitHub's JSON shape and performs the
 * network call. Everything downstream consumes the normalized `Project` type.
 * When Phase 2 swaps to a cached server-side proxy, only this file changes.
 */

export const GITHUB_USERNAME = 'vansh120403';

const REPOS_ENDPOINT =
  `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

/** Minimal subset of the GitHub repo object we actually read. */
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

export interface FetchResult {
  ok: boolean;
  /** Normalized projects (pre-override, pre-filter). Empty when ok is false. */
  projects: Project[];
  /** Human-readable failure reason, present only when ok is false. */
  reason?: string;
}

/**
 * Fetch the user's public repositories at build time and normalize them.
 * Never throws: a failure (rate limit, offline, non-200) resolves to
 * `{ ok: false, ... }` so the caller can fall back to a committed snapshot.
 */
export async function fetchProjects(): Promise<FetchResult> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${GITHUB_USERNAME}-portfolio`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Token is optional — only attached when present. It is read at BUILD time
  // and never shipped to the client (no client-side fetch in Phase 1).
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(REPOS_ENDPOINT, { headers });
    if (!res.ok) {
      return { ok: false, projects: [], reason: `GitHub API responded ${res.status}` };
    }
    const repos = (await res.json()) as GitHubRepo[];
    return { ok: true, projects: repos.map(toProject) };
  } catch (err) {
    return {
      ok: false,
      projects: [],
      reason: err instanceof Error ? err.message : String(err),
    };
  }
}

/** Map a raw GitHub repo to a normalized Project (overrides applied later). */
function toProject(repo: GitHubRepo): Project {
  return {
    id: String(repo.id),
    name: repo.name,
    title: prettifyRepoName(repo.name),
    description: repo.description ?? '',
    url: repo.html_url,
    demoUrl: repo.homepage ? repo.homepage : undefined,
    language: repo.language,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    featured: false,
    order: 999,
    updatedAt: repo.updated_at,
    isFork: repo.fork,
    archived: repo.archived,
  };
}

/** "customer_feedback-system" -> "Customer Feedback System" */
function prettifyRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}
