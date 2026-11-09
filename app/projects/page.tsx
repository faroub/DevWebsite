import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { CollectionHeader } from '@/components/CollectionHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Projects',
  description: 'Explore open-source developer toolkits, CLI tools, libraries, and web infrastructure created by mzilab.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-8">
      <CollectionHeader collection="projects" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
