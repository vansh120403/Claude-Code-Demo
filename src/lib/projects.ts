import type { Project } from './types';
import { fetchProjects } from './github';
import {
  overrides,
  excludeRepos,
  includeForks,
  includeArchived,
} from '../data/projects.overrides';
import fallbackData from '../data/projects.fallback.json';

/**
 * The phase swap point. The rest of the app depends ONLY on these three
 * functions — never on GitHub, never on a database. Their signatures are fixed
 * across all phases:
 *
 *   Phase 1 (now): live build-time GitHub fetch, with a committed fallback.
 *   Phase 2:       a cached server-side proxy can back `loadBaseProjects()`.
 *   Phase 3:       `overrides` can be read from a DB table instead of a file.
 *
 * In every case the filter -> merge -> sort pipeline and the `Project[]` output
 * are unchanged, so components never need to be touched.
 */

const fallbackProjects = fallbackData as Project[];

// Memoize within a single build/run so repeated calls don't re-fetch.
let cache: Project[] | null = null;

/** Source the raw (pre-override) projects: live GitHub, else the snapshot. */
async function loadBaseProjects(): Promise<Project[]> {
  const result = await fetchProjects();
  if (result.ok && result.projects.length > 0) {
    return result.projects;
  }
  // The build must never fail because GitHub is unreachable or rate-limited.
  console.warn(
    `[projects] Using committed fallback snapshot${result.reason ? `: ${result.reason}` : ''}.`,
  );
  return fallbackProjects;
}

/** Filter out hidden/forked/archived repos, merge overrides, then sort. */
function refine(base: Project[]): Project[] {
  return base
    .filter((p) => !excludeRepos.has(p.name))
    .filter((p) => includeForks || !p.isFork)
    .filter((p) => includeArchived || !p.archived)
    .map((p) => {
      const override = overrides[p.name];
      return override ? { ...p, ...override } : p;
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order; // explicit order first
      if (a.stars !== b.stars) return b.stars - a.stars; // then most-starred
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt); // then most-recent
    });
}

/** All portfolio projects, refined and sorted. */
export async function getProjects(): Promise<Project[]> {
  if (cache) return cache;
  cache = refine(await loadBaseProjects());
  return cache;
}

/** Only the projects flagged as featured. */
export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

/** A single project by its raw repo name, if present. */
export async function getProject(name: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.name === name);
}
