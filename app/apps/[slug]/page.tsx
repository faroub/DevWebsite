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
        className="inline-flex items-center gap-1.5 font-mono text-xs text-git-muted hover:text-git-accent transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all apps</span>
      </Link>

      {/* App Header Banner */}
      <div className="rounded-xl border border-git-border bg-git-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-git-border bg-git-canvas text-git-accent shadow-sm">
              <Smartphone className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-git-bright">{frontmatter.title}</h1>
                <span className="font-mono text-xs text-git-accent bg-git-subtle px-2 py-0.5 rounded border border-git-border">
                  {frontmatter.version}
                </span>
              </div>
              <p className="text-sm text-git-muted mt-1">{frontmatter.category}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-git-muted">Status:</span>
            <span className="rounded-full border border-git-border bg-git-canvas px-3 py-1 text-git-green font-semibold">
              {frontmatter.status}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-git-text leading-relaxed">
          {frontmatter.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-git-border/60">
          <span className="font-mono text-xs text-git-muted mr-1">Platforms & Tech:</span>
          {frontmatter.platforms.map((p) => (
            <span key={p} className="font-mono text-xs rounded bg-git-subtle border border-git-border px-2 py-0.5 text-git-bright">
              {p}
            </span>
          ))}
          {frontmatter.languages.map((l) => (
            <span key={l} className="font-mono text-xs rounded bg-git-canvas border border-git-border px-2 py-0.5 text-git-accent">
              #{l}
            </span>
          ))}
        </div>

        {/* Download links */}
        {frontmatter.downloadLinks && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-git-border/60">
            {frontmatter.downloadLinks.appStore && (
              <a
                href={frontmatter.downloadLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-git-accent bg-git-accent/10 px-4 py-2 font-mono text-xs text-git-accent hover:bg-git-accent hover:text-git-bg transition-colors"
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
                className="inline-flex items-center gap-2 rounded-md border border-git-green bg-git-green/10 px-4 py-2 font-mono text-xs text-git-green hover:bg-git-green hover:text-git-bg transition-colors"
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
                className="inline-flex items-center gap-2 rounded-md border border-git-border bg-git-canvas px-4 py-2 font-mono text-xs text-git-bright hover:border-git-accent transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Content / Features Documentation */}
      <div className="rounded-xl border border-git-border bg-git-card p-6 sm:p-8 space-y-4">
        <h2 className="font-sans text-xl font-bold text-git-bright border-b border-git-border/60 pb-3">
          Architecture & Overview
        </h2>
        <div className="prose prose-invert max-w-none text-sm text-git-text space-y-4 font-sans leading-relaxed">
          <p>{frontmatter.tagline}</p>
          <div className="rounded-lg border border-git-border bg-git-canvas p-4 font-mono text-xs text-git-muted whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </article>
  );
}
