import { getAllBlogs } from '@/lib/blogs';
import { BlogCard } from '@/components/BlogCard';
import { CollectionHeader } from '@/components/CollectionHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Technical Articles',
  description: 'Technical writeups on Android engineering, Next.js static architecture, Jetpack Compose performance, and AI coding workflows.',
  alternates: { canonical: '/blogs' },
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="space-y-8">
      <CollectionHeader collection="blogs" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
