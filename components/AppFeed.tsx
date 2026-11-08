'use client';

import { useState, useMemo } from 'react';
import { LayoutGrid, List, Filter, Terminal, X } from 'lucide-react';
import { AppFrontmatter } from '@/lib/apps';
import { AppCard } from './AppCard';
import { AppListRow } from './AppListRow';

interface AppFeedProps {
  initialApps: AppFrontmatter[];
}

export function AppFeed({ initialApps }: AppFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'rows'>('grid');

  // Extract unique platforms & categories for filter pills
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>(['All']);
    initialApps.forEach((app) => {
      app.platforms.forEach((p) => tagsSet.add(p));
      if (app.status) tagsSet.add(app.status);
    });
    return Array.from(tagsSet);
  }, [initialApps]);

  // Filter apps by search query and tag selection
  const filteredApps = useMemo(() => {
    return initialApps.filter((app) => {
      const matchesSearch =
        searchQuery === '' ||
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
        app.platforms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag =
        selectedTag === 'All' ||
        app.platforms.includes(selectedTag) ||
        app.status === selectedTag ||
        app.category === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [initialApps, searchQuery, selectedTag]);

  return (
    <section className="w-full space-y-6">
      {/* Control Bar: Terminal Search, Tag Pills, and View Switcher */}
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
              placeholder="Search apps by name, tech stack, or platform..."
              className="w-full rounded-md border border-divider bg-canvas py-2 pl-20 pr-8 font-mono text-xs text-text-primary placeholder-text-secondary focus:border-accent-primary focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-secondary hover:text-accent-primary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="font-mono text-xs text-text-secondary hidden sm:inline">
              Mode:
            </span>
            <div className="flex rounded-md border border-divider bg-canvas p-0.5 font-mono text-xs">
              <button
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-accent-primary text-canvas font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('rows')}
                aria-pressed={viewMode === 'rows'}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                  viewMode === 'rows'
                    ? 'bg-accent-primary text-canvas font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                title="List View"
              >
                <List className="h-3.5 w-3.5" />
                <span>Rows</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tag Pills Feed */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-divider/50">
          <span className="font-mono text-xs text-accent-primary flex items-center gap-1 shrink-0 font-bold">
            <Filter className="h-3 w-3" />
            <span>Tags:</span>
          </span>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              aria-pressed={selectedTag === tag}
              className={`shrink-0 font-mono text-xs px-2.5 py-1 rounded-full border transition-all ${
                selectedTag === tag
                  ? 'border-accent-primary bg-accent-primary text-canvas font-bold shadow-sm'
                  : 'border-divider bg-canvas text-text-secondary hover:border-accent-primary hover:text-accent-primary'
              }`}
            >
              {tag === 'All' ? 'All Apps' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between font-mono text-xs text-text-secondary px-1">
        <div>
          Showing <span className="text-accent-primary font-bold">{filteredApps.length}</span> of{' '}
          <span className="text-text-primary font-semibold">{initialApps.length}</span> repositories
        </div>
        {selectedTag !== 'All' && (
          <button
            onClick={() => setSelectedTag('All')}
            className="text-accent-primary hover:underline flex items-center gap-1 font-bold"
          >
            Clear filter &times;
          </button>
        )}
      </div>

      {/* Apps Render Grid or Rows */}
      {filteredApps.length === 0 ? (
        <div className="rounded-lg border border-dashed border-divider bg-surface p-12 text-center font-mono">
          <Terminal className="mx-auto h-8 w-8 text-accent-primary mb-3" />
          <p className="text-sm text-text-primary font-bold">No apps matching query</p>
          <p className="text-xs text-text-secondary mt-1">Try adjusting your terminal filter or tag selection.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="mt-4 inline-flex items-center rounded-md border border-accent-primary bg-accent-primary/10 px-3 py-1.5 text-xs text-accent-primary font-bold hover:bg-accent-primary hover:text-canvas transition-all"
          >
            Reset Filters
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
