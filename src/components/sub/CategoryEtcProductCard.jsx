import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./scss/categoryProductCard.scss";

export default function CategoryEtcProductCard({ item, modelLabels = [] }) {
    const [isImageError, setIsImageError] = useState(false);

    if (!item) return null;

    const colors = Array.isArray(item.caseColors) ? item.caseColors : [];
    const mainColor = item.mainCaseColor || colors[0] || "";
    const compatibleModels = Array.isArray(item.compatibleModels) ? item.compatibleModels : [];

    const imagePath = mainColor
        ? item.modelKey
            ? `/images/category/products/${item.id}_${item.modelKey}_${mainColor}_main.jpg`
            : `/images/category/products/${item.id}_${mainColor}_main.jpg`
        : item.modelKey
            ? `/images/category/products/${item.id}_${item.modelKey}_main.jpg`
            : `/images/category/products/${item.id}_main.jpg`;

    const displayModelText = useMemo(() => {
        if (modelLabels.length > 0) {
            return modelLabels.length > 2
                ? `${modelLabels[0]} 외 ${modelLabels.length - 1}`
                : modelLabels.join(" / ");
        }

        if (item.modelLabel) return item.modelLabel;
        if (compatibleModels.length > 0) return compatibleModels[0];

        return "";
    }, [modelLabels, item.modelLabel, compatibleModels]);

    const handleError = () => {
        setIsImageError(true);
    };

    return (
        <article className="product-card">
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

                {!!item.caseCategory && !!displayModelText && (
                    <p className="card-sub">{displayModelText} · {item.caseCategory}</p>
                )}

                {!!item.caseCategory && !displayModelText && (
                    <p className="card-sub">{item.caseCategory}</p>
                )}

                {!item.caseCategory && !!displayModelText && (
                    <p className="card-sub">{displayModelText}</p>
                )}

                <p className="card-price">
                    {Number(item.price || 0).toLocaleString()}원
                </p>
            </div>
        </article>
    );
}