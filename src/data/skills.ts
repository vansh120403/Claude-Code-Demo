/** Skill groups rendered as labelled chip clusters. Edit freely. */

export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Java', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['Bootstrap', 'Node.js'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'VS Code'],
  },
  {
    category: 'Currently Learning',
    items: ['Backend Development', 'Express.js', 'REST APIs', 'Databases'],
  },
];
