import { test, expect } from '@playwright/test';

test.describe('TestLeaf Upload Link feature', () => {
  test('should validate URL input and upload swagger from public link', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await expect(page.getByRole('heading', { name: /upload swagger specification/i })).toBeVisible();

    await page.getByRole('radio', { name: /upload link/i }).check();

    const uploadUrlInput = page.getByRole('textbox', { name: /swagger\/openapi url/i });
    const uploadLinkButton = page.getByRole('button', { name: /^upload link$/i });

    await expect(uploadUrlInput).toBeVisible();
    await expect(uploadLinkButton).toBeDisabled();

    // Negative check: invalid extension should fail with a visible status message.
    await uploadUrlInput.fill('https://example.com/openapi.txt');
    await expect(uploadLinkButton).toBeEnabled();
    await uploadLinkButton.click();
    await expect(page.getByRole('status')).toContainText(/invalid/i);

    // Positive check: valid public OpenAPI URL should move user to Step 2.
    await uploadUrlInput.fill('https://petstore3.swagger.io/api/v3/openapi.json');
    await uploadLinkButton.click();

    await expect(page.getByRole('status')).toContainText(/uploaded and validated successfully/i);
    await expect(page.getByRole('heading', { name: /validation and correction/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /proceed to generate testcases/i })).toBeVisible();
  });
});
