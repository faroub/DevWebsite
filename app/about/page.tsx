import { Terminal, Code, Cpu, Smartphone, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — mzilab.de',
  description: 'Learn about mzilab.de, the static mobile showcase, and developer profile.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <Terminal className="h-3.5 w-3.5" />
          <span>mzilab@developer-station:~$ ./whoami</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary">
          About <span className="text-accent-primary">mzilab.de</span>
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          Welcome to <strong className="text-text-primary">mzilab.de</strong> — a dedicated mobile application laboratory and developer portfolio showcasing native Android, iOS, and web software built with modern AI-assisted engineering workflows.
        </p>
      </section>

      {/* Developer Profile Section */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Code className="h-5 w-5 text-accent-primary" />
          <span>Developer Profile</span>
        </h2>

        <div className="space-y-4 text-sm text-text-secondary leading-relaxed font-sans">
          <p>
            I am a senior mobile software engineer specializing in high-performance Android applications (Kotlin, Jetpack Compose, Coroutines), iOS development (Swift, SwiftUI), and static web architecture (Next.js, React, TypeScript).
          </p>
          <p>
            My work focuses on crafting minimalist, responsive, and privacy-conscious applications. By combining deep native mobile expertise with modern AI coding agent workflows, I ship production-grade mobile applications and open-source tooling with exceptional velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="rounded-lg border border-divider bg-canvas p-4 space-y-1">
            <Smartphone className="h-5 w-5 text-accent-primary mb-2" />
            <div className="font-bold text-text-primary">Mobile Stacks</div>
            <div className="text-text-secondary">Kotlin, Jetpack Compose, Swift, React Native</div>
          </div>
          <div className="rounded-lg border border-divider bg-canvas p-4 space-y-1">
            <Cpu className="h-5 w-5 text-accent-success mb-2" />
            <div className="font-bold text-text-primary">Tooling & Systems</div>
            <div className="text-text-secondary">Rust, Perfetto SQL, Next.js, MDX</div>
          </div>
          <div className="rounded-lg border border-divider bg-canvas p-4 space-y-1">
            <ShieldCheck className="h-5 w-5 text-accent-primary mb-2" />
            <div className="font-bold text-text-primary">Philosophy</div>
            <div className="text-text-secondary">Zero-Server, Privacy-First, Static Generation</div>
          </div>
        </div>
      </section>

      {/* About the Website Architecture */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-accent-primary" />
          <span>Website Architecture</span>
        </h2>

        <p className="text-sm text-text-secondary leading-relaxed font-sans">
          This website is built completely static using <strong className="text-text-primary">Next.js 16 App Router</strong> and <strong className="text-text-primary">React 19</strong>. There is no database, no server API, and no authentication. Content lives directly in the repository as MDX files and is compiled at build time for maximum speed and security.
        </p>

        <div className="rounded-lg border border-divider bg-canvas p-4 font-mono text-xs text-text-secondary space-y-2">
          <div><span className="text-accent-primary font-bold">Framework:</span> Next.js 16.3.8 (App Router) + React 19.2</div>
          <div><span className="text-accent-primary font-bold">Styling:</span> Tailwind CSS v3 with GitDiagram/Shadcn Design Tokens</div>
          <div><span className="text-accent-primary font-bold">Export:</span> 100% Static HTML (`output: 'export'`)</div>
        </div>
      </section>
    </div>
  );
}
