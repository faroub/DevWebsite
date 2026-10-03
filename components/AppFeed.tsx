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
      <div className="rounded-lg border border-slate-200 dark:border-git-border bg-white dark:bg-git-card p-4 space-y-4 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Terminal Search Box */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 font-mono text-xs text-brand-red">
              <Terminal className="h-4 w-4 mr-1.5" />
              <span className="font-bold">filter:</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps by name, tech stack, or platform..."
              className="w-full rounded-md border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas py-2 pl-20 pr-8 font-mono text-xs text-slate-900 dark:text-git-bright placeholder-slate-400 dark:placeholder-git-muted focus:border-brand-red focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 dark:text-git-muted hover:text-brand-red"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span className="font-mono text-xs text-slate-500 dark:text-git-muted hidden sm:inline">
              Mode:
            </span>
            <div className="flex rounded-md border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas p-0.5 font-mono text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-brand-red text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-git-muted hover:text-slate-900 dark:hover:text-git-bright'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('rows')}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 transition-all ${
                  viewMode === 'rows'
                    ? 'bg-brand-red text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-git-muted hover:text-slate-900 dark:hover:text-git-bright'
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100 dark:border-git-border/50">
          <span className="font-mono text-xs text-brand-green flex items-center gap-1 shrink-0 font-bold">
            <Filter className="h-3 w-3" />
            <span>Tags:</span>
          </span>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 font-mono text-xs px-2.5 py-1 rounded-full border transition-all ${
                selectedTag === tag
                  ? 'border-brand-red bg-brand-red text-white font-bold shadow-sm'
                  : 'border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas text-slate-600 dark:text-git-muted hover:border-brand-red hover:text-brand-red'
              }`}
            >
              {tag === 'All' ? 'All Apps' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-git-muted px-1">
        <div>
          Showing <span className="text-brand-red font-bold">{filteredApps.length}</span> of{' '}
          <span className="text-slate-900 dark:text-git-bright font-semibold">{initialApps.length}</span> repositories
        </div>
        {selectedTag !== 'All' && (
          <button
            onClick={() => setSelectedTag('All')}
            className="text-brand-red hover:underline flex items-center gap-1 font-bold"
          >
            Clear filter &times;
          </button>
        )}
      </div>

      {/* Apps Render Grid or Rows */}
      {filteredApps.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 dark:border-git-border bg-white dark:bg-git-card p-12 text-center font-mono">
          <Terminal className="mx-auto h-8 w-8 text-brand-red mb-3" />
          <p className="text-sm text-slate-900 dark:text-git-bright font-bold">No apps matching query</p>
          <p className="text-xs text-slate-500 dark:text-git-muted mt-1">Try adjusting your terminal filter or tag selection.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="mt-4 inline-flex items-center rounded-md border border-brand-red bg-brand-red/10 px-3 py-1.5 text-xs text-brand-red font-bold hover:bg-brand-red hover:text-white transition-all"
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
