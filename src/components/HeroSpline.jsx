import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline({ gradientClass }) {
  return (
    <section className="relative w-full h-[38vh] sm:h-[46vh] overflow-hidden">
      <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      {/* Ambient gradient overlay */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${gradientClass} opacity-30`} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-4 py-2 rounded-full backdrop-blur bg-white/40 dark:bg-zinc-900/40 border border-black/10 dark:border-white/10 text-sm font-medium">
          AI voice agent aura animation — enhanced splash
        </div>
      </div>
    </section>
  );
}
