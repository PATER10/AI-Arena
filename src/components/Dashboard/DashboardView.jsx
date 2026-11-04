import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  Trophy, TrendingUp, Zap, DollarSign, AlertTriangle, Download,
  ChevronDown, BarChart3, Activity,
} from 'lucide-react';
import {
  MODELS, MODEL_STATS, CATEGORY_CHART_DATA, RADAR_RUBRIC_DATA,
  EXPERIMENTS, ARENA_VOTES, CATEGORIES,
} from '../../data/mockData';

// ─── Custom Tooltip ────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs" style={{ background: 'rgba(15,15,26,0.98)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
      <div className="font-bold text-white mb-2">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill || p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-bold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── KPI Card ──────────────────────────────────────────────
function KpiCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="card-elevated rounded-2xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5"
        style={{ background: color, transform: 'translate(25%, -25%)' }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon size={18} style={{ color }} />
        </div>
        {trend !== undefined && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: trend >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: trend >= 0 ? '#10b981' : '#ef4444' }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm font-medium text-slate-400 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
    </div>
  );
}

// ─── Leaderboard ───────────────────────────────────────────
function Leaderboard({ onModelSelect, selectedModel }) {
  const sorted = MODELS.map(m => ({
    ...m,
    stats: MODEL_STATS[m.id],
  })).sort((a, b) => b.stats.elo - a.stats.elo);

  return (
    <div className="card-elevated rounded-2xl overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Trophy size={15} className="text-amber-400" /> Ranking ELO
        </h3>
        <span className="text-xs text-slate-500">{sorted.length} modeli</span>
      </div>
      <div>
        {sorted.map((model, idx) => {
          const rank = idx + 1;
          const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'text-slate-500';
          const stats = model.stats;
          const totalGames = stats.wins + stats.losses + stats.ties + stats.bothBad;
          const winRate = totalGames > 0 ? ((stats.wins / totalGames) * 100).toFixed(0) : 0;
          const isSelected = selectedModel === model.id;

          return (
            <div
              key={model.id}
              onClick={() => onModelSelect(isSelected ? null : model.id)}
              className="flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-all duration-150"
              style={{
                background: isSelected ? `${model.color}10` : 'transparent',
                borderLeft: isSelected ? `2px solid ${model.color}` : '2px solid transparent',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {/* Rank */}
              <div className={`w-7 font-bold text-base font-mono text-center shrink-0 ${rankClass}`}>
                {rank <= 3 ? ['🥇','🥈','🥉'][rank - 1] : rank}
              </div>

              {/* Model info */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: model.color }}>
                  {model.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{model.name}</div>
                  <div className="text-xs text-slate-500">{model.provider}</div>
                </div>
              </div>

              {/* ELO */}
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-white font-mono">{stats.elo}</div>
                <div className="text-xs text-slate-500">ELO</div>
              </div>

              {/* Score */}
              <div className="text-right shrink-0 w-16">
                <div className="text-sm font-bold" style={{ color: model.color }}>{stats.overall}</div>
                <div className="text-xs text-slate-500">Score</div>
              </div>

              {/* Win rate */}
              <div className="text-right shrink-0 w-14">
                <div className="text-sm font-bold text-white">{winRate}%</div>
                <div className="text-xs text-slate-500">Win%</div>
              </div>

              {/* Win/Loss bar */}
              <div className="w-24 shrink-0 hidden lg:block">
                <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                  <div className="rounded-full" style={{ flex: stats.wins, background: '#10b981' }} />
                  <div className="rounded-full" style={{ flex: stats.ties, background: '#f59e0b' }} />
                  <div className="rounded-full" style={{ flex: stats.losses, background: '#6366f1' }} />
                  <div className="rounded-full" style={{ flex: stats.bothBad, background: '#ef4444' }} />
                </div>
                <div className="flex justify-between text-xs text-slate-600 mt-0.5">
                  <span>{stats.wins}W</span>
                  <span>{stats.losses}L</span>
                </div>
              </div>

              {/* Hallucinations */}
              <div className="text-right shrink-0 hidden xl:block">
                {stats.hallucinations > 0 ? (
                  <div className="flex items-center gap-1 text-amber-400">
                    <AlertTriangle size={11} />
                    <span className="text-xs font-semibold">{stats.hallucinations}</span>
                  </div>
                ) : (
                  <div className="text-xs text-emerald-400">✓</div>
                )}
                <div className="text-xs text-slate-600">Haluc.</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────
export default function DashboardView() {
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');
  const [chartType, setChartType] = useState('bar');

  const MODEL_COLORS = {
    'GPT-4o': '#10b981',
    'Claude 3.5': '#f59e0b',
    'Gemini 1.5': '#6366f1',
    'Llama 70B': '#ec4899',
    'Mistral L.': '#8b5cf6',
  };

  const totalTests = EXPERIMENTS.reduce((s, e) => s + e.trials, 0);
  const totalVotes = ARENA_VOTES.length;
  const bestModel = MODELS.reduce((best, m) => MODEL_STATS[m.id].elo > MODEL_STATS[best.id]?.elo ? m : best, MODELS[0]);
  const totalCost = Object.values(MODEL_STATS).reduce((s, m) => s + m.totalCost, 0);
  const avgScore = (Object.values(MODEL_STATS).reduce((s, m) => s + m.overall, 0) / Object.values(MODEL_STATS).length).toFixed(1);

  const radarData = selectedModel ? RADAR_RUBRIC_DATA[selectedModel] : null;
  const selectedModelData = selectedModel ? MODELS.find(m => m.id === selectedModel) : null;

  const handleExport = (format) => {
    const data = MODELS.map(m => ({ model: m.name, provider: m.provider, ...MODEL_STATS[m.id] }));
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'ai_arena_results.json'; a.click();
    } else {
      const header = 'Model,Provider,Overall,ELO,Wins,Losses,Ties,BothBad,AvgLatency,TotalCost,Hallucinations\n';
      const rows = data.map(d => `${d.model},${d.provider},${d.overall},${d.elo},${d.wins},${d.losses},${d.ties},${d.bothBad},${d.avgLatency},${d.totalCost},${d.hallucinations}`).join('\n');
      const blob = new Blob([header + rows], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'ai_arena_results.csv'; a.click();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Export toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">Wyniki zbiorcze</h2>
            <p className="text-xs text-slate-500 mt-0.5">Dane z {EXPERIMENTS.length} eksperymentów · {totalVotes} ocen</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleExport('csv')} className="btn-ghost flex items-center gap-1.5 text-xs py-2 px-3">
              <Download size={12} />Eksport CSV
            </button>
            <button onClick={() => handleExport('json')} className="btn-secondary flex items-center gap-1.5 text-xs py-2 px-3">
              <Download size={12} />Eksport JSON
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard icon={BarChart3} label="Łącznych testów" value={totalTests} sub={`${EXPERIMENTS.length} eksperymentów`} color="#6366f1" trend={12} />
          <KpiCard icon={Trophy} label="Lider rankingu" value={bestModel.name} sub={`ELO ${MODEL_STATS[bestModel.id].elo}`} color="#f59e0b" />
          <KpiCard icon={TrendingUp} label="Średni wynik" value={`${avgScore}/100`} sub="Wszystkie modele" color="#10b981" trend={3} />
          <KpiCard icon={DollarSign} label="Łączny koszt" value={`$${totalCost.toFixed(2)}`} sub="Wszystkie eksperymenty" color="#ec4899" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Bar chart – categories */}
          <div className="card-elevated rounded-2xl p-5 xl:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-bold text-white">Wyniki per kategoria</h3>
                <p className="text-xs text-slate-500 mt-0.5">Średni wynik każdego modelu w poszczególnych kategoriach</p>
              </div>
              <div className="flex gap-1">
                {['bar', 'grouped'].map(type => (
                  <button key={type} onClick={() => setChartType(type)}
                    className={`text-xs px-3 py-1 rounded-lg transition-colors ${chartType === type ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-500 hover:text-slate-300'}`}>
                    {type === 'bar' ? 'Grouped' : 'Stacked'}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={CATEGORY_CHART_DATA} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                {Object.entries(MODEL_COLORS).map(([name, color]) => (
                  <Bar key={name} dataKey={name} fill={color} radius={[3, 3, 0, 0]} maxBarSize={16} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar chart – rubric */}
          <div className="card-elevated rounded-2xl p-5 xl:col-span-2">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white">Profil rubryki</h3>
              <p className="text-xs text-slate-500 mt-0.5">Kliknij model w rankingu aby wyświetlić</p>
            </div>
            {radarData && selectedModelData ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: selectedModelData.color }}>
                    {selectedModelData.avatar[0]}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: selectedModelData.color }}>{selectedModelData.name}</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#888' }} />
                    <PolarRadiusAxis domain={[60, 100]} tick={{ fontSize: 9, fill: '#555' }} axisLine={false} tickCount={3} />
                    <Radar name={selectedModelData.name} dataKey="value" stroke={selectedModelData.color}
                      fill={selectedModelData.color} fillOpacity={0.15} strokeWidth={2} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
                {/* Rubric scores */}
                <div className="space-y-1.5 mt-2">
                  {radarData.map(d => (
                    <div key={d.subject} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-24 shrink-0">{d.subject}</span>
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: selectedModelData.color }} />
                      </div>
                      <span className="text-xs font-mono font-bold text-white w-7 text-right">{d.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Activity size={32} className="text-slate-700 mb-2" />
                <p className="text-xs text-slate-600">Kliknij model w rankingu</p>
              </div>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <Leaderboard selectedModel={selectedModel} onModelSelect={setSelectedModel} />

        {/* Model stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MODELS.map(model => {
            const stats = MODEL_STATS[model.id];
            const totalGames = stats.wins + stats.losses + stats.ties + stats.bothBad;
            return (
              <div key={model.id} className="card-elevated rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                onClick={() => setSelectedModel(model.id)}
                style={{ border: selectedModel === model.id ? `1px solid ${model.colorBorder}` : '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: model.color, boxShadow: `0 0 20px ${model.color}40` }}>
                    {model.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: model.color }}>{model.name}</div>
                    <div className="text-xs text-slate-500">{model.provider}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xl font-bold text-white">{stats.overall}</div>
                    <div className="text-xs text-slate-500">Score</div>
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${stats.overall}%`, background: `linear-gradient(90deg, ${model.color}, ${model.color}80)` }} />
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'ELO', value: stats.elo, mono: true },
                    { label: 'Latencja', value: `${stats.avgLatency}s`, mono: true },
                    { label: 'Koszt', value: `$${stats.totalCost.toFixed(2)}`, mono: true },
                  ].map(({ label, value, mono }) => (
                    <div key={label} className="rounded-lg py-2" style={{ background: 'rgba(10,10,18,0.5)' }}>
                      <div className="text-xs text-slate-500">{label}</div>
                      <div className={`text-sm font-bold text-white ${mono ? 'font-mono' : ''}`}>{value}</div>
                    </div>
                  ))}
                </div>

                {stats.hallucinations > 0 && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400">
                    <AlertTriangle size={11} />
                    <span>{stats.hallucinations} potencjalnych halucynacji wykrytych</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
