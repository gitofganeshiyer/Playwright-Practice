import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { ImmigrationPage } from '../pages/ImmigrationPage';
import { TEST_CREDENTIALS } from '../config/testConfig';

test.describe('OrangeHRM - My Info and Immigration Details', () => {
  let loginPage: LoginPage;
  let myInfoPage: MyInfoPage;
  let immigrationPage: ImmigrationPage;
  let isImmigrationLoaded = false;

test.beforeEach(async ({ page }) => {
  /**
   * Initialize page objects before each test
   */
  loginPage = new LoginPage(page);
  myInfoPage = new MyInfoPage(page);
  immigrationPage = new ImmigrationPage(page);

  // Set viewport for consistent testing
  await page.setViewportSize({ width: 1280, height: 720 });
}); 


test('TC001: Login and verify My Info page navigation with passport details check', async ({ page, context }) => {
// Pause at the start of the test for debugging
   /* await using har = await context.tracing.startHar('checkout-trace.har', {
    content: 'embed',       // Embed response bodies in the HAR file
    mode: 'full',           // Capture full request/response
    //urlFilter: //'api/**', // Only record API calls
  });

  test.info().annotations.push({
    type: 'Test Case',
    description: 'Login to OrangeHRM and verify passport details in Immigration section',
  }); */


  // Step 1: Navigate to login page
  test.step('Navigate to login page', async () => {
    //await loginPage.navigateToLoginPage();
    page.pause(); // Pause here to inspect the page before navigation
    await loginPage.navigateTo('https://google.com');
    
    const isLoginPageLoaded = await loginPage.verifyLoginPageLoaded();
    expect(isLoginPageLoaded).toBe(true);
    console.log('✓ Login page loaded successfully');
  });

    // Verify login page is loaded
    

   test.step('Perform login', async () => {
    console.log('Step 2: Logging in with credentials');
    await loginPage.loginWithVerification(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
    await page.waitForLoadState('networkidle', {timeout: 15000});
    await page.waitForLoadState('domcontentloaded', {timeout: 15000});
    await page.waitForTimeout(7000);
    console.log('✓ Login successful');
    });
    // Wait for dashboard to be fully loaded
    

      // Step 3: Navigate to My Info
      test.step('Navigate to My Info', async () => {
        await myInfoPage.navigateToMyInfo();
        const isMyInfoPageLoaded = await myInfoPage.verifyMyInfoPageLoaded();
        expect(isMyInfoPageLoaded).toBe(true);
        console.log('✓ My Info page loaded successfully');

      // Get and log employee information
      const employeeName = await myInfoPage.getEmployeeName();
      const employeeID = await myInfoPage.getEmployeeID();
      console.log(`Employee Name: ${employeeName}`);
      console.log(`Employee ID: ${employeeID}`);
   });

     

    // Step 4: Navigate to Immigration section
    test.step('Navigate to Immigration section', async () => {
      await myInfoPage.navigateToImmigrationSection();
      await myInfoPage.waitForImmigrationRecordsToLoad();
      console.log('✓ Immigration section loaded');
    });

    // Step 5: Verify immigration page is loaded
     test.step('Verify immigration page is loaded', async () => {
      isImmigrationLoaded = await immigrationPage.verifyImmigrationPageLoaded();
      expect(isImmigrationLoaded).toBe(true);
      console.log('✓ Immigration page verified');
    });
    

    // Step 6: Check for passport details
    test.step('Check for passport details', async () => {
      console.log('Step 6: Checking for passport details');
      const hasPassportRecords = await immigrationPage.hasPassportRecords();

      if (hasPassportRecords) {
        console.log('✓ Passport records found');

        // Get all immigration details
        const allDetails = await immigrationPage.getAllImmigrationDetails();
        console.log('Immigration Records:', allDetails);

        // Get specific passport records
        const passportRecords = await immigrationPage.getPassportRecords();
        console.log('Passport Records:', JSON.stringify(passportRecords, null, 2));

        // Get record count
        const recordCount = await immigrationPage.getRecordCount();
        console.log(`Total Records: ${recordCount}`);

        // Verify passport document type exists
        const passportExists = await immigrationPage.verifyDocumentTypeExists('Passport');
        expect(passportExists).toBe(true);
        console.log('✓ Passport document type verified');

        // Verify that passport details are available
        const passportDetailsAvailable = await myInfoPage.isPassportDetailsAvailable();
        expect(passportDetailsAvailable).toBe(true);
        console.log('✓ Passport details are available');

        // Take screenshot of immigration section
        await immigrationPage.captureImmigrationSection('immigration_section_with_passport');
      } else {
        const noRecordsMsg = await immigrationPage.isNoRecordsDisplayed();
        if (noRecordsMsg) {
          console.log('ℹ No passport records found - "No Records Found" message displayed');
          console.log('⚠ Warning: No passport details available for this employee');

          // Take screenshot showing no records
          await immigrationPage.captureImmigrationSection('immigration_section_no_records');

          // This is still a valid test case - the page loaded successfully
          expect(isImmigrationLoaded).toBe(true);
        } else {
          // No records but also no error message - page loaded successfully
          console.log('ℹ Immigration section loaded but no records or message visible');
          expect(isImmigrationLoaded).toBe(true);
        }
      }

    // Step 7: Verification complete
    console.log('✓ Test case completed successfully');
    });
  });
  

  test.skip('TC002: Detailed check of My Info navigation and section visibility', async ({ page }) => {
    test.info().annotations.push({
      type: 'Test Case',
      description: 'Verify My Info navigation and all sections are accessible',
    });

    test.step('Navigate and login', async () => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
      await page.waitForTimeout(2000);
    });

    test.step('Access My Info', async () => {
      console.log('Step 2: Access My Info');
      await myInfoPage.navigateToMyInfo();
      const navigationSuccess = await myInfoPage.verifyNavigationSuccess();
      expect(navigationSuccess).toBe(true);
      console.log('✓ Navigation to My Info successful');
    });

    test.step('Verify Immigration section visibility', async () => {
      console.log('Step 3: Verify Immigration section is visible');
      const isImmigrationVisible = await myInfoPage.isImmigrationSectionVisible();
      expect(isImmigrationVisible).toBe(true);
      console.log('✓ Immigration section is visible in the menu');
    });

    test.step('Access Immigration section', async () => {
      console.log('Step 4: Access Immigration section');
      await myInfoPage.navigateToImmigrationSection();
      await page.waitForTimeout(2000);
      // Scroll to see the entire table
      const table = page.locator('.orangehrm-table');
      await table.scrollIntoViewIfNeeded();
      console.log('✓ Test case completed successfully');
    });    
  });

  test.skip('TC003: Passport details extraction and verification', async ({ page }) => {
    test.info().annotations.push({
      type: 'Test Case',
      description: 'Extract and verify passport details from immigration section',
    });

    test.step('Login and navigate to My Info', async () => {
      console.log('Step 1: Login process');
      await loginPage.navigateToLoginPage();
      await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
      await page.waitForTimeout(2000);
    });

    test.step('Navigate to My Info and Immigration', async () => {
      console.log('Step 2: Navigate to My Info and Immigration');
      await myInfoPage.navigateToMyInfo();
      await myInfoPage.navigateToImmigrationSection();
      await myInfoPage.waitForImmigrationRecordsToLoad();
      const isLoaded = await immigrationPage.verifyImmigrationPageLoaded();
      expect(isLoaded).toBe(true);
    });

   
    test.step('Check passport records and extract details', async () => {

      console.log('Step 3: Check passport records');
      const hasPassportRecords = await immigrationPage.hasPassportRecords();

      if (hasPassportRecords) {
        const recordCount = await immigrationPage.getRecordCount();
        expect(recordCount).toBeGreaterThan(0);
        console.log(`✓ Found ${recordCount} immigration records`);

        const allDetails = await immigrationPage.getAllImmigrationDetails();
        console.log('All Immigration Details:', allDetails);

        // Log each detail
        allDetails.forEach((detail, index) => {
          console.log(`Record ${index + 1}: ${detail}`);
        });
      } else {
        console.log('ℹ No passport records found');
        const noRecords = await immigrationPage.isNoRecordsDisplayed();
        console.log(`No records message displayed: ${noRecords}`);
      }

      console.log('✓ Test case completed successfully');
    });
  });
});