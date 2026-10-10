import { getAllApps } from '@/lib/apps';
import { AppFeed } from '@/components/AppFeed';
import { Smartphone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Mobile Apps — mzilab.de',
  description: 'Explore native and cross-platform mobile apps for iOS, Android, macOS, and wearable devices built by mzilab.',
};

export default function AppsPage() {
  const apps = getAllApps();

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <Smartphone className="h-3.5 w-3.5" />
          <span>mzilab@developer-station:~$ ./list-apps --all</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          Mobile Applications
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl font-sans">
          Browse production builds, beta releases, and mobile apps built for iOS, Android, and macOS. Filter by platform or search by tech stack.
        </p>
      </section>

      <AppFeed initialApps={apps} />
    </div>
  );
}
