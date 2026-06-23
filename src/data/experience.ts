/** Work experience timeline. Edit / add entries freely. */

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  /** e.g. "2024 — Present". Leave empty to hide the date until you confirm it. */
  period?: string;
  url?: string;
  summary: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Cognizant Technology Solutions',
    role: 'Programmer Analyst',
    location: 'India',
    period: '', // TODO: add your start date, e.g. "2024 — Present"
    url: 'https://www.cognizant.com',
    summary:
      'Working as a Programmer Analyst, contributing to the development and maintenance of enterprise software solutions.',
    highlights: [
      // TODO: replace these with specific, real accomplishments.
      'Develop and maintain software features as part of a delivery team.',
      'Collaborate across roles to ship and support client solutions.',
      'Strengthen backend skills (Node.js) alongside day-to-day delivery work.',
    ],
  },
];
