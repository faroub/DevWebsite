#!/usr/bin/env node
/**
 * Fails the build if any tracked file path in the repository starts with
 * `node_modules/` or `.next/` or `out/`.
 *
 * Keeps `.gitignore` violations from sneaking into history: the export
 * directory, dependencies and build metadata must never be committed.
 */
import { execSync } from 'node:child_process';

try {
  const tracked = execSync('git ls-files', { encoding: 'utf8' });
  const bad = tracked
    .split('\n')
    .filter((line) => line.startsWith('node_modules/') || line.startsWith('.next/') || line.startsWith('out/'))
    .map((line) => `  ${line}`);

  if (bad.length === 0) {
    console.log('  ✓ no tracked files under node_modules/, .next/ or out/\n');
    process.exit(0);
  }

  console.log(`\n✗ ${bad.length} tracked file(s) should not be committed:\n${bad.join('\n')}\n`);
  process.exit(1);
} catch (err) {
  console.log(`\n✗ check-tracked failed: ${err.message}\n`);
  process.exit(1);
}
