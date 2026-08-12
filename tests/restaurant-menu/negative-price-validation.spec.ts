// spec: specs/restaurant-menu-functional-test-plan.md

import { test, expect } from '@playwright/test';
import { RestaurantMenuPage } from '../../pages/restaurant-menu/RestaurantMenuPage';

test.describe('Restaurant Menu Manager - Functional Flow', () => {
  test('Reject negative price values', async ({ page }) => {
    const menuPage = new RestaurantMenuPage(page);
    const itemName = `Spicy Noodles ${Date.now()}`;
    const negativePrice = '-5';
    const ingredients = 'Noodles, Chili';

    // Open the add-item form on a fresh state.
    await menuPage.open();
    await menuPage.verifyPageLoaded();

    // Enter a valid item name such as 'Spicy Noodles'.
    await menuPage.fillName(itemName);

    // Enter a negative price such as '-5'.
    await menuPage.fillPrice(negativePrice);

    // Enter ingredients such as 'Noodles, Chili'.
    await menuPage.fillIngredients(ingredients);

    // Click the Add Item button.
    await menuPage.submitItem();

    // Expect the negative value to be rejected and no invalid item to be created.
    await expect(page.locator(menuPage.menuRows).filter({ hasText: itemName })).toHaveCount(0);
  });
});
