import { Terminal, Cpu, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-dev-border bg-dev-bg py-8 text-xs text-dev-muted font-mono transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-dev-accent" />
          <span>mzilab.de &copy; 2026 — Built static with Next.js 16 & React 19</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-dev-bright font-medium">
            <Cpu className="h-3.5 w-3.5 text-dev-green" />
            <span>Zero Server / Static HTML</span>
          </span>
          <span className="text-dev-border">|</span>
          <span className="flex items-center gap-1 text-dev-bright font-medium">
            <Code2 className="h-3.5 w-3.5 text-dev-accent" />
            <span>MDX Driven</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
