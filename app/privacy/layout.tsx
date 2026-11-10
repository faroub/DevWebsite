import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Privacy Policy — mzilab',
    template: '%s | mzilab',
  },
  description: 'Privacy policy for mzilab: zero-server static site, no tracking cookies, local storage only, and safe third-party email service for feedback.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
