import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
  stars: number;
  forks: number;
  updatedAt: string;
  downloadLinks?: {
    appStore?: string;
    playStore?: string;
    github?: string;
    web?: string;
  };
  screenshots?: string[];
}

export interface AppData {
  frontmatter: AppFrontmatter;
  content: string;
}

const APPS_DIRECTORY = path.join(process.cwd(), 'content/apps');

export function getAllApps(): AppFrontmatter[] {
  if (!fs.existsSync(APPS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(APPS_DIRECTORY);

  const apps = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(APPS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data as AppFrontmatter;
    })
    .sort((a, b) => (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));

  return apps;
}

export function getAppBySlug(slug: string): AppData | null {
  if (!fs.existsSync(APPS_DIRECTORY)) {
    return null;
  }

  const fileNames = fs.readdirSync(APPS_DIRECTORY);
  const targetFile = fileNames.find((fileName) => {
    const slugName = fileName.replace(/\.mdx?$/, '');
    return slugName === slug;
  });

  if (!targetFile) {
    return null;
  }

  const fullPath = path.join(APPS_DIRECTORY, targetFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as AppFrontmatter,
    content,
  };
}
