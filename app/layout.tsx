import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'mzilab.de — Mobile App Showcase & Developer Feed',
  description: 'Sleek static showcase for mobile applications featuring GitDiagram style repository grid feed, release tags, and MDX logs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-git-canvas text-slate-900 dark:text-git-text flex flex-col bg-grid-dots selection:bg-brand-red/10 selection:text-brand-red transition-colors duration-200">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
