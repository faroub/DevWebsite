'use client';

import Image from 'next/image';
import { Terminal, Code, Compass, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Section 1: What is mzilab? */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm transition-colors">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Code className="h-5 w-5 text-accent-primary" />
          <span>{t.aboutPage.whatIsTitle}</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          {t.aboutPage.whatIsBody}
        </p>
      </section>

      {/* Section 2: Who am I? */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm transition-colors">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-accent-primary" />
          <span>{t.aboutPage.whoAmITitle}</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          {t.aboutPage.whoAmIBody}
        </p>
      </section>

      {/* Section 3: The Origin of "mzi" */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Compass className="h-5 w-5 text-accent-primary" />
          <span>{t.aboutPage.originTitle}</span>
        </h2>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          {t.aboutPage.originBody}
        </p>

        {/* Attached Photography Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-lg border border-divider bg-canvas overflow-hidden space-y-2 p-3 shadow-sm group">
            <div className="relative aspect-[4/3] w-full rounded border border-divider overflow-hidden bg-surface">
              <Image
                src="/images/ouad1.jpeg"
                alt={t.aboutPage.bridgeTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="font-mono text-xs">
              <div className="font-bold text-text-primary">{t.aboutPage.bridgeTitle}</div>
              <div className="text-text-secondary text-[11px]">{t.aboutPage.bridgeSub}</div>
            </div>
          </div>

          <div className="rounded-lg border border-divider bg-canvas overflow-hidden space-y-2 p-3 shadow-sm group">
            <div className="relative aspect-[4/3] w-full rounded border border-divider overflow-hidden bg-surface">
              <Image
                src="/images/ouad2.jpeg"
                alt={t.aboutPage.cascadeTitle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="font-mono text-xs">
              <div className="font-bold text-text-primary">{t.aboutPage.cascadeTitle}</div>
              <div className="text-text-secondary text-[11px]">{t.aboutPage.cascadeSub}</div>
            </div>
          </div>
        </div>

        {/* Google Maps Location Link */}
        <div className="pt-2 border-t border-divider">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Oued+M%27Zi+Laghouat+Algeria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-accent-primary/40 bg-accent-primary/10 px-4 py-2 font-mono text-xs font-bold text-accent-primary hover:bg-accent-primary hover:text-white transition-all shadow-sm"
          >
            <MapPin className="h-4 w-4" />
            <span>{t.aboutPage.mapsButton}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
