import React from "react";
import ProductCard from "./productCard";

import type { Product } from "../types/product";

interface ProductDisplayProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * ProductDisplay Component
 *
 * Renders a paginated grid of ProductCard components.
 * Shows a “No products found” message if the list is empty.
 *
 * Props:
 * - products: array of products to display on the current page
 * - currentPage: current active page number (1‑based)
 * - totalPages: total number of pages available
 * - onPageChange: callback triggered when user selects a different page
 *
 * Pagination:
 * - Renders Bootstrap pagination controls only if totalPages > 1
 * - Highlights the active page and calls onPageChange(newPage) on click
 *
 * @component
 * @returns JSX.Element
 */
const ProductDisplay: React.FC<ProductDisplayProps> = ({
  products,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="my-4">
      <div className="row" id="all-products">
        {products.length === 0 && (
          <p className="text-center">No products found.</p>
        )}
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <li
                  key={pageNum}
                  className={`page-item ${
                    pageNum === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="grad-color Pagination"
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductDisplay;
