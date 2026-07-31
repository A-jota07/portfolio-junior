export const PERSONAL_INFO = {
  name: "MICHAEL WEAVER",
  title: "Senior Full Stack & AI Engineer",
  specialization: "Full Stack Dev | AI & Technology",
  location: "San Francisco, CA (Available Remote)",
  status: "Open for High-Impact Roles & Consulting",
  contact: {
    email: "michael.weaver@dev.tech",
    github: "github.com/mweaver-dev",
    linkedin: "linkedin.com/in/mweaver-dev",
    twitter: "@mweaver_code"
  },
  stats: {
    experienceYears: "7+",
    reposContributed: "140+",
    totalCommits: "3,842",
    codeQualityScore: "99.4%"
  }
};

export const CODE_SNIPPETS = {
  contactInfo: `const contactInfo = {
  name: "Michael Weaver",
  email: "michael.weaver@dev.tech",
  github: "github.com/mweaver-dev",
  linkedin: "linkedin.com/in/mweaver-dev",
  status: "Available for contract & full-time roles"
};`,

  developerConfig: `export const devProfile = {
  stack: ["React 19", "TypeScript", "Node.js", "Python", "PyTorch", "Tailwind CSS"],
  architecture: ["Microservices", "Serverless", "RAG & LLM Agents", "GraphQL"],
  mindset: "Performance first, pixel-perfect design, bulletproof code",
  hireable: true
};`
};

export const FEATURED_PROJECTS = [
  {
    id: "neural-code-ai",
    title: "NeuralCode AI Studio",
    subtitle: "Real-time AI Pair Programmer & Code Synthesis Engine",
    category: "AI & Tools",
    tag: "LIVE DEMO",
    description: "An ultra-fast browser IDE powered by LLM models with automated test generation, syntax tree AST diffing, and zero-latency code completion.",
    longDescription: "NeuralCode AI Studio integrates cutting-edge Transformer models directly into a WebAssembly-powered browser workspace. Supports instant code refactoring, intelligent multi-file context indexing, and live canvas preview.",
    stack: ["React 19", "TypeScript", "Python / FastAPI", "WebAssembly", "Tailwind CSS"],
    stars: 1280,
    forks: 342,
    commits: 412,
    liveUrl: "https://neural-code.dev",
    repoUrl: "https://github.com/mweaver-dev/neural-code-ai",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    highlights: ["Sub-50ms latency", "IndexedDB caching", "Monaco Editor core"]
  },
  {
    id: "pulsedb-engine",
    title: "PulseDB Distributed Engine",
    subtitle: "High-throughput Time-series Database & Visualizer",
    category: "Infrastructure",
    tag: "FEATURED",
    description: "Distributed, low-latency time-series engine capable of handling 500,000 writes/sec with automated columnar partitioning and sleek real-time monitoring dashboard.",
    longDescription: "Engineered with Rust core and React micro-frontend interface. Features streaming WebSockets, dynamic canvas charting, custom query syntax, and automated failover cluster clustering.",
    stack: ["React", "Rust", "TypeScript", "WebSockets", "D3.js"],
    stars: 940,
    forks: 185,
    commits: 289,
    liveUrl: "https://pulsedb.io",
    repoUrl: "https://github.com/mweaver-dev/pulsedb-engine",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    highlights: ["500k writes/sec", "Zero data loss", "Custom SQL parser"]
  },
  {
    id: "cyberstream-analytics",
    title: "CyberStream Realtime BI",
    subtitle: "Cyberpunk Telemetry & Incident Response System",
    category: "Security",
    tag: "POPULAR",
    description: "Next-gen threat intelligence and log aggregation platform featuring interactive node-graph visualizers, anomaly detection alerts, and purple theme UI.",
    longDescription: "Built for SOC teams to visualize high-volume network telemetry data. Leverages WebGL graph rendering to map graph nodes in 3D and stream microsecond alerts.",
    stack: ["React", "Three.js", "Tailwind", "Node.js", "GraphQL"],
    stars: 810,
    forks: 142,
    commits: 350,
    liveUrl: "https://cyberstream.dev",
    repoUrl: "https://github.com/mweaver-dev/cyberstream-analytics",
    previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    highlights: ["WebGL graphs", "GraphQL Subscriptions", "Sub-sec alert system"]
  },
  {
    id: "quantum-ui-kit",
    title: "Quantum UI Design System",
    subtitle: "Developer-First Accessible React Component Library",
    category: "UI/UX",
    tag: "OPEN SOURCE",
    description: "A comprehensive UI design system crafted specifically for developer tools, internal consoles, and dark-mode web applications.",
    longDescription: "Includes 45+ headless React components, customizable design tokens, full keyboard accessibility (WAI-ARIA compliance), and electric purple aesthetic templates.",
    stack: ["React 19", "Tailwind CSS", "Storybook", "Figma API"],
    stars: 1620,
    forks: 290,
    commits: 512,
    liveUrl: "https://quantum-ui.dev",
    repoUrl: "https://github.com/mweaver-dev/quantum-ui-kit",
    previewImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    highlights: ["45+ components", "100% ARIA covered", "NPM package >50k downloads"]
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages & Core",
    icon: "Code2",
    skills: [
      { name: "TypeScript / JavaScript", level: 96, experience: "6 yrs", tag: "Primary" },
      { name: "Python", level: 90, experience: "5 yrs", tag: "AI/ML" },
      { name: "HTML5 / CSS3 / SCSS", level: 98, experience: "7 yrs", tag: "Expert" },
      { name: "SQL & NoSQL", level: 88, experience: "5 yrs", tag: "Data" },
      { name: "Rust", level: 75, experience: "2 yrs", tag: "Systems" }
    ]
  },
  {
    name: "Frontend & UI",
    icon: "Layout",
    skills: [
      { name: "React 19 / Next.js", level: 98, experience: "6 yrs", tag: "Master" },
      { name: "Tailwind CSS v4", level: 95, experience: "4 yrs", tag: "Design" },
      { name: "Redux Toolkit / Zustand", level: 92, experience: "5 yrs", tag: "State" },
      { name: "Vite / Webpack", level: 90, experience: "5 yrs", tag: "Bundling" },
      { name: "Three.js / Canvas", level: 80, experience: "3 yrs", tag: "Graphics" }
    ]
  },
  {
    name: "Backend & Cloud",
    icon: "Server",
    skills: [
      { name: "Node.js / Express / NestJS", level: 94, experience: "6 yrs", tag: "Backend" },
      { name: "FastAPI / PyTorch", level: 86, experience: "3 yrs", tag: "AI Services" },
      { name: "PostgreSQL / Redis / MongoDB", level: 90, experience: "5 yrs", tag: "Databases" },
      { name: "Docker / Kubernetes / AWS", level: 84, experience: "4 yrs", tag: "DevOps" },
      { name: "GraphQL & REST APIs", level: 95, experience: "6 yrs", tag: "Architecture" }
    ]
  }
];

export const COMMIT_ACTIVITY_DATA = [
  { month: "Jan", commits: 240, issues: 12, PRs: 28 },
  { month: "Feb", commits: 310, issues: 18, PRs: 35 },
  { month: "Mar", commits: 290, issues: 15, PRs: 30 },
  { month: "Apr", commits: 420, issues: 22, PRs: 45 },
  { month: "May", commits: 380, issues: 19, PRs: 40 },
  { month: "Jun", commits: 450, issues: 25, PRs: 52 },
  { month: "Jul", commits: 390, issues: 14, PRs: 38 },
  { month: "Aug", commits: 480, issues: 28, PRs: 56 },
  { month: "Sep", commits: 520, issues: 31, PRs: 64 },
  { month: "Oct", commits: 460, issues: 24, PRs: 50 },
  { month: "Nov", commits: 510, issues: 29, PRs: 60 },
  { month: "Dec", commits: 580, issues: 35, PRs: 70 }
];

export const LANGUAGE_DISTRIBUTION = [
  { name: "TypeScript", percentage: 44, color: "#9d4edd" },
  { name: "Python / AI", percentage: 26, color: "#f72585" },
  { name: "React / HTML", percentage: 18, color: "#c77dff" },
  { name: "Rust", percentage: 8, color: "#7209b7" },
  { name: "Other", percentage: 4, color: "#480ca8" }
];

export const REPO_LOGS = [
  { hash: "7a9b1c", msg: "feat(ai): integrate sub-50ms AST diffing parser", repo: "neural-code-ai", time: "12 mins ago" },
  { hash: "4f2e8d", msg: "perf(db): optimize columnar chunk buffer allocation", repo: "pulsedb-engine", time: "1 hour ago" },
  { hash: "9e1c3a", msg: "style(ui): release quantum-ui v2.4 with electric purple theme", repo: "quantum-ui-kit", time: "3 hours ago" },
  { hash: "2b8f4e", msg: "fix(ws): handle auto-reconnect on socket heartbeats", repo: "cyberstream-analytics", time: "5 hours ago" }
];
