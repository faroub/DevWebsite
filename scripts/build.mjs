// Production build wrapper.
//
// The admin studio is a dev-only route. This script temporarily moves
// app/admin out of the app directory so `next build` emits no /admin route
// and no studio code into out/ (the studio component itself lives in
// components/AdminStudio.tsx, which the bundler never reaches without the
// route). The route is restored after the build, and a leftover stash from
// an interrupted build is cleaned up automatically.

import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const ADMIN_ROUTE = 'app/admin';
const STASH_DIR = '.admin-dev-stash';
const STASHED_ROUTE = `${STASH_DIR}/admin`;

function stashAdminRoute() {
  if (existsSync(STASH_DIR)) {
    rmSync(STASH_DIR, { recursive: true, force: true });
  }
  if (existsSync(ADMIN_ROUTE)) {
    mkdirSync(STASH_DIR, { recursive: true });
    renameSync(ADMIN_ROUTE, STASHED_ROUTE);
  }
}

function restoreAdminRoute() {
  if (existsSync(STASHED_ROUTE)) {
    if (existsSync(ADMIN_ROUTE)) {
      rmSync(ADMIN_ROUTE, { recursive: true, force: true });
    }
    renameSync(STASHED_ROUTE, ADMIN_ROUTE);
    rmSync(STASH_DIR, { recursive: true, force: true });
  }
}

stashAdminRoute();

let exitCode = 1;
try {
  const result = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', shell: true });
  exitCode = result.status ?? 1;
} finally {
  restoreAdminRoute();
}

process.exit(exitCode);
