import Link from 'next/link';
import { Star, GitFork, Smartphone } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppListRowProps {
  app: AppFrontmatter;
}

export function AppListRow({ app }: AppListRowProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md border border-dev-border bg-dev-card p-3.5 hover:border-dev-accent hover:bg-dev-subtle/50 transition-all shadow-sm">
      {/* Left side: Icon, Name, Version, Category */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-dev-border bg-dev-bg text-dev-accent group-hover:border-dev-accent transition-colors">
          <Smartphone className="h-4 w-4" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/apps/${app.slug}`}
              className="font-sans text-sm font-bold text-dev-bright group-hover:text-dev-accent transition-colors"
            >
              {app.title}
            </Link>
            <span className="font-mono text-[10px] text-dev-accent bg-dev-accent/10 border border-dev-accent/30 px-1.5 py-0.5 rounded font-semibold">
              {app.version}
            </span>
            <span className="font-mono text-[10px] text-dev-muted border border-dev-border px-1.5 py-0.5 rounded bg-dev-bg">
              {app.category}
            </span>
          </div>

          <p className="text-xs text-dev-muted line-clamp-1 mt-0.5 font-sans max-w-xl">
            {app.tagline || app.description}
          </p>
        </div>
      </div>

      {/* Right side: Language tags, Stars, Link */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono text-xs text-dev-muted border-t sm:border-t-0 border-dev-border/40 pt-2 sm:pt-0">
        <div className="hidden md:flex items-center gap-1.5">
          {app.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="rounded bg-dev-bg border border-dev-accent/30 px-1.5 py-0.5 text-[10px] text-dev-accent font-semibold"
            >
              #{lang}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-dev-bright font-medium">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>{app.stars}</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5 text-dev-green" />
            <span>{app.forks}</span>
          </span>
        </div>

        <Link
          href={`/apps/${app.slug}`}
          className="rounded border border-dev-accent bg-dev-accent/10 px-2.5 py-1 text-[11px] font-bold text-dev-accent hover:bg-dev-accent hover:text-dev-bg transition-all"
        >
          View &rarr;
        </Link>
      </div>
    </div>
  );
}
