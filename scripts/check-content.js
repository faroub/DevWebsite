#!/usr/bin/env node
// Content sanity checks. Run via `npm run lint` (or directly with
// `node scripts/check-content.js`) before building the site.
//
// Fails when:
//   1. a frontmatter screenshot references a file missing from public/screenshots/
//   2. a frontmatter URL is a bare domain (e.g. "https://apps.apple.com") with
//      no path — a leftover placeholder rather than a real store/project link
//
// Exits non-zero with a failure list so CI and local runs both stop here.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_TYPES = ['apps', 'projects', 'blogs'];
const SCREENSHOTS_DIR = path.join(ROOT, 'public', 'screenshots');
// The site's own origin is a valid demo target: the showcase project's live
// demo is the deployed site itself. Everything else needs a real path.
const SITE_ORIGIN = 'https://mzilab.de';

// URL fields (scalar or array) that must point somewhere specific.
const URL_FIELDS = ['appStore', 'playStore', 'github', 'githubUrl', 'demoUrl', 'web'];

// Required non-slug fields per collection, mirroring the Zod schemas in lib/*.
const REQUIRED_FIELDS = {
  apps: ['title', 'tagline', 'description', 'version', 'status', 'platforms', 'category', 'languages', 'updatedAt'],
  projects: ['title', 'tagline', 'description', 'status', 'category', 'techStack', 'updatedAt'],
  blogs: ['title', 'excerpt', 'publishedAt', 'readTime', 'author', 'tags'],
  about: ['title', 'author', 'role', 'location', 'tagline', 'skillsMobile', 'skillsSystems', 'philosophy'],
};

// Date fields that must be valid YYYY-MM-DD.
const DATE_FIELDS = { apps: ['updatedAt'], projects: ['updatedAt'], blogs: ['publishedAt'] };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const failures = [];
const ok = (name) => console.log(`  ✓ ${name}`);
const fail = (name, detail) => {
  const line = detail ? `${name} — ${detail}` : name;
  failures.push(line);
  console.log(`  ✗ ${line}`);
};

function isBareDomain(value) {
  if (value === SITE_ORIGIN) return false; // The site itself is a real demo target.
  try {
    const url = new URL(value);
    return !url.pathname.replace(/\/+$/, '') && !url.search && !url.hash;
  } catch {
    return false; // Not a URL at all — other checks handle bad values.
  }
}

function collectUrls(frontmatter) {
  const urls = [];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (!URL_FIELDS.includes(key)) continue;
    if (typeof value === 'string') {
      urls.push({ key, value });
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === 'string') urls.push({ key, value: item });
      });
    }
  }
  return urls;
}

function collectScreenshots(frontmatter) {
  const shots = frontmatter.screenshots;
  if (Array.isArray(shots)) return shots.filter((s) => typeof s === 'string');
  if (typeof shots === 'string') return [shots];
  return [];
}

function isValidDate(value) {
  return typeof value === 'string' && DATE_RE.test(value) && !Number.isNaN(Date.parse(value));
}

function checkRequiredFields(type, rel, data) {
  const required = REQUIRED_FIELDS[type] || [];
  const missing = required.filter((key) => {
    const value = data[key];
    return value === undefined || value === null || value === '';
  });
  if (missing.length === 0) {
    ok(`${rel}: required fields present`);
  } else {
    fail(`${rel}: missing required field(s)`, missing.join(', '));
  }
  const dateFields = DATE_FIELDS[type] || [];
  const badDates = dateFields.filter((key) => data[key] !== undefined && !isValidDate(data[key]));
  if (badDates.length === 0) {
    ok(`${rel}: dates valid`);
  } else {
    for (const key of badDates) fail(`${rel}: invalid date for "${key}"`, String(data[key]));
  }
}

function checkFrontmatterFile(file, type) {
  const rel = path.relative(ROOT, file);
  let parsed;
  try {
    parsed = matter(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    fail(`unparseable frontmatter in ${rel}`, err.message);
    return;
  }
  const data = parsed.data || {};

  // The slug must be present and equal the filename (lib/content.ts rule).
  const fileSlug = path.basename(file).replace(/\.mdx?$/, '');
  const fmSlug = data.slug;
  if (type && fmSlug !== fileSlug) {
    fail(`${rel}: slug mismatch`, `frontmatter "${String(fmSlug)}" must equal filename slug "${fileSlug}"`);
  } else {
    ok(`${rel}: slug matches filename`);
  }

  if (type) checkRequiredFields(type, rel, data);

  const urlErrors = collectUrls(data).filter((u) => isBareDomain(u.value));
  if (urlErrors.length === 0) {
    ok(`${rel}: no bare-domain URLs`);
  } else {
    for (const { key, value } of urlErrors) {
      fail(`${rel}: "${key}" is a bare domain, not a real link`, value);
    }
  }

  const shots = collectScreenshots(data);
  const missing = shots.filter((s) => {
    const resolved = s.startsWith('/')
      ? path.join(ROOT, 'public', s)
      : path.join(SCREENSHOTS_DIR, s);
    return !fs.existsSync(resolved);
  });
  if (missing.length === 0) {
    ok(`${rel}: screenshots resolve${shots.length ? ` (${shots.length})` : ' (none referenced)'}`);
  } else {
    for (const s of missing) fail(`${rel}: screenshot missing from public/screenshots/`, s);
  }
}

console.log('\nChecking content frontmatter...\n');

for (const type of CONTENT_TYPES) {
  const dir = path.join(ROOT, 'content', type);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  if (files.length === 0) continue;
  for (const file of files) checkFrontmatterFile(path.join(dir, file), type);
}

const aboutFile = path.join(ROOT, 'content', 'about.mdx');
if (fs.existsSync(aboutFile)) checkFrontmatterFile(aboutFile, 'about');

console.log('');
if (failures.length === 0) {
  console.log('CONTENT CHECK PASS\n');
  process.exit(0);
}
console.log(`CONTENT CHECK FAIL — ${failures.length} problem(s):`);
for (const f of failures) console.log(`  - ${f}`);
console.log('');
process.exit(1);
