import { test, expect } from '@playwright/test';

test('practice-testautomation end-to-end flow', async ({ page }, testInfo) => {
  testInfo.title = 'Practice Test Automation - End to End Flow';
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();

  // 1. Validate Success message
  const successMessage = page.locator('h1');
  await expect(successMessage).toHaveText(/Logged In Successfully/i);
  await testInfo.attach('step-1-success-message', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // 2. Click on Blog menu and capture the title of first blog post
  await page.getByRole('link', { name: 'Blog' }).click();
  const firstBlogTitleLocator = page.locator(
    'article h1, article h2, article h3, .entry-title, .post-title'
  ).first();
  const firstBlogTitle = (await firstBlogTitleLocator.textContent())?.trim();
  expect(firstBlogTitle).not.toBeNull();
  expect(firstBlogTitle?.length).toBeGreaterThan(0);
  await testInfo.attach('step-2-first-blog-title', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // 3. Click on Practice Menu item and validate header text
  await page.locator('div[id="menu-primary"] > * > * >li:nth-child(2)').click();
  await page.waitForLoadState('networkidle', { timeout: 15000 });
  await expect(page.locator('h1')).toHaveText(/Practice/i);
  await testInfo.attach('step-3-practice-header', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // 4. Click on Test Table link and validate the Header and check if Filters are available
  await page.getByRole('link', { name: 'Test Table' }).click();
  await expect(page.locator('h1')).toHaveText(/Test Table/i);
  await expect(page.getByText(/filter/i).first()).toBeVisible();
  await testInfo.attach('step-4-test-table-filters', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // 5. Click on Home menu link and check if the header text is Hello
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.locator('h1')).toHaveText(/Hello/i);
  await testInfo.attach('step-5-home-header', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // 6. Close the browser
  await page.close();
});