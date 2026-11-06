# Marcos Macêdo / Conexões em movimento

Este é meu portfólio pessoal: minha trajetória em redes e infraestrutura, minha atuação em NOC e os projetos de software e automação que desenvolvo para resolver problemas reais.

Sou **Técnico de Networking I — NOC na Vision Cybersecurity**, contratado em tempo integral desde **setembro de 2026**, em Vitória, Espírito Santo, Brasil. Antes da efetivação, construí minha base prática como estagiário NOC. Minha experiência anterior como chaveiro residencial também faz parte dessa história: atendimento, precisão e responsabilidade continuam presentes na forma como trabalho.

Meu endereço público é [marcosmacedo.dev](https://marcosmacedo.dev/).

## A identidade do portfólio

Chamei o conceito de **Conexões em movimento**. Na abertura, incorporei o **Hyperspeed do React Bits**, com uma pista em perspectiva e trilhas azuis e verdes. Depois da apresentação, um cabo azul se dobra nas minhas iniciais **MM**, abre caminhos para três projetos reais e segue até a linha da minha trajetória. A rolagem natural controla o percurso, inclusive no sentido inverso. As descrições de Redes, NOC, Segurança e Automação estão preservadas no Repertório técnico.

O azul organiza as rotas e as ações; o verde marca os sinais e a seleção. O tema escuro usa `#09121E`, `#4C8DFF`, `#65F5A2` e `#E7EEF8`. No claro, adaptei os contrastes para manter a leitura. O tema segue o sistema até que a pessoa escolha outro, com preferência salva no navegador.

O Hyperspeed usa Three.js diretamente, sem iframe ou vídeo. Meu nome, cargo, apresentação e links continuam em HTML. A entrada curta mostra o monograma MM em 2D e revela a mesma cena; não criei outro núcleo 3D. Há opção de pular, limite de segurança de 1,9s e reprodução apenas na primeira entrada da sessão. A navegação mantém a rolagem nativa, pausa global e movimento reduzido. As decisões estão em [DESIGN.md](DESIGN.md).

No celular, a pista é compacta e aparece na abertura, com resolução e densidade controladas. A nova sequência usa três quadros no fluxo: assinatura, projetos e passagem para a trajetória. Construí os fios com Canvas 2D, geometria em profundidade e projeção em perspectiva, sem outro motor 3D. O renderizador só é solicitado quando começo a rolar até a seção. Com pausa, movimento reduzido, Canvas indisponível ou sem JavaScript, ficam o MM estático, os links HTML e a passagem visual. O efeito-base da abertura tem autoria do React Bits: registrei o commit usado, a licença e minhas adaptações em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Minha atuação atual

No NOC, trabalho com monitoramento de redes, telecomunicações e serviços de TI; classificação e acompanhamento de incidentes; troubleshooting e atuação em primeiro e segundo nível conforme os procedimentos. Também acompanho eventos, alarmes, disponibilidade, desempenho e SLAs, realizo intervenções operacionais, escalono ocorrências e atualizo documentação técnica.

O portfólio apresenta essa experiência sem divulgar dados de clientes, topologias operacionais ou informações internas. A rede visual é uma composição autoral e esquemática.

## O que está no site

- Abertura com Hyperspeed azul/verde, nome, cargo atual, atalhos para projetos e trajetória e aceleração controlada.
- Palco Conexões em movimento com cabo azul entrelaçado, assinatura MM, pulsos verdes discretos e links reais para Futebol, Gestão Financeira e Processamento de Imagens.
- Trajetória com a efetivação, o estágio como experiência anterior e minha transição para tecnologia. Na origem como chaveiro residencial, um traço desenha uma chave, encaixa e gira o miolo em um gesto de 1,08s; com pausa, mostro o estado final estático.
- Sobre mim com minha fotografia principal real em destaque e apresentação pessoal; um retrato menor aparece na assinatura da abertura.
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

Next.js 16, React 18, TypeScript, Tailwind CSS, Framer Motion, Three.js e Lucide. Acrescentei somente Three.js 0.180.0 e os tipos correspondentes para a cena, seguindo a versão da base consultada. O envio de e-mail usa a API do Resend no servidor. A hospedagem está vinculada à Vercel e ao GitHub.

A tipografia de títulos é Space Grotesk, hospedada localmente. A licença SIL OFL acompanha a fonte em `public/fonts/OFL.txt`. Os textos usam fontes de sistema. Fonte, shaders e módulos da cena são servidos pelo próprio site, sem CDN, modelos ou texturas externos.

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
npm test
npm run build
npm run start
```

O comando `npm test` usa o runner nativo do Node para verificar a entrada, a sessão, o botão de pular antes da hidratação, movimento reduzido, storage indisponível e saída de segurança. Também verifico a amostragem dos fios, continuidade entre os atos, reversibilidade, alinhamento dos links e saída para a trajetória em diferentes larguras. O runner `scripts/next-runner.cjs` normaliza caminhos do Windows e recria `.next` ao iniciar dev ou build. Por isso, encerro o dev antes de preparar um build e iniciar `start`. A revisão visual e as medições da sequência estão em [docs/connections-validation.md](docs/connections-validation.md); a abertura está registrada em [docs/hyperspeed-validation.md](docs/hyperspeed-validation.md).

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
    visuals/               Hyperspeed, conexões Canvas 2D e chave SVG
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
scripts/                   Runners do Next.js/TypeScript e testes de entrada/geometria
docs/                      Auditoria histórica e validação do redesign
DESIGN.md                  Sistema visual e decisões de movimento
```

Atualizo meu cargo e meus contatos em `src/data/profile.ts`; experiências em `src/data/timeline.ts`; projetos em `src/data/projects.ts`; descrições profissionais em `src/data/connections.ts` (exibidas no Repertório técnico); ferramentas em `src/data/technologies.ts`. Os tokens dos temas ficam em `src/app/globals.css`. A geometria da sequência está em `src/components/visuals/connections/geometry.ts` e seu ciclo de renderização em `renderer.ts`.

## Segurança e publicação

Os headers em `next.config.mjs` incluem CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e `X-Frame-Options`. `unsafe-eval` só é permitido no modo de desenvolvimento do Next/React. Produção continua sem essa exceção. O relatório `docs/firewall-audit-report.md` registra a auditoria anterior; ele é histórico e não representa garantia de liberação em firewalls corporativos.

O fluxo de produção existente usa a `main`: após validação e integração autorizada, um push dispara a Vercel. Branches de trabalho podem receber previews conforme a integração. Os resultados desta entrega, medições de laboratório e limitações estão em [docs/redesign-validation.md](docs/redesign-validation.md).

Capturas locais de revisão ficam em `.tmp/redesign`, ignoradas pelo Git. Não publico caches, traces, segredos ou screenshots temporários no repositório.

## Contato

- [GitHub](https://github.com/Marcos-Macedo444)
- [LinkedIn](https://www.linkedin.com/in/marcos-mac%C3%AAdo)
- [E-mail](mailto:marcosfilipe.macedo@gmail.com)

© 2026 Marcos Macêdo. Todos os direitos reservados.
