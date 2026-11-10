import { z } from 'zod';

// Zod schemas for the frontmatter of every content collection.
// Fields match content files exactly: dates are ISO strings validated by
// .date(), and status values are enums (a change here is a deliberate
// contract change for the collection).

export const appSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  version: z.string(),
  status: z.enum(['Active', 'Beta', 'Archived', 'Deprecated']),
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

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  status: z.enum(['Active', 'Beta', 'Archived', 'Deprecated']),
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
  slug: z.string(),
  excerpt: z.string(),
  publishedAt: z.string().date(),
  readTime: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;

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
