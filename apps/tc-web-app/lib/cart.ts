export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  qty: number;
}

export function parseMenuPrice(price: string) {
  return Number.parseFloat(price.replace(/[^0-9.]/g, ""));
}
