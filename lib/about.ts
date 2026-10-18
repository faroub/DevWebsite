import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface AboutFrontmatter {
  title: string;
  author: string;
  role: string;
  location: string;
  tagline: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  skillsMobile: string;
  skillsSystems: string;
  philosophy: string;
}

export interface AboutData {
  frontmatter: AboutFrontmatter;
  content: string;
}

const ABOUT_FILE = path.join(process.cwd(), 'content/about.mdx');

export function getAboutData(): AboutData {
  if (!fs.existsSync(ABOUT_FILE)) {
    return {
      frontmatter: {
        title: 'About mzilab',
        author: 'Farid Oubbati',
        role: 'Senior Mobile & Full-Stack Engineer',
        location: 'Algeria',
        tagline: 'Developer laboratory and portfolio showcasing native Android, iOS, and web software.',
        email: 'mzilab03dz@gmail.com',
        githubUrl: 'https://github.com/mzilab',
        skillsMobile: 'Kotlin, Jetpack Compose, Swift, React Native',
        skillsSystems: 'Rust, Perfetto SQL, Next.js, MDX',
        philosophy: 'Zero-Server, Privacy-First, Static Generation',
      },
      content: 'Senior mobile software engineer specializing in Android, iOS, and static web architecture.',
    };
  }

  const fileContents = fs.readFileSync(ABOUT_FILE, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as AboutFrontmatter,
    content,
  };
}
