import React from "react";
import { useCart } from "../context/cartContext";

/**
 * CartItems Component
 *
 * Displays the list of items currently in the shopping cart.
 * Each cart item shows the product thumbnail, title, price, and quantity.
 * Users can update the quantity or remove items from the cart directly here.
 *
 * Utilizes the `useCart` context to access:
 * - cart: the list of cart items with id and quantity
 * - products: detailed product data including price and thumbnail
 * - updateQuantity: function to update the quantity of a specific cart item
 * - removeFromCart: function to remove an item from the cart
 *
 * If the cart is empty, it displays a message indicating so.
 *
 * @component
 * @returns JSX.Element
 */
const CartItems: React.FC = () => {
  const { cart, products, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      {cart.map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return null;

        return (
          <div
            key={item.id}
            className="d-flex align-items-center mb-3 border-bottom pb-3"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: 100 }}
              className="me-3"
            />
            <div className="d-flex flex-wrap align-items-center justify-content-between flex-grow-1">
              <h6 className="mb-0 me-3">{product.title}</h6>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                }
                className="form-control form-control-sm me-3"
                style={{ width: 60 }}
              />
              <p className="mb-0 me-3">${product.price}</p>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                &times;
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
