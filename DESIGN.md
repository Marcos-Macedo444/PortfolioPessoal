# Conexões em movimento

Marcos Macêdo: redes, infraestrutura, NOC, segurança defensiva e automação.

## Direção

Escolha definitiva: Hyperspeed, do React Bits, integrado em azul e verde à primeira tela. Esta decisão substitui a restrição anterior de não usar 3D e a proposta de núcleo MM tridimensional. Há somente uma cena, sem moldura de demonstração; nome, cargo, apresentação e ações permanecem HTML. A fotografia principal real foi para Sobre, com um retrato pequeno na assinatura da abertura. Os arquivos originais foram preservados.

No desktop, a pista ocupa o fundo e ganha presença ao lado do nome; a máscara protege a leitura, especialmente no tablet. No celular, texto e ações vêm antes de uma pista compacta de 230px, ainda na abertura, sem altura rígida de viewport. Quatro controles HTML preservam Redes, NOC, Segurança e Automação e seus dados reais, sem repetir o mapa 2D completo. A ligação com a trajetória passa a usar uma origem semântica própria, não seletores do mapa removido.

Projetos alternam uma demonstração real em destaque e uma lista de estudos expansíveis. Hack27 mantém fotografias reais e legendas, com seleção manual.

## Sistema

- Escuro: fundo #09121E, superfície #101E30, texto #E7EEF8, secundário #A7B8CE, ação #4C8DFF, sinal #65F5A2.
- Claro: fundo #F5F8FC, superfície #FFFFFF, texto #15263D, secundário #4C6079, ação #205BC5, sinal #08733C.
- Títulos: Space Grotesk variável, hospedada localmente (SIL OFL). Texto: sistema operacional. Escala por breakpoints, sem fonte proporcional à viewport.
- Linhas finas, cantos de até 8px, espaços abertos, poucas superfícies delimitadas. Azul organiza; verde sinaliza a seleção com ponto, rótulo e traço, além da cor.
- Tema segue o sistema até escolha persistida. Script local no head aplica a preferência antes da primeira pintura.

## Movimento

Entrada de marca em traço 2D: aproximadamente 600ms até a revelação e 400ms de saída quando o primeiro frame da cena está pronto. O bootstrap local oferece Pular abertura antes da hidratação e libera a página em até 1,9s, independentemente do módulo 3D. A sequência completa só ocorre na primeira entrada da sessão; âncoras, retorno de histórico, scroll restaurado, pausa e movimento reduzido a dispensam. Sem percentuais artificiais, bloqueio do body ou dependência de fotografias abaixo da dobra.

Three.js direto, isolado em um chunk client; sem React Three Fiber, GSAP, modelos, texturas remotas ou renderer extra. A base real é Hyperspeed no commit `4dc7b5b7772e1217c8fb8d2a7aa074302180e5b4` do React Bits. Origem, autoria, licença e adaptações estão em THIRD_PARTY_NOTICES.md e licenses/React-Bits.md.

Curva gentle com curvatura 0,3; aceleração limitada a 1,65×, FOV 88–102 e gesto limitado a 1,4s. Soltar, perder foco, pausar ou ocultar a aba desfaz o boost. DPR limitado a 1,5, ou 1 em perfis compactos/modestos; densidades 42/28. Instâncias e vetores reutilizados; sem estado React por frame. Bloom desativado e nenhum passe de pós-processamento ativo.

Valores de scroll desaceleram a pista ao sair da abertura e desenham a ponte 2D para a trajetória, sem bloquear rolagem. Interseção, visibilidade da aba e preferência global cancelam o RAF; uma atualização estática pode redesenhar um frame quando tema/seleção mudam durante a pausa. Falha do chunk, WebGL, primeiro frame ou perda de contexto mantém uma perspectiva 2D e controles funcionais. A largura móvel reduz qualidade, não força fallback. Conteúdo e links permanecem acessíveis sem JavaScript.

## Conteúdo e preservação

Cargo: Técnico de Networking I — NOC, Vision Cybersecurity, tempo integral, setembro de 2026 — atual, Vitória/ES. Estágio preservado como anterior, sem inventar datas ausentes no histórico. Não existe currículo, diploma ou certificado para download no repositório. Os cinco projetos, canais de contato, API Resend, âncoras e busca de navegação são preservados. Percentuais de competência e contadores sem comprovação deixam de ser elementos de apresentação.

## Referências consultadas

- [Seas](https://seasgeosciences.com/): hierarquia entre áreas de serviço e narrativa espacial como direção; leitura de conteúdo disponível, sem afirmar observação de sua animação.
- [Ashfall / Carnilove](https://ashfall.studio/work/carnilove/): tipografia e regras de identidade que atravessam formatos. Sem copiar ativos ou código.
- Carnilove ao vivo, Daiki Fujita e Awwwards: acesso pelo leitor web indisponível nesta sessão; briefing suficiente para continuar.
- [Motion useScroll](https://motion.dev/docs/react-use-scroll), [animações eficientes](https://web.dev/articles/animations-guide), [Web Vitals](https://web.dev/articles/vitals).
- [Hyperspeed / React Bits](https://reactbits.dev/backgrounds/hyperspeed), incorporado como base real, não como iframe ou vídeo.

## Validação

Metas: LCP ≤2,5s, CLS ≤0,1, INP de campo p75 ≤200ms e transferência inicial ≤1MB. O orçamento anterior de 250KB de JS total continua como referência; com a cena, o relatório separa shell, módulo 3D e soma real, sem excluir o que carrega na entrada. Alvo adicional do módulo: ≤300KB gzip, ≤40 draw calls e ≤60 mil triângulos. Medições locais não representam dados de campo ou aparelhos físicos.

Evidências atuais em .tmp/hyperspeed, fora do Git; relatório em docs/hyperspeed-validation.md. Os resultados em docs/redesign-validation.md descrevem as versões anteriores, não a abertura Hyperspeed.
