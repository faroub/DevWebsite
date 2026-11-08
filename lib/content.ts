import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentEntry<T> {
  /** Slug taken from the filename (without extension). */
  slug: string;
  frontmatter: T;
  content: string;
}

/**
 * Reads every Markdown/MDX file in a content directory and parses its
 * frontmatter. The slug is always derived from the filename, never from
 * frontmatter, so listing pages, generateStaticParams and detail lookups all
 * resolve to the same route. Throws when a frontmatter slug disagrees with its
 * filename so the build fails loudly instead of generating broken routes.
 */
export function loadContentDirectory<T>(directory: string): ContentEntry<T>[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(directory, fileName);
      const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
      const fileSlug = fileName.replace(/\.mdx?$/, '');

      const frontmatterSlug = (data as { slug?: unknown }).slug;
      if (typeof frontmatterSlug === 'string' && frontmatterSlug !== fileSlug) {
        throw new Error(
          `Content slug mismatch in ${path.relative(process.cwd(), fullPath)}: frontmatter slug "${frontmatterSlug}" does not match filename "${fileName}".`
        );
      }

      return { slug: fileSlug, frontmatter: data as T, content };
    });
}
