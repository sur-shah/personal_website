'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

function setTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  window.dispatchEvent(new Event('themechange'));
}

function subscribe(callback: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const systemChanged = () => {
    try {
      if (localStorage.getItem('sur-theme')) return;
    } catch {
      /* Follow the system. */
    }
    setTheme(media.matches);
  };
  media.addEventListener('change', systemChanged);
  window.addEventListener('themechange', callback);
  return () => {
    media.removeEventListener('change', systemChanged);
    window.removeEventListener('themechange', callback);
  };
}

function toggleTheme() {
  const dark = !document.documentElement.classList.contains('dark');
  try {
    localStorage.setItem('sur-theme', dark ? 'dark' : 'light');
  } catch {
    /* Still update the page. */
  }
  setTheme(dark);
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains('dark'),
    () => false,
  );
  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={dark}
      onClick={toggleTheme}
      className="focus-ring grid size-10 shrink-0 place-items-center rounded-md border border-border text-foreground transition-colors hover:bg-accent"
    >
      <Moon
        aria-hidden="true"
        className="size-4 dark:hidden"
        strokeWidth={1.6}
      />
      <Sun
        aria-hidden="true"
        className="hidden size-4 dark:block"
        strokeWidth={1.6}
      />
    </button>
  );
}
