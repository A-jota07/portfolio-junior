import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShowcaseWidget from './components/ShowcaseWidget';
import AboutMeSection from './components/AboutMeSection';
import ProjectsSection from './components/ProjectsSection';
import InteractiveTerminal from './components/InteractiveTerminal';
import ProjectModal from './components/ProjectModal';
import { PERSONAL_INFO } from './data/portfolioData';
import { Terminal, Sparkles, Heart, Mail, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './components/Icons';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleHireClick = () => {
    showToast('🚀 Hire inquiry protocol initiated! Email: michael.weaver@dev.tech');
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070510] text-[#e2e8f0] font-mono relative overflow-x-hidden bg-studio-grid bg-dot-matrix">
      
      {/* Background Radial Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#9d4edd]/20 to-[#f72585]/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#7209b7]/25 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Container Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-8">

        {/* CENTRAL MAIN FRAME (Visual Studio Code / Terminal IDE Aesthetic) */}
        <div className="rounded-2xl border border-[#9d4edd]/35 bg-[#0a0718]/95 shadow-[0_0_50px_rgba(157,78,221,0.2)] backdrop-blur-xl overflow-hidden transition-all duration-300">
          
          {/* Top Navbar */}
          <Navbar
            activeSection={activeSection}
            setActiveSection={scrollToSection}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
            onHireClick={handleHireClick}
          />

          {/* DUAL PANEL MAIN BODY FRAME (Hero Left Panel + Showcase Widget Right Panel) */}
          <div id="home" className="p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
            {/* Left Panel: Hero & Developer Profile */}
            <div className="lg:col-span-7 rounded-xl bg-[#090616]/90 border border-[#9d4edd]/20 p-2 shadow-inner">
              <HeroSection
                onExploreClick={() => scrollToSection('projects')}
                onContactClick={handleHireClick}
              />
            </div>

            {/* Right Panel: Showcase Widget (Active Project / Repo Metrics) */}
            <div className="lg:col-span-5 rounded-xl bg-[#090616]/90 border border-[#9d4edd]/20 p-2 shadow-inner">
              <ShowcaseWidget
                onSelectProjectModal={(proj) => setSelectedModalProject(proj)}
              />
            </div>
          </div>

          {/* Bottom IDE Interactive Terminal */}
          <div className="px-3 sm:px-6 pb-6">
            <InteractiveTerminal
              onExecuteCommand={(cmd) => {
                if (cmd === 'hire') handleHireClick();
              }}
            />
          </div>
        </div>

        {/* PERIPHERAL SECTIONS (Surrounding sections linked directly below central frame) */}
        <div className="space-y-12 px-2 sm:px-4">
          {/* Section 02: About Me & Tech Stack */}
          <AboutMeSection filterQuery={filterQuery} />

          {/* Section 03: Featured Projects Gallery */}
          <ProjectsSection
            filterQuery={filterQuery}
            onSelectProjectModal={(proj) => setSelectedModalProject(proj)}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 pb-12 border-t border-[#9d4edd]/20 text-center space-y-4 text-xs font-mono text-slate-400">
          <div className="flex items-center justify-center gap-4">
            <a
              href={`https://${PERSONAL_INFO.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#c77dff] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>// github</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={`https://${PERSONAL_INFO.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#c77dff] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>// linkedin</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={`mailto:${PERSONAL_INFO.contact.email}`}
              className="flex items-center gap-1 hover:text-[#c77dff] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>// email</span>
            </a>
          </div>

          <p className="flex items-center justify-center gap-1">
            <span>Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#f72585] fill-[#f72585]" />
            <span>using React 19 & Midnight Purple Aesthetic</span>
          </p>

          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Michael Weaver. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Project Detail Modal */}
      {selectedModalProject && (
        <ProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
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
