import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
};

// The dev-only admin studio lives at app/admin/page.tsx. scripts/build.mjs
// moves app/admin out of the tree before `next build` and restores it
// afterwards, so the static export contains no /admin route and no studio
// code; `npm run studio` (next dev) serves it at localhost:3000/admin.

const withMDX = createMDX({
  // Add markdown plugins here if needed
});

export default withMDX(nextConfig);
