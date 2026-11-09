#!/usr/bin/env node
// Post-build smoke checks for the static export. Run after `npm run build`.
//
// Checks:
//   1. every expected route (static pages + one per content file) exists in out/
//   2. out/admin is absent and no studio strings leaked into the export
//   3. no localhost:3001 references anywhere in out/
//   4. no Google Fonts URLs anywhere in out/
//   5. every generated route page carries an absolute canonical URL
//   6. every internal href in the built HTML resolves to a file in out/
//
// Exits non-zero with a failure list when any check fails.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const CONTENT_DIRS = ['apps', 'projects', 'blogs'];

const failures = [];
const ok = (name) => console.log(`  ✓ ${name}`);
const fail = (name, detail) => {
  const line = detail ? `${name} — ${detail}` : name;
  failures.push(line);
  console.log(`  ✗ ${line}`);
};

function fileExists(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function routeCandidates(route) {
  const clean = route === '/' ? '' : route.replace(/\/+$/, '');
  return [path.join(OUT, `${clean}.html`), path.join(OUT, clean, 'index.html')];
}

function routeExists(route) {
  return routeCandidates(route).some(fileExists);
}

function listFiles(dir, ext, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_next') continue;
      listFiles(full, ext, acc);
    } else if (entry.name.endsWith(ext)) {
      acc.push(full);
    }
  }
  return acc;
}

function readRoutesFromContent() {
  // Mirrors lib/content.ts: the filename is the canonical slug.
  const routes = [];
  for (const type of CONTENT_DIRS) {
    const dir = path.join(ROOT, 'content', type);
    if (fs.existsSync(dir)) {
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          routes.push(`/${type}/${file.replace(/\.mdx?$/, '')}`);
        }
      }
    }
  }
  return routes;
}

console.log('\nSmoke-testing static export...\n');

if (!fs.existsSync(OUT)) {
  console.log('✗ out/ does not exist — run `npm run build` first.\n');
  process.exit(1);
}

// 1. Expected routes exist
const expectedRoutes = [
  '/',
  '/about',
  '/apps',
  '/blogs',
  '/projects',
  '/privacy',
  '/terms',
  ...readRoutesFromContent(),
];
const missingRoutes = expectedRoutes.filter((r) => !routeExists(r));
if (missingRoutes.length === 0) {
  ok(`all ${expectedRoutes.length} expected routes exist in out/`);
} else {
  fail('missing routes in out/', missingRoutes.join(', '));
}

// 2. Admin studio absent from the export
if (fs.existsSync(path.join(OUT, 'admin'))) {
  fail('out/admin exists');
} else {
  ok('out/admin is absent');
}

const htmlFiles = listFiles(OUT, '.html');
const allFiles = listFiles(OUT, '');

// 3. + 4. Forbidden strings (admin studio, bridge, Google Fonts)
const forbidden = [/localhost:3001/, /Local Content Studio/, /fonts\.googleapis\.com/, /fonts\.gstatic\.com/];
const leaked = [];
for (const file of allFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of forbidden) {
    if (pattern.test(text)) {
      leaked.push(`${path.relative(OUT, file)} matches ${pattern}`);
      break;
    }
  }
}
if (leaked.length === 0) {
  ok('no admin-bridge or Google Fonts references in out/');
} else {
  fail('forbidden strings in out/', `${leaked.length} files, e.g. ${leaked[0]}`);
}

// 5. Absolute canonical on every route page
let canonicalChecked = 0;
let canonicalBad = [];
for (const route of expectedRoutes) {
  const file = routeCandidates(route).find(fileExists);
  if (!file) continue; // already reported as missing
  canonicalChecked += 1;
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!match || !/^https:\/\//.test(match[1])) {
    canonicalBad.push(`${route} (canonical: ${match ? match[1] : 'none'})`);
  }
}
if (canonicalBad.length === 0) {
  ok(`absolute canonical on all ${canonicalChecked} route pages`);
} else {
  fail('pages without an absolute canonical', canonicalBad.join(', '));
}

// 6. Internal hrefs resolve to files in out/
const hrefPattern = /href="(\/[^"#?]*)(?:[?#][^"]*)?"/g;
const broken = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
    const href = match[1];
    const resolves =
      fileExists(path.join(OUT, href)) ||
      routeExists(href) ||
      href === '/' && routeExists('/');
    if (!resolves) broken.add(href);
  }
}
if (broken.size === 0) {
  ok(`all internal hrefs resolve (checked ${htmlFiles.length} HTML files)`);
} else {
  fail('unresolved internal hrefs', [...broken].join(', '));
}

console.log('');
if (failures.length === 0) {
  console.log(`SMOKE PASS — ${expectedRoutes.length} routes, ${htmlFiles.length} HTML files checked.\n`);
  process.exit(0);
}
console.log(`SMOKE FAIL — ${failures.length} problem(s):`);
for (const f of failures) console.log(`  - ${f}`);
console.log('');
process.exit(1);
