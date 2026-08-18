import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly pageHeading = this.page.locator('.oxd-topbar-header-breadcrumb h6');
  readonly upgradeButton = this.page.getByRole('button', { name: 'Upgrade' });
  readonly navigationSearch = this.page.getByPlaceholder('Search');
  readonly navigationLinks = this.page.locator('.oxd-main-menu-item');
  readonly widgetNames = this.page.locator('.orangehrm-dashboard-widget-name');

  constructor(page: Page) {
    super(page);
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL('**/dashboard/index');
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  async isLoaded(): Promise<boolean> {
    return this.pageHeading.isVisible();
  }

  widget(name: string): Locator {
    return this.page
      .locator('.orangehrm-dashboard-widget')
      .filter({
        has: this.page.locator('.orangehrm-dashboard-widget-name', { hasText: name }),
      })
      .first();
  }

  navigationLink(name: string): Locator {
    return this.page.locator('.oxd-main-menu-item').filter({ hasText: name });
  }

  async searchNavigation(term: string): Promise<void> {
    await this.navigationSearch.fill(term);
  }

  async clearNavigationSearch(): Promise<void> {
    await this.navigationSearch.clear();
  }

  async openNavigationItem(name: string): Promise<void> {
    await this.navigationLink(name).click();
  }
}
