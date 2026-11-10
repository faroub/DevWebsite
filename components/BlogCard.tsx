'use client';

import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogFrontmatter } from '@/lib/blogs';
import { useLanguage } from './LanguageContext';

interface BlogCardProps {
  blog: BlogFrontmatter;
}

export function BlogCard({ blog }: BlogCardProps) {
  const { t, locale } = useLanguage();

  const title = (locale === 'ar' && blog.title_ar) || (locale === 'fr' && blog.title_fr) || blog.title;
  const excerpt = (locale === 'ar' && blog.excerpt_ar) || (locale === 'fr' && blog.excerpt_fr) || blog.excerpt;

  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-divider bg-surface p-5 hover:border-accent-primary hover:shadow-glow-teal transition-all duration-200 shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent-primary" />
            <time dateTime={blog.publishedAt}>{blog.publishedAt}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-text-secondary" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 mb-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-divider bg-canvas text-accent-primary group-hover:border-accent-primary transition-colors mt-0.5">
            <BookOpen className="h-4 w-4" />
          </div>
          <Link
            href={`/blogs/${blog.slug}`}
            className="font-sans text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors leading-snug"
          >
            {title}
          </Link>
        </div>

        <p className="text-xs text-text-secondary line-clamp-3 mb-4 leading-relaxed font-sans">
          {excerpt}
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

      <div className="pt-3 border-t border-divider/60 flex items-center justify-between font-mono text-xs text-text-secondary">
        <span className="text-[11px]">{t.cards.by} {blog.author}</span>
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-accent-primary hover:underline shrink-0"
        >
          <span>{t.cards.readArticle}</span>
          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
