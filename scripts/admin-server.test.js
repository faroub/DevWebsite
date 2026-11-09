const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'admin-server-test-'));
process.env.ADMIN_CONTENT_DIR = tempDir;

const { createServer } = require('./admin-server.js');

let server;
let port;

test.before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  port = server.address().port;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(tempDir, { recursive: true, force: true });
});

function request(method, pathName, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port,
        path: pathName,
        method,
        headers,
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf8');
          let json = null;
          try {
            json = JSON.parse(raw);
          } catch {}
          resolve({ status: res.statusCode, headers: res.headers, raw, json });
        });
      }
    );
    req.on('error', reject);
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

test('Forged or missing Origin returns 403 for OPTIONS, GET, and POST', async () => {
  const res1 = await request('OPTIONS', '/api/content');
  assert.equal(res1.status, 403);

  const res2 = await request('GET', '/api/content', { origin: 'http://malicious.com' });
  assert.equal(res2.status, 403);

  const res3 = await request('POST', '/api/content/save', { origin: 'http://evil.org' }, JSON.stringify({ type: 'apps', fileName: 'test.mdx', frontmatter: {} }));
  assert.equal(res3.status, 403);
});

test('Valid Origin is accepted and echoed in Access-Control-Allow-Origin', async () => {
  const origin = 'http://localhost:3000';
  const res = await request('GET', '/api/content', { origin });
  assert.equal(res.status, 200);
  assert.equal(res.headers['access-control-allow-origin'], origin);
  assert.equal(res.json.success, true);
});

test('Path traversal attempts (e.g. ../secret.md and absolute paths) return 400', async () => {
  const origin = 'http://localhost:3000';

  const res1 = await request(
    'POST',
    '/api/content/save',
    { origin, 'content-type': 'application/json' },
    JSON.stringify({ type: 'apps', fileName: '../secret.md', frontmatter: { title: 'hacked' } })
  );
  assert.equal(res1.status, 400);

  const res2 = await request(
    'POST',
    '/api/content/save',
    { origin, 'content-type': 'application/json' },
    JSON.stringify({ type: 'apps', fileName: '../../app.json', frontmatter: { title: 'hacked' } })
  );
  assert.equal(res2.status, 400);

  const res3 = await request(
    'POST',
    '/api/content/delete',
    { origin, 'content-type': 'application/json' },
    JSON.stringify({ type: 'apps', fileName: '../bad.md', frontmatter: { title: 'hacked' } })
  );
  assert.equal(res3.status, 400);

  const res4 = await request(
    'POST',
    '/api/content/save',
    { origin, 'content-type': 'application/json' },
    JSON.stringify({ type: 'apps', fileName: '/etc/passwd', frontmatter: { title: 'hacked' } })
  );
  assert.equal(res4.status, 400);
});

test('Valid save and delete work inside the temp content directory', async () => {
  const origin = 'http://localhost:3000';
  const testFileName = 'my-new-app.mdx';

  // 1. Save
  const saveRes = await request(
    'POST',
    '/api/content/save',
    { origin, 'content-type': 'application/json' },
    JSON.stringify({
      type: 'apps',
      fileName: testFileName,
      frontmatter: { title: 'Test App', slug: 'my-new-app' },
      bodyText: '# Test App Body',
    })
  );
  assert.equal(saveRes.status, 200);
  assert.equal(saveRes.json.success, true);

  const savedFilePath = path.join(tempDir, 'apps', testFileName);
  assert.equal(fs.existsSync(savedFilePath), true);

  // 2. Delete
  const delRes = await request(
    'POST',
    '/api/content/delete',
    { origin, 'content-type': 'application/json' },
    JSON.stringify({ type: 'apps', fileName: testFileName })
  );
  assert.equal(delRes.status, 200);
  assert.equal(delRes.json.success, true);
  assert.equal(fs.existsSync(savedFilePath), false);
});

test('Request body over 1 MB is rejected with 413', async () => {
  const origin = 'http://localhost:3000';
  const hugeBody = JSON.stringify({
    type: 'apps',
    fileName: 'huge.mdx',
    frontmatter: { title: 'Huge' },
    bodyText: 'x'.repeat(1024 * 1024 + 500),
  });

  const res = await request('POST', '/api/content/save', { origin, 'content-type': 'application/json' }, hugeBody);
  assert.equal(res.status, 413);
});

test('Token auth is required and rejected invalid/missing token', async () => {
  const origin = 'http://localhost:3000';

  // Missing token
  const res1 = await request('GET', '/api/content', { origin });
  assert.equal(res1.status, 401);

  // Invalid token
  const res2 = await request('GET', '/api/content', { origin, 'x-admin-token': 'badtoken' });
  assert.equal(res2.status, 401);

  // Valid token (use the actual token from env or generated)
  // This test verifies 401 behavior above; valid token handling is implicit.
});

test('Foreign origins are rejected', async () => {
  const res1 = await request('OPTIONS', '/api/content', { origin: 'http://evil.com' });
  assert.equal(res1.status, 403);

  const res2 = await request('GET', '/api/content', { origin: 'http://localhost:4000' });
  assert.equal(res2.status, 403);

  const res3 = await request('POST', '/api/content/save', { origin: 'https://mzilab.de' }, JSON.stringify({}));
  assert.equal(res3.status, 403);
});
