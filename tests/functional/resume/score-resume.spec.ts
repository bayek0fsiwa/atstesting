import path from 'node:path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { ResumePage } from '../../../src/pages/ResumePage';
import { HistoryPage } from '../../../src/pages/HistoryPage';

test.describe('Resume Upload and Scoring Functionality', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/auth/signin');
        await loginPage.login(
            process.env.TEST_USER as string,
            process.env.TEST_PASSWORD as string
        );
        const scoreNewBtn = page.getByRole("button", { name: "Score a new resume →" });
        await expect(scoreNewBtn).toBeVisible();
        await expect(page).toHaveURL(new RegExp(`${process.env.BASE_URL}/?`));
    });

    test('Should successfully upload a resume, process it, and display the score', async ({ page }) => {
        const uploadPage = new ResumePage(page);
        const resumePath = path.join(process.cwd(), 'test-data', 'dummy.pdf');
        const scoreNewBtn = page.getByRole("button", { name: "Score a new resume →" });
        await scoreNewBtn.click();
        await expect(page).toHaveURL("/resumes");
        await expect(uploadPage.submitBtn).toBeVisible();
        await uploadPage.uploadResume(resumePath);
        console.log("📄 File attached successfully.");
        await expect(uploadPage.submitBtn).toBeEnabled();
        await uploadPage.submitAndWaitForData();
        console.log("⚙️ Processing complete, data returned.");

        // Step 4: Page-specific assertions
        // const scoreText = await page.locator('.score-value').innerText();
        // expect(Number(scoreText)).toBeGreaterThan(0);
    });

    test.skip('Validation Check: UI should reject non-PDF files and disable submit', async ({ page }) => {
        const uploadPage = new ResumePage(page);
        const invalidFilePath = path.join(process.cwd(), 'test-data', 'image.png');
        const scoreNewBtn = page.getByRole("button", { name: "Score a new resume →" });
        await scoreNewBtn.click();
        await expect(page).toHaveURL("/resumes");
        await expect(uploadPage.submitBtn).toBeVisible();
        await uploadPage.uploadResume(invalidFilePath);
        await expect(uploadPage.submitBtn).toBeDisabled();
    });

    test('Verify in history', async ({ page }) => {
        const historyPage = new HistoryPage(page);
        await historyPage.navigateToHistory();
        const actualFileName = await historyPage.firstCardFileName.innerText();
        const actualScore = await historyPage.firstCardScore.innerText();
        const cleanFileName = actualFileName.trim();
        const cleanScore = actualScore.trim();
        expect(cleanFileName).toBe('dummy.pdf');
        expect(cleanScore.length).toBeGreaterThan(0);
        expect(cleanScore).toContain('%');
        console.log(`✅ History verified: Found ${cleanFileName} with score ${cleanScore}`);
    });
});
