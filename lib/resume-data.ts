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
  highlights: string[];
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
    highlights: [
      'Engineered a fault-tolerant Python runtime for multi-hour agent workflows that survives worker crashes and checkpoints state so interrupted runs pick up where they left off.',
      'Designed a concurrency-safe state engine using SHA-256 content-addressed records, sustaining 2,600 writes/sec across 20 parallel workers.',
    ],
  },
  {
    org: 'E. & J. Gallo',
    role: 'Software Engineering Intern',
    period: 'Jun 2025 - Aug 2025',
    logo: { type: 'image', src: '/logos/gallo.jpg', alt: 'E. & J. Gallo' },
    accent: 'wine',
    highlights: [
      'Architected an end-to-end license entity matching pipeline covering 2.56M+ accounts against 870K state licenses using TypeScript, SQL, and AWS Bedrock, increasing compliance accuracy by 40%.',
      'Built a fuzzy-matching engine with address normalization delivering 95% precision on noisy customer data, containerized and deployed to Kubernetes via scheduled jobs.',
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
    highlights: [
      "Launched SpayLA's nonprofit web platform with React, TypeScript, and Firebase, enabling 100+ Los Angeles pet owners to access affordable clinic listings.",
      'Increased site performance and engagement by 35% through frontend refactoring and optimized image delivery.',
    ],
  },
  {
    org: 'Algoverse',
    role: 'AI Researcher, Publication',
    period: 'Jun 2024 - Nov 2024',
    logo: { type: 'image', src: '/logos/algoverse.jpg', alt: 'Algoverse' },
    accent: 'emerald',
    highlights: [
      'Designed Pragmatic Metacognitive Prompting (PMP), a multi-stage prompting pipeline for sarcasm detection in LLMs, outperforming prior baselines by 10%.',
      'Published findings at COLING 2025, establishing PMP as a benchmark for sarcasm and sentiment analysis.',
    ],
  },
];

export const leadership: {
  org: string;
  role: string;
  period: string;
  logo: CompanyLogo;
  accent: CompanyAccent;
  highlight: string;
} = {
  org: 'Triton Software Engineering',
  role: 'Vice President of Operations',
  period: 'Jun 2025 - Present',
  logo: {
    type: 'image',
    src: '/logos/tse.svg',
    alt: 'Triton Software Engineering',
  },
  accent: 'brand',
  highlight:
    'Standardized onboarding for 100+ student developers, cutting ramp-up time by 50%, and reduced release issues through feature-branch workflows and CI/CD across 7 active projects.',
};
