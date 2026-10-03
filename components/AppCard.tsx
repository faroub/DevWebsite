import Link from 'next/link';
import { Star, GitFork, Smartphone, ExternalLink } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppCardProps {
  app: AppFrontmatter;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-git-border bg-git-card p-5 hover:border-git-accent hover:shadow-glow-blue transition-all duration-200">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-git-border bg-git-canvas text-git-accent group-hover:border-git-accent transition-colors">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <Link
                href={`/apps/${app.slug}`}
                className="font-sans text-base font-bold text-git-bright group-hover:text-git-accent transition-colors"
              >
                {app.title}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-git-accent bg-git-subtle px-1.5 py-0.5 rounded border border-git-border">
                  {app.version}
                </span>
                <span className="font-mono text-[11px] text-git-muted">{app.category}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-git-border bg-git-canvas px-2 py-0.5 font-mono text-[11px]">
            {app.status === 'Active' ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-git-green animate-pulse" />
                <span className="text-git-green">{app.status}</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-git-amber" />
                <span className="text-git-amber">{app.status}</span>
              </>
            )}
          </div>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-git-text line-clamp-2 mb-4 leading-relaxed font-sans">
          {app.tagline || app.description}
        </p>

        {/* Platform & Language Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {app.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center rounded-md border border-git-border bg-git-subtle/80 px-2 py-0.5 font-mono text-[10px] text-git-bright"
            >
              {platform}
            </span>
          ))}
          {app.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center rounded-md border border-git-border/60 bg-git-canvas px-2 py-0.5 font-mono text-[10px] text-git-accent"
            >
              #{lang}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Links */}
      <div className="pt-3 border-t border-git-border/60 flex items-center justify-between text-xs font-mono text-git-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 hover:text-git-bright">
            <Star className="h-3.5 w-3.5 text-git-amber" />
            <span>{app.stars}</span>
          </span>
          <span className="flex items-center gap-1 hover:text-git-bright">
            <GitFork className="h-3.5 w-3.5 text-git-muted" />
            <span>{app.forks}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {app.downloadLinks?.github && (
            <a
              href={app.downloadLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-git-muted hover:text-git-bright transition-colors"
              title="GitHub Repository"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/apps/${app.slug}`}
            className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-git-accent hover:underline"
          >
            Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
