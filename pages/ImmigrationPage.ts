import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Immigration Page Object Model
 * Contains all locators and methods related to immigration/passport details
 */
export class ImmigrationPage extends BasePage {
  // Immigration section locators
  readonly immigrationHeading = '//h6[contains(text(), "Immigration")]';
  readonly addButton = 'button:has-text("Add")';
  readonly editButton = 'button:has-text("Edit")';
  readonly deleteButton = 'button:has-text("Delete")';
  
  // Document type locators
  readonly documentTypeDropdown = '//label[contains(text(), "Document Type")]/following::div[contains(@class, "oxd-select")][1]';
  readonly documentNumberField = '//label[contains(text(), "Number")]/following::input[1]';
  readonly issuedDateField = '//label[contains(text(), "Issued Date")]/following::input[1]';
  readonly expiryDateField = '//label[contains(text(), "Expiry Date")]/following::input[1]';
  readonly issuanceCountryField = '//label[contains(text(), "Issuance Country")]/following::div[contains(@class, "oxd-select")][1]';
  readonly expiryDateComments = '//label[contains(text(), "Expiry Date Comments")]/following::textarea[1]';
  
  // Table and record locators
  readonly immigrationTable = '.orangehrm-table';
  readonly tableRows = '.orangehrm-table tbody tr';
  readonly tableCell = '.orangehrm-table-cell';
  readonly emptyStateMessage = '//span[contains(text(), "No Records Found")]';
  
  // Passport specific locators
  readonly passportOption = '//span[contains(text(), "Passport")]';
  readonly passportTypeRows = 'tbody tr:has(td:contains("Passport"))';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Verify immigration page is loaded
   */
  async verifyImmigrationPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.immigrationTable, 8000);
      return true;
    } catch {
      // If table not found, check for empty state
      try {
        await this.waitForElement(this.emptyStateMessage, 5000);
        return true;
      } catch {
        return false;
      }
    }
  }

  /**
   * Check if passport records exist
   */
  async hasPassportRecords(): Promise<boolean> {
    try {
      const rows = await this.page.locator(this.tableRows);
      const count = await rows.count();

      if (count === 0) {
        return false;
      }

      // Check if any row contains "Passport"
      for (let i = 0; i < count; i++) {
        const rowText = await rows.nth(i).textContent();
        if (rowText && rowText.includes('Passport')) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Check if no records are displayed
   */
  async isNoRecordsDisplayed(): Promise<boolean> {
    try {
      return await this.isElementVisible(this.emptyStateMessage);
    } catch {
      return false;
    }
  }

  /**
   * Get all passport records
   */
  async getPassportRecords(): Promise<Record<string, string>[]> {
    const records: Record<string, string>[] = [];

    try {
      const rows = await this.page.locator(this.tableRows);
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();

        // Check if this is a passport record
        if (rowText && rowText.includes('Passport')) {
          const cells = await row.locator('td');
          const cellCount = await cells.count();

          const record: Record<string, string> = {};

          // Extract data from cells
          for (let j = 0; j < cellCount; j++) {
            const cellText = await cells.nth(j).textContent();
            if (cellText) {
              record[`column_${j}`] = cellText.trim();
            }
          }

          records.push(record);
        }
      }
    } catch (error) {
      console.error('Error getting passport records:', error);
    }

    return records;
  }

  /**
   * Get number of records in the table
   */
  async getRecordCount(): Promise<number> {
    try {
      const rows = await this.page.locator(this.tableRows);
      return rows.count();
    } catch {
      return 0;
    }
  }

  /**
   * Click on first passport record
   */
  async clickFirstPassportRecord(): Promise<void> {
    try {
      const rows = await this.page.locator(this.tableRows);
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const rowText = await row.textContent();

        if (rowText && rowText.includes('Passport')) {
          await row.click();
          break;
        }
      }
    } catch (error) {
      console.error('Error clicking passport record:', error);
      throw error;
    }
  }

  /**
   * Get passport details from first record
   */
  async getFirstPassportDetails(): Promise<Record<string, string>> {
    const details: Record<string, string> = {};

    try {
      await this.clickFirstPassportRecord();
      await this.page.waitForLoadState('networkidle');

      // Extract details from form fields
      if (await this.elementExists(this.documentNumberField)) {
        details['documentNumber'] = await this.page.locator(this.documentNumberField).inputValue();
      }

      if (await this.elementExists(this.issuedDateField)) {
        details['issuedDate'] = await this.page.locator(this.issuedDateField).inputValue();
      }

      if (await this.elementExists(this.expiryDateField)) {
        details['expiryDate'] = await this.page.locator(this.expiryDateField).inputValue();
      }

      if (await this.elementExists(this.issuanceCountryField)) {
        details['issuanceCountry'] = await this.getElementText(this.issuanceCountryField);
      }
    } catch (error) {
      console.error('Error getting first passport details:', error);
    }

    return details;
  }

  /**
   * Get all details from the immigration section table
   */
  async getAllImmigrationDetails(): Promise<string[]> {
    const details: string[] = [];

    try {
      const rows = await this.page.locator(this.tableRows);
      const count = await rows.count();

      if (count === 0) {
        const emptyMsg = await this.getElementText(this.emptyStateMessage);
        details.push(emptyMsg);
      } else {
        for (let i = 0; i < count; i++) {
          const rowText = await rows.nth(i).textContent();
          if (rowText) {
            details.push(rowText.trim());
          }
        }
      }
    } catch (error) {
      console.error('Error getting immigration details:', error);
    }

    return details;
  }

  /**
   * Verify specific document type exists
   */
  async verifyDocumentTypeExists(documentType: string): Promise<boolean> {
    try {
      const rows = await this.page.locator(this.tableRows);
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const rowText = await rows.nth(i).textContent();
        if (rowText && rowText.includes(documentType)) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Take screenshot of immigration section
   */
  async captureImmigrationSection(fileName: string): Promise<void> {
    try {
      const section = await this.page.locator(this.immigrationTable);
      await section.screenshot({ path: `screenshots/${fileName}.png` });
    } catch (error) {
      console.error('Error capturing immigration section:', error);
    }
  }
}
