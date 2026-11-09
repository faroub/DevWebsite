import path from 'path';
import { z } from 'zod';
import { loadContentDirectory } from './content';

const appSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  version: z.string(),
  status: z.string(),
  featured: z.boolean().optional(),
  platforms: z.array(z.string()),
  category: z.string(),
  languages: z.array(z.string()),
  updatedAt: z.string().date(),
  downloadLinks: z
    .object({
      appStore: z.string().optional(),
      playStore: z.string().optional(),
      github: z.string().optional(),
      web: z.string().optional(),
    })
    .optional(),
});

export type AppFrontmatter = z.infer<typeof appSchema>;

export interface AppData {
  frontmatter: AppFrontmatter;
  content: string;
}

const APPS_DIRECTORY = path.join(process.cwd(), 'content/apps');

export function getAllApps(): AppFrontmatter[] {
  return loadContentDirectory(APPS_DIRECTORY, appSchema)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime()
    )
    .map((entry) => entry.frontmatter);
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
