'use client';

import Link from 'next/link';
import { Terminal, Cpu, Code2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-divider bg-surface py-8 text-xs text-text-secondary font-mono transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-accent-primary" />
          <span>{t.footer.copy}</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href="/privacy" className="hover:text-accent-primary transition-colors">
            {t.footer.privacy}
          </Link>
          <span className="text-divider">|</span>
          <Link href="/terms" className="hover:text-accent-primary transition-colors">
            {t.footer.terms}
          </Link>
          <span className="text-divider">|</span>
          <span className="flex items-center gap-1 text-text-primary font-medium">
            <Cpu className="h-3.5 w-3.5 text-accent-success" />
            <span>{t.footer.zeroServer}</span>
          </span>
          <span className="text-divider">|</span>
          <span className="flex items-center gap-1 text-text-primary font-medium">
            <Code2 className="h-3.5 w-3.5 text-accent-primary" />
            <span>{t.footer.mdxDriven}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
