// spec: specs/restaurant-menu-functional-test-plan.md

import { test, expect } from '@playwright/test';
import { RestaurantMenuPage } from '../../pages/restaurant-menu/RestaurantMenuPage';

test.describe('Restaurant Menu Manager - Functional Flow', () => {
  test('Prevent creation of a duplicate menu item with the same name', async ({ page }) => {
    const menuPage = new RestaurantMenuPage(page);
    const itemName = `Butter Chicken ${Date.now()}`;
    const duplicatePrice = '260';
    const ingredients = 'Chicken, Butter';

    // Create a menu item with a unique name and valid price and ingredients.
    await menuPage.open();
    await menuPage.verifyPageLoaded();
    await menuPage.addMenuItem(itemName, '250', 'Chicken, Butter, Cream');
    await menuPage.waitForMenuItem(itemName, '₹250.00', 'Chicken, Butter, Cream');

    // Attempt to create another menu item using the exact same name.
    await menuPage.addMenuItem(itemName, duplicatePrice, ingredients);

    // Expect the application to block the duplicate submission and show a validation message.
    const message = await menuPage.getValidationMessage();
    expect(message.toLowerCase()).toContain('already exists');

    // Clear the form after validation so the state is reset for the next step.
    await menuPage.resetForm();

    await expect(page.locator(menuPage.menuRows).filter({ hasText: itemName })).toHaveCount(1);
  });
});
