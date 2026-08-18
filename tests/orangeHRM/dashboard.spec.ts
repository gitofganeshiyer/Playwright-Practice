import { expect, test } from '../../fixtures/pagefixtureOrangeCRM';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { TEST_CREDENTIALS } from '../../config/testConfig';

test.describe('OrangeHRM Dashboard', () => {
  test('dashboard displays its expected widgets', async ({ dashboardPage, loginPage}) => { 

    await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
    for (const widgetName of [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location',
    ]) {
      await expect(dashboardPage.widget(widgetName)).toBeVisible();    }

    await expect(dashboardPage.widget('Quick Launch').getByRole('button')).toHaveCount(6);
  });

  test('navigation search filters and restores menu items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
    await dashboardPage.searchNavigation('Leave');

    await expect(dashboardPage.navigationLink('Leave')).toBeVisible();
    await expect(dashboardPage.navigationLink('Admin')).toBeHidden();

    await dashboardPage.clearNavigationSearch();
    await expect(dashboardPage.navigationLink('Admin')).toBeVisible();
  });
});
