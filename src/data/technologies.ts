import { Network, ShieldCheck, Code2, Workflow } from "lucide-react";

export const skillGroups = [
  {
    icon: Network,
    title: "Redes & infraestrutura",
    description: "Conectividade, diagnóstico e continuidade dos serviços.",
    skills: [
      "Redes",
      "Linux",
      "Terminal",
      "Troubleshooting",
      "Monitoramento",
      "NOC",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Segurança defensiva",
    description: "Procedimentos claros e atenção aos sinais da operação.",
    skills: [
      "Análise de eventos",
      "Incidentes",
      "Escalonamento",
      "Documentação técnica",
      "Boas práticas",
      "Segurança de aplicações",
    ],
  },
  {
    icon: Workflow,
    title: "Automação & dados",
    description: "Rotinas e integrações que reduzem trabalho manual.",
    skills: ["Python", "APIs", "FastAPI", "PostgreSQL", "Git", "GitHub"],
  },
  {
    icon: Code2,
    title: "Desenvolvimento",
    description: "Software para transformar necessidades em ferramentas.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Flask",
      "React Native",
    ],
  },
];
