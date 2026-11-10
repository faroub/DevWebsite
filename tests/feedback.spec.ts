import { test, expect, type Page, type Route } from '@playwright/test';

// The feedback form is a private, offline safety net for the visitor: it never
// renders a comments thread. Fields are validated client-side (name 1-80 chars,
// message 10-2000 chars, rating 1-5 optional). The form service is mocked so the
// success and error messages show as text, not raw server responses.
const FEEDBACK_URL = 'https://api.web3forms.com/submit';

async function mockForm(page: Page): Promise<void> {
  await page.route(FEEDBACK_URL, async (route: Route) => {
    await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
  });
}

test('feedback form refuses empty input and shows fixed values', async ({ page }) => {
  await mockForm(page);
  await page.goto('/apps/focus-flow');
  const name = page.locator('input[id^="feedback-name-"]');
  const message = page.locator('textarea[id^="feedback-message-"]');
  const submit = page.locator('button[type=submit]');
  await expect(name).toBeVisible();
  await expect(message).toBeVisible();
  await expect(submit).toBeVisible();

  // Submitting empty shows both field errors.
  await submit.click();
  await expect(page.locator('[id^="feedback-name-"] + p')).toBeVisible();
  await expect(page.locator('[id^="feedback-message-"] + p')).toBeVisible();
  await expect(page.locator('[id^="feedback-name-"] + p')).toHaveText(/name/i);
  await expect(page.locator('[id^="feedback-message-"] + p')).toHaveText(/message/i);

  // A 9-character message fails; an 80-character name passes the max input.
  await name.fill('a'.repeat(80));
  await message.fill(' '.repeat(9));
  await submit.click();
  await expect(page.locator('[id^="feedback-message-"] + p')).toBeVisible();
  await expect(page.locator('[id^="feedback-name-"] + p')).not.toBeVisible();

  // Valid lengths show the fixed success message.
  await message.fill('a'.repeat(10));
  await submit.click();
  await expect(page.locator('[id^="feedback-status"] p')).toHaveText('Message sent successfully!');
});

test('filled honeypot is refused with the success message', async ({ page }) => {
  await mockForm(page);
  await page.goto('/projects/mzilab-showcase');
  const honeypot = page.locator('input[id^="feedback-honeypot-"]');
  await expect(honeypot).toBeVisible();
  await expect(honeypot.locator('..')).toHaveAttribute('aria-hidden', 'true');
  await page.locator('input[id^="feedback-name-"]').fill('a'.repeat(20));
  await page.locator('textarea[id^="feedback-message-"]').fill('a'.repeat(20));
  await honeypot.fill('spam');
  await page.locator('button[type=submit]').click();
  await expect(page.locator('[id^="feedback-status"] p')).toHaveText('Message sent successfully!');
});

test('the form can be completed keyboard-only', async ({ page }) => {
  await page.goto('/apps/focus-flow');
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    const id = await page.evaluate(() => document.activeElement?.id);
    if (id?.startsWith('feedback-name-')) break;
  }
  await expect(page.locator('input[id^="feedback-name-"]')).toBeFocused();
  await page.keyboard.press('Tab');
  // Focus lands on the first star button, not the group wrapper.
  await expect(page.locator('button[aria-label^="Rate 1"]')).toBeFocused();
  await page.keyboard.press('Tab');
  // The validator button group is not focusable; tab through the group and press.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const id = await page.evaluate(() => document.activeElement?.tagName);
    if (id === 'TEXTAREA') break;
  }
  await expect(page.locator('textarea[id^="feedback-message-"]')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('button[type=submit]')).toBeFocused();
});
