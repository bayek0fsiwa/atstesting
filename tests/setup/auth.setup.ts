import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

const authFile = 'playwright/.auth/authState.json';

setup('Authenticate and save session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/auth/signin');
    await loginPage.login(
        process.env.TEST_USER as string,
        process.env.TEST_PASSWORD as string
    );
    await expect(page).toHaveURL(process.env.BASE_URL as string);
    // await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    await page.context().storageState({ path: authFile });
});