import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./scss/categoryProductCard.scss";
import { useAuthStore } from "../../store/useAuthStore";

export default function CategoryEtcProductCard({ item, modelLabels = [] }) {
    const [isImageError, setIsImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const { user, onAddToCart, onAddWishlist, wishlist } = useAuthStore();
    const navigate = useNavigate();

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

    const isWished = wishlist.some((w) => w.productId === item.id);

    const showFeedback = (type) => {
        setFeedback(type);
        setTimeout(() => setFeedback(null), 1500);
    };

    const handleWish = async (e) => {
        e.preventDefault();
        if (!user) { navigate("/login"); return; }
        const result = await onAddWishlist({
            id: item.id,
            productName: item.productName,
            price: item.price,
            device: "",
            color: mainColor,
            imgUrl: imagePath,
            caseCategory: item.caseCategory,
        });
        showFeedback(result === "del" ? "unwish" : "wish");
    };

    const handleCart = async (e) => {
        e.preventDefault();
        if (!user) { navigate("/login"); return; }
        await onAddToCart({
            id: item.id,
            productName: item.productName,
            price: item.price,
            device: displayModelText || "",
            deviceKey: item.modelKey || "",
            color: mainColor,
            imgUrl: imagePath,
            colorList: colors,
            deviceList: Array.isArray(item.compatibleModels) ? item.compatibleModels : [],
            isPhone: false,
            deviceBrand: "",
            caseCategory: item.caseCategory,
        });
        showFeedback("cart");
    };

    return (
        <article className="product-card">
            <div
                className={`card-img-wrap${isHovered ? " hovered" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
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

                {/* 호버 액션 버튼 */}
                <div className="card-hover-actions">
                    <button className={`btn-wish${isWished ? " wished" : ""}`} onClick={handleWish} title="찜하기">
                        <img src={isWished ? "/images/icon/like.svg" : "/images/icon/unlike.svg"} alt="찜하기" />
                    </button>
                    <button className="btn-cart" onClick={handleCart} title="장바구니">
                        <img src="/images/icon/btn_shopping-cart.svg" alt="장바구니" />
                    </button>
                </div>

                {/* 피드백 토스트 */}
                {feedback && (
                    <div className="card-feedback">
                        {feedback === "cart" && "장바구니에 담겼어요"}
                        {feedback === "wish" && "찜 목록에 추가됐어요"}
                        {feedback === "unwish" && "찜 목록에서 제거됐어요"}
                    </div>
                )}
            </div>

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

                <div className="card-price-row">
                    <p className="card-price">
                        {Number(item.price || 0).toLocaleString()}원
                    </p>
                    {Array.isArray(item.badge) && item.badge.length > 0 && (
                        <div className="card-badges">
                            {item.badge.map((b) => (
                                <span key={b} className="badge">{b}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}