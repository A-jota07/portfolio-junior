import React, { useState } from 'react';
import { Search, Code, Terminal, Sparkles, Command, Check, Copy } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection, filterQuery, setFilterQuery, onHireClick }) {
  const [copied, setCopied] = useState(false);

  const navItems = [
    { id: 'home', label: '_home', comment: '// main landing' },
    { id: 'about-me', label: '_about-me', comment: '// bio & experience' },
    { id: 'projects', label: '_projects', comment: '// showcase gallery' },
    { id: 'skills', label: '_skills', comment: '// tech stack' }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("michael.weaver@dev.tech");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="w-full bg-[#0c091d]/90 backdrop-blur-md border-b border-[#9d4edd]/25 sticky top-0 z-40 shadow-lg shadow-[#070510]/50">
      {/* Top Window Control & File Path Bar */}
      <div className="px-4 py-2 bg-[#070510]/80 border-b border-[#9d4edd]/15 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {/* OS Window Controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm shadow-red-500/50 hover:opacity-100 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm shadow-yellow-500/50 hover:opacity-100 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm shadow-emerald-500/50 hover:opacity-100 cursor-pointer"></span>
          </div>

          <div className="h-3 w-[1px] bg-slate-800 mx-1 hidden sm:block"></div>

          {/* Current File Path Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-[#c77dff]" />
            <span className="text-slate-500">portfolio-junior</span>
            <span className="text-slate-600">/</span>
            <span className="text-[#c77dff] font-medium">src/{activeSection}.config.tsx</span>
          </div>
        </div>

        {/* System Status Indicators */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#9d4edd]/10 border border-[#9d4edd]/20 text-[#c77dff]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>main*</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">UTF-8</span>
          </div>

          <button 
            onClick={handleCopyEmail}
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-[#c77dff] transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-xs">michael.weaver@dev.tech</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation & Filter Input */}
      <div className="px-3 sm:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 py-1.5">
        {/* Navigation Tabs (IDE Style) */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`relative group px-3.5 py-1.5 rounded-t-md font-mono text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#150f33] text-[#c77dff] border-t-2 border-[#9d4edd] font-semibold shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#110d2a]/60'
                }`}
              >
                <span className={isActive ? 'text-[#f72585]' : 'text-slate-500 group-hover:text-[#c77dff]'}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] shadow-[0_0_8px_#f72585]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Filter Input & Quick Actions */}
        <div className="flex items-center gap-3">
          {/* // filter Compact Input */}
          <div className="relative flex-1 md:w-56 group">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#c77dff]">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="// filter skills & projects..."
              className="w-full bg-[#080514] border border-[#9d4edd]/30 rounded px-3 py-1 pl-8 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-[#c77dff] focus:ring-1 focus:ring-[#c77dff]/50 transition-all"
            />
            {filterQuery && (
              <button 
                onClick={() => setFilterQuery('')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Contact / Hire Button */}
          <button
            onClick={onHireClick}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium bg-gradient-to-r from-[#9d4edd] to-[#7209b7] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-md shadow-[#9d4edd]/20 transition-all transform active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>// hire_me</span>
          </button>
        </div>
      </div>
    </header>
  );
}
