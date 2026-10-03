import Link from 'next/link';
import { Terminal, GitBranch, ExternalLink } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-dev-border bg-dev-bg/90 backdrop-blur-md transition-colors shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-dev-bright hover:text-dev-accent transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dev-border bg-dev-card text-dev-accent group-hover:border-dev-accent group-hover:shadow-glow-teal transition-all">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="text-dev-bright font-bold text-base">mzi</span>
            <span className="text-dev-accent font-mono font-bold text-base">lab</span>
            <span className="text-dev-muted font-normal text-xs">.de</span>
          </Link>

          <span className="hidden sm:inline-block h-4 w-[1px] bg-dev-border mx-1" />

          {/* Terminal / Static export badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-dev-border bg-dev-card/80 px-2.5 py-1 text-xs font-mono text-dev-muted">
            <span className="h-2 w-2 rounded-full bg-dev-green animate-pulse" />
            <span className="text-dev-bright font-medium">static_export</span>
            <span className="text-dev-green font-bold">:ready</span>
          </div>
        </div>

        {/* Navigation links & Theme Switcher */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-xs font-mono text-dev-bright hover:bg-dev-card hover:text-dev-accent transition-colors border border-transparent hover:border-dev-border"
            >
              /apps
            </Link>
            <Link
              href="#feedback"
              className="rounded-md px-3 py-1.5 text-xs font-mono text-dev-muted hover:bg-dev-card hover:text-dev-bright transition-colors border border-transparent hover:border-dev-border"
            >
              /feedback
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-dev-border bg-dev-card px-3 py-1.5 text-xs font-mono text-dev-muted hover:text-dev-bright hover:border-dev-accent transition-all shadow-sm"
            >
              <Terminal className="h-3.5 w-3.5 text-dev-accent" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-dev-muted" />
            </a>
          </nav>

          <span className="h-4 w-[1px] bg-dev-border mx-1" />

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
