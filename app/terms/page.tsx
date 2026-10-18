'use client';

import { Terminal, Code, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <Terminal className="h-3.5 w-3.5" />
          <span>{t.termsPage.lastUpdated}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary">
          {t.termsPage.title}
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          {t.termsPage.intro}
        </p>
      </section>

      <div className="space-y-6">
        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Code className="h-5 w-5 text-accent-primary" />
            <span>{t.termsPage.licenseTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.termsPage.licenseBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span>{t.termsPage.asIsTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.termsPage.asIsBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <ShieldCheck className="h-5 w-5 text-accent-primary" />
            <span>{t.termsPage.commentsTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.termsPage.commentsBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Terminal className="h-5 w-5 text-accent-primary" />
            <span>{t.termsPage.ipTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.termsPage.ipBody}
          </p>
        </section>

        <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 border-b border-divider pb-2">
            <Mail className="h-5 w-5 text-accent-primary" />
            <span>{t.termsPage.contactTitle}</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t.termsPage.contactBody}
          </p>
        </section>
      </div>
    </div>
  );
}
