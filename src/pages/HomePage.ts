import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  private readonly userProfileMenu: Locator;
  private readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userProfileMenu = page.locator('button[data-sidebar="menu-button"]');
    this.logoutBtn = page.getByRole('menuitem', { name: 'Log out' });
  }

  async logout() {
    await this.userProfileMenu.click();
    await this.logoutBtn.click();
  }
}