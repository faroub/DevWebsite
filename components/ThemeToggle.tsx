'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import {
  applyTheme,
  resolveInitialTheme,
  storeTheme,
  type Theme,
} from '@/lib/theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTheme = resolveInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    storeTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div className="min-h-[44px] min-w-[44px] rounded-md border border-divider bg-surface" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light mode"
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-divider bg-surface text-accent-primary hover:border-accent-primary hover:shadow-glow-teal transition-all shadow-sm"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode (Deep Slate)'}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-accent-primary" />
      )}
    </button>
  );
}
