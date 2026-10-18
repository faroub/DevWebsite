import { Terminal, Code, Compass } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — mzilab',
  description: 'Learn about mzilab, developer profile, software and hardware development platform.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Section 1: What is mzilab? */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Code className="h-5 w-5 text-accent-primary" />
          <span>What is mzilab?</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          mzilab is a dedicated software and hardware development platform engineered and operated by a solo developer. The platform serves as an interactive hub to showcase, download, and test custom digital and physical solutions while actively gathering user feedback for continuous refinement and growth.
        </p>
      </section>

      {/* Section 2: Who am I? */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-accent-primary" />
          <span>Who am I?</span>
        </h2>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          I am an engineer with a deep passion for software development, hardware engineering, and emerging technologies. My focus is on transforming complex technical and operational challenges into seamless, high-performance web applications, mobile apps, and integrated hardware projects.
        </p>
      </section>

      {/* Section 3: The Origin of "mzi" */}
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-3 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
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
