# Portfolio Image Slots

Substitua os arquivos mantendo os mesmos nomes para atualizar as imagens sem alterar o código.

## Foto profissional

- `public/images/profile/profile.png`
- `public/images/profile/profile2.png`

`profile.png` aparece no Hero, ao lado do nome. `profile2.png` aparece na seção Sobre.

## Projetos

Os cards de projetos não usam imagens atualmente. Eles usam texto, tecnologias e links externos configurados em `src/data/projects.ts`.

## Eventos e hackathons

- `public/images/hack27/Team.jpg`
- `public/images/hack27/Team2.jpg`
- `public/images/hack27/Presentation.jpg`
- `public/images/hack27/Award.jpg`
- `public/images/hack27/Award2.jpg`

As imagens do Hack27 usam containers com `object-contain`, então retrato e paisagem ficam visíveis sem cortes agressivos.

## Open Graph

- `public/images/og/portfolio-og.png`

Esse arquivo está reservado para uma imagem social futura. Quando for criado, adicione-o também aos metadados em `src/app/layout.tsx`.

## Onde editar caminhos manualmente

- Foto principal do Hero: `src/components/sections/Hero.tsx`
- Foto complementar da seção Sobre: `src/components/sections/About.tsx`
- Projetos: `src/data/projects.ts`
- Eventos Hack27: `src/components/sections/Hack27.tsx`
- Certificações: `src/data/certifications.ts`
