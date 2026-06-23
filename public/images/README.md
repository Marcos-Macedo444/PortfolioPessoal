# Portfolio Image Slots

Substitua os arquivos mantendo os mesmos nomes para atualizar as imagens sem alterar o código.

## Foto profissional

- `public/images/profile/profile-photo.jpg`

Use uma foto vertical ou quadrada. O componente corta a imagem em formato quadrado.

## Projetos

- `public/images/projects/finance-system-thumbnail.png`
- `public/images/projects/image-processing-thumbnail.png`
- `public/images/projects/horas-academy-thumbnail.png`
- `public/images/projects/crazy-cine-thumbnail.png`

Use prints, capas ou thumbnails em proporção próxima de 16:10.

## Eventos e hackathons

- `public/images/events/hack27-team.jpg`
- `public/images/events/hack27-presentation.jpg`
- `public/images/events/hack27-award.jpg`

Use fotos em proporção próxima de 16:9.

## Open Graph

- `public/images/og/portfolio-og.png`

Esse arquivo está reservado para uma imagem social futura. Quando for criado, adicione-o também aos metadados em `src/app/layout.tsx`.

## Onde editar caminhos manualmente

- Foto: `src/components/sections/About.tsx`
- Projetos: `src/data/projects.ts`
- Eventos Hack27: `src/components/sections/Hack27.tsx`
- Certificações: `src/data/certifications.ts`
