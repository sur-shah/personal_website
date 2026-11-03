'use client';

import { useEffect, useSyncExternalStore } from 'react';

const accents = [
  { id: 'solar', name: 'Solar', color: '#e79a79', y: 23 },
  { id: 'ion', name: 'Ion', color: '#7ca8f5', y: 9 },
  { id: 'plasma', name: 'Plasma', color: '#e58b9a', y: 29 },
  { id: 'lunar', name: 'Lunar', color: '#c4cdd8', y: 16 },
] as const;
type Accent = (typeof accents)[number]['id'];
const subscribe = (callback: () => void) => {
  window.addEventListener('accentchange', callback);
  return () => window.removeEventListener('accentchange', callback);
};
const getAccent = () => document.documentElement.dataset.accent || 'solar';
const getServerAccent = () => 'solar';

function choose(id: Accent) {
  document.documentElement.dataset.accent = id;
  window.dispatchEvent(new Event('accentchange'));
  try {
    localStorage.setItem('sur-accent', id);
  } catch {
    /* Storage is optional. */
  }
}

export function AccentConstellation() {
  const selected = useSyncExternalStore(subscribe, getAccent, getServerAccent);
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sur-accent');
      if (accents.some((accent) => accent.id === stored)) {
        document.documentElement.dataset.accent = stored as Accent;
        window.dispatchEvent(new Event('accentchange'));
      }
    } catch {
      /* Use the default when storage is unavailable. */
    }
  }, []);
  return (
    <div className="mt-10 flex items-center gap-5 sm:mt-12">
      <fieldset className="relative m-0 h-14 w-44 shrink-0 border-0 p-0">
        <legend className="sr-only">Starfield accent color</legend>
        <svg
          aria-hidden="true"
          viewBox="0 0 176 56"
          className="pointer-events-none absolute inset-0 size-full fill-none stroke-white/20"
        >
          <path d="M22 33 66 19 110 39 154 26" />
        </svg>
        {accents.map((accent, i) => (
          <button
            key={accent.id}
            type="button"
            aria-label={`${accent.name} accent`}
            aria-pressed={selected === accent.id}
            onClick={() => choose(accent.id)}
            className="accent-star focus-ring absolute flex size-11 -translate-y-1/2 items-center justify-center rounded-full"
            style={{ left: i * 44, top: accent.y + 10, color: accent.color }}
          >
            <span className="accent-star-core size-1.5 rounded-full bg-current" />
            <span className="accent-star-orbit absolute size-6 rounded-full border border-current opacity-0" />
          </button>
        ))}
      </fieldset>
      <div className="text-xs leading-5 text-muted-foreground">
        <p className="text-foreground/80">
          {accents.find((accent) => accent.id === selected)?.name}
        </p>
        <p>Choose your light</p>
      </div>
    </div>
  );
}
