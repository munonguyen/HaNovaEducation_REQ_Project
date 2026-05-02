import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

function tsxFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return tsxFiles(fullPath);
    return fullPath.endsWith('.tsx') ? [fullPath] : [];
  });
}

test('source has no active buttons without a UI action', () => {
  const root = path.resolve(process.cwd(), 'src');
  const offenders: string[] = [];

  for (const file of tsxFiles(root)) {
    const source = fs.readFileSync(file, 'utf8');
    let cursor = 0;

    while ((cursor = source.indexOf('<button', cursor)) !== -1) {
      let scan = cursor;
      let depth = 0;
      let end = -1;

      while (scan < source.length) {
        const nextOpen = source.indexOf('<button', scan);
        const nextClose = source.indexOf('</button>', scan);
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth += 1;
          scan = nextOpen + 7;
        } else if (nextClose !== -1) {
          depth -= 1;
          scan = nextClose + 9;
          if (depth === 0) {
            end = scan;
            break;
          }
        } else {
          break;
        }
      }

      const block = source.slice(cursor, end);
      const line = source.slice(0, cursor).split('\n').length;
      const handled = /onClick\s*=|type\s*=\s*["']submit|disabled\b|aria-hidden/.test(block);
      if (!handled) offenders.push(`${path.relative(process.cwd(), file)}:${line}`);
      cursor = end > cursor ? end : cursor + 7;
    }
  }

  expect(offenders).toEqual([]);
});

test('student-facing actions update UI or navigate', async ({ page }) => {
  await page.goto('/signin');
  await page.getByRole('button', { name: /continue with google/i }).click();
  await expect(page.getByText(/Google sign-in is not connected/i)).toBeVisible();

  await page.getByPlaceholder('student@hanova.vn').fill('student@hanova.vn');
  await page.getByPlaceholder('Enter your password').fill('Student123A');
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.getByRole('link', { name: /enter lesson|join now/i }).click();
  await expect(page).toHaveURL(/\/schedule$/);

  await page.goto('/notifications');
  await page.getByRole('button', { name: /pick make-up slot/i }).click();
  await expect(page.getByText(/Pick make-up slot: opened @lananh workflow/i)).toBeVisible();

  await page.goto('/study-plan');
  await page.getByRole('button', { name: /continue learning/i }).click();
  await expect(page.getByText(/Next IELTS reading session opened/i)).toBeVisible();
  await page.getByRole('button', { name: /Strategy Guide\.pdf/i }).click();
  await expect(page.getByText(/Strategy Guide\.pdf: material preview opened/i)).toBeVisible();
});

test('profile, schedule, and signup utility actions respond on screen', async ({ page }) => {
  await page.goto('/signin');
  await page.getByPlaceholder('student@hanova.vn').fill('student@hanova.vn');
  await page.getByPlaceholder('Enter your password').fill('Student123A');
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto('/profile');
  await page.getByRole('button', { name: /edit/i }).click();
  await expect(page.getByText(/Profile editor opened/i)).toBeVisible();

  await page.getByRole('button', { name: /Billing & Plans/i }).click();
  await page.getByRole('button', { name: /manage plan/i }).click();
  await expect(page.getByText(/Plan management opened/i)).toBeVisible();
  await page.getByRole('button', { name: /view history/i }).click();
  await expect(page.getByText(/Billing history opened/i)).toBeVisible();
  await page.getByRole('button', { name: /add payment method/i }).click();
  await expect(page.getByText(/Payment method form opened/i)).toBeVisible();

  await page.getByRole('button', { name: /^Security/i }).click();
  await page.getByRole('button', { name: /^change$/i }).click();
  await expect(page.getByText(/Password change flow opened/i)).toBeVisible();
  await page.getByRole('button', { name: /^configure$/i }).click();
  await expect(page.getByText(/Two-factor authentication settings opened/i)).toBeVisible();
  await page.getByRole('button', { name: /sign out all/i }).click();
  await expect(page.getByText(/All other sessions were queued/i)).toBeVisible();

  await page.goto('/schedule');
  await page.getByRole('button', { name: /review materials/i }).click();
  await page.getByRole('button', { name: /^cancel$/i }).click();
  await expect(page.getByText(/cancellation request opened/i)).toBeVisible();
  await page.getByRole('button', { name: /review materials/i }).click();
  await page.getByRole('button', { name: /^reschedule$/i }).click();
  await expect(page.getByText(/reschedule flow opened/i)).toBeVisible();

  await page.goto('/signup');
  await page.getByRole('button', { name: /continue with google/i }).click();
  await expect(page.getByText(/Google sign-up is not connected/i)).toBeVisible();
});
