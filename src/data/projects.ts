import type { Project } from "@/types";

export const projectFilters = [
  "Todos",
  "Automação",
  "Segurança defensiva",
  "Backend",
  "Web",
  "React",
  "Educação",
  "Python",
  "Mobile"
];

export const projects: Project[] = [
  {
    id: "football-team-draw",
    title: "Sorteio de Times Futebol",
    category: ["Web", "React", "Produto real"],
    summary:
      "Sistema web para sortear times equilibrados de futebol/pelada a partir da lista completa do grupo.",
    description:
      "Sistema web criado para resolver um problema real de organização entre amigos: extrair automaticamente os nomes da mensagem completa da pelada, ignorar Pix, horário, local e regras, classificar jogadores por habilidade e sortear times equilibrados.",
    technologies: ["React", "Vite", "TypeScript", "LocalStorage", "Vercel"],
    features: [
      "Extração automática de nomes a partir da mensagem completa da pelada",
      "Separação por habilidade de 1 a 5 estrelas",
      "Sorteio equilibrado com base nas habilidades",
      "Opção Não conheço tratada como média de 3 estrelas",
      "Geração de mensagem pronta para WhatsApp",
      "Exportação em PDF",
      "Modelo de lista para copiar",
      "Interface responsiva para celular e computador"
    ],
    learnings: [
      "Parsing de mensagens reais com dados misturados",
      "Modelagem de equilíbrio por habilidade",
      "Persistência local com LocalStorage",
      "Experiência responsiva para uso durante a pelada"
    ],
    externalUrl: "https://github.com/Marcos-Macedo444/SorteioTimesFutebol",
    externalLabel: "Ver no GitHub",
    externalType: "github",
    githubUrl: "https://github.com/Marcos-Macedo444/SorteioTimesFutebol",
    demoUrl: "https://sorteio-times-futebol-blond.vercel.app"
  },
  {
    id: "finance-system",
    title: "Sistema de Gestão Financeira Empresarial",
    category: ["Automação", "Finanças", "Sistema empresarial"],
    summary:
      "Aplicação em Python para automatizar o fechamento financeiro semanal de uma empresa.",
    description:
      "Aplicação desenvolvida em Python para automatizar o fechamento financeiro semanal de uma empresa, reduzindo tarefas manuais e organizando receitas, despesas e apuração de resultados.",
    technologies: ["Python"],
    features: [
      "Controle de receitas",
      "Controle de despesas",
      "Apuração automática de resultados",
      "Divisão financeira automatizada",
      "Geração de executável",
      "Organização de dados financeiros"
    ],
    learnings: [
      "Modelagem de fluxos financeiros",
      "Automação de rotinas manuais",
      "Organização de dados e regras de negócio",
      "Empacotamento de aplicação para uso local"
    ],
    externalUrl:
      "https://www.linkedin.com/posts/marcos-mac%C3%AAdo_python-finanaexas-automatizaaexaeto-activity-7123007392362995712-iayb",
    externalLabel: "Ver publicação",
    externalType: "linkedin"
  },
  {
    id: "image-processing",
    title: "Processamento Digital de Imagens",
    category: ["Algoritmos", "Imagem", "Computação", "Python"],
    summary:
      "Implementação manual de algoritmos de processamento de imagens inspirada no MIT 6.009.",
    description:
      "Projeto desenvolvido em Python, inspirado no MIT 6.009, com implementação manual de algoritmos de processamento de imagens sem bibliotecas externas para os cálculos principais.",
    technologies: ["Python", "Pillow"],
    features: [
      "Filtros de imagem",
      "Detecção de bordas",
      "Efeito vinheta",
      "Nitidez",
      "Desfoque",
      "Seam Carving",
      "Redimensionamento inteligente"
    ],
    learnings: [
      "Operações pixel a pixel",
      "Estruturas de dados para imagens",
      "Convolução e filtros",
      "Raciocínio algorítmico aplicado"
    ],
    externalUrl: "https://github.com/Marcos-Macedo444/ProcessamentoDeImagens",
    externalLabel: "Ver no GitHub",
    externalType: "github"
  },
  {
    id: "horas-academy",
    title: "Horas Academy",
    category: ["Educação", "Gestão acadêmica", "Mobile"],
    summary:
      "Sistema acadêmico para gerenciamento de eventos, inscrições e horas complementares.",
    description:
      "Sistema acadêmico para gerenciamento de eventos, inscrições e horas complementares, criado para facilitar a organização de atividades acadêmicas.",
    technologies: ["JavaScript", "React Native"],
    features: [
      "Cadastro de eventos",
      "Controle de inscrições",
      "Organização de comprovantes",
      "Gestão de horas complementares",
      "Organização acadêmica"
    ],
    learnings: [
      "Fluxos de produto acadêmico",
      "Organização de dados de eventos",
      "Experiência mobile",
      "Controle de informações acadêmicas"
    ],
    externalUrl: "https://github.com/Marcos-Macedo444/HorasAcademyFront",
    externalLabel: "Ver no GitHub",
    externalType: "github"
  },
  {
    id: "crazy-cine",
    title: "Crazy Cine",
    category: ["Web", "Backend"],
    summary:
      "Aplicação web criada para estudar rotas, templates e arquitetura com Flask.",
    description:
      "Aplicação web desenvolvida para estudo de conceitos de backend, rotas, templates, arquitetura web e estruturação de aplicações com Flask.",
    technologies: ["Python", "Flask", "HTML", "CSS"],
    features: [
      "Rotas web",
      "Templates HTML",
      "Estilização com CSS",
      "Backend com Flask",
      "Organização de aplicação web"
    ],
    learnings: [
      "Arquitetura básica de aplicações web",
      "Renderização de templates",
      "Rotas e controllers",
      "Integração entre backend e interface"
    ],
    externalUrl: "https://github.com/Marcos-Macedo444/CrazyCine-Flask",
    externalLabel: "Ver no GitHub",
    externalType: "github"
  }
];
