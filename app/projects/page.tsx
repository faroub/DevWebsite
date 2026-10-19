import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { FolderGit2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Projects',
  description: 'Explore open-source developer toolkits, CLI tools, libraries, and web infrastructure created by mzilab.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <FolderGit2 className="h-3.5 w-3.5" />
          <span>mzilab@developer-station:~$ ./list-projects --all</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
          Software & Developer Projects
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl font-sans">
          A collection of open-source libraries, CLI diagnostic tools, web applications, and developer utilities.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
