/**
 * Cart utility functions
 *
 * Provides helpers for interacting with localStorage‑based cart data, including:
 * • Retrieving and updating the cart array
 * • Incrementing quantity (or adding) when a product is added
 * • Getting the current logged‑in user from localStorage
 * • Calculating total quantity of items in the cart
 *
 * Data shape
 * ────────────────────────────────────────────────────────────────────────────
 * Cart is stored in localStorage under the key `"cart"` as:
 *   [{ id: number, quantity: number }, ...]
 */

export interface CartItem {
  id: number;
  quantity: number;
}

/**
 * Read the cart array from localStorage.
 * @returns CartItem[] – Parsed cart array, or empty array if none.
 */
export function getCartFromStorage(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

/**
 * Add a product to the cart (or increase its quantity by 1) and persist.
 *
 * @param cart       Existing cart array (will be mutated and returned)
 * @param productId  Product ID to add/increment
 * @returns CartItem[] – Updated cart array
 */
export function updateCart(cart: CartItem[], productId: number): CartItem[] {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

/**
 * Retrieve the logged‑in user object from localStorage (or null if none).
 * @returns any – Parsed user object or null.
 */
export function getUserFromStorage() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

/**
 * Calculate the total quantity of all items currently in the cart.
 * @returns number – Sum of quantities.
 */
export function getCartCount(): number {
  const cart = getCartFromStorage();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
