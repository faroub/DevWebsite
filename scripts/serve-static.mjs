#!/usr/bin/env node
// Minimal static file server for the exported site, used by Playwright
// (npm run test:e2e) and local preview of out/. Bound to 127.0.0.1.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT = path.resolve(__dirname, '..', 'out');
export const PORT = Number(process.env.PORT || 4321);

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
};

/**
 * Confirms that resolvedTarget is inside resolvedRoot (or equals resolvedRoot).
 */
export function isPathContained(rootDir, targetPath) {
  const resolvedRoot = path.resolve(rootDir);
  const resolvedTarget = path.resolve(targetPath);
  const rel = path.relative(resolvedRoot, resolvedTarget);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

export function createStaticServer(exportRoot = ROOT) {
  return http.createServer((req, res) => {
    try {
      let rawPathname = '';
      try {
        const parsedUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
        rawPathname = parsedUrl.pathname;
      } catch {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad request');
        return;
      }

      let urlPath = '';
      try {
        urlPath = decodeURIComponent(rawPathname);
      } catch {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad request: invalid URI encoding');
        return;
      }

      // Stripping trailing slashes for lookup
      const sanitizedUrlPath = (urlPath.endsWith('/') && urlPath.length > 1)
        ? urlPath.slice(0, -1)
        : urlPath;

      // Safe candidate resolution using path.resolve relative to exportRoot
      const candidates = [
        path.resolve(exportRoot, '.' + sanitizedUrlPath),
        sanitizedUrlPath && sanitizedUrlPath !== '/'
          ? path.resolve(exportRoot, '.' + `${sanitizedUrlPath}.html`)
          : path.resolve(exportRoot, 'index.html'),
        path.resolve(exportRoot, '.' + sanitizedUrlPath, 'index.html'),
      ];

      const filePath = candidates.find((candidate) => {
        try {
          if (!isPathContained(exportRoot, candidate)) return false;
          return fs.existsSync(candidate) && fs.statSync(candidate).isFile();
        } catch {
          return false;
        }
      });

      if (!filePath || !isPathContained(exportRoot, filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } catch {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const server = createStaticServer();
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`Serving ${ROOT} at http://127.0.0.1:${PORT}`);
  });
}
