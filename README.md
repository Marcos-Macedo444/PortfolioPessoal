# Marcos Macêdo / Conexões em movimento

Este é meu portfólio pessoal: minha trajetória em redes e infraestrutura, minha atuação em NOC e os projetos de software e automação que desenvolvo para resolver problemas reais.

Sou **Técnico de Networking I — NOC na Vision Cybersecurity**, contratado em tempo integral desde **setembro de 2026**, em Vitória, Espírito Santo, Brasil. Antes da efetivação, construí minha base prática como estagiário NOC. Minha experiência anterior como chaveiro residencial também faz parte dessa história: atendimento, precisão e responsabilidade continuam presentes na forma como trabalho.

Meu endereço público é [marcosmacedo.dev](https://marcosmacedo.dev/).

## A identidade do portfólio

Chamei o conceito de **Conexões em movimento**. Quatro áreas, Redes, NOC, Segurança e Automação, se conectam a um monograma MM. Cada ponto pode ser selecionado para conhecer uma parte da minha atuação. O percurso continua na trajetória profissional quando a página é rolada.

O azul organiza as rotas e as ações; o verde marca os sinais e a seleção. O tema escuro usa `#09121E`, `#4C8DFF`, `#65F5A2` e `#E7EEF8`. No claro, adaptei os contrastes para manter a leitura. O tema segue o sistema até que a pessoa escolha outro, com preferência salva no navegador.

O movimento é 2D, com SVG, CSS e Framer Motion. Os conteúdos aparecem imediatamente e a navegação usa a rolagem nativa. Há controle para pausar animações e suporte à preferência de movimento reduzido. As decisões estão em [DESIGN.md](DESIGN.md).

## Minha atuação atual

No NOC, trabalho com monitoramento de redes, telecomunicações e serviços de TI; classificação e acompanhamento de incidentes; troubleshooting e atuação em primeiro e segundo nível conforme os procedimentos. Também acompanho eventos, alarmes, disponibilidade, desempenho e SLAs, realizo intervenções operacionais, escalono ocorrências e atualizo documentação técnica.

O portfólio apresenta essa experiência sem divulgar dados de clientes, topologias operacionais ou informações internas. A rede visual é uma composição autoral e esquemática.

## O que está no site

- Abertura com nome, cargo atual, rede interativa e atalhos para projetos e trajetória.
- Trajetória com a efetivação, o estágio como experiência anterior e minha transição para tecnologia.
- Sobre mim com fotografia real e apresentação pessoal.
- Projetos com filtros, demonstração real, links e detalhes expansíveis.
- Conquista no Hack27 com a equipe RED BOOST e cinco fotografias navegáveis.
- Competências organizadas por áreas e ferramentas, sem percentuais fictícios.
- Filosofia profissional, contato, formulário e canais diretos.
- Navegação responsiva, busca de seções com `Ctrl+K`, progresso de leitura e retorno ao início.
- Temas claro/escuro/sistema, preferências persistidas e controle de animação.
- Metadata, sitemap, robots, favicon e página 404.

Não há currículo, certificados ou diplomas para download no repositório. As datas do estágio ainda não estavam documentadas na base anterior; por isso, mantive a experiência histórica sem inventar um período.

## Projetos exibidos

| Projeto                                  | Links                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Sorteio de Times Futebol                 | [Aplicação](https://sorteio-times-futebol-blond.vercel.app) · [GitHub](https://github.com/Marcos-Macedo444/SorteioTimesFutebol) |
| Sistema de Gestão Financeira Empresarial | Publicação no LinkedIn, preservada em `src/data/projects.ts`                                                                    |
| Processamento Digital de Imagens         | [GitHub](https://github.com/Marcos-Macedo444/ProcessamentoDeImagens)                                                            |
| Horas Academy                            | [GitHub](https://github.com/Marcos-Macedo444/HorasAcademyFront)                                                                 |
| Crazy Cine                               | [GitHub](https://github.com/Marcos-Macedo444/CrazyCine-Flask)                                                                   |

No Sorteio de Times, usei uma captura da aplicação pública real. Os outros projetos preservam suas descrições, funcionalidades, aprendizados e links de origem, sem inventar demonstrações ou screenshots.

## Stack

Next.js 16, React 18, TypeScript, Tailwind CSS, Framer Motion e Lucide. O envio de e-mail usa a API do Resend no servidor. A hospedagem está vinculada à Vercel e ao GitHub.

A tipografia de títulos é Space Grotesk, hospedada localmente. A licença SIL OFL acompanha a fonte em `public/fonts/OFL.txt`. Os textos usam fontes de sistema. Não há CDN ou cena 3D.

## Desenvolvimento local

Uso Node.js entre 20.11 e 24, conforme `package.json`.

```bash
npm install
npm run dev
```

O endereço padrão é `http://localhost:3000`. No Windows, `npm.cmd` pode ser usado quando a policy do PowerShell bloquear `npm.ps1`.

Para validar e executar uma versão de produção:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

Não existe script `test` na base atual. O runner `scripts/next-runner.cjs` normaliza caminhos do Windows e recria `.next` ao iniciar dev ou build. Por isso, encerro o dev antes de preparar um build e iniciar `start`.

## Formulário de contato

O formulário está em `src/components/sections/Contact.tsx`. Ele envia JSON para `/api/contact`, valida os campos, mostra estados de envio e mantém honeypot e cooldown. A rota em `src/app/api/contact/route.ts` valida novamente, escapa o conteúdo HTML e chama o Resend somente no servidor.

Variáveis de ambiente:

```env
NEXT_PUBLIC_SITE_URL=https://marcosmacedo.dev
RESEND_API_KEY=
CONTACT_TO_EMAIL=marcosfilipe.macedo@gmail.com
CONTACT_FROM_EMAIL=
```

Configuro os valores reais em **Vercel > Project Settings > Environment Variables**, no ambiente adequado. A chave do Resend nunca recebe prefixo `NEXT_PUBLIC_`. `CONTACT_FROM_EMAIL` deve ser um remetente autorizado no Resend. Para testar localmente sem enviar e-mails, posso usar `CONTACT_FORM_DRY_RUN=true`; essa opção deve ficar desativada em produção.

Mantenho `.env` e `.env.*` ignorados no Git. `.env.example` é apenas um modelo sem segredos. A resposta de sucesso da API confirma aceitação pelo serviço; recebimento na caixa de entrada é uma confirmação separada.

## Estrutura

```text
src/
  app/                     Página, layout, metadata, estilos e API de contato
  components/
    layout/                Navegação, footer, progresso e retorno ao topo
    sections/              Abertura, trajetória, sobre, projetos, conquista e contato
    ui/                    Monograma, preferências, busca e apresentação de projetos
  data/                    Perfil, conexões, navegação, projetos, competências e trajetória
  hooks/                   Busca e acompanhamento da seção ativa
  lib/                     Navegação e clipboard
  types/                   Contratos dos conteúdos
public/
  fonts/                   Space Grotesk e licença
  icons/                   Favicon
  images/profile/          Fotos pessoais em PNG
  images/hack27/           Registros reais da RED BOOST
  images/projects/         Captura real do Sorteio de Times
  preferences.js           Aplica o tema salvo antes da primeira pintura
scripts/                   Runners do Next.js e TypeScript
docs/                      Auditoria histórica e validação do redesign
DESIGN.md                  Sistema visual e decisões de movimento
```

Atualizo meu cargo e meus contatos em `src/data/profile.ts`; experiências em `src/data/timeline.ts`; projetos em `src/data/projects.ts`; descrições das áreas em `src/data/connections.ts`; ferramentas em `src/data/technologies.ts`. Os tokens dos temas ficam em `src/app/globals.css`.

## Segurança e publicação

Os headers em `next.config.mjs` incluem CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e `X-Frame-Options`. `unsafe-eval` só é permitido no modo de desenvolvimento do Next/React. Produção continua sem essa exceção. O relatório `docs/firewall-audit-report.md` registra a auditoria anterior; ele é histórico e não representa garantia de liberação em firewalls corporativos.

O fluxo de produção existente usa a `main`: após validação e integração autorizada, um push dispara a Vercel. Branches de trabalho podem receber previews conforme a integração. Os resultados desta entrega, medições de laboratório e limitações estão em [docs/redesign-validation.md](docs/redesign-validation.md).

Capturas locais de revisão ficam em `.tmp/redesign`, ignoradas pelo Git. Não publico caches, traces, segredos ou screenshots temporários no repositório.

## Contato

- [GitHub](https://github.com/Marcos-Macedo444)
- [LinkedIn](https://www.linkedin.com/in/marcos-mac%C3%AAdo)
- [E-mail](mailto:marcosfilipe.macedo@gmail.com)

© 2026 Marcos Macêdo. Todos os direitos reservados.
