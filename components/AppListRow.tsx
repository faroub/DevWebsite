import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppListRowProps {
  app: AppFrontmatter;
}

export function AppListRow({ app }: AppListRowProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md border border-divider bg-surface p-3.5 hover:border-accent-primary hover:bg-divider/50 transition-all shadow-sm">
      {/* Left side: Icon, Name, Version, Category */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-divider bg-canvas text-accent-primary group-hover:border-accent-primary transition-colors">
          <Smartphone className="h-4 w-4" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/apps/${app.slug}`}
              className="font-sans text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors"
            >
              {app.title}
            </Link>
            <span className="font-mono text-[10px] text-accent-primary bg-accent-primary/10 border border-accent-primary/30 px-1.5 py-0.5 rounded font-semibold">
              {app.version}
            </span>
            <span className="font-mono text-[10px] text-text-secondary border border-divider px-1.5 py-0.5 rounded bg-canvas">
              {app.category}
            </span>
          </div>

          <p className="text-xs text-text-secondary line-clamp-1 mt-0.5 font-sans max-w-xl">
            {app.tagline || app.description}
          </p>
        </div>
      </div>

      {/* Right side: Language tags, Link */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono text-xs text-text-secondary border-t sm:border-t-0 border-divider/40 pt-2 sm:pt-0">
        <div className="hidden md:flex items-center gap-1.5">
          {app.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="rounded bg-canvas border border-accent-primary/30 px-1.5 py-0.5 text-[10px] text-accent-primary font-semibold"
            >
              #{lang}
            </span>
          ))}
        </div>

        <Link
          href={`/apps/${app.slug}`}
          className="rounded border border-accent-primary bg-accent-primary/10 px-2.5 py-1 text-[11px] font-bold text-accent-primary hover:bg-accent-primary hover:text-canvas transition-all"
        >
          View &rarr;
        </Link>
      </div>
    </div>
  );
}
