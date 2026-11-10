import path from 'path';
import { loadContentDirectory } from './content/load';
import { blogSchema, type BlogFrontmatter } from './content/schemas';

/** The Blog collection frontmatter as declared in `content/blogs/*.mdx`. */
export type { BlogFrontmatter };

export interface BlogData {
  frontmatter: BlogFrontmatter;
  content: string;
}

const BLOGS_DIRECTORY = path.join(process.cwd(), 'content/blogs');

/** Returns every blog sorted by newest `publishedAt` first. */
export function getAllBlogs(): BlogFrontmatter[] {
  return loadContentDirectory(
    BLOGS_DIRECTORY,
    blogSchema,
    (a, b) => new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
  ).map((entry) => entry.frontmatter);
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
