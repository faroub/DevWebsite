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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  if (stored === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-dev-bg dark:bg-dev-bg text-dev-bright dark:text-dev-bright flex flex-col bg-grid-dots selection:bg-dev-accent/20 selection:text-dev-accent transition-colors duration-200">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
