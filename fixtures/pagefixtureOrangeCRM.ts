import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";


type PageFixture = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage
};

export const test = base.extend<PageFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page); 
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  }

});
export { expect } from "@playwright/test";