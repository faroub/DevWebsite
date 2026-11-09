import path from 'path';
import { loadContentDirectory } from './content';

export interface BlogFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogData {
  frontmatter: BlogFrontmatter;
  content: string;
}

const BLOGS_DIRECTORY = path.join(process.cwd(), 'content/blogs');

export function getAllBlogs(): BlogFrontmatter[] {
  return loadContentDirectory<BlogFrontmatter>(BLOGS_DIRECTORY, {
    tags: [],
  })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    )
    .map((entry) => entry.frontmatter);
}

export function getBlogBySlug(slug: string): BlogData | null {
  const entry = loadContentDirectory<BlogFrontmatter>(BLOGS_DIRECTORY, {
    tags: [],
  }).find((item) => item.slug === slug);

  if (!entry) {
    return null;
  }

  return { frontmatter: entry.frontmatter, content: entry.content };
}
