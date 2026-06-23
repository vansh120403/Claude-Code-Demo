import type { Project } from '../lib/types';

/**
 * Curated polish layered on top of live GitHub data. GitHub descriptions are
 * sparse, so we override them here with portfolio-quality copy, mark featured
 * projects, set display order, and add demo links / topics. Keys are raw repo
 * names. Anything not listed still appears, using its GitHub-derived values.
 *
 * In Phase 3 this static map is replaced by a `ProjectOverride` database table
 * read inside getProjects() — the merge logic and the UI stay identical.
 */
type Override = Partial<
  Pick<Project, 'title' | 'description' | 'demoUrl' | 'featured' | 'order' | 'url' | 'topics'>
>;

export const overrides: Record<string, Override> = {
  customer_feedback_management_system: {
    title: 'Customer Feedback Management System',
    description:
      'A Java application for collecting, storing, and managing customer feedback — built around clean CRUD operations and a structured, object-oriented data model.',
    featured: true,
    order: 0,
    topics: ['Java', 'OOP', 'CRUD'],
  },
  iCoderBootstrap: {
    title: 'iCoder — Bootstrap Site',
    description:
      'A responsive, multi-section website built with Bootstrap, focused on grid layout, reusable components, and a mobile-first approach.',
    featured: true,
    order: 1,
    topics: ['Bootstrap', 'HTML', 'CSS', 'Responsive'],
  },
  'Spotify-frontend-clone': {
    title: 'Spotify Frontend Clone',
    description:
      'A pixel-focused recreation of the Spotify web player UI with HTML and CSS — practice in faithfully reproducing a complex real-world layout.',
    order: 2,
    topics: ['HTML', 'CSS', 'UI'],
  },
};

/** Repos hidden entirely (e.g. the GitHub profile README repo). */
export const excludeRepos = new Set<string>(['vansh120403']);

/** Whether forked repositories appear in the portfolio. */
export const includeForks = false;

/** Whether archived repositories appear in the portfolio. */
export const includeArchived = false;
