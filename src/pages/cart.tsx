// pages/Cart.tsx
import CartItems from "../components/cartItems";
import CartSummary from "../components/cartSummary";

const Cart = () => {
  return (
    <div className="container my-5">
      <h2>Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          <CartItems />
        </div>
        <div className="col-md-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
