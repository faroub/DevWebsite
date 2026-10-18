'use client';

import { ShieldCheck, Lock, HardDrive, Mail, Smartphone } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{t.privacyPage.lastUpdated}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary">
          {t.privacyPage.title}
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          {t.privacyPage.intro}
        </p>
      </section>

      <div className="space-y-6">
        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Lock className="h-5 w-5 text-accent-primary" />
            <span>{t.privacyPage.zeroServerTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.privacyPage.zeroServerBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <HardDrive className="h-5 w-5 text-accent-primary" />
            <span>{t.privacyPage.localStorageTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.privacyPage.localStorageBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Mail className="h-5 w-5 text-accent-primary" />
            <span>{t.privacyPage.feedbackTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.privacyPage.feedbackBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Smartphone className="h-5 w-5 text-accent-primary" />
            <span>{t.privacyPage.mobileAppsTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.privacyPage.mobileAppsBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Mail className="h-5 w-5 text-accent-primary" />
            <span>{t.privacyPage.contactTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.privacyPage.contactBody}
          </p>
        </section>
      </div>
    </div>
  );
}
