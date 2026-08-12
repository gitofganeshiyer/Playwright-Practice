import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';


export class RestaurantMenuPage extends BasePage {
  readonly appUrl = process.env.restaurant_app_url || 'http://127.0.0.1:5000/';

  readonly pageHeading = 'h1';
  readonly nameInput = '#add-name';
  readonly priceInput = '#add-price';
  readonly ingredientsInput = '#add-ingredients';
  readonly addItemButton = 'button:has-text("Add Item")';
  readonly menuRows = 'table tr';
  readonly validationMessage = 'p';
  readonly searchMenuItemInput = '#search-box';

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.appUrl, { waitUntil: 'domcontentloaded' });
    await this.page.locator(this.nameInput).waitFor({ state: 'visible', timeout: 10000 });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page.locator(this.pageHeading)).toContainText('Restaurant Menu Manager');
    await expect(this.page.locator(this.nameInput)).toBeVisible();
    await expect(this.page.locator(this.priceInput)).toBeVisible();
    await expect(this.page.locator(this.ingredientsInput)).toBeVisible();
    await expect(this.page.locator(this.addItemButton)).toBeVisible();
  }

  async fillName(name: string): Promise<void> {
    await this.page.locator(this.nameInput).fill(name);
  }

  async fillPrice(price: string): Promise<void> {
    await this.page.locator(this.priceInput).fill(price);
  }

  async fillIngredients(ingredients: string): Promise<void> {
    await this.page.locator(this.ingredientsInput).fill(ingredients);
  }

  async submitItem(): Promise<void> {
    await this.page.locator(this.addItemButton).click();
  }

  async resetForm(): Promise<void> {
    await this.page.locator(this.nameInput).fill('');
    await this.page.locator(this.priceInput).fill('');
    await this.page.locator(this.ingredientsInput).fill('');
  }

  async addMenuItem(name: string, price: string, ingredients: string): Promise<void> {
    await this.fillName(name);
    await this.fillPrice(price);
    await this.fillIngredients(ingredients);
    await this.submitItem();
  }

  async waitForMenuItem(name: string, price: string, ingredients: string): Promise<void> {
    const row = this.page.locator(this.menuRows)
      .filter({ hasText: name })
      .filter({ hasText: price })
      .filter({ hasText: ingredients })
      .first();

    await expect(row).toBeVisible();
  }

  async getValidationMessage(): Promise<string> {
    const message = this.page.locator(this.validationMessage)
      .filter({ hasText: /already exists|invalid|must|positive|price/i })
      .first();

    await expect(message).toBeVisible();
    return (await message.textContent())?.trim() ?? '';
  }

  async itemExists(name: string): Promise<boolean> {
    const row = this.page.locator(this.menuRows).filter({ hasText: name }).first();
    return (await row.count()) > 0;
  }
}
