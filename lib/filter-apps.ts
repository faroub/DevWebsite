import { AppFrontmatter } from './apps';

const ALL = 'All';

export interface FilterResult {
  apps: AppFrontmatter[];
  platforms: string[];
  statuses: string[];
  categories: string[];
}

export function filterApps(
  apps: AppFrontmatter[],
  searchQuery: string,
  selectedPlatform: string,
  selectedStatus: string,
  selectedCategory: string
): AppFrontmatter[] {
  const query = searchQuery.trim().toLowerCase();
  return apps.filter((app) => {
    const matchesSearch =
      query === '' ||
      app.title.toLowerCase().includes(query) ||
      app.tagline.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query) ||
      app.category.toLowerCase().includes(query) ||
      app.languages.some((l) => l.toLowerCase().includes(query)) ||
      app.platforms.some((p) => p.toLowerCase().includes(query));

    const matchesPlatform = selectedPlatform === ALL || app.platforms.includes(selectedPlatform);
    const matchesStatus = selectedStatus === ALL || app.status === selectedStatus;
    const matchesCategory = selectedCategory === ALL || app.category === selectedCategory;

    return matchesSearch && matchesPlatform && matchesStatus && matchesCategory;
  });
}

export function getUniqueFilters(apps: AppFrontmatter[]): {
  platforms: string[];
  statuses: string[];
  categories: string[];
} {
  const platformSet = new Set<string>();
  const statusSet = new Set<string>();
  const categorySet = new Set<string>();
  apps.forEach((app) => {
    app.platforms.forEach((p) => platformSet.add(p));
    if (app.status) statusSet.add(app.status);
    if (app.category) categorySet.add(app.category);
  });
  return {
    platforms: Array.from(platformSet).sort(),
    statuses: Array.from(statusSet).sort(),
    categories: Array.from(categorySet).sort(),
  };
}
