import Link from 'next/link';
import { Terminal, GitBranch, ExternalLink } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-border dark:border-git-border bg-light-card/90 dark:bg-git-bg/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-light-bright dark:text-git-bright hover:text-brand-red transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-light-border dark:border-git-border bg-light-subtle dark:bg-git-card text-brand-red group-hover:border-brand-red group-hover:shadow-glow-red transition-all">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="text-light-bright dark:text-white font-bold text-base">mzi</span>
            <span className="text-brand-red font-mono font-bold text-base">lab</span>
            <span className="text-light-muted dark:text-git-muted font-normal text-xs">.de</span>
          </Link>

          <span className="hidden sm:inline-block h-4 w-[1px] bg-light-border dark:bg-git-border mx-1" />

          {/* Terminal / Static export badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-light-border dark:border-git-border bg-light-subtle/80 dark:bg-git-card/60 px-2.5 py-1 text-xs font-mono text-light-muted dark:text-git-muted">
            <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-light-bright dark:text-git-text font-medium">static_export</span>
            <span className="text-brand-green font-bold">:ready</span>
          </div>
        </div>

        {/* Navigation links & Theme Switcher */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-xs font-mono text-light-bright dark:text-git-bright hover:bg-light-subtle dark:hover:bg-git-card hover:text-brand-red dark:hover:text-brand-red transition-colors border border-transparent hover:border-light-border dark:hover:border-git-border"
            >
              /apps
            </Link>
            <Link
              href="#feedback"
              className="rounded-md px-3 py-1.5 text-xs font-mono text-light-muted dark:text-git-muted hover:bg-light-subtle dark:hover:bg-git-card hover:text-light-bright dark:hover:text-git-bright transition-colors border border-transparent hover:border-light-border dark:hover:border-git-border"
            >
              /feedback
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-light-border dark:border-git-border bg-light-card dark:bg-git-card px-3 py-1.5 text-xs font-mono text-light-bright dark:text-git-muted hover:text-brand-red dark:hover:text-git-bright hover:border-brand-red dark:hover:border-git-accent transition-all shadow-sm"
            >
              <Terminal className="h-3.5 w-3.5 text-brand-red" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 text-light-muted dark:text-git-muted" />
            </a>
          </nav>

          <span className="h-4 w-[1px] bg-light-border dark:bg-git-border mx-1" />

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
