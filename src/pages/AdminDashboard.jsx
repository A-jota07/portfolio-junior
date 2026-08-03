import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchProjects,
  saveProject,
  deleteProject,
  fetchSkills,
  saveSkill,
  deleteSkill,
  fetchProfileInfo,
  saveProfileInfo,
  logoutAdmin,
  isSupabaseConfigured,
  resetToCodeDefaults,
  subscribeToRealtimeUpdates,
  updateAdminAccount,
  getAdminSession
} from '../lib/supabaseClient';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  LogOut,
  ExternalLink,
  CheckCircle2,
  X,
  Database,
  Sliders,
  FolderPlus,
  UserCheck,
  RefreshCw,
  Key
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountDisplayName, setAccountDisplayName] = useState('');
  const [accountSaving, setAccountSaving] = useState(false);

  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAccountSettings = async (e) => {
    e.preventDefault();
    setAccountSaving(true);
    const res = await updateAdminAccount({
      email: accountEmail.trim() || undefined,
      password: accountPassword.trim() || undefined,
      displayName: accountDisplayName.trim() || undefined
    });
    setAccountSaving(false);

    if (res.success) {
      showToast(res.message || 'Configurações da conta salvas!');
      setAccountPassword('');
    } else {
      showToast(`⚠️ Error: ${res.error}`);
    }
  };

  const loadData = async () => {
    setLoading(true);
    const [pData, sData, profData] = await Promise.all([
      fetchProjects(),
      fetchSkills(),
      fetchProfileInfo()
    ]);

    setProjects(pData || []);
    setSkills(sData || []);
    setProfile(profData || {});
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };
    window.addEventListener('portfolio_data_updated', handleUpdate);
    const unsubscribeRealtime = subscribeToRealtimeUpdates(() => {
      loadData();
    });

    return () => {
      window.removeEventListener('portfolio_data_updated', handleUpdate);
      unsubscribeRealtime();
    };
  }, []);

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar os dados originais do código e atualizar o cache local?')) {
      resetToCodeDefaults();
      showToast('Dados restaurados e sincronizados com o código!');
      loadData();
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/login');
  };

  // --- PROJECT CRUD HANDLERS ---
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject({
        ...proj,
        stackInput: Array.isArray(proj.stack) ? proj.stack.join(', ') : (proj.stack || '')
      });
    } else {
      setEditingProject({
        id: `proj-${Date.now()}`,
        title: '',
        subtitle: '',
        description: '',
        category: 'Desenvolvimento Web',
        stackInput: 'React 19, TypeScript, Tailwind CSS',
        repoUrl: 'https://github.com/A-jota07',
        previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
      });
    }
    setProjectModalOpen(true);
  };

  const handleSaveProjectForm = async (e) => {
    e.preventDefault();
    const stackArray = editingProject.stackInput
      ? editingProject.stackInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['React'];

    const projectToSave = {
      ...editingProject,
      stack: stackArray
    };
    delete projectToSave.stackInput;

    const res = await saveProject(projectToSave);
    setProjectModalOpen(false);
    if (res && res.error) {
      showToast(`⚠️ Salvo localmente! (Aviso Supabase: ${res.error})`);
    } else {
      showToast(`Projeto "${projectToSave.title}" salvo com sucesso!`);
    }
    loadData();
  };

  const handleDeleteProjectItem = async (id, title) => {
    if (window.confirm(`Tem certeza de que deseja excluir o projeto "${title}"?`)) {
      const res = await deleteProject(id, title);
      if (res && res.error) {
        showToast(`⚠️ Removido localmente. (Aviso Supabase: ${res.error})`);
      } else {
        showToast(`Projeto excluído com sucesso.`);
      }
      loadData();
    }
  };

  // --- SKILL CRUD HANDLERS ---
  const handleOpenSkillModal = (sk = null) => {
    if (sk) {
      setEditingSkill({ ...sk });
    } else {
      setEditingSkill({
        id: `sk-${Date.now()}`,
        category: 'Frontend & UI',
        name: '',
        level: 90,
        experience: '4 anos',
        tag: 'Especialista'
      });
    }
    setSkillModalOpen(true);
  };

  const handleSaveSkillForm = async (e) => {
    e.preventDefault();
    const res = await saveSkill(editingSkill);
    setSkillModalOpen(false);
    if (res && res.error) {
      showToast(`⚠️ Salva localmente! (Aviso Supabase: ${res.error})`);
    } else {
      showToast(`Habilidade "${editingSkill.name}" salva com sucesso!`);
    }
    loadData();
  };

  const handleDeleteSkillItem = async (id, name) => {
    if (window.confirm(`Excluir habilidade "${name}"?`)) {
      const res = await deleteSkill(id, name);
      if (res && res.error) {
        showToast(`⚠️ Removida localmente. (Aviso Supabase: ${res.error})`);
      } else {
        showToast(`Habilidade removida com sucesso.`);
      }
      loadData();
    }
  };

  // --- PROFILE SAVE HANDLER ---
  const handleSaveProfileForm = async (e) => {
    e.preventDefault();
    await saveProfileInfo(profile);
    showToast('Especificação do perfil atualizada!');
  };

  return (
    <div className="min-h-screen bg-[#070510] text-[#e2e8f0] font-mono selection:bg-[#9d4edd] selection:text-white pb-12">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c091d]/95 backdrop-blur-md border-b border-[#9d4edd]/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#18103c] border border-[#9d4edd]/30 text-[#f72585]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-wide font-mono">// Dashboard Admin CRUD Supabase</h1>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                  isSupabaseConfigured()
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                }`}>
                  {isSupabaseConfigured() ? '● SUPABASE CONECTADO' : '● MODO ARMAZENAMENTO LOCAL'}
                </span>
              </div>
              <p className="text-xs text-[#c77dff]">Usuário Autenticado: {getAdminSession()?.user?.email || profile.email || 'admin@dev.tech'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono bg-[#18103c] border border-[#9d4edd]/40 text-[#c77dff] hover:text-white hover:border-[#c77dff] transition-all cursor-pointer"
              title="Restaurar dados originais do código"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resincronizar Código</span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono bg-[#110d2a] border border-[#9d4edd]/30 text-slate-300 hover:text-white hover:border-[#c77dff] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Site Público</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/80 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#9d4edd]/20 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/30'
                : 'bg-[#0e0a22] text-slate-400 hover:text-slate-200 border border-[#9d4edd]/20'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>// Gerenciador de Projetos ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/30'
                : 'bg-[#0e0a22] text-slate-400 hover:text-slate-200 border border-[#9d4edd]/20'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>// Gerenciador de Habilidades ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/30'
                : 'bg-[#0e0a22] text-slate-400 hover:text-slate-200 border border-[#9d4edd]/20'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>// Editor de Perfil & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/30'
                : 'bg-[#0e0a22] text-slate-400 hover:text-slate-200 border border-[#9d4edd]/20'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>// Configurações da Conta</span>
          </button>
        </div>

        {!isSupabaseConfigured() && (
          <div className="p-3.5 rounded-xl bg-yellow-950/40 border border-yellow-500/30 text-yellow-300 text-xs font-mono flex items-start gap-2.5 shadow-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold tracking-wide text-yellow-400">// AVISO DE DEPLOY: MODO ARMAZENAMENTO LOCAL ATIVO</span>
              <p className="text-slate-300 leading-relaxed">
                As variáveis de ambiente do Supabase ainda não foram cadastradas na Vercel. Por conta disso, alterações (exclusões e edições) salvam apenas na memória deste navegador. Para sincronizar as alterações em tempo real em todos os navegadores e celulares, cadastre <code className="text-yellow-200 bg-black/50 px-1.5 py-0.5 rounded border border-yellow-500/20">VITE_SUPABASE_URL</code> e <code className="text-yellow-200 bg-black/50 px-1.5 py-0.5 rounded border border-yellow-500/20">VITE_SUPABASE_ANON_KEY</code> no painel da Vercel.
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-400">
            // Buscando registros no banco de dados...
          </div>
        ) : (
          <>
            {/* TAB 1: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white font-mono">// Projetos Ativos no Portfólio</h2>
                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-md shadow-[#9d4edd]/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>[+ Novo Projeto]</span>
                  </button>
                </div>

                <div className="rounded-xl border border-[#9d4edd]/30 bg-[#0c091d] overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#080514] border-b border-[#9d4edd]/20 text-[#c77dff]">
                        <tr>
                          <th className="p-3">Título do Projeto</th>
                          <th className="p-3">Categoria</th>
                          <th className="p-3">Etiqueta Badge</th>
                          <th className="p-3">Stack Tecnológica</th>
                          <th className="p-3 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#9d4edd]/15 text-slate-300">
                        {projects.map((proj) => (
                          <tr key={proj.id} className="hover:bg-[#130d35]/60 transition-colors">
                            <td className="p-3 font-semibold text-white">
                              <div>{proj.title}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{proj.subtitle}</div>
                            </td>
                            <td className="p-3 text-[#c77dff]">{proj.category}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#f72585] text-white font-bold">
                                {proj.tag}
                              </span>
                            </td>
                            <td className="p-3 max-w-xs truncate">
                              {Array.isArray(proj.stack) ? proj.stack.join(', ') : proj.stack}
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => handleOpenProjectModal(proj)}
                                className="p-1 rounded bg-[#9d4edd]/20 text-[#c77dff] hover:bg-[#9d4edd] hover:text-white transition-all cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProjectItem(proj.id, proj.title)}
                                className="p-1 rounded bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                title="Excluir"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SKILLS MANAGER */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white font-mono">// Inventário de Habilidades Técnicas</h2>
                  <button
                    onClick={() => handleOpenSkillModal()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-md shadow-[#9d4edd]/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>[+ Adicionar Habilidade]</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((sk) => (
                    <div
                      key={sk.id}
                      className="p-4 rounded-xl bg-[#0c091d] border border-[#9d4edd]/30 space-y-2 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">{sk.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#9d4edd]/20 text-[#c77dff]">
                          {sk.tag}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        Categoria: <span className="text-slate-200">{sk.category}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Experiência: {sk.experience}</span>
                          <span className="text-[#c77dff] font-bold">{sk.level}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            style={{ width: `${sk.level}%` }}
                            className="h-full bg-gradient-to-r from-[#9d4edd] to-[#f72585]"
                          ></div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#9d4edd]/15 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenSkillModal(sk)}
                          className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#9d4edd]/20 text-[#c77dff] hover:bg-[#9d4edd] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Editar
                        </button>
                        <button
                          onClick={() => handleDeleteSkillItem(sk.id, sk.name)}
                          className="px-2.5 py-1 rounded text-[11px] font-mono bg-red-950 text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROFILE & BIO EDITOR */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfileForm} className="p-6 rounded-xl bg-[#0c091d] border border-[#9d4edd]/30 space-y-6 max-w-3xl">
                <div className="flex items-center justify-between border-b border-[#9d4edd]/20 pb-3">
                  <h2 className="text-sm font-bold text-white font-mono">// Editar Especificação do Perfil</h2>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>SALVAR ALTERAÇÕES</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-slate-400">// Nome Completo</label>
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">// Título Profissional</label>
                    <input
                      type="text"
                      value={profile.title || ''}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">// Subtítulo de Especialização</label>
                    <input
                      type="text"
                      value={profile.specialization || ''}
                      onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">// Badge de Status de Disponibilidade</label>
                    <input
                      type="text"
                      value={profile.availability || 'DISPONÍVEL PARA CONTRATAÇÃO'}
                      onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-emerald-400 font-bold focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <label className="text-slate-400">// Texto de Biografia (estilo docstring)</label>
                  <textarea
                    rows={4}
                    value={profile.bioText || ''}
                    onChange={(e) => setProfile({ ...profile, bioText: e.target.value })}
                    className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-3 text-slate-200 focus:outline-none focus:border-[#c77dff]"
                  />
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <label className="text-slate-400">// Declaração de Filosofia</label>
                  <input
                    type="text"
                    value={profile.philosophy || ''}
                    onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
                    className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-slate-200 focus:outline-none focus:border-[#c77dff]"
                  />
                </div>
              </form>
            )}

            {/* TAB 4: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveAccountSettings} className="p-6 rounded-xl bg-[#0c091d]/90 border border-[#9d4edd]/30 shadow-xl space-y-6 max-w-2xl">
                <div className="flex items-center justify-between border-b border-[#9d4edd]/20 pb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#f72585]" />
                      <span>// Configurações da Conta & Credenciais (Supabase Auth)</span>
                    </h2>
                    <p className="text-xs text-[#c77dff] font-mono mt-1">
                      // Atualize e-mail, senha e nome de exibição do usuário admin
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={accountSaving}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-lg shadow-[#9d4edd]/30 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{accountSaving ? 'SALVANDO...' : 'SALVAR CONFIGURAÇÕES'}</span>
                  </button>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-400">// Nome de Exibição / Profile Display Name</label>
                    <input
                      type="text"
                      value={accountDisplayName}
                      onChange={(e) => setAccountDisplayName(e.target.value)}
                      placeholder={profile.name || "Alexandre Junior"}
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">// Endereço de E-mail da Conta</label>
                    <input
                      type="email"
                      value={accountEmail}
                      onChange={(e) => setAccountEmail(e.target.value)}
                      placeholder={getAdminSession()?.user?.email || "seu-email@exemplo.com"}
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">// Nova Senha (mínimo 6 caracteres)</label>
                    <input
                      type="password"
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#c77dff]"
                    />
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </main>

      {/* PROJECT FORM MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070510]/80 backdrop-blur-md">
          <form onSubmit={handleSaveProjectForm} className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0c091d] border border-[#9d4edd]/50 p-6 space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#9d4edd]/20 pb-3">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-[#f72585]" />
                <h3 className="text-sm font-bold text-white">// Editor de Projetos — Alexandre Jr // Desenvolvedor Full Stack Jr</h3>
              </div>
              <button type="button" onClick={() => setProjectModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* 1. Título do Projeto */}
              <div>
                <label className="text-slate-400 font-mono">// 1. Título do Projeto</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Ex: E-commerce Next.js, Dashboard Financeiro"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
              </div>

              {/* 2. Subtítulo */}
              <div>
                <label className="text-slate-400 font-mono">// 2. Subtítulo</label>
                <input
                  type="text"
                  value={editingProject.subtitle || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  placeholder="Ex: Plataforma de comércio eletrônico com pagamentos via Pix"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
              </div>

              {/* 3. Categoria (Input/Select Misto) */}
              <div>
                <label htmlFor="project_category" className="text-slate-400 font-mono">// 3. Categoria (Selecione ou digite uma nova)</label>
                <input
                  type="text"
                  list="category-options"
                  name="project_category"
                  id="project_category"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  required
                  value={editingProject.category || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  placeholder="Selecione ou digite uma categoria..."
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
                <datalist id="category-options">
                  <option value="Desenvolvimento Web" />
                  <option value="Sistemas & Backend" />
                  <option value="Mobile" />
                  <option value="IA & Automação" />
                  <option value="Data Science & Analytics" />
                  <option value="APIs & Microserviços" />
                  <option value="DevOps & Cloud" />
                  <option value="UI/UX & Frontend" />
                  <option value="Ferramentas & CLI" />
                </datalist>
              </div>

              {/* 4. Descrição */}
              <div>
                <label className="text-slate-400 font-mono">// 4. Descrição do Projeto</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Descreva as principais funcionalidades, valor de negócio e desafios técnicos resolvidos..."
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
              </div>

              {/* 5. Stack Tecnológica */}
              <div>
                <label className="text-slate-400 font-mono">// 5. Stack Tecnológica (separada por vírgulas)</label>
                <input
                  type="text"
                  value={editingProject.stackInput || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, stackInput: e.target.value })}
                  placeholder="React 19, TypeScript, Node.js, Tailwind CSS, Supabase"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
              </div>

              {/* 6. URL da Imagem de Capa (Cover Image + Live Preview) */}
              <div className="space-y-2">
                <label className="text-slate-400 font-mono">// 6. URL da Imagem de Capa (Cover Image)</label>
                <input
                  type="text"
                  value={editingProject.previewImage || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, previewImage: e.target.value })}
                  placeholder="https://exemplo.com/imagem-capa.jpg"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
                {editingProject.previewImage && (
                  <div className="relative h-32 w-full rounded-lg overflow-hidden border border-[#9d4edd]/30 bg-[#05030e]">
                    <img
                      src={editingProject.previewImage}
                      alt="Pré-visualização da Capa"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'; }}
                    />
                    <span className="absolute bottom-1.5 right-2 text-[10px] bg-[#070510]/85 text-[#c77dff] px-2 py-0.5 rounded border border-[#9d4edd]/30 font-mono">
                      Pré-visualização da Capa
                    </span>
                  </div>
                )}
              </div>

              {/* 7. URL Repositório GitHub */}
              <div>
                <label className="text-slate-400 font-mono">// 7. URL Repositório GitHub</label>
                <input
                  type="text"
                  value={editingProject.repoUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                  placeholder="https://github.com/A-jota07/nome-do-repositorio"
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white font-mono focus:outline-none focus:border-[#c77dff]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#9d4edd]/20 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="px-4 py-2 rounded bg-[#18103c] text-slate-300 hover:text-white font-mono border border-[#9d4edd]/30 transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded font-bold font-mono bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-lg shadow-[#9d4edd]/30 transition-all cursor-pointer"
              >
                Salvar Projeto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SKILL FORM MODAL */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070510]/80 backdrop-blur-md">
          <form onSubmit={handleSaveSkillForm} className="relative w-full max-w-md rounded-xl bg-[#0c091d] border border-[#9d4edd]/50 p-6 space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#9d4edd]/20 pb-3">
              <h3 className="text-sm font-bold text-white">// Especificação do Editor de Habilidades</h3>
              <button type="button" onClick={() => setSkillModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400">Nome da Habilidade</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400">Categoria</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white"
                >
                  <option>Linguagens & Core</option>
                  <option>Frontend & UI</option>
                  <option>Backend & Cloud</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between">
                  <label className="text-slate-400">Nível de Proficiência (%)</label>
                  <span className="text-[#c77dff] font-bold">{editingSkill.level}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={editingSkill.level}
                  onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                  className="w-full accent-[#9d4edd]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400">Experiência (ex: 5 anos)</label>
                  <input
                    type="text"
                    value={editingSkill.experience}
                    onChange={(e) => setEditingSkill({ ...editingSkill, experience: e.target.value })}
                    className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400">Tag (ex: Especialista, Mestre)</label>
                  <input
                    type="text"
                    value={editingSkill.tag}
                    onChange={(e) => setEditingSkill({ ...editingSkill, tag: e.target.value })}
                    className="w-full bg-[#05030e] border border-[#9d4edd]/30 rounded p-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#9d4edd]/20 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSkillModalOpen(false)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded font-bold bg-[#9d4edd] text-white hover:bg-[#c77dff]"
              >
                Salvar Habilidade
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-[#0e0a22] border border-[#f72585] text-white shadow-2xl shadow-[#f72585]/40 font-mono text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
