# Validação: abertura Hyperspeed

Evolução de 5 de novembro de 2026, na branch `codex/hyperspeed-opening`. Os relatórios anteriores de redesign e foto descrevem versões históricas; este documento cobre a cena atual.

## Implementação e origem

- Base real: Hyperspeed TypeScript/CSS do React Bits, commit `4dc7b5b7772e1217c8fb8d2a7aa074302180e5b4`. Autoria, arquivos e licença completa preservados em THIRD_PARTY_NOTICES.md e licenses/React-Bits.md.
- Three.js 0.180.0 e @types/three 0.180.0, conforme a versão usada pela fonte consultada. Nenhum React Three Fiber, GSAP, iframe, vídeo de fundo, modelo ou textura externa.
- Um renderer, trilhas e postes instanciados; tubo com tesselação reduzida, vetores de câmera reutilizados, sem estado React por frame. Bloom desativado, sem passes de pós-processamento ativos. DPR máximo 1,5, ou 1 nos perfis compactos/modestos.
- Azul e verde nos dois temas, plano de fundo contínuo, máscaras de legibilidade e controles HTML. A fotografia principal aparece em Sobre e em retrato secundário na assinatura. Originais preservados.
- O mapa SVG completo foi removido. A ponte da trajetória usa uma nova origem semântica com seletores verificados, sem non-null assertions sobre o mapa antigo.

## Entrada e disponibilidade

O bootstrap local aplica tema e movimento antes da pintura e decide a entrada por sessão, âncora, histórico e scroll. Pular abertura funciona antes da hidratação. Tab, Escape, roda de rolagem e navegação também liberam a sequência. Nenhum bloqueio de body ou scroll.

Com recursos prontos, o monograma 2D desenha em aproximadamente 600ms, e a máscara revela a mesma cena em 400ms. Readiness depende de criação do renderer, render válido, ausência de erro WebGL e uma oportunidade de pintura subsequente; não apenas da existência do canvas. Falha da cena revela a perspectiva 2D. O timer independente de 1,9s no bootstrap libera o conteúdo mesmo se o chunk ainda estiver chegando.

Na execução funcional local final, a entrada percorreu pending em 16,6ms, revealing em 619,8ms e done em 1.023,4ms. No perfil móvel limitado da medição abaixo, a saída de segurança aconteceu aproximadamente 1,92s após o bootstrap; o primeiro frame 3D ficou pronto depois. O intervalo não é escondido nem tratado como LCP do canvas.

## Verificações

- `npm install`, reinstalação pelo lockfile, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` e `git diff --check`.
- Sete testes nativos Node cobrindo primeira sessão, reload, âncoras, histórico, scroll restaurado, movimento reduzido, pausa persistida, skip antes de React, eventos de navegação, storage bloqueado e saída de segurança.
- Chrome/Playwright contra build de produção local: larguras 320, 360, 720, 768, 1440 e 1920, temas claro/escuro, DPR de dispositivo 3 no celular e 2 no desktop. Reflow em 720 CSS pixels representa também a área útil de 1440px em zoom de 200%; não é um teste manual do menu de zoom.
- Doze combinações sem overflow ou violações automáticas axe-core WCAG 2 A/AA e 2.1 AA. Auditoria automática não substitui avaliação assistiva por uma pessoa.
- Comparação de pixels em 360, 768 e 1440 nos dois temas confirmou trilhas renderizadas e mudanças entre frames. Não apenas presença de canvas. Capturas revisadas para enquadramento, leitura, sobreposição e posição das ações.
- Quatro áreas por mouse, teclado e toque; seleção e texto corretos, associação de Automação ao projeto financeiro real. Aceleração limitada, soltar e perda de foco conferidos.
- Skip real no navegador, pressão/soltura por eventos de toque CDP, tema salvo após reload, troca de tema do sistema e retorno real do histórico com restauração de scroll conferidos em uma rodada adicional.
- Pausa cancela RAF; tema/seleção podem atualizar um único frame estático. Saída da tela interrompe a animação e scroll reverso a retoma. O ramo de aba oculta foi testado por visibilitychange simulado, não por observação manual de uma aba física em segundo plano.
- WebGL indisponível, chunk abortado, chunk atrasado em 3s, perda real de contexto via WEBGL_lose_context, storage bloqueado e prefers-reduced-motion: fallback/pausa corretos e nenhuma entrada presa.
- Sem JavaScript: título, textos, links e perspectiva estática disponíveis. As seleções dinâmicas dependem de JavaScript.
- Cinco projetos, detalhes do Sorteio de Times, galeria Hack27, busca de seções, âncoras e contato preservados. Formulário validado com resposta controlada na interface e endpoint local real em dry-run, sem envio de e-mail externo.
- Zero erros de console nas execuções normais. Erros de rede/criação WebGL provocados intencionalmente nos testes de falha são separados no relatório local.

## Medições de laboratório

Chrome headless em localhost, build de produção, contexto novo e sem cache de navegador. Perfil móvel: 360×820, CPU 4×, latência 150ms, download 1,6Mbps e upload 750Kbps via CDP. Desktop: 1440×1000. KB em base decimal. Recursos abaixo da dobra solicitados automaticamente pelo navegador entram nos bytes iniciais; não foram excluídos para atingir orçamento.

| Perfil | LCP | Primeiro frame 3D | CLS | Transferência inicial | Shell JS | Módulo 3D JS | JS total | Mídia/fonte |
| ------ | --- | ----------------- | --- | --------------------- | -------- | ------------ | -------- | ----------- |
| Desktop | 0,384s | 0,631s | 0,00041 | 426,1KB | 202,2KB | 133,5KB | 335,7KB | 66,6KB |
| Mobile | 0,892s | 3,384s | 0,00075 | 432,4KB | 202,2KB | 133,5KB | 335,7KB | 72,8KB |
| Mobile / reduzido | 0,908s | 3,376s | 0,00055 | 432,4KB | 202,2KB | 133,5KB | 335,7KB | 72,8KB |

As três partes JS assíncronas do módulo somaram **133,2KB gzip** medidos diretamente nos arquivos do build, incluindo Three.js e integração. Não foram escondidas como requests separados. O alvo adicional de 300KB foi atendido. O antigo orçamento de **250KB JS total foi excedido em aproximadamente 85,7KB**; shell e cena juntos são 335,7KB, não apenas os 202,2KB do shell.

LCP e CLS de laboratório e transferência inicial ficaram dentro dos alvos de 2,5s, 0,1 e 1MB. O primeiro frame 3D móvel demorou aproximadamente 3,4s sob limitação: o conteúdo e a perspectiva 2D foram liberados antes pela saída de segurança. Isso permanece uma limitação de carregamento do efeito, não uma medição de campo.

| Perfil | Draw calls | Triângulos | DPR efetivo |
| ------ | ---------- | ---------- | ----------- |
| Desktop | 8 | 42.168 | 1,5 |
| Mobile | 8 | 28.216 | 1 |

As amostras ficaram abaixo de 40 chamadas e 60 mil triângulos. No perfil reduzido, o renderer não manteve loop contínuo.

Na amostra de 90 frames, p95 de 30,1ms no desktop e 40ms nos dois perfis móveis. Não comprova 60fps em aparelhos físicos. Maior tarefa longa: 221ms no desktop, 206ms no móvel, 202ms no reduzido. Eventos sintéticos de seleção tiveram máximos de 64/120/128ms. Esses números não são INP de campo, percentil 75 ou uma nota de Lighthouse. Não foi usado aparelho físico nem executado Lighthouse.

## Segurança e dependências

A instalação identificou avisos preexistentes, incluindo Next.js 16.2.9. Atualizei para Next.js/eslint-config-next 16.4.5 e PostCSS 8.5.32, com transitivas corrigidas dentro dos ranges permitidos. React continua 18; não houve migração de framework, force, legacy-peer-deps ou downgrade para remover avisos.

`npm audit --omit=dev`: zero vulnerabilidades reportadas. Auditoria completa: oito alertas moderados na cadeia de desenvolvimento typescript-eslint/minimatch. A sugestão automática envolvia downgrade incompatível de eslint-config-next; não foi aplicada. O build também avisa sobre futura remoção de suporte a React 18 no Next 17, sem impedir o funcionamento atual. Não há promessa de segurança absoluta a partir da auditoria.

CSP, headers e API de contato preservados. Nenhuma chave ou arquivo de ambiente foi incluído. O arquivo de dry-run fica somente na pasta temporária ignorada.

## Evidências e publicação

Na pasta local ignorada `.tmp/hyperspeed`: `validation.json`, `performance.json`, `smoke.json`, capturas `360-*.png`, `768-*.png`, `1440-*.png`, `entrance.png`, e estados de fallback. As sequências gravadas `desktop-sequence.webm` (aproximadamente 902KB) e `mobile-sequence.webm` (749KB) registram entrada, aceleração, seleção e scroll. Capturas e vídeos não integram o commit.

O fluxo existente publica `main` na Vercel. Commit, push, pipeline e domínio atualizado são conferidos separadamente na entrega; nenhuma alteração de hospedagem, domínio ou controle de acesso é necessária.
