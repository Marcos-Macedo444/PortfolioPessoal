# Conexões em movimento

Marcos Macêdo: redes, infraestrutura, NOC, segurança defensiva e automação.

## Direção

Nome em escala editorial, quatro rotas selecionáveis e um monograma MM desenhado como percurso. Uma conexão da abertura continua no eixo da experiência; o scroll desenha o percurso, sem bloquear conteúdo ou rolagem. Projetos alternam uma demonstração real em destaque e uma lista de estudos expansíveis. Hack27 usa fotografias reais e legendas, com seleção manual.

## Sistema

- Escuro: fundo #09121E, superfície #101E30, texto #E7EEF8, secundário #A7B8CE, ação #4C8DFF, sinal #65F5A2.
- Claro: fundo #F5F8FC, superfície #FFFFFF, texto #15263D, secundário #4C6079, ação #205BC5, sinal #08733C.
- Títulos: Space Grotesk variável, hospedada localmente (SIL OFL). Texto: sistema operacional. Escala por breakpoints, sem fonte proporcional à viewport.
- Linhas finas, cantos de até 8px, espaços abertos, poucas superfícies delimitadas. Azul organiza; verde sinaliza a seleção com ponto, rótulo e traço, além da cor.
- Tema segue o sistema até escolha persistida. Script local no head aplica a preferência antes da primeira pintura.

## Movimento

Entrada SVG em 900ms; respostas em 180–320ms; easing cubic-bezier(.22,1,.36,1). Motion já existente, sem GSAP ou 3D. Valores de movimento ligam scroll ao traço sem estado React por frame. Sinais CSS só executam quando a rede está visível e a aba ativa. Controle global persistente pausa efeitos; prefers-reduced-motion remove deslocamentos. Conteúdo e links são visíveis sem animação.

## Conteúdo e preservação

Cargo: Técnico de Networking I — NOC, Vision Cybersecurity, tempo integral, setembro de 2026 — atual, Vitória/ES. Estágio preservado como anterior, sem inventar datas ausentes no histórico. Não existe currículo, diploma ou certificado para download no repositório. Os cinco projetos, canais de contato, API Resend, âncoras e busca de navegação são preservados. Percentuais de competência e contadores sem comprovação deixam de ser elementos de apresentação.

## Referências consultadas

- [Seas](https://seasgeosciences.com/): hierarquia entre áreas de serviço e narrativa espacial como direção; leitura de conteúdo disponível, sem afirmar observação de sua animação.
- [Ashfall / Carnilove](https://ashfall.studio/work/carnilove/): tipografia e regras de identidade que atravessam formatos. Sem copiar ativos ou código.
- Carnilove ao vivo, Daiki Fujita e Awwwards: acesso pelo leitor web indisponível nesta sessão; briefing suficiente para continuar.
- [Motion useScroll](https://motion.dev/docs/react-use-scroll), [animações eficientes](https://web.dev/articles/animations-guide), [Web Vitals](https://web.dev/articles/vitals).

## Validação

Capturas temporárias e medições locais ficam em .tmp/redesign, fora do Git. Metas: LCP ≤2,5s, CLS ≤0,1, INP de campo p75 ≤200ms; 1MB inicial comprimido e 250KB JS comprimido. Medições de laboratório não representam INP de campo. Resultados e limitações: docs/redesign-validation.md.
