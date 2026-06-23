import type { ElementType } from "react";

export type NavItem = {
  label: string;
  href: string;
  id: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type StatusMetric = {
  label: string;
  value: string;
  progress: number;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: string[];
  summary: string;
  description: string;
  technologies: string[];
  features: string[];
  learnings: string[];
  image: string;
  imageAlt: string;
  githubUrl?: string;
  demoUrl?: string;
};

export type Technology = {
  name: string;
  area: string;
  level: "Base" | "Intermediário" | "Em evolução";
  signal: number;
  icon: ElementType;
};

export type TimelineItem = {
  title: string;
  period: string;
  description: string;
  tags: string[];
};

export type Certification = {
  name: string;
  institution: string;
  date: string;
  status: "Em estudo" | "Concluído" | "Planejado";
  link?: string;
  image: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  description: string;
};
