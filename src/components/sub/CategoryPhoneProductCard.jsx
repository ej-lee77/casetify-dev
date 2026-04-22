import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./scss/categoryProductCard.scss";
import { modelColorOptions, colorMap } from "../../data/finalData";

export default function CategoryPhoneProductCard({ item }) {
    const [isImageError, setIsImageError] = useState(false);

    if (!item) return null;

    const colors = Array.isArray(item.caseColors) ? item.caseColors : [];
    const visibleColors = colors.slice(0, 5);
    const extraCount = colors.length - visibleColors.length;

    const modelColors = modelColorOptions[item.modelKey] || [];
    const deviceColorKey = modelColors[0]?.key || "Black";
    const caseColorKey = item.mainCaseColor || colors[0] || "Black";

    const imagePath = `/images/category/products/${item.id}_${item.modelKey}_${deviceColorKey}_${caseColorKey}_main.jpg`;

    const handleError = () => {
        setIsImageError(true);
    };

    return (
        <li className="product-card">
            <Link to={`/detail/${item.id}`} className="card-link">
                <div className="card-img">
                    {!isImageError ? (
                        <img
                            src={imagePath}
                            alt={item.productName}
                            onError={handleError}
                        />
                    ) : (
                        <p className="image-error-path">{imagePath}</p>
                    )}
                </div>
            </Link>

            <div className="card-info">
                <p className="card-name">{item.productName}</p>

                <p className="card-sub">
                    {item.modelLabel} · {item.caseCategory}
                </p>

                <p className="card-price">
                    {Number(item.price || 0).toLocaleString()}원
                </p>

                {!!colors.length && (
                    <div className="card-colors">
                        {visibleColors.map((color) => (
                            <span
                                key={color}
                                className="color-chip"
                                title={color}
                                style={{ backgroundColor: colorMap[color] || "#ddd" }}
                            />
                        ))}

                        {extraCount > 0 && (
                            <span className="color-more">+{extraCount}</span>
                        )}
                    </div>
                )}
            </div>
        </li>
    );
}