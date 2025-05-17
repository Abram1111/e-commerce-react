import React from "react";

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

/**
 * Sidebar Component
 *
 * Displays a vertical list of product categories.
 * Highlights the currently selected category and notifies the parent when a
 * new category is chosen.
 *
 * Props
 * ────────────────────────────────────────────────────────────────────────────
 * • categories        – Array of category names to display.
 * • selectedCategory  – Currently active/selected category.
 * • onCategorySelect  – Callback invoked with the category name when a user
 *                       clicks a category item.
 *
 * Behavior
 * ────────────────────────────────────────────────────────────────────────────
 * • Adds the Bootstrap “active” class to the selected category for styling.
 * • Uses inline cursor styling to indicate the list items are clickable.
 *
 * @component
 * @returns JSX.Element
 */
const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="col-md-3 p-3 sidebar">
      <h5>Categories</h5>
      <ul className="list-group">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`list-group-item category-item ${
              cat === selectedCategory ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => onCategorySelect(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
