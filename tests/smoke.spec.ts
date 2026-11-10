import { test, expect } from '@playwright/test';

// Smoke test against the static export: every route loads, has exactly one
// top-level heading and no raw Markdown left in the main content.
const PAGES = ['/', '/apps', '/projects', '/blogs', '/about', '/privacy', '/terms'];

for (const page of PAGES) {
  test(`${page} renders with one heading`, async ({ page: browserPage }) => {
    const response = await browserPage.goto(page);
    expect(response?.status()).toBe(200);
    await expect(browserPage.locator('main')).toBeVisible();
    const h1 = browserPage.locator('h1');
    await expect(h1.first()).toBeVisible();
    expect(await h1.count()).toBe(1);
    const body = await browserPage.locator('main').innerText();
    expect(body).not.toContain('# '); // Raw markdown headings are rendered bugs
  });
}

test('app detail routes render', async ({ page: browserPage }) => {
  for (const slug of ['git-snapshot', 'focus-flow', 'pulse-vibe']) {
    const response = await browserPage.goto(`/apps/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(browserPage.locator('main')).toBeVisible();
    const h1 = browserPage.locator('h1');
    await expect(h1.first()).toBeVisible();
    expect(await h1.count()).toBe(1);
    const body = await browserPage.locator('main').innerText();
    expect(body).not.toContain('# ');
  }
});

test('blog detail routes render', async ({ page: browserPage }) => {
  for (const slug of ['building-static-apps-next16', 'jetpack-compose-performance', 'ai-coder-workflow']) {
    const response = await browserPage.goto(`/blogs/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(browserPage.locator('main')).toBeVisible();
    const h1 = browserPage.locator('h1');
    await expect(h1.first()).toBeVisible();
    expect(await h1.count()).toBe(1);
    const body = await browserPage.locator('main').innerText();
    expect(body).not.toContain('# ');
  }
});

test('project detail routes render', async ({ page: browserPage }) => {
  for (const slug of ['mzilab-showcase', 'android-xr-glimmer', 'perfetto-trace-cli']) {
    const response = await browserPage.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(browserPage.locator('main')).toBeVisible();
    const h1 = browserPage.locator('h1');
    await expect(h1.first()).toBeVisible();
    expect(await h1.count()).toBe(1);
    const body = await browserPage.locator('main').innerText();
    expect(body).not.toContain('# ');
  }
});

test('admin route is absent from the export', async ({ page }) => {
  // The static export has no /admin route; the server returns 404.
  const response = await page.goto('/admin');
  expect(response?.status()).toBe(404);
});

test('no raw markdown in rendered markdown sections', async ({ page }) => {
  await page.goto('/apps/focus-flow');
  const body = await page.locator('main').innerText();
  expect(body).not.toContain('**');
  expect(body).not.toContain('```');
});
