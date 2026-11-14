#!/usr/bin/env node
// Content sanity checks. Run via `npm run lint` (or directly with
// `node scripts/check-content.js`) before building the site.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_TYPES = ['apps', 'projects', 'blogs'];
const SCREENSHOTS_DIR = path.join(ROOT, 'public', 'screenshots');
const SITE_ORIGIN = 'https://mzilab.de';

const URL_FIELDS = ['appStore', 'playStore', 'github', 'githubUrl', 'demoUrl', 'web'];

const REQUIRED_FIELDS = {
  apps: ['title', 'tagline', 'description', 'version', 'status', 'platforms', 'category', 'languages', 'updatedAt'],
  projects: ['title', 'tagline', 'description', 'status', 'category', 'techStack', 'updatedAt'],
  blogs: ['title', 'excerpt', 'publishedAt', 'readTime', 'author', 'tags'],
  about: ['title', 'author', 'role', 'location', 'tagline', 'skillsMobile', 'skillsSystems', 'philosophy'],
};

const SLUGGED_TYPES = ['apps', 'projects', 'blogs'];

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
  if (value === SITE_ORIGIN) return false;
  try {
    const url = new URL(value);
    return !url.pathname.replace(/\/+$/, '') && !url.search && !url.hash;
  } catch {
    return false;
  }
}

function isUnsafeUrl(value) {
  try {
    const url = new URL(value);
    return !['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function collectUrls(obj, prefix = '') {
  const urls = [];
  if (!obj || typeof obj !== 'object') return urls;
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string' && URL_FIELDS.includes(key)) {
      urls.push({ key: fullKey, value });
    } else if (typeof value === 'object' && value !== null) {
      urls.push(...collectUrls(value, fullKey));
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

  const fileSlug = path.basename(file).replace(/\.mdx?$/, '');
  const fmSlug = data.slug;
  if (SLUGGED_TYPES.includes(type) && fmSlug !== fileSlug) {
    fail(`${rel}: slug mismatch`, `frontmatter "${String(fmSlug)}" must equal filename slug "${fileSlug}"`);
  } else {
    ok(`${rel}: slug matches filename`);
  }

  if (type) checkRequiredFields(type, rel, data);

  const urls = collectUrls(data);
  const bareDomainErrors = urls.filter((u) => isBareDomain(u.value));
  const unsafeUrlErrors = urls.filter((u) => isUnsafeUrl(u.value));

  if (bareDomainErrors.length === 0 && unsafeUrlErrors.length === 0) {
    ok(`${rel}: no bare-domain or unsafe URLs`);
  } else {
    for (const { key, value } of bareDomainErrors) {
      fail(`${rel}: "${key}" is a bare domain, not a real link`, value);
    }
    for (const { key, value } of unsafeUrlErrors) {
      fail(`${rel}: "${key}" uses an unsafe protocol`, value);
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
