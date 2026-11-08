import { getAboutData } from '@/lib/about';
import { AboutContent } from '@/components/AboutContent';

export default function AboutPage() {
  const about = getAboutData();

  return <AboutContent frontmatter={about.frontmatter} content={about.content} />;
}
