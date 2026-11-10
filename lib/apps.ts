import path from 'path';
import { loadContentDirectory } from './content/load';
import { appSchema, type AppFrontmatter } from './content/schemas';

/** The App collection frontmatter as declared in `content/apps/*.mdx`. */
export type { AppFrontmatter };

export interface AppData {
  frontmatter: AppFrontmatter;
  content: string;
}

const APPS_DIRECTORY = path.join(process.cwd(), 'content/apps');

/** Returns every app sorted by newest `updatedAt` first. */
export function getAllApps(): AppFrontmatter[] {
  return loadContentDirectory(
    APPS_DIRECTORY,
    appSchema,
    (a, b) => new Date(b.frontmatter.updatedAt).getTime() - new Date(a.frontmatter.updatedAt).getTime()
  ).map((entry) => entry.frontmatter);
}

export function getAppBySlug(slug: string): AppData | null {
  const entry = loadContentDirectory(APPS_DIRECTORY, appSchema).find(
    (item) => item.slug === slug
  );

  if (!entry) {
    return null;
  }

  return { frontmatter: entry.frontmatter, content: entry.content };
}
