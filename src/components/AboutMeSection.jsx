import React, { useState } from 'react';
import { SKILL_CATEGORIES, PERSONAL_INFO } from '../data/portfolioData';
import { Code2, Layout, Server, Cpu, Sparkles, CheckCircle, Terminal, Layers, Star } from 'lucide-react';

export default function AboutMeSection({ filterQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter skills based on search query & selected category
  const filteredCategories = SKILL_CATEGORIES.map(cat => {
    const matchingSkills = cat.skills.filter(skill => {
      const matchesSearch = filterQuery === '' || 
        skill.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        skill.tag.toLowerCase().includes(filterQuery.toLowerCase());
      
      const matchesCat = selectedCategory === 'All' || cat.name === selectedCategory;

      return matchesSearch && matchesCat;
    });

    return {
      ...cat,
      skills: matchingSkills
    };
  }).filter(cat => cat.skills.length > 0);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-[#c77dff]" />;
      case 'Layout': return <Layout className="w-4 h-4 text-[#f72585]" />;
      case 'Server': return <Server className="w-4 h-4 text-[#9d4edd]" />;
      default: return <Cpu className="w-4 h-4 text-[#c77dff]" />;
    }
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
          {['All', 'Languages & Core', 'Frontend & UI', 'Backend & Cloud'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
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
        {/* Left Column: JSDoc Style Bio Block */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-[#0e0a22]/90 border border-[#9d4edd]/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#9d4edd]/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c77dff] font-bold">
              <Terminal className="w-4 h-4 text-[#f72585]" />
              <span>/** Bio_Specification.md **/</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              AVAILABLE FOR HIRE
            </span>
          </div>

          {/* Formatted Docstring Text */}
          <div className="text-xs sm:text-sm font-mono leading-relaxed text-slate-300 space-y-3">
            <p className="text-emerald-400/90 italic">
              /**<br />
              &nbsp;* @name {PERSONAL_INFO.name}<br />
              &nbsp;* @role {PERSONAL_INFO.title}<br />
              &nbsp;* @location {PERSONAL_INFO.location}<br />
              &nbsp;*/
            </p>

            <p>
              I am a passionate <span className="text-[#c77dff] font-semibold">Senior Full Stack Developer</span> specializing in high-performance web applications, modern React ecosystems, and AI-driven interactive software.
            </p>

            <p>
              With over <span className="text-[#f72585] font-semibold">7+ years of engineering experience</span>, I bridge the gap between complex system architecture and pixel-perfect developer UI aesthetic.
            </p>

            <p className="pt-2 text-slate-400 text-xs border-t border-[#9d4edd]/15">
              <span className="text-[#9d4edd] font-bold">// Philosophy:</span> "Write robust, self-documenting code. Build interfaces that inspire curiosity and deliver uncompromising speed."
            </p>
          </div>

          {/* Key Strengths Badges */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#160d38] text-[#c77dff] border border-[#9d4edd]/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              React 19 Architecture
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#160d38] text-[#c77dff] border border-[#9d4edd]/30 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#f72585]" />
              RAG & AI Agents
            </span>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#160d38] text-[#c77dff] border border-[#9d4edd]/30 flex items-center gap-1">
              <Star className="w-3 h-3 text-emerald-400" />
              Web Tooling & DX
            </span>
          </div>
        </div>

        {/* Right Column: Tech Stack Grid */}
        <div className="lg:col-span-7 space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0e0a22]/60 border border-[#9d4edd]/20 text-center text-slate-400 font-mono text-xs">
              // No skills match query: "{filterQuery}". Try clear search.
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.name}
                className="p-4 rounded-xl bg-[#0c091d]/80 border border-[#9d4edd]/25 shadow-lg hover:border-[#9d4edd]/50 transition-all"
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#9d4edd]/15">
                  {getCategoryIcon(category.icon)}
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
                    // {category.name}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-[#060412] border border-[#9d4edd]/20 hover:border-[#c77dff]/60 transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-slate-200 group-hover:text-[#c77dff] transition-colors">
                          {skill.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#9d4edd]/20 text-[#c77dff]">
                          {skill.experience}
                        </span>
                      </div>

                      {/* Level Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden flex">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="h-full bg-gradient-to-r from-[#9d4edd] via-[#c77dff] to-[#f72585] rounded-full group-hover:shadow-[0_0_10px_#c77dff] transition-all duration-500"
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                        <span>tag: {skill.tag}</span>
                        <span className="text-[#c77dff]">{skill.level}%</span>
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
