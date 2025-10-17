import React from "react";
import "./CategoryList.scss";

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-list">
      <button
        className={`category-item ${selectedCategory === "all" ? "active" : ""}`}
        onClick={() => onSelectCategory("all")}
      >
        Tất cả
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-item ${
            selectedCategory === category.id ? "active" : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
