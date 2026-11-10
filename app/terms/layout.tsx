import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Terms of Service — mzilab',
    template: '%s | mzilab',
  },
  description: 'Terms of service for mzilab: software and content showcase, personal use only, as-is without warranty, intellectual property rights.',
  alternates: { canonical: '/terms' },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
