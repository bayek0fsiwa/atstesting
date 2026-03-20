import { Page, Locator, expect } from '@playwright/test';

export class ResumePage {
    readonly page: Page;
    readonly fileInput: Locator;
    readonly submitBtn: Locator;
    readonly loaderBlock: Locator;
    readonly resultHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('input[type="file"]');
        this.submitBtn = page.getByRole('button', { name: 'Score my Resume →' });
        this.loaderBlock = page.locator('.lucide-loader-pinwheel.animate-spin');
        this.resultHeading = page.getByRole('heading', { name: 'Evaluation Results' });
    }

    async uploadResume(filePath: string) {
        await this.fileInput.setInputFiles(filePath);
    }

    async submitAndWaitForData() {
        await this.submitBtn.click();
        await expect(this.loaderBlock).toBeVisible();
        await expect(this.loaderBlock).toBeHidden({ timeout: 30000 });
        await expect(this.resultHeading).toBeVisible({ timeout: 50000 });
    }
}
