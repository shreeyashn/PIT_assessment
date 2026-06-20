import { test, expect } from '../../fixtures';
import { cartItems } from '../../testdata/shopitems';

test.describe('Cart - Price and Subtotal Verification', () => {
  test('TC3: cart subtotals and total correctly reflect unit price and quantity for each item', async ({ shopPage, cartPage }) => {
    for (const item of cartItems) {
      await shopPage.addItemToCart(item.name, item.quantity);
    }

    await cartPage.goToCartPage();

    let subtotalSum = 0;

    for (const item of cartItems) {
      const unitPrice = await cartPage.getItemUnitPrice(item.name);
      const expectedSubtotal = +(unitPrice * item.quantity).toFixed(2);
      const actualSubtotal = await cartPage.getItemSubtotal(item.name);

      expect(actualSubtotal, `${item.name}: subtotal should be ${expectedSubtotal}`).toBeCloseTo(expectedSubtotal, 2);
      subtotalSum = +(subtotalSum + actualSubtotal).toFixed(2);
    }

    const displayedTotal = await cartPage.getCartTotal();
    expect(displayedTotal, `Cart total should equal sum of subtotals (${subtotalSum})`).toBeCloseTo(subtotalSum, 2);
  });
});
