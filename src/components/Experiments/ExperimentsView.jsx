import React, { useState } from 'react';
import { Plus, FlaskConical, Play, Pause, CheckCircle, Clock, AlertCircle, ChevronRight, Cpu, Thermometer, Layers } from 'lucide-react';
import { EXPERIMENTS, MODELS, BENCHMARK_TASKS, PROMPT_VARIANTS, getModelById, getTaskById } from '../../data/mockData';
import ExperimentConfig from './ExperimentConfig';
import PromptVersioning from './PromptVersioning';

const STATUS_CONFIG = {
  completed: { label: 'Ukończony', color: '#10b981', Icon: CheckCircle, bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  running: { label: 'Aktywny', color: '#6366f1', Icon: Play, bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)' },
  draft: { label: 'Szkic', color: '#94a3b8', Icon: Clock, bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.25)' },
  failed: { label: 'Błąd', color: '#ef4444', Icon: AlertCircle, bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
      <cfg.Icon size={10} />
      {cfg.label}
    </span>
  );
}

function ExperimentCard({ exp, onClick, isActive }) {
  const task = getTaskById(exp.taskId);
  const models = exp.models.map(id => getModelById(id)).filter(Boolean);
  const variant = PROMPT_VARIANTS.find(v => v.id === exp.promptVariant);

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl transition-all duration-200"
      style={{
        background: isActive ? 'rgba(99,102,241,0.1)' : 'rgba(15,15,26,0.6)',
        border: isActive ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isActive ? '0 0 20px rgba(99,102,241,0.15)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-white truncate">{exp.name}</div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">{exp.description}</div>
        </div>
        <StatusBadge status={exp.status} />
      </div>

      {exp.status === 'running' && exp.progress && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Postęp</span><span>{exp.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${exp.progress}%`, background: 'linear-gradient(90deg, #6366f1, #7c3aed)' }} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {models.map(m => (
          <span key={m.id} className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: m.colorBg, color: m.color, border: `1px solid ${m.colorBorder}` }}>
            {m.name}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Layers size={10} />{exp.trials} prób</span>
        <span className="flex items-center gap-1"><Thermometer size={10} />T={exp.temperature}</span>
        {variant && <span className="flex items-center gap-1"><FlaskConical size={10} />{variant.label}</span>}
      </div>
    </button>
  );
}

export default function ExperimentsView() {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedExp, setSelectedExp] = useState(EXPERIMENTS[0]);
  const [showNewConfig, setShowNewConfig] = useState(false);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left panel – experiment list */}
      <div className="w-80 shrink-0 flex flex-col h-full" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-4 py-4 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-bold text-white">Eksperymenty</h2>
          <button onClick={() => { setShowNewConfig(true); setActiveTab('config'); }} className="btn-primary flex items-center gap-1.5 px-3 py-1.5 text-xs">
            <Plus size={12} />Nowy
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {EXPERIMENTS.map(exp => (
            <ExperimentCard
              key={exp.id}
              exp={exp}
              isActive={selectedExp?.id === exp.id}
              onClick={() => { setSelectedExp(exp); setShowNewConfig(false); setActiveTab('list'); }}
            />
          ))}
        </div>
      </div>

      {/* Right panel – detail / config / prompts */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Tab nav */}
        <div className="px-5 py-3 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="tab-nav inline-flex">
            {[
              { id: 'list', label: 'Szczegóły' },
              { id: 'config', label: 'Konfiguracja' },
              { id: 'prompts', label: 'Warianty promptów' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'list' && selectedExp && <ExperimentDetail exp={selectedExp} />}
          {activeTab === 'config' && <ExperimentConfig initialExp={showNewConfig ? null : selectedExp} />}
          {activeTab === 'prompts' && <PromptVersioning />}
        </div>
      </div>
    </div>
  );
}

function ExperimentDetail({ exp }) {
  const task = getTaskById(exp.taskId);
  const models = exp.models.map(id => getModelById(id)).filter(Boolean);
  const variant = PROMPT_VARIANTS.find(v => v.id === exp.promptVariant);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="card-elevated rounded-2xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{exp.name}</h2>
            <p className="text-sm text-slate-400 mt-1">{exp.description}</p>
          </div>
          <StatusBadge status={exp.status} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Próby', value: exp.trials, icon: Layers },
            { label: 'Temperature', value: exp.temperature, icon: Thermometer },
            { label: 'Max Tokens', value: exp.maxTokens, icon: Cpu },
            { label: 'Prompt', value: variant?.label || '—', icon: FlaskConical },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(10,10,18,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={11} className="text-slate-500" />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
              <div className="text-sm font-bold text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Results per model */}
      {Object.keys(exp.results || {}).length > 0 && (
        <div className="card-elevated rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-4">Wyniki per model</h3>
          <div className="space-y-3">
            {models.map(model => {
              const r = exp.results?.[model.id];
              if (!r) return null;
              return (
                <div key={model.id} className="rounded-xl p-4" style={{ background: model.colorBg, border: `1px solid ${model.colorBorder}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: model.color }}>
                        {model.avatar}
                      </span>
                      <div>
                        <div className="text-sm font-bold" style={{ color: model.color }}>{model.name}</div>
                        <div className="text-xs text-slate-500">{model.provider}</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{r.avgScore}<span className="text-sm text-slate-400">/100</span></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Latencja', value: `${r.avgLatency}s` },
                      { label: 'Avg Tokeny', value: r.avgTokens },
                      { label: 'Koszt', value: `$${r.cost.toFixed(5)}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center rounded-lg py-2" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <div className="text-xs text-slate-500">{label}</div>
                        <div className="text-sm font-bold text-white font-mono">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Task info */}
      {task && (
        <div className="card-elevated rounded-2xl p-5">
          <h3 className="text-sm font-bold text-white mb-3">Zadanie benchmarkowe</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{task.content}</p>
        </div>
      )}
    </div>
  );
}
