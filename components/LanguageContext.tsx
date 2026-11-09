'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations, TranslationDictionary } from '@/lib/i18n/translations';
import { LOCALE_STORAGE_KEY, DEFAULT_LOCALE, applyLocale, getStoredLocale } from '@/lib/locale';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Locale switching is client-side only. Because the site is a static
 * export, the server always renders English; after hydration the chosen
 * locale (from localStorage) replaces the content and the <html>
 * lang / dir attributes are synced here.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored) {
      setLocaleState(stored);
      applyLocale(stored);
    } else {
      applyLocale(DEFAULT_LOCALE);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    applyLocale(newLocale);
  };

  const t = translations[locale] || translations[DEFAULT_LOCALE];
  const isRtl = locale === 'ar';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'en' as Locale,
      setLocale: () => {},
      t: translations.en,
      isRtl: false,
    };
  }
  return context;
}
