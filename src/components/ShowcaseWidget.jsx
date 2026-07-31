import React, { useState } from 'react';
import { 
  FEATURED_PROJECTS, 
  COMMIT_ACTIVITY_DATA, 
  LANGUAGE_DISTRIBUTION, 
  REPO_LOGS 
} from '../data/portfolioData';
import { 
  Play, 
  ExternalLink, 
  Star, 
  GitFork, 
  Activity, 
  Layers, 
  Code, 
  Filter, 
  Maximize2, 
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ShowcaseWidget({ onSelectProjectModal }) {
  const [viewMode, setViewMode] = useState('project'); // 'project' | 'activity'
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'commits' | 'issues'

  const currentProject = FEATURED_PROJECTS[selectedProjectIndex];

  // SVG Chart Dimensions & Path calculation
  const maxCommitVal = Math.max(...COMMIT_ACTIVITY_DATA.map(d => d.commits));
  const chartHeight = 120;
  const chartWidth = 320;

  const points = COMMIT_ACTIVITY_DATA.map((d, index) => {
    const x = (index / (COMMIT_ACTIVITY_DATA.length - 1)) * chartWidth;
    const y = chartHeight - (d.commits / maxCommitVal) * (chartHeight - 20);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${chartHeight} ${points} ${chartWidth},${chartHeight}`;

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 bg-[#0c091d]/90 backdrop-blur-md rounded-xl border border-[#9d4edd]/30 shadow-2xl shadow-[#9d4edd]/10">
      {/* Widget Header & View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#9d4edd]/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f72585] shadow-[0_0_10px_#f72585]"></span>
          <h2 className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide">
            {viewMode === 'project' ? '// Live Project Showcase' : '// Repo Activity Metrics'}
          </h2>
        </div>

        {/* Option Toggle Buttons */}
        <div className="flex items-center gap-1 p-0.5 rounded bg-[#070510] border border-[#9d4edd]/20">
          <button
            onClick={() => setViewMode('project')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'project'
                ? 'bg-[#9d4edd] text-white font-semibold shadow-md shadow-[#9d4edd]/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            // showcase
          </button>
          <button
            onClick={() => setViewMode('activity')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'activity'
                ? 'bg-[#9d4edd] text-white font-semibold shadow-md shadow-[#9d4edd]/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            // activity
          </button>
        </div>
      </div>

      {/* VIEW MODE A: LIVE PROJECT SHOWCASE */}
      {viewMode === 'project' && (
        <div className="flex-1 flex flex-col justify-between pt-3 gap-3">
          {/* Project Carousel Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {FEATURED_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedProjectIndex === idx
                    ? 'bg-[#1e1445] text-[#c77dff] border border-[#f72585] font-semibold'
                    : 'bg-[#070510]/60 text-slate-400 hover:text-slate-200 border border-[#9d4edd]/10'
                }`}
              >
                [{idx + 1}] {proj.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Project Preview Card Frame */}
          <div className="relative group rounded-lg overflow-hidden border border-[#9d4edd]/30 bg-[#05030e] shadow-lg">
            {/* Visual Thumbnail & Gradient Overlay */}
            <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
              <img
                src={currentProject.previewImage}
                alt={currentProject.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05030e] via-[#05030e]/40 to-transparent"></div>

              {/* Status Badge & Tag */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f72585] text-white shadow-md">
                  {currentProject.tag}
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
                title="Expand Details"
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
                {currentProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1a123f] text-[#c77dff] border border-[#9d4edd]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Metrics (Stars, Forks, Commits) */}
              <div className="flex items-center justify-between pt-2 border-t border-[#9d4edd]/15 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    {currentProject.stars}
                  </span>
                  <span className="flex items-center gap-1 text-[#c77dff]">
                    <GitFork className="w-3 h-3" />
                    {currentProject.forks}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 hidden sm:flex">
                    <Activity className="w-3 h-3 text-[#f72585]" />
                    {currentProject.commits} commits
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md font-mono text-xs font-bold bg-gradient-to-r from-[#9d4edd] to-[#f72585] text-white hover:from-[#c77dff] hover:to-[#9d4edd] shadow-md shadow-[#9d4edd]/20 transition-all cursor-pointer text-center"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>// VIEW LIVE DEMO</span>
            </a>

            <button
              onClick={() => onSelectProjectModal(currentProject)}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded-md font-mono text-xs bg-[#110d2a] border border-[#9d4edd]/30 text-[#c77dff] hover:border-[#c77dff] transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>// INSPECT</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE B: REPO ACTIVITY & COMMIT METRICS */}
      {viewMode === 'activity' && (
        <div className="flex-1 flex flex-col justify-between pt-3 gap-3">
          {/* Controls Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
            <div className="flex items-center gap-1 text-[#c77dff]">
              <Filter className="w-3 h-3" />
              <span>filter by:</span>
              <button
                onClick={() => setActivityFilter('all')}
                className={`ml-1 px-1.5 py-0.5 rounded ${
                  activityFilter === 'all' ? 'bg-[#9d4edd] text-white font-bold' : 'hover:text-white'
                }`}
              >
                all
              </button>
              <button
                onClick={() => setActivityFilter('commits')}
                className={`px-1.5 py-0.5 rounded ${
                  activityFilter === 'commits' ? 'bg-[#9d4edd] text-white font-bold' : 'hover:text-white'
                }`}
              >
                commits
              </button>
            </div>

            <div className="flex items-center gap-1 text-emerald-400 text-[11px]">
              <TrendingUp className="w-3 h-3" />
              <span>+34% this month</span>
            </div>
          </div>

          {/* SVG Commit Activity Line & Area Graph */}
          <div className="p-3 rounded-lg bg-[#05030e] border border-[#9d4edd]/25">
            <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>// Annual Commit Velocity</span>
              <span className="text-[#f72585] font-semibold">3,842 Total Commits</span>
            </div>

            <div className="w-full overflow-hidden">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9d4edd" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#f72585" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <polygon points={areaPoints} fill="url(#purpleGradient)" />
                {/* Smooth Polyline */}
                <polyline
                  fill="none"
                  stroke="#c77dff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
              </svg>
            </div>

            {/* X-Axis Months */}
            <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-1">
              {COMMIT_ACTIVITY_DATA.map((d, i) => (
                <span key={d.month} className={i % 2 === 0 ? 'text-slate-400' : 'text-slate-600'}>
                  {d.month}
                </span>
              ))}
            </div>
          </div>

          {/* Top Languages Distribution */}
          <div className="p-3 rounded-lg bg-[#080514] border border-[#9d4edd]/20 space-y-2">
            <div className="text-[11px] font-mono text-[#c77dff] font-semibold">// Language Stack Breakdown</div>
            
            {/* Visual Bar Segment */}
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-900">
              {LANGUAGE_DISTRIBUTION.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  className="h-full transition-all duration-500"
                  title={`${lang.name}: ${lang.percentage}%`}
                ></div>
              ))}
            </div>

            {/* Legend Labels */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono">
              {LANGUAGE_DISTRIBUTION.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }}></span>
                  <span className="truncate">{lang.name}</span>
                  <span className="text-slate-500 ml-auto">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Git Commit Stream */}
          <div className="p-2.5 rounded-lg bg-[#05030e] border border-[#9d4edd]/15 space-y-1.5">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#f72585] animate-pulse" />
              <span>// live_commit_stream</span>
            </div>

            <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
              {REPO_LOGS.map((log) => (
                <div key={log.hash} className="flex items-center justify-between text-[11px] font-mono text-slate-300 hover:text-white">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#9d4edd] font-semibold">{log.hash}</span>
                    <span className="truncate text-slate-300">{log.msg}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 whitespace-nowrap ml-2">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
