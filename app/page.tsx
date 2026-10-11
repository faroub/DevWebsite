import Link from 'next/link';
import { getAllApps } from '@/lib/apps';
import { getAllProjects } from '@/lib/projects';
import { getAllBlogs } from '@/lib/blogs';
import { AppCard } from '@/components/AppCard';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { Smartphone, FolderGit2, BookOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const apps = getAllApps().slice(0, 3);
  const projects = getAllProjects().slice(0, 3);
  const blogs = getAllBlogs().slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Latest Blogs Section at the Top */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent-primary" />
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary">Latest Blog Articles</h1>
          </div>
          <Link
            href="/blogs"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>View all articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>

      {/* Latest Mobile Apps Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-accent-primary" />
            <h2 className="font-heading text-xl font-bold text-text-primary">Latest Mobile Apps</h2>
          </div>
          <Link
            href="/apps"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>View all apps</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-divider pb-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-accent-success" />
            <h2 className="font-heading text-xl font-bold text-text-primary">Latest Developer Projects</h2>
          </div>
          <Link
            href="/projects"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>View all projects</span>
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
