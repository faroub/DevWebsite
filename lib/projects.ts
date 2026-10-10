import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: 'Active' | 'Beta' | 'Archived' | string;
  featured?: boolean;
  category: string;
  techStack: string[];
  stars: number;
  forks: number;
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
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);

  const projects = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(PROJECTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data as ProjectFrontmatter;
    })
    .sort((a, b) => (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));

  return projects;
}

export function getProjectBySlug(slug: string): ProjectData | null {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    return null;
  }

  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  const targetFile = fileNames.find((fileName) => {
    const slugName = fileName.replace(/\.mdx?$/, '');
    return slugName === slug;
  });

  if (!targetFile) {
    return null;
  }

  const fullPath = path.join(PROJECTS_DIRECTORY, targetFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}
