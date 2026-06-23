# Marcos Macêdo | Cybersecurity, Infraestrutura e Automação

Portfólio web profissional, responsivo e interativo para Marcos Macêdo, com estética hacker/cyberpunk refinada e conteúdo voltado a cybersecurity, infraestrutura, automação, backend, projetos reais e Hack27.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- Vercel-ready

## Funcionalidades

- Intro animada em estilo terminal com `Access granted`
- Hero avançada com texto digitando, painel de status e terminal visual
- Navbar fixa com blur, seção ativa e menu mobile
- Barra de progresso de scroll
- Ticker automático de habilidades
- Carrossel contínuo de habilidades
- Fundo com grid tecnológico e efeito Matrix leve em canvas
- Seção Sobre com terminal simulado e placeholder de foto
- Seção premium Hack27 com badge, troféu, galeria preparada e competências
- Projetos com filtros, cards animados e modal de detalhes
- Stack visual com cards, badges e barras de sinal
- Estatísticas com contadores animados
- Timeline profissional
- Certificações e estudos com estrutura pronta para certificados reais
- Filosofia profissional em destaque
- Contato com GitHub, LinkedIn, e-mail, cópia de e-mail e formulário visual
- Command Palette acessível por botão ou `Ctrl+K`
- Easter egg profissional ao digitar `hack27`
- SEO básico com metadata, robots, sitemap e favicon
- Suporte a `prefers-reduced-motion`

## Como instalar

Instale o Node.js LTS e depois rode:

```bash
npm install
```

## Como rodar localmente

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

## Como gerar build

```bash
npm run build
```

Para iniciar o build localmente:

```bash
npm run start
```

## Lint e TypeScript

```bash
npm run lint
npm run typecheck
```

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Importe o projeto na Vercel.
3. Configure o framework como Next.js, caso a Vercel não detecte automaticamente.
4. Opcionalmente defina `NEXT_PUBLIC_SITE_URL` com a URL final do site.
5. Faça deploy.

## Estrutura de pastas

```text
src/
  app/
  components/
    layout/
    sections/
    ui/
  data/
  hooks/
  lib/
  types/
public/
  images/
    profile/
    projects/
    events/
    certifications/
    backgrounds/
    og/
  icons/
```

## Como trocar imagens

Substitua os arquivos em `public/images` mantendo os mesmos nomes, ou edite os caminhos nos arquivos de dados.

Arquivos principais preparados:

- `public/images/profile/profile-photo.jpg`
- `public/images/projects/finance-system-thumbnail.png`
- `public/images/projects/image-processing-thumbnail.png`
- `public/images/projects/horas-academy-thumbnail.png`
- `public/images/projects/crazy-cine-thumbnail.png`
- `public/images/events/hack27-team.jpg`
- `public/images/events/hack27-presentation.jpg`
- `public/images/events/hack27-award.jpg`
- `public/images/certifications/certificate-placeholder.png`
- `public/images/backgrounds/cyber-grid.png`
- `public/images/og/portfolio-og.png` para uma imagem social futura

Também existe um guia específico em `public/images/README.md`.

### Padrão recomendado

- Foto profissional: use `public/images/profile/profile-photo.jpg`.
- Imagens de projetos: use thumbnails ou prints em `public/images/projects/`.
- Imagens de eventos e hackathons: use `public/images/events/`.
- Imagens para previews sociais: use `public/images/og/`.

Se quiser trocar caminhos manualmente, edite:

- Foto profissional: `src/components/sections/About.tsx`.
- Projetos: `src/data/projects.ts`.
- Hack27/eventos: `src/components/sections/Hack27.tsx`.
- Certificações: `src/data/certifications.ts`.

## Como editar projetos

Edite `src/data/projects.ts`.

Cada projeto suporta:

- título
- categoria
- descrição
- tecnologias
- funcionalidades
- aprendizados
- imagem
- alt text
- link de GitHub opcional
- link de demo opcional

## Como editar tecnologias

Edite `src/data/technologies.ts`.

Ali ficam:

- tecnologias da matrix
- ticker de habilidades
- carrossel de habilidades
- ícones
- nível visual
- sinal/progresso

## Como editar contatos

Edite `src/data/profile.ts`.

Campos principais:

- `email`
- `githubUrl`
- `linkedinUrl`
- labels exibidas no site

O e-mail atual configurado no projeto é `marcosfilipe.macedo@gmail.com`.

## TypeScript e aliases de import

O `tsconfig.json` usa:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

Essa configuração é normal em projetos Next.js com imports absolutos. Ela permite importar arquivos como `@/components/ui/Button` em vez de usar caminhos relativos longos como `../../components/ui/Button`.

Neste projeto, `baseUrl` deve ser mantido porque o alias `@/*` depende dele e já é usado em vários componentes.

## Deploy no Render

Este projeto é um app Next.js. No Render, crie um **Web Service**, não um Static Site.

Configuração recomendada:

- Runtime: Node.
- Build Command: `npm ci && npm run build`.
- Start Command: `npm run start`.
- Publish Directory: deixe vazio, pois Web Service não usa pasta de publicação estática.

Variáveis de ambiente:

- `NEXT_PUBLIC_SITE_URL`: URL final do site no Render, por exemplo `https://seu-site.onrender.com`.

Observações:

- O `package-lock.json` deve ser versionado para o `npm ci` funcionar no Render.
- O comando `npm run start` executa `next start`, adequado para servir o build de produção do Next.js.
- Se preferir usar `npm install` no Render, ajuste o Build Command para `npm install && npm run build`.

## Observações de segurança

- Não há chaves de API, tokens ou credenciais no projeto.
- O formulário de contato é apenas visual e não envia dados para backend.
- Os textos de terminal, scan e acesso são apenas estéticos.
- A identidade hacker/cyber é ética e profissional; não há funcionalidades de invasão, exploração, phishing, malware ou coleta indevida.

## Personalização recomendada

- Validar o slug final do LinkedIn antes do deploy público.
- Substituir placeholders por fotos reais do perfil, Hack27, projetos e certificações.
- Definir `NEXT_PUBLIC_SITE_URL` no ambiente de produção.
