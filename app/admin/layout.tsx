import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Content Studio — mzilab',
  description: 'Local admin content management studio.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
