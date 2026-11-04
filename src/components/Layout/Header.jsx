import React from 'react';
import { Bell, Settings, HelpCircle, Search } from 'lucide-react';

const VIEW_TITLES = {
  arena: { title: 'Arena Porównawcza', subtitle: 'Blind test – anonimowe porównanie modeli AI metodą parową' },
  experiments: { title: 'Eksperymenty', subtitle: 'Zarządzanie i konfiguracja eksperymentów promptów' },
  benchmark: { title: 'Benchmark', subtitle: 'Baza zadań testowych z kategoriami i kryteriami oceny' },
  dashboard: { title: 'Dashboard Analityczny', subtitle: 'Wyniki zbiorcze, rankingi ELO i wizualizacje statystyk' },
};

export default function Header({ activeView }) {
  const { title, subtitle } = VIEW_TITLES[activeView] || VIEW_TITLES.arena;

  return (
    <header className="flex items-center justify-between px-6 py-4 shrink-0" style={{ background: 'rgba(10,10,18,0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
      <div>
        <h1 className="text-lg font-bold text-white leading-tight">{title}</h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(136,136,168,0.8)' }}>{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        {/* Search bar */}
        <div className="relative hidden md:flex items-center">
          <Search size={13} className="absolute left-3" style={{ color: 'rgba(136,136,168,0.6)' }} />
          <input
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg w-48 focus:w-56 transition-all duration-300"
            placeholder="Szukaj zadań, modeli..."
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#c8c8e8', outline: 'none' }}
          />
        </div>

        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 group">
          <Bell size={15} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 group">
          <HelpCircle size={15} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 group">
          <Settings size={15} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ml-1 cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', color: 'white', boxShadow: '0 0 12px rgba(99,102,241,0.3)' }}>
          P
        </div>
      </div>
    </header>
  );
}
