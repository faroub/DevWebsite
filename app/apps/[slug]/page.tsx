import { getAllApps, getAppBySlug } from '@/lib/apps';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/Markdown';
import { AppDetailContent } from '@/components/AppDetailContent';
import { JsonLd } from '@/components/JsonLd';
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
    alternates: { canonical: `/apps/${slug}` },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: frontmatter.title,
    operatingSystem: frontmatter.platforms.join(', '),
    applicationCategory: frontmatter.category,
    softwareVersion: frontmatter.version,
    description: frontmatter.description || frontmatter.tagline,
  };

  return (
    <>
      <JsonLd id={`jsonld-app-${slug}`} data={jsonLd} />
      <AppDetailContent frontmatter={frontmatter}>
        <Markdown>{content}</Markdown>
      </AppDetailContent>
    </>
  );
}
