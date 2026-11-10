'use client';

import Link from 'next/link';
import { FolderGit2, ExternalLink, ArrowRight } from 'lucide-react';
import { ProjectFrontmatter } from '@/lib/projects';
import { useLanguage } from './LanguageContext';

interface ProjectCardProps {
  project: ProjectFrontmatter;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, locale } = useLanguage();

  const title = (locale === 'ar' && project.title_ar) || (locale === 'fr' && project.title_fr) || project.title;
  const tagline = (locale === 'ar' && project.tagline_ar) || (locale === 'fr' && project.tagline_fr) || project.tagline || project.description;

  return (
    <div className="group relative flex flex-col justify-between rounded-lg border border-divider bg-surface p-5 hover:border-accent-primary hover:shadow-git-glow transition-all duration-200 shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-divider bg-canvas text-accent-primary group-hover:border-accent-primary transition-colors">
              <FolderGit2 className="h-5 w-5" />
            </div>
            <div>
              <Link
                href={`/projects/${project.slug}`}
                className="font-sans text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors"
              >
                {title}
              </Link>
              <p className="font-mono text-[11px] text-text-secondary mt-0.5">{project.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-accent-success/30 bg-accent-success/10 px-2.5 py-0.5 font-mono text-[11px] text-accent-success">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-success animate-pulse" />
            <span className="font-bold">{project.status}</span>
          </div>
        </div>

        <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed font-sans">
          {tagline}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md border border-divider bg-canvas px-2 py-0.5 font-mono text-[10px] text-text-primary font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-divider flex items-center justify-between text-xs font-mono text-text-secondary">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors"
              title={t.cards.githubTitle}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-accent-primary hover:underline"
          >
            <span>{t.cards.details}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
