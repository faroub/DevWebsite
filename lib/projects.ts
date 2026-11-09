import path from 'path';
import { z } from 'zod';
import { loadContentDirectory } from './content';

const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  status: z.string(),
  featured: z.boolean().optional(),
  category: z.string(),
  techStack: z.array(z.string()),
  updatedAt: z.string().date(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export interface ProjectData {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content/projects');

export function getAllProjects(): ProjectFrontmatter[] {
  return loadContentDirectory(PROJECTS_DIRECTORY, projectSchema)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime()
    )
    .map((entry) => entry.frontmatter);
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
