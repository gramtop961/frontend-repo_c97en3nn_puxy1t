import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import HeroSpline from './components/HeroSpline.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import UtilitiesPanel from './components/UtilitiesPanel.jsx';

const THEME_MAP = {
  aurora: 'from-fuchsia-500 via-purple-500 to-sky-500',
  sunset: 'from-pink-500 via-orange-500 to-amber-500',
  emerald: 'from-emerald-500 via-teal-500 to-cyan-500',
  ocean: 'from-sky-500 via-blue-500 to-indigo-500',
  grape: 'from-violet-500 via-purple-600 to-fuchsia-600',
};

function usePersistent(key, initial) {
  const [value, setValue] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : initial; } catch { return initial; }
  });
  useEffect(()=>{ try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

export default function App() {
  // Theme + preferences
  const [theme, setTheme] = usePersistent('theme', 'aurora');
  const [darkMode, setDarkMode] = usePersistent('darkMode', true);
  const [model, setModel] = usePersistent('model', 'gpt-4o-mini');
  const [persona, setPersona] = usePersistent('persona', 'Concise');
  const [topK, setTopK] = usePersistent('topK', 4);
  const [clearOnStream, setClearOnStream] = usePersistent('clearOnStream', true);

  // Chat + citations
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [citations, setCitations] = useState([]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const themeGradient = useMemo(() => `from-30% to-90% ${THEME_MAP[theme]}`, [theme]);

  const handleNewChat = () => {
    setSessionId(crypto.randomUUID());
    setCitations([]);
  };

  const handleClearCitations = () => { if (clearOnStream) setCitations([]); };

  return (
    <div className={`min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative`}>      
      {/* Ambient background glow */}
      <div className={`pointer-events-none fixed inset-0 bg-gradient-to-br ${themeGradient} opacity-20 blur-3xl`} />

      <Header
        theme={theme}
        setTheme={setTheme}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        model={model}
        setModel={setModel}
        persona={persona}
        setPersona={setPersona}
        topK={topK}
        setTopK={setTopK}
        onNewChat={handleNewChat}
      />

      <HeroSpline gradientClass={`from-transparent via-transparent to-${THEME_MAP[theme].split(' ').pop()}`} />

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 py-4">
        {/* Chat left */}
        <section className="lg:col-span-2 min-h-[48vh] rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur">
          <ChatPanel themeGradient={themeGradient} onClearCitations={handleClearCitations} sessionId={sessionId} />
        </section>

        {/* Utilities right */}
        <section className="min-h-[48vh] rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur">
          <UtilitiesPanel themeGradient={themeGradient} clearOnStream={clearOnStream} setClearOnStream={setClearOnStream} citations={citations} setCitations={setCitations} />
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 pb-6 text-xs opacity-70">
        Persona: {persona} · Model: {model} · Top‑K: {topK}
      </footer>
    </div>
  );
}
