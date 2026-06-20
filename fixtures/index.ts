import { test as base, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact';
import { ShopPage } from '../pages/shop';
import { CartPage } from '../pages/cart';
export { expect };

type PageObjects = {
  contactPage: ContactPage;
  shopPage: ShopPage;
  cartPage: CartPage;
};

export const test = base.extend<PageObjects>({
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigateToHome();
    await contactPage.goToContactPage();
    await use(contactPage);
  },

  shopPage: async ({ page }, use) => {
    const shopPage = new ShopPage(page);
    await shopPage.navigateToHome();
    await shopPage.goToShopPage();
    await use(shopPage);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});
