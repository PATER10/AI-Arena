import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ArenaView from './components/Arena/ArenaView';
import ExperimentsView from './components/Experiments/ExperimentsView';
import BenchmarkView from './components/Benchmark/BenchmarkView';
import DashboardView from './components/Dashboard/DashboardView';

const VIEWS = {
  arena: ArenaView,
  experiments: ExperimentsView,
  benchmark: BenchmarkView,
  dashboard: DashboardView,
};

export default function App() {
  const [activeView, setActiveView] = useState('arena');
  const ActiveView = VIEWS[activeView] || VIEWS.arena;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-hidden">
          <ActiveView />
        </main>
      </div>
    </div>
  );
}
