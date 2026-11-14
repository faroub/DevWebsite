'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { GISCUS_CONFIG } from '@/lib/giscus';

interface CommentsProps {
  term: string;
}

export function Comments({ term }: CommentsProps) {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Determine theme (dark / light) from document root
    const isLight = document.documentElement.classList.contains('light');
    const theme = isLight ? 'light' : 'dark';

    // Map site locale to giscus supported lang (en, fr, ar)
    const lang = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr' : 'en';

    // Clear previous widget
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_CONFIG.repo);
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
    script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
    script.setAttribute('data-term', term);
    script.setAttribute('data-strict', GISCUS_CONFIG.strict);
    script.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata);
    script.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);

    // MutationObserver to update theme when document class changes
    const observer = new MutationObserver(() => {
      const updatedLight = document.documentElement.classList.contains('light');
      const updatedTheme = updatedLight ? 'light' : 'dark';
      const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: updatedTheme } } },
          'https://giscus.app'
        );
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [term, locale]);

  return (
    <section aria-label="Comments &amp; Discussions" className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm transition-colors">
      <h2 className="font-sans text-xl font-bold text-text-primary border-b border-divider pb-3">
        Community Discussion &amp; Comments
      </h2>
      <div ref={containerRef} className="giscus-wrapper min-h-[160px]" />
    </section>
  );
}
