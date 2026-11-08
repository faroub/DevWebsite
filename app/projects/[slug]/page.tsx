import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/Markdown';
import { ProjectDetailContent } from '@/components/ProjectDetailContent';
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
    alternates: { canonical: `/projects/${slug}` },
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
    <ProjectDetailContent frontmatter={frontmatter}>
      <Markdown>{content}</Markdown>
    </ProjectDetailContent>
  );
}
