import Link from 'next/link';
import { Star, GitFork, Smartphone } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppListRowProps {
  app: AppFrontmatter;
}

export function AppListRow({ app }: AppListRowProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md border border-slate-200 dark:border-git-border bg-white dark:bg-git-card p-3.5 hover:border-brand-red dark:hover:border-brand-red hover:bg-slate-50 dark:hover:bg-git-subtle/50 transition-all shadow-sm">
      {/* Left side: Icon, Name, Version, Category */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas text-brand-red group-hover:border-brand-red transition-colors">
          <Smartphone className="h-4 w-4" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/apps/${app.slug}`}
              className="font-sans text-sm font-bold text-slate-900 dark:text-git-bright group-hover:text-brand-red transition-colors"
            >
              {app.title}
            </Link>
            <span className="font-mono text-[10px] text-brand-red bg-red-50 dark:bg-git-subtle border border-red-200 dark:border-git-border dark:text-brand-red-light px-1.5 py-0.5 rounded font-semibold">
              {app.version}
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-git-muted border border-slate-200 dark:border-git-border px-1.5 py-0.5 rounded bg-slate-50 dark:bg-git-canvas">
              {app.category}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-git-muted line-clamp-1 mt-0.5 font-sans max-w-xl">
            {app.tagline || app.description}
          </p>
        </div>
      </div>

      {/* Right side: Language tags, Stars, Link */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono text-xs text-slate-500 dark:text-git-muted border-t sm:border-t-0 border-slate-100 dark:border-git-border/40 pt-2 sm:pt-0">
        <div className="hidden md:flex items-center gap-1.5">
          {app.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="rounded bg-green-50 dark:bg-git-canvas border border-green-200 dark:border-brand-green/30 px-1.5 py-0.5 text-[10px] text-brand-green font-semibold"
            >
              #{lang}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-800 dark:text-git-bright font-medium">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>{app.stars}</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5 text-brand-green" />
            <span>{app.forks}</span>
          </span>
        </div>

        <Link
          href={`/apps/${app.slug}`}
          className="rounded border border-brand-red bg-red-50 dark:bg-red-500/10 px-2.5 py-1 text-[11px] font-bold text-brand-red hover:bg-brand-red hover:text-white transition-all"
        >
          View &rarr;
        </Link>
      </div>
    </div>
  );
}
