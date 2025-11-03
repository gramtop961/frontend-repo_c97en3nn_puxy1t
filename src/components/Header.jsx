import React from 'react';
import { Sparkles, Settings, Sun, Moon, ChevronDown, Plus } from 'lucide-react';

const themes = [
  { key: 'aurora', label: 'Aurora', gradient: 'from-fuchsia-500 via-purple-500 to-sky-500' },
  { key: 'sunset', label: 'Sunset', gradient: 'from-pink-500 via-orange-500 to-amber-500' },
  { key: 'emerald', label: 'Emerald', gradient: 'from-emerald-500 via-teal-500 to-cyan-500' },
  { key: 'ocean', label: 'Ocean', gradient: 'from-sky-500 via-blue-500 to-indigo-500' },
  { key: 'grape', label: 'Grape', gradient: 'from-violet-500 via-purple-600 to-fuchsia-600' },
];

export default function Header({ theme, setTheme, darkMode, setDarkMode, model, setModel, persona, setPersona, topK, setTopK, onNewChat }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-white/60 dark:bg-zinc-900/60 border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${themes.find(t=>t.key===theme)?.gradient} shadow-md`} />
          <div className="text-lg font-semibold tracking-tight">Vibe RAG</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">Chat with PDFs</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Model selector */}
          <div className="flex items-center gap-2 text-sm">
            <label className="text-xs opacity-70">Model</label>
            <div className="relative">
              <select value={model} onChange={(e)=>setModel(e.target.value)} className="appearance-none pr-6 pl-2 py-1 rounded-md bg-white/70 dark:bg-zinc-800/70 border border-black/10 dark:border-white/10 focus:outline-none">
                <option>gpt-4o-mini</option>
                <option>gpt-4o</option>
                <option>gpt-4o-mini-2024-07-18</option>
              </select>
              <ChevronDown className="absolute right-1 top-1.5 h-4 w-4 opacity-60 pointer-events-none" />
            </div>
          </div>

          {/* Persona selector */}
          <div className="flex items-center gap-2 text-sm">
            <label className="text-xs opacity-70">Persona</label>
            <div className="relative">
              <select value={persona} onChange={(e)=>setPersona(e.target.value)} className="appearance-none pr-6 pl-2 py-1 rounded-md bg-white/70 dark:bg-zinc-800/70 border border-black/10 dark:border-white/10 focus:outline-none">
                <option>Concise</option>
                <option>Bullet points</option>
                <option>Step-by-step</option>
                <option>Formal</option>
              </select>
              <ChevronDown className="absolute right-1 top-1.5 h-4 w-4 opacity-60 pointer-events-none" />
            </div>
          </div>

          {/* Top K */}
          <div className="flex items-center gap-2 text-sm">
            <label className="text-xs opacity-70">Top‑K</label>
            <input type="number" min={1} max={10} value={topK} onChange={(e)=>setTopK(parseInt(e.target.value||'1'))} className="w-16 pl-2 py-1 rounded-md bg-white/70 dark:bg-zinc-800/70 border border-black/10 dark:border-white/10 focus:outline-none" />
          </div>

          {/* Theme selector */}
          <div className="relative">
            <select value={theme} onChange={(e)=>setTheme(e.target.value)} className="appearance-none pr-6 pl-2 py-1 rounded-md bg-white/70 dark:bg-zinc-800/70 border border-black/10 dark:border-white/10 focus:outline-none">
              {themes.map(t=> (
                <option key={t.key} value={t.key}>{t.label}</option>
              ))}
            </select>
            <Sparkles className="absolute right-1 top-1.5 h-4 w-4 opacity-60 pointer-events-none" />
          </div>

          {/* Dark / Light */}
          <button onClick={()=>setDarkMode(!darkMode)} aria-label="Toggle theme" className="h-8 w-8 grid place-items-center rounded-md border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-800/70">
            {darkMode ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
          </button>

          <button onClick={onNewChat} className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-800/70">
            <Plus className="h-4 w-4"/> New Chat
          </button>

          <button className="h-8 w-8 grid place-items-center rounded-md border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-800/70" aria-label="Settings">
            <Settings className="h-4 w-4"/>
          </button>
        </div>
      </div>
      {/* Animated top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${themes.find(t=>t.key===theme)?.gradient} animate-pulse`} />
    </header>
  );
}
