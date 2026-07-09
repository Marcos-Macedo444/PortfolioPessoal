# Marcos Macêdo | Portfólio Pessoal

Este é o meu portfólio pessoal como profissional em evolução na área de tecnologia, com foco em infraestrutura, NOC, segurança defensiva, automação, backend e projetos reais.

Eu criei este projeto para apresentar minha trajetória de forma clara, organizada e profissional. A proposta não é ser apenas uma página com meu nome, mas um portfólio com identidade própria, boa experiência em desktop e mobile, projetos documentados, formulário de contato funcional e uma base técnica segura para produção.

O projeto está publicado em:

```text
https://marcosmacedo.dev
```

## Sobre o Projeto

O portfólio foi desenvolvido com Next.js, React, TypeScript e Tailwind CSS. A interface usa uma estética técnica inspirada em ambientes SOC/NOC, infraestrutura digital, monitoramento, sinais e painéis operacionais.

O objetivo visual é transmitir tecnologia, segurança defensiva, automação e evolução técnica sem deixar a experiência pesada ou confusa. O background foi feito com CSS, gradientes e SVG leve, respeitando `prefers-reduced-motion`.

O site também conta com formulário de contato em produção. As mensagens são enviadas pelo Resend por uma rota server-side do Next.js, mantendo a chave de API fora do front-end.

## Status Atual

- Publicado em produção no domínio `marcosmacedo.dev`.
- Deploy pela Vercel a partir da branch `main`.
- Formulário de contato funcionando com Resend.
- Domínio próprio `.dev` configurado.
- Imagens reais de perfil e Hack27 configuradas.
- Relatório de auditoria de firewall disponível em `docs/firewall-audit-report.md`.
- Headers de segurança configurados no Next.js.
- Dependências revisadas com `npm audit` sem vulnerabilidades conhecidas.

## Tecnologias

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- Resend
- Vercel

Também uso scripts auxiliares em Node.js para padronizar a execução dos comandos do Next.js e do TypeScript no ambiente local.

## Funcionalidades

- Intro animada em estilo terminal.
- Hero com foto, texto dinâmico e chamadas principais.
- Navbar fixa com menu responsivo e seção ativa.
- Barra de progresso de scroll.
- Ticker de habilidades.
- Background técnico com grid, sinais, trilhas SVG e movimento sutil.
- Cursor glow em desktop.
- Seção Sobre com narrativa profissional.
- Seção Hack27 com imagens reais e contexto da conquista.
- Projetos com filtros, cards e links externos.
- Skill matrix agrupada por áreas técnicas.
- Estatísticas com contadores animados.
- Timeline da minha jornada.
- Filosofia profissional.
- Formulário de contato com validação no cliente e no servidor.
- Proteção básica contra spam com honeypot e cooldown.
- Footer com direitos reservados.
- Command Palette com atalho `Ctrl+K`.
- SEO com metadata, robots, sitemap e favicon.
- Suporte a `prefers-reduced-motion`.

## Estrutura das Seções

```text
Hero
SkillTicker
Sobre
Hack27
Projetos
Tecnologias
Estatísticas
Jornada
Filosofia
Contato
Footer
```

Cada seção tem uma função objetiva: apresentar quem eu sou, mostrar no que estou evoluindo, destacar projetos, registrar minha jornada e facilitar contato profissional.

## Formulário de Contato

O formulário fica em:

```text
src/components/sections/Contact.tsx
```

A rota server-side fica em:

```text
src/app/api/contact/route.ts
```

Fluxo do envio:

1. A pessoa preenche nome, e-mail, assunto e mensagem.
2. O front-end valida os campos.
3. O front-end envia um `POST` para `/api/contact`.
4. A API valida tudo novamente no servidor.
5. A API envia a mensagem pelo Resend.
6. Eu recebo o contato no e-mail configurado em produção.

Validações e proteções:

- nome obrigatório;
- e-mail obrigatório;
- formato válido de e-mail;
- mensagem obrigatória;
- tamanho mínimo da mensagem;
- limite de tamanho dos campos;
- honeypot invisível;
- cooldown contra envios repetidos;
- escape de HTML no conteúdo do e-mail;
- mensagens de erro sem expor detalhes internos.

## Variáveis de Ambiente

As variáveis reais ficam configuradas na Vercel. Elas não devem ser colocadas no código e não devem ser commitadas.

No projeto da Vercel, o caminho é:

```text
Project Settings > Environment Variables
```

Variáveis usadas em produção:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=marcosfilipe.macedo@gmail.com
CONTACT_FROM_EMAIL=Marcos Macêdo <contato@marcosmacedo.dev>
NEXT_PUBLIC_SITE_URL=https://marcosmacedo.dev
CONTACT_FORM_DRY_RUN=false
```

Para rodar localmente com envio real, crie um `.env.local` com os valores reais. Esse arquivo é ignorado pelo Git.

Para rodar a interface e a API sem enviar e-mail real:

```env
CONTACT_FORM_DRY_RUN=true
```

## Como Rodar Localmente

Instale as dependências:

```bash
npm install
```

Rode em modo desenvolvimento:

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

O projeto precisa rodar pelo servidor do Next.js. Não abra arquivos `.tsx` diretamente no navegador.

## Scripts

```bash
npm run dev
```

Roda o projeto localmente em modo desenvolvimento.

```bash
npm run build
```

Gera o build de produção com Next.js.

```bash
npm run start
```

Roda localmente o build de produção. Execute `npm run build` antes.

```bash
npm run lint
```

Roda o ESLint.

```bash
npm run typecheck
```

Roda a checagem TypeScript sem emitir arquivos.

O projeto não tem script `preview`. No Next.js, o equivalente é:

```bash
npm run build
npm run start
```

## Deploy

O deploy é feito pela Vercel. O fluxo principal é:

1. Alterar e validar o projeto localmente.
2. Criar commit.
3. Enviar a branch `main` para o GitHub.
4. A Vercel inicia o deploy de produção automaticamente.

Configuração esperada na Vercel:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: vazio
```

## Estrutura de Pastas

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
      IntroOverlay.tsx
      ProjectCard.tsx
      SectionTitle.tsx
      SkillTicker.tsx
      StatCard.tsx
      TechBadge.tsx
      TechnicalBackground.tsx
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
    profile/
scripts/
  next-runner.cjs
  typecheck-runner.cjs
docs/
  firewall-audit-report.md
```

## Arquivos Principais

- `src/app/page.tsx`: monta a página principal.
- `src/app/layout.tsx`: define metadata, SEO básico e estrutura global.
- `src/app/api/contact/route.ts`: valida e envia mensagens pelo Resend.
- `src/components/ui/TechnicalBackground.tsx`: background principal.
- `src/components/sections/Contact.tsx`: formulário de contato.
- `src/data/profile.ts`: dados principais do meu perfil.
- `src/data/projects.ts`: lista de projetos exibidos.
- `src/data/technologies.ts`: tecnologias, grupos de habilidades e matriz visual.
- `docs/firewall-audit-report.md`: auditoria de segurança e falsos positivos de firewall.

## Projetos Exibidos

- Sorteio de Times Futebol
- Sistema de Gestão Financeira Empresarial
- Processamento Digital de Imagens
- Horas Academy
- Crazy Cine

Os projetos ficam em:

```text
src/data/projects.ts
```

Cada projeto possui título, categorias, resumo, descrição, tecnologias, funcionalidades, aprendizados e links externos quando disponíveis.

## Conteúdo e Imagens

Dados principais:

```text
src/data/profile.ts
```

Projetos:

```text
src/data/projects.ts
```

Tecnologias:

```text
src/data/technologies.ts
```

Timeline:

```text
src/data/timeline.ts
```

Imagens públicas:

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

## SEO

O SEO básico fica em:

```text
src/app/layout.tsx
src/app/robots.ts
src/app/sitemap.ts
```

O domínio usado em produção é:

```text
https://marcosmacedo.dev
```

Se o domínio mudar, `NEXT_PUBLIC_SITE_URL` também deve ser atualizado na Vercel.

## Segurança

Eu não versiono chaves, tokens ou arquivos sensíveis.

O `.gitignore` cobre:

```text
.env
.env.*
!.env.example
node_modules
.next
out
build
dist
logs
.vercel
```

O projeto também conta com:

- variáveis de ambiente apenas no servidor para envio com Resend;
- validação client-side e server-side no formulário;
- limite de tamanho dos campos;
- escape de HTML no e-mail enviado;
- honeypot;
- cooldown local e rate limit simples;
- headers de segurança configurados no Next.js;
- build sem source maps públicos de produção.

## Checklist Antes de Produção

Antes de enviar alterações para produção, eu valido:

```bash
npm audit --audit-level=low
npm run typecheck
npm run lint
npm run build
```

Também confiro:

- página inicial;
- background;
- responsividade mobile;
- projetos;
- seção Hack27;
- formulário;
- footer;
- links externos;
- robots e sitemap.

## Fluxo de Git

```bash
git status
git add .
git commit -m "mensagem do commit"
git push origin main
```

Depois do push para `main`, a Vercel executa o deploy de produção.

## Rodapé

O rodapé atual mostra:

```text
© 2026 Marcos Macêdo. Todos os direitos reservados.
Criado e desenvolvido por Marcos Macêdo.
```

Também mantém links para GitHub, LinkedIn e e-mail.

## Observação Final

Este portfólio representa meu momento atual na tecnologia. Ele reúne minha experiência prática, meus estudos, meus projetos e minha transição para áreas como infraestrutura, NOC, segurança defensiva e automação.

Minha intenção é manter este projeto evoluindo junto com minha carreira, com uma base limpa, segura e profissional.
