import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

interface User {
  firstName: string;
}

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

/**
 * Navbar Component
 *
 * Renders the top navigation bar with links to Home, Products, Contact Us,
 * and authentication-related actions (login/logout/signup).
 *
 * Features:
 * - Shows user's first name and logout button if user is logged in
 * - Displays cart icon with badge showing total quantity of items in cart
 * - Responsive with a hamburger menu toggle for smaller screens
 * - Uses React Router's Link for client-side navigation
 *
 * @param {NavbarProps} props - Component props
 * @param {User|null} props.user - Currently logged-in user or null if not logged in
 * @param {() => void} props.onLogout - Logout handler function
 * @returns JSX.Element
 */
const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const { cart } = useCart();

  // Calculate total quantity from cart items
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg sticky-top grad-color">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Tech Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#contact">
                Contact Us
              </a>
            </li>
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link position-relative"
                    to="/cart"
                    title="Cart"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    {cartCount > 0 && (
                      <span
                        className="cart-count badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">{user.firstName}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
