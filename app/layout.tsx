import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageContext';

export const metadata: Metadata = {
  title: 'mzilab.de — GitDiagram Mobile Showcase',
  description: 'Ultra-clean static showcase for mobile applications featuring GitDiagram and Shadcn design tokens, release tags, and MDX logs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-text-primary flex flex-col bg-grid-dots selection:bg-accent-primary/20 selection:text-accent-primary" suppressHydrationWarning>
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
