import { type Locator } from '@playwright/test';
import { BasePage } from '../base/base';

export class ShopPageLocators extends BasePage {
  get shopNavLink(): Locator {
    return this.page.locator('#nav-shop a');
  }

  productCard(name: string): Locator {
    return this.page.locator('.product').filter({ hasText: name });
  }

  buyButton(name: string): Locator {
    return this.productCard(name).getByRole('link', { name: 'Buy' });
  }

}