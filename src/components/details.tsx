import React from "react";

import type { Product } from "../types/product";

interface DetailsProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

/**
 * Details Component
 *
 * Displays detailed information about a single product including:
 * - Product image
 * - Category and title
 * - Price with discount percentage
 * - Description, stock count, and rating
 * - A back button to navigate to the previous page
 * - An "Add to Cart" button that triggers a callback with the product ID
 *
 * Props:
 * @param {Product} product - The product object to display details for
 * @param {(productId: number) => void} onAddToCart - Callback invoked when "Add to Cart" is clicked
 *
 * @component
 * @returns JSX.Element
 */
const Details: React.FC<DetailsProps> = ({ product, onAddToCart }) => {
  return (
    <div className="container mw-75 mx-auto mt-5 mb-5 border rounded p-4">
      <div className="row g-4">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img
            src={product.thumbnail}
            className="img-fluid rounded"
            alt={product.title}
          />
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12">
          <button
            className="btn btn-light mb-3"
            onClick={() => window.history.back()}
          >
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <h6 className="text-secondary small">{product.category}</h6>
          <h5 className="text-secondary small">{product.title}</h5>
          <h2 className="fw-bold d-flex align-items-center gap-3">
            ${product.price}
            <span className="fs-6 text-danger">
              {product.discountPercentage}%
            </span>
          </h2>
          <p className="text-muted">{product.description}</p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {product.rating}
          </p>
          <button
            className="btn grad-color w-100 mt-3"
            onClick={() => onAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
