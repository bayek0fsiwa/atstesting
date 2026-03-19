import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';

test.describe('Authentication Flow Tests', () => {

    test('User should see error with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto(process.env.BASE_URL + "/auth/signin");
        await loginPage.login(
            "wrongUser@gmail.com",
            "wrongpassword"
        );
        const errorMessage = page.getByText("Invalid email or password");
        await expect(errorMessage).toBeVisible();
    });

    test('User should be able to login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto(process.env.BASE_URL + "/auth/signin");
        await loginPage.login(
            process.env.TEST_USER!,
            process.env.TEST_PASSWORD!
        );
        const scoreNewBtn = page.getByRole("button", { name: "Score a new resume →" });
        await expect(scoreNewBtn).toBeVisible();
        await expect(page).toHaveURL(process.env.BASE_URL as string);
    });
});