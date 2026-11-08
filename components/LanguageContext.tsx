'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations, TranslationDictionary } from '@/lib/i18n/translations';

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
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('mzilab_locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'fr' || saved === 'ar')) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('mzilab_locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  const t = translations[locale] || translations.en;
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
