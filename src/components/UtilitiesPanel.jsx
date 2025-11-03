import React, { useState } from 'react';
import { Upload, FileText, Info, BarChart2 } from 'lucide-react';

export default function UtilitiesPanel({ themeGradient, clearOnStream, setClearOnStream, citations, setCitations }) {
  const [indexPreview] = useState([
    { id: 'doc1#c-12', score: 0.87, text: 'Introduction to the architecture and core principles of the system…' },
    { id: 'doc1#c-34', score: 0.81, text: 'Retrieval uses TF-IDF with NearestNeighbors as a robust fallback…' },
  ]);

  const onUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    alert(`Selected ${files.length} file(s). In a full build this will POST to /upload then /ingest.`);
  };

  return (
    <aside className="h-full flex flex-col">
      {/* Upload */}
      <div className="p-3 border-b border-black/10 dark:border-white/10">
        <label className={`group cursor-pointer grid place-items-center rounded-xl border-2 border-dashed border-black/10 dark:border-white/10 p-6 text-center bg-white/70 dark:bg-zinc-900/40 hover:border-transparent hover:bg-gradient-to-r ${themeGradient}`}>
          <div className="space-y-2">
            <Upload className="mx-auto h-6 w-6"/>
            <div className="font-medium">Upload PDFs</div>
            <div className="text-xs opacity-70">Drag & drop or click to select files</div>
          </div>
          <input type="file" multiple accept="application/pdf" onChange={onUpload} className="hidden" />
        </label>
        <div className="mt-2 flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={clearOnStream} onChange={(e)=>setClearOnStream(e.target.checked)} />
            Clear citations on new stream
          </label>
          <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10">
            <BarChart2 className="h-4 w-4"/> Profile
          </button>
        </div>
      </div>

      {/* Citations */}
      <div className="p-3 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5"/>
          <div className="font-medium">Citations</div>
        </div>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {citations.length === 0 && (
            <div className="text-xs opacity-70">No citations yet. When answers stream, sources will appear here with chunk IDs and scores.</div>
          )}
          {citations.map((c) => (
            <div key={c.id} className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 p-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-medium">[{c.n}] {c.title}</div>
                <span className="opacity-70">{(c.score*100).toFixed(0)}%</span>
              </div>
              <div className="opacity-80">{c.preview}</div>
              <div className="opacity-60 mt-1">{c.id}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Index preview */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-5 w-5"/>
          <div className="font-medium">Index Preview</div>
        </div>
        <div className="space-y-2 max-h-56 overflow-y-auto">
          {indexPreview.map((s) => (
            <div key={s.id} className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 p-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="font-medium">{s.id}</div>
                <span className="opacity-70">{Math.round(s.score*100)}%</span>
              </div>
              <div className="opacity-80">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
