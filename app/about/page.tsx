import Image from 'next/image';
import { Terminal, Code, Compass, MapPin, ExternalLink } from 'lucide-react';
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
      <section className="rounded-xl border border-divider bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary border-b border-divider pb-3 flex items-center gap-2">
          <Compass className="h-5 w-5 text-accent-primary" />
          <span>The Origin of &ldquo;mzi&rdquo;</span>
        </h2>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans">
          The name mzilab is deeply tied to my roots. It is inspired by Oued M’Zi, a vital river valley located near my home city of Laghouat, Algeria. Originating in the breathtaking Saharan Atlas mountains, Oued M’Zi serves as a historic life source and a geographic gateway where rugged highlands transition into the expansive desert.
        </p>

        {/* Representative Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-lg border border-divider bg-canvas overflow-hidden space-y-2 p-3 shadow-sm">
            <div className="relative aspect-[16/9] w-full rounded border border-divider overflow-hidden bg-surface">
              <Image
                src="/images/oued-mzi-map.svg"
                alt="Oued M'Zi River Valley and Laghouat, Algeria"
                fill
                className="object-cover"
              />
            </div>
            <div className="font-mono text-xs">
              <div className="font-bold text-text-primary">Oued M&apos;Zi River Valley</div>
              <div className="text-text-secondary text-[11px]">Laghouat, Algeria • 33.8000° N, 2.8833° E</div>
            </div>
          </div>

          <div className="rounded-lg border border-divider bg-canvas overflow-hidden space-y-2 p-3 shadow-sm">
            <div className="relative aspect-[16/9] w-full rounded border border-divider overflow-hidden bg-surface">
              <Image
                src="/images/saharan-atlas.svg"
                alt="Saharan Atlas Mountains, Algeria"
                fill
                className="object-cover"
              />
            </div>
            <div className="font-mono text-xs">
              <div className="font-bold text-text-primary">Saharan Atlas Mountains</div>
              <div className="text-text-secondary text-[11px]">Historic Life Source &amp; Geographic Gateway</div>
            </div>
          </div>
        </div>

        {/* Google Maps Location Link */}
        <div className="pt-2 border-t border-divider">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Oued+M%27Zi+Laghouat+Algeria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-accent-primary/40 bg-accent-primary/10 px-4 py-2 font-mono text-xs font-bold text-accent-primary hover:bg-accent-primary hover:text-white transition-all shadow-sm"
          >
            <MapPin className="h-4 w-4" />
            <span>View Oued M&apos;Zi (Laghouat, Algeria) on Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
