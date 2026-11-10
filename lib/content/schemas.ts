import { z } from 'zod';

/**
 * Allowed `status` values in the App and Project frontmatter.
 */
export const APP_STATUSES = ['Active', 'Beta', 'Archived', 'Deprecated'] as const;

export const appSchema = z.object({
  title: z.string(),
  title_fr: z.string().optional(),
  title_ar: z.string().optional(),
  slug: z.string(),
  tagline: z.string(),
  tagline_fr: z.string().optional(),
  tagline_ar: z.string().optional(),
  description: z.string(),
  description_fr: z.string().optional(),
  description_ar: z.string().optional(),
  version: z.string(),
  status: z.enum(APP_STATUSES),
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
  screenshots: z.array(z.string()).optional(),
});

export type AppFrontmatter = z.infer<typeof appSchema>;

export const projectSchema = z.object({
  title: z.string(),
  title_fr: z.string().optional(),
  title_ar: z.string().optional(),
  slug: z.string(),
  tagline: z.string(),
  tagline_fr: z.string().optional(),
  tagline_ar: z.string().optional(),
  description: z.string(),
  description_fr: z.string().optional(),
  description_ar: z.string().optional(),
  status: z.enum(APP_STATUSES),
  featured: z.boolean().optional(),
  category: z.string(),
  techStack: z.array(z.string()),
  updatedAt: z.string().date(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export const blogSchema = z.object({
  title: z.string(),
  title_fr: z.string().optional(),
  title_ar: z.string().optional(),
  slug: z.string(),
  excerpt: z.string(),
  excerpt_fr: z.string().optional(),
  excerpt_ar: z.string().optional(),
  publishedAt: z.string().date(),
  readTime: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export const changelogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  version: z.string().optional(),
  date: z.string().date(),
});

export type ChangelogFrontmatter = z.infer<typeof changelogSchema>;

export interface ChangelogEntry {
  slug: string;
  frontmatter: ChangelogFrontmatter;
  content: string;
}

export const aboutSchema = z.object({
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
