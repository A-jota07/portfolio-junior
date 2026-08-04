export const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || "https://github.com/A-jota07";
export const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/alexandre-c-souza-jr/";
export const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS || "alexandrecassiodesouzajunior@gmail.com";

export const PERSONAL_INFO = {
  name: "ALEXANDRE CÁSSIO DE SOUZA JUNIOR",
  title: "Engenheiro Full Stack Junior",
  specialization: "Dev Full Stack",
  location: "Rondonópolis, MT (Disponível Remoto)",
  status: "Disponível para Projetos",
  contact: {
    email: EMAIL_ADDRESS,
    github: GITHUB_URL,
    linkedin: LINKEDIN_URL,
    twitter: "https://x.com/A_Junior15"
  },
  stats: {
    experienceYears: "3 Anos",
    reposContributed: "20+",
  }
};

export const CODE_SNIPPETS = {
  contactInfo: `const informacoesContato = {
  nome: "Alexandre Cássio de Souza Junior",
  email: "${EMAIL_ADDRESS}",
  github: "${GITHUB_URL}",
  linkedin: "${LINKEDIN_URL}",
  status: "Disponível para contratos e cargos em tempo integral"
};`,

  developerConfig: `export const perfilDev = {
  stack: ["React 19", "TypeScript", "Node.js", "Python", "Tailwind CSS"],
  mentalidade: "Performance em primeiro lugar, design impecável, código robusto",
  disponivelParaContratacao: true
};`,

  resumoCarreira: `// Resumo de Experiência & Principais Conquistas
const resumoCarreira = {
  cargoAtual: "Engenheiro Full Stack Junior",
  experiencia: "3 Anos",
  dominiosChave: ["Aplicações Web", "Sistemas Distribuídos", "Design System"],
  openSource: "20+ projetos desenvolvidos",
  disponibilidade: "Disponível para Projetos"
};`
};

export const FEATURED_PROJECTS = [
  {
    id: "neural-code-ai",
    title: "NeuralCode AI Studio",
    subtitle: "Programador Parceiro de IA & Motor de Síntese de Código",
    category: "IA & Ferramentas",
    tag: "AO VIVO",
    description: "Um IDE de navegador ultrarrápido alimentado por modelos LLM com geração automatizada de testes, diffing de AST e autocompletar com latência zero.",
    longDescription: "NeuralCode AI Studio integra modelos Transformer diretamente em um espaço de trabalho de navegador alimentado por WebAssembly. Suporta refatoração instantânea de código, indexação de contexto multi-arquivo inteligente e visualização em tempo real.",
    stack: ["React 19", "TypeScript", "Python / FastAPI", "WebAssembly", "Tailwind CSS"],
    stars: 1280,
    forks: 342,
    commits: 412,
    liveUrl: "https://neural-code.dev",
    repoUrl: "https://github.com/mweaver-dev/neural-code-ai",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    highlights: ["Latência abaixo de 50ms", "Cache IndexedDB", "Núcleo Monaco Editor"]
  },
  {
    id: "pulsedb-engine",
    title: "Motor Distribuído PulseDB",
    subtitle: "Banco de Dados de Séries Temporais de Alta Vazão & Visualizador",
    category: "Infraestrutura",
    tag: "DESTAQUE",
    description: "Motor distribuído de séries temporais de baixa latência capaz de processar 500.000 gravações/seg com particionamento colunar automatizado e dashboard elegante de monitoramento.",
    longDescription: "Projetado com núcleo em Rust e interface micro-frontend em React. Possui WebSockets para transmissão de dados, gráficos dinâmicos em Canvas, sintaxe de consulta personalizada e failover automático de cluster.",
    stack: ["React", "Rust", "TypeScript", "WebSockets", "D3.js"],
    stars: 940,
    forks: 185,
    commits: 289,
    liveUrl: "https://pulsedb.io",
    repoUrl: "https://github.com/mweaver-dev/pulsedb-engine",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    highlights: ["500k gravações/seg", "Zero perda de dados", "Parser SQL personalizado"]
  },
  {
    id: "cyberstream-analytics",
    title: "CyberStream Realtime BI",
    subtitle: "Sistema Cyberpunk de Telemetria & Resposta a Incidentes",
    category: "Segurança",
    tag: "POPULAR",
    description: "Plataforma de inteligência contra ameaças de última geração apresentando visualizadores interativos em grafo de nós, alertas de anomalia e interface em tema roxo elétrico.",
    longDescription: "Construído para equipes de SOC visualizarem dados de telemetria de rede de alto volume. Utiliza renderização WebGL para mapear nós de grafos em 3D e emitir alertas em microssegundos.",
    stack: ["React", "Three.js", "Tailwind", "Node.js", "GraphQL"],
    stars: 810,
    forks: 142,
    commits: 350,
    liveUrl: "https://cyberstream.dev",
    repoUrl: "https://github.com/mweaver-dev/cyberstream-analytics",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    highlights: ["Grafos WebGL 3D", "Inscrições GraphQL", "Alertas em sub-segundos"]
  },
  {
    id: "quantum-ui-kit",
    title: "Quantum UI Design System",
    subtitle: "Biblioteca de Componentes React Acessíveis para Desenvolvedores",
    category: "UI/UX",
    tag: "CÓDIGO ABERTO",
    description: "Um sistema de design UI completo criado especificamente para ferramentas de desenvolvedor, consoles internos e aplicações web no modo escuro.",
    longDescription: "Inclui mais de 45 componentes React headless, tokens de design personalizáveis, acessibilidade por teclado total (WAI-ARIA) e modelos com estética roxo elétrico.",
    stack: ["React 19", "Tailwind CSS", "Storybook", "Figma API"],
    stars: 1620,
    forks: 290,
    commits: 512,
    liveUrl: "https://quantum-ui.dev",
    repoUrl: "https://github.com/mweaver-dev/quantum-ui-kit",
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    highlights: ["45+ componentes", "100% ARIA coberto", ">50k downloads no NPM"]
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Linguagens & Core",
    icon: "Code2",
    skills: [
      { name: "TypeScript / JavaScript", level: 96, experience: "6 anos", tag: "Principal" },
      { name: "Python", level: 90, experience: "5 anos", tag: "IA/ML" },
      { name: "HTML5 / CSS3 / SCSS", level: 98, experience: "7 anos", tag: "Especialista" },
      { name: "SQL & NoSQL", level: 88, experience: "5 anos", tag: "Dados" },
      { name: "Rust", level: 75, experience: "2 anos", tag: "Sistemas" }
    ]
  },
  {
    name: "Frontend & UI",
    icon: "Layout",
    skills: [
      { name: "React 19 / Next.js", level: 98, experience: "6 anos", tag: "Mestre" },
      { name: "Tailwind CSS v4", level: 95, experience: "4 anos", tag: "Design" },
      { name: "Redux Toolkit / Zustand", level: 92, experience: "5 anos", tag: "Estado" },
      { name: "Vite / Webpack", level: 90, experience: "5 anos", tag: "Bundling" },
      { name: "Three.js / Canvas", level: 80, experience: "3 anos", tag: "Gráficos" }
    ]
  },
  {
    name: "Backend & Cloud",
    icon: "Server",
    skills: [
      { name: "Node.js / Express / NestJS", level: 94, experience: "6 anos", tag: "Backend" },
      { name: "FastAPI / PyTorch", level: 86, experience: "3 anos", tag: "Serviços IA" },
      { name: "PostgreSQL / Redis / MongoDB", level: 90, experience: "5 anos", tag: "Bancos de Dados" },
      { name: "Docker / Kubernetes / AWS", level: 84, experience: "4 anos", tag: "DevOps" },
      { name: "GraphQL & REST APIs", level: 95, experience: "6 anos", tag: "Arquitetura" }
    ]
  }
];

export const COMMIT_ACTIVITY_DATA = [
  { month: "Jan", commits: 240, issues: 12, PRs: 28 },
  { month: "Fev", commits: 310, issues: 18, PRs: 35 },
  { month: "Mar", commits: 290, issues: 15, PRs: 30 },
  { month: "Abr", commits: 420, issues: 22, PRs: 45 },
  { month: "Mai", commits: 380, issues: 19, PRs: 40 },
  { month: "Jun", commits: 450, issues: 25, PRs: 52 },
  { month: "Jul", commits: 390, issues: 14, PRs: 38 },
  { month: "Ago", commits: 480, issues: 28, PRs: 56 },
  { month: "Set", commits: 520, issues: 31, PRs: 64 },
  { month: "Out", commits: 460, issues: 24, PRs: 50 },
  { month: "Nov", commits: 510, issues: 29, PRs: 60 },
  { month: "Dez", commits: 580, issues: 35, PRs: 70 }
];

export const LANGUAGE_DISTRIBUTION = [
  { name: "TypeScript", percentage: 44, color: "#9d4edd" },
  { name: "Python / IA", percentage: 26, color: "#f72585" },
  { name: "React / HTML", percentage: 18, color: "#c77dff" },
  { name: "Rust", percentage: 8, color: "#7209b7" },
  { name: "Outros", percentage: 4, color: "#480ca8" }
];

export const REPO_LOGS = [
  { hash: "7a9b1c", msg: "feat(ia): integrar parser de diffing AST em sub-50ms", repo: "neural-code-ai", time: "há 12 minutos" },
  { hash: "4f2e8d", msg: "perf(bd): otimizar alocação de buffer em chunks colunares", repo: "pulsedb-engine", time: "há 1 hora" },
  { hash: "9e1c3a", msg: "style(ui): lançamento do quantum-ui v2.4 com tema roxo", repo: "quantum-ui-kit", time: "há 3 horas" },
  { hash: "2b8f4e", msg: "fix(ws): tratar reconexão automática em heartbeats de socket", repo: "cyberstream-analytics", time: "há 5 horas" }
];
