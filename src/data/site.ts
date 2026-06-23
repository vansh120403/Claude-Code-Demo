/**
 * Central site configuration and personal copy. Editing text here never
 * requires touching components. Update freely.
 */

export interface SocialLink {
  /** Icon key resolved in SocialLinks.astro. */
  platform: 'github' | 'linkedin' | 'email' | 'hackerrank' | 'instagram' | 'codechef';
  label: string;
  url: string;
}

export const site = {
  name: 'Vansh Mittal',
  handle: 'vansh120403',
  role: 'Programmer Analyst @ Cognizant',
  /** One-line hero tagline. */
  tagline:
    'Software developer from India, building toward full-stack — currently focused on backend development with Node.js.',
  /** Longer About paragraph. */
  bio:
    "I'm a software developer from Meerut, India, working as a Programmer Analyst at " +
    'Cognizant. I started with front-end fundamentals — HTML, CSS, and Bootstrap — along ' +
    'with core Java, and I’m now focused on backend development with Node.js. I enjoy ' +
    'turning ideas into clean, working software and continually leveling up my engineering craft.',
  location: 'Meerut, Uttar Pradesh, India',
  email: 'vansh2003mrt@gmail.com',
  /**
   * Resume link. Either paste your Google Drive share URL here, or drop a
   * `resume.pdf` into `public/` and set this to "/resume.pdf".
   */
  resumeUrl: '',
  /** Absolute site URL — set once a host is chosen (mirrors astro.config `site`). */
  url: '',

  /** Default SEO/meta. */
  seo: {
    title: 'Vansh Mittal — Software Developer',
    description:
      'Portfolio of Vansh Mittal, a software developer from India focused on backend ' +
      'development with Node.js. Projects, skills, and experience.',
  },

  socials: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/vansh120403' },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vansh-mittal-7b4837235',
    },
    { platform: 'email', label: 'Email', url: 'mailto:vansh2003mrt@gmail.com' },
    {
      platform: 'hackerrank',
      label: 'HackerRank',
      url: 'https://www.hackerrank.com/profile/vansh2003mrt',
    },
    // Add more (Instagram, CodeChef, etc.) by appending here.
  ] satisfies SocialLink[],
} as const;
