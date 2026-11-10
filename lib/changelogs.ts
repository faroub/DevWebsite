import path from 'path';
import { loadContentDirectory } from './content/load';
import { changelogSchema, type ChangelogFrontmatter, type ChangelogEntry } from './content/schemas';

export type { ChangelogFrontmatter, ChangelogEntry };

const CHANGELOGS_DIRECTORY = path.join(process.cwd(), 'content', 'changelogs');

/**
 * Loads the changelog entries for one app from `content/changelogs/<app>/*.mdx`.
 *
 * The loader is server-side: the app detail page resolves these entries and
 * hands them down as props rather than importing `fs` on the client. Returns
 * an empty array when the app has no changelog folder so the detail section
 * renders only when there is content to show.
 */
export function getAppChangelogs(appSlug: string): ChangelogEntry[] {
  return loadContentDirectory(
    path.join(CHANGELOGS_DIRECTORY, appSlug),
    changelogSchema,
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  ).map((entry) => ({
    slug: entry.slug,
    frontmatter: entry.frontmatter,
    content: entry.content,
  }));
}
