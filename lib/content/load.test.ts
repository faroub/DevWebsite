import { describe, it, expect } from 'vitest';
import { appSchema, projectSchema, externalUrlSchema } from './schemas';

describe('Content Validation Schemas', () => {
  it('validates a valid app frontmatter', () => {
    const validApp = {
      title: 'Focus Flow',
      slug: 'focus-flow',
      tagline: 'Minimalist timer',
      description: 'Focus Flow time-blocking engine',
      version: 'v2.4.0',
      status: 'Active',
      platforms: ['iOS', 'Android'],
      category: 'Productivity',
      languages: ['Kotlin', 'Swift'],
      updatedAt: '2026-02-15',
      downloadLinks: {
        github: 'https://github.com/mzilab/focus-flow',
      },
    };
    const res = appSchema.safeParse(validApp);
    expect(res.success).toBe(true);
  });

  it('rejects app frontmatter with missing required fields', () => {
    const invalidApp = {
      title: 'Incomplete App',
      slug: 'incomplete-app',
      // missing tagline, description, version, etc.
    };
    const res = appSchema.safeParse(invalidApp);
    expect(res.success).toBe(false);
  });

  it('rejects invalid date format', () => {
    const badDateApp = {
      title: 'Bad Date',
      slug: 'bad-date',
      tagline: 'Test',
      description: 'Test',
      version: '1.0.0',
      status: 'Active',
      platforms: ['iOS'],
      category: 'Tools',
      languages: ['Swift'],
      updatedAt: '2026-13-45', // Invalid date
    };
    const res = appSchema.safeParse(badDateApp);
    expect(res.success).toBe(false);
  });

  it('externalUrlSchema accepts HTTP/HTTPS and rejects unsafe/malformed protocols', () => {
    expect(externalUrlSchema.safeParse('https://mzilab.de').success).toBe(true);
    expect(externalUrlSchema.safeParse('http://example.com/page').success).toBe(true);
    expect(externalUrlSchema.safeParse('javascript:alert(1)').success).toBe(false);
    expect(externalUrlSchema.safeParse('file:///etc/passwd').success).toBe(false);
    expect(externalUrlSchema.safeParse('data:text/html,test').success).toBe(false);
    expect(externalUrlSchema.safeParse('invalid-url').success).toBe(false);
  });

  it('projectSchema handles optional demoUrl and githubUrl correctly', () => {
    const validProject = {
      title: 'Showcase',
      slug: 'mzilab-showcase',
      tagline: 'Portal',
      description: 'Static Portal',
      status: 'Active',
      category: 'Web',
      techStack: ['Next.js', 'React'],
      updatedAt: '2026-02-20',
      demoUrl: 'https://mzilab.de',
      githubUrl: 'https://github.com/faroub/DevWebsite',
    };
    expect(projectSchema.safeParse(validProject).success).toBe(true);
  });
});
