import type { ContactLink, Stat, StatusMetric } from "@/types";

export const profile = {
  name: "Marcos Macêdo",
  monogram: "MM",
  title: "Tecnologia • Infraestrutura • Cybersecurity • Automação",
  headline:
    "Transformo problemas reais em soluções tecnológicas por meio de automação, segurança, infraestrutura e desenvolvimento de sistemas.",
  about:
    "Sou apaixonado por tecnologia, infraestrutura, cybersecurity, automação e desenvolvimento de soluções. Gosto de entender como sistemas funcionam, explorar novas tecnologias e criar projetos que resolvem problemas reais. Minha trajetória combina participação em hackathons, desenvolvimento de sistemas acadêmicos, projetos práticos em Python e interesse constante por segurança, redes e automação.",
  philosophy:
    "Acredito que a tecnologia deve ser aplicada para resolver problemas reais. Meu objetivo é desenvolver soluções que combinem simplicidade, eficiência, segurança e impacto.",
  email: "marcosfilipe.macedo@gmail.com",
  githubUrl: "https://github.com/Marcos-Macedo444",
  linkedinUrl: "https://www.linkedin.com/in/marcos-mac%C3%AAdo",
  linkedinLabel: "linkedin.com/in/marcos-macêdo",
  githubLabel: "github.com/Marcos-Macedo444",
  typingRoles: [
    "Cybersecurity Enthusiast",
    "Infrastructure Builder",
    "Automation Developer",
    "Problem Solver",
    "Python Developer",
    "Future Security Professional"
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
    label: "Hackathon vencido",
    value: 1,
    description: "Campeão do Hack27 com a equipe RED BOOST."
  },
  {
    label: "Pessoas na apresentação final",
    value: 100,
    suffix: "+",
    description: "Pitch técnico apresentado para audiência ampla."
  },
  {
    label: "Tecnologias estudadas",
    value: 10,
    suffix: "+",
    description: "Stack em evolução contínua para soluções reais."
  }
];
