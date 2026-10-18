const http = require('http');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PORT = 3001;
const ROOT_DIR = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

const server = http.createServer((req, res) => {
  // CORS Headers for local admin console
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Auto-redirect browser visits from port 3001 to Next.js app on port 3000
  if (url.pathname === '/' || url.pathname === '/admin') {
    res.writeHead(302, { Location: 'http://localhost:3000/admin' });
    res.end();
    return;
  }

  // List all content items
  if (req.method === 'GET' && url.pathname === '/api/content') {
    try {
      const types = ['apps', 'projects', 'blogs'];
      const result = {};

      types.forEach((type) => {
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

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: result }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // Save content file
  if (req.method === 'POST' && url.pathname === '/api/content/save') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { type, fileName, frontmatter, bodyText } = JSON.parse(body);
        if (!type || !fileName || !frontmatter) {
          throw new Error('Missing type, fileName, or frontmatter');
        }

        const targetDir = path.join(CONTENT_DIR, type);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const filePath = path.join(targetDir, fileName.endsWith('.mdx') ? fileName : `${fileName}.mdx`);
        const fileContent = matter.stringify(bodyText || '', frontmatter);

        fs.writeFileSync(filePath, fileContent, 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: `Saved ${fileName} to ${type}` }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Delete content file
  if (req.method === 'POST' && url.pathname === '/api/content/delete') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { type, fileName } = JSON.parse(body);
        const filePath = path.join(CONTENT_DIR, type, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: `Deleted ${fileName}` }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Local Admin File Bridge active on http://localhost:${PORT}`);
  console.log(`💻 Open Web Admin Studio at: http://localhost:3000/admin`);
  console.log(`📁 Managing files in: ${CONTENT_DIR}`);
  console.log(`==================================================\n`);
});
