import path from 'path';
import { loadContentDirectory } from './content';

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: 'Active' | 'Beta' | 'Archived' | string;
  featured?: boolean;
  category: string;
  techStack: string[];
  updatedAt: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ProjectData {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content/projects');

export function getAllProjects(): ProjectFrontmatter[] {
  return loadContentDirectory<ProjectFrontmatter>(PROJECTS_DIRECTORY, {
    techStack: [],
  })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime()
    )
    .map((entry) => entry.frontmatter);
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const entry = loadContentDirectory<ProjectFrontmatter>(PROJECTS_DIRECTORY, {
    techStack: [],
  }).find((item) => item.slug === slug);

  if (!entry) {
    return null;
  }

  return { frontmatter: entry.frontmatter, content: entry.content };
}
