-- ============================================================
-- SCRIPT SQL DE BANCO DE DADOS SUPABASE PARA PORTFÓLIO & ADMIN
-- Executar no Editor SQL do seu painel Supabase (https://app.supabase.com)
-- ============================================================

-- 1. TABELA DE PROJETOS (projects)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE HABILIDADES (skills)
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  level INT NOT NULL DEFAULT 80,
  experience TEXT DEFAULT '3 anos',
  tag TEXT DEFAULT 'Especialista',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELA DE PERFIL & BIO (profile_info)
CREATE TABLE IF NOT EXISTS public.profile_info (
  id TEXT PRIMARY KEY DEFAULT 'main-profile',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialization TEXT,
  location TEXT,
  status TEXT,
  email TEXT,
  github TEXT,
  linkedin TEXT,
  "bioText" TEXT,
  philosophy TEXT,
  availability TEXT DEFAULT 'DISPONÍVEL PARA CONTRATAÇÃO',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HABILITAR SEGURANÇA POR NÍVEL DE LINHA (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_info ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACESSO PÚBLICO (Leitura pública e gravação sem bloqueios)
CREATE POLICY "Permitir leitura pública em projetos" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Permitir alteracao em projetos" ON public.projects FOR ALL USING (true);

CREATE POLICY "Permitir leitura pública em habilidades" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Permitir alteracao em habilidades" ON public.skills FOR ALL USING (true);

CREATE POLICY "Permitir leitura pública em perfil" ON public.profile_info FOR SELECT USING (true);
CREATE POLICY "Permitir alteracao em perfil" ON public.profile_info FOR ALL USING (true);

-- ============================================================
-- DADOS INICIAIS (SEED INITIAL REPOSITORIES)
-- ============================================================

INSERT INTO public.projects (id, title, subtitle, description, category, tag, stack, stars, forks, "liveUrl", "repoUrl", "previewImage")
VALUES 
(
  'neural-code-ai',
  'NeuralCode AI Studio',
  'Programador Parceiro de IA & Motor de Síntese de Código',
  'Um IDE de navegador ultrarrápido alimentado por modelos LLM com geração automatizada de testes, diffing de AST e autocompletar com latência zero.',
  'IA & Ferramentas',
  'AO VIVO',
  ARRAY['React 19', 'TypeScript', 'FastAPI', 'WebAssembly', 'Tailwind CSS'],
  1280,
  342,
  'https://neural-code.dev',
  'https://github.com/mweaver-dev/neural-code-ai',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
),
(
  'pulsedb-engine',
  'Motor Distribuído PulseDB',
  'Banco de Dados de Séries Temporais de Alta Vazão & Visualizador',
  'Motor distribuído de séries temporais de baixa latência capaz de processar 500.000 gravações/seg com particionamento colunar automatizado.',
  'Infraestrutura',
  'DESTAQUE',
  ARRAY['React', 'Rust', 'TypeScript', 'WebSockets', 'D3.js'],
  940,
  185,
  'https://pulsedb.io',
  'https://github.com/mweaver-dev/pulsedb-engine',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.skills (id, category, name, level, experience, tag)
VALUES
('sk-lang-0', 'Linguagens & Core', 'TypeScript / JavaScript', 96, '6 anos', 'Principal'),
('sk-lang-1', 'Linguagens & Core', 'Python', 90, '5 anos', 'IA/ML'),
('sk-front-0', 'Frontend & UI', 'React 19 / Next.js', 98, '6 anos', 'Mestre'),
('sk-front-1', 'Frontend & UI', 'Tailwind CSS v4', 95, '4 anos', 'Design'),
('sk-back-0', 'Backend & Cloud', 'Node.js / Express', 94, '6 anos', 'Backend'),
('sk-back-1', 'Backend & Cloud', 'PostgreSQL / Supabase', 92, '5 anos', 'Bancos de Dados')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.profile_info (id, name, title, specialization, location, status, email, github, linkedin, "bioText", philosophy, availability)
VALUES (
  'main-profile',
  'MICHAEL WEAVER',
  'Engenheiro Full Stack Senior & IA',
  'Dev Full Stack | IA & Tecnologia',
  'São Paulo, SP (Disponível Remoto)',
  'Disponível para Projetos de Alto Impacto & Consultoria',
  'michael.weaver@dev.tech',
  'github.com/mweaver-dev',
  'linkedin.com/in/mweaver-dev',
  'Sou um Desenvolvedor Full Stack Senior apaixonado por aplicações web de alta performance, ecossistemas React modernos e software interativo orientado a IA.',
  'Escreva código robusto e auto-documentado. Construa interfaces que inspirem curiosidade e entreguem velocidade sem concessões.',
  'DISPONÍVEL PARA CONTRATAÇÃO'
)
ON CONFLICT (id) DO NOTHING;
