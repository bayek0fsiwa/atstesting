import { Page, Locator, expect } from '@playwright/test';

export class HistoryPage {
    readonly page: Page;
    readonly historyCards: Locator;
    readonly firstCardFileName: Locator;
    readonly firstCardScore: Locator;

    constructor(page: Page) {
        this.page = page;
        this.historyCards = page.locator('[data-slot="card"]');
        this.firstCardFileName = this.historyCards.first().locator('[data-slot="card-title"] .truncate');
        this.firstCardScore = this.historyCards.first().locator('[data-slot="badge"]');
    }

    async navigateToHistory() {
        await this.page.goto('/history');
        await expect(this.historyCards.first()).toBeVisible({ timeout: 10000 });
    }
}