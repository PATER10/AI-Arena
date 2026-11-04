import React, { useState } from 'react';
import { Clock, User, ChevronRight, Edit3, Plus, History } from 'lucide-react';
import { PROMPT_VARIANTS } from '../../data/mockData';

export default function PromptVersioning() {
  const [activeVariant, setActiveVariant] = useState('variant-a');
  const [showHistory, setShowHistory] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const variant = PROMPT_VARIANTS.find(v => v.id === activeVariant);
  const currentVersion = variant?.history[0];
  const [editContent, setEditContent] = useState(currentVersion?.content || '');

  const handleVariantChange = (id) => {
    setActiveVariant(id);
    setEditMode(false);
    setShowHistory(false);
    const v = PROMPT_VARIANTS.find(p => p.id === id);
    setEditContent(v?.history[0]?.content || '');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Variant tabs */}
      <div className="flex gap-2">
        {PROMPT_VARIANTS.map(v => (
          <button
            key={v.id}
            onClick={() => handleVariantChange(v.id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: activeVariant === v.id ? `${v.color}20` : 'rgba(10,10,18,0.5)',
              border: `1px solid ${activeVariant === v.id ? `${v.color}50` : 'rgba(255,255,255,0.06)'}`,
              color: activeVariant === v.id ? v.color : '#94a3b8',
            }}
          >
            {v.label}
            <div className="text-xs font-normal mt-0.5 opacity-70">{v.name}</div>
          </button>
        ))}
      </div>

      {/* Variant detail */}
      <div className="card-elevated rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div className="text-sm font-bold text-white">{variant?.label} – {variant?.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">{variant?.description}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowHistory(h => !h); setEditMode(false); }}
              className={`btn-ghost flex items-center gap-1.5 text-xs py-1.5 px-3 ${showHistory ? 'bg-white/5' : ''}`}
            >
              <History size={12} />Historia ({variant?.history.length})
            </button>
            <button
              onClick={() => { setEditMode(e => !e); setShowHistory(false); }}
              className={`btn-ghost flex items-center gap-1.5 text-xs py-1.5 px-3 ${editMode ? 'bg-white/5' : ''}`}
            >
              <Edit3 size={12} />{editMode ? 'Podgląd' : 'Edytuj'}
            </button>
          </div>
        </div>

        {/* Current version meta */}
        {currentVersion && (
          <div className="flex items-center gap-4 px-5 py-2.5 text-xs" style={{ background: 'rgba(10,10,18,0.3)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock size={11} />{new Date(currentVersion.timestamp).toLocaleDateString('pl-PL', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <User size={11} />{currentVersion.author}
            </span>
            <span className="px-2 py-0.5 rounded font-mono text-indigo-400" style={{ background: 'rgba(99,102,241,0.1)' }}>
              v{currentVersion.version}
            </span>
            {currentVersion.note && (
              <span className="text-slate-600 italic">{currentVersion.note}</span>
            )}
          </div>
        )}

        {/* Prompt editor / viewer */}
        <div className="p-5">
          {editMode ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={12}
                className="input-field resize-none font-mono text-xs leading-relaxed w-full"
                spellCheck={false}
              />
              <div className="flex gap-2">
                <input className="input-field flex-1 text-xs" placeholder="Notatka do wersji (np. 'Dodano wymagania testów')" />
                <button className="btn-primary flex items-center gap-1.5 text-xs px-4">
                  <Plus size={12} />Zapisz nową wersję
                </button>
              </div>
            </div>
          ) : (
            <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
              {currentVersion?.content}
            </pre>
          )}
        </div>
      </div>

      {/* History panel */}
      {showHistory && variant && (
        <div className="card-elevated rounded-2xl p-5 animate-slide-up">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <History size={14} className="text-indigo-400" />
            Historia wersji – {variant.label}
          </h3>
          <div className="space-y-3">
            {variant.history.map((ver, idx) => (
              <div key={ver.version} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: idx === 0 ? variant.color : 'rgba(255,255,255,0.1)' }}>
                    {ver.version}
                  </div>
                  {idx < variant.history.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-white">Wersja {ver.version}</span>
                    <span className="text-xs text-slate-500">{new Date(ver.timestamp).toLocaleDateString('pl-PL')}</span>
                    <span className="text-xs text-slate-600">· {ver.author}</span>
                  </div>
                  {ver.note && (
                    <div className="text-xs mb-2 italic px-2 py-1 rounded" style={{ background: 'rgba(99,102,241,0.08)', color: 'rgba(165,180,252,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
                      "{ver.note}"
                    </div>
                  )}
                  <pre className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap font-sans line-clamp-3">
                    {ver.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
