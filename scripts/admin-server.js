const http = require('http');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const HOST = '127.0.0.1';
const PORT = 3001;
const ALLOWED_ORIGINS = new Set(['http://localhost:3000', 'http://127.0.0.1:3000']);
const ALLOWED_TYPES = ['apps', 'projects', 'blogs'];
const FILE_NAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9_-]*\.mdx?$/;
const MAX_BODY_BYTES = 1024 * 1024; // 1 MB limit

const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.resolve(process.env.ADMIN_CONTENT_DIR || path.join(ROOT_DIR, 'content'));
const SETTINGS_FILE = path.join(ROOT_DIR, '.admin-settings.json');

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
  } catch {
    // Fallback if settings file cannot be read
  }
  return fallback;
}

function validateAndResolvePath(type, fileName) {
  if (!ALLOWED_TYPES.includes(type)) {
    return { error: 'Invalid content type' };
  }
  if (!fileName || typeof fileName !== 'string' || !FILE_NAME_REGEX.test(fileName)) {
    return { error: 'Invalid file name format' };
  }
  const resolvedPath = path.resolve(CONTENT_DIR, type, fileName);
  if (!resolvedPath.startsWith(CONTENT_DIR + path.sep)) {
    return { error: 'Path traversal forbidden' };
  }
  return { resolvedPath };
}

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
        sendJson(res, 413, { success: false, error: 'Payload Too Large' }, origin);
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

function createServer() {
  return http.createServer((req, res) => {
    const origin = req.headers.origin;

    // Reject all requests whose Origin is not exactly http://localhost:3000 or http://127.0.0.1:3000
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      sendJson(res, 403, { success: false, error: 'Forbidden: Origin not allowed' }, null);
      return;
    }

    // CORS Options preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        Vary: 'Origin',
      });
      res.end();
      return;
    }

    const url = new URL(req.url, `http://${HOST}:${PORT}`);

    // Settings Endpoint
    if (req.method === 'GET' && url.pathname === '/api/settings') {
      try {
        const settings = readSettings();
        sendJson(res, 200, { success: true, settings }, origin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, origin);
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/settings/save') {
      readBody(req, res, origin).then((body) => {
        if (body === null) return;
        try {
          const { notifyEmail, web3formsKey } = JSON.parse(body);
          const settings = { notifyEmail: notifyEmail || '', web3formsKey: web3formsKey || '' };
          fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
          sendJson(res, 200, { success: true, message: 'Settings saved successfully', settings }, origin);
        } catch (err) {
          sendJson(res, 500, { success: false, error: err.message }, origin);
        }
      });
      return;
    }

    // About Page Endpoints
    if (req.method === 'GET' && url.pathname === '/api/about') {
      try {
        const aboutPath = path.join(CONTENT_DIR, 'about.mdx');
        let parsed = { data: {}, content: '' };
        if (fs.existsSync(aboutPath)) {
          const fileContent = fs.readFileSync(aboutPath, 'utf8');
          parsed = matter(fileContent);
        }
        sendJson(res, 200, { success: true, frontmatter: parsed.data, body: parsed.content }, origin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, origin);
      }
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/about/save') {
      readBody(req, res, origin).then((body) => {
        if (body === null) return;
        try {
          const { frontmatter, bodyText } = JSON.parse(body);
          const aboutPath = path.join(CONTENT_DIR, 'about.mdx');
          if (!fs.existsSync(CONTENT_DIR)) {
            fs.mkdirSync(CONTENT_DIR, { recursive: true });
          }
          const fileContent = matter.stringify(bodyText || '', frontmatter || {});
          fs.writeFileSync(aboutPath, fileContent, 'utf8');
          sendJson(res, 200, { success: true, message: 'Saved about.mdx to disk' }, origin);
        } catch (err) {
          sendJson(res, 500, { success: false, error: err.message }, origin);
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
        sendJson(res, 200, { success: true, data: result }, origin);
      } catch (err) {
        sendJson(res, 500, { success: false, error: err.message }, origin);
      }
      return;
    }

    // Save content file
    if (req.method === 'POST' && url.pathname === '/api/content/save') {
      readBody(req, res, origin).then((body) => {
        if (body === null) return;
        try {
          const { type, fileName, frontmatter, bodyText } = JSON.parse(body);
          const validation = validateAndResolvePath(type, fileName);
          if (validation.error) {
            sendJson(res, 400, { success: false, error: validation.error }, origin);
            return;
          }

          const targetDir = path.dirname(validation.resolvedPath);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          const fileContent = matter.stringify(bodyText || '', frontmatter || {});
          fs.writeFileSync(validation.resolvedPath, fileContent, 'utf8');

          sendJson(res, 200, { success: true, message: `Saved ${fileName} to ${type}` }, origin);
        } catch (err) {
          sendJson(res, 500, { success: false, error: err.message }, origin);
        }
      });
      return;
    }

    // Delete content file
    if (req.method === 'POST' && url.pathname === '/api/content/delete') {
      readBody(req, res, origin).then((body) => {
        if (body === null) return;
        try {
          const { type, fileName } = JSON.parse(body);
          const validation = validateAndResolvePath(type, fileName);
          if (validation.error) {
            sendJson(res, 400, { success: false, error: validation.error }, origin);
            return;
          }

          if (fs.existsSync(validation.resolvedPath)) {
            fs.unlinkSync(validation.resolvedPath);
          }
          sendJson(res, 200, { success: true, message: `Deleted ${fileName}` }, origin);
        } catch (err) {
          sendJson(res, 500, { success: false, error: err.message }, origin);
        }
      });
      return;
    }

    sendJson(res, 404, { success: false, error: 'Endpoint not found' }, origin);
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Local Admin File Bridge active on http://${HOST}:${PORT}`);
    console.log(`📁 Managing files in: ${CONTENT_DIR}`);
    console.log(`==================================================\n`);
  });
}

module.exports = { createServer, validateAndResolvePath };
