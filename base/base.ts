import { type Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartNavLink(): Locator {
    return this.page.locator('#nav-cart a');
  }

  async navigateToHome(): Promise<void> {
    await this.page.goto('/');
  }
}
