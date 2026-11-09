const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TOKENS = [
  'canvas',
  'surface',
  'divider',
  'text-primary',
  'text-secondary',
  'accent-primary',
  'accent-success',
  'accent-error',
];

function findFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(full));
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const sourceFiles = [
  ...findFiles(path.join(ROOT_DIR, 'app')),
  ...findFiles(path.join(ROOT_DIR, 'components')),
];

const extractedTokens = new Set();
TOKENS.forEach((token) => {
  const regex = new RegExp(`\\b(bg|text|border|ring|selection:bg|selection:text|hover:bg|hover:text|hover:border|focus:border)-${token.replace('-', '\\-')}(/\\d+)?\\b`, 'g');
  sourceFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    while (regex.exec(content) !== null) {
      extractedTokens.add(token);
    }
  });
});

// Search built CSS files
function findCssFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(findCssFiles(full));
    } else if (file.endsWith('.css')) {
      results.push(full);
    }
  });
  return results;
}

const cssFiles = [
  ...findCssFiles(path.join(ROOT_DIR, 'out')),
  ...findCssFiles(path.join(ROOT_DIR, '.next')),
];

let allCssContent = '';
cssFiles.forEach((f) => {
  allCssContent += fs.readFileSync(f, 'utf8') + '\n';
});

let missingCount = 0;
console.log('Checking design tokens in built CSS...');
TOKENS.forEach((token) => {
  if (extractedTokens.has(token)) {
    // Check if token rule exists in CSS
    if (allCssContent.includes(token)) {
      console.log(`  ✓ Token '${token}' is defined and generated in CSS`);
    } else {
      console.error(`  ❌ MISSING TOKEN: '${token}' not found in built CSS!`);
      missingCount++;
    }
  }
});

if (missingCount === 0) {
  console.log('\nTOKEN CHECK PASS: 0 missing tokens.\n');
  process.exit(0);
} else {
  console.error(`\nTOKEN CHECK FAIL: ${missingCount} tokens missing.\n`);
  process.exit(1);
}
