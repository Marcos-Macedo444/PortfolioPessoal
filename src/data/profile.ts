import type { ContactLink, Stat, StatusMetric } from "@/types";

export const profile = {
  name: "Marcos Macêdo",
  monogram: "MM",
  title: "Tecnologia • Infraestrutura • Cybersecurity • Automação",
  headline:
    "Minha trajetória saiu do trabalho prático com clientes para infraestrutura, NOC, cybersecurity e automação, sempre buscando resolver problemas reais com responsabilidade técnica.",
  about:
    "Comecei minha vida profissional como chaveiro residencial, uma experiência que fortaleceu atendimento, precisão, responsabilidade e solução de problemas sob demanda. Hoje atuo como estagiário NOC em uma empresa de cybersecurity, evoluindo em monitoramento, redes, infraestrutura, análise e resposta a incidentes. Em paralelo, desenvolvo projetos em Python, backend, automação e sistemas acadêmicos para transformar aprendizado em entregas concretas.",
  philosophy:
    "Acredito que a tecnologia deve ser aplicada para resolver problemas reais. Meu objetivo é desenvolver soluções que combinem simplicidade, eficiência, segurança e impacto.",
  email: "marcosfilipe.macedo@gmail.com",
  githubUrl: "https://github.com/Marcos-Macedo444",
  linkedinUrl: "https://www.linkedin.com/in/marcos-mac%C3%AAdo",
  linkedinLabel: "linkedin.com/in/marcos-macêdo",
  githubLabel: "github.com/Marcos-Macedo444",
  typingRoles: [
    "NOC Intern",
    "Cybersecurity Learner",
    "Infrastructure Builder",
    "Automation Developer",
    "Problem Solver",
    "Python Developer"
  ],
  introLines: [
    "Initializing portfolio...",
    "Loading Marcos Macêdo profile...",
    "Scanning projects...",
    "Access granted."
  ],
  terminalLines: [
    "whoami",
    "loading skills...",
    "scanning projects...",
    "checking infrastructure...",
    "cybersecurity mode enabled",
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
  { label: "Projects Loaded", value: "4/4", progress: 88 },
  { label: "Skills Indexed", value: "18+", progress: 92 },
  { label: "Security Mindset", value: "Enabled", progress: 96 },
  { label: "Automation Level", value: "Active", progress: 86 },
  { label: "Infrastructure Focus", value: "Online", progress: 90 }
];

export const systemStatuses = [
  "System Online",
  "Portfolio Runtime Active",
  "Security Mindset Enabled",
  "Automation Ready",
  "Learning Mode Continuous"
];

export const stats: Stat[] = [
  {
    label: "Projetos desenvolvidos",
    value: 4,
    suffix: "+",
    description: "Sistemas, automações, algoritmos e experiências web."
  },
  {
    label: "Experiência NOC",
    value: 1,
    description: "Atuação atual em ambiente de cybersecurity e monitoramento."
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
