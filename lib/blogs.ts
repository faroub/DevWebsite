import path from 'path';
import { z } from 'zod';
import { loadContentDirectory } from './content';

const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  publishedAt: z.string().date(),
  readTime: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export interface BlogData {
  frontmatter: BlogFrontmatter;
  content: string;
}

const BLOGS_DIRECTORY = path.join(process.cwd(), 'content/blogs');

export function getAllBlogs(): BlogFrontmatter[] {
  return loadContentDirectory(BLOGS_DIRECTORY, blogSchema)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    )
    .map((entry) => entry.frontmatter);
}

export function getBlogBySlug(slug: string): BlogData | null {
  const entry = loadContentDirectory(BLOGS_DIRECTORY, blogSchema).find(
    (item) => item.slug === slug
  );

  if (!entry) {
    return null;
  }

  return { frontmatter: entry.frontmatter, content: entry.content };
}
