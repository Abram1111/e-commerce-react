/**
 * AllProducts Page Component
 *
 * Displays the product listing page with filters and search functionality.
 *
 * Features:
 * ─────────────────────────────────────────────────────────────────────────────
 * • Fetches all products from the dummyjson API
 * • Extracts unique categories to display in a sidebar
 * • Filters products by selected category and search keyword
 * • Applies pagination to show a limited number of products per page
 *
 * Children Components:
 * ─────────────────────────────────────────────────────────────────────────────
 * • Sidebar        – category filter
 * • SearchBar      – keyword filter input
 * • ProductDisplay – paginated product list rendering
 *
 * State Management:
 * ─────────────────────────────────────────────────────────────────────────────
 * • `allProducts`: all fetched products
 * • `filteredProducts`: result of applied filters
 * • `categories`: category list extracted from products
 * • `searchTerm`: current search input
 * • `selectedCategory`: current selected category
 * • `currentPage`: current pagination page
 */

import React, { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import SearchBar from "../components/searchBar";
import ProductDisplay from "../components/productsDisplay";
import type { Product } from "../types/product";

const ITEMS_PER_PAGE = 8;

const AllProducts: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Fetch all products on component mount.
   * Also extract and store unique categories.
   */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=150");
        const data = await res.json();
        setAllProducts(data.products);

        const uniqueCats = Array.from(
          new Set(data.products.map((p: Product) => p.category))
        ) as string[];
        setCategories(["All", ...uniqueCats]);
        setFilteredProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    }
    fetchProducts();
  }, []);

  /**
   * Update product list when category or search term changes.
   * Resets to first page on filter change.
   */
  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, selectedCategory, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handlers
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <div className="col-md-9">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <ProductDisplay
            products={currentProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
