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

export const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects_v6',
  SKILLS: 'portfolio_skills_v6',
  PROFILE: 'portfolio_profile_v6',
  AUTH_SESSION: 'portfolio_admin_session_v6'
};

const getStoredItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

// Initial seeds for localStorage ONLY if Supabase is NOT configured and key has never been initialized (is null)
if (!isSupabaseConfigured()) {
  if (localStorage.getItem(STORAGE_KEYS.PROJECTS) === null) {
    setStoredItem(STORAGE_KEYS.PROJECTS, FEATURED_PROJECTS);
  }

  if (localStorage.getItem(STORAGE_KEYS.SKILLS) === null) {
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

  if (localStorage.getItem(STORAGE_KEYS.PROFILE) === null) {
    setStoredItem(STORAGE_KEYS.PROFILE, {
      name: PERSONAL_INFO.name,
      title: PERSONAL_INFO.title,
      specialization: PERSONAL_INFO.specialization,
      location: PERSONAL_INFO.location,
      status: PERSONAL_INFO.status,
      email: PERSONAL_INFO.contact.email,
      github: PERSONAL_INFO.contact.github,
      linkedin: PERSONAL_INFO.contact.linkedin,
      bioText: "Sou um Desenvolvedor Full Stack apaixonado por aplicações web de alta performance e ecossistemas React.",
      philosophy: "Escreva código robusto e auto-documentado. Construa interfaces que inspirem curiosidade e entreguem velocidade sem concessões.",
      availability: "DISPONÍVEL PARA CONTRATAÇÃO"
    });
  }
}

// Reset data back to initial defaults if explicitly triggered by user
export const resetToCodeDefaults = () => {
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  localStorage.removeItem(STORAGE_KEYS.SKILLS);
  localStorage.removeItem(STORAGE_KEYS.PROFILE);

  setStoredItem(STORAGE_KEYS.PROJECTS, FEATURED_PROJECTS);
  
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

  setStoredItem(STORAGE_KEYS.PROFILE, {
    name: PERSONAL_INFO.name,
    title: PERSONAL_INFO.title,
    specialization: PERSONAL_INFO.specialization,
    location: PERSONAL_INFO.location,
    status: PERSONAL_INFO.status,
    email: PERSONAL_INFO.contact.email,
    github: PERSONAL_INFO.contact.github,
    linkedin: PERSONAL_INFO.contact.linkedin,
    bioText: "Sou um Desenvolvedor Full Stack apaixonado por aplicações web de alta performance e ecossistemas React.",
    philosophy: "Escreva código robusto e auto-documentado. Construa interfaces que inspirem curiosidade e entreguem velocidade sem concessões.",
    availability: "DISPONÍVEL PARA CONTRATAÇÃO"
  });

  window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
};

// --- DATA MAPPERS FOR USER'S SUPABASE SCHEMA COMPATIBILITY ---
const isValidUuid = (str) => {
  if (typeof str !== 'string') return false;
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
};

const normalizeProjectFromDb = (p) => {
  const highlightsArr = Array.isArray(p.highlights) 
    ? p.highlights 
    : (typeof p.highlights === 'string' 
      ? p.highlights.split(',').map(h => h.trim()).filter(Boolean) 
      : []);

  return {
    id: p.id,
    title: p.title || '',
    subtitle: p.subtitle || p.category || '',
    description: p.description || '',
    category: p.category || 'Desenvolvimento Web',
    stack: Array.isArray(p.technologies) ? p.technologies : (Array.isArray(p.stack) ? p.stack : (p.technologies ? [p.technologies] : [])),
    highlights: highlightsArr,
    architecture_details: p.architecture_details || p.architectureDetails || '',
    repoUrl: p.github_url || p.repoUrl || 'https://github.com/A-jota07',
    previewImage: p.cover_url || p.preview_image || p.previewImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    created_at: p.created_at
  };
};

const normalizeProjectToDb = (p) => {
  const stackArr = Array.isArray(p.stack) ? p.stack : (typeof p.stack === 'string' ? p.stack.split(',').map(s => s.trim()).filter(Boolean) : []);
  const highlightsArr = Array.isArray(p.highlights) ? p.highlights : (typeof p.highlights === 'string' ? p.highlights.split(',').map(h => h.trim()).filter(Boolean) : []);

  const dbObj = {
    title: p.title || '',
    description: p.description || '',
    category: p.category || 'Desenvolvimento Web',
    technologies: stackArr,
    highlights: highlightsArr,
    architecture_details: p.architecture_details || p.architectureDetails || '',
    github_url: p.repoUrl || 'https://github.com/A-jota07',
    cover_url: p.previewImage || p.cover_url || ''
  };
  if (p.id && isValidUuid(p.id)) {
    dbObj.id = p.id;
  }
  return dbObj;
};

const normalizeSkillFromDb = (s) => {
  return {
    id: s.id,
    category: s.category || 'Frontend & UI',
    name: s.name || '',
    level: s.percentage !== undefined && s.percentage !== null ? s.percentage : (s.level || 80),
    experience: s.years_exp || s.experience || '3 anos',
    tag: s.tag || 'Especialista'
  };
};

const normalizeSkillToDb = (s) => {
  const dbObj = {
    category: s.category || 'Frontend & UI',
    name: s.name,
    years_exp: s.experience || '3 anos',
    percentage: parseInt(s.level, 10) || 80,
    tag: s.tag || 'Especialista'
  };
  if (s.id && isValidUuid(s.id)) {
    dbObj.id = s.id;
  }
  return dbObj;
};

const normalizeProfileFromDb = (prof) => {
  const isOldLocation = !prof.location || prof.location.includes('São Paulo');
  const isOldName = !prof.name || prof.name === 'MICHAEL WEAVER' || prof.name === 'Alexandre Jr';
  const isOldTitle = (!prof.title && !prof.role) || (prof.title && prof.title.includes('Senior'));

  return {
    name: isOldName ? PERSONAL_INFO.name : prof.name,
    title: isOldTitle ? PERSONAL_INFO.title : (prof.role || prof.title),
    specialization: isOldTitle ? PERSONAL_INFO.specialization : (prof.role || PERSONAL_INFO.specialization),
    location: isOldLocation ? PERSONAL_INFO.location : prof.location,
    status: prof.available_for_hire ? 'Disponível para Projetos' : 'Ocupado',
    email: prof.email || PERSONAL_INFO.contact.email,
    github: prof.github || PERSONAL_INFO.contact.github,
    linkedin: prof.linkedin || PERSONAL_INFO.contact.linkedin,
    bioText: prof.bio_text || prof.bioText || "Sou um Desenvolvedor Full Stack apaixonado por aplicações web de alta performance e ecossistemas React.",
    philosophy: prof.philosophy || "Escreva código robusto e auto-documentado. Construa interfaces que inspirem curiosidade e entreguem velocidade sem concessões.",
    availability: prof.available_for_hire !== false ? "DISPONÍVEL PARA CONTRATAÇÃO" : "INDISPONÍVEL NO MOMENTO"
  };
};

const normalizeProfileToDb = (prof) => {
  return {
    name: prof.name || 'Alexandre Cássio de Souza Junior',
    role: prof.title || prof.specialization || 'Engenheiro Full Stack Junior',
    location: prof.location || 'Rondonópolis, MT (Disponível Remoto)',
    available_for_hire: prof.availability ? !prof.availability.includes('INDISPONÍVEL') : true,
    bio_text: prof.bioText || '',
    philosophy: prof.philosophy || ''
  };
};

// --- PROJECTS SERVICE ---
export const fetchProjects = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Erro ao buscar projetos no Supabase:', error.message);
      } else if (Array.isArray(data)) {
        return data.map(normalizeProjectFromDb);
      }
    } catch (err) {
      console.error('Erro ao buscar projetos no Supabase:', err);
    }
  }
  return getStoredItem(STORAGE_KEYS.PROJECTS, []);
};

export const saveProject = async (projectData) => {
  if (isSupabaseConfigured()) {
    try {
      const dbPayload = normalizeProjectToDb(projectData);
      const { data, error } = await supabase.from('projects').upsert([dbPayload]).select();
      if (error) {
        console.error('Erro ao salvar projeto no Supabase:', error.message);
        return { success: false, error: error.message };
      }
      const savedObj = data && data[0] ? normalizeProjectFromDb(data[0]) : projectData;
      window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
      return { success: true, data: savedObj };
    } catch (err) {
      console.error('Exceção ao salvar no Supabase:', err);
      return { success: false, error: err.message || 'Falha ao salvar no Supabase' };
    }
  }

  const currentProjects = getStoredItem(STORAGE_KEYS.PROJECTS, []);
  const existsIdx = currentProjects.findIndex(p => p.id === projectData.id || p.title === projectData.title);
  let updatedProjects;
  if (existsIdx >= 0) {
    updatedProjects = [...currentProjects];
    updatedProjects[existsIdx] = projectData;
  } else {
    updatedProjects = [projectData, ...currentProjects];
  }
  setStoredItem(STORAGE_KEYS.PROJECTS, updatedProjects);
  window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
  return { success: true, data: projectData };
};

export const deleteProject = async (id, title) => {
  if (isSupabaseConfigured()) {
    try {
      let query;
      if (isValidUuid(id)) {
        query = supabase.from('projects').delete().eq('id', id);
      } else if (title) {
        query = supabase.from('projects').delete().eq('title', title);
      } else {
        query = supabase.from('projects').delete().eq('id', id);
      }
      const { error } = await query;
      if (error) {
        console.error('Erro ao deletar no Supabase:', error.message);
        return { success: false, error: error.message };
      }
      window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
      return { success: true };
    } catch (err) {
      console.error('Exceção ao deletar no Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  const currentProjects = getStoredItem(STORAGE_KEYS.PROJECTS, []);
  const updatedProjects = currentProjects.filter(p => p.id !== id && (title ? p.title !== title : true));
  setStoredItem(STORAGE_KEYS.PROJECTS, updatedProjects);
  window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
  return { success: true };
};

// --- SKILLS SERVICE ---
export const fetchSkills = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('skills').select('*');
      if (error) {
        console.error('Erro ao buscar habilidades no Supabase:', error.message);
      } else if (Array.isArray(data)) {
        return data.map(normalizeSkillFromDb);
      }
    } catch (err) {
      console.error('Erro ao buscar habilidades no Supabase:', err);
    }
  }
  return getStoredItem(STORAGE_KEYS.SKILLS, []);
};

export const saveSkill = async (skillData) => {
  if (isSupabaseConfigured()) {
    try {
      const dbPayload = normalizeSkillToDb(skillData);
      const { data, error } = await supabase.from('skills').upsert([dbPayload]).select();
      if (error) {
        console.error('Erro ao salvar habilidade no Supabase:', error.message);
        return { success: false, error: error.message };
      }
      const savedObj = data && data[0] ? normalizeSkillFromDb(data[0]) : skillData;
      window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
      return { success: true, data: savedObj };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  const currentSkills = getStoredItem(STORAGE_KEYS.SKILLS, []);
  const existsIdx = currentSkills.findIndex(s => s.id === skillData.id || s.name === skillData.name);
  let updatedSkills;
  if (existsIdx >= 0) {
    updatedSkills = [...currentSkills];
    updatedSkills[existsIdx] = skillData;
  } else {
    updatedSkills = [...currentSkills, skillData];
  }
  setStoredItem(STORAGE_KEYS.SKILLS, updatedSkills);
  window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
  return { success: true, data: skillData };
};

export const deleteSkill = async (id, name) => {
  if (isSupabaseConfigured()) {
    try {
      let query;
      if (isValidUuid(id)) {
        query = supabase.from('skills').delete().eq('id', id);
      } else if (name) {
        query = supabase.from('skills').delete().eq('name', name);
      } else {
        query = supabase.from('skills').delete().eq('id', id);
      }
      const { error } = await query;
      if (error) {
        console.error('Erro ao deletar habilidade no Supabase:', error.message);
        return { success: false, error: error.message };
      }
      window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  const currentSkills = getStoredItem(STORAGE_KEYS.SKILLS, []);
  const updatedSkills = currentSkills.filter(s => s.id !== id && (name ? s.name !== name : true));
  setStoredItem(STORAGE_KEYS.SKILLS, updatedSkills);
  window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
  return { success: true };
};

// --- PROFILE SERVICE ---
export const fetchProfileInfo = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('profile_info').select('*').limit(1).single();
      if (!error && data) {
        return normalizeProfileFromDb(data);
      }
    } catch (err) {
      console.error('Erro ao buscar perfil no Supabase:', err);
    }
  }
  return getStoredItem(STORAGE_KEYS.PROFILE, {});
};

export const saveProfileInfo = async (profileData) => {
  if (isSupabaseConfigured()) {
    try {
      const dbPayload = normalizeProfileToDb(profileData);
      const { data, error } = await supabase.from('profile_info').upsert([dbPayload]).select();
      if (error) {
        console.error('Erro ao salvar perfil no Supabase:', error.message);
        return { success: false, error: error.message };
      }
      const savedObj = data && data[0] ? normalizeProfileFromDb(data[0]) : profileData;
      window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
      return { success: true, data: savedObj };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  setStoredItem(STORAGE_KEYS.PROFILE, profileData);
  window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
  return { success: true, data: profileData };
};

// --- AUTHENTICATION SERVICE ---
export const loginAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message?.toLowerCase().includes('invalid api key') || error.message?.toLowerCase().includes('api key')) {
        return { 
          success: false, 
          error: 'Chave do Supabase inválida (Invalid API Key). Verifique a variável VITE_SUPABASE_ANON_KEY no painel da Vercel (deve ser a chave anon public que começa com eyJ...).' 
        };
      }
      return { success: false, error: error.message };
    }
    if (data?.session) {
      setStoredItem(STORAGE_KEYS.AUTH_SESSION, data.session);
      return { success: true, user: data.user, session: data.session };
    }
    return { success: false, error: 'Sessão de autenticação inválida.' };
  } catch (err) {
    return { success: false, error: err.message || 'Erro de autenticação.' };
  }
};

export const registerAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { success: false, error: error.message };
    }
    if (data?.session) {
      setStoredItem(STORAGE_KEYS.AUTH_SESSION, data.session);
    }
    return { 
      success: true, 
      user: data.user, 
      session: data.session, 
      message: data.session ? 'Cadastro realizado com sucesso!' : 'Cadastro realizado! Verifique o e-mail para confirmação.' 
    };
  } catch (err) {
    return { success: false, error: err.message || 'Erro ao registrar novo administrador.' };
  }
};

export const resendConfirmationEmail = async (email) => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });
    if (error) return { success: false, error: error.message };
    return { success: true, message: 'E-mail de confirmação reenviado com sucesso! Verifique sua caixa de entrada e spam.' };
  } catch (err) {
    return { success: false, error: err.message || 'Erro ao reenviar e-mail de confirmação.' };
  }
};

export const updateAdminAccount = async ({ email, password, displayName }) => {
  try {
    const updateAttributes = {};
    if (email) updateAttributes.email = email;
    if (password) updateAttributes.password = password;
    if (displayName) updateAttributes.data = { displayName };

    if (Object.keys(updateAttributes).length === 0) {
      return { success: false, error: 'Preencha ao menos um campo para atualizar a conta.' };
    }

    const { data, error } = await supabase.auth.updateUser(updateAttributes);
    if (error) {
      return { success: false, error: error.message };
    }

    const currentSession = getAdminSession();
    if (currentSession && data?.user) {
      currentSession.user = data.user;
      setStoredItem(STORAGE_KEYS.AUTH_SESSION, currentSession);
    }

    return { success: true, user: data?.user, message: 'Configurações da conta atualizadas com sucesso!' };
  } catch (err) {
    return { success: false, error: err.message || 'Erro ao atualizar dados da conta.' };
  }
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

// --- REALTIME SUBSCRIPTION SERVICE ---
export const subscribeToRealtimeUpdates = (callback) => {
  if (!isSupabaseConfigured()) return () => {};

  try {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        (payload) => {
          window.dispatchEvent(new CustomEvent('portfolio_data_updated'));
          if (callback) callback(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Erro ao configurar tempo real no Supabase:', err);
    return () => {};
  }
};

