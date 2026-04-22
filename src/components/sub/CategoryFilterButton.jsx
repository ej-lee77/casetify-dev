import React from "react";
import "./scss/CategoryPage.scss"

export default function CategoryFilterButton({ onClick, isOpen = false }) {
    return (
        <button
            type="button"
            className={`category-filter-btn ${isOpen ? "on" : ""}`}
            onClick={onClick}
        >
            <span className="icon">
                <img src="/images/icon/filter-outline.png" alt="필터 아이콘" />
            </span>
            <span className="label">필터</span>
        </button>
    );
}