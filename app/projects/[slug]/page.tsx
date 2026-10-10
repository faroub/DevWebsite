import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FolderGit2, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectData = getProjectBySlug(slug);
  if (!projectData) {
    return { title: 'Project Not Found — mzilab.de' };
  }
  return {
    title: `${projectData.frontmatter.title} — mzilab.de`,
    description: projectData.frontmatter.tagline || projectData.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectData = getProjectBySlug(slug);

  if (!projectData) {
    notFound();
  }

  const { frontmatter, content } = projectData;

  return (
    <article className="max-w-4xl mx-auto space-y-8 font-sans">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-accent-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all projects</span>
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
            <span className="text-text-secondary">Status:</span>
            <span className="rounded-full border border-accent-success/30 bg-accent-success/10 px-3 py-1 text-accent-success font-bold">
              {frontmatter.status}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {frontmatter.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-divider">
          <span className="font-mono text-xs text-text-secondary mr-1">Tech Stack:</span>
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
              <span>GitHub Repository</span>
            </a>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-sans text-xl font-bold text-text-primary border-b border-divider pb-3">
          Project Overview
        </h2>
        <div className="prose dark:prose-invert max-w-none text-sm text-text-secondary space-y-4 font-sans leading-relaxed">
          <p>{frontmatter.tagline}</p>
          <div className="rounded-lg border border-divider bg-canvas p-4 font-mono text-xs text-text-secondary whitespace-pre-wrap">
            {content}
          </div>
        </div>
      </div>
    </article>
  );
}
