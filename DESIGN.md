# Conexões em movimento

Marcos Macêdo: redes, infraestrutura, NOC, segurança defensiva e automação.

## Direção

Escolha definitiva para a abertura: Hyperspeed, do React Bits, integrado em azul e verde à primeira tela, sem núcleo MM tridimensional. Depois da apresentação, Conexões em movimento ocupa um palco próprio, sem moldura, com cabos azuis e verde apenas nos pulsos. Nome, cargo, apresentação e ações permanecem HTML. A fotografia principal real está em Sobre, com um retrato pequeno na assinatura da abertura. Os arquivos originais foram preservados.

No desktop, a pista ocupa o fundo e ganha presença ao lado do nome; a máscara protege a leitura, especialmente no tablet. No celular, texto e ações vêm antes de uma pista compacta de 230px. As quatro seleções antigas deram lugar à narrativa cabo → MM → nó → trajetória. Seu conteúdo profissional foi preservado no Repertório técnico. Os três destinos que apareciam na cena foram retirados, junto de dependências e estilos órfãos; os cinco projetos e seus links reais continuam na seção própria.

O palco tem 82svh (mínimo 420px, máximo 1000px), em uma seção de 220svh com sticky nativo. São 18 fios e 180 amostras por fio, com curvas reamostradas por distância, trançado em profundidade e câmera em perspectiva. Chegada até 20%, assinatura legível entre 27–53%, transformação em nó entre 53–68%, nó estabilizado até 83% e saída até 100%. Um trefoil aberto forma os três lóbulos, com rotação lateral e inclinação. Trechos de cruzamento são ordenados por profundidade e mascaram o cabo posterior; o pulso também é ocultado quando passa atrás. O último fio acompanha o eixo real da trajetória, recalculado em resize. Não há texto explicativo, cards ou links no palco.

Até 700px, dois quadros de 360/210px ficam no fluxo, com assinatura e passagem, enquadramentos próprios e sem sticky. O quadro intermediário do nó é oculto via display:none, sem altura residual; o renderizador ignora Canvas com dimensões nulas. A sequência desktop com nó permanece inalterada e é restaurada no redimensionamento. SVG estático e HTML existem no servidor; Canvas é melhoria progressiva. A experiência como chaveiro ganha um loop de 4,8s: ramificação, chave vazada com dentes assimétricos, inserção, giro de cerca de um quarto de volta, pulso, retorno e recolhimento. Início e fim têm a mesma pose. IntersectionObserver e visibilitychange pausam as timelines CSS sem recriá-las; a preferência global e movimento reduzido pintam uma pose estática legível. O traço termina no item e reaparece na entrada de Sobre, sem atravessar o texto.

Projetos alternam uma demonstração real em destaque e uma lista de estudos expansíveis. Hack27 mantém fotografias reais e legendas, com seleção manual.

## Sistema

- Escuro: fundo #09121E, superfície #101E30, texto #E7EEF8, secundário #A7B8CE, ação #4C8DFF, sinal #65F5A2.
- Branco: fundo #FFFFFF, superfície #F5F8FC, texto #15263D, secundário #4C6079, ação #205BC5, sinal #08733C.
- Títulos: Space Grotesk variável, hospedada localmente (SIL OFL). Texto: sistema operacional. Escala por breakpoints, sem fonte proporcional à viewport.
- Linhas finas, cantos de até 8px, espaços abertos, poucas superfícies delimitadas. Azul organiza; verde sinaliza a seleção com ponto, rótulo e traço, além da cor.
- Azul é o padrão, inclusive com sistema claro. Apenas Azul e Branco são escolhas manuais; persistência existente mm-theme preserva dark/light e descarta system/valores inválidos para dark. Script local no head e data-theme do HTML aplicam a preferência antes da primeira pintura. Falha de storage permite a troca durante a visita. A troca não remonta a cena nem altera a rolagem.

## Movimento

Encaixe MM: SVG/CSS em tela inteira, com rotas angulares vindas das bordas, camadas e sinais verdes. Oito segmentos encaixam na geometria exata do Monogram oficial, mantendo os dois Ms separados e os pontos coloridos. Nome abaixo; máscara angular abre no vão da marca e revela o Hyperspeed existente. A camada fica no nível global de Preferences, fora do contexto de empilhamento do hero, para cobrir também o header. Observa a disponibilidade do hero; começa a revelar aos 3,6s e termina por volta de 4s, mantendo a marca montada visível por mais tempo. Não há botão de pular; a conclusão é automática, e o bootstrap libera a página em até 4,4s independentemente do módulo 3D. A sequência completa só ocorre na primeira entrada da sessão; âncoras, retorno de histórico, scroll restaurado, pausa e movimento reduzido a dispensam. Escape, Tab e navegação/foco também liberam a página. Sem percentuais artificiais, bloqueio do body ou dependência de fotografias abaixo da dobra. Navegadores sem máscara evenodd usam saída por opacidade.

Three.js direto na abertura, isolado em um chunk client; sem React Three Fiber, GSAP, modelos ou texturas remotas. A nova seção usa apenas Canvas 2D, sem outro motor 3D. A base real é Hyperspeed no commit `4dc7b5b7772e1217c8fb8d2a7aa074302180e5b4` do React Bits. Origem, autoria, licença e adaptações estão em THIRD_PARTY_NOTICES.md e licenses/React-Bits.md.

Um foguete personalizado em SVG acompanha o Encaixe MM abaixo do nome, sem cobrir a marca. Usa o Monogram oficial no casco, janela verde, chama e rastro animados em CSS, seguindo uma guia pontilhada durante a mesma abertura de 4s. O voo dura 3,45s, com atraso inicial de 80ms, terminando pouco antes da revelação. Não representa progresso de rede nem porcentagem; não adiciona bibliotecas ou recursos externos. Tokens adaptam as duas cores de tema, e a composição fica compacta em telas baixas. O foguete é decorativo, sem anúncio repetitivo para leitores de tela; pausa e movimento reduzido dispensam a abertura.

Curva gentle com curvatura 0,3; aceleração limitada a 1,65×, FOV 88–102 e gesto limitado a 1,4s. Soltar, perder foco, pausar ou ocultar a aba desfaz o boost. DPR limitado a 1,5, ou 1 em perfis compactos/modestos; densidades 42/28. Instâncias e vetores reutilizados; sem estado React por frame. Bloom desativado e nenhum passe de pós-processamento ativo.

Valores de scroll desaceleram a pista ao sair da abertura, sem bloquear rolagem. Canvas é importado só na interseção com rolagem iniciada; DPR limitado a 1,5, geometria, Path2D e fundo rasterizado reaproveitados enquanto o scroll está parado, pulso a até 30fps. Interseção, visibilidade e preferência global cancelam o RAF de cada cena. Falhas mantêm a composição estática; conteúdo e links permanecem acessíveis sem JavaScript. A ponte SVG usa a posição real da linha do tempo, sem atravessar o texto.

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

Evidências da rodada atual em .tmp/refinement, fora do Git; relatório em docs/refinement-validation.md. docs/connections-validation.md registra a primeira sequência com projetos, substituída pelo nó nesta rodada. docs/hyperspeed-validation.md registra a abertura anterior; docs/redesign-validation.md registra o redesign histórico.
