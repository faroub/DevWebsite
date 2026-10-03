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
        className="inline-flex items-center gap-1.5 font-mono text-xs text-dev-muted hover:text-dev-accent transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all apps</span>
      </Link>

      {/* App Header Banner */}
      <div className="rounded-xl border border-dev-border bg-dev-card p-6 sm:p-8 space-y-6 transition-colors shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dev-border bg-dev-bg text-dev-accent shadow-sm">
              <Smartphone className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-dev-bright">{frontmatter.title}</h1>
                <span className="font-mono text-xs text-dev-accent bg-dev-accent/10 px-2 py-0.5 rounded border border-dev-accent/30 font-bold">
                  {frontmatter.version}
                </span>
              </div>
              <p className="text-sm text-dev-muted mt-1">{frontmatter.category}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-dev-muted">Status:</span>
            <span className="rounded-full border border-dev-green/30 bg-dev-green/10 px-3 py-1 text-dev-green font-bold">
              {frontmatter.status}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-dev-text leading-relaxed">
          {frontmatter.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-dev-border/60">
          <span className="font-mono text-xs text-dev-muted mr-1">Platforms & Tech:</span>
          {frontmatter.platforms.map((p) => (
            <span key={p} className="font-mono text-xs rounded bg-dev-subtle border border-dev-border px-2 py-0.5 text-dev-bright font-medium">
              {p}
            </span>
          ))}
          {frontmatter.languages.map((l) => (
            <span key={l} className="font-mono text-xs rounded bg-dev-accent/10 border border-dev-accent/30 px-2 py-0.5 text-dev-accent font-semibold">
              #{l}
            </span>
          ))}
        </div>

        {/* Download links */}
        {frontmatter.downloadLinks && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-dev-border/60">
            {frontmatter.downloadLinks.appStore && (
              <a
                href={frontmatter.downloadLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-dev-accent bg-dev-accent px-4 py-2 font-mono text-xs font-bold text-dev-bg hover:bg-dev-accent-hover transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 rounded-md border border-dev-green bg-dev-green px-4 py-2 font-mono text-xs font-bold text-dev-bg hover:opacity-90 transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 rounded-md border border-dev-border bg-dev-bg px-4 py-2 font-mono text-xs text-dev-bright hover:border-dev-accent font-semibold transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5 text-dev-accent" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Content / Features Documentation */}
      <div className="rounded-xl border border-dev-border bg-dev-card p-6 sm:p-8 space-y-4 transition-colors shadow-sm">
        <h2 className="font-sans text-xl font-bold text-dev-bright border-b border-dev-border/60 pb-3">
          Architecture & Overview
        </h2>
        <div className="prose dark:prose-invert max-w-none text-sm text-dev-text space-y-4 font-sans leading-relaxed">
          <p>{frontmatter.tagline}</p>
          <div className="rounded-lg border border-dev-border bg-dev-bg p-4 font-mono text-xs text-dev-muted whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </article>
  );
}
