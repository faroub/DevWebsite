const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DEV_STUDIO = path.join(ROOT_DIR, 'dev-studio');
const APP_ADMIN = path.join(ROOT_DIR, 'app', 'admin');

if (fs.existsSync(DEV_STUDIO)) {
  fs.mkdirSync(APP_ADMIN, { recursive: true });
  fs.cpSync(DEV_STUDIO, APP_ADMIN, { recursive: true });
  console.log('✓ Copied dev-studio/ into app/admin/');
} else {
  console.warn('⚠ dev-studio/ directory not found');
}
