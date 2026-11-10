import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z, type ZodType } from 'zod';

export interface ContentEntry<T> {
  /** Canonical slug, always derived from the filename. */
  slug: string;
  frontmatter: T;
  content: string;
}

function describeParseError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('; ');
}

/**
 * Reads one Markdown/MDX file and validates its frontmatter against a Zod
 * schema. For collection files the slug is derived from the filename and the
 * frontmatter `slug` must match it, so listing links, generateStaticParams,
 * the sitemap and detail lookups all resolve to the same route. Pass
 * `{ requireSlug: false }` for standalone files that are not routed by slug
 * (e.g. about.mdx). Every failure throws an error that names the file.
 *
 * The file location is always relative to the current working directory.
 */
export function loadContentFile<T>(
  fullPath: string,
  schema: ZodType<T>,
  options: { requireSlug?: boolean } = {}
): ContentEntry<T> {
  const rel = path.relative(process.cwd(), fullPath);

  let raw: string;
  try {
    raw = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    throw new Error(`Cannot read ${rel}: ${err instanceof Error ? err.message : String(err)}`);
  }

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch (err) {
    throw new Error(`Cannot parse frontmatter in ${rel}: ${err instanceof Error ? err.message : String(err)}`);
  }

  const fileName = path.basename(fullPath);
  const fileSlug = fileName.replace(/\.mdx?$/, '');
  const frontmatterSlug = (parsed.data as { slug?: unknown }).slug;
  if (
    (options.requireSlug ?? true) &&
    (typeof frontmatterSlug !== 'string' || frontmatterSlug !== fileSlug)
  ) {
    throw new Error(
      `Slug mismatch in ${rel}: frontmatter slug "${String(frontmatterSlug)}" must equal the filename "${fileName}".`
    );
  }

  const result = schema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${rel}: ${describeParseError(result.error)}`);
  }

  return { slug: fileSlug, frontmatter: result.data, content: parsed.content };
}

/**
 * Loads and validates every Markdown/MDX file in a content directory.
 * Returns entries sorted by filename for stable build output.
 *
 * Pass `sort` to sort parsed entries by a date field instead of filename.
 * `updatedAt`-sorted loaded entries compare dates, and every entry with an
 * unparsable date throws.
 */
export function loadContentDirectory<T>(
  directory: string,
  schema: ZodType<T>,
  sort?: (a: ContentEntry<T>, b: ContentEntry<T>) => number
): ContentEntry<T>[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .sort()
    .map((fileName) => loadContentFile(path.join(directory, fileName), schema))
    .sort(sort ?? undefined);
}
