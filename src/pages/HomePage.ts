import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  private readonly createProjectBtn: Locator;
  private readonly projectNameInput: Locator;
  private readonly submitBtn: Locator;
  private readonly successToast: Locator;
  private readonly userProfileMenu: Locator;
  private readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createProjectBtn = page.getByRole('button', { name: 'Create Project' });
    this.projectNameInput = page.getByPlaceholder('Enter project name');
    this.submitBtn = page.getByRole('button', { name: 'Save' });
    this.successToast = page.getByText('Project created successfully');
    this.userProfileMenu = page.getByTestId('user-menu');
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
  }

  async createNewProject(projectName: string) {
    await this.createProjectBtn.click();
    await this.projectNameInput.fill(projectName);
    await this.submitBtn.click();
  }

  async verifyProjectCreated() {
    await expect(this.successToast).toBeVisible();
  }

  async logout() {
    await this.userProfileMenu.click();
    await this.logoutBtn.click();
  }
}