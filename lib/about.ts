import path from 'path';
import { z } from 'zod';
import { loadContentFile } from './content';

const aboutSchema = z.object({
  title: z.string(),
  author: z.string(),
  role: z.string(),
  location: z.string(),
  tagline: z.string(),
  email: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  skillsMobile: z.string(),
  skillsSystems: z.string(),
  philosophy: z.string(),
});

export type AboutFrontmatter = z.infer<typeof aboutSchema>;

export interface AboutData {
  frontmatter: AboutFrontmatter;
  content: string;
}

const ABOUT_FILE = path.join(process.cwd(), 'content/about.mdx');

export function getAboutData(): AboutData {
  const entry = loadContentFile(ABOUT_FILE, aboutSchema, { requireSlug: false });
  return { frontmatter: entry.frontmatter, content: entry.content };
}
