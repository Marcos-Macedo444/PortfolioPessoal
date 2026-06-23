import type { Project } from "@/types";

export const projectFilters = [
  "Todos",
  "Automação",
  "Cybersecurity",
  "Backend",
  "Web",
  "Educação",
  "Python",
  "Mobile",
  "Estudos"
];

export const projects: Project[] = [
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
    image: "/images/projects/finance-system-thumbnail.png",
    imageAlt: "Imagem ilustrativa do sistema de gestão financeira empresarial"
  },
  {
    id: "image-processing",
    title: "Processamento Digital de Imagens",
    category: ["Algoritmos", "Imagem", "Computação", "Python", "Estudos"],
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
    image: "/images/projects/image-processing-thumbnail.png",
    imageAlt: "Imagem ilustrativa do projeto de processamento digital de imagens"
  },
  {
    id: "horas-academy",
    title: "Horas Academy",
    category: ["Educação", "Gestão acadêmica", "Mobile"],
    summary:
      "Sistema acadêmico para gerenciamento de eventos, certificados e horas complementares.",
    description:
      "Sistema acadêmico para gerenciamento de eventos, certificados e horas complementares, criado para facilitar a organização de atividades acadêmicas.",
    technologies: ["JavaScript", "React Native"],
    features: [
      "Cadastro de eventos",
      "Controle de inscrições",
      "Emissão de certificados",
      "Gestão de horas complementares",
      "Organização acadêmica"
    ],
    learnings: [
      "Fluxos de produto acadêmico",
      "Organização de dados de eventos",
      "Experiência mobile",
      "Controle de informações para certificados"
    ],
    image: "/images/projects/horas-academy-thumbnail.png",
    imageAlt: "Imagem ilustrativa do projeto Horas Academy"
  },
  {
    id: "crazy-cine",
    title: "Crazy Cine",
    category: ["Web", "Backend", "Estudos"],
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
    image: "/images/projects/crazy-cine-thumbnail.png",
    imageAlt: "Imagem ilustrativa do projeto Crazy Cine"
  }
];
