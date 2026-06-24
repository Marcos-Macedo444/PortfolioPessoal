# Marcos Macêdo | Portfólio Pessoal

Este é o meu portfólio pessoal como profissional em evolução na área de tecnologia, com foco em infraestrutura, NOC, cybersecurity, automação, backend e projetos reais.

A ideia deste projeto foi criar um site que não fosse apenas uma página bonita com meu nome. Eu queria um portfólio com identidade própria, visual forte, atmosfera cyber/hacker profissional e conteúdo organizado para mostrar minha trajetória, meus projetos, minhas habilidades e minhas formas de contato.

O projeto está publicado em:

```text
https://marcosmacedo.dev
```

## Sobre O Projeto

Este portfólio foi desenvolvido com Next.js, React, TypeScript e Tailwind CSS. Ele tem uma estética inspirada em ambientes SOC/NOC, cybersecurity, infraestrutura digital, redes, radar, sinais e painéis técnicos.

O objetivo visual é transmitir tecnologia, segurança, monitoramento, automação e evolução técnica, mas sem cair em uma chuva Matrix genérica. O background foi pensado como uma camada própria do site, com grid 3D, radar, trilhas de rede, pontos de sinal e movimento sutil.

O site também tem formulário de contato funcionando em produção. As mensagens são enviadas pelo Resend para meu e-mail real, usando uma API server-side do Next.js para não expor nenhuma chave no front-end.

## Status Atual

- Publicado em produção no domínio `marcosmacedo.dev`.
- Deploy feito pela Vercel.
- Formulário de contato funcionando com Resend.
- E-mail de recebimento: `marcosfilipe.macedo@gmail.com`.
- Domínio próprio `.dev` configurado.
- Background cyber/SOC finalizado.
- Footer com direitos reservados e crédito de desenvolvimento.
- Imagens reais de perfil e Hack27 configuradas.
- Seção de certificações removida para manter o portfólio mais direto e atual.

## Tecnologias

As principais tecnologias usadas neste projeto são:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- Resend
- Vercel

Também usei alguns scripts auxiliares em Node.js para deixar o projeto mais estável no Windows com OneDrive.

## Principais Funcionalidades

- Intro animada em estilo terminal.
- Hero com foto, textos dinamicos e painel visual.
- Navbar fixa com blur, menu responsivo e secao ativa.
- Barra de progresso de scroll.
- Ticker de habilidades.
- Background cyber com grid 3D, radar, sinais, trilhas SVG e atmosfera SOC/NOC.
- Cursor glow em desktop.
- Secao Sobre com narrativa profissional.
- Secao Hack27 com imagens reais, contexto do evento e competencias.
- Projetos com filtros, cards e links externos.
- Skill matrix agrupada por areas tecnicas.
- Estatisticas com contadores animados.
- Timeline da minha jornada.
- Filosofia profissional.
- Formulario de contato funcional com API Route.
- Protecao basica contra spam com honeypot.
- Validacao no front-end e no servidor.
- Footer profissional com direitos reservados.
- Command Palette com atalho `Ctrl+K`.
- Easter egg ao digitar `hack27`.
- SEO com metadata, robots, sitemap e favicon.
- Suporte a `prefers-reduced-motion`.

## Estrutura Das Secoes

O site esta organizado assim:

```text
Hero
SkillTicker
Sobre
Hack27
Projetos
Tecnologias
Estatisticas
Jornada
Filosofia
Contato
Footer
```

Cada secao tem uma funcao clara. Eu quis evitar uma pagina baguncada ou puramente decorativa. A proposta e que a pessoa entenda rapido quem eu sou, no que estou evoluindo, quais projetos ja construi e como entrar em contato comigo.

## Background

O background atual fica em:

```text
src/components/ui/CyberBackground.tsx
```

Ele foi criado com CSS, gradientes e SVG leve. Nao usei canvas pesado nem biblioteca 3D, porque eu queria manter performance boa em desktop e mobile.

O conceito visual mistura:

- SOC/NOC futurista
- radar/scanner
- grid 3D
- rede de conexoes
- pontos de sinal
- energia digital
- profundidade visual
- atmosfera cyberpunk profissional

As animacoes respeitam `prefers-reduced-motion` usando classes `motion-reduce`.

## Formulario De Contato

O formulario fica em:

```text
src/components/sections/Contact.tsx
```

A rota server-side fica em:

```text
src/app/api/contact/route.ts
```

O fluxo e assim:

1. A pessoa preenche nome, e-mail, assunto e mensagem.
2. O front-end valida os campos.
3. O front-end envia um `POST` para `/api/contact`.
4. A API valida tudo novamente no servidor.
5. A API usa o Resend para enviar o e-mail.
6. Eu recebo a mensagem em `marcosfilipe.macedo@gmail.com`.

O formulario valida:

- nome obrigatorio
- e-mail obrigatorio
- formato valido de e-mail
- mensagem obrigatoria
- tamanho minimo da mensagem
- bloqueio contra envio vazio
- feedback de carregamento
- feedback de sucesso
- feedback de erro
- cooldown contra multiplos envios seguidos
- honeypot invisivel contra spam

O e-mail enviado contem:

- nome da pessoa
- e-mail da pessoa
- assunto informado
- mensagem
- data e hora do envio
- origem: portfolio pessoal

## Variaveis De Ambiente

As variaveis reais ficam na Vercel. Elas nao devem ser colocadas no codigo e nao devem ser commitadas.

No projeto da Vercel, configure em:

```text
Project Settings > Environment Variables
```

Variaveis usadas:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=marcosfilipe.macedo@gmail.com
CONTACT_FROM_EMAIL=Marcos Macêdo <contato@marcosmacedo.dev>
NEXT_PUBLIC_SITE_URL=https://marcosmacedo.dev
```

Para producao, `CONTACT_FORM_DRY_RUN` nao deve ficar ativo.

O arquivo `.env.example` existe apenas como referencia:

```text
.env.example
```

Para testar localmente com envio real, crie um `.env.local` com as variaveis verdadeiras. Esse arquivo nao deve ir para o GitHub.

Exemplo local:

```env
RESEND_API_KEY=sua_chave_real_do_resend
CONTACT_TO_EMAIL=marcosfilipe.macedo@gmail.com
CONTACT_FROM_EMAIL=Marcos Macêdo <contato@marcosmacedo.dev>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Para testar apenas a interface sem enviar e-mail real:

```env
CONTACT_FORM_DRY_RUN=true
```

## Resend

O Resend e usado para envio de e-mails do formulario.

Eu configurei o dominio proprio para conseguir usar um remetente profissional:

```text
contato@marcosmacedo.dev
```

No codigo, a chave do Resend e lida somente no servidor:

```ts
process.env.RESEND_API_KEY
```

Ela nao aparece no bundle do front-end.

## Dominio E Deploy

O dominio principal do projeto e:

```text
https://marcosmacedo.dev
```

O deploy e feito pela Vercel. O fluxo atual e:

1. Altero o projeto localmente.
2. Valido com scripts de desenvolvimento.
3. Faço commit.
4. Faço push para o GitHub.
5. A Vercel faz deploy automaticamente a partir da branch `main`.

Como este projeto e Next.js, a Vercel detecta automaticamente o framework.

Configuracao esperada na Vercel:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: vazio
```

## Como Rodar Localmente

Instale as dependencias:

```bash
npm install
```

Rode o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

Se a porta `3000` estiver ocupada:

```bash
npm run dev -- -p 3002
```

Nao abra arquivos como `src/app/page.tsx` diretamente no navegador. O projeto precisa rodar pelo servidor do Next.js.

## Scripts Disponiveis

```bash
npm run dev
```

Roda o projeto localmente em modo desenvolvimento.

```bash
npm run build
```

Gera o build de producao.

```bash
npm run start
```

Roda localmente o build de producao. Precisa executar `npm run build` antes.

```bash
npm run lint
```

Roda o ESLint.

```bash
npm run typecheck
```

Roda a checagem TypeScript sem emitir arquivos.

Este projeto nao tem script `preview`. O equivalente em Next.js e:

```bash
npm run build
npm run start
```

## Observacao Sobre Windows E OneDrive

Este projeto esta em uma pasta do OneDrive no Windows. Para evitar problemas de caminho com `OneDrive` e `Onedrive`, os scripts usam runners proprios:

```text
scripts/next-runner.cjs
scripts/typecheck-runner.cjs
```

O `next-runner.cjs` resolve o caminho real do projeto e limpa `.next` antes de `dev` e `build`. Isso evita conflitos de cache e modulos duplicados no Next.js.

## Estrutura De Pastas

```text
src/
  app/
    api/
      contact/
        route.ts
    globals.css
    layout.tsx
    not-found.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    layout/
      BackToTop.tsx
      Footer.tsx
      Navbar.tsx
      ScrollProgress.tsx
    sections/
      About.tsx
      Contact.tsx
      Hack27.tsx
      Hero.tsx
      Philosophy.tsx
      Projects.tsx
      Stats.tsx
      TechStack.tsx
      Timeline.tsx
    ui/
      AnimatedCounter.tsx
      Button.tsx
      CommandPalette.tsx
      CursorGlow.tsx
      CyberBackground.tsx
      IntroOverlay.tsx
      ProjectCard.tsx
      SectionTitle.tsx
      SkillTicker.tsx
      StatCard.tsx
      TechBadge.tsx
      TerminalWindow.tsx
  data/
    navigation.ts
    profile.ts
    projects.ts
    technologies.ts
    timeline.ts
  hooks/
    useCommandPalette.ts
    useReducedMotion.ts
    useScrollSpy.ts
  lib/
    utils.ts
  types/
    index.ts
public/
  icons/
    favicon.svg
  images/
    backgrounds/
    hack27/
    og/
    profile/
scripts/
  next-runner.cjs
  typecheck-runner.cjs
```

## Arquivos Principais

```text
src/app/page.tsx
```

Monta a pagina principal e organiza a ordem das secoes.

```text
src/app/layout.tsx
```

Define metadata, SEO basico e estrutura global do app.

```text
src/app/api/contact/route.ts
```

API server-side que valida e envia mensagens pelo Resend.

```text
src/components/ui/CyberBackground.tsx
```

Background principal do portfolio.

```text
src/components/sections/Contact.tsx
```

Formulario de contato com validacoes e estados de envio.

```text
src/data/profile.ts
```

Informacoes principais do meu perfil, links e textos base.

```text
src/data/projects.ts
```

Lista dos projetos exibidos no portfolio.

```text
src/data/technologies.ts
```

Tecnologias, grupos de habilidades, ticker e matriz visual.

## Projetos Exibidos

Atualmente o portfolio mostra estes projetos:

- Sistema de Gestao Financeira Empresarial
- Processamento Digital de Imagens
- Horas Academy
- Crazy Cine

Os projetos ficam em:

```text
src/data/projects.ts
```

Cada projeto tem:

- id
- titulo
- categorias
- resumo
- descricao
- tecnologias
- funcionalidades
- aprendizados
- link externo
- label do botao
- tipo do link

## Skill Matrix

A skill matrix fica em:

```text
src/data/technologies.ts
src/components/sections/TechStack.tsx
```

Ela esta organizada por grupos:

- Cybersecurity
- Infraestrutura
- Automacao
- Desenvolvimento
- Redes / NOC
- Ferramentas

Cada habilidade tem nome, area, nivel, sinal visual e icone.

## Imagens

As imagens ficam em:

```text
public/images/
```

Imagens de perfil:

```text
public/images/profile/profile.png
public/images/profile/profile2.png
```

Imagens do Hack27:

```text
public/images/hack27/Team.jpg
public/images/hack27/Team2.jpg
public/images/hack27/Presentation.jpg
public/images/hack27/Award.jpg
public/images/hack27/Award2.jpg
```

Imagem social futura:

```text
public/images/og/
```

Os cards de projeto atualmente nao usam imagens. Eles usam texto, tecnologias e links externos.

## Como Atualizar Conteudo

Para alterar meus dados principais:

```text
src/data/profile.ts
```

Para alterar projetos:

```text
src/data/projects.ts
```

Para alterar tecnologias:

```text
src/data/technologies.ts
```

Para alterar timeline:

```text
src/data/timeline.ts
```

Para alterar navegacao:

```text
src/data/navigation.ts
```

Para alterar o formulario:

```text
src/components/sections/Contact.tsx
src/app/api/contact/route.ts
```

Para alterar o background:

```text
src/components/ui/CyberBackground.tsx
tailwind.config.ts
```

## SEO

O SEO basico fica em:

```text
src/app/layout.tsx
src/app/robots.ts
src/app/sitemap.ts
```

O dominio final usado em producao e:

```text
https://marcosmacedo.dev
```

Se o dominio mudar, eu preciso atualizar `NEXT_PUBLIC_SITE_URL` na Vercel.

## Acessibilidade E Performance

O projeto foi pensado para funcionar bem em desktop e mobile.

Alguns cuidados:

- textos com contraste alto
- layout responsivo
- menu mobile compacto
- elementos com foco visivel
- animacoes respeitando `prefers-reduced-motion`
- background leve, sem canvas pesado
- imagens carregadas pelo diretório `public`
- API de contato no servidor

## Seguranca

Eu nao versiono chaves, tokens ou arquivos sensiveis.

O `.gitignore` ignora:

```text
.env
.env*.local
node_modules
.next
logs
builds locais
caches TypeScript
.vercel
```

O formulario tambem tem:

- validacao no cliente
- validacao no servidor
- limite de tamanho dos campos
- escape de HTML no conteudo do e-mail
- honeypot
- rate limit simples por IP/e-mail
- mensagens de erro sem expor detalhes internos

## Checklist Antes De Fazer Deploy

Antes de subir mudancas importantes, eu rodo:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Depois valido:

- pagina inicial
- background
- mobile
- projetos
- Hack27
- formulario
- footer
- links externos
- robots e sitemap

## Fluxo De Deploy

O fluxo normal e:

```bash
git status
git add .
git commit -m "mensagem do commit"
git push origin main
```

Depois do push, a Vercel faz o deploy automaticamente.

## Ambiente De Producao

Em producao, o projeto depende das variaveis:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=marcosfilipe.macedo@gmail.com
CONTACT_FROM_EMAIL=Marcos Macêdo <contato@marcosmacedo.dev>
NEXT_PUBLIC_SITE_URL=https://marcosmacedo.dev
```

Essas variaveis ficam na Vercel, nao no repositorio.

## Rodape

O rodape atual mostra:

```text
© 2026 Marcos Macêdo. Todos os direitos reservados.
Criado e desenvolvido por Marcos Macêdo.
```

Tambem mantem links para GitHub, LinkedIn e e-mail.

## Observacao Final

Este portfolio representa meu momento atual na tecnologia. Ele junta minha experiencia pratica, meus estudos, meus projetos e minha transicao para areas como infraestrutura, NOC, cybersecurity e automacao.

Minha intencao e manter este projeto vivo, evoluindo junto com minha carreira, meus projetos e minha identidade profissional.
