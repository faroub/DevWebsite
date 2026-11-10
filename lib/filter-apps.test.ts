import { describe, it, expect } from 'vitest';
import { filterApps, getUniqueFilters } from './filter-apps';
import type { AppFrontmatter } from './apps';

const mockApps: AppFrontmatter[] = [
  {
    slug: 'app-one',
    title: 'App One',
    version: '1.0.0',
    description: 'First app',
    tagline: 'Tech mastery',
    category: 'Productivity',
    status: 'Active',
    platforms: ['Android', 'iOS'],
    languages: ['Swift', 'Kotlin'],
    updatedAt: '2024-01-01',
    downloadLinks: { github: 'https://github.com/example' },
  },
  {
    slug: 'app-two',
    title: 'App Two',
    version: '2.0.0',
    description: 'Second app',
    tagline: 'Coding excellence',
    category: 'Education',
    status: 'Beta',
    platforms: ['Android'],
    languages: ['Java'],
    updatedAt: '2024-02-01',
    downloadLinks: { github: 'https://github.com/example' },
  },
  {
    slug: 'app-three',
    title: 'App Three',
    version: '3.0.0',
    description: 'Third app',
    tagline: 'Mobile design',
    category: 'Productivity',
    status: 'Archived',
    platforms: ['iOS'],
    languages: ['Swift'],
    updatedAt: '2024-03-01',
    downloadLinks: { github: 'https://github.com/example' },
  },
];

describe('filterApps', () => {
  it('should return all apps when no filters', () => {
    const result = filterApps(mockApps, '', 'All', 'All', 'All');
    expect(result).toEqual(mockApps);
  });

  it('should filter by platform Android', () => {
    const result = filterApps(mockApps, '', 'Android', 'All', 'All');
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('app-one');
    expect(result[1].slug).toBe('app-two');
  });

  it('should filter by category Productivity', () => {
    const result = filterApps(mockApps, '', 'All', 'All', 'Productivity');
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('app-one');
    expect(result[1].slug).toBe('app-three');
  });

  it('should filter by status', () => {
    const result = filterApps(mockApps, '', 'All', 'Beta', 'All');
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('app-two');
  });

  it('should search by title', () => {
    const result = filterApps(mockApps, 'one', 'All', 'All', 'All');
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('app-one');
  });

  it('should search by language', () => {
    const result = filterApps(mockApps, 'swift', 'All', 'All', 'All');
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('app-one');
    expect(result[1].slug).toBe('app-three');
  });

  it('should filter empty results', () => {
    const result = filterApps(mockApps, 'xyz', 'All', 'All', 'All');
    expect(result).toHaveLength(0);
  });
});

describe('getUniqueFilters', () => {
  it('should collect unique platforms, statuses, categories', () => {
    const { platforms, statuses, categories } = getUniqueFilters(mockApps);
    expect(platforms).toEqual(['Android', 'iOS']);
    expect(statuses).toEqual(['Active', 'Archived', 'Beta']);
    expect(categories).toEqual(['Education', 'Productivity']);
  });
});
