import React, { useState } from 'react';
import { PERSONAL_INFO, CODE_SNIPPETS } from '../data/portfolioData';
import { Terminal, Copy, Check, Mail, Play, Sparkles, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function HeroSection({ onExploreClick, onContactClick }) {
  const [activeTab, setActiveTab] = useState('contact');
  const [copied, setCopied] = useState(false);

  const getCodeContent = () => {
    switch (activeTab) {
      case 'contact':
        return CODE_SNIPPETS.contactInfo;
      case 'config':
        return CODE_SNIPPETS.developerConfig;
      case 'experience':
        return `// Resumo de Experiência & Principais Conquistas
const resumoCarreira = {
  cargoAtual: "Arquiteto Full Stack & IA Senior @ TechCorp",
  experiencia: "${PERSONAL_INFO.stats.experienceYears}",
  dominiosChave: ["Agentes de IA & RAG", "Sistemas Distribuídos", "React & Ferramentas Web"],
  openSource: "${PERSONAL_INFO.stats.reposContributed} repositórios no GitHub",
  disponibilidade: "${PERSONAL_INFO.status}"
};`;
      default:
        return CODE_SNIPPETS.contactInfo;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col justify-between h-full p-4 sm:p-6 text-slate-200">
      {/* Top Header Comments & Metadata */}
      <div>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 mb-2">
          <span className="text-[#9d4edd] font-semibold">//</span>
          <span>{PERSONAL_INFO.name}</span>
          <span className="text-slate-600">|</span>
          <span className="text-[#c77dff]">// {PERSONAL_INFO.title}</span>
        </div>

        {/* Main Monospace Greeting */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-mono text-white mb-3 leading-tight">
          <span className="text-[#f72585] text-glow-purple">&gt;&gt;</span> Perfil do Dev:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c77dff] to-[#9d4edd]">
            {PERSONAL_INFO.name}
          </span>
        </h1>

        {/* Sub-title */}
        <div className="flex items-center gap-2 text-sm sm:text-lg font-mono text-[#c77dff] mb-6">
          <span className="text-[#9d4edd] font-bold">&gt;</span>
          <span className="font-medium">{PERSONAL_INFO.specialization}</span>
          <span className="inline-block w-2.5 h-5 bg-[#f72585] animate-cursor ml-1"></span>
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <div className="p-2.5 rounded-lg bg-[#0e0a22]/80 border border-[#9d4edd]/20 hover:border-[#9d4edd]/50 transition-colors">
            <div className="text-[10px] text-slate-400 font-mono">// experiência</div>
            <div className="text-base sm:text-lg font-bold text-white font-mono">{PERSONAL_INFO.stats.experienceYears}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0e0a22]/80 border border-[#9d4edd]/20 hover:border-[#9d4edd]/50 transition-colors">
            <div className="text-[10px] text-slate-400 font-mono">// repositórios</div>
            <div className="text-base sm:text-lg font-bold text-[#c77dff] font-mono">{PERSONAL_INFO.stats.reposContributed}</div>
          </div>
        </div>
      </div>

      {/* Code Editor Interactive Snippet Panel */}
      <div className="my-3 rounded-lg overflow-hidden border border-[#9d4edd]/30 bg-[#080514]/90 shadow-xl shadow-[#070510]">
        {/* Editor Header Bar */}
        <div className="px-3 py-1.5 bg-[#0e0a22] border-b border-[#9d4edd]/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'contact'
                  ? 'bg-[#18103c] text-[#c77dff] border-b border-[#f72585]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3 h-3 text-[#9d4edd]" />
              contatoInfo.js
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'config'
                  ? 'bg-[#18103c] text-[#c77dff] border-b border-[#f72585]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3 h-3 text-[#f72585]" />
              perfilDev.ts
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 hidden sm:flex ${
                activeTab === 'experience'
                  ? 'bg-[#18103c] text-[#c77dff] border-b border-[#f72585]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
              resumo.json
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 hover:text-[#c77dff] hover:bg-[#9d4edd]/10 transition-all cursor-pointer"
            title="Copiar snippet de código"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'copiado!' : 'copiar'}</span>
          </button>
        </div>

        {/* Code Content Block */}
        <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#05030c] text-slate-300">
          <pre className="selection:bg-[#9d4edd]/40">
            <code>
              {getCodeContent().split('\n').map((line, idx) => {
                let colorClass = "text-slate-300";
                if (line.startsWith('//')) colorClass = "text-emerald-400/90 italic";
                else if (line.includes('const') || line.includes('export') || line.includes('return')) colorClass = "text-[#f72585] font-semibold";
                else if (line.includes(':')) colorClass = "text-[#c77dff]";
                
                return (
                  <div key={idx} className="flex">
                    <span className="w-7 select-none text-slate-600 text-right pr-3 font-mono text-xs">{idx + 1}</span>
                    <span className={colorClass}>{line}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>

      {/* Hero Action Buttons */}
      <div className="pt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={onExploreClick}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-mono text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#9d4edd] to-[#7209b7] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-lg shadow-[#9d4edd]/30 hover:shadow-[#9d4edd]/50 transition-all transform active:scale-95 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>// VER_PROJETOS</span>
        </button>

        <button
          onClick={onContactClick}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-mono text-xs sm:text-sm font-medium bg-[#0e0a22] border border-[#9d4edd]/40 text-[#c77dff] hover:bg-[#9d4edd]/20 hover:border-[#c77dff] transition-all cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>// contate_me</span>
        </button>

        <a
          href={`https://${PERSONAL_INFO.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-md bg-[#0e0a22] border border-[#9d4edd]/30 text-slate-300 hover:text-[#c77dff] hover:border-[#c77dff] transition-all cursor-pointer"
          title="Perfil no GitHub"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        <a
          href={`https://${PERSONAL_INFO.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-md bg-[#0e0a22] border border-[#9d4edd]/30 text-slate-300 hover:text-[#c77dff] hover:border-[#c77dff] transition-all cursor-pointer"
          title="Perfil no LinkedIn"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
