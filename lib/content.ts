import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentEntry<T> {
  /** Effective slug: the frontmatter slug when present, otherwise the filename (without extension). */
  slug: string;
  frontmatter: T;
  content: string;
}

/**
 * Reads every Markdown/MDX file in a content directory, parses its frontmatter,
 * and resolves the effective slug. The frontmatter slug wins when present and
 * the filename is the fallback, so listing links, generateStaticParams and
 * detail lookups all resolve to the same route. Missing fields are filled from
 * `defaults` (use it for array fields so `.map`/`.join` are always safe).
 *
 * @param directory Absolute path to the content directory.
 * @param defaults Values applied when the frontmatter omits a key.
 */
export function loadContentDirectory<T>(
  directory: string,
  defaults?: Partial<T>
): ContentEntry<T>[] {
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
      const slug =
        typeof frontmatterSlug === 'string' && frontmatterSlug.trim()
          ? frontmatterSlug.trim()
          : fileSlug;

      const frontmatter = { ...(defaults ?? {}), ...data, slug } as T;

      return { slug, frontmatter, content };
    });
}
