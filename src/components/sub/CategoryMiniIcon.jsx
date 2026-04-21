import React from "react";
import { MINI_ICON_MAP } from "../../data/categoryMap";

export default function CategoryMiniIcon({
    mini,
    isActive = false,
    onClick,
}) {
    const iconName = MINI_ICON_MAP[mini];

    return (
        <li
            className={`mini-icon-item ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="mini-icon-img">
                <img
                    src={`/images/category/mini/${iconName}.png`}
                    alt={mini}
                />
            </div>
            <p className="mini-icon-text">{mini}</p>
        </li>
    );
}