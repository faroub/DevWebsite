import Link from 'next/link';
import { getAllApps } from '@/lib/apps';
import { getAllProjects } from '@/lib/projects';
import { getAllBlogs } from '@/lib/blogs';
import { AppCard } from '@/components/AppCard';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { Terminal, Smartphone, FolderGit2, BookOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const apps = getAllApps().slice(0, 3);
  const projects = getAllProjects().slice(0, 3);
  const blogs = getAllBlogs().slice(0, 3);

  return (
    <div className="space-y-12">
      {/* GitDiagram-inspired Hero Header */}
      <section className="relative overflow-hidden rounded-xl border border-divider bg-surface p-6 sm:p-8 shadow-sm transition-colors">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>mzilab@developer-station:~$ ./welcome.sh</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Mobile Engineering & <span className="text-accent-primary">Software Showcase</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
              Explore production mobile apps, open-source projects, and technical writeups on Jetpack Compose, Next.js, Rust, and AI-assisted software engineering.
            </p>
          </div>

          {/* Navigation Quick Jump Pills */}
          <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 rounded-md border border-divider bg-canvas px-3 py-1.5 text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors"
            >
              <Smartphone className="h-3.5 w-3.5 text-accent-primary" />
              <span>Mobile Apps</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-md border border-divider bg-canvas px-3 py-1.5 text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors"
            >
              <FolderGit2 className="h-3.5 w-3.5 text-accent-success" />
              <span>Projects</span>
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 rounded-md border border-divider bg-canvas px-3 py-1.5 text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-accent-primary" />
              <span>Blog Posts</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Mobile Apps Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-accent-primary" />
            <h2 className="font-sans text-xl font-bold text-text-primary">Latest Mobile Apps</h2>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-accent-success" />
            <h2 className="font-sans text-xl font-bold text-text-primary">Latest Developer Projects</h2>
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

      {/* Latest Blogs Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent-primary" />
            <h2 className="font-sans text-xl font-bold text-text-primary">Latest Blog Articles</h2>
          </div>
          <Link
            href="/blogs"
            className="font-mono text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            <span>View all blogs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
