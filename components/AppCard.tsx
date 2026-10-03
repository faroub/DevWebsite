import Link from 'next/link';
import { Star, GitFork, Smartphone, ExternalLink } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppCardProps {
  app: AppFrontmatter;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-slate-200 dark:border-git-border bg-white dark:bg-git-card p-5 hover:border-brand-red dark:hover:border-brand-red hover:shadow-glow-red transition-all duration-200 shadow-sm">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas text-brand-red group-hover:border-brand-red transition-colors">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <Link
                href={`/apps/${app.slug}`}
                className="font-sans text-base font-bold text-slate-900 dark:text-git-bright group-hover:text-brand-red dark:group-hover:text-brand-red transition-colors"
              >
                {app.title}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-brand-red bg-red-50 dark:bg-git-subtle border border-red-200 dark:border-git-border dark:text-brand-red-light px-1.5 py-0.5 rounded font-semibold">
                  {app.version}
                </span>
                <span className="font-mono text-[11px] text-slate-500 dark:text-git-muted">{app.category}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-green-200 dark:border-brand-green/30 bg-green-50 dark:bg-green-500/10 px-2.5 py-0.5 font-mono text-[11px] text-brand-green">
            {app.status === 'Active' ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse" />
                <span className="font-bold">{app.status}</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span className="text-amber-600 dark:text-amber-500 font-bold">{app.status}</span>
              </>
            )}
          </div>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-slate-600 dark:text-git-text line-clamp-2 mb-4 leading-relaxed font-sans">
          {app.tagline || app.description}
        </p>

        {/* Platform & Language Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {app.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center rounded-md border border-slate-200 dark:border-git-border bg-slate-100 dark:bg-git-subtle px-2 py-0.5 font-mono text-[10px] text-slate-800 dark:text-git-bright font-medium"
            >
              {platform}
            </span>
          ))}
          {app.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center rounded-md border border-green-200 dark:border-brand-green/30 bg-green-50 dark:bg-git-canvas px-2 py-0.5 font-mono text-[10px] text-brand-green font-semibold"
            >
              #{lang}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Links */}
      <div className="pt-3 border-t border-slate-100 dark:border-git-border/60 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-git-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-800 dark:text-git-bright font-semibold">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>{app.stars}</span>
          </span>
          <span className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-git-bright">
            <GitFork className="h-3.5 w-3.5 text-brand-green" />
            <span>{app.forks}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {app.downloadLinks?.github && (
            <a
              href={app.downloadLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 dark:text-git-muted hover:text-brand-red dark:hover:text-git-bright transition-colors"
              title="GitHub Repository"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/apps/${app.slug}`}
            className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-brand-red hover:underline"
          >
            Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
