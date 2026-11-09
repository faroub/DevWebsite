/**
 * Theme handling for the site. The one source of truth for reading, storing and
 * applying the light/dark theme.
 *
 * The only other place that touches the theme is the tiny inline bootstrap
 * script in app/layout.tsx, which must run before hydration to avoid a flash;
 * it mirrors applyTheme/getStoredTheme for the pre-React paint only.
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/** System preference is used only when the visitor has not chosen a theme. */
function systemPrefersLight(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: light)').matches;
}

/** Applies the theme classes to the document root. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
}

/** Returns the stored theme, or null when unset/invalid. */
export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

export function storeTheme(theme: Theme): void {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Resolves the initial theme: the visitor's stored choice wins, otherwise
 * the system preference (light or dark), defaulting to dark.
 */
export function resolveInitialTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return systemPrefersLight() ? 'light' : 'dark';
}
