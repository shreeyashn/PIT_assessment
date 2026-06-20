import { Page } from '@playwright/test';
import { ShopPageLocators } from '../pageobjects/shoppagelocators';

export class ShopPage extends ShopPageLocators {
  constructor(page: Page) {
    super(page);
  }

  async goToShopPage(): Promise<void> {
    await this.shopNavLink.click();
  }

  async addItemToCart(name: string, quantity: number): Promise<void> {
    const badgeText = await this.cartNavLink.innerText();
    const match = badgeText.match(/\((\d+)\)/);
    const startCount = match ? parseInt(match[1], 10) : 0;

    for (let i = 0; i < quantity; i++) {
      await this.buyButton(name).click();
      await this.cartNavLink.filter({ hasText: `(${startCount + i + 1})` }).waitFor();
    }
  }
}
