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
- Fundo cyber com grid sutil, scanner, glow e textura tecnológica leve
- Seção Sobre com terminal simulado e área preparada para foto profissional
- Seção premium Hack27 com badge, troféu, galeria preparada e competências
- Projetos com filtros, cards animados, contexto técnico e links externos
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

Se a porta `3000` já estiver ocupada, rode:

```bash
npm run dev -- -p 3002
```

E acesse:

```text
http://localhost:3002
```

Não abra arquivos como `src/app/page.tsx` diretamente no navegador. O projeto precisa rodar pelo servidor do Next.js para carregar React, Tailwind, CSS e assets em `/_next/static`.

## Como gerar build

```bash
npm run build
```

Para iniciar o build localmente:

```bash
npm run start
```

O comando `npm run start` só funciona depois de `npm run build`.

## Lint e TypeScript

```bash
npm run lint
npm run typecheck
```

## Node e dependências

- Node.js LTS recomendado: versão 20 ou 22.
- O projeto também funciona com Node 24 neste ambiente, mas para Vercel/local a faixa configurada é `>=20.11.0 <25`.
- O npm vem junto com o Node.js.
- Não é necessário instalar Next.js, Vite, Tailwind ou TypeScript globalmente.
- Não há arquivo `.env`, `.nvmrc` ou `.node-version` obrigatório.
- Para versionar e publicar pelo GitHub, instale Git.
- A Vercel CLI não é obrigatória; o deploy pode ser feito pelo site da Vercel conectado ao GitHub.

## Observação sobre Windows e OneDrive

Os scripts `dev`, `build`, `start` e `lint` chamam `scripts/next-runner.cjs`. Esse runner resolve o caminho real do projeto antes de executar o Next.js e limpa `.next` antes de `dev` e `build`.

Isso evita problemas no Windows quando o mesmo caminho aparece com casing diferente, por exemplo `OneDrive` e `Onedrive`. Esse conflito pode fazer o Webpack carregar módulos duplicados e causar erros como `Cannot read properties of null (reading 'useContext')` durante o prerender.

## Deploy na Vercel

Este projeto é um app Next.js, então na Vercel use a configuração padrão de Next.js.

1. Crie uma conta em `https://vercel.com`, se ainda não tiver.
2. Suba este projeto para um repositório no GitHub.
3. Na Vercel, escolha **Add New Project**.
4. Importe o repositório do GitHub.
5. Framework Preset: `Next.js`.
6. Install Command: `npm install` ou `npm ci`.
7. Build Command: `npm run build`.
8. Output Directory: deixe vazio. A Vercel detecta a saída do Next.js automaticamente.
9. Variável opcional: `NEXT_PUBLIC_SITE_URL` com a URL final do site.
10. Clique em **Deploy**.
11. Abra a URL publicada e confira a página inicial, `/robots.txt` e `/sitemap.xml`.

Arquivos que não devem ir para o GitHub já estão no `.gitignore`: `node_modules`, `.next`, `.env*`, logs, builds locais e caches TypeScript.

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
    hack27/
    certifications/
    backgrounds/
    og/
  icons/
```

## Como trocar imagens

Substitua os arquivos em `public/images` mantendo os mesmos nomes, ou edite os caminhos indicados abaixo.

Arquivos principais preparados:

- `public/images/profile/profile.png`
- `public/images/profile/profile2.png`
- `public/images/hack27/Team.jpg`
- `public/images/hack27/Team2.jpg`
- `public/images/hack27/Presentation.jpg`
- `public/images/hack27/Award.jpg`
- `public/images/hack27/Award2.jpg`
- `public/images/certifications/certificate-placeholder.png`
- `public/images/backgrounds/cyber-grid.png`
- `public/images/og/portfolio-og.png` para uma imagem social futura

Também existe um guia específico em `public/images/README.md`.

### Padrão recomendado

- Foto principal do Hero: use `public/images/profile/profile.png`.
- Foto complementar da seção Sobre: use `public/images/profile/profile2.png`.
- Imagens do Hack27: use `public/images/hack27/`.
- Projetos não usam imagem nos cards atualmente; os links ficam em `src/data/projects.ts`.
- Imagens para previews sociais: use `public/images/og/`.

Se quiser trocar caminhos manualmente, edite:

- Foto principal: `src/components/sections/Hero.tsx`.
- Foto complementar: `src/components/sections/About.tsx`.
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
- link externo
- label do botão
- tipo do link, como GitHub ou LinkedIn

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

## Observações de segurança

- Não há chaves de API, tokens ou credenciais no projeto.
- O formulário de contato é apenas visual e não envia dados para backend.
- Os textos de terminal, scan e acesso são apenas estéticos.
- A identidade hacker/cyber é ética e profissional; não há funcionalidades de invasão, exploração, phishing, malware ou coleta indevida.

## Personalização recomendada

- Validar o slug final do LinkedIn antes do deploy público.
- Substituir ou atualizar imagens reais do perfil, Hack27 e certificações quando necessário.
- Definir `NEXT_PUBLIC_SITE_URL` no ambiente de produção.
