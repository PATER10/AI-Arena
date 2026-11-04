import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Trophy, AlertCircle, Scale, ThumbsDown } from 'lucide-react';
import { computeWeightedScore } from '../../data/mockData';

const RUBRIC = [
  { key: 'correctness', label: 'Poprawność merytoryczna', weight: 35, desc: 'Zgodność odpowiedzi z faktami lub testami', color: '#10b981' },
  { key: 'instruction', label: 'Zgodność z poleceniem', weight: 25, desc: 'Realizacja wszystkich wymaganych instrukcji', color: '#6366f1' },
  { key: 'completeness', label: 'Kompletność', weight: 20, desc: 'Uwzględnienie wymaganych elementów odpowiedzi', color: '#f59e0b' },
  { key: 'clarity', label: 'Jasność i struktura', weight: 10, desc: 'Czytelność, formatowanie i organizacja tekstu', color: '#ec4899' },
  { key: 'reasoning', label: 'Uzasadnienie/Weryfikowalność', weight: 10, desc: 'Jakość wyjaśnienia i możliwość weryfikacji', color: '#8b5cf6' },
];

const VOTE_OPTIONS = [
  { id: 'model-a', label: 'Model A lepszy', cls: 'vote-a', Icon: Trophy, emoji: '🏆' },
  { id: 'tie', label: 'Remis', cls: 'vote-tie', Icon: Scale, emoji: '⚖️' },
  { id: 'both-bad', label: 'Obie złe', cls: 'vote-bad', Icon: ThumbsDown, emoji: '👎' },
  { id: 'model-b', label: 'Model B lepszy', cls: 'vote-b', Icon: Trophy, emoji: '🏆' },
];

export default function RubricForm({ modelAId, modelBId, onVote, onScoreChange }) {
  const [expanded, setExpanded] = useState(true);
  const [vote, setVote] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [scoresA, setScoresA] = useState({ correctness: 3, instruction: 3, completeness: 3, clarity: 3, reasoning: 3 });
  const [scoresB, setScoresB] = useState({ correctness: 3, instruction: 3, completeness: 3, clarity: 3, reasoning: 3 });
  const [note, setNote] = useState('');

  const totalA = computeWeightedScore(scoresA).toFixed(1);
  const totalB = computeWeightedScore(scoresB).toFixed(1);

  const handleVote = (id) => { setVote(id); };

  const handleSubmit = () => {
    if (!vote) return;
    setSubmitted(true);
    onVote?.({ vote, scoresA, scoresB, note, totalA, totalB });
  };

  const handleReset = () => {
    setVote(null);
    setSubmitted(false);
    setScoresA({ correctness: 3, instruction: 3, completeness: 3, clarity: 3, reasoning: 3 });
    setScoresB({ correctness: 3, instruction: 3, completeness: 3, clarity: 3, reasoning: 3 });
    setNote('');
  };

  if (submitted) {
    return (
      <div className="card-elevated rounded-2xl p-6 animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
          style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
          <Trophy size={28} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Ocena zapisana!</h3>
        <p className="text-sm text-slate-400 mb-5">
          Wybrany zwycięzca: <span className="font-semibold text-white">{VOTE_OPTIONS.find(v => v.id === vote)?.label}</span>
        </p>
        <div className="flex gap-3 justify-center mb-4">
          <div className="px-4 py-2 rounded-xl text-center" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="text-xs text-indigo-400 font-medium">Model A</div>
            <div className="text-xl font-bold text-white">{totalA}</div>
          </div>
          <div className="text-slate-500 self-center text-lg font-bold">vs</div>
          <div className="px-4 py-2 rounded-xl text-center" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)' }}>
            <div className="text-xs text-pink-400 font-medium">Model B</div>
            <div className="text-xl font-bold text-white">{totalB}</div>
          </div>
        </div>
        <button onClick={handleReset} className="btn-secondary text-xs px-6">
          Oceń kolejną parę
        </button>
      </div>
    );
  }

  return (
    <div className="card-elevated rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <AlertCircle size={15} className="text-indigo-400" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white">Rubryka Ocen</div>
            <div className="text-xs text-slate-500">Oceń każde kryterium (1–5) i wskaż zwycięzcę</div>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-5">
          {/* Rubric criteria */}
          <div className="space-y-4">
            {RUBRIC.map(({ key, label, weight, desc, color }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    <span className="text-xs font-semibold text-white">{label}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(136,136,168,0.8)' }}>
                      {weight}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>A: <span className="font-bold" style={{ color }}>{scoresA[key]}</span></span>
                    <span>B: <span className="font-bold text-pink-400">{scoresB[key]}</span></span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2">{desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-indigo-400 font-medium mb-1">Model A</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range" min="1" max="5" step="1"
                        value={scoresA[key]}
                        onChange={e => setScoresA(s => ({ ...s, [key]: Number(e.target.value) }))}
                        className="rubric-slider flex-1"
                        style={{ accentColor: color }}
                      />
                      <span className="text-xs font-mono font-bold text-white w-4">{scoresA[key]}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-pink-400 font-medium mb-1">Model B</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="range" min="1" max="5" step="1"
                        value={scoresB[key]}
                        onChange={e => setScoresB(s => ({ ...s, [key]: Number(e.target.value) }))}
                        className="rubric-slider flex-1"
                        style={{ accentColor: '#ec4899' }}
                      />
                      <span className="text-xs font-mono font-bold text-white w-4">{scoresB[key]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Score summary bar */}
          <div className="rounded-xl p-3 flex gap-3" style={{ background: 'rgba(10,10,18,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex-1 text-center">
              <div className="text-xs text-indigo-400 font-medium mb-1">Wynik Model A</div>
              <div className="text-2xl font-bold text-white">{totalA}<span className="text-sm text-slate-500">/100</span></div>
            </div>
            <div className="w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="flex-1 text-center">
              <div className="text-xs text-pink-400 font-medium mb-1">Wynik Model B</div>
              <div className="text-2xl font-bold text-white">{totalB}<span className="text-sm text-slate-500">/100</span></div>
            </div>
          </div>

          {/* Voting buttons */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Wskaż zwycięzcę</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VOTE_OPTIONS.map(({ id, label, cls, emoji }) => (
                <button
                  key={id}
                  onClick={() => handleVote(id)}
                  className={`vote-btn ${cls} ${vote === id ? 'selected' : ''}`}
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional note */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1.5">Notatka oceniającego (opcjonalnie)</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={2}
              placeholder="Uzasadnij swój wybór..."
              className="input-field resize-none text-xs"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!vote}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              vote ? 'btn-primary' : 'opacity-40 cursor-not-allowed'
            }`}
            style={vote ? {} : { background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}
          >
            {vote ? '✓ Zatwierdź ocenę' : 'Wybierz zwycięzcę aby zatwierdzić'}
          </button>
        </div>
      )}
    </div>
  );
}
