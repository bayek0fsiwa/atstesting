import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { HomePage } from '../../../src/pages/HomePage';

test.describe('Logout Functionality Tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/auth/signin');
        await loginPage.login(
            process.env.TEST_USER as string,
            process.env.TEST_PASSWORD as string
        );
        const scoreNewBtn = page.getByRole("button", { name: "Score a new resume →" });
        await expect(scoreNewBtn).toBeVisible();
        await expect(page).toHaveURL(process.env.BASE_URL as string);
    });
    test('User should be able to logout successfully from home', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.logout();
        await expect(page).toHaveURL(/.*signin/);
        // (Optional but good) Verify karein ki back button dabane se wapas andar nahi ja raha
        await page.goBack();
        await expect(page).toHaveURL(/.*signin/); // URL wahi rehna chahiye
    });
});