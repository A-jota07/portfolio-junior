import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070510]/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Card Window */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0c091d] border border-[#9d4edd]/50 shadow-2xl shadow-[#9d4edd]/30 text-slate-200 flex flex-col justify-between font-mono">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-10 px-5 py-3 bg-[#080514] border-b border-[#9d4edd]/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] shadow-[0_0_10px_#f72585]"></span>
            <span className="text-xs text-slate-400">// especificacao_projeto:</span>
            <span className="text-sm font-bold text-white">{project.title}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#9d4edd]/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6">
          {/* Top Preview Banner */}
          <div className="relative h-56 rounded-lg overflow-hidden border border-[#9d4edd]/30 bg-slate-950">
            <img
              src={project.previewImage}
              alt={project.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c091d] via-transparent to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f72585] text-white">
                  {project.category}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">{project.title}</h2>
                <p className="text-xs text-[#c77dff]">{project.subtitle}</p>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">
                  // Desenvolvido por: Alexandre Jr // Desenvolvedor Full Stack Jr
                </span>
              </div>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center gap-2 border-b border-[#9d4edd]/20 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#9d4edd] text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              // Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-[#9d4edd] text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              // Arquitetura & Destaques
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#c77dff] uppercase mb-1">// Descrição</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#c77dff] uppercase mb-2">// Stack Tecnológica</h4>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.stack) ? project.stack : (project.stack ? project.stack.split(',') : [])).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded text-xs font-mono bg-[#1a123f] text-[#c77dff] border border-[#9d4edd]/30"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#c77dff] uppercase mb-1">// Destaques Técnicos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(project.highlights || ["Latência ultrabaixa", "Design responsivo", "CI/CD automatizado"]).map((h, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#060412] border border-[#9d4edd]/20 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">{h}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg bg-[#05030e] border border-[#9d4edd]/20 text-xs text-slate-300 space-y-1">
                <div className="text-[#f72585] font-bold">// Diagrama de Arquitetura</div>
                <div>Frontend: React 19 SPA + sincronização em tempo real via WebSockets</div>
                <div>Backend: Malha de microsserviços de alta performance</div>
                <div>Implantação: Esteira de CI/CD automatizada em rede Edge</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#080514] border-t border-[#9d4edd]/20 flex items-center justify-end">
          <a
            href={project.repoUrl || 'https://github.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded text-xs font-mono font-bold bg-[#120d2d] border border-[#9d4edd]/30 text-slate-200 hover:text-[#c77dff] hover:border-[#c77dff] transition-all cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>// VER CÓDIGO FONTE NO GITHUB</span>
          </a>
        </div>
      </div>
    </div>
  );
}
