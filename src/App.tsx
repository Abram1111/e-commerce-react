// App.tsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/navBar";
import Register from "./pages/register";
import Login from "./pages/login";
import Footer from "./components/footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getCartCount } from "./utils/cart";
import { useCart } from "./context/cartContext";
import AllProductsPage from "./pages/allProducts";
import ProductDetailsPage from "./pages/productDetails";
import Cart from "./pages/cart";

interface User {
  firstName: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartCount(getCartCount());
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const { clearCart } = useCart(); // ✅ This is safe now

  const handleLogout = () => {
    localStorage.removeItem("user");
    clearCart(); // Clears cart from context/localStorage
    setUser(null);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
