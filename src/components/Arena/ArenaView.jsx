import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, RefreshCw, Shuffle, Tag, Info } from 'lucide-react';
import ModelCard from './ModelCard';
import RubricForm from './RubricForm';
import { ARENA_PAIRS, BENCHMARK_TASKS, MODELS, CATEGORIES, ARENA_VOTES } from '../../data/mockData';

function Badge({ children, color }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}>
      {children}
    </span>
  );
}

export default function ArenaView() {
  const [pairIdx, setPairIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponses, setShowResponses] = useState(true);
  const [voteHistory, setVoteHistory] = useState([...ARENA_VOTES]);
  const [toast, setToast] = useState(null);

  const pair = ARENA_PAIRS[pairIdx];
  const task = pair?.task;
  const category = CATEGORIES.find(c => c.id === task?.category);

  const handleRunTest = () => {
    setIsLoading(true);
    setShowResponses(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowResponses(true);
    }, 2200);
  };

  const handleVote = ({ vote, totalA, totalB, note }) => {
    const newVote = {
      id: `vote-${Date.now()}`,
      modelA: pair.modelA.id,
      modelB: pair.modelB.id,
      winner: vote,
      category: task.category,
      timestamp: new Date().toISOString(),
      scores: { a: totalA, b: totalB },
      note,
    };
    setVoteHistory(h => [newVote, ...h]);
    setToast({ message: 'Ocena zapisana pomyślnie!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNext = () => {
    setPairIdx(i => (i + 1) % ARENA_PAIRS.length);
    setShowResponses(true);
    setIsLoading(false);
  };

  const handlePrev = () => {
    setPairIdx(i => (i - 1 + ARENA_PAIRS.length) % ARENA_PAIRS.length);
    setShowResponses(true);
    setIsLoading(false);
  };

  const totalVotes = voteHistory.length;
  const winStats = {
    'model-a': voteHistory.filter(v => v.winner === 'model-a').length,
    'model-b': voteHistory.filter(v => v.winner === 'model-b').length,
    'tie': voteHistory.filter(v => v.winner === 'tie').length,
    'both-bad': voteHistory.filter(v => v.winner === 'both-bad').length,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-up">
          <div className="px-4 py-3 rounded-xl text-sm font-medium text-white flex items-center gap-2"
            style={{ background: 'rgba(16,185,129,0.9)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}>
            <span>✓</span> {toast.message}
          </div>
        </div>
      )}

      {/* Top stats bar */}
      <div className="flex items-center gap-4 px-6 py-3 shrink-0 flex-wrap gap-y-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-white">{totalVotes}</span> ocen łącznie
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: 'Wygrane A', val: winStats['model-a'], color: '#6366f1' },
            { label: 'Remis', val: winStats['tie'], color: '#f59e0b' },
            { label: 'Obie złe', val: winStats['both-bad'], color: '#ef4444' },
            { label: 'Wygrane B', val: winStats['model-b'], color: '#ec4899' },
          ].map(({ label, val, color }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-slate-400">{label}:</span>
              <span className="font-bold" style={{ color }}>{val}</span>
            </div>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={handlePrev} className="btn-ghost p-1.5">
            <ChevronLeft size={15} />
          </button>
          <span className="text-xs text-slate-500 font-mono">{pairIdx + 1}/{ARENA_PAIRS.length}</span>
          <button onClick={handleNext} className="btn-ghost p-1.5">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-5">
          {/* Task prompt */}
          <div className="card-elevated rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={13} className="text-slate-500" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Zadanie</span>
                  {category && (
                    <Badge color={category.color}>{category.icon} {category.name}</Badge>
                  )}
                  {task?.difficulty && (
                    <Badge color={task.difficulty === 'hard' ? '#ef4444' : task.difficulty === 'medium' ? '#f59e0b' : '#10b981'}>
                      {task.difficulty}
                    </Badge>
                  )}
                </div>
                <h2 className="text-base font-bold text-white mb-2">{task?.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{task?.content}</p>
                {task?.criteria && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {task.criteria.map((c, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.08)', color: 'rgba(165,180,252,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleRunTest}
                className="btn-primary flex items-center gap-2 shrink-0"
                disabled={isLoading}
              >
                {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                {isLoading ? 'Generowanie...' : 'Uruchom test'}
              </button>
            </div>
          </div>

          {/* Model cards split */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" style={{ minHeight: '480px' }}>
            <ModelCard
              label="Model A"
              modelId={pair?.modelA.id}
              response={showResponses ? pair?.modelA.response : null}
              latency={pair?.modelA.latency}
              tokens={pair?.modelA.tokens}
              colorScheme="indigo"
              isLoading={isLoading}
            />
            <ModelCard
              label="Model B"
              modelId={pair?.modelB.id}
              response={showResponses ? pair?.modelB.response : null}
              latency={pair?.modelB.latency}
              tokens={pair?.modelB.tokens}
              colorScheme="pink"
              isLoading={isLoading}
            />
          </div>

          {/* Rubric form */}
          <RubricForm
            modelAId={pair?.modelA.id}
            modelBId={pair?.modelB.id}
            onVote={handleVote}
          />

          {/* Vote history */}
          <div className="card-elevated rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Info size={14} className="text-indigo-400" />
              Historia ostatnich ocen
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {voteHistory.slice(0, 10).map((v) => {
                const cat = CATEGORIES.find(c => c.id === v.category);
                const winnerLabel = { 'model-a': '🏆 Model A', 'model-b': '🏆 Model B', 'tie': '⚖️ Remis', 'both-bad': '👎 Obie złe' }[v.winner];
                return (
                  <div key={v.id} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs">{winnerLabel}</span>
                      {cat && <span className="text-xs" style={{ color: cat.color }}>{cat.icon} {cat.name}</span>}
                    </div>
                    <span className="text-xs text-slate-600 font-mono">{new Date(v.timestamp).toLocaleDateString('pl-PL')}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
