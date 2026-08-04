import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, LayoutDashboard, FileQuestion, Sparkles, ShieldAlert, Cpu, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    document.title = '404 // Página Não Encontrada';
    const timer = setTimeout(() => setMounted(true), 50);

    // Random periodic glitch effect trigger
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 250);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070510] text-[#e2e8f0] font-mono relative overflow-hidden flex flex-col justify-between p-4 sm:p-8 bg-studio-grid bg-dot-matrix selection:bg-[#9d4edd] selection:text-white">
      
      {/* Background Radial Ambient Glow Orbs */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-[#9d4edd]/20 via-[#7209b7]/15 to-[#f72585]/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-[#480ca8]/25 to-transparent rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Floating Background Particles & Floating Cyber Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-10 text-[#9d4edd]/20 animate-pulse">
          <FileQuestion className="w-16 h-16" />
        </div>
        <div className="absolute top-1/3 right-16 text-[#f72585]/20 animate-bounce" style={{ animationDuration: '4s' }}>
          <Cpu className="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-[#c77dff]/20 animate-spin" style={{ animationDuration: '12s' }}>
          <Sparkles className="w-14 h-14" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 text-emerald-500/15 animate-pulse" style={{ animationDuration: '3s' }}>
          <ShieldAlert className="w-10 h-10" />
        </div>
      </div>

      {/* Header Window Bar */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-2 px-4 rounded-lg bg-[#0e0a22]/80 border border-[#9d4edd]/25 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
          <span className="ml-2 font-mono text-[#c77dff] font-semibold">// SYSTEM_ERROR_HANDLER</span>
        </div>

        {/* Top Header Code Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#18103c] border border-[#f72585]/50 text-xs font-mono text-[#f72585] shadow-[0_0_12px_rgba(247,37,133,0.3)] animate-pulse">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-bold tracking-wider">&gt; 404_PAGE_NOT_FOUND</span>
        </div>
      </header>

      {/* Central Interactive Cyber Card */}
      <main className={`relative z-10 max-w-3xl mx-auto w-full my-auto transition-all duration-700 transform ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
        <div className="rounded-2xl border border-[#9d4edd]/40 bg-[#090617]/95 p-6 sm:p-12 text-center shadow-[0_0_60px_rgba(157,78,221,0.25)] backdrop-blur-xl relative overflow-hidden group">
          
          {/* Subtle Top Scanline Overlay Effect */}
          <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20"></div>

          {/* Background Decorative Grid Accent */}
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[10px] text-right text-slate-500 select-none">
            01000100 01101001 01110011<br />
            01110000 01100001 01110100<br />
            01100011 01101000 00110100
          </div>

          {/* Central Animated Floating 404 Header */}
          <div className="relative my-4 inline-block">
            <h1 
              onMouseEnter={() => setGlitchActive(true)}
              onMouseLeave={() => setGlitchActive(false)}
              className={`text-7xl sm:text-9xl font-black font-mono tracking-tighter select-none cursor-pointer transition-all duration-200 ${
                glitchActive 
                  ? 'translate-x-1 -translate-y-1 skew-x-3 text-red-400 drop-shadow-[4px_0_0_#f72585]' 
                  : 'animate-bounce text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#c77dff] to-[#9d4edd] drop-shadow-[0_0_35px_rgba(199,125,255,0.7)]'
              }`}
              style={{ animationDuration: '3.5s' }}
            >
              404
            </h1>

            {/* Glowing Backdrop Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#9d4edd]/30 to-[#f72585]/30 rounded-full blur-2xl pointer-events-none -z-10 animate-pulse"></div>
          </div>

          {/* Path Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#140e36] border border-[#9d4edd]/30 text-xs font-mono text-[#c77dff] mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            <span>[STATUS: 404_NOT_FOUND] // route_invalid</span>
          </div>

          {/* Primary Subtitle */}
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mb-3 tracking-tight">
            <span className="text-[#f72585]">&gt;&gt;</span> Stack Overflow!
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-mono max-w-lg mx-auto mb-8 leading-relaxed">
            A página que você procura sumiu no espaço-tempo ou nunca existiu nesta rota de navegação.
          </p>

          {/* Terminal Console Log Snippet */}
          <div className="mb-8 p-3 rounded-lg bg-[#05030c] border border-[#9d4edd]/20 text-left text-xs font-mono text-slate-400 max-w-md mx-auto overflow-x-auto shadow-inner">
            <div className="text-emerald-400/90 italic">// Stack Trace Log</div>
            <div className="text-slate-300"><span className="text-[#f72585]">GET</span> {window.location.pathname} <span className="text-red-400">404</span></div>
            <div className="text-slate-500">at Router.navigate (App.jsx:404)</div>
            <div className="text-slate-500">at Dispatcher.resolve (client.js:108)</div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#9d4edd] via-[#7209b7] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-lg shadow-[#9d4edd]/30 hover:shadow-[#9d4edd]/50 transition-all transform active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>[ Volta ao Início ]</span>
            </Link>

            <Link
              to="/admin"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-xs sm:text-sm font-medium bg-[#0e0a22] border border-[#9d4edd]/40 text-[#c77dff] hover:bg-[#9d4edd]/20 hover:border-[#c77dff] transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>[ Dashboard / Admin ]</span>
            </Link>
          </div>

        </div>
      </main>

      {/* Footer Navigation Tag */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full text-center py-2 text-xs font-mono text-slate-500">
        <p>© {new Date().getFullYear()} Alexandre Cássio de Souza Junior • Sistema de Roteamento SPA</p>
      </footer>
    </div>
  );
}
