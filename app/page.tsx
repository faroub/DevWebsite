import { getAllApps } from '@/lib/apps';
import { AppFeed } from '@/components/AppFeed';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Terminal } from 'lucide-react';

export default function HomePage() {
  const apps = getAllApps();

  return (
    <div className="space-y-10">
      {/* GitDiagram-inspired Hero Header */}
      <section className="relative overflow-hidden rounded-xl border border-dev-border bg-dev-card p-6 sm:p-8 shadow-sm transition-colors">
        {/* Electric Teal & Emerald Green ambient glows */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-dev-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-dev-green/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Terminal Command Header */}
          <div className="inline-flex items-center gap-2 rounded-md border border-dev-border bg-dev-bg px-3 py-1 font-mono text-xs text-dev-accent font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>mzilab@developer-station:~$ ./list-apps.sh</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-dev-bright">
              Mobile Engineering & <span className="text-dev-accent">App Showcase</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-dev-text leading-relaxed">
              Explore production and beta mobile apps developed with modern stacks (Kotlin, Swift, Jetpack Compose, React Native, Rust). Each app includes release builds, feature notes, and technical architecture graphs.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs border-t border-dev-border/60">
            <div className="rounded-lg border border-dev-border bg-dev-bg p-3">
              <span className="text-dev-muted block text-[11px]">Total Repos</span>
              <span className="text-lg font-bold text-dev-bright">{apps.length} Apps</span>
            </div>
            <div className="rounded-lg border border-dev-border bg-dev-bg p-3">
              <span className="text-dev-muted block text-[11px]">Architecture</span>
              <span className="text-lg font-bold text-dev-accent">Next.js 16 Static</span>
            </div>
            <div className="rounded-lg border border-dev-border bg-dev-bg p-3">
              <span className="text-dev-muted block text-[11px]">Content Format</span>
              <span className="text-lg font-bold text-dev-accent">MDX Driven</span>
            </div>
            <div className="rounded-lg border border-dev-border bg-dev-bg p-3">
              <span className="text-dev-muted block text-[11px]">Deployment</span>
              <span className="text-lg font-bold text-dev-green">Static Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive App Feed (Grid & Rows view toggle) */}
      <AppFeed initialApps={apps} />

      {/* Feedback Section */}
      <FeedbackForm />
    </div>
  );
}
