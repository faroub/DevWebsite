import { Terminal, Code, Cpu, Smartphone, ShieldCheck, Mail, Github, Compass } from 'lucide-react';
import { getAboutData } from '@/lib/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — mzilab',
  description: 'Learn about mzilab, developer profile, software and hardware development platform.',
};

export default function AboutPage() {
  const { frontmatter } = getAboutData();

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-md border border-divider bg-canvas px-3 py-1 font-mono text-xs text-accent-primary font-bold">
          <Terminal className="h-3.5 w-3.5" />
          <span>mzilab@developer-station:~$ ./whoami</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary">
          About <span className="text-accent-primary">mzilab</span>
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          {frontmatter.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-text-secondary border-t border-divider">
          <span className="font-bold text-text-primary">{frontmatter.author}</span>
          <span className="text-divider">•</span>
          <span>{frontmatter.role}</span>
          <span className="text-divider">•</span>
          <span>{frontmatter.location}</span>
          {frontmatter.email && (
            <>
              <span className="text-divider">•</span>
              <a href={`mailto:${frontmatter.email}`} className="text-accent-primary hover:underline flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{frontmatter.email}</span>
              </a>
            </>
          )}
          {frontmatter.githubUrl && (
            <>
              <span className="text-divider">•</span>
              <a href={frontmatter.githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-primary hover:text-accent-primary flex items-center gap-1">
                <Github className="h-3 w-3" />
                <span>GitHub</span>
              </a>
            </>
          )}
        </div>
      </section>

      {/* Section 1: What is mzilab? */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Code className="h-5 w-5 text-accent-primary" />
          <span>What is mzilab?</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          mzilab is a dedicated software and hardware development platform engineered and operated by a solo developer. The platform serves as an interactive hub to showcase, download, and test custom digital and physical solutions while actively gathering user feedback for continuous refinement and growth.
        </p>
      </section>

      {/* Section 2: Who am I? */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-accent-primary" />
          <span>Who am I?</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          I am an engineer with a deep passion for software development, hardware engineering, and emerging technologies. My focus is on transforming complex technical and operational challenges into seamless, high-performance web applications, mobile apps, and integrated hardware projects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="rounded-lg border border-divider bg-canvas p-4 space-y-1">
            <Smartphone className="h-5 w-5 text-accent-primary mb-2" />
            <div className="font-bold text-text-primary">Mobile Stacks</div>
            <div className="text-text-secondary">{frontmatter.skillsMobile}</div>
          </div>
          <div className="rounded-lg border border-divider bg-canvas p-4 space-y-1">
            <Cpu className="h-5 w-5 text-accent-success mb-2" />
            <div className="font-bold text-text-primary">Tooling & Systems</div>
            <div className="text-text-secondary">{frontmatter.skillsSystems}</div>
          </div>
          <div className="rounded-lg border border-divider bg-canvas p-4 space-y-1">
            <ShieldCheck className="h-5 w-5 text-accent-primary mb-2" />
            <div className="font-bold text-text-primary">Philosophy</div>
            <div className="text-text-secondary">{frontmatter.philosophy}</div>
          </div>
        </div>
      </section>

      {/* Section 3: The Origin of "mzi" */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Compass className="h-5 w-5 text-accent-primary" />
          <span>The Origin of &ldquo;mzi&rdquo;</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          The name mzilab is deeply tied to my roots. It is inspired by Oued M’Zi, a vital river valley located near my home city of Laghouat, Algeria. Originating in the breathtaking Saharan Atlas mountains, Oued M’Zi serves as a historic life source and a geographic gateway where rugged highlands transition into the expansive desert.
        </p>
      </section>
    </div>
  );
}
