'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitBranch, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';

export function Header() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-divider bg-surface/90 backdrop-blur-md transition-colors shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo - "mzilab" */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-text-primary hover:text-accent-primary transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-divider bg-canvas text-accent-primary group-hover:border-accent-primary group-hover:shadow-git-glow transition-all">
              <GitBranch className="h-4 w-4" />
            </div>
            <span className="text-text-primary font-bold text-base">
              mzi<span className="text-accent-primary">lab</span>
            </span>
          </Link>
        </div>

        {/* Desktop & Mobile Control Bar */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav: blog - apps - projects - about */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <Link
              href="/blogs"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              {t.nav.blogs}
            </Link>
            <Link
              href="/apps"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              {t.nav.apps}
            </Link>
            <Link
              href="/projects"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/about"
              className="rounded-md px-2.5 py-1.5 text-xs font-mono text-text-primary hover:bg-canvas hover:text-accent-primary transition-colors border border-transparent hover:border-divider"
            >
              {t.nav.about}
            </Link>
          </nav>

          <span className="hidden md:inline-block h-4 w-[1px] bg-divider mx-1" />

          {/* Language Switcher Dropdown */}
          <LanguageSwitcher />

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md border border-divider bg-canvas text-text-primary hover:border-accent-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Dropdown Navigation: blog - apps - projects - about */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-divider bg-surface px-4 py-3 font-mono text-xs space-y-2 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/blogs"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-text-primary hover:bg-canvas hover:text-accent-primary border border-divider"
          >
            {t.nav.blogs}
          </Link>
          <Link
            href="/apps"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-text-primary hover:bg-canvas hover:text-accent-primary border border-divider"
          >
            {t.nav.apps}
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-text-primary hover:bg-canvas hover:text-accent-primary border border-divider"
          >
            {t.nav.projects}
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-text-primary hover:bg-canvas hover:text-accent-primary border border-divider"
          >
            {t.nav.about}
          </Link>
        </div>
      )}
    </header>
  );
}
