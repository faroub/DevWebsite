'use client';

import { useLanguage } from './LanguageContext';
import { Locale } from '@/lib/i18n/translations';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="relative inline-flex items-center rounded-md border border-divider bg-canvas px-2 py-1 font-mono text-xs shadow-sm">
      <Globe className="h-3.5 w-3.5 text-accent-primary mr-1.5 shrink-0" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="bg-transparent text-text-primary focus:outline-none cursor-pointer font-bold text-xs"
        aria-label="Select website language"
      >
        <option value="en" className="bg-surface text-text-primary">EN - English</option>
        <option value="fr" className="bg-surface text-text-primary">FR - Français</option>
        <option value="ar" className="bg-surface text-text-primary">AR - العربية</option>
      </select>
    </div>
  );
}
