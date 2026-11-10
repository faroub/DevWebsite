import { z } from 'zod';

/**
 * Allowed `status` values in the App and Project frontmatter.
 *
 * It is used by both `appSchema` and `projectSchema` (and by the build so a
 * content file with an unknown status fails loudly rather than rendering in
 * an installed theme.) Keep this list in sync with the values the UI and
 * the landing pages display, and update it when a new status is shipped.
 */
export const APP_STATUSES = ['Active', 'Beta', 'Archived', 'Deprecated'] as const;

/**
 * The frontmatter of a single entry in `content/changelogs/<app>/*.mdx`.
 * The `slug` must match the filename (the repo-wide slug rule), and the
 * `date` fields are sorted by the changelog loader.
 */

export const appSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
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
  /**
   * Root-relative screenshot paths (e.g. `/screenshots/<app>/features-1.png`)
   * that must exist under `public/screenshots/`. Used by ScreenshotGallery.
   */
  screenshots: z.array(z.string()).optional(),
});

export type AppFrontmatter = z.infer<typeof appSchema>;

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
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
  slug: z.string(),
  excerpt: z.string(),
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
  /** Canonical slug derived from the filename. */
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
