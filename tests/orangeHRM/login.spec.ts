import { test, expect } from "../../fixtures/pagefixtureOrangeCRM";
import { TEST_CREDENTIALS, TEST_URLS } from '../../config/testConfig';

test.describe("OrangeHRM Login Tests", () => { 
 
  test("Login with valid credentials", async ({ loginPage, dashboardPage }) => {
      await loginPage.navigateToLoginPage();
      await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
      await dashboardPage.waitForDashboard();      
      await expect(dashboardPage.pageHeading).toHaveText('Dashboard');
      await expect(dashboardPage.navigationLinks.first()).toBeVisible();
  });

  test('invalid credentials keep the user on the login page', async ({ loginPage, page }) => {   
      await loginPage.navigateToLoginPage();
      await loginPage.login(TEST_CREDENTIALS.wrongusername, TEST_CREDENTIALS.wrongpassword);
  
      await expect(page).toHaveURL(TEST_URLS.loginPage);
      await expect(loginPage.loginErrorMessage).toContainText('Invalid credentials');
    });

});