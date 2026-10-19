import { getAllBlogs } from '@/lib/blogs';
import { BlogCard } from '@/components/BlogCard';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Technical Articles',
  description: 'Technical writeups on Android engineering, Next.js static architecture, Jetpack Compose performance, and AI coding workflows.',
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <BookOpen className="h-3.5 w-3.5" />
          <span>mzilab@developer-station:~$ ./list-blogs --all</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          Blog & Technical Writeups
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl font-sans">
          Deep dives into mobile performance profiling, Jetpack Compose internals, static web architecture, and AI-assisted software engineering.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
