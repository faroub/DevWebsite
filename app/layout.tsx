import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'mzilab.de — Mobile App Showcase & Developer Feed',
  description: 'Sleek static showcase for mobile applications built with AI assistance, featuring GitDiagram style repository grid feed, release tags, and MDX logs.',
  keywords: ['mzilab', 'mobile apps', 'Android', 'iOS', 'Next.js', 'GitDiagram', 'MDX', 'Kotlin', 'Swift'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-git-canvas text-git-text flex flex-col bg-grid-dots selection:bg-git-accent/20 selection:text-git-bright">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
