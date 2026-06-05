/**
 * USAGE GUIDE FOR PAGE OBJECT MODEL FRAMEWORK
 * 
 * This file demonstrates how to use the Page Object Model framework
 * for testing OrangeHRM application.
 */

// ============================================
// IMPORT STATEMENTS
// ============================================

import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { MyInfoPage } from './pages/MyInfoPage';
import { ImmigrationPage } from './pages/ImmigrationPage';

// ============================================
// EXAMPLE 1: BASIC LOGIN TEST
// ============================================

test('Example: Basic Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate to login page
  await loginPage.navigateToLoginPage();
  
  // Verify login page is loaded
  const isLoaded = await loginPage.verifyLoginPageLoaded();
  expect(isLoaded).toBe(true);
  
  // Perform login
  await loginPage.login('admin', 'admin123');
});

// ============================================
// EXAMPLE 2: NAVIGATE TO MY INFO
// ============================================

test('Example: Navigate to My Info', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myInfoPage = new MyInfoPage(page);
  
  // Login first
  await loginPage.navigateToLoginPage();
  await loginPage.login('admin', 'admin123');
  await page.waitForTimeout(2000);
  
  // Navigate to My Info
  await myInfoPage.navigateToMyInfo();
  
  // Verify navigation
  const isMyInfoLoaded = await myInfoPage.verifyMyInfoPageLoaded();
  expect(isMyInfoLoaded).toBe(true);
  
  // Get employee information
  const empName = await myInfoPage.getEmployeeName();
  const empID = await myInfoPage.getEmployeeID();
  
  console.log(`Employee: ${empName} (ID: ${empID})`);
});

// ============================================
// EXAMPLE 3: IMMIGRATION SECTION NAVIGATION
// ============================================

test('Example: Check Immigration Section', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myInfoPage = new MyInfoPage(page);
  const immigrationPage = new ImmigrationPage(page);
  
  // Login
  await loginPage.navigateToLoginPage();
  await loginPage.login('admin', 'admin123');
  await page.waitForTimeout(2000);
  
  // Navigate to My Info
  await myInfoPage.navigateToMyInfo();
  
  // Navigate to Immigration
  await myInfoPage.navigateToImmigrationSection();
  await page.waitForTimeout(2000);
  
  // Check if immigration page loaded
  const isLoaded = await immigrationPage.verifyImmigrationPageLoaded();
  expect(isLoaded).toBe(true);
  
  // Check for passport records
  const hasRecords = await immigrationPage.hasPassportRecords();
  
  if (hasRecords) {
    console.log('✓ Passport records found');
    
    // Get all records
    const allRecords = await immigrationPage.getAllImmigrationDetails();
    console.log('Records:', allRecords);
  } else {
    console.log('ℹ No passport records found');
  }
});

// ============================================
// EXAMPLE 4: EXTRACT PASSPORT DETAILS
// ============================================

test('Example: Extract Passport Details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const myInfoPage = new MyInfoPage(page);
  const immigrationPage = new ImmigrationPage(page);
  
  // Complete login and navigation
  await loginPage.navigateToLoginPage();
  await loginPage.login('admin', 'admin123');
  await page.waitForTimeout(2000);
  await myInfoPage.navigateToMyInfo();
  await myInfoPage.navigateToImmigrationSection();
  await page.waitForTimeout(2000);
  
  // Extract passport records
  const passportRecords = await immigrationPage.getPassportRecords();
  
  if (passportRecords.length > 0) {
    console.log('Passport Records Found:');
    passportRecords.forEach((record, index) => {
      console.log(`\nRecord ${index + 1}:`);
      console.log(JSON.stringify(record, null, 2));
    });
    
    // Verify passport document type
    const hasPassport = await immigrationPage.verifyDocumentTypeExists('Passport');
    expect(hasPassport).toBe(true);
  }
});

// ============================================
// EXAMPLE 5: COMPLETE WORKFLOW WITH ERROR HANDLING
// ============================================

test('Example: Complete Workflow', async ({ page }) => {
  try {
    const loginPage = new LoginPage(page);
    const myInfoPage = new MyInfoPage(page);
    const immigrationPage = new ImmigrationPage(page);
    
    console.log('📌 Starting OrangeHRM Automation Test...');
    
    // Step 1: Navigate to login
    console.log('\n[Step 1] Navigating to login page...');
    await loginPage.navigateToLoginPage();
    const isLoginPageVisible = await loginPage.verifyLoginPageLoaded();
    expect(isLoginPageVisible).toBe(true);
    console.log('✓ Login page loaded');
    
    // Step 2: Login
    console.log('\n[Step 2] Performing login...');
    await loginPage.login('admin', 'admin123');
    await page.waitForTimeout(2000);
    console.log('✓ Login successful');
    
    // Step 3: Navigate to My Info
    console.log('\n[Step 3] Navigating to My Info...');
    await myInfoPage.navigateToMyInfo();
    const isMyInfoLoaded = await myInfoPage.verifyMyInfoPageLoaded();
    expect(isMyInfoLoaded).toBe(true);
    console.log('✓ My Info page loaded');
    
    // Step 4: Get employee info
    console.log('\n[Step 4] Extracting employee information...');
    const empName = await myInfoPage.getEmployeeName();
    const empID = await myInfoPage.getEmployeeID();
    console.log(`✓ Employee: ${empName} (ID: ${empID})`);
    
    // Step 5: Navigate to Immigration
    console.log('\n[Step 5] Navigating to Immigration section...');
    await myInfoPage.navigateToImmigrationSection();
    await page.waitForTimeout(2000);
    console.log('✓ Immigration section loaded');
    
    // Step 6: Check passport details
    console.log('\n[Step 6] Checking passport details...');
    const hasPassport = await immigrationPage.hasPassportRecords();
    
    if (hasPassport) {
      console.log('✓ Passport records found');
      const recordCount = await immigrationPage.getRecordCount();
      console.log(`  - Total records: ${recordCount}`);
      
      const records = await immigrationPage.getPassportRecords();
      records.forEach((record, index) => {
        console.log(`  - Record ${index + 1}:`, record);
      });
    } else {
      const noRecords = await immigrationPage.isNoRecordsDisplayed();
      if (noRecords) {
        console.log('ℹ No records found - "No Records Found" message displayed');
      } else {
        console.log('ℹ Immigration section loaded but no visible records');
      }
    }
    
    console.log('\n✓ Test completed successfully!');
    
  } catch (error) {
    console.error('\n✗ Test failed with error:', error);
    // Take screenshot on error
    await page.screenshot({ path: 'screenshots/error_screenshot.png' });
    throw error;
  }
});

// ============================================
// COMMON BASE PAGE METHODS
// ============================================

/**
 * BasePage provides these methods to all page objects:
 * 
 * - navigateTo(url): Navigate to specific URL
 * - navigateToHome(): Navigate to base URL
 * - getElement(selector): Get element by selector
 * - fillInput(selector, text): Fill input field
 * - clickElement(selector): Click on element
 * - getElementText(selector): Get element text
 * - isElementVisible(selector): Check element visibility
 * - waitForElement(selector, timeout): Wait for element
 * - elementExists(selector): Check element existence
 * - pause(ms): Pause execution
 * - takeScreenshot(name): Capture screenshot
 * - getPageTitle(): Get page title
 * - reloadPage(): Reload page
 */

// ============================================
// PAGE SPECIFIC METHODS
// ============================================

/**
 * LoginPage methods:
 * - navigateToLoginPage()
 * - login(username, password)
 * - loginWithVerification(username, password)
 * - verifyLoginPageLoaded()
 * - getErrorMessage()
 * - isLogoDisplayed()
 * - clearInputs()
 */

/**
 * MyInfoPage methods:
 * - navigateToMyInfo()
 * - verifyMyInfoPageLoaded()
 * - navigateToImmigrationSection()
 * - isImmigrationSectionVisible()
 * - getPassportDetails()
 * - isPassportDetailsAvailable()
 * - getAllPassportRecords()
 * - getEmployeeName()
 * - getEmployeeID()
 * - verifyNavigationSuccess()
 */

/**
 * ImmigrationPage methods:
 * - verifyImmigrationPageLoaded()
 * - hasPassportRecords()
 * - isNoRecordsDisplayed()
 * - getPassportRecords()
 * - getRecordCount()
 * - clickFirstPassportRecord()
 * - getFirstPassportDetails()
 * - getAllImmigrationDetails()
 * - verifyDocumentTypeExists(documentType)
 * - captureImmigrationSection(fileName)
 */
