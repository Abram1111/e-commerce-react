import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";

/**
 * CartSummary Component
 *
 * Displays the order summary including subtotal, shipping options, delivery address input,
 * and total price calculation. Uses CartContext to access cart data and total price calculation.
 *
 * State:
 * - shipping: shipping cost selected by the user (default $5)
 * - address: delivery address input by the user
 *
 * Features:
 * - Calculates subtotal using getTotalPrice with shipping cost included
 * - Calculates total price (subtotal + shipping)
 * - Validates cart is not empty and address is provided before checkout
 * - Alerts user on checkout success or missing information
 *
 * @component
 * @returns JSX.Element
 */
const CartSummary = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext is undefined");
  }
  const { cart, getTotalPrice } = cartContext;
  const [shipping, setShipping] = useState(5);
  const [address, setAddress] = useState("");

  const subTotal = getTotalPrice(shipping);
  const total = subTotal + shipping;

  const handleCheckout = () => {
    if (!cart.length) return alert("Your cart is empty!");
    if (!address.trim()) return alert("Please fill in your address!");
    alert("Thank you for your purchase!");
  };

  return (
    <div className="border p-3 rounded bg-light">
      <h4>Summary</h4>
      <hr />
      <p>SUB TOTAL: ${subTotal.toFixed(2)}</p>

      <label>SHIPPING</label>
      <select
        className="form-select mb-3"
        value={shipping}
        onChange={(e) => setShipping(parseFloat(e.target.value))}
      >
        <option value={5}>Standard Delivery - $5.00</option>
        <option value={10}>Express Delivery - $10.00</option>
      </select>

      <label>DELIVERY ADDRESS</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <h5>TOTAL PRICE: ${total.toFixed(2)}</h5>
      <button className="btn btn-dark w-100 mt-3" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
