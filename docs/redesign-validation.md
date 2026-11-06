# Validação do redesign / Conexões em movimento

Entrega de 5 de novembro de 2026. Branch de implementação: `codex/conexoes-portfolio-redesign`.

Registro histórico do redesign 2D e do refinamento da foto. A evolução atual com Hyperspeed e seus novos orçamentos está em [hyperspeed-validation.md](hyperspeed-validation.md).

## Escopo conferido

Next.js/React/TypeScript/Tailwind e Framer Motion existentes. Não foram adicionadas dependências de execução. Space Grotesk acompanha licença SIL OFL e é servida localmente. A imagem do Sorteio de Times é uma captura real da aplicação pública; imagens pessoais e do Hack27 foram preservadas.

O cargo atual, a empresa e o período foram atualizados na abertura, apresentação, experiência, README, metadata social e dados estruturados Person. O estágio permanece histórico; o repositório e seu histórico não forneceram datas verificáveis. Não foi encontrado currículo editável ou arquivo para download, nem versões em outros idiomas para sincronizar.

## Revisão visual e funcional

- Referência visual anterior em `.tmp/redesign/before-desktop.png`.
- Rodada de crítica e correção: dimensão da rede e da abertura; continuidade geométrica recalculada no redimensionamento; controles de tema no header para liberar o conteúdo mobile; nome acessível do monograma no tablet; contraste no estado hover; persistência da pausa na hidratação.
- Playwright com Chrome instalado, contra `npm run start`, em 320, 360, 768 e 1440 CSS pixels, nos temas claro e escuro.
- Sem overflow horizontal nas oito combinações; conteúdo principal disponível com JavaScript desativado.
- Reflow adicional em 720 CSS pixels com densidade 2, equivalente à área útil de 1440px em zoom 200%, sem overflow. Não representa um teste manual do menu de zoom do navegador.
- Seleção por toque em contexto mobile com `hasTouch`; os quatro repositórios de software e a aplicação pública do Sorteio de Times responderam HTTP 200.
- Seleções persistentes das quatro áreas, mouse/teclado, vínculo da área Automação apenas ao projeto financeiro real; demais áreas sem associação inventada a projetos.
- Âncora direta para trajetória, rolagem nativa e reversa; busca de navegação e modal nativo; menu mobile.
- Filtros de projetos, estado sem resultados, cinco projetos preservados, detalhes com todas as funcionalidades e aprendizados; links de demonstração, GitHub e LinkedIn preservados.
- Galeria do Hack27: navegação manual entre cinco registros reais, sem autoplay.
- Temas claro/escuro/sistema, troca da preferência do sistema, persistência após reload; pausa persistida e prefers-reduced-motion.
- Formulário: erros de campo, foco no primeiro erro, sucesso/reset da interface com resposta controlada. Rota real local validada separadamente: HTTP 200 com `dryRun: true` para conteúdo válido; HTTP 400 com erros para conteúdo vazio. Nenhum e-mail real foi enviado nesta tarefa.
- CSP do build local sem `unsafe-eval`, com os demais headers de segurança preservados. Fonte IPv6 inválida removida da lista de conexões somente de desenvolvimento.

Auditoria automática: axe-core, regras WCAG 2 A/AA e 2.1 AA, em ambas as aparências e quatro larguras. Os achados da primeira rodada foram corrigidos; a rodada final passou com zero violações automáticas e sem erros no console. O resultado é registrado no arquivo local `.tmp/redesign/audit.json`. Auditoria automática não substitui avaliação assistiva por uma pessoa.

## Medições de laboratório

Build de produção em localhost, Chrome headless, cache de navegador novo por perfil. Perfil móvel: viewport de 360×820, CPU 4× mais lenta, 150ms de latência, 1,6Mbps de download e 750Kbps de upload via CDP. Dados de transferência são `encodedBodySize`, incluindo documento, fonte, CSS, JS e mídia solicitados no carregamento antes de rolar. Os KB abaixo usam base decimal.

| Perfil                      | LCP    | CLS    | Transferência inicial | JS inicial |
| --------------------------- | ------ | ------ | --------------------- | ---------- |
| Desktop                     | 0,284s | 0,0021 | 287,9KB               | 192,8KB    |
| Mobile / efeitos ligados    | 0,884s | 0,0008 | 281,9KB               | 192,8KB    |
| Mobile / movimento reduzido | 0,968s | 0,0008 | 281,9KB               | 192,8KB    |

Metas do briefing mantidas: LCP ≤2,5s, CLS ≤0,1, transferência inicial ≤1MB e JavaScript inicial ≤250KB. Esses quatro alvos foram atendidos nesta medição local. Arquivo de evidência: `.tmp/redesign/performance.json`.

Na carga móvel foram observadas duas tarefas longas, com máximo de 224ms (efeitos ligados) e 267ms (reduzidos). As amostras de eventos das seleções tiveram duração máxima de 48ms com efeitos ligados. São observações de laboratório, não INP de campo nem percentil 75.

Na amostragem de 90 frames durante rolagem, o p95 ficou em aproximadamente 40ms em ambos os modos. A cadência do navegador headless neste ambiente ficou perto de 25fps mesmo com os efeitos desligados; esse teste não comprova 60fps em aparelhos físicos. Recomenda-se observação em dispositivos reais. Não foi executado Lighthouse e não há nota de Lighthouse ou Core Web Vitals de campo declarada nesta entrega.

## Capturas locais

Na pasta ignorada `.tmp/redesign`:

- `desktop-dark.png` e `desktop-light.png`: abertura desktop.
- `mobile-dark.png` e `mobile-light.png`: abertura mobile.
- `desktop-dark-full.png`, `desktop-light-full.png`, `mobile-dark-full.png`, `mobile-light-full.png`: conjunto completo, com mídia carregada.
- `jornada-*.png`, `projetos-*.png`, `hack27-*.png`, `contato-*.png`: recortes representativos.

Capturas, ferramentas de QA e caches permanecem fora do commit. Prettier e axe-core foram usados somente em `.tmp/qa`; `package.json` e `package-lock.json` não foram alterados.

## Refinamento: foto principal na abertura

Branch `codex/hero-profile-photo`. A fotografia original `profile.png` aparece em destaque ao lado do nome no desktop e logo após o cargo no celular. O arquivo original foi preservado; Next/Image usa carregamento prioritário, tamanhos responsivos e espaço reservado. A rede interativa fica abaixo, mantendo sua continuidade com a trajetória.

- Build, lint, typecheck e `git diff --check` passaram, sem novas dependências.
- Playwright e axe-core: 320, 360, 768, 1024, 1440 e 1920 CSS pixels nos dois temas. Zero overflow horizontal, violações automáticas WCAG 2 A/AA e 2.1 AA, erros de console ou requisições com falha.
- Conferidos enquadramento, presença da foto na abertura, separação entre textos e imagem, seleção das quatro áreas, teclado, toque, âncora da trajetória, preferência de tema persistida e movimento reduzido. Nome, fotografia e links permanecem disponíveis sem JavaScript.
- Capturas e resultados locais: `.tmp/hero-photo/1440-dark.png`, `1440-light.png`, `360-dark.png`, `360-light.png`, `768-dark.png`, `validation.json` e `performance.json`. Os arquivos continuam fora do Git.

Nova amostra de laboratório no build de produção local, sem cache de navegador e com o mesmo perfil móvel limitado descrito acima:

| Perfil | LCP | CLS | Transferência inicial | JS inicial | Foto principal |
| ------ | --- | --- | --------------------- | ---------- | -------------- |
| Desktop | 0,336s | 0,00039 | 319,8KB | 192,9KB | 39,2KB |
| Mobile | 1,140s | 0,00077 | 303,8KB | 192,9KB | 23,2KB |

São medições pontuais de laboratório, não dados de campo nem garantia de desempenho em todos os dispositivos.

## Publicação

O fluxo existente associa a `main` à produção na Vercel. O resultado do push, do pipeline e da verificação do domínio será informado na entrega, distinguindo cada etapa. Não foram alteradas configurações de domínio, conta ou hospedagem.
