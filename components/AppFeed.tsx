'use client';

import { useState, useMemo } from 'react';
import { LayoutGrid, List, Terminal, X } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';
import { AppCard } from './AppCard';
import { AppListRow } from './AppListRow';
import { useLanguage } from './LanguageContext';

const ALL = 'All';

interface AppFeedProps {
  initialApps: AppFrontmatter[];
}

export function AppFeed({ initialApps }: AppFeedProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(ALL);
  const [selectedStatus, setSelectedStatus] = useState<string>(ALL);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('grid');

  // Unique values per filter group
  const { platforms, statuses, categories } = useMemo(() => {
    const platformSet = new Set<string>();
    const statusSet = new Set<string>();
    const categorySet = new Set<string>();
    initialApps.forEach((app) => {
      app.platforms.forEach((p) => platformSet.add(p));
      if (app.status) statusSet.add(app.status);
      if (app.category) categorySet.add(app.category);
    });
    return {
      platforms: Array.from(platformSet).sort(),
      statuses: Array.from(statusSet).sort(),
      categories: Array.from(categorySet).sort(),
    };
  }, [initialApps]);

  const activeFilters = selectedPlatform !== ALL || selectedStatus !== ALL || selectedCategory !== ALL;

  // Filter apps by search query and the three filter groups
  const filteredApps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return initialApps.filter((app) => {
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
  }, [initialApps, searchQuery, selectedPlatform, selectedStatus, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPlatform(ALL);
    setSelectedStatus(ALL);
    setSelectedCategory(ALL);
  };

  const pillClasses = (active: boolean) =>
    `shrink-0 font-mono text-xs px-2.5 py-1 rounded-full border transition-all ${
      active
        ? 'border-accent-primary bg-accent-primary text-canvas font-bold shadow-sm'
        : 'border-divider bg-canvas text-text-secondary hover:border-accent-primary hover:text-accent-primary'
    }`;

  const groupLabel = (label: string) => (
    <span className="font-mono text-xs text-accent-primary flex items-center gap-1 shrink-0 font-bold">
      <span>{label}</span>
    </span>
  );

  return (
    <section className="w-full space-y-6">
      {/* Control Bar: Terminal Search, Filters, and View Switcher */}
      <div className="rounded-lg border border-divider bg-surface p-4 space-y-4 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Terminal Search Box */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 font-mono text-xs text-accent-primary">
              <Terminal className="h-4 w-4 mr-1.5" />
              <span className="font-bold">filter:</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.apps.searchPlaceholder}
              className="w-full rounded-md border border-divider bg-canvas py-2 pl-20 pr-8 font-mono text-xs text-text-primary placeholder-text-secondary focus:border-accent-primary focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label={t.apps.clearFilter}
                className="absolute inset-y-0 right-0 flex min-h-[44px] min-w-[44px] items-center justify-center pr-2.5 text-text-secondary hover:text-accent-primary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="font-mono text-xs text-text-secondary hidden sm:inline">
              {t.apps.modeLabel}
            </span>
            <div className="flex rounded-md border border-divider bg-canvas p-0.5 font-mono text-xs">
              <button
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                title={t.apps.gridViewTitle}
                className={`flex min-h-[44px] items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-accent-primary text-canvas font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>{t.apps.modeGrid}</span>
              </button>
              <button
                onClick={() => setViewMode('rows')}
                aria-pressed={viewMode === 'rows'}
                title={t.apps.rowsViewTitle}
                className={`flex min-h-[44px] items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                  viewMode === 'rows'
                    ? 'bg-accent-primary text-canvas font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span>{t.apps.modeRows}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Groups */}
        <div className="flex flex-col gap-2 pt-1 border-t border-divider/50">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {groupLabel(t.apps.platformLabel)}
            <button
              onClick={() => setSelectedPlatform(ALL)}
              aria-pressed={selectedPlatform === ALL}
              className={pillClasses(selectedPlatform === ALL)}
            >
              {t.apps.allPlatforms}
            </button>
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                aria-pressed={selectedPlatform === platform}
                className={pillClasses(selectedPlatform === platform)}
              >
                {platform}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {groupLabel(t.apps.statusLabel)}
            <button
              onClick={() => setSelectedStatus(ALL)}
              aria-pressed={selectedStatus === ALL}
              className={pillClasses(selectedStatus === ALL)}
            >
              {t.apps.allStatuses}
            </button>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                aria-pressed={selectedStatus === status}
                className={pillClasses(selectedStatus === status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {groupLabel(t.apps.categoryLabel)}
            <button
              onClick={() => setSelectedCategory(ALL)}
              aria-pressed={selectedCategory === ALL}
              className={pillClasses(selectedCategory === ALL)}
            >
              {t.apps.allCategories}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={pillClasses(selectedCategory === category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between font-mono text-xs text-text-secondary px-1">
        <div>
          {t.apps.showingResults} <span className="text-accent-primary font-bold">{filteredApps.length}</span>{' '}
          {t.apps.ofRepositories} <span className="text-text-primary font-semibold">{initialApps.length}</span>
        </div>
        {activeFilters && (
          <button
            onClick={resetFilters}
            className="text-accent-primary hover:underline flex items-center gap-1 font-bold"
          >
            {t.apps.clearFilter} &times;
          </button>
        )}
      </div>

      {/* Apps Render Grid or Rows */}
      {filteredApps.length === 0 ? (
        <div className="rounded-lg border border-dashed border-divider bg-surface p-12 text-center font-mono">
          <Terminal className="mx-auto h-8 w-8 text-accent-primary mb-3" />
          <p className="text-sm text-text-primary font-bold">{t.apps.noMatchingApps}</p>
          <p className="text-xs text-text-secondary mt-1">{t.apps.noMatchingSub}</p>
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center rounded-md border border-accent-primary bg-accent-primary/10 px-3 py-1.5 text-xs text-accent-primary font-bold hover:bg-accent-primary hover:text-canvas transition-all"
          >
            {t.apps.resetFilters}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredApps.map((app) => (
            <AppListRow key={app.slug} app={app} />
          ))}
        </div>
      )}
    </section>
  );
}
