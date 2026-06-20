export interface CartItem {
  name: string;
  quantity: number;
}

export const cartItems: CartItem[] = [
  { name: 'Stuffed Frog', quantity: 2 },
  { name: 'Fluffy Bunny', quantity: 5 },
  { name: 'Valentine Bear', quantity: 3 },
];
