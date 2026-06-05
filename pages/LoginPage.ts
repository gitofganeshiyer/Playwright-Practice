import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 * Contains all locators and methods related to the login page
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'button[type="submit"]';
  readonly loginErrorMessage = '.oxd-alert-content';
  readonly pageHeading = 'h5.orangehrm-login-title';
  readonly logoImage = 'img.orangehrm-logo';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateToHome();
    await this.waitForElement(this.usernameInput);
  }

  /**
   * Login with provided credentials
   * @param username - Username to login with
   * @param password - Password to login with
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    // Wait for navigation after login
    await this.page.waitForNavigation({ waitUntil: 'networkidle' });
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
    return this.isElementVisible(this.usernameInput);
  }

  /**
   * Get login error message
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.loginErrorMessage);
    return this.getElementText(this.loginErrorMessage);
  }

  /**
   * Verify logo is displayed
   */
  async isLogoDisplayed(): Promise<boolean> {
    return this.isElementVisible(this.logoImage);
  }

  /**
   * Clear all input fields
   */
  async clearInputs(): Promise<void> {
    await this.page.locator(this.usernameInput).clear();
    await this.page.locator(this.passwordInput).clear();
  }
}
