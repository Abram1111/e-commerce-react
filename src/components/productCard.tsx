import React from "react";
import { useCart } from "../context/cartContext";
import { getUserFromStorage } from "../utils/cart";

import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 *
 * Displays a product thumbnail, basic details, and action buttons.
 *
 * Features:
 * - Shows product image, category, discount, price, stock, and title
 * - “Details” button links to the product‑details page
 * - “Add to Cart” button checks if a user is logged in:
 *     • If not logged in → alert + redirects to /login
 *     • If logged in → adds the product to cart via CartContext
 *
 * @param {Product} product - The product data to display
 * @component
 * @returns JSX.Element
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: number) => {
    const user = getUserFromStorage();
    if (!user) {
      alert("You must login to add to cart");
      window.location.href = "/login";
      return;
    }
    addToCart(productId);
  };

  return (
    <div className="card h-100 w-100">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        style={{ objectFit: "contain", height: "200px" }}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">{product.category}</span>
          <span className="text-danger">-{product.discountPercentage}%</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <strong>{product.title}</strong>
          <span>${product.price}</span>
        </div>
        <div className="d-flex justify-content-end mb-2">
          <small className="text-muted">Available: {product.stock}</small>
        </div>
        <div className="text-center">
          <a
            href={`/product-details/${product.id}`}
            className="btn grad-color btn-sm me-2"
          >
            Details
          </a>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
