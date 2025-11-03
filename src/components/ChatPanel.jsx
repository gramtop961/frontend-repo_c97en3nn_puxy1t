import React, { useEffect, useRef, useState } from 'react';
import { Send, Trash2 } from 'lucide-react';

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.2s]"/>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.1s]"/>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"/>
    </span>
  );
}

export default function ChatPanel({ themeGradient, onClearCitations, sessionId }) {
  const [messages, setMessages] = useState([
    { id: 'sys', role: 'assistant', content: 'Upload PDFs and ask me anything. I will cite sources like [1] inline and list them on the right.' }
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, streaming]);

  useEffect(() => {
    // Reset chat when session changes
    setMessages([{ id: 'sys', role: 'assistant', content: 'New chat started. How can I help?' }]);
  }, [sessionId]);

  const handleSend = async () => {
    if (!input.trim() || streaming) return;
    const userMsg = { id: crypto.randomUUID(), role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setStreaming(true);
    onClearCitations?.();

    // Simulated streaming
    const ans = 'Here\'s a simulated streaming answer with inline citation [1]. This demonstrates how answers appear in chat bubbles with a clean reading experience.';
    let acc = '';
    for (const ch of ans) {
      await new Promise(r => setTimeout(r, 12));
      acc += ch;
      setMessages((m) => {
        const base = m.filter(x => x.id !== 'stream');
        return [...base, { id: 'stream', role: 'assistant', content: acc }];
      });
    }
    setStreaming(false);
  };

  const clearChat = () => {
    setMessages([{ id: 'sys', role: 'assistant', content: 'Chat cleared. Ask a question about your PDFs.' }]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/10 dark:border-white/10">
        <div className="text-sm opacity-70">Session: {sessionId.slice(0, 8)}</div>
        <button onClick={clearChat} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"><Trash2 className="h-4 w-4"/>Clear</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${m.role==='user' ? 'ml-auto bg-primary-50 dark:bg-primary-900/20 border border-primary-200/70 dark:border-primary-900/30' : 'bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10'}`}>
            <div className={`font-medium mb-0.5 ${m.role==='user' ? 'text-primary-700 dark:text-primary-300' : 'opacity-70'}`}>{m.role==='user' ? 'You' : 'Assistant'}</div>
            <div dangerouslySetInnerHTML={{ __html: m.content.replaceAll('\n', '<br/>') }} />
          </div>
        ))}
        {streaming && (
          <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-3 py-2 text-sm shadow-sm bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10`}>
            <div className="font-medium mb-0.5 opacity-70">Assistant</div>
            <TypingDots />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Sticky input */}
      <div className="sticky bottom-0 px-3 py-2 bg-gradient-to-t from-white/95 dark:from-zinc-950/95 to-transparent backdrop-blur">
        <div className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-inner p-1.5 flex items-end gap-2`}>
          <textarea rows={1} value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about your PDFs…" className="flex-1 resize-none bg-transparent outline-none px-2 py-1 text-sm" />
          <button onClick={handleSend} disabled={!input.trim() || streaming} className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${themeGradient} disabled:opacity-50`}>
            <Send className="h-4 w-4"/>
            Send
          </button>
        </div>
        <div className="mt-1 text-[11px] opacity-60">Streaming demo only. Backend endpoints not yet connected.</div>
      </div>
    </div>
  );
}
