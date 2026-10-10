import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogFrontmatter } from '@/lib/blogs';

interface BlogCardProps {
  blog: BlogFrontmatter;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-lg border border-divider bg-surface p-5 hover:border-accent-primary hover:shadow-git-glow transition-all duration-200 shadow-sm">
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-text-secondary mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent-primary" />
            <time dateTime={blog.publishedAt}>{blog.publishedAt}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-text-secondary" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <Link
          href={`/blogs/${blog.slug}`}
          className="group-hover:text-accent-primary transition-colors"
        >
          <h3 className="font-sans text-lg font-bold text-text-primary mb-2 line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        <p className="text-xs text-text-secondary line-clamp-3 mb-4 leading-relaxed font-sans">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-accent-primary/20 bg-accent-primary/10 px-2 py-0.5 font-mono text-[10px] text-accent-primary font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-divider flex items-center justify-between text-xs font-mono">
        <span className="text-text-secondary">{blog.author}</span>
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-1 font-bold text-accent-primary group-hover:translate-x-0.5 transition-transform"
        >
          <span>Read Article</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
