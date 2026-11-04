import React, { useState } from 'react';
import { Save, Play, ChevronDown } from 'lucide-react';
import { MODELS, BENCHMARK_TASKS, PROMPT_VARIANTS, CATEGORIES } from '../../data/mockData';

export default function ExperimentConfig({ initialExp }) {
  const [form, setForm] = useState({
    name: initialExp?.name || '',
    description: initialExp?.description || '',
    modelIds: initialExp?.models || ['gpt-4o'],
    taskId: initialExp?.taskId || 'task-001',
    promptVariant: initialExp?.promptVariant || 'variant-a',
    trials: initialExp?.trials || 3,
    temperature: initialExp?.temperature ?? 0.7,
    maxTokens: initialExp?.maxTokens || 1024,
  });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleModel = (id) => {
    setForm(f => ({
      ...f,
      modelIds: f.modelIds.includes(id) ? f.modelIds.filter(m => m !== id) : [...f.modelIds, id],
    }));
  };

  const selectedTask = BENCHMARK_TASKS.find(t => t.id === form.taskId);

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">
      <div className="card-elevated rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-bold text-white">{initialExp ? 'Edytuj eksperyment' : 'Nowy eksperyment'}</h2>

        {/* Basic info */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nazwa eksperymentu</label>
            <input className="input-field" value={form.name} onChange={e => update('name', e.target.value)} placeholder="np. Fibonacci Challenge – Round 2" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Opis</label>
            <textarea className="input-field resize-none" rows={2} value={form.description} onChange={e => update('description', e.target.value)} placeholder="Opisz cel eksperymentu..." />
          </div>
        </div>

        {/* Models */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Wybór modeli</label>
          <div className="grid grid-cols-1 gap-2">
            {MODELS.map(model => {
              const selected = form.modelIds.includes(model.id);
              return (
                <button key={model.id} onClick={() => toggleModel(model.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: selected ? model.colorBg : 'rgba(10,10,18,0.5)',
                    border: `1px solid ${selected ? model.colorBorder : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: model.color }}>
                    {model.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: selected ? model.color : '#e8e8f0' }}>{model.name}</div>
                    <div className="text-xs text-slate-500">{model.provider} · ${model.costPer1kTokens}/1k tok.</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selected ? 'border-transparent' : 'border-slate-600'}`}
                    style={{ background: selected ? model.color : 'transparent' }}>
                    {selected && <span className="text-white text-xs">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Task */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Zadanie benchmarkowe</label>
          <div className="relative">
            <select
              className="input-field appearance-none pr-8"
              value={form.taskId}
              onChange={e => update('taskId', e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <optgroup key={cat.id} label={`${cat.icon} ${cat.name}`}>
                  {BENCHMARK_TASKS.filter(t => t.category === cat.id).map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
          {selectedTask && (
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{selectedTask.content}</p>
          )}
        </div>

        {/* Prompt variant */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Wariant promptu</label>
          <div className="grid grid-cols-3 gap-2">
            {PROMPT_VARIANTS.map(v => (
              <button key={v.id} onClick={() => update('promptVariant', v.id)}
                className="p-3 rounded-xl text-left transition-all duration-200"
                style={{
                  background: form.promptVariant === v.id ? `${v.color}18` : 'rgba(10,10,18,0.5)',
                  border: `1px solid ${form.promptVariant === v.id ? `${v.color}50` : 'rgba(255,255,255,0.06)'}`,
                }}>
                <div className="text-xs font-bold mb-0.5" style={{ color: form.promptVariant === v.id ? v.color : '#94a3b8' }}>{v.label}</div>
                <div className="text-xs text-slate-500">{v.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Liczba prób</label>
            <input type="number" min="1" max="20" className="input-field" value={form.trials}
              onChange={e => update('trials', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Temperature: <span className="text-indigo-400">{form.temperature}</span></label>
            <input type="range" min="0" max="2" step="0.1" className="rubric-slider w-full mt-2" value={form.temperature}
              onChange={e => update('temperature', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Max Tokens</label>
            <input type="number" min="128" max="8192" step="128" className="input-field" value={form.maxTokens}
              onChange={e => update('maxTokens', Number(e.target.value))} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button className="btn-primary flex items-center gap-2 flex-1 justify-center py-3">
            <Play size={14} />Uruchom eksperyment
          </button>
          <button className="btn-secondary flex items-center gap-2 px-5">
            <Save size={14} />Zapisz szkic
          </button>
        </div>
      </div>
    </div>
  );
}
