import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

import type { Product } from "../types/product";

interface SimilarProps {
  category: string;
  excludeId: number;
}

/**
 * Similar Component
 *
 * Displays a selection of similar products based on the same category as the
 * current product. It excludes the current product from the recommendations.
 *
 * Props
 * ────────────────────────────────────────────────────────────────────────────
 * • category   – Category string used to filter similar products.
 * • excludeId  – ID of the current product to exclude from the results.
 *
 * Behavior
 * ────────────────────────────────────────────────────────────────────────────
 * • Fetches up to 150 products from the dummy API.
 * • Filters the products by matching category and excluding the current one.
 * • Limits the displayed similar products to 4 items.
 * • Re-runs the fetch when the category or excludeId changes.
 *
 * UI
 * ────────────────────────────────────────────────────────────────────────────
 * • Renders each similar product using the shared <ProductCard> component.
 *
 * @component
 * @returns JSX.Element
 */
const Similar: React.FC<SimilarProps> = ({ category, excludeId }) => {
  const [similar, setSimilar] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchSimilar() {
      const res = await fetch("https://dummyjson.com/products?limit=150");
      const data = await res.json();
      const filtered = data.products.filter(
        (p: Product) => p.category === category && p.id !== excludeId
      );
      setSimilar(filtered.slice(0, 4));
    }

    fetchSimilar();
  }, [category, excludeId]);

  return (
    <div className="container mt-5">
      <h3 className="decorated-font">Similar Products</h3>
      <div className="row">
        {similar.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Similar;
