// Local dev-only file bridge for the admin studio (npm run studio).
// Security: binds to 127.0.0.1 only, allows just the Next.js dev origin,
// requires a per-startup random token on all /api routes, validates every
// content path against an allowlist, and caps request bodies at 256 KB.
// Never expose this server to a network; it is not for production.

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const matter = require('gray-matter');

const HOST = '127.0.0.1';
const PORT = 3001;
const ALLOWED_ORIGINS = new Set(['http://localhost:3000', 'http://127.0.0.1:3000']);
// The Host header must also resolve to the loopback bridge so a public DNS
// name cannot be pointed at this port (DNS rebinding).
const ALLOWED_HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`]);
const ALLOWED_TYPES = ['apps', 'projects', 'blogs'];
const MAX_BODY_BYTES = 256 * 1024;
const FILE_NAME_RE = /^[a-z0-9][a-z0-9-]*\.mdx$/;

const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
// Local-only settings (git-ignored); never shipped with the site.
const SETTINGS_FILE = path.join(ROOT_DIR, '.local', 'admin-settings.json');

// Random per-startup token; printed once on boot and required on all /api routes.
const ADMIN_TOKEN = crypto.randomBytes(24).toString('hex');

function sendJson(res, statusCode, payload, origin) {
  const headers = { 'Content-Type': 'application/json' };
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(payload));
}

function readSettings() {
  const fallback = { notifyEmail: '', web3formsKey: '' };
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
      return {
        notifyEmail: typeof parsed.notifyEmail === 'string' ? parsed.notifyEmail : '',
        web3formsKey: typeof parsed.web3formsKey === 'string' ? parsed.web3formsKey : '',
      };
    }
    // First run: create the local settings file with empty defaults so the
    // studio has a stable file to read and write.
    fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(fallback, null, 2), 'utf8');
  } catch {
    // Corrupt or unwritable settings file: fall back to empty settings.
  }
  return fallback;
}

// Reject any request whose Host header is not the loopback bridge (DNS rebinding).
function requireAllowedHost(req, res) {
  const host = (req.headers.host || '').toLowerCase();
  if (!ALLOWED_HOSTS.has(host)) {
    sendJson(res, 403, { success: false, error: 'Forbidden: host not allowed' });
    return false;
  }
  return true;
}

// Reject any request whose Origin header is missing or not the local dev app.
function requireAllowedOrigin(req, res) {
  const origin = req.headers.origin;
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    sendJson(res, 403, { success: false, error: 'Forbidden: origin not allowed' });
    return null;
  }
  return origin;
}

// Require the per-startup admin token. Accepts either the X-Admin-Token
// header or an Authorization: Bearer <token> header.
function requireAdminToken(req, res, origin) {
  const headerToken = req.headers['x-admin-token'];
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : null;
  const token = headerToken || bearerToken;
  if (!token || token !== ADMIN_TOKEN) {
    sendJson(res, 401, { success: false, error: 'Unauthorized: missing or wrong admin token' }, origin);
    return false;
  }
  return true;
}

// Read the body with a hard size cap; resolves null on abort/error.
function readBody(req, res, origin) {
  return new Promise((resolve) => {
    const chunks = [];
    let size = 0;
    let aborted = false;
    req.on('data', (chunk) => {
      if (aborted) return;
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        aborted = true;
        sendJson(res, 413, { success: false, error: 'Request body exceeds 256 KB limit' }, origin);
        req.destroy();
        resolve(null);
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!aborted) resolve(Buffer.concat(chunks).toString('utf8'));
    });
    req.on('error', () => resolve(null));
  });
}

// Validate a content file target: type allowlist, strict file name regex,
// and the resolved path must stay inside the type directory.
function resolveContentFile(type, fileName) {
  if (!ALLOWED_TYPES.includes(type)) {
    return { error: 'Invalid type: must be one of apps, projects, blogs' };
  }
  if (typeof fileName !== 'string' || !FILE_NAME_RE.test(fileName)) {
    return { error: 'Invalid fileName: must match ^[a-z0-9][a-z0-9-]*\\.mdx$' };
  }
  const typeDir = path.resolve(CONTENT_DIR, type);
  const filePath = path.resolve(typeDir, fileName);
  if (!filePath.startsWith(typeDir + path.sep)) {
    return { error: 'Invalid fileName: resolves outside the content directory' };
  }
  return { filePath };
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const origin = req.headers.origin;

  // Every request must target the loopback bridge directly.
  if (!requireAllowedHost(req, res)) return;

  // CORS preflight: only the local dev origin may proceed.
  if (req.method === 'OPTIONS') {
    if (origin && ALLOWED_ORIGINS.has(origin)) {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token, Authorization',
        Vary: 'Origin',
      });
      res.end();
    } else {
      sendJson(res, 403, { success: false, error: 'Forbidden: origin not allowed' });
    }
    return;
  }

  // Browser visits to the bridge port get redirected to the studio
  // (navigations carry no Origin header, so the API gate does not apply here).
  if (url.pathname === '/' || url.pathname === '/admin') {
    res.writeHead(302, { Location: 'http://localhost:3000/admin' });
    res.end();
    return;
  }

  // Everything under /api requires an allowed origin and the admin token.
  if (!url.pathname.startsWith('/api/')) {
    sendJson(res, 404, { success: false, error: 'Endpoint not found' });
    return;
  }

  const allowedOrigin = requireAllowedOrigin(req, res);
  if (!allowedOrigin) return;
  if (!requireAdminToken(req, res, allowedOrigin)) return;

  // POST routes must carry JSON.
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      sendJson(res, 415, { success: false, error: 'Unsupported Media Type: Content-Type must be application/json' }, allowedOrigin);
      return;
    }
  }

  // Get Admin Settings (web3formsKey is always returned masked)
  if (req.method === 'GET' && url.pathname === '/api/settings') {
    try {
      const settings = readSettings();
      sendJson(res, 200, {
        success: true,
        settings: {
          notifyEmail: settings.notifyEmail,
          web3formsKey: settings.web3formsKey ? `****${settings.web3formsKey.slice(-4)}` : '',
          web3formsKeyConfigured: Boolean(settings.web3formsKey),
        },
      }, allowedOrigin);
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
    }
    return;
  }

  // Save Admin Settings
  if (req.method === 'POST' && url.pathname === '/api/settings/save') {
    readBody(req, res, allowedOrigin).then((body) => {
      if (body === null) return;
      try {
        const { notifyEmail, web3formsKey } = JSON.parse(body);
        const existing = readSettings();
        let keyToSave = typeof web3formsKey === 'string' ? web3formsKey.trim() : '';
        // An empty or masked value means "keep the existing key".
        if (keyToSave === '' || keyToSave.startsWith('****')) {
          keyToSave = existing.web3formsKey;
        }
        const settings = { notifyEmail: notifyEmail || '', web3formsKey: keyToSave };
        fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');

        sendJson(res, 200, { success: true, message: 'Settings saved successfully', settings: { notifyEmail: settings.notifyEmail, web3formsKey: settings.web3formsKey ? `****${settings.web3formsKey.slice(-4)}` : '' } }, allowedOrigin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
      }
    });
    return;
  }

  // Get About Page Content
  if (req.method === 'GET' && url.pathname === '/api/about') {
    try {
      const aboutPath = path.join(CONTENT_DIR, 'about.mdx');
      let parsed = { data: {}, content: '' };
      if (fs.existsSync(aboutPath)) {
        const fileContent = fs.readFileSync(aboutPath, 'utf8');
        parsed = matter(fileContent);
      }
      sendJson(res, 200, { success: true, frontmatter: parsed.data, body: parsed.content }, allowedOrigin);
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
    }
    return;
  }

  // Save About Page Content
  if (req.method === 'POST' && url.pathname === '/api/about/save') {
    readBody(req, res, allowedOrigin).then((body) => {
      if (body === null) return;
      try {
        const { frontmatter, bodyText } = JSON.parse(body);
        const aboutPath = path.join(CONTENT_DIR, 'about.mdx');
        if (!fs.existsSync(CONTENT_DIR)) {
          fs.mkdirSync(CONTENT_DIR, { recursive: true });
        }
        const fileContent = matter.stringify(bodyText || '', frontmatter || {});
        fs.writeFileSync(aboutPath, fileContent, 'utf8');

        sendJson(res, 200, { success: true, message: 'Saved about.mdx to disk' }, allowedOrigin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
      }
    });
    return;
  }

  // List all content items
  if (req.method === 'GET' && url.pathname === '/api/content') {
    try {
      const result = {};
      ALLOWED_TYPES.forEach((type) => {
        const dir = path.join(CONTENT_DIR, type);
        result[type] = [];
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          files.forEach((file) => {
            if (file.endsWith('.mdx') || file.endsWith('.md')) {
              const filePath = path.join(dir, file);
              const fileContent = fs.readFileSync(filePath, 'utf8');
              const parsed = matter(fileContent);
              result[type].push({
                fileName: file,
                filePath,
                frontmatter: parsed.data,
                body: parsed.content,
              });
            }
          });
        }
      });

      sendJson(res, 200, { success: true, data: result }, allowedOrigin);
    } catch (err) {
      sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
    }
    return;
  }

  // Save content file
  if (req.method === 'POST' && url.pathname === '/api/content/save') {
    readBody(req, res, allowedOrigin).then((body) => {
      if (body === null) return;
      try {
        const { type, fileName, frontmatter, bodyText } = JSON.parse(body);
        if (!type || !fileName || !frontmatter) {
          sendJson(res, 400, { success: false, error: 'Missing type, fileName, or frontmatter' }, allowedOrigin);
          return;
        }
        const target = resolveContentFile(type, fileName);
        if (target.error) {
          sendJson(res, 400, { success: false, error: target.error }, allowedOrigin);
          return;
        }

        if (!fs.existsSync(CONTENT_DIR)) {
          fs.mkdirSync(CONTENT_DIR, { recursive: true });
        }
        const fileContent = matter.stringify(bodyText || '', frontmatter);
        fs.writeFileSync(target.filePath, fileContent, 'utf8');

        sendJson(res, 200, { success: true, message: `Saved ${fileName} to ${type}` }, allowedOrigin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
      }
    });
    return;
  }

  // Delete content file
  if (req.method === 'POST' && url.pathname === '/api/content/delete') {
    readBody(req, res, allowedOrigin).then((body) => {
      if (body === null) return;
      try {
        const { type, fileName } = JSON.parse(body);
        const target = resolveContentFile(type, fileName);
        if (target.error) {
          sendJson(res, 400, { success: false, error: target.error }, allowedOrigin);
          return;
        }
        if (fs.existsSync(target.filePath)) {
          fs.unlinkSync(target.filePath);
        }
        sendJson(res, 200, { success: true, message: `Deleted ${fileName}` }, allowedOrigin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, allowedOrigin);
      }
    });
    return;
  }

  sendJson(res, 404, { success: false, error: 'Endpoint not found' }, allowedOrigin);
});

server.listen(PORT, HOST, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Local Admin File Bridge active on http://${HOST}:${PORT}`);
  console.log(`💻 Open Web Admin Studio at: http://localhost:3000/admin`);
  console.log(`🔑 Admin token for this session (paste into the studio header):`);
  console.log(`   ${ADMIN_TOKEN}`);
  console.log(`📁 Managing files in: ${CONTENT_DIR}`);
  console.log(`==================================================\n`);
});
