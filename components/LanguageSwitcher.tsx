'use client';

import { useLanguage } from './LanguageContext';
import { Locale } from '@/lib/i18n/translations';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const options: { code: Locale; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-md border border-divider bg-canvas p-0.5 font-mono text-xs shadow-sm">
      <div className="pl-1.5 pr-0.5 text-text-secondary hidden sm:flex items-center">
        <Globe className="h-3 w-3 text-accent-primary" />
      </div>
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLocale(opt.code)}
          className={`rounded px-2 py-0.5 transition-all ${
            locale === opt.code
              ? 'bg-accent-primary text-white font-bold shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          }`}
          title={`Switch language to ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
