import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types/product";

export interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  products: Product[];
  addToCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getTotalPrice: (shipping: number) => number;
}

/**
 * CartContext holds the cart state and methods to manipulate the cart.
 * It provides the list of cart items, product details,
 * and helper functions for adding, updating, removing items,
 * clearing the cart, and calculating totals.
 */
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/**
 * Custom hook to consume CartContext safely.
 * Throws an error if used outside CartProvider.
 *
 * @returns {CartContextType} The cart context value.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

/**
 * CartProvider component that manages cart state,
 * persists it to localStorage,
 * fetches product details for cart items,
 * and provides cart manipulation methods.
 *
 * @param {React.ReactNode} children - Child components to wrap.
 * @returns {JSX.Element} The context provider with value.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /**
   * Cart state holding minimal info: product id and quantity.
   * Initialized from localStorage or empty array.
   */
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  /**
   * Products state holds detailed info fetched from API
   * for each product currently in the cart.
   */
  const [products, setProducts] = useState<Product[]>([]);

  /**
   * Persist cart state to localStorage whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Fetch detailed product data from API for all product IDs in the cart.
   * Updates the products state with the fetched data.
   * Clears products if cart is empty.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Promise.all(
          cart.map((item) =>
            fetch(`https://dummyjson.com/products/${item.id}`).then((r) =>
              r.json()
            )
          )
        );
        setProducts(res);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    if (cart.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cart]);

  /**
   * Adds a product to the cart.
   * If product already exists, increments quantity by 1.
   *
   * @param {number} productId - The ID of the product to add.
   */
  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  /**
   * Updates the quantity of a given product in the cart.
   *
   * @param {number} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity value.
   */
  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  /**
   * Removes a product entirely from the cart.
   *
   * @param {number} productId - The ID of the product to remove.
   */
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  /**
   * Clears all items from the cart and removes data from localStorage.
   */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  /**
   * Calculates the total quantity of all items in the cart.
   *
   * @returns {number} The sum of quantities of all cart items.
   */
  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Calculates the total price of all cart items plus shipping.
   *
   * @param {number} shipping - The shipping cost to add.
   * @returns {number} The total price including shipping.
   */
  const getTotalPrice = (shipping: number) => {
    return (
      cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? sum + product.price * item.quantity : sum;
      }, 0) + shipping
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
