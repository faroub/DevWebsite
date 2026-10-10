import Link from 'next/link';
import { GitBranch } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-divider bg-surface/90 backdrop-blur-md transition-colors shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-text-primary hover:text-accent-primary transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-divider bg-canvas text-accent-primary group-hover:border-accent-primary group-hover:shadow-git-glow transition-all">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="text-text-primary font-bold text-base">mzi</span>
            <span className="text-accent-primary font-mono font-bold text-base">lab</span>
            <span className="text-text-secondary font-normal text-xs">.de</span>
          </Link>

          <span className="hidden sm:inline-block h-4 w-[1px] bg-divider mx-1" />

          {/* Terminal / Static export badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-divider bg-canvas/80 px-2.5 py-1 text-xs font-mono text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-accent-success animate-pulse" />
            <span className="text-text-primary font-medium">static_export</span>
            <span className="text-accent-success font-bold">:ready</span>
          </div>
        </div>

        {/* Navigation links & Theme Switcher */}
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              /home
            </Link>
            <Link
              href="/apps"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              /apps
            </Link>
            <Link
              href="/projects"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              /projects
            </Link>
            <Link
              href="/blogs"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              /blogs
            </Link>
            <Link
              href="/about"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              /about
            </Link>
          </nav>

          <span className="h-4 w-[1px] bg-divider mx-1" />

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
