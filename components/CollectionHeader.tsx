'use client';

import { Smartphone, FolderGit2, BookOpen } from 'lucide-react';
import { useLanguage } from './LanguageContext';

type Collection = 'apps' | 'projects' | 'blogs';

const ICONS: Record<Collection, typeof Smartphone> = {
  apps: Smartphone,
  projects: FolderGit2,
  blogs: BookOpen,
};

/**
 * Localized header for the apps, projects and blogs listing pages.
 */
export function CollectionHeader({ collection }: { collection: Collection }) {
  const { t } = useLanguage();
  const meta = t.collections[collection];
  const Icon = ICONS[collection];

  return (
    <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
      <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
        <Icon className="h-3.5 w-3.5" />
        <span>{meta.catalogHeader}</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
        {meta.title}
      </h1>
      <p className="text-sm text-text-secondary leading-relaxed max-w-2xl font-sans">
        {meta.subtitle}
      </p>
    </section>
  );
}
