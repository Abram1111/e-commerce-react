import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

interface SearchBarProps {
  /** value lifted to parent (optional) */
  searchTerm: string;
  /** parent callback when the user types */
  onSearchChange: (value: string) => void;
}

/**
 * SearchBar with live suggestions
 *
 * • Shows up to 5 product titles that match the current input
 * • Clicking a suggestion navigates to `/products/:id`
 * • Dropdown closes when user clicks outside the component
 */
const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Fetch suggestions whenever searchTerm changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchTerm
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5));
      } catch (_) {
        /* fetch aborted or failed – ignore */
      }
    })();

    return () => controller.abort();
  }, [searchTerm]);

  // Close dropdown when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProduct = (id: number) => {
    setSuggestions([]);
    onSearchChange("");
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="container my-4 position-relative" ref={wrapperRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000, maxHeight: 200, overflowY: "auto" }}
        >
          {suggestions.map((p) => (
            <li
              key={p.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => goToProduct(p.id)}
            >
              {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
