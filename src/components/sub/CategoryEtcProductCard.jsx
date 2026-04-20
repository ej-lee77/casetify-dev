import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./scss/categoryProductCard.scss";

export default function CategoryEtcProductCard({ item }) {
    const [isImageError, setIsImageError] = useState(false);

    if (!item) return null;

    const colors = Array.isArray(item.caseColors) ? item.caseColors : [];
    const mainColor = item.mainCaseColor || colors[0] || "";
    const compatibleModels = Array.isArray(item.compatibleModels) ? item.compatibleModels : [];

    const imagePath = mainColor
        ? `/images/category/products/${item.id}_${mainColor}_main.jpg`
        : `/images/category/products/${item.id}_main.jpg`;

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
                <p className="temporary">{imagePath}</p>

                {!!item.caseCategory && (
                    <p className="card-sub">{item.caseCategory}</p>
                )}

                {!item.caseCategory && !!item.modelLabel && (
                    <p className="card-sub">{item.modelLabel}</p>
                )}

                {!item.caseCategory && !item.modelLabel && compatibleModels.length > 0 && (
                    <p className="card-sub">{compatibleModels[0]}</p>
                )}

                <p className="card-price">
                    {Number(item.price || 0).toLocaleString()}원
                </p>
            </div>

        </li>
    );
}