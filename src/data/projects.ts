export type ContentBlock =
  | { type: "heading"; text: string; size?: "lg" | "sm" }
  | { type: "text"; body: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string; full?: boolean }
  | { type: "gallery"; images: { src: string; alt?: string }[] }
  | { type: "label"; text: string }
  | { type: "metrics"; items: { value: string; label: string }[] }
  | { type: "divider" }
  | { type: "video"; src: string; caption?: string }
  | { type: "highlight"; body: string };

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image?: string;
  banner?: string;
  gif?: string;
  video?: string;
  size: "normal" | "tall" | "wide";
  blocks: ContentBlock[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "controle-de-acesso",
    title: "Controle de Acesso",
    category: "Product Design",
    size: "wide",
    video: "/img/desk-showcase.mp4",
    blocks: [
      { type: "label", text: "Product Design · apepê · 2024" },
      { type: "heading", text: "Controle de Acesso", size: "lg" },
      { type: "text", body: "Em **5 visitas a campo** e **10 entrevistas com porteiros**, uma queixa se repetiu: o software de controle de acesso tinha tanta coisa em tela que **atrapalhava mais do que ajudava** — justamente nos momentos de maior sobrecarga." },
      { type: "divider" },
      { type: "label", text: "CONTEXTO" },
      { type: "heading", text: "O módulo que faltava para fechar o contrato", size: "sm" },
      { type: "text", body: "O Controle de Acesso é um módulo do Desk, app de gestão condomínial da apepê — empresa que também mantém o app voltado para a experiência dos moradores nos condomínios." },
      { type: "text", body: "O Controle de Acesso era o ponto de virada em conversas comerciais avançadas: condomínios interessados no ecossistema apepê, mas que não podiam migrar porque a plataforma não tinha uma função presente em todos os concorrentes. Sem ela, **o contrato não fechava**." },
      { type: "divider" },
      { type: "label", text: "MEU PAPEL" },
      { type: "list", items: ["Pesquisa de Campo", "Mapeamento de Fluxos", "Wireframes", "Protótipos de alta fidelidade"] },
      { type: "divider" },
      { type: "label", text: "RESULTADOS" },
      { type: "metrics", items: [
        { value: "Produto chave", label: "Abriu portas para novos condomínios" },
        { value: "+1000", label: "Novos usuários ativos" },
      ]},
      { type: "divider" },
      { type: "label", text: "PROCESSO DE DESIGN" },
      { type: "heading", text: "O que os porteiros tinham a dizer", size: "sm" },
      { type: "text", body: "Imersão em campo com entrevistas abertas e observação direta nas portarias — mapeando rotinas, dores dos porteiros, moradores, visitantes e prestadores, e analisando os sistemas concorrentes em uso real." },
      { type: "divider" },
      { type: "label", text: "O QUE ENCONTRAMOS EM CAMPO" },
      { type: "list", items: [
        "Sobrecarga de tarefas — as tarefas principais precisavam estar logo de cara.",
        "Processo analógico, manual e improvisado.",
        "Interfaces concorrentes pouco intuitivas.",
      ]},
      { type: "text", body: "\"Tem hora que chega entregador, visitante e o interfone toca ao mesmo tempo... não tem sistema que ajude.\"" },
      { type: "text", body: "Todos os concorrentes observados em campo integravam hardware — catracas, câmeras, leitores de cartão. Para a primeira versão, essa integração **não era viável** por limitações técnicas e de prazo. A decisão foi focar na experiência do fluxo manual e garantir que o software funcionasse excepcionalmente bem dentro desse escopo." },
      { type: "image", src: "/img/controle-de-acesso/Image.jpg", alt: "Interface de software concorrente observada em campo", caption: "Interface de software concorrente observada durante a pesquisa de campo" },
      { type: "divider" },
      { type: "heading", text: "Transformando campo em solução", size: "sm" },
      { type: "image", src: "/img/controle-de-acesso/Image-1.jpg", alt: "Diagrama de fluxo do Controle de Acesso", caption: "Mapeamento dos fluxos por perfil de usuário" },
      { type: "divider" },
      { type: "heading", text: "Wireframes", size: "sm" },
      { type: "text", body: "Wireframes para validar a lógica de navegação e alinhar com stakeholders e devs antes de partir para o visual." },
      { type: "image", src: "/img/controle-de-acesso/Image-2.jpg", alt: "Wireframes no quadro branco", caption: "Ideação inicial de interface no quadro branco" },
      { type: "divider" },
      { type: "heading", text: "Protótipo", size: "sm" },
      { type: "image", src: "/img/controle-de-acesso/showreel.mp4", alt: "Showreel do fluxo de Controle de Acesso", caption: "Showreel do fluxo de Controle de Acesso" },
      { type: "image", src: "/img/controle-de-acesso/Image-3.jpg", alt: "Protótipo de alta fidelidade do Controle de Acesso", caption: "Protótipo de alta fidelidade — Histórico de Acesso" },
      { type: "image", src: "/img/controle-de-acesso/Frame 857.jpg", alt: "Histórico de acesso com modal de seleção de visitante", caption: "Fluxo de registro de acesso — seleção de visitante cadastrado" },
      { type: "image", src: "/img/controle-de-acesso/Frame 864.jpg", alt: "Formulário de cadastro de novo visitante", caption: "Formulário de cadastro de novo visitante" },
      { type: "divider" },
      { type: "label", text: "O QUE ESSE PROJETO MUDOU" },
      { type: "highlight", body: "Foi o primeiro projeto em que saí da tela para ir ao campo — conversar pessoalmente com porteiros e observar o trabalho deles de perto. Essa experiência mudou a forma como entendo pesquisa: dados e entrevistas remotas têm valor, mas **há algo insubstituível em ver o usuário no ambiente onde o problema de fato acontece**." },
    ],
  },
  {
    id: 2,
    slug: "apepe-cadastro",
    title: "apepê · Cadastro",
    category: "Product Design",
    size: "wide",
    video: "/img/project-1/thumbnail.mp4",
    blocks: [
      { type: "label", text: "Product Design · apepê · 2023" },
      { type: "heading", text: "Cadastro & Vínculo Condominial", size: "lg" },
      { type: "text", body: "Um cadastro com falha **não afetava só o morador** — afetava o condomínio inteiro. Reclamações no suporte e risco de churn motivaram o redesign do fluxo de vínculo condominial, validado com **15 participantes** em testes de usabilidade." },
      { type: "divider" },
      { type: "label", text: "CONTEXTO" },
      { type: "text", body: "O apepê reúne serviços do dia a dia condominial — reserva de espaços, mercadinho autônomo e mais — diretamente pelo app." },
      { type: "divider" },
      { type: "label", text: "COMPREENSÃO" },
      { type: "heading", text: "Problema", size: "sm" },
      { type: "text", body: "Para acessar as funcionalidades do app, o usuário precisava comprovar seu vínculo com o condomínio já no momento do cadastro. O desafio era permitir esse processo de verificação sem expor publicamente informações internas do condomínio — como nomes, áreas comuns ou regras — para qualquer pessoa que baixasse o app." },
      { type: "heading", text: "Solução", size: "sm" },
      { type: "text", body: "Após o cadastro, o app orienta o usuário de forma intuitiva para se vincular ao seu condomínio. Durante a implantação, QRCodes únicos foram distribuídos para levar o morador diretamente ao fluxo de cadastro vinculado ao seu prédio, garantindo segurança e reduzindo fricções." },
      { type: "divider" },
      { type: "label", text: "MEU PAPEL" },
      { type: "list", items: [
        "UX Design — Criação de fluxos, wireframes, interfaces e protótipos de alta fidelidade para web e mobile.",
        "UX Research — Condução de entrevistas, análise de jornada do usuário, definição de hipóteses e validação com dados qualitativos.",
        "Prototipação — Desenvolvimento de protótipos navegáveis com foco em testes e iteração rápida.",
        "Testes de Usabilidade — Planejamento, execução e análise de testes com usuários para avaliar eficiência, clareza e acessibilidade do fluxo.",
      ]},
      { type: "divider" },
      { type: "label", text: "PROCESSO DE DESIGN" },
      { type: "heading", text: "De onde o usuário parte", size: "sm" },
      { type: "text", body: "Para compreender melhor o fluxo de entrada no app, desenhei a jornada do usuário considerando o ponto inicial: a leitura do QRCode fixado no condomínio." },
      { type: "image", src: "/img/project-1/userflow_condominium-conection.png", alt: "User Journey Map", caption: "Jornada do usuário a partir da leitura do QRCode" },
      { type: "text", body: "A jornada nos ajudou a identificar que os usuários precisariam ser orientados de forma clara em cada etapa. Durante esse mapeamento, surgiram pontos de dúvida recorrentes, especialmente relacionados ao momento de validação e vínculo com o condomínio." },
      { type: "divider" },
      { type: "heading", text: "Testando antes de construir", size: "sm" },
      { type: "text", body: "Protótipo de alta fidelidade em Figma + ProtoPie — nível de fidelidade essencial para testar com usuários de menor familiaridade com tecnologia." },
      { type: "video", src: "https://player.vimeo.com/video/793933696?h=c6d9d6c0f5&autoplay=1&loop=1", caption: "Protótipo navegável — Figma + ProtoPie" },
      { type: "image", src: "/img/project-1/main_screens.png", alt: "Telas principais do protótipo", caption: "Principais telas do protótipo de alta fidelidade" },
      { type: "divider" },
      { type: "heading", text: "15 pessoas, 3 tarefas, 1 descoberta", size: "sm" },
      { type: "text", body: "Com o protótipo pronto, realizamos testes de usabilidade com 15 participantes. Demos prioridade à seleção de usuários extremos — pessoas com pouca ou nenhuma experiência com aplicativos e usuários com idade avançada. A hipótese era que, se o fluxo funcionasse bem para esses grupos, os demais usuários também teriam uma boa experiência." },
      { type: "text", body: "Aplicamos o primeiro teste com os 10 primeiros participantes. A partir do feedback, realizamos ajustes e validamos novamente o fluxo com os 5 usuários restantes, já com a versão otimizada." },
      { type: "text", body: "A descoberta mais surpreendente: havia um vídeo explicativo mostrando como escanear o QRCode para realizar o vínculo. Os usuários simplesmente **não o viam** — pulavam direto para a próxima tela e ficavam perdidos. A solução foi substituir o vídeo por uma tela da câmera ativa com uma instrução direta e contextual, apresentada no momento exato em que a ação era necessária." },
      { type: "label", text: "ROTEIRO — 3 TAREFAS" },
      { type: "list", items: ["Realizar o cadastro", "Validar o e-mail", "Solicitar vínculo condominial"] },
      { type: "heading", text: "1. Realizar o cadastro", size: "sm" },
      { type: "image", src: "/img/project-1/usability_test/1_sign_in_before.png", alt: "Cadastro — antes", caption: "Antes" },
      { type: "image", src: "/img/project-1/usability_test/1_sign_in_after.png", alt: "Cadastro — depois", caption: "Depois — principais alterações após os primeiros testes" },
      { type: "heading", text: "2. Validar e-mail", size: "sm" },
      { type: "image", src: "/img/project-1/usability_test/2_email_validation_before.png", alt: "Validação de e-mail — antes", caption: "Antes" },
      { type: "image", src: "/img/project-1/usability_test/2_email_validation_after.png", alt: "Validação de e-mail — depois", caption: "Depois — principais alterações após os primeiros testes" },
      { type: "heading", text: "3. Solicitar vínculo condominial", size: "sm" },
      { type: "image", src: "/img/project-1/usability_test/3_condominium_conection_before.png", alt: "Vínculo condominial — antes", caption: "Antes" },
      { type: "image", src: "/img/project-1/usability_test/3_condominium_conection_after.png", alt: "Vínculo condominial — depois", caption: "Depois — principais alterações após os primeiros testes" },
      { type: "divider" },
      { type: "heading", text: "4. Compilação dos Dados & Métricas", size: "sm" },
      { type: "text", body: "Ao final dos testes, aplicamos a Escala SUS (System Usability Scale) com 10 afirmações para cada usuário, a fim de medir a percepção de usabilidade de forma estruturada. Cada item foi avaliado numa escala de 1 (discordo plenamente) a 5 (concordo plenamente)." },
      { type: "label", text: "MÉTRICAS COLETADAS" },
      { type: "list", items: [
        "Tempo médio de realização de tarefa",
        "Taxa de sucesso por tarefa",
        "Quantidade média de erros",
        "Número médio de cliques por fluxo",
      ]},
      { type: "divider" },
      { type: "label", text: "RESULTADOS" },
      { type: "metrics", items: [
        { value: "Cat. A", label: "Escala SUS — nível mais alto de usabilidade" },
        { value: "93%", label: "Taxa de sucesso" },
        { value: "3 min", label: "Tempo médio por tarefa" },
        { value: "1 erro", label: "Média de erros por usuário" },
      ]},
      { type: "divider" },
      { type: "highlight", body: "Após o lançamento, o número de chamados caiu significativamente. O caso mais revelador veio de condomínios de alta rotatividade — hostels e AirBnb — onde os usuários conseguiam se vincular de forma **totalmente autônoma**, sem precisar de auxílio do síndico ou da administração." },
    ],
  },
  {
    id: 9,
    slug: "redesign-physical-tracking",
    title: "Redesign Physical Tracking",
    category: "Product Design",
    size: "normal",
    video: "/img/physical/physical-showcase.mp4",
    blocks: [
      { type: "label", text: "Product Design · Fully · 2024" },
      { type: "heading", text: "Redesign Physical Tracking", size: "lg" },
      { type: "text", body: "O suporte recebia chamados constantes para resolver dúvidas que **a interface deveria responder sozinha**: onde está minha meta diária, como funciona a recompensa, o que significa esse número. O diagnóstico apontava para problemas estruturais — falta de consistência visual, excesso de informação em tela, ausência de feedback do sistema e fluxos sem hierarquia clara. O redesign partiu desse conjunto de evidências." },
      { type: "divider" },
      { type: "label", text: "CONTEXTO" },
      { type: "heading", text: "Ecossistema Fully", size: "sm" },
      { type: "text", body: "Fully é um ecossistema digital que recompensa seus usuários por meio de metas personalizadas, organizadas em 3 pilares: Físico, Mental e Financeiro. Este case apresenta o processo de redesign do pilar Físico." },
      { type: "divider" },
      { type: "label", text: "O PROBLEMA" },
      { type: "heading", text: "Quando o suporte vira termômetro de UX", size: "sm" },
      { type: "text", body: "O principal ponto de tensão foi com o próprio time: a visão inicial era manter todas as informações visíveis na primeira tela, para que o usuário tivesse tudo 'na mão'. A defesa era de completude — mas **o problema original era justamente o excesso**. A proposta foi reorganizar a interface em camadas, apresentando cada informação no momento em que ela era relevante, reduzindo a carga cognitiva sem sacrificar o acesso ao conteúdo." },
      { type: "divider" },
      { type: "label", text: "MEU PAPEL" },
      { type: "list", items: [
        "Análise de fluxos",
        "Wireframes",
        "Protótipos de alta fidelidade",
        "Testes de usabilidade",
      ]},
      { type: "divider" },
      { type: "label", text: "O QUE MUDOU" },
      { type: "metrics", items: [
        { value: "97%", label: "Taxa de sucesso — usuários que completaram os fluxos principais" },
        { value: "Menos chamados", label: "Redução significativa de chamados e confusão na navegação" },
      ]},
      { type: "text", body: "A taxa de **97% de sucesso** foi coletada em testes de usabilidade com protótipo de alta fidelidade. A redução de chamados no suporte foi observada após a implementação." },
      { type: "highlight", body: "O projeto foi ao ar, mas os dados de uso ainda não foram coletados formalmente." },
    ],
  },
];
