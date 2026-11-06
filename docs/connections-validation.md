# Validação: Conexões em movimento

Evolução de 6 de novembro de 2026, branch `codex/scroll-driven-connections`, sobre `54d6c3c` da main. Este relatório complementa o histórico de [Hyperspeed](hyperspeed-validation.md), cuja abertura foi preservada.

## Implementação

- Substituição das quatro seleções por um palco amplo entre a apresentação e Trajetória. Seu conteúdo profissional passou ao Repertório técnico, sem narrativa de incidentes na cena.
- Canvas 2D, sem nova dependência, motor 3D, vídeo ou modelo externo. Dezoito fios azuis, dois pulsos verdes, geometria com profundidade e perspectiva. Curvas suavizadas, reamostradas por distância e interpoladas reversivelmente.
- Desktop: palco de 82svh em seção de 220svh, sticky nativo, assinatura estável e janela de leitura dos projetos. Mobile até 700px: três quadros no fluxo, com enquadramento próprio.
- Destinos reutilizados de `src/data/projects.ts`: aplicação pública do Futebol, publicação da Gestão Financeira e GitHub de Imagens. Nenhum destino novo inventado.
- Links HTML ficam inert quando ocultos; um link focado não desaparece. Nenhum bloqueio de scroll, foco ou acesso por âncoras.
- Saída ajustada à coordenada real do eixo da trajetória; resize e posição real do contêiner entram no cálculo. A ponte antiga e seu CSS comprovadamente órfão foram removidos.
- SVG junto à origem como chaveiro: cabeça vazada, dentes assimétricos desenhados em sequência, inserção, giro de 90 graus e pulso único. Gesto de 1,08s; estado final estático com pausa ou movimento reduzido. Retomada discreta do traço na abertura de Sobre.

## Ciclo de vida e fallback

O módulo Canvas só é solicitado quando a seção intersecta a viewport e a rolagem já começou. A composição SVG e os links existem no HTML do servidor e só cedem ao Canvas depois de um desenho real. Indisponibilidade de Canvas ou falha do módulo preserva essa composição.

DPR limitado a 1,5. Geometria projetada, buffers, Path2D e fundo rasterizado são reaproveitados enquanto o progresso não muda; apenas os pulsos são refeitos, a até 30fps. RAF e observadores são liberados na desmontagem; RAF suspenso fora da tela, com aba oculta ou pausa global. O Hyperspeed mantém seu próprio ciclo isolado e pausa fora da abertura.

## Verificações

- `npm install`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` e `git diff --check`.
- Doze testes Node: sete da entrada e cinco novos de amostragem, continuidade, progresso reversível, câmera estabilizada nos projetos e eixo de saída em diferentes larguras.
- Chrome/Playwright contra build de produção local em 320, 360, 700, 768, 1440 e 1920 CSS pixels, temas claro e escuro. Checagem de pixels confirma fios não vazios e pulso em movimento; links sem sobreposição ou overflow horizontal.
- Auditoria axe WCAG 2 A/AA e 2.1 AA nos doze cenários. Corrigido contraste preexistente do link de pular conteúdo, reutilizando `--on-blue`.
- Foco preservado durante mudança de ato, teclado, scroll reverso com tolerância ao arredondamento de pixels, pausa/retomada, resize, âncora direta de Trajetória, busca, galeria e cinco projetos preservados.
- Aba oculta exercitada por `visibilitychange` simulado, não por observação manual de uma aba física.
- Sem JavaScript, movimento reduzido e Canvas 2D indisponível: assinatura estática e três links acessíveis. Chave com estado final estático quando necessário.
- Formulário: validação de campos e endpoint local em `CONTACT_FORM_DRY_RUN=true`, sem envio externo. O código da API e as variáveis de produção não foram alterados.

## Medições antes e depois

Mesmo computador, Chrome headless, build de produção e script `.tmp/connections/measure.cjs`. Desktop: 1440×1000, DPR de dispositivo 2. Mobile: 360×820, DPR de dispositivo 3, CPU 4× mais lenta, latência de 150ms e rede de 1,6Mbps/750Kbps. Cache de navegador novo em cada contexto. Valores de uma amostra final, não estatística de campo.

| Métrica | Desktop antes → depois | Mobile antes → depois |
| --- | --- | --- |
| LCP | 328 → 420ms | 896 → 868ms |
| CLS | 0,00040 → 0,00301 | 0,00075 → 0,00105 |
| Recursos iniciais, corpos comprimidos | 411,6 → 411,7kB | 417,9 → 418,0kB |
| JavaScript inicial total, incluindo Hyperspeed | 335,7 → 335,2kB | 335,7 → 335,2kB |
| Novo módulo, somente depois da rolagem | 0 → 2,8kB | 0 → 2,8kB |
| Maior long task inicial | 139 → 180ms | 202 → 190ms |
| Intervalo p95 de 90 callbacks RAF | 10,1 → 30,0ms | 10,1 → 10,1ms |

Os bytes de recursos excluem o documento HTML de navegação, por definição do coletor; não são o peso total de todas as visitas. Os callbacks RAF foram amostrados na abertura antiga e na assinatura nova. Não são uma medição de FPS do Canvas nem de INP. O novo desenho tem teto intencional de 30fps e o movimento de câmera depende da rolagem, não desse indicador isolado.

O desktop teve atrasos variáveis em rodadas preliminares, inclusive 140ms p95 antes do cache de imagem. O fundo e os fios passaram a ser rasterizados somente quando a forma muda, e o DPR máximo caiu de 2 para 1,5. A tabela registra a rodada final após essa otimização, sem afirmar fluidez garantida em todos os dispositivos. Durante a assinatura, o contador do Hyperspeed confirmou `running=false`; o novo módulo não apareceu nas requisições da entrada.

LCP e CLS ficaram dentro das metas locais de 2,5s e 0,1. O orçamento histórico de 250kB de JS total continua excedido pela abertura existente; a nova cena não foi descontada artificialmente nem apresentada como solução desse orçamento.

## Evidências e limitações

Capturas, vídeo e relatórios brutos ficam em `.tmp/connections`, ignorado pelo Git. `mm-*`, `projects-*`, `key-*` e `connections-preview.webm` documentam a composição. Testes em Chrome headless com emulação não substituem revisão em aparelho físico, leitor de tela ou mouse/trackpad de um visitante real. Não há alegação de 60fps ou INP de campo.
