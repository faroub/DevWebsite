// Production build wrapper.
// The admin studio is a local-only route in dev-studio/.
// This script ensures app/admin is deleted before `next build` runs
// so that no /admin route or admin code is ever emitted into out/.

import { existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const ADMIN_ROUTE = 'app/admin';

if (existsSync(ADMIN_ROUTE)) {
  rmSync(ADMIN_ROUTE, { recursive: true, force: true });
}

const result = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
