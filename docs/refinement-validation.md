# Validação: Encaixe MM, Temas e Nó

Recalibração posterior, em 7 de novembro de 2026: abertura ampliada para aproximadamente 4s, com revelação aos 3,6s, transição de 400ms e saída independente de segurança em 4,4s. O voo do foguete acompanha o novo intervalo (3,45s mais 80ms de atraso); a montagem da marca mantém o ritmo anterior. Continua sem botão de pular, uma vez por sessão e respeitando as preferências de movimento. Os registros de 2s abaixo são históricos.

Validação da duração ampliada: lint, tipos, 18 testes e build aprovados. Em 360×820/Azul e 1440×1000/Branco, a abertura permanecia ativa após 2,1s de observação, sem botão e com voo de 3,45s. Na amostra com cache quente, a saída foi observada aos 4,09s desde a navegação, incluindo 162ms de navegação. Recarga da sessão não repetiu a sequência; nenhum erro de console foi detectado. Capturas locais em `.tmp/refinement/rocket-four-seconds-*.jpg`.

Rodada de 6 de novembro de 2026, na branch `codex/refine-opening-knot-themes`, sobre a base `105a29d`. Este relatório substitui as descrições de tema automático, links de projetos na cena e chave executada uma vez dos relatórios históricos.

Ajuste posterior, em 7 de novembro de 2026: o quadro do nó foi oculto em telas de até 700px, sem espaço reservado ou desenho do Canvas oculto. A versão mobile passou a ter assinatura e passagem para a trajetória; o nó desktop foi preservado. Verificados 320, 360, 516, 700, 701, 768 e 1440px nos dois temas, ausência de espaço residual e overflow, cinco projetos e nó desktop após redimensionamento. Lint, tipos, 17 testes e build aprovados. Evidência local em `.tmp/refinement/mobile-no-knot.jpg`. As evidências abaixo registram a rodada original de três quadros.

Novo ajuste de duração em 7 de novembro de 2026: a abertura passou a durar aproximadamente 2s, com revelação aos 1,6s e transição de 400ms. O limite independente foi ajustado para 2,4s para não interromper a sequência normal. A montagem mantém o ritmo anterior; o tempo adicional fica com a marca pronta. Um foguete SVG com a marca MM, chama e rastro acompanha a espera abaixo do nome, nos tokens azul/verde e sem dependência externa ou progresso fictício. O botão de pular e seu CSS/listener foram removidos a pedido; saída por teclado/foco, sessão, âncoras, pausa e movimento reduzido são preservados. Os tempos de 1,5s/1,9s e o botão registrados abaixo pertencem à versão original.

Validação desse ajuste: lint, tipos, 18 testes e build aprovados. Revisão visível em 1440×1000, 360×820, 320×820 e 740×360, cobrindo Azul/Branco, movimento real do foguete, ausência de botão, limites da viewport e separação do nome. Duas amostras de navegação até a saída terminaram em aproximadamente 2,05s e 2,15s, incluindo navegação e observação pelo navegador. Pausa global dispensa a abertura; Escape libera imediatamente; recarga da mesma sessão não repete. Sem erros de console na revisão. Evidências locais em `.tmp/refinement/rocket-layout.json` e `rocket-*.jpg`; a primeira captura `rocket-desktop-blue.jpg` foi feita com aba em segundo plano e não representa a animação visível. `rocket-visible-blue.jpg` registra a revisão com a aba à vista.

## Implementação

- Encaixe MM em SVG/CSS de tela inteira: oito segmentos da marca oficial, rotas angulares, sinais verdes e máscara que se abre entre os dois Ms para revelar o Hyperspeed existente. A camada foi movida para o nível global da página para não ficar abaixo do header ou das seções seguintes.
- Aproximadamente 1,5s com o hero pronto; limite independente de 1,9s no bootstrap. Exibição uma vez por sessão, pulo antes da hidratação, Escape, Tab, foco, navegação e âncoras preservados. Sem trava de rolagem ou espera por fotografias.
- Azul como padrão, mesmo em sistema claro. Duas escolhas manuais, Azul/Branco, persistidas na chave existente `mm-theme`. Valores explícitos legados dark/light preservados; system, valores inválidos e ausência caem em dark. Tokens e renderizadores adaptados ao Branco real.
- Cabo → MM → nó de três lóbulos → trajetória, com geometria em profundidade projetada por Canvas 2D. Dezoito fios, 180 amostras, câmera lateral, oclusão por profundidade e pulso oculto atrás dos cruzamentos. Sem nova dependência, motor ou ativo remoto.
- Removidos somente os três destinos duplicados da cena. Os cinco projetos, seus links, filtros e detalhes permanecem na seção própria; conteúdo profissional, fotografia, Hack27 e contato preservados.
- Desktop: palco de 82svh em seção de 220svh. Até 700px: assinatura, nó e passagem em três quadros no fluxo. SSR/SVG para indisponibilidade de JavaScript, Canvas e movimento; o nó estático aparece também no quadro intermediário mobile.
- Chave residencial com loop de 4,8s, inserção, giro, sinal verde, retorno e recolhimento. Timelines CSS mantidas na pausa, sem compensação de tempo oculto. Pose estática durante pausa global e movimento reduzido.
- Módulo Canvas continua fora da entrada crítica; DPR máximo 1,5, buffers e raster reaproveitados, desenho limitado a aproximadamente 30fps, suspensão fora da tela/aba oculta e limpeza de listeners/observadores.

## Verificações

- `npm install`: dependências atualizadas, sem novos pacotes ou alteração no lockfile.
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` e `git diff --check`: aprovados.
- Dezesseis testes Node, incluindo defaults de tema, geometria oficial do Monogram, amostragem, continuidade reversível, cruzamentos com separação de profundidade, oclusão e alinhamento final em diferentes larguras.
- Playwright/Chrome contra build de produção local: 320, 360, 700, 768, 1440 e 1920 CSS pixels, cada largura em Azul e Branco. Verificações de pixels confirmam assinatura/nó não vazios e sinal em movimento. Sem overflow horizontal; axe WCAG 2 A/AA e 2.1 AA sem violações detectadas nos doze cenários.
- Troca de tema durante o nó mantém rolagem, progresso e abertura concluída. Scroll reverso recompõe a assinatura. Saída do cabo medida em x=82,5px para eixo real em x=83px no desktop testado.
- Bootstrap observado no navegador: entradas sem preferência, system, inválida, dark e light terminaram entre 1501–1509ms, com tema correto durante a abertura. Cache quente, nova aba, recarga da mesma sessão, Branco persistido e histórico exercitados.
- Chunks da aplicação bloqueados deliberadamente: botão Pular abertura, Escape, Tab, foco e hash liberam a página antes da hidratação; a saída de segurança funcionou em aproximadamente 1901ms. Falha de WebGL preserva o fallback e libera o hero; storage bloqueado mantém Azul e permite trocar durante a visita.
- Chave observada por três eventos naturais consecutivos de animationiteration: 4,8s, 9,6s e 14,4s. Pausa/retomada global, saída/retorno à tela, visibilidade da aba e movimento reduzido verificados por estados e tempos das oito animações. Comparação controlada das poses em 0/4800ms confirmou propriedades visuais idênticas na emenda.
- Suspensão de Canvas e Hyperspeed fora da tela; pausas e restauração de visibilidade verificadas. Aba oculta foi simulada com `document.hidden`/`visibilitychange`, não por observação manual de uma aba física.
- Sem JavaScript, movimento reduzido e Canvas 2D indisponível: composição estática legível. Navegação direta a Trajetória, resize, busca por teclado, galeria Hack27 e validação do formulário preservados.
- API de contato local testada com `CONTACT_FORM_DRY_RUN=true`, resposta 200 e dryRun verdadeiro, sem envio externo. Não foi enviado e-mail real nesta rodada. API, Resend e configuração de ambiente de produção não foram modificados.
- Sem erros de console/execução nos cenários normais. Falhas de rede e renderização provocadas intencionalmente foram avaliadas separadamente.
- `.env`, `.env.local` e `.env.production` permanecem ignorados; somente `.env.example` é rastreado. Nenhuma chave privada ou token dos padrões pesquisados foi encontrado nos arquivos rastreados. Isso não substitui uma auditoria completa de histórico de segredos.

## Medições Comparáveis

Mesmo computador, Chrome headless, build de produção e coletor `.tmp/connections/measure.cjs`. Base anterior `105a29d`, nova coleta após a implementação. Um contexto novo por perfil, sem testes de navegador concorrentes durante a coleta. Desktop 1440×1000/DPR de dispositivo 2; mobile 360×820/DPR 3, CPU 4× mais lenta, latência 150ms e rede 1,6Mbps/750Kbps.

| Métrica                                | Desktop antes → depois | Mobile antes → depois |
| -------------------------------------- | ---------------------- | --------------------- |
| LCP                                    | 280 → 332ms            | 920 → 932ms           |
| CLS                                    | 0,00301 → 0,00313      | 0,00105 → 0,00085     |
| Recursos iniciais, corpos comprimidos  | 411731 → 413203 bytes  | 418005 → 419477 bytes |
| JS inicial total, incluindo Hyperspeed | 335174 → 336345 bytes  | 335174 → 336345 bytes |
| Módulo da sequência, após rolagem      | 2797 → 3535 bytes      | 2797 → 3535 bytes     |
| Maior long task inicial                | 140 → 185ms            | 200 → 204ms           |
| p95 de 90 callbacks RAF na assinatura  | 10,1 → 10,1ms          | 10,1 → 10,1ms         |

O aumento inicial foi de 1472 bytes de recursos e 1171 bytes de JS; o módulo adiado cresceu 738 bytes. Os recursos excluem o documento HTML de navegação por definição do coletor. O total de JS inclui a abertura existente; o orçamento histórico de 250kB permanece excedido, sem desconto artificial do Three.js. LCP e CLS desta amostra ficaram dentro das metas locais de 2,5s e 0,1.

Os intervalos RAF não são FPS do Canvas ou INP. O renderizador desenha até aproximadamente 30fps, mesmo quando o navegador oferece callbacks mais frequentes. A coleta adicional durante wheel nativo, transformação e nó, com gravação habilitada, registrou 168 callbacks, p95=10,1ms, máximo=39,9ms, 43 desenhos e nenhuma long task. É uma amostra de laboratório, não garantia em todos os aparelhos. O Hyperspeed confirmou `running=false` durante a assinatura em ambos os perfis.

## Evidências e Limitações

Arquivos locais ignorados em `.tmp/refinement`: `intro.json`, `layout.json`, `interactions.json`, `fluency.json`, `opening-natural.png`, `knot-final.png`, `key-natural.png`, `qa-*` e `refinement-preview.webm`. A gravação registra abertura natural, percurso e três voltas da chave. As imagens `opening-dark/light/mobile` e `portal-*` da exploração inicial são estados controlados de inspeção, não medições de carregamento natural.

Resultados brutos comparáveis em `.tmp/connections/refinement-before-performance.json` e `refinement-after-performance.json`. Headless e emulação não substituem aparelho físico, leitor de tela ou sessão real de trackpad. Não há alegação de 60fps, INP de campo, entrega de e-mail na caixa postal ou compatibilidade irrestrita com firewalls corporativos.

O Next.js emite o aviso preexistente de depreciação do React 18 no Next 16. O build passa; migração de framework não faz parte desta alteração. Publicação e verificação do domínio são confirmadas separadamente na entrega, depois do push e do resultado da integração Vercel.
