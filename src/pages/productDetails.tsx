import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/details";
import Comment from "../components/comment";
import Similar from "../components/similar";
import { useCart } from "../context/cartContext";
import type { Product } from "../types/product";

/**
 * ProductDetailsPage
 *
 * Top‑level page that displays:
 * • Detailed information about a single product (`<Details />`)
 * • Comment section associated with that product (`<Comment />`)
 * • A list of similar products in the same category (`<Similar />`)
 *
 * Workflow
 * ────────────────────────────────────────────────────────────────────────────
 * 1. Reads the product ID from the URL via `useParams`.
 * 2. Fetches the product data from the dummyjson API on mount / id change.
 * 3. While loading, shows a simple “Loading…” message.
 * 4. Once fetched:
 *    • Renders Details, passing `onAddToCart` from CartContext.
 *    • Renders Comment with the product ID for localStorage comments.
 *    • Renders Similar, passing the product’s category and its own ID to exclude.
 *
 * @component
 * @returns JSX.Element
 */
const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Details product={product} onAddToCart={addToCart} />
      <Comment productId={product.id} />
      <Similar category={product.category} excludeId={product.id} />
    </>
  );
};

export default ProductDetailsPage;
