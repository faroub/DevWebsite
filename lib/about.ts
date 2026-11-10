import path from 'path';
import { loadContentFile } from './content/load';
import { aboutSchema, type AboutFrontmatter } from './content/schemas';

/** The About collection frontmatter as declared in `content/about.mdx`. */
export type { AboutFrontmatter };

export interface AboutData {
  frontmatter: AboutFrontmatter;
  content: string;
}

const ABOUT_FILE = path.join(process.cwd(), 'content/about.mdx');

export function getAboutData(): AboutData {
  const entry = loadContentFile(ABOUT_FILE, aboutSchema, { requireSlug: false });
  return { frontmatter: entry.frontmatter, content: entry.content };
}
