/**
 * Locale handling: the one source for reading, storing and applying the
 * site language and the `dir` attribute.
 *
 * The only other place that touches locale state is the tiny inline
 * bootstrap script in app/layout.tsx, which must run before hydration to
 * set lang/dir before first paint. It mirrors this module for the pre-React
 * paint only.
 */
import type { Locale } from './i18n/translations';

export const LOCALE_STORAGE_KEY = 'mzilab_locale';

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALES: readonly Locale[] = ['en', 'fr', 'ar'] as const;

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'fr' || value === 'ar';
}

/** Applies lang and dir to the document root. */
export function applyLocale(locale: Locale): void {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === 'ar' ? 'rtl' : 'ltr';
}

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(stored) ? stored : null;
}
