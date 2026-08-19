import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 * Contains all locators and methods related to the login page
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput = this.page.locator('input[name="username"]');
  readonly passwordInput = this.page.locator('input[name="password"]');
  readonly loginButton = this.page.locator('button[type="submit"]');
  readonly loginErrorMessage = this.page.locator('.oxd-alert-content');
  readonly pageHeading = this.page.locator('h5.orangehrm-login-title');
  readonly logoImage = this.page.locator('img.orangehrm-logo');
  

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateToHome();
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
  }

  /**
   * Login with provided credentials
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for navigation after login
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  }

  /**
   * Login with credentials and verify success
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async loginWithVerification(username: string, password: string): Promise<void> {
    await this.login(username, password);
    // Wait for dashboard to load
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Verify login page is loaded
   */
  async verifyLoginPageLoaded(): Promise<boolean> {
    return await this.usernameInput.isVisible() && await this.loginButton.isVisible();
  }

  /**
   * Get login error message
   */
  async getErrorMessage(): Promise<string> {
    await this.loginErrorMessage.waitFor({ state: 'visible' });
    return await this.loginErrorMessage.textContent() || '';
  }

  /**
   * Verify logo is displayed
   */
  async isLogoDisplayed(): Promise<boolean> {
    return await this.logoImage.isVisible();
  }

  /**
   * Clear all input fields
   */
  async clearInputs(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
