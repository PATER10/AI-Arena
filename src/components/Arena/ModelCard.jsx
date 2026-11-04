import React from 'react';
import { Clock, Hash, Cpu, ExternalLink } from 'lucide-react';

// Very lightweight markdown-like renderer
function ResponseRenderer({ text }) {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements = [];
  let codeBlock = false;
  let codeLang = '';
  let codeLines = [];
  let i = 0;

  const flushCode = () => {
    if (codeLines.length > 0) {
      elements.push(
        <div key={`code-${i}`} className="rounded-lg overflow-hidden my-3" style={{ background: 'rgba(10,10,18,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {codeLang && (
            <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-xs font-mono font-semibold" style={{ color: '#10b981' }}>{codeLang}</span>
            </div>
          )}
          <pre className="p-3 overflow-x-auto text-xs leading-relaxed" style={{ color: '#c8c8e8', fontFamily: "'JetBrains Mono', monospace" }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      codeLines = [];
      codeLang = '';
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!codeBlock) {
        codeBlock = true;
        codeLang = line.slice(3).trim();
      } else {
        codeBlock = false;
        flushCode();
      }
      i++;
      continue;
    }

    if (codeBlock) {
      codeLines.push(line);
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('## ')) {
      elements.push(<h3 key={i} className="text-sm font-bold text-white mt-4 mb-2">{line.slice(3)}</h3>);
    } else if (line.startsWith('# ')) {
      elements.push(<h2 key={i} className="text-base font-bold text-white mt-4 mb-2">{line.slice(2)}</h2>);
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(<p key={i} className="font-semibold text-white text-sm my-1">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.slice(2);
      elements.push(
        <div key={i} className="flex items-start gap-2 my-0.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgba(99,102,241,0.7)' }} />
          <span className="text-sm text-slate-300">{renderInline(content)}</span>
        </div>
      );
    } else if (line.match(/^\d+\./)) {
      const num = line.match(/^(\d+)\./)[1];
      const content = line.replace(/^\d+\.\s*/, '');
      elements.push(
        <div key={i} className="flex items-start gap-2 my-0.5">
          <span className="text-xs font-mono text-indigo-400 font-bold shrink-0 mt-0.5 w-4">{num}.</span>
          <span className="text-sm text-slate-300">{renderInline(content)}</span>
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm text-slate-300 leading-relaxed">{renderInline(line)}</p>);
    }
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function renderInline(text) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function ModelCard({ label, modelId, response, latency, tokens, colorScheme = 'indigo', isLoading = false }) {
  const colors = colorScheme === 'indigo'
    ? { accent: '#6366f1', accentBg: 'rgba(99,102,241,0.08)', accentBorder: 'rgba(99,102,241,0.2)', badge: 'text-indigo-400', glow: 'rgba(99,102,241,0.15)' }
    : { accent: '#ec4899', accentBg: 'rgba(236,72,153,0.08)', accentBorder: 'rgba(236,72,153,0.2)', badge: 'text-pink-400', glow: 'rgba(236,72,153,0.15)' };

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden" style={{ background: 'rgba(15,15,26,0.9)', border: `1px solid ${colors.accentBorder}`, boxShadow: `0 0 40px ${colors.glow}` }}>
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: colors.accentBg, borderBottom: `1px solid ${colors.accentBorder}` }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white"
            style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colorScheme === 'indigo' ? '#7c3aed' : '#db2777'})` }}>
            {label.slice(-1)}
          </div>
          <div>
            <div className={`text-sm font-bold ${colors.badge}`}>{label}</div>
            <div className="text-xs text-slate-500">Odpowiedź modelu</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          {latency && (
            <div className="flex items-center gap-1 text-slate-500">
              <Clock size={11} />
              <span>{latency}s</span>
            </div>
          )}
          {tokens && (
            <div className="flex items-center gap-1 text-slate-500">
              <Hash size={11} />
              <span>{tokens} tok.</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 rounded shimmer-bg" style={{ width: `${60 + Math.random() * 40}%` }} />
            ))}
            <div className="h-20 rounded shimmer-bg mt-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 rounded shimmer-bg" style={{ width: `${50 + Math.random() * 50}%` }} />
            ))}
          </div>
        ) : response ? (
          <ResponseRenderer text={response} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Cpu size={36} className="text-slate-700 mb-3" />
            <p className="text-sm text-slate-600">Uruchom eksperyment, aby zobaczyć odpowiedź</p>
          </div>
        )}
      </div>
    </div>
  );
}
