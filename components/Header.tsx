import Link from 'next/link';
import { Terminal, GitBranch, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-git-border bg-git-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-git-bright hover:text-git-accent transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-git-border bg-git-card text-git-accent group-hover:border-git-accent group-hover:shadow-glow-blue transition-all">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="text-git-bright font-bold">mzi</span>
            <span className="text-git-accent font-mono">lab</span>
            <span className="text-git-muted font-normal text-xs">.de</span>
          </Link>

          <span className="hidden sm:inline-block h-4 w-[1px] bg-git-border mx-1" />

          {/* Terminal / Static export badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-git-border bg-git-card/60 px-2.5 py-1 text-xs font-mono text-git-muted">
            <span className="h-2 w-2 rounded-full bg-git-green animate-pulse" />
            <span className="text-git-text">static_export</span>
            <span className="text-git-muted">:ready</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-xs font-mono text-git-bright hover:bg-git-card hover:text-git-accent transition-colors border border-transparent hover:border-git-border"
          >
            /apps
          </Link>
          <Link
            href="#feedback"
            className="rounded-md px-3 py-1.5 text-xs font-mono text-git-muted hover:bg-git-card hover:text-git-bright transition-colors border border-transparent hover:border-git-border"
          >
            /feedback
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-git-border bg-git-card px-3 py-1.5 text-xs font-mono text-git-muted hover:text-git-bright hover:border-git-accent transition-all"
          >
            <Terminal className="h-3.5 w-3.5 text-git-accent" />
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 text-git-muted" />
          </a>
        </nav>
      </div>
    </header>
  );
}
