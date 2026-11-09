import { getAllApps } from '@/lib/apps';
import { getAllProjects } from '@/lib/projects';
import { getAllBlogs } from '@/lib/blogs';
import { HomeFeed } from '@/components/HomeFeed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const apps = getAllApps().slice(0, 3);
  const projects = getAllProjects().slice(0, 3);
  const blogs = getAllBlogs().slice(0, 3);

  return <HomeFeed blogs={blogs} apps={apps} projects={projects} />;
}
