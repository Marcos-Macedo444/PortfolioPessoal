# Firewall Audit Report

Data: 2026-06-30  
Branch auditada: `audit/firewall-safe-portfolio`  
Objetivo: reduzir falsos positivos em firewall, proxy, DNS filtering, EDR e navegadores corporativos sem mascarar comportamento, sem contornar controles e sem remover funcionalidades legítimas do portfólio.

## Resumo executivo

O projeto foi revisado como um portfólio profissional em Next.js publicado em domínio próprio. Não encontrei comportamento malicioso, ofuscação, downloads automáticos, iframes externos, execução dinâmica de código, permissões sensíveis de navegador ou recursos hospedados em domínios desconhecidos.

As causas mais prováveis para bloqueio corporativo eram uma combinação de:

- Dependências com vulnerabilidades conhecidas antes do upgrade.
- Ausência de headers de segurança explícitos.
- Linguagem pública com termos de segurança usados sem contexto defensivo suficiente.
- Estética e nomes internos com aparência técnica agressiva.
- Domínio `.dev` novo, ainda sem reputação consolidada em alguns filtros corporativos.
- Hospedagem em Vercel, que pode herdar avaliação por IP compartilhado ou categoria genérica em alguns gateways.

Foram aplicadas correções legítimas: upgrade de dependências, política de headers, limpeza de URLs, revisão de metadados/textos, renomeação de classes internas ambíguas e validação local em produção.

## Achados por severidade

### Crítico

Nenhum achado crítico.

Não foram encontrados segredos reais, chaves de API, tokens, arquivos `.env` commitados, executáveis, arquivos compactados, scripts externos injetados, iframes, service worker ou chamadas para domínios desconhecidos no runtime do navegador.

### Alto

1. Dependências com vulnerabilidades conhecidas antes do upgrade.

Motivo técnico: `npm audit` apontava vulnerabilidades em `next`, `postcss` transitivo e cadeia de lint antiga. Em ambientes corporativos, scanners podem bloquear sites ou repositórios quando detectam bibliotecas com advisories abertos.

Correção implementada:

- `next` atualizado para `16.2.9`.
- `eslint-config-next` atualizado para `16.2.9`.
- `eslint` atualizado para `9.39.4`.
- `postcss` atualizado para `8.5.16`.
- Adicionado `overrides.postcss` para garantir `postcss@8.5.16` também dentro da árvore transitiva do Next.
- `npm audit --audit-level=low` passou com `found 0 vulnerabilities`.

### Médio

1. Headers de segurança ausentes.

Motivo técnico: sem CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS e proteção contra framing, alguns proxies classificam a aplicação como menos madura ou mais arriscada.

Correção implementada em `next.config.mjs`:

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` negando câmera, microfone, geolocalização e APIs não usadas
- `X-Frame-Options: DENY`
- `Strict-Transport-Security`
- `poweredByHeader: false`
- `productionBrowserSourceMaps: false`

Observação: a CSP mantém `unsafe-inline` para `script-src` e `style-src` porque Next/React ainda dependem de inline runtime/styles nesse formato de app sem nonce customizado. `unsafe-eval` não é habilitado em produção; ele só entra no `script-src` em desenvolvimento para suportar o runtime de debug do Next/React.

2. Texto público com termos de segurança sem contexto defensivo suficiente.

Motivo técnico: filtros de conteúdo podem usar classificação por texto em title, description, keywords, README e conteúdo renderizado. Termos de segurança soltos, combinados com estética de terminal, podem gerar falso positivo.

Correção implementada:

- Troca de linguagem pública para `segurança defensiva`, `NOC`, `infraestrutura` e `automação`.
- Remoção de termos ambíguos dos metadados SEO.
- Intro e terminal visual deixaram de usar mensagens como acesso liberado, varredura e comandos ambíguos.
- README ajustado para explicar o projeto como portfólio profissional e defensivo.

3. URLs externas com tracking e formato menos limpo.

Motivo técnico: URLs longas com parâmetros de tracking ou sufixos desnecessários podem aumentar ruído em gateways corporativos.

Correção implementada:

- Removidos parâmetros de tracking do link do LinkedIn.
- Removido `.git` dos links públicos de repositórios GitHub.

4. Build padrão do Next 16 com Turbopack falhou na coleta de páginas neste ambiente.

Motivo técnico: o app compilava, mas a etapa de coleta de páginas falhava para `/_not-found` e `/api/contact` usando Turbopack no Windows/OneDrive. Isso poderia quebrar deploy se o script ficasse no padrão.

Correção implementada:

- `npm run build` agora usa `next build --webpack`, que passou de forma estável.

### Baixo

1. Clipboard usado no botão de copiar e-mail.

Motivo técnico: APIs de clipboard são monitoradas por alguns navegadores corporativos. No projeto, ela é acionada apenas por clique explícito do usuário.

Status: mantido.

2. `window.open` em GitHub e LinkedIn.

Motivo técnico: abertura de nova aba pode ser monitorada por políticas corporativas. No projeto, ocorre somente em ação explícita do usuário e usa `noopener,noreferrer`.

Status: mantido.

3. Envio de e-mail via Resend no servidor.

Motivo técnico: existe chamada externa server-side para `https://api.resend.com/emails`. Ela é esperada, documentada e depende de variáveis de ambiente.

Status: mantido.

4. Imagens públicas grandes.

Motivo técnico: imagens maiores podem afetar performance, mas não representam risco de segurança por si só. Não há PDFs, ZIPs, executáveis ou downloads públicos suspeitos.

Status: mantido. Otimização futura recomendada.

### Recomendações preventivas

1. Reputação do domínio.

O domínio `marcosmacedo.dev` é legítimo, mas domínios novos podem levar tempo para ganhar reputação em filtros DNS, proxies e ferramentas de categorização.

2. Reputação da hospedagem.

Vercel pode usar infraestrutura compartilhada. Alguns bloqueios podem depender de reputação do IP, categoria do host ou política interna da empresa.

3. Categoria do site no fornecedor do firewall.

Se o bloqueio continuar, a correção pode depender de pedir recategorização do domínio no fornecedor usado pela empresa.

4. Email/domain reputation.

Como o formulário usa Resend e domínio próprio, SPF/DKIM/DMARC e reputação de envio também devem permanecer corretos na Vercel/Resend.

## Arquivos e áreas analisadas

- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `tsconfig.json`
- `eslint.config.mjs`
- `.env.example`
- `.gitignore`
- `README.md`
- `src/app/*`
- `src/app/api/contact/route.ts`
- `src/components/**/*`
- `src/data/**/*`
- `src/hooks/**/*`
- `src/lib/**/*`
- `src/types/**/*`
- `public/**/*`
- `scripts/**/*`

## Dependências analisadas

Resumo após correções:

- Pacotes no lockfile: 453 entradas.
- Registry principal: `registry.npmjs.org`.
- Scripts de instalação encontrados:
  - `fsevents@2.3.3`: dependência opcional comum para watchers em macOS.
  - `sharp@0.34.5`: dependência comum de otimização de imagens no Next.
  - `unrs-resolver@1.12.2`: resolver nativo usado pela cadeia moderna de lint/import.

Versões principais após correção:

- `next@16.2.9`
- `eslint@9.39.4`
- `eslint-config-next@16.2.9`
- `postcss@8.5.16`
- `react@18.3.1`
- `react-dom@18.3.1`

Resultado final:

- `npm audit --audit-level=low`: `found 0 vulnerabilities`.

## URLs externas encontradas

Runtime do site:

- `https://marcosmacedo.dev`
- `https://github.com/Marcos-Macedo444`
- `https://www.linkedin.com/in/marcos-mac%C3%AAdo`
- `https://www.linkedin.com/posts/marcos-mac%C3%AAdo_python-finanaexas-automatizaaexaeto-activity-7123007392362995712-iayb`
- `https://github.com/Marcos-Macedo444/ProcessamentoDeImagens`
- `https://github.com/Marcos-Macedo444/HorasAcademyFront`
- `https://github.com/Marcos-Macedo444/CrazyCine-Flask`
- `https://api.resend.com/emails` somente no servidor, dentro da rota de contato.

Lockfile:

- URLs do npm registry e links de funding de pacotes. Não são chamadas de runtime do navegador.

## Mudanças implementadas

- Criado relatório em `docs/firewall-audit-report.md`.
- Atualizado Next.js e cadeia de lint para versões atuais.
- Aplicado override de `postcss` para remover advisory transitivo.
- Migrado ESLint para configuração flat (`eslint.config.mjs`).
- Atualizado build para `next build --webpack`.
- Adicionados headers de segurança em `next.config.mjs`.
- Fortalecido `.gitignore` para ignorar `.env.*` e manter apenas `.env.example` versionado.
- Ajustados metadados SEO para linguagem profissional e defensiva.
- Revisados textos do perfil, timeline, projetos, tecnologias, hero, stats, terminal visual e README.
- Renomeadas classes internas de UI de linguagem ambígua para nomes técnicos neutros.
- Renomeado componente interno `CyberBackground` para `TechnicalBackground`.
- Limpas URLs externas de tracking e sufixos desnecessários.
- Mantido formulário com Resend usando somente variáveis de ambiente.

## Testes executados

Comandos:

- `npm install`: passou.
- `npm audit --audit-level=low`: passou, `found 0 vulnerabilities`.
- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm run build`: passou com `next build --webpack`.

Validação local:

- `GET http://localhost:3005`: `200 OK`.
- `POST http://localhost:3005/api/contact` com `CONTACT_FORM_DRY_RUN=true`: `200 OK`.
- Headers confirmados no HTML:
  - CSP
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `X-Frame-Options`
  - HSTS

Validação no navegador:

- Desktop: título correto, nome renderizado, texto de segurança defensiva presente, background presente, formulário presente, footer presente.
- Mobile 390x844: menu mobile presente, sem overflow horizontal, nome e footer renderizados.
- Console: 0 erros em desktop e 0 erros em mobile.

## Resultado final

O projeto está tecnicamente mais limpo, atualizado, com headers de segurança, sem vulnerabilidades conhecidas no `npm audit`, com linguagem pública mais defensiva e com validação local passando.

Está pronto para merge na `main` do ponto de vista de build, lint, typecheck e auditoria local.

## Complemento de desenvolvimento

O `Content-Security-Policy` passou a ser gerado por ambiente: `script-src` inclui `'unsafe-eval'` somente quando `NODE_ENV` não é `production`, para suportar recursos de debug do React/Next no modo desenvolvimento. Em produção, a CSP continua sem `'unsafe-eval'`.

A animação de loading foi implementada com React, CSS e SVG inline, sem imagens externas, scripts externos, canvas pesado ou novas dependências.

Se o firewall corporativo continuar bloqueando, as hipóteses mais prováveis passam a ser externas ao código:

- domínio novo sem reputação suficiente;
- categorização incorreta no fornecedor do firewall;
- política interna da empresa para domínios pessoais ou Vercel;
- reputação de IP compartilhado;
- regra de DNS/proxy independente do conteúdo atual.
