import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogData = getBlogBySlug(slug);
  if (!blogData) {
    return { title: 'Article Not Found — mzilab.de' };
  }
  return {
    title: `${blogData.frontmatter.title} — mzilab.de`,
    description: blogData.frontmatter.excerpt,
  };
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blogData = getBlogBySlug(slug);

  if (!blogData) {
    notFound();
  }

  const { frontmatter, content } = blogData;

  return (
    <article className="max-w-4xl mx-auto space-y-8 font-sans">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all blogs</span>
      </Link>

      <div className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent-primary" />
            <time dateTime={frontmatter.publishedAt}>{frontmatter.publishedAt}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-text-secondary" />
            <span>{frontmatter.readTime}</span>
          </span>
          <span>By {frontmatter.author}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary leading-tight">
          {frontmatter.title}
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans border-l-2 border-accent-primary pl-4 py-1 italic">
          {frontmatter.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-accent-primary/20 bg-accent-primary/10 px-2 py-0.5 font-mono text-[10px] text-accent-primary font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="prose dark:prose-invert max-w-none text-sm text-text-secondary space-y-4 font-sans leading-relaxed">
          <div className="rounded-lg border border-divider bg-canvas p-5 font-mono text-xs text-text-primary whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </article>
  );
}
