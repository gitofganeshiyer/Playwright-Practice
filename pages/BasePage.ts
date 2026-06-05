import { Page } from '@playwright/test';

/**
 * Base Page class that contains common methods and utilities
 * All page objects should extend this class
 */
export class BasePage {
  protected page: Page;
  readonly baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    await this.page.waitForTimeout(5000); // Additional wait to ensure page is fully loaded

  }

  /**
   * Navigate to the home page
   */
  async navigateToHome(): Promise<void> {

    await this.navigateTo(`${this.baseURL}/auth/login`);
  }

  /**
   * Get element by selector
   * @param selector - CSS or XPath selector
   */
  async getElement(selector: string) {
    return this.page.locator(selector);
  }

  /**
   * Fill input field with text
   * @param selector - CSS or XPath selector
   * @param text - Text to enter
   */
  async fillInput(selector: string, text: string): Promise<void> {
    const element = await this.getElement(selector);
    await element.fill(text);
  }

  /**
   * Click on element
   * @param selector - CSS or XPath selector
   */
  async clickElement(selector: string): Promise<void> {
    const element = await this.getElement(selector);
    await element.click();
  }

  /**
   * Get text content of element
   * @param selector - CSS or XPath selector
   */
  async getElementText(selector: string): Promise<string> {
    const element = await this.getElement(selector);
    return element.textContent() as Promise<string>;
  }

  /**
   * Check if element is visible
   * @param selector - CSS or XPath selector
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const element = await this.getElement(selector);
    return element.isVisible();
  }

  /**
   * Wait for element to be visible
   * @param selector - CSS or XPath selector
   * @param timeout - Timeout in milliseconds
   */
  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param selector - CSS or XPath selector
   * @param timeout - Timeout in milliseconds
   */
  async waitForElementToHide(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Get all text content from multiple elements
   * @param selector - CSS or XPath selector
   */
  async getAllElementTexts(selector: string): Promise<string[]> {
    const elements = await this.getElement(selector);
    return elements.allTextContents();
  }

  /**
   * Check if element exists on the page
   * @param selector - CSS or XPath selector
   */
  async elementExists(selector: string): Promise<boolean> {
    try {
      const element = await this.getElement(selector);
      if(await element.count() > 0)    return true;
    } catch {
        return false;
    }
    return false;
  }

  /**
   * Pause execution for specified time
   * @param ms - Milliseconds to pause
   */
  async pause(ms: number = 1000): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Take a screenshot
   * @param name - Name of the screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Reload the page
   */
  async reloadPage(): Promise<void> {
    await this.page.reload();
  }
}
