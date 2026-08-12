// spec: specs/restaurant-menu-functional-test-plan.md

import { test, expect } from '@playwright/test';
import { RestaurantMenuPage } from '../../pages/restaurant-menu/RestaurantMenuPage';

test.describe('Restaurant Menu Manager - Functional Flow', () => {
  test('Create a new menu item with valid data', async ({ page }) => {
    const menuPage = new RestaurantMenuPage(page);
    const uniqueName = `Butter Chicken ${Date.now()}`;
    const price = '250';
    const ingredients = 'Chicken, Butter, Cream';

    // Open the application at http://127.0.0.1:5000/ in a fresh browser session.
    await menuPage.open();

    // Ensure the page is loaded and the form is ready.
    await menuPage.verifyPageLoaded();

    // Enter a unique item name such as 'Butter Chicken'.
    await menuPage.fillName(uniqueName);
    await expect(page.locator(menuPage.nameInput)).toHaveValue(uniqueName);

    // Enter a valid price such as '250'.
    await menuPage.fillPrice(price);
    await expect(page.locator(menuPage.priceInput)).toHaveValue(price);

    // Enter ingredients such as 'Chicken, Butter, Cream'.
    await menuPage.fillIngredients(ingredients);
    await expect(page.locator(menuPage.ingredientsInput)).toHaveValue(ingredients);

    // Click the Add Item button.
    await menuPage.submitItem();

    // Expect the new item to be added to the menu list.
    await menuPage.waitForMenuItem(uniqueName, '₹250.00', ingredients);
  });
});
