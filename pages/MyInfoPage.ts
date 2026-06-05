import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * My Info Page Object Model
 * Contains all locators and methods related to the My Info section
 */
export class MyInfoPage extends BasePage {
  // Main locators
  readonly myInfoMenuItem = '//a[contains(text(), "My Info")]';
  readonly pageTitle = 'h6.topbar-header-breadcrumb';
  
  // Sidebar menu locators
  readonly sidebarMenu = '.orangehrm-sidebar-menu';
  readonly immigrationTab = '//a[contains(text(), "Immigration")]';
  readonly immigrationSection = 'div[class*="immigration"]';
  
  // Employee information locators
  readonly employeeName = '//label[contains(text(), "First Name")]/following::input[1]';
  readonly employeeID = '//label[contains(text(), "Employee Id")]/following::input[1]';
  
  // Passport details locators
  readonly passportTable = '.orangehrm-container';
  readonly passportNumber = '//label[contains(text(), "Number")]/following::input[1]';
  readonly passportIssuedDate = '//label[contains(text(), "Issued Date")]/following::input[1]';
  readonly passportExpiryDate = '//label[contains(text(), "Expiry Date")]/following::input[1]';
  readonly passportIssuedCountry = '//label[contains(text(), "Issuance Country")]/following::div[1]';
  readonly passportRecords = '.orangehrm-table tbody tr';
  readonly emptyMessage = '.orangehrm-table-cell-center';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to My Info page
   */
  async navigateToMyInfo(): Promise<void> {
    await this.clickElement(this.myInfoMenuItem);
    await this.waitForElement(this.pageTitle);
  }

  /**
   * Verify My Info page is loaded
   */
  async verifyMyInfoPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.pageTitle, 5000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Navigate to Immigration section
   */
  async navigateToImmigrationSection(): Promise<void> {
    try {
      await this.page.locator(this.immigrationTab).first().waitFor({ state: 'visible', timeout: 5000 });
      await this.clickElement(this.immigrationTab);
      await this.page.waitForLoadState('networkidle', { timeout: 15000 });
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });

    } catch {
      // If immigration tab is not clickable as link, try scrolling and clicking
      await this.page.locator(this.immigrationTab).scrollIntoViewIfNeeded();
      await this.pause(500);
      await this.clickElement(this.immigrationTab);
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Check if immigration section is visible
   */
  async isImmigrationSectionVisible(): Promise<boolean> {
    return this.isElementVisible(this.immigrationTab);
  }

  /**
   * Get passport details if available
   */
  async getPassportDetails(): Promise<Record<string, string>> {
    const passportDetails: Record<string, string> = {};

    try {
      // Try to get passport number
      if (await this.elementExists(this.passportNumber)) {
        passportDetails['passportNumber'] = await this.page.locator(this.passportNumber).inputValue();
      }

      // Try to get issued date
      if (await this.elementExists(this.passportIssuedDate)) {
        passportDetails['issuedDate'] = await this.page.locator(this.passportIssuedDate).inputValue();
      }

      // Try to get expiry date
      if (await this.elementExists(this.passportExpiryDate)) {
        passportDetails['expiryDate'] = await this.page.locator(this.passportExpiryDate).inputValue();
      }

      // Try to get issuance country
      if (await this.elementExists(this.passportIssuedCountry)) {
        passportDetails['issuanceCountry'] = await this.getElementText(this.passportIssuedCountry);
      }
    } catch (error) {
      console.error('Error getting passport details:', error);
    }

    return passportDetails;
  }

  /**
   * Check if passport details are available
   */
  async isPassportDetailsAvailable(): Promise<boolean> {
    try {
      // Check if there are any passport records in the table
      const records = await this.page.locator(this.passportRecords);
      const recordCount = await records.count();

      if (recordCount > 0) {
        return true;
      }

      // Alternative: check if passport fields have values
      const passportDetails = await this.getPassportDetails();
      return Object.keys(passportDetails).length > 0;
    } catch (error) {
      console.error('Error checking passport details availability:', error);
      return false;
    }
  }

  /**
   * Get all passport records from table
   */
  async getAllPassportRecords(): Promise<string[][]> {
    const records: string[][] = [];

    try {
      const rows = await this.page.locator(this.passportRecords);
      const rowCount = await rows.count();

      for (let i = 0; i < rowCount; i++) {
        const cells = await rows.nth(i).locator('td');
        const cellCount = await cells.count();
        const rowData: string[] = [];

        for (let j = 0; j < cellCount; j++) {
          const cellText = await cells.nth(j).textContent();
          rowData.push(cellText || '');
        }

        if (rowData.length > 0) {
          records.push(rowData);
        }
      }
    } catch (error) {
      console.error('Error getting passport records:', error);
    }

    return records;
  }

  /**
   * Check if empty message is displayed
   */
  async isEmptyMessageDisplayed(): Promise<boolean> {
    try {
      return await this.isElementVisible(this.emptyMessage);
    } catch {
      return false;
    }
  }

  /**
   * Get employee name
   */
  async getEmployeeName(): Promise<string> {
    try {
      return await this.page.locator(this.employeeName).inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Get employee ID
   */
  async getEmployeeID(): Promise<string> {
    try {
      return await this.page.locator(this.employeeID).inputValue();
    } catch {
      return '';
    }
  }

  /**
   * Get page heading text
   */
  async getPageHeadingText(): Promise<string> {
    try {
      return await this.getElementText(this.pageTitle);
    } catch {
      return '';
    }
  }

  /**
   * Verify navigation to My Info was successful
   */
  async verifyNavigationSuccess(): Promise<boolean> {
    try {
      const heading = await this.getPageHeadingText();
      return heading.toLowerCase().includes('my info') || heading.toLowerCase().includes('personal');
    } catch {
      return false;
    }
  }

  /**
   * Wait for immigration records to load
   */
  async waitForImmigrationRecordsToLoad(): Promise<void> {
    // Wait for the table or records to be visible
    await this.page.waitForLoadState('networkidle');
    await this.pause(1000); // Additional wait for dynamic content
  }
}
