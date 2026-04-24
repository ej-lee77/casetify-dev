import React, { useState } from "react";

export default function CategoryMiniIcon({
    miniKey,
    label,
    isActive,
    onClick,
}) {
    const [isError, setIsError] = useState(false);

    const iconName = miniKey || "etc";
    const imagePath = `/images/category/mini/${iconName}-${label}.png`;

    return (
        <li
            className={`mini-icon-item ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <div className="mini-icon-img">
                {!isError ? (
                    <img
                        src={imagePath}
                        alt={label}
                        onError={() => setIsError(true)}
                    />
                ) : (
                    <p className="image-error-path">{imagePath}</p>
                )}
            </div>

            <p className="mini-icon-text">{label}</p>
        </li>
    );
}