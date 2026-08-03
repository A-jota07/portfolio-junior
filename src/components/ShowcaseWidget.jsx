import React, { useState } from 'react';
import { Maximize2, CheckCircle2 } from 'lucide-react';

export default function ShowcaseWidget({ projectsList = [], onSelectProjectModal }) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  if (!projectsList || projectsList.length === 0) {
    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-6 bg-[#0c091d]/90 backdrop-blur-md rounded-xl border border-[#9d4edd]/30 shadow-2xl shadow-[#9d4edd]/10">
        <div className="flex items-center gap-2 pb-3 border-b border-[#9d4edd]/20">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] shadow-[0_0_10px_#f72585]"></span>
          <h2 className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
            // Vitrine de Projetos ao Vivo
          </h2>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-2">
          <p className="text-xs font-mono text-slate-400">
            // Nenhum projeto cadastrado na vitrine.
          </p>
          <p className="text-[11px] font-mono text-slate-500">
            Adicione novos projetos através do Painel Administrativo.
          </p>
        </div>
      </div>
    );
  }

  const currentProject = projectsList[selectedProjectIndex] || projectsList[0];
  const stackList = Array.isArray(currentProject.stack) 
    ? currentProject.stack 
    : (currentProject.stack ? currentProject.stack.split(',') : []);

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 bg-[#0c091d]/90 backdrop-blur-md rounded-xl border border-[#9d4edd]/30 shadow-2xl shadow-[#9d4edd]/10">
      {/* Widget Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#9d4edd]/20">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] shadow-[0_0_10px_#f72585]"></span>
        <h2 className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
          // Vitrine de Projetos ao Vivo
        </h2>
      </div>

      {/* LIVE PROJECT SHOWCASE */}
      <div className="flex-1 flex flex-col justify-between pt-3 gap-3">
        {/* Project Carousel Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {projectsList.map((proj, idx) => (
            <button
              key={proj.id || idx}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedProjectIndex === idx
                  ? 'bg-[#1e1445] text-[#c77dff] border border-[#f72585] font-semibold'
                  : 'bg-[#070510]/60 text-slate-400 hover:text-slate-200 border border-[#9d4edd]/10'
              }`}
            >
              [{idx + 1}] {(proj.title || 'Projeto').split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Project Preview Card Frame */}
        <div className="relative group rounded-lg overflow-hidden border border-[#9d4edd]/30 bg-[#05030e] shadow-lg">
          {/* Visual Thumbnail & Gradient Overlay */}
          <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
            <img
              src={currentProject.previewImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'}
              alt={currentProject.title}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05030e] via-[#05030e]/40 to-transparent"></div>

            {/* Status Badge & Tag */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f72585] text-white shadow-md">
                {currentProject.tag || currentProject.category || 'DESTAQUE'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                ONLINE
              </span>
            </div>

            {/* Quick View Trigger */}
            <button
              onClick={() => onSelectProjectModal(currentProject)}
              className="absolute top-2.5 right-2.5 p-1.5 rounded bg-[#070510]/80 text-slate-300 hover:text-[#c77dff] border border-[#9d4edd]/40 cursor-pointer"
              title="Expandir Detalhes"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Floating Title & Subtitle inside Thumbnail */}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center justify-between">
                <span>{currentProject.title}</span>
              </h3>
              <p className="text-xs text-[#c77dff] font-mono line-clamp-1">{currentProject.subtitle}</p>
            </div>
          </div>

          {/* Description & Stack Badges */}
          <div className="p-3.5 bg-[#080514] space-y-3">
            <p className="text-xs text-slate-300 font-mono leading-relaxed line-clamp-2">
              {currentProject.description}
            </p>

            {/* Stack Icons & Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              {stackList.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1a123f] text-[#c77dff] border border-[#9d4edd]/30"
                >
                  {typeof tech === 'string' ? tech.trim() : tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Inspecionar (w-full) */}
        <div className="flex items-center">
          <button
            onClick={() => onSelectProjectModal(currentProject)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md font-mono text-xs bg-[#110d2a] border border-[#9d4edd]/30 text-[#c77dff] hover:border-[#c77dff] hover:bg-[#9d4edd]/10 transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>// INSPECIONAR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
