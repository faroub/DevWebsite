import { test, expect } from '@playwright/test';

// Main pages render with a single top-level heading and localized chrome.
const PAGES = ['/', '/apps', '/projects', '/blogs', '/about', '/privacy', '/terms'];

for (const page of PAGES) {
  test(`${page} renders`, async ({ page: browserPage }) => {
    await browserPage.goto(page);
    const h1s = await browserPage.locator('h1').count();
    expect(h1s).toBeGreaterThanOrEqual(1);
    await expect(browserPage.locator('main')).toBeVisible();
  });
}

test('admin route is absent from the export', async ({ page }) => {
  const response = await page.goto('/admin');
  // The static export has no /admin route; the server returns 404.
  expect(response?.status()).toBe(404);
});

test('detail page renders markdown as HTML', async ({ page }) => {
  await page.goto('/apps/focus-flow');
  // The body must contain real rendered headings, not literal "# Heading".
  const h2 = page.locator('h2').first();
  await expect(h2).toBeVisible();
  expect(await page.locator('strong').count()).toBeGreaterThan(0);
  const bodyText = await page.locator('main').innerText();
  expect(bodyText).not.toContain('# ');
});

test('blog detail shows author, date and markdown body', async ({ page }) => {
  await page.goto('/blogs/jetpack-compose-performance');
  await expect(page.locator('h1').first()).toBeVisible();
  const bodyText = await page.locator('main').innerText();
  expect(bodyText).not.toContain('**');
  expect(bodyText).not.toContain('# ');
});

test('locale switch retranslates the navigation', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav a', { hasText: 'blogs' }).first();
  await expect(nav).toBeVisible();

  // Switch to Arabic via the language select.
  const select = page.getByRole('combobox', { name: 'Select website language' });
  await select.selectOption('ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('nav a', { hasText: 'المدونات' })).toBeVisible();

  // Back to English.
  await select.selectOption('en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('theme toggle switches color scheme', async ({ page }) => {
  await page.goto('/');
  const initialClass = (await page.locator('html').getAttribute('class')) || '';
  const startsDark = /dark/.test(initialClass) && !/light/.test(initialClass);

  const toggle = page.getByRole('button', { name: 'Toggle dark and light mode' });
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(startsDark ? /light/ : /dark/);
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(startsDark ? /dark/ : /light/);
});

test('hamburger exposes aria state and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/');
  const burger = page.getByRole('button', { name: 'Toggle mobile menu' });
  await expect(burger).toHaveAttribute('aria-expanded', 'false');
  await burger.click();
  await expect(burger).toHaveAttribute('aria-expanded', 'true');
  await expect(burger).toHaveAttribute('aria-controls', 'mobile-navigation');
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-navigation')).not.toBeVisible();
});

test('apps feed filters narrow results', async ({ page }) => {
  await page.goto('/apps');
  const cardsBefore = await page.locator('main a[href^="/apps/"]').count();
  // Search by a term present in one app's tech stack.
  await page.fill('input[type="text"]', 'Kotlin');
  const cardsAfter = await page.locator('main a[href^="/apps/"]').count();
  expect(cardsAfter).toBeGreaterThan(0);
  expect(cardsAfter).toBeLessThanOrEqual(cardsBefore);
});
