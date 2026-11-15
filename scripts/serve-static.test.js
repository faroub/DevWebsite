import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';

import { createStaticServer, isPathContained } from './serve-static.mjs';

const tempOut = fs.mkdtempSync(path.join(os.tmpdir(), 'static-server-test-'));

// Create sample files in tempOut
fs.writeFileSync(path.join(tempOut, 'index.html'), '<html>Index</html>');
fs.writeFileSync(path.join(tempOut, 'about.html'), '<html>About</html>');
fs.mkdirSync(path.join(tempOut, 'apps'), { recursive: true });
fs.writeFileSync(path.join(tempOut, 'apps', 'index.html'), '<html>Apps Index</html>');
fs.writeFileSync(path.join(tempOut, 'apps', 'focus-flow.html'), '<html>Focus Flow</html>');

let server;
let port;

test.before((_, done) => {
  server = createStaticServer(tempOut);
  server.listen(0, '127.0.0.1', () => {
    port = server.address().port;
    done();
  });
});

test.after((_, done) => {
  server.close(() => {
    fs.rmSync(tempOut, { recursive: true, force: true });
    done();
  });
});

function request(pathName, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port,
        path: pathName,
        method: 'GET',
        headers,
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8');
          resolve({ status: res.statusCode, headers: res.headers, raw });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

// === TASK A TESTS: Static Server Security & Containment ===

test('isPathContained properly validates target paths', () => {
  assert.equal(isPathContained(tempOut, path.join(tempOut, 'index.html')), true);
  assert.equal(isPathContained(tempOut, path.join(tempOut, 'apps', 'focus-flow.html')), true);
  assert.equal(isPathContained(tempOut, path.join(tempOut, '..', 'package.json')), false);
  assert.equal(isPathContained(tempOut, '/etc/passwd'), false);
});

test('Normal static file requests return 200 and correct content', async () => {
  const res1 = await request('/');
  assert.equal(res1.status, 200);
  assert.match(res1.raw, /Index/);

  const res2 = await request('/about');
  assert.equal(res2.status, 200);
  assert.match(res2.raw, /About/);

  const res3 = await request('/apps/focus-flow');
  assert.equal(res3.status, 200);
  assert.match(res3.raw, /Focus Flow/);
});

test('Directory traversal attempts (../ and encoded) are rejected with 404 or 400', async () => {
  const res1 = await request('/../package.json');
  assert.equal(res1.status, 404);

  const res2 = await request('/%2e%2e%2fpackage.json');
  assert.equal(res2.status, 404);

  const res3 = await request('/%2e%2e/package.json');
  assert.equal(res3.status, 404);
});

test('Malformed URL encoding returns 400 Bad Request', async () => {
  const res = await request('/%ff%ff');
  assert.equal(res.status, 400);
});

// === TASK B TESTS: Content URL Validation ===

function isValidExternalUrl(val) {
  try {
    const url = new URL(val);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

test('URL validation accepts valid HTTP and HTTPS URLs', () => {
  assert.equal(isValidExternalUrl('https://github.com/faroub/DevWebsite'), true);
  assert.equal(isValidExternalUrl('http://example.com/demo'), true);
});

test('URL validation rejects unsafe protocols (javascript:, file:, data:)', () => {
  assert.equal(isValidExternalUrl('javascript:alert(1)'), false);
  assert.equal(isValidExternalUrl('file:///etc/passwd'), false);
  assert.equal(isValidExternalUrl('data:text/html,hack'), false);
});

test('URL validation rejects malformed URLs', () => {
  assert.equal(isValidExternalUrl('not-a-url'), false);
  assert.equal(isValidExternalUrl('ht/tp:invalid'), false);
});
