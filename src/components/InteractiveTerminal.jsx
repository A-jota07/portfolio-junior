import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, FEATURED_PROJECTS } from '../data/portfolioData';

export default function InteractiveTerminal({ onExecuteCommand }) {
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Shell CLI Antigravity v2.4.0 (x86_64-pc-linux-gnu)' },
    { type: 'system', content: 'Digite "ajuda", "skills" ou "projetos" para explorar os comandos.' }
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', content: `michael@weaver-dev:~$ ${inputVal}` }];

    switch (cmd) {
      case 'ajuda':
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Comandos disponíveis:
  ajuda / help      - Exibir esta lista de comandos disponíveis
  bio               - Exibir perfil do desenvolvedor e resumo
  habilidades       - Listar competências da stack tecnológica
  projetos          - Mostrar lista de projetos em destaque
  contato           - Exibir informações de contato e links
  sudo contratar    - Iniciar protocolo de contratação prioritária
  limpar / clear    - Limpar histórico do terminal`
        });
        break;

      case 'bio':
        newHistory.push({
          type: 'output',
          content: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}
Localização: ${PERSONAL_INFO.location}
Exp: ${PERSONAL_INFO.stats.experienceYears} | Repos: ${PERSONAL_INFO.stats.reposContributed}`
        });
        break;

      case 'habilidades':
      case 'skills':
        newHistory.push({
          type: 'output',
          content: `Stack Principal: TypeScript, React 19, Node.js, Python, Tailwind v4, Rust, WebAssembly, GraphQL, Docker.`
        });
        break;

      case 'projetos':
      case 'projects':
        newHistory.push({
          type: 'output',
          content: FEATURED_PROJECTS.map(p => `• [${p.title}] -> ${p.subtitle} (${p.liveUrl})`).join('\n')
        });
        break;

      case 'contato':
      case 'contact':
        newHistory.push({
          type: 'output',
          content: `E-mail: ${PERSONAL_INFO.contact.email}
GitHub: ${PERSONAL_INFO.contact.github}
LinkedIn: ${PERSONAL_INFO.contact.linkedin}`
        });
        break;

      case 'sudo contratar':
      case 'sudo hire':
      case 'contratar':
      case 'hire':
        newHistory.push({
          type: 'output',
          content: `🚀 Acesso Concedido! Iniciando protocolo de contratação prioritária para Michael Weaver...`
        });
        if (onExecuteCommand) onExecuteCommand('hire');
        break;

      case 'limpar':
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          content: `bash: comando não encontrado: "${cmd}". Digite "ajuda" para ver comandos válidos.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className={`mt-6 rounded-xl overflow-hidden border border-[#9d4edd]/30 bg-[#070510]/95 shadow-2xl transition-all duration-300 ${
      isExpanded ? 'h-96' : 'h-60'
    } flex flex-col justify-between`}>
      {/* Console Tab Bar */}
      <div className="px-3 py-1.5 bg-[#0e0a22] border-b border-[#9d4edd]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-2.5 py-0.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-[#1b1240] text-[#c77dff] border-b border-[#f72585] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3 text-[#9d4edd]" />
            <span>TERMINAL</span>
          </button>

          <button
            onClick={() => setActiveTab('output')}
            className={`px-2.5 py-0.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer hidden sm:flex ${
              activeTab === 'output'
                ? 'bg-[#1b1240] text-[#c77dff] border-b border-[#f72585] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>SAÍDA</span>
          </button>

          <button
            onClick={() => setActiveTab('problems')}
            className="px-2.5 py-0.5 rounded text-xs font-mono text-slate-500 hidden md:flex items-center gap-1"
          >
            <span>PROBLEMAS</span>
            <span className="px-1 bg-emerald-500/20 text-emerald-300 rounded text-[9px]">0</span>
          </button>
        </div>

        {/* Utility Controls */}
        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={() => setHistory([])}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title="Limpar Console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:text-[#c77dff] transition-colors cursor-pointer"
            title={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1 bg-[#05030e] text-slate-300 leading-relaxed select-text">
        {history.map((item, idx) => (
          <div key={idx}>
            {item.type === 'user' && (
              <div className="text-slate-200 font-semibold">{item.content}</div>
            )}
            {item.type === 'system' && (
              <div className="text-[#c77dff]/80 italic">// {item.content}</div>
            )}
            {item.type === 'output' && (
              <div className="text-slate-300 whitespace-pre-wrap pl-2 border-l-2 border-[#9d4edd]/50 py-0.5 my-0.5">
                {item.content}
              </div>
            )}
            {item.type === 'error' && (
              <div className="text-[#f72585] pl-2">{item.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Command Input Form */}
      <form onSubmit={handleCommandSubmit} className="p-2 bg-[#0c091d] border-t border-[#9d4edd]/20 flex items-center gap-2">
        <span className="text-[#f72585] font-mono text-xs font-bold flex items-center gap-1 pl-1">
          <span>michael@weaver-dev:~$</span>
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="digite 'ajuda', 'bio', 'skills', 'projetos'..."
          className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="p-1 rounded text-slate-400 hover:text-[#c77dff] cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
