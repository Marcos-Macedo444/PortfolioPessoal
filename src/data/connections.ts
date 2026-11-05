export const connections = [
  {
    id: "redes",
    label: "Redes",
    subtitle: "O caminho entre os pontos.",
    description:
      "Troubleshooting de redes e telecomunicações, diagnóstico de falhas e acompanhamento de disponibilidade e desempenho.",
    tags: ["Conectividade", "Troubleshooting", "Infraestrutura"],
    projects: [] as string[],
  },
  {
    id: "noc",
    label: "NOC",
    subtitle: "Atenção que mantém a operação.",
    description:
      "Monitoramento contínuo, análise de eventos e alarmes, classificação de chamados e atuação em incidentes de primeiro e segundo nível.",
    tags: ["Monitoramento", "Incidentes", "SLAs"],
    projects: [] as string[],
  },
  {
    id: "seguranca",
    label: "Segurança",
    subtitle: "Cuidado em cada conexão.",
    description:
      "Atuação em ambiente de segurança defensiva, seguindo procedimentos, documentando intervenções e escalonando ocorrências para equipes especializadas.",
    tags: ["Procedimentos", "Documentação", "Escalonamento"],
    projects: [] as string[],
  },
  {
    id: "automacao",
    label: "Automação",
    subtitle: "Menos repetição. Mais solução.",
    description:
      "Desenvolvo scripts e aplicações para organizar dados e reduzir tarefas manuais, como no fechamento financeiro empresarial em Python.",
    tags: ["Python", "Rotinas", "Software"],
    projects: ["finance-system"],
  },
] as const;
