import { Terminal, Cpu, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-git-border bg-white dark:bg-git-canvas py-8 text-xs text-slate-500 dark:text-git-muted font-mono transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-brand-red" />
          <span>mzilab.de &copy; 2026 — Built static with Next.js 16 & React 19</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-800 dark:text-git-text font-medium">
            <Cpu className="h-3.5 w-3.5 text-brand-green" />
            <span>Zero Server / Static HTML</span>
          </span>
          <span className="text-slate-300 dark:text-git-border">|</span>
          <span className="flex items-center gap-1 text-slate-800 dark:text-git-text font-medium">
            <Code2 className="h-3.5 w-3.5 text-brand-red" />
            <span>MDX Driven</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
