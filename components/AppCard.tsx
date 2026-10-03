import Link from 'next/link';
import { Star, GitFork, Smartphone, ExternalLink } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';

interface AppCardProps {
  app: AppFrontmatter;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-dev-border bg-dev-card p-5 hover:border-dev-accent hover:shadow-glow-teal transition-all duration-200 shadow-sm">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dev-border bg-dev-bg text-dev-accent group-hover:border-dev-accent transition-colors">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <Link
                href={`/apps/${app.slug}`}
                className="font-sans text-base font-bold text-dev-bright group-hover:text-dev-accent transition-colors"
              >
                {app.title}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-dev-accent bg-dev-accent/10 border border-dev-accent/30 px-1.5 py-0.5 rounded font-semibold">
                  {app.version}
                </span>
                <span className="font-mono text-[11px] text-dev-muted">{app.category}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-dev-green/30 bg-dev-green/10 px-2.5 py-0.5 font-mono text-[11px] text-dev-green">
            {app.status === 'Active' ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-dev-green animate-pulse" />
                <span className="font-bold">{app.status}</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-400 font-bold">{app.status}</span>
              </>
            )}
          </div>
        </div>

        {/* Tagline / Description */}
        <p className="text-xs text-dev-text line-clamp-2 mb-4 leading-relaxed font-sans">
          {app.tagline || app.description}
        </p>

        {/* Platform & Language Tag Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {app.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center rounded-md border border-dev-border bg-dev-subtle/80 px-2 py-0.5 font-mono text-[10px] text-dev-bright font-medium"
            >
              {platform}
            </span>
          ))}
          {app.languages.map((lang) => (
            <span
              key={lang}
              className="inline-flex items-center rounded-md border border-dev-accent/30 bg-dev-accent/10 px-2 py-0.5 font-mono text-[10px] text-dev-accent font-semibold"
            >
              #{lang}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Links */}
      <div className="pt-3 border-t border-dev-border/60 flex items-center justify-between text-xs font-mono text-dev-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-dev-bright font-semibold">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>{app.stars}</span>
          </span>
          <span className="flex items-center gap-1 hover:text-dev-bright">
            <GitFork className="h-3.5 w-3.5 text-dev-green" />
            <span>{app.forks}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {app.downloadLinks?.github && (
            <a
              href={app.downloadLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dev-muted hover:text-dev-bright transition-colors"
              title="GitHub Repository"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/apps/${app.slug}`}
            className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-dev-accent hover:underline"
          >
            Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
