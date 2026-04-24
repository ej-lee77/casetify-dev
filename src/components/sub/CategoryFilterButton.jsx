import React from "react";

export default function CategoryFilterButton({ onClick }) {
    return (
        <button
            type="button"
            className="floating-filter-btn"
            onClick={onClick}
        >
            필터
        </button>
    );
}