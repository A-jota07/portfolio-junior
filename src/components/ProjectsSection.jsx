import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection({ projectsList = [], filterQuery = '', onSelectProjectModal }) {
  const [selectedTag, setSelectedTag] = useState('All');

  // Filter projects by search query and category tag
  const filteredProjects = projectsList.filter((proj) => {
    const stackStr = Array.isArray(proj.stack) ? proj.stack.join(' ') : (proj.stack || '');
    const matchesSearch = filterQuery === '' ||
      proj.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      stackStr.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesTag = selectedTag === 'All' || proj.category === selectedTag;

    return matchesSearch && matchesTag;
  });

  return (
    <section id="projects" className="py-8 border-t border-[#9d4edd]/20 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#f72585] mb-1">
            <span>// 03.</span>
            <span>FEATURED PROJECTS & WORK GALLERY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white flex items-center gap-2">
            <span className="text-[#9d4edd]">&gt;</span> _projects
          </h2>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['All', 'AI & Tools', 'Infrastructure', 'Security', 'UI/UX'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedTag(category)}
              className={`px-3 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === category
                  ? 'bg-[#9d4edd] text-white font-bold shadow-md shadow-[#9d4edd]/30'
                  : 'bg-[#0e0a22] text-slate-400 hover:text-slate-200 border border-[#9d4edd]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-8 rounded-xl bg-[#0e0a22]/60 border border-[#9d4edd]/20 text-center text-slate-400 font-mono text-xs">
          // No projects match filter query: "{filterQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl overflow-hidden bg-[#0c091d]/90 border border-[#9d4edd]/30 hover:border-[#c77dff] shadow-xl hover:shadow-[0_0_30px_rgba(157,78,221,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Image Preview Header */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={project.previewImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c091d] via-[#0c091d]/40 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f72585] text-white shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Inspect Action */}
                <button
                  onClick={() => onSelectProjectModal(project)}
                  className="absolute top-3 right-3 p-1.5 rounded bg-[#070510]/80 text-slate-300 hover:text-[#c77dff] border border-[#9d4edd]/40 cursor-pointer"
                  title="View Full Specification"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Project Title overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-bold font-mono text-white group-hover:text-[#c77dff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-300">{project.subtitle}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs font-mono text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(Array.isArray(project.stack) ? project.stack : (project.stack ? project.stack.split(',') : [])).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#18103c] text-[#c77dff] border border-[#9d4edd]/30"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[#9d4edd]/15 flex items-center justify-end">
                  <a
                    href={project.repoUrl || 'https://github.com/A-jota07'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#9d4edd]/20 transition-all flex items-center gap-1.5 text-xs font-mono"
                    title="Código Fonte no GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>// Código Fonte</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
