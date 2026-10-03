import Link from 'next/link';
import { Star, GitFork, Smartphone, ExternalLink, Calendar } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppListRowProps {
  app: AppFrontmatter;
}

export function AppListRow({ app }: AppListRowProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md border border-git-border bg-git-card p-3.5 hover:border-git-accent hover:bg-git-subtle/50 transition-all">
      {/* Left side: Icon, Name, Version, Platforms */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-git-border bg-git-canvas text-git-accent group-hover:border-git-accent transition-colors">
          <Smartphone className="h-4 w-4" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/apps/${app.slug}`}
              className="font-sans text-sm font-bold text-git-bright group-hover:text-git-accent transition-colors"
            >
              {app.title}
            </Link>
            <span className="font-mono text-[10px] text-git-accent bg-git-subtle px-1.5 py-0.2 rounded border border-git-border">
              {app.version}
            </span>
            <span className="font-mono text-[10px] text-git-muted border border-git-border px-1.5 py-0.2 rounded">
              {app.category}
            </span>
          </div>

          <p className="text-xs text-git-muted line-clamp-1 mt-0.5 font-sans max-w-xl">
            {app.tagline || app.description}
          </p>
        </div>
      </div>

      {/* Right side: Language tags, Stars, Link */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono text-xs text-git-muted border-t sm:border-t-0 border-git-border/40 pt-2 sm:pt-0">
        <div className="hidden md:flex items-center gap-1.5">
          {app.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="rounded bg-git-canvas border border-git-border px-1.5 py-0.5 text-[10px] text-git-text"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-git-amber" />
            <span>{app.stars}</span>
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5 text-git-muted" />
            <span>{app.forks}</span>
          </span>
        </div>

        <Link
          href={`/apps/${app.slug}`}
          className="rounded border border-git-border bg-git-canvas px-2.5 py-1 text-[11px] text-git-accent hover:border-git-accent transition-colors"
        >
          View &rarr;
        </Link>
      </div>
    </div>
  );
}
