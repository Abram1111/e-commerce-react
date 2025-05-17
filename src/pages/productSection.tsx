import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import axios from "axios";

import type { Product } from "../types/product";

/**
 * TopProductsSection Component
 *
 * Renders two tabbed views:
 *  • “Top Rated”   – highest‑rating products (top 8)
 *  • “Biggest Sales” – products with largest discount percentage (top 8)
 *
 * Workflow
 * ────────────────────────────────────────────────────────────────────────────
 * • Fetch all products once from the dummyjson API with Axios.
 * • Derive the two sorted subsets (`topRated`, `biggestSales`) from the same data.
 * • Tab state (`activeTab`) toggles between the two subsets.
 * • Each product is displayed via the shared <ProductCard> component.
 *
 * UI Notes
 * ────────────────────────────────────────────────────────────────────────────
 * • Uses Bootstrap nav‑tabs for the tab selector.
 * • Grid adapts with col classes (lg‑3 / md‑4 / sm‑6) to stay responsive.
 *
 * @component
 * @returns JSX.Element
 */
const TopProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"top" | "sales">("top");

  // Fetch products on mount
  useEffect(() => {
    axios
      .get<{ products: Product[] }>("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  // Derive top‑rated and biggest‑sales lists
  const topRated = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const biggestSales = [...products]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 8);

  return (
    <div className="container my-5">
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "top" ? "active" : ""}`}
            onClick={() => setActiveTab("top")}
          >
            Top Rated
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "sales" ? "active" : ""}`}
            onClick={() => setActiveTab("sales")}
          >
            Biggest Sales
          </button>
        </li>
      </ul>

      <div className="row">
        {(activeTab === "top" ? topRated : biggestSales).map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsSection;
