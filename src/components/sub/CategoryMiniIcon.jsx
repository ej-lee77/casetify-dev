import React from "react";

export default function CategoryMiniIcon({
    miniKey,
    label,
    isActive = false,
    onClick,
}) {
    const iconName = miniKey || "etc";

    return (
        <li
            className={`mini-icon-item ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="mini-icon-img">
                <img
                    src={`/images/category/mini/${iconName}.png`}
                    alt={label}
                />
            </div>
            <p className="mini-icon-text">{label}</p>
        </li>
    );
}