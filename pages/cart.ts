import { Page } from '@playwright/test';
import { CartPageLocators } from '../pageobjects/cartpagelocators';

export class CartPage extends CartPageLocators {
  constructor(page: Page) {
    super(page);
  }

  async goToCartPage(): Promise<void> {
    await this.cartNavLink.click();
  }

  private price(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getItemUnitPrice(name: string): Promise<number> {
    return this.price(await this.itemUnitPrice(name).innerText());
  }

  async getItemSubtotal(name: string): Promise<number> {
    return this.price(await this.itemSubtotal(name).innerText());
  }

  async getCartTotal(): Promise<number> {
    return this.price(await this.cartTotal.innerText());
  }
}
