export const education = {
  school: 'University of California, San Diego',
  degree: 'B.S. in Computer Science',
  location: 'La Jolla, CA',
  period: '2023-2027',
  gpa: '3.746',
  coursework: [
    'Software Engineering Principles',
    'Advanced Data Structures',
    'Analysis of Algorithms',
    'Deep & Reinforcement Learning',
    'Operating Systems',
    'Parallel Computing',
    'Databases',
  ],
};

export const skills = {
  Languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C', 'C++'],
  'Frameworks & Libraries': [
    'React',
    'React Native',
    'Node.js',
    'Express.js',
    'FastAPI',
    'PostgreSQL',
    'Firebase',
    'PyTorch',
  ],
  Tooling: ['Git', 'Docker', 'Kubernetes', 'GitLab CI/CD', 'Claude Code'],
};

export type CompanyLogo =
  | { type: 'image'; src: string; alt: string }
  | { type: 'mono'; initials: string };

export type CompanyAccent = 'brand' | 'violet' | 'wine' | 'emerald';

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  summary: string;
  skills: string[];
  logo: CompanyLogo;
  accent: CompanyAccent;
};

export const experience: ExperienceEntry[] = [
  {
    org: 'Attentive',
    role: 'AI Intern, Software Engineering',
    period: 'Jun 2026 - Aug 2026',
    logo: { type: 'image', src: '/logos/attentive.jpg', alt: 'Attentive' },
    accent: 'violet',
    summary:
      'Built infrastructure to make AI-powered marketing workflows more reliable and used AI agents to catch issues during code review.',
    skills: [
      'Python',
      'Docker',
      'Agent orchestration',
      'Fault tolerance',
      'Code review',
    ],
  },
  {
    org: 'E. & J. Gallo',
    role: 'Software Engineering Intern',
    period: 'Jun 2025 - Aug 2025',
    logo: { type: 'image', src: '/logos/gallo.jpg', alt: 'E. & J. Gallo' },
    accent: 'wine',
    summary:
      'Built a data pipeline that helps the compliance team match customer accounts to state licenses, even when records are inconsistent.',
    skills: [
      'TypeScript',
      'PostgreSQL',
      'AWS Bedrock',
      'Kubernetes',
      'Entity matching',
    ],
  },
  {
    org: 'Triton Software Engineering',
    role: 'Full Stack Developer',
    period: 'Nov 2024 - Jun 2025',
    logo: {
      type: 'image',
      src: '/logos/tse.svg',
      alt: 'Triton Software Engineering',
    },
    accent: 'brand',
    summary:
      'Helped launch SpayLA’s website so Los Angeles pet owners could find affordable clinics, and improved how quickly the site loads.',
    skills: ['React', 'TypeScript', 'Firebase', 'Web performance'],
  },
  {
    org: 'Algoverse',
    role: 'AI Researcher, Publication',
    period: 'Jun 2024 - Nov 2024',
    logo: { type: 'image', src: '/logos/algoverse.jpg', alt: 'Algoverse' },
    accent: 'emerald',
    summary:
      'Researched how language models detect sarcasm and co-authored a COLING 2025 paper on a prompting approach that improves detection.',
    skills: [
      'Prompt engineering',
      'LLM evaluation',
      'Natural language processing',
    ],
  },
];

export const leadership: ExperienceEntry = {
  org: 'Triton Software Engineering',
  role: 'Vice President of Operations',
  period: 'Jun 2025 - Present',
  logo: {
    type: 'image',
    src: '/logos/tse.svg',
    alt: 'Triton Software Engineering',
  },
  accent: 'brand',
  summary:
    'Helped student developers get started faster and made releases more consistent across project teams.',
  skills: ['Developer onboarding', 'Team operations', 'Git workflows', 'CI/CD'],
};
