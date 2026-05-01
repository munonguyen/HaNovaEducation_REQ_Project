import { expect, test } from '@playwright/test';

const accounts = [
  {
    role: 'student',
    email: 'student@hanova.vn',
    password: 'Student123A',
    path: '/dashboard',
    heading: /Good evening|learning sanctuary/i,
  },
  {
    role: 'tutor',
    email: 'tutor@hanova.vn',
    password: 'Tutor123A',
    path: '/tutor/dashboard',
    heading: /Tutor Home|Teaching Command Center|Daily teaching overview/i,
  },
  {
    role: 'manager',
    email: 'manager@hanova.vn',
    password: 'Manager123A',
    path: '/manager/dashboard',
    heading: /Operational Control Center/i,
  },
  {
    role: 'admin',
    email: 'admin@hanova.vn',
    password: 'Admin123A',
    path: '/admin/dashboard',
    heading: /Admin|Platform/i,
  },
] as const;

test.describe('four-role workspace smoke', () => {
  for (const account of accounts) {
    test(`${account.role} demo account signs in to its workspace`, async ({ page }) => {
      await page.goto('/signin');
      await page.getByPlaceholder('student@hanova.vn').fill(account.email);
      await page.getByPlaceholder('Enter your password').fill(account.password);
      await page.getByRole('button', { name: /^sign in$/i }).click();

      await expect(page).toHaveURL(new RegExp(`${account.path.replace(/\//g, '\\/')}$`));
      await expect(page.locator('body')).toContainText(account.heading);
    });
  }

  test('manager dashboard links the four role systems together', async ({ page }) => {
    await page.goto('/manager/dashboard');

    await expect(page.getByRole('link', { name: /Open student system/i })).toHaveAttribute('href', '/dashboard');
    await expect(page.getByRole('link', { name: /Open tutor system/i })).toHaveAttribute('href', '/tutor/dashboard');
    await expect(page.getByRole('link', { name: /Review manager rules/i })).toHaveAttribute('href', '/manager/settings');
    await expect(page.getByRole('link', { name: /Open admin console/i })).toHaveAttribute('href', '/admin/dashboard');
  });
});
