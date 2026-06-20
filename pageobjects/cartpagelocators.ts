import { type Locator } from '@playwright/test';
import { BasePage } from '../base/base';

export class CartPageLocators extends BasePage {
  cartRow(name: string): Locator {
    return this.page.locator('tr.cart-item').filter({ hasText: name });
  }

  itemUnitPrice(name: string): Locator {
    return this.cartRow(name).locator('td').nth(1);
  }

  itemSubtotal(name: string): Locator {
    return this.cartRow(name).locator('td').nth(3);
  }

  get cartTotal(): Locator {
    return this.page.locator('strong.total');
  }
}
