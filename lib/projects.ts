import path from 'path';
import { loadContentDirectory } from './content/load';
import { projectSchema, type ProjectFrontmatter } from './content/schemas';

/** The Project collection frontmatter as declared in `content/projects/*.mdx`. */
export type { ProjectFrontmatter };

export interface ProjectData {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content/projects');

/** Returns every project sorted by newest `updatedAt` first. */
export function getAllProjects(): ProjectFrontmatter[] {
  return loadContentDirectory(
    PROJECTS_DIRECTORY,
    projectSchema,
    (a, b) => new Date(b.frontmatter.updatedAt).getTime() - new Date(a.frontmatter.updatedAt).getTime()
  ).map((entry) => entry.frontmatter);
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const entry = loadContentDirectory(PROJECTS_DIRECTORY, projectSchema).find(
    (item) => item.slug === slug
  );

  if (!entry) {
    return null;
  }

  return { frontmatter: entry.frontmatter, content: entry.content };
}
