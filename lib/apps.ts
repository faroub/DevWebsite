import path from 'path';
import { loadContentDirectory } from './content';

export interface AppFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  version: string;
  status: 'Active' | 'Beta' | 'Archived' | string;
  featured?: boolean;
  platforms: string[];
  category: string;
  languages: string[];
  updatedAt: string;
  downloadLinks?: {
    appStore?: string;
    playStore?: string;
    github?: string;
    web?: string;
  };
}

export interface AppData {
  frontmatter: AppFrontmatter;
  content: string;
}

const APPS_DIRECTORY = path.join(process.cwd(), 'content/apps');

export function getAllApps(): AppFrontmatter[] {
  return loadContentDirectory<AppFrontmatter>(APPS_DIRECTORY, {
    platforms: [],
    languages: [],
  })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime()
    )
    .map((entry) => entry.frontmatter);
}

export function getAppBySlug(slug: string): AppData | null {
  const entry = loadContentDirectory<AppFrontmatter>(APPS_DIRECTORY, {
    platforms: [],
    languages: [],
  }).find((item) => item.slug === slug);

  if (!entry) {
    return null;
  }

  return { frontmatter: entry.frontmatter, content: entry.content };
}
