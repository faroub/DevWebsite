import { AboutContent } from '@/components/AboutContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — mzilab',
  description: 'Learn about mzilab, developer profile, software and hardware development platform.',
};

export default function AboutPage() {
  return <AboutContent />;
}
