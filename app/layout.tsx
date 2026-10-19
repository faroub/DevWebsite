import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://mzilab.de'),
  title: {
    default: 'mzilab — Mobile Software & Hardware Engineering Platform',
    template: '%s | mzilab',
  },
  description:
    'Dedicated developer platform showcasing native Android & iOS mobile applications, open-source projects, and technical engineering articles by Farid Oubbati.',
  keywords: [
    'mzilab',
    'Farid Oubbati',
    'Mobile Developer Algeria',
    'Android Development',
    'Jetpack Compose',
    'Kotlin',
    'iOS Swift',
    'Next.js Showcase',
    'Oued Mzi Laghouat',
  ],
  authors: [{ name: 'Farid Oubbati', url: 'https://mzilab.de' }],
  creator: 'Farid Oubbati / mzilab',
  publisher: 'mzilab',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'mzilab — Mobile Software & Hardware Engineering Platform',
    description:
      'Dedicated developer platform showcasing native Android & iOS mobile applications, open-source projects, and technical engineering articles.',
    url: 'https://mzilab.de',
    siteName: 'mzilab',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mzilab — Mobile Software & Hardware Engineering Platform',
    description:
      'Dedicated developer platform showcasing native Android & iOS mobile applications, open-source projects, and technical engineering articles.',
    creator: '@mzilab',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'mzilab',
    url: 'https://mzilab.de',
    description:
      'Dedicated developer platform showcasing native Android & iOS mobile applications, open-source projects, and technical engineering articles.',
    publisher: {
      '@type': 'Organization',
      name: 'mzilab',
      url: 'https://mzilab.de',
    },
    author: {
      '@type': 'Person',
      name: 'Farid Oubbati',
      url: 'https://mzilab.de/about',
      jobTitle: 'Senior Mobile & Hardware Engineer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Laghouat',
        addressCountry: 'Algeria',
      },
    },
  };

  return (
    <html lang="en" dir="ltr" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-text-primary flex flex-col bg-grid-dots selection:bg-accent-primary/20 selection:text-accent-primary" suppressHydrationWarning>
        <Script
          id="site-schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent-primary focus:px-4 focus:py-2 focus:text-white focus:font-mono focus:text-xs shadow-md"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          <Header />
          <main id="main-content" className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
