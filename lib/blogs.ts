import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogData {
  frontmatter: BlogFrontmatter;
  content: string;
}

const BLOGS_DIRECTORY = path.join(process.cwd(), 'content/blogs');

export function getAllBlogs(): BlogFrontmatter[] {
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOGS_DIRECTORY);

  const blogs = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(BLOGS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return data as BlogFrontmatter;
    })
    .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));

  return blogs;
}

export function getBlogBySlug(slug: string): BlogData | null {
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    return null;
  }

  const fileNames = fs.readdirSync(BLOGS_DIRECTORY);
  const targetFile = fileNames.find((fileName) => {
    const slugName = fileName.replace(/\.mdx?$/, '');
    return slugName === slug;
  });

  if (!targetFile) {
    return null;
  }

  const fullPath = path.join(BLOGS_DIRECTORY, targetFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as BlogFrontmatter,
    content,
  };
}
