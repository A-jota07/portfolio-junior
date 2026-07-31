import { createClient } from '@supabase/supabase-js';
import { PERSONAL_INFO, FEATURED_PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sample-portfolio-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sample-anon-key';

export const isSupabaseConfigured = () => {
  return (
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY &&
    !import.meta.env.VITE_SUPABASE_URL.includes('sample-portfolio-id') &&
    !import.meta.env.VITE_SUPABASE_ANON_KEY.includes('sample-anon-key')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects_v2',
  SKILLS: 'portfolio_skills_v2',
  PROFILE: 'portfolio_profile_v2',
  AUTH_SESSION: 'portfolio_admin_session_v2'
};

const getStoredItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

// Seed initial data in Portuguese
if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
  setStoredItem(STORAGE_KEYS.PROJECTS, FEATURED_PROJECTS);
}

if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
  const flattenedSkills = [];
  SKILL_CATEGORIES.forEach((cat) => {
    cat.skills.forEach((sk, idx) => {
      flattenedSkills.push({
        id: `sk-${cat.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
        category: cat.name,
        name: sk.name,
        level: sk.level,
        experience: sk.experience,
        tag: sk.tag
      });
    });
  });
  setStoredItem(STORAGE_KEYS.SKILLS, flattenedSkills);
}

if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
  setStoredItem(STORAGE_KEYS.PROFILE, {
    name: PERSONAL_INFO.name,
    title: PERSONAL_INFO.title,
    specialization: PERSONAL_INFO.specialization,
    location: PERSONAL_INFO.location,
    status: PERSONAL_INFO.status,
    email: PERSONAL_INFO.contact.email,
    github: PERSONAL_INFO.contact.github,
    linkedin: PERSONAL_INFO.contact.linkedin,
    bioText: "Sou um Desenvolvedor Full Stack Senior apaixonado por aplicações web de alta performance, ecossistemas React modernos e software interativo orientado a IA.",
    philosophy: "Escreva código robusto e auto-documentado. Construa interfaces que inspirem curiosidade e entreguem velocidade sem concessões.",
    availability: "DISPONÍVEL PARA CONTRATAÇÃO"
  });
}

// --- PROJECTS SERVICE ---
export const fetchProjects = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('id');
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Erro ao buscar projetos no Supabase, usando armazenamento local:', err);
    }
  }
  return getStoredItem(STORAGE_KEYS.PROJECTS, FEATURED_PROJECTS);
};

export const saveProject = async (projectData) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('projects').upsert([projectData]);
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Erro ao salvar projeto no Supabase, fallback para local:', err);
    }
  }

  const currentProjects = getStoredItem(STORAGE_KEYS.PROJECTS, FEATURED_PROJECTS);
  const existsIdx = currentProjects.findIndex(p => p.id === projectData.id);
  
  let updatedProjects;
  if (existsIdx >= 0) {
    updatedProjects = [...currentProjects];
    updatedProjects[existsIdx] = projectData;
  } else {
    updatedProjects = [projectData, ...currentProjects];
  }

  setStoredItem(STORAGE_KEYS.PROJECTS, updatedProjects);
  return { success: true, data: projectData };
};

export const deleteProject = async (id) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn('Erro ao deletar no Supabase, fallback local:', err);
    }
  }

  const currentProjects = getStoredItem(STORAGE_KEYS.PROJECTS, FEATURED_PROJECTS);
  const updatedProjects = currentProjects.filter(p => p.id !== id);
  setStoredItem(STORAGE_KEYS.PROJECTS, updatedProjects);
  return { success: true };
};

// --- SKILLS SERVICE ---
export const fetchSkills = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('skills').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Erro ao buscar habilidades no Supabase, usando local:', err);
    }
  }
  return getStoredItem(STORAGE_KEYS.SKILLS, []);
};

export const saveSkill = async (skillData) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('skills').upsert([skillData]);
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Erro ao salvar habilidade no Supabase, fallback local:', err);
    }
  }

  const currentSkills = getStoredItem(STORAGE_KEYS.SKILLS, []);
  const existsIdx = currentSkills.findIndex(s => s.id === skillData.id);
  
  let updatedSkills;
  if (existsIdx >= 0) {
    updatedSkills = [...currentSkills];
    updatedSkills[existsIdx] = skillData;
  } else {
    updatedSkills = [...currentSkills, skillData];
  }

  setStoredItem(STORAGE_KEYS.SKILLS, updatedSkills);
  return { success: true, data: skillData };
};

export const deleteSkill = async (id) => {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (!error) return { success: true };
    } catch (err) {
      console.warn('Erro ao deletar habilidade no Supabase, fallback local:', err);
    }
  }

  const currentSkills = getStoredItem(STORAGE_KEYS.SKILLS, []);
  const updatedSkills = currentSkills.filter(s => s.id !== id);
  setStoredItem(STORAGE_KEYS.SKILLS, updatedSkills);
  return { success: true };
};

// --- PROFILE SERVICE ---
export const fetchProfileInfo = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('profile_info').select('*').single();
      if (!error && data) return data;
    } catch (err) {
      console.warn('Erro ao buscar perfil no Supabase, usando local:', err);
    }
  }
  return getStoredItem(STORAGE_KEYS.PROFILE, {});
};

export const saveProfileInfo = async (profileData) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('profile_info').upsert([profileData]);
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Erro ao salvar perfil no Supabase, fallback local:', err);
    }
  }

  setStoredItem(STORAGE_KEYS.PROFILE, profileData);
  return { success: true, data: profileData };
};

// --- AUTHENTICATION SERVICE ---
export const loginAdmin = async (email, password) => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.session) {
        setStoredItem(STORAGE_KEYS.AUTH_SESSION, data.session);
        return { success: true, user: data.user, session: data.session };
      }
      if (error) return { success: false, error: error.message };
    } catch (err) {
      console.warn('Falha na autenticação Supabase, tentando demo local:', err);
    }
  }

  if (email === 'admin@dev.tech' && password === 'admin123') {
    const demoSession = {
      user: { id: 'admin-01', email: 'admin@dev.tech', role: 'admin' },
      token: 'demo-jwt-token-998877'
    };
    setStoredItem(STORAGE_KEYS.AUTH_SESSION, demoSession);
    return { success: true, user: demoSession.user, session: demoSession };
  }

  return { success: false, error: 'Credenciais inválidas. Login de demo: admin@dev.tech / admin123' };
};

export const logoutAdmin = async () => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Erro de logout Supabase:', e);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
};

export const getAdminSession = () => {
  return getStoredItem(STORAGE_KEYS.AUTH_SESSION, null);
};
