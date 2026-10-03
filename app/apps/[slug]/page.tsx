import { getAllApps, getAppBySlug } from '@/lib/apps';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Smartphone, ExternalLink, Download } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const appData = getAppBySlug(slug);
  if (!appData) {
    return { title: 'App Not Found — mzilab.de' };
  }
  return {
    title: `${appData.frontmatter.title} — mzilab.de`,
    description: appData.frontmatter.tagline || appData.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const apps = getAllApps();
  return apps.map((app) => ({
    slug: app.slug,
  }));
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const appData = getAppBySlug(slug);

  if (!appData) {
    notFound();
  }

  const { frontmatter, content } = appData;

  return (
    <article className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-git-muted hover:text-brand-red dark:hover:text-brand-red transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all apps</span>
      </Link>

      {/* App Header Banner */}
      <div className="rounded-xl border border-slate-200 dark:border-git-border bg-white dark:bg-git-card p-6 sm:p-8 space-y-6 transition-colors shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas text-brand-red shadow-sm">
              <Smartphone className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-git-bright">{frontmatter.title}</h1>
                <span className="font-mono text-xs text-brand-red bg-red-50 dark:bg-git-subtle px-2 py-0.5 rounded border border-red-200 dark:border-git-border font-bold">
                  {frontmatter.version}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-git-muted mt-1">{frontmatter.category}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-500 dark:text-git-muted">Status:</span>
            <span className="rounded-full border border-green-200 dark:border-brand-green/30 bg-green-50 dark:bg-green-500/10 px-3 py-1 text-brand-green font-bold">
              {frontmatter.status}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 dark:text-git-text leading-relaxed">
          {frontmatter.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-git-border/60">
          <span className="font-mono text-xs text-slate-500 dark:text-git-muted mr-1">Platforms & Tech:</span>
          {frontmatter.platforms.map((p) => (
            <span key={p} className="font-mono text-xs rounded bg-slate-100 dark:bg-git-subtle border border-slate-200 dark:border-git-border px-2 py-0.5 text-slate-800 dark:text-git-bright font-medium">
              {p}
            </span>
          ))}
          {frontmatter.languages.map((l) => (
            <span key={l} className="font-mono text-xs rounded bg-green-50 dark:bg-git-canvas border border-green-200 dark:border-brand-green/30 px-2 py-0.5 text-brand-green font-semibold">
              #{l}
            </span>
          ))}
        </div>

        {/* Download links */}
        {frontmatter.downloadLinks && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-git-border/60">
            {frontmatter.downloadLinks.appStore && (
              <a
                href={frontmatter.downloadLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-brand-red bg-brand-red px-4 py-2 font-mono text-xs font-bold text-white hover:bg-brand-red-hover transition-colors shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>App Store</span>
              </a>
            )}
            {frontmatter.downloadLinks.playStore && (
              <a
                href={frontmatter.downloadLinks.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-brand-green bg-brand-green px-4 py-2 font-mono text-xs font-bold text-white hover:bg-brand-green-hover transition-colors shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Google Play</span>
              </a>
            )}
            {frontmatter.downloadLinks.github && (
              <a
                href={frontmatter.downloadLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas px-4 py-2 font-mono text-xs text-slate-800 dark:text-git-bright hover:border-brand-red font-semibold transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-brand-red" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Content / Features Documentation */}
      <div className="rounded-xl border border-slate-200 dark:border-git-border bg-white dark:bg-git-card p-6 sm:p-8 space-y-4 transition-colors shadow-sm">
        <h2 className="font-sans text-xl font-bold text-slate-900 dark:text-git-bright border-b border-slate-100 dark:border-git-border/60 pb-3">
          Architecture & Overview
        </h2>
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-git-text space-y-4 font-sans leading-relaxed">
          <p>{frontmatter.tagline}</p>
          <div className="rounded-lg border border-slate-200 dark:border-git-border bg-slate-50 dark:bg-git-canvas p-4 font-mono text-xs text-slate-800 dark:text-git-muted whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </article>
  );
}
