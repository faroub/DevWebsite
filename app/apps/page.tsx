import { getAllApps } from '@/lib/apps';
import { AppFeed } from '@/components/AppFeed';
import { CollectionHeader } from '@/components/CollectionHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile Applications',
  description: 'Explore native and cross-platform mobile apps for iOS, Android, macOS, and wearable devices built by mzilab.',
  alternates: { canonical: '/apps' },
};

export default function AppsPage() {
  const apps = getAllApps();

  return (
    <div className="space-y-8">
      <CollectionHeader collection="apps" />
      <AppFeed initialApps={apps} />
    </div>
  );
}
