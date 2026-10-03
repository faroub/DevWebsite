import { Terminal, Cpu, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-git-border bg-git-canvas py-8 text-xs text-git-muted font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-git-accent" />
          <span>mzilab.de &copy; 2026 — Built static with Next.js 16 & React 19</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-git-text">
            <Cpu className="h-3.5 w-3.5 text-git-green" />
            <span>Zero Server / Static HTML</span>
          </span>
          <span className="text-git-border">|</span>
          <span className="flex items-center gap-1 text-git-text">
            <Code2 className="h-3.5 w-3.5 text-git-purple" />
            <span>MDX Driven</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
