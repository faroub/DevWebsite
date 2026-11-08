import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/Markdown';
import { BlogDetailContent } from '@/components/BlogDetailContent';
import { JsonLd } from '@/components/JsonLd';
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
    alternates: { canonical: `/blogs/${slug}` },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.publishedAt,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'mzilab.de',
      url: 'https://mzilab.de',
    },
  };

  return (
    <>
      <JsonLd id={`jsonld-blog-${slug}`} data={jsonLd} />
      <BlogDetailContent frontmatter={frontmatter}>
        <Markdown>{content}</Markdown>
      </BlogDetailContent>
    </>
  );
}
