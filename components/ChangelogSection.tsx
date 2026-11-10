'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Markdown } from './Markdown';
import { type ChangelogEntry } from '@/lib/changelogs';

interface ChangelogSectionProps {
  /** Changelog entries for one app, resolved from `content/changelogs/<app>/`. */
  entries: ChangelogEntry[];
}

export function ChangelogSection({ entries }: ChangelogSectionProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string | null>(entries.length > 0 ? entries[0].slug : null);

  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="font-sans text-xl font-bold text-text-primary border-b border-divider pb-3">
        {t.appDetail.changelog}
      </h2>

      <div className="mt-4 space-y-2">
        {entries.map((entry) => (
          <div key={entry.slug} className="rounded-lg border border-divider bg-surface">
            <button
              type="button"
              onClick={() => setOpen(open === entry.slug ? null : entry.slug)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 font-sans text-left text-text-primary transition-colors hover:bg-canvas rounded-lg focus-visible:rounded-lg"
              aria-expanded={open === entry.slug}
            >
              <div className="space-y-1">
                <div className="font-bold text-sm">{entry.frontmatter.title}</div>
                <div className="text-xs font-mono text-text-secondary">
                  {entry.frontmatter.version && (
                    <span className="text-accent-primary font-semibold">
                      {entry.frontmatter.version} ·
                    </span>
                  )}
                  <time dateTime={entry.frontmatter.date}>{entry.frontmatter.date}</time>
                </div>
              </div>

              <ChevronDown
                className={`h-5 w-5 text-text-secondary shrink-0 transition-transform duration-200 ${
                  open === entry.slug ? 'rotate-180 text-text-primary' : ''
                }`}
              />
            </button>

            {open === entry.slug && (
              <div className="px-4 pb-4 pt-2 border-t border-divider">
                <Markdown>{entry.content}</Markdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
