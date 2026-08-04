import React, { useState } from 'react';
import { Code2, Layout, Server, Cpu, Sparkles, Terminal, Layers, Star } from 'lucide-react';

export default function AboutMeSection({ skillsList = [], profileInfo = {}, filterQuery = '' }) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Categorias padrão
  const defaultCategories = [
    'Linguagens de Programação',
    'Frontend & Web UI',
    'Backend & APIs',
    'Cloud, DevOps & Infra',
    'Bancos de Dados & Storage',
    'IA & Data Science'
  ];

  // Extrair categorias presentes na lista de habilidades dinamicamente
  const presentCategories = Array.from(new Set(skillsList.map(skill => skill.category).filter(Boolean)));
  
  // Lista final de nomes de categorias
  const categoryNames = presentCategories.length > 0
    ? Array.from(new Set([...defaultCategories.filter(c => presentCategories.includes(c)), ...presentCategories]))
    : defaultCategories;

  const skillCategories = categoryNames.map(catName => {
    const matchingSkills = skillsList.filter(skill => {
      const isCatMatch = skill.category === catName;
      const isSearchMatch = filterQuery === '' || 
        skill.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        (skill.tag && skill.tag.toLowerCase().includes(filterQuery.toLowerCase()));

      const isCategoryFilterMatch = selectedCategory === 'Todas' || selectedCategory === 'All' || selectedCategory === catName;

      return isCatMatch && isSearchMatch && isCategoryFilterMatch;
    });

    return {
      name: catName,
      skills: matchingSkills
    };
  }).filter(cat => cat.skills.length > 0);

  const getTagBadgeStyle = (tag = '') => {
    const t = tag.toLowerCase();
    if (t.includes('mestre') || t.includes('arquiteto') || t.includes('lead')) {
      return 'bg-purple-950/80 text-fuchsia-300 border-fuchsia-500/40 font-bold';
    }
    if (t.includes('especialista') || t.includes('sênior') || t.includes('senior')) {
      return 'bg-pink-950/80 text-pink-300 border-pink-500/40 font-bold';
    }
    if (t.includes('avançado') || t.includes('avancado') || t.includes('pleno')) {
      return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
    }
    if (t.includes('intermediário') || t.includes('intermediario') || t.includes('praticante')) {
      return 'bg-blue-950/80 text-blue-300 border-blue-500/40';
    }
    if (t.includes('básico') || t.includes('basico') || t.includes('aprendiz') || t.includes('iniciante')) {
      return 'bg-slate-900 text-cyan-300 border-cyan-500/30';
    }
    return 'bg-[#9d4edd]/20 text-[#c77dff] border-[#9d4edd]/30';
  };

  return (
    <section id="about-me" className="py-8 border-t border-[#9d4edd]/20 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#f72585] mb-1">
            <span>// 02.</span>
            <span>BIOGRAPHY & TECHNICAL COMPETENCIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white flex items-center gap-2">
            <span className="text-[#9d4edd]">&gt;</span> _about-me & _skills
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['Todas', ...categoryNames].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat || (selectedCategory === 'All' && cat === 'Todas')
                  ? 'bg-[#9d4edd] text-white font-bold shadow-md shadow-[#9d4edd]/30'
                  : 'bg-[#0e0a22] text-slate-400 hover:text-slate-200 border border-[#9d4edd]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Code Comment Bio Specification Block */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#0e0a22]/90 border border-[#9d4edd]/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#9d4edd]/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c77dff] font-bold">
              <Terminal className="w-4 h-4 text-[#f72585]" />
              <span>/* Bio_Specification.md */</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {profileInfo.availability || 'AVAILABLE FOR HIRE'}
            </span>
          </div>

          {/* Formatted Code Comment Text */}
          <div className="text-xs sm:text-sm font-mono leading-relaxed text-slate-300 space-y-3">
            <p className="text-emerald-400/90 italic">
              /*<br />
              &nbsp;* @name {profileInfo.name || "Alexandre Cássio de Souza Junior"}<br />
              &nbsp;* @role {profileInfo.title || "Engenheiro Full Stack Junior"}<br />
              &nbsp;* @location {profileInfo.location || "Rondonópolis, MT (Disponível Remoto)"}<br />
              &nbsp;*/
            </p>

            <p>
              {profileInfo.bioText || "Desenvolvedor Full Stack Junior focado em construir aplicações web modernas, escaláveis e com design impecável."}
            </p>

            {/* Key Domains Badges */}
            <div className="pt-2 border-t border-[#9d4edd]/15 space-y-1.5">
              <div className="text-[11px] font-mono text-slate-400 font-semibold">// Domínios Chave:</div>
              <div className="flex flex-wrap gap-1.5">
                {["Aplicações Web", "Sistemas Distribuídos", "Design System"].map((domain, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#9d4edd]/20 text-[#c77dff] border border-[#9d4edd]/30">
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            {/* Open Source Highlight */}
            <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-300">
              <span className="text-slate-400">// Open Source:</span>
              <span className="font-semibold text-[#f72585]">20+ projetos desenvolvidos</span>
            </div>

            <p className="pt-2 text-slate-400 text-xs border-t border-[#9d4edd]/15">
              <span className="text-[#9d4edd] font-bold">// Filosofia:</span> "{profileInfo.philosophy || "Complexidade nos bastidores, simplicidade na tela. Acredito que o bom software é aquele que coloca a experiência do usuário no centro, transformando problemas complexos em interações intuitivas e inclusivas."}"
            </p>
          </div>

        </div>

        {/* Right Column: Tech Stack Grid */}
        <div className="lg:col-span-7 space-y-4">
          {skillCategories.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0e0a22]/60 border border-[#9d4edd]/20 text-center text-slate-400 font-mono text-xs">
              // Nenhum conhecimento encontrado para o filtro: "{filterQuery}".
            </div>
          ) : (
            skillCategories.map((category) => (
              <div
                key={category.name}
                className="p-4 rounded-xl bg-[#0c091d]/80 border border-[#9d4edd]/25 shadow-lg hover:border-[#9d4edd]/50 transition-all"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#9d4edd]/15">
                  <Code2 className="w-4 h-4 text-[#c77dff]" />
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
                    // {category.name}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id || skill.name}
                      className="p-2.5 rounded-lg bg-[#060412] border border-[#9d4edd]/20 hover:border-[#c77dff]/60 transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-slate-200 group-hover:text-[#c77dff] transition-colors">
                          {skill.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#9d4edd]/20 text-[#c77dff]">
                          {skill.experience || '4 yrs'}
                        </span>
                      </div>

                      {/* Animated Purple/Magenta Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden flex">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-500 rounded-full group-hover:shadow-[0_0_10px_#c77dff] transition-all duration-500"
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                        <span className={`px-1.5 py-0.5 rounded border ${getTagBadgeStyle(skill.tag)}`}>
                          tag: {skill.tag || 'Especialista'}
                        </span>
                        <span className="text-[#c77dff] font-bold">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
