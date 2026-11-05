export type NavItem = { label: string; href: string; id: string };

export type Project = {
  id: string;
  title: string;
  category: string[];
  summary: string;
  description: string;
  technologies: string[];
  features: string[];
  learnings: string[];
  externalUrl: string;
  externalLabel: string;
  externalType: "github" | "linkedin";
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  imageAlt?: string;
};

export type TimelineItem = {
  title: string;
  period: string;
  description: string;
  tags: string[];
};
