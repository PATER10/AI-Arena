import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ChevronDown, Download, Upload, Tag } from 'lucide-react';
import { BENCHMARK_TASKS, CATEGORIES } from '../../data/mockData';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Łatwe', color: '#10b981' },
  medium: { label: 'Średnie', color: '#f59e0b' },
  hard: { label: 'Trudne', color: '#ef4444' },
};

function Badge({ children, color }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}>
      {children}
    </span>
  );
}

export default function BenchmarkView() {
  const [tasks, setTasks] = useState(BENCHMARK_TASKS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterDiff, setFilterDiff] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = tasks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || t.category === filterCat;
    const matchDiff = filterDiff === 'all' || t.difficulty === filterDiff;
    return matchSearch && matchCat && matchDiff;
  });

  const handleExportCSV = () => {
    const header = 'ID,Tytuł,Kategoria,Trudność,Treść\n';
    const rows = tasks.map(t => `${t.id},"${t.title}","${t.category}","${t.difficulty}","${t.content.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'benchmark_tasks.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id) => setTasks(ts => ts.filter(t => t.id !== id));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-4 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="input-field pl-9 text-xs"
            placeholder="Szukaj zadań..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <select
            className="input-field appearance-none pr-8 text-xs py-2"
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
          >
            <option value="all">Wszystkie kategorie</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>

        {/* Difficulty filter */}
        <div className="relative">
          <select
            className="input-field appearance-none pr-8 text-xs py-2"
            value={filterDiff}
            onChange={e => setFilterDiff(e.target.value)}
          >
            <option value="all">Wszystkie trudności</option>
            {Object.entries(DIFFICULTY_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>

        <div className="flex gap-2 ml-auto">
          <button onClick={handleExportCSV} className="btn-ghost flex items-center gap-1.5 text-xs py-2 px-3">
            <Download size={12} />Eksport CSV
          </button>
          <button className="btn-ghost flex items-center gap-1.5 text-xs py-2 px-3">
            <Upload size={12} />Import
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-1.5 text-xs py-2 px-3">
            <Plus size={12} />Dodaj zadanie
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex gap-6 px-6 py-3 shrink-0 flex-wrap" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(10,10,18,0.3)' }}>
        <div className="text-xs text-slate-500">
          <span className="text-white font-semibold">{filtered.length}</span> zadań z <span className="text-white font-semibold">{tasks.length}</span>
        </div>
        {CATEGORIES.map(c => {
          const count = tasks.filter(t => t.category === c.id).length;
          return (
            <button key={c.id} onClick={() => setFilterCat(filterCat === c.id ? 'all' : c.id)}
              className="flex items-center gap-1.5 text-xs transition-opacity"
              style={{ opacity: filterCat !== 'all' && filterCat !== c.id ? 0.4 : 1, color: c.color }}>
              <span>{c.icon}</span>
              <span className="font-semibold">{count}</span>
              <span className="text-slate-500">{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="data-table">
          <thead style={{ position: 'sticky', top: 0, background: 'rgba(10,10,18,0.98)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
            <tr>
              <th className="w-16">ID</th>
              <th>Tytuł zadania</th>
              <th className="w-36">Kategoria</th>
              <th className="w-24">Trudność</th>
              <th className="w-20 text-center">Kryteria</th>
              <th className="w-24 text-right pr-6">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => {
              const cat = CATEGORIES.find(c => c.id === task.category);
              const diff = DIFFICULTY_CONFIG[task.difficulty];
              const isExpanded = expandedId === task.id;

              return (
                <React.Fragment key={task.id}>
                  <tr className="cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : task.id)}>
                    <td>
                      <span className="font-mono text-xs text-slate-500">{task.id}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <ChevronDown size={13} className="text-slate-600 shrink-0 transition-transform duration-200"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        <span className="text-sm font-semibold text-white">{task.title}</span>
                        {task.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded hidden sm:inline"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(136,136,168,0.7)' }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {cat && <Badge color={cat.color}>{cat.icon} {cat.name}</Badge>}
                    </td>
                    <td>
                      {diff && <Badge color={diff.color}>{diff.label}</Badge>}
                    </td>
                    <td className="text-center">
                      <span className="text-xs font-mono text-slate-400">{task.criteria?.length || 0}</span>
                    </td>
                    <td className="text-right pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors"
                          onClick={e => { e.stopPropagation(); }}>
                          <Edit2 size={13} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                          onClick={e => { e.stopPropagation(); handleDelete(task.id); }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div className="px-10 py-4 animate-fade-in" style={{ background: 'rgba(10,10,18,0.5)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Treść zadania</div>
                              <p className="text-sm text-slate-300 leading-relaxed">{task.content}</p>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Kryteria poprawności</div>
                              <div className="space-y-1.5">
                                {task.criteria?.map((c, i) => (
                                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                    <span className="text-emerald-400">✓</span>{c}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm text-slate-500">Brak zadań spełniających kryteria filtrowania</p>
            <button onClick={() => { setSearch(''); setFilterCat('all'); setFilterDiff('all'); }} className="btn-secondary mt-3 text-xs">
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
