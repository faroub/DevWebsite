// Production build wrapper.
// Content is committed to the repo, not deployed from an admin studio, so
// nothing is removed from the tree: the static export contains no /admin
// route and no admin code.

import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
