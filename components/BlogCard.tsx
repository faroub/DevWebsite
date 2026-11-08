import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogFrontmatter } from '@/lib/blogs';

interface BlogCardProps {
  blog: BlogFrontmatter;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-divider bg-surface p-5 hover:border-accent-primary hover:shadow-glow-teal transition-all duration-200 shadow-sm">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-divider bg-canvas text-accent-primary group-hover:border-accent-primary transition-colors">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <Link
                href={`/blogs/${blog.slug}`}
                className="font-sans text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-1"
              >
                {blog.title}
              </Link>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[11px] text-accent-primary bg-accent-primary/10 border border-accent-primary/30 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{blog.publishedAt}</span>
                </span>
                <span className="font-mono text-[11px] text-text-secondary flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{blog.readTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-2.5 py-0.5 font-mono text-[11px] text-accent-primary font-bold shrink-0">
            <span>Article</span>
          </div>
        </div>

        {/* Excerpt / Summary */}
        <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed font-sans">
          {blog.excerpt}
        </p>

        {/* Tags Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-accent-primary/30 bg-accent-primary/10 px-2 py-0.5 font-mono text-[10px] text-accent-primary font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Meta & Action Link */}
      <div className="pt-3 border-t border-divider/60 flex items-center justify-between text-xs font-mono text-text-secondary">
        <span className="text-text-primary font-medium truncate">By {blog.author}</span>
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-accent-primary hover:underline shrink-0"
        >
          <span>Read Article</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
