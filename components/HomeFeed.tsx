'use client';

import Link from 'next/link';
import { BookOpen, Smartphone, FolderGit2, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { BlogFrontmatter } from '@/lib/blogs';
import { AppFrontmatter } from '@/lib/apps';
import { ProjectFrontmatter } from '@/lib/projects';
import { BlogCard } from './BlogCard';
import { AppCard } from './AppCard';
import { ProjectCard } from './ProjectCard';

/**
 * Localized home feed: latest articles, apps and projects. Data is fetched
 * by the server (app/page.tsx) and passed in as props.
 */
export function HomeFeed({
  blogs,
  apps,
  projects,
}: {
  blogs: BlogFrontmatter[];
  apps: AppFrontmatter[];
  projects: ProjectFrontmatter[];
}) {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent-primary" />
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary">
              {t.home.latestArticles}
            </h1>
          </div>
          <Link
            href="/blogs"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>{t.home.viewAllArticles}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-accent-primary" />
            <h2 className="font-heading text-xl font-bold text-text-primary">{t.home.latestApps}</h2>
          </div>
          <Link
            href="/apps"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>{t.home.viewAllApps}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-accent-success" />
            <h2 className="font-heading text-xl font-bold text-text-primary">{t.home.latestProjects}</h2>
          </div>
          <Link
            href="/projects"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>{t.home.viewAllProjects}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
