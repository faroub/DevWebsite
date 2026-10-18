import { MetadataRoute } from 'next';
import { getAllApps } from '@/lib/apps';
import { getAllProjects } from '@/lib/projects';
import { getAllBlogs } from '@/lib/blogs';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mzilab.de';

  const apps = getAllApps().map((app) => ({
    url: `${baseUrl}/apps/${app.slug}`,
    lastModified: new Date(app.updatedAt),
  }));

  const projects = getAllProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
  }));

  const blogs = getAllBlogs().map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: new Date(b.publishedAt),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/apps`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/blogs`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    ...apps,
    ...projects,
    ...blogs,
  ];
}
