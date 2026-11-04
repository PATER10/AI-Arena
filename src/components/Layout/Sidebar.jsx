import React from 'react';
import { Swords, FlaskConical, BookOpen, BarChart3, ChevronRight, Zap } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'arena', label: 'Arena', icon: Swords, color: 'text-indigo-400', desc: 'Blind test porównawczy' },
  { id: 'experiments', label: 'Eksperymenty', icon: FlaskConical, color: 'text-pink-400', desc: 'Zarządzanie testami' },
  { id: 'benchmark', label: 'Benchmark', icon: BookOpen, color: 'text-amber-400', desc: 'Baza zadań' },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-emerald-400', desc: 'Wyniki i rankingi' },
];

export default function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="flex flex-col h-full w-64 shrink-0" style={{ background: 'rgba(10,10,18,0.98)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <div className="text-base font-bold text-white leading-tight">AI Arena</div>
          <div className="text-xs font-medium" style={{ color: 'rgba(136,136,168,0.8)' }}>Model Evaluation Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold uppercase tracking-wider px-3 pb-2" style={{ color: 'rgba(136,136,168,0.5)' }}>
          Widoki
        </div>
        {NAV_ITEMS.map(({ id, label, icon: Icon, color, desc }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => setActiveView(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group"
              style={{
                background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
              }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                style={{ background: isActive ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)' }}>
                <Icon size={15} className={isActive ? 'text-indigo-400' : color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'} transition-colors`}>{label}</div>
                <div className="text-xs truncate" style={{ color: 'rgba(136,136,168,0.7)' }}>{desc}</div>
              </div>
              {isActive && <ChevronRight size={14} className="text-indigo-400 shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
          <div>
            <div className="text-xs font-semibold text-emerald-400">System Online</div>
            <div className="text-xs" style={{ color: 'rgba(136,136,168,0.7)' }}>5 modeli aktywnych</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
