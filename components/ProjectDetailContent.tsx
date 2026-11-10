'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, FolderGit2, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { CommentThread } from './CommentThread';
import type { ProjectFrontmatter } from '@/lib/projects';

interface ProjectDetailContentProps {
  frontmatter: ProjectFrontmatter;
  children: ReactNode;
}

export function ProjectDetailContent({ frontmatter, children }: ProjectDetailContentProps) {
  const { t } = useLanguage();

  return (
    <article className="max-w-4xl mx-auto space-y-8 font-sans">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
        <span>{t.projectDetail.backToProjects}</span>
      </Link>

      <div className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-divider bg-canvas text-accent-primary shadow-sm">
              <FolderGit2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">{frontmatter.title}</h1>
              <p className="text-sm text-text-secondary mt-1">{frontmatter.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-text-secondary">{t.projectDetail.status}</span>
            <span className="rounded-full border border-accent-success/30 bg-accent-success/10 px-3 py-1 text-accent-success font-bold">
              {frontmatter.status}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {frontmatter.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-divider">
          <span className="font-mono text-xs text-text-secondary mr-1">{t.projectDetail.techStack}</span>
          {frontmatter.techStack.map((tech) => (
            <span key={tech} className="font-mono text-xs rounded bg-canvas border border-divider px-2 py-0.5 text-text-primary font-medium">
              {tech}
            </span>
          ))}
        </div>

        {frontmatter.githubUrl && (
          <div className="pt-4 border-t border-divider">
            <a
              href={frontmatter.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-accent-primary bg-accent-primary px-4 py-2 font-mono text-xs font-bold text-white hover:opacity-90 transition-colors shadow-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>{t.projectDetail.githubRepo}</span>
            </a>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-sans text-xl font-bold text-text-primary border-b border-divider pb-3">
          {t.projectDetail.overviewTitle}
        </h2>
        <div className="max-w-none space-y-4">
          <p className="text-sm text-text-secondary leading-relaxed">{frontmatter.tagline}</p>
          {children}
        </div>
      </div>

      {/* Public Discussion & Feedback Thread */}
      <CommentThread itemSlug={frontmatter.slug} itemTitle={frontmatter.title} itemType="project" />
    </article>
  );
}
