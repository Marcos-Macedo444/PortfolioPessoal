import type { ContactLink, Stat, StatusMetric } from "@/types";

export const profile = {
  name: "Marcos Macêdo",
  monogram: "MM",
  title: "Tecnologia • Infraestrutura • Segurança Defensiva • Automação",
  headline:
    "Minha trajetória saiu do trabalho prático com clientes para infraestrutura, NOC, segurança defensiva e automação, sempre buscando resolver problemas reais com responsabilidade técnica.",
  about:
    "Comecei minha vida profissional como chaveiro residencial, uma experiência que fortaleceu atendimento, precisão, responsabilidade e solução de problemas sob demanda. Hoje atuo como estagiário NOC em uma empresa de segurança defensiva, evoluindo em monitoramento, redes, infraestrutura, análise e resposta a incidentes. Em paralelo, desenvolvo projetos em Python, backend, automação e sistemas acadêmicos para transformar aprendizado em entregas concretas.",
  philosophy:
    "Acredito que a tecnologia deve ser aplicada para resolver problemas reais. Meu objetivo é desenvolver soluções que combinem simplicidade, eficiência, segurança e impacto.",
  email: "marcosfilipe.macedo@gmail.com",
  githubUrl: "https://github.com/Marcos-Macedo444",
  linkedinUrl: "https://www.linkedin.com/in/marcos-mac%C3%AAdo",
  linkedinLabel: "linkedin.com/in/marcos-macêdo",
  githubLabel: "github.com/Marcos-Macedo444",
  typingRoles: [
    "NOC Intern",
    "Defensive Security Learner",
    "Infrastructure Builder",
    "Automation Developer",
    "Problem Solver",
    "Python Developer"
  ],
  introLines: [
    "Loading portfolio...",
    "Loading Marcos Macêdo profile...",
    "Loading project index...",
    "Profile ready."
  ],
  terminalLines: [
    "profile.summary",
    "loading skills...",
    "loading projects...",
    "checking infrastructure...",
    "defensive security focus",
    "automation layer active",
    "portfolio online"
  ]
};

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.githubUrl
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedinUrl
  },
  {
    label: "E-mail",
    value: profile.email,
    href: `mailto:${profile.email}`
  }
];

export const statusMetrics: StatusMetric[] = [
  { label: "Projects Loaded", value: "5/5", progress: 90 },
  { label: "Skills Indexed", value: "18+", progress: 92 },
  { label: "Defensive Security", value: "Enabled", progress: 96 },
  { label: "Automation Level", value: "Active", progress: 86 },
  { label: "Infrastructure Focus", value: "Online", progress: 90 }
];

export const systemStatuses = [
  "System Online",
  "Portfolio Runtime Active",
  "Defensive Security Mindset",
  "Automation Ready",
  "Learning Mode Continuous"
];

export const stats: Stat[] = [
  {
    label: "Projetos desenvolvidos",
    value: 5,
    suffix: "+",
    description: "Sistemas, automações, algoritmos e experiências web."
  },
  {
    label: "Experiência NOC",
    value: 1,
    description: "Atuação atual em ambiente de segurança defensiva e monitoramento."
  },
  {
    label: "Audiência em pitch técnico",
    value: 100,
    suffix: "+",
    description: "Apresentação de solução tecnológica para público amplo."
  },
  {
    label: "Tecnologias estudadas",
    value: 10,
    suffix: "+",
    description: "Stack em evolução contínua para soluções reais."
  }
];
