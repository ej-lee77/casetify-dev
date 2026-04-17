import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { items, modelColorOptions, colorMap } from "../../data/finalData";
import "./scss/DetailPage.scss";

export default function DetailPage() {
    const { id } = useParams();

    const item = items.find((data) => data.id === id);

    const [selectedColor, setSelectedColor] = useState(
        item?.mainCaseColor || item?.caseColors?.[0] || ""
    );

    const [selectedThumb, setSelectedThumb] = useState("main");

    if (!item) {
        return <div className="detail-page"><p>상품을 찾을 수 없습니다.</p></div>;
    }

    const isPhone = item.productTarget === "phone";
    const modelColors = isPhone ? modelColorOptions[item.modelKey] || [] : [];
    const deviceColorKey = isPhone ? modelColors[0]?.key || "Black" : "";

    const basePath = isPhone
        ? `/images/category/products/${item.id}_${item.modelKey}_${deviceColorKey}_${selectedColor}`
        : item.modelKey
            ? `/images/category/products/${item.id}_${item.modelKey}_${selectedColor}`
            : `/images/category/products/${item.id}_${selectedColor}`;

    const imageList = [
        { key: "main", src: `${basePath}_main.jpg` },
        { key: "1", src: `${basePath}_1.jpg` },
        { key: "2", src: `${basePath}_2.jpg` },
        { key: "3", src: `${basePath}_3.jpg` },
    ];

    const mainImage = imageList.find((img) => img.key === selectedThumb)?.src || imageList[0].src;

    return (
        <section className="detail-page">
            <div className="detail-inner">
                <div className="detail-left">
                    <div className="detail-main-image">
                        <p className="image-error-path">{mainImage}</p>
                    </div>

                    <ul className="detail-thumb-list">
                        {imageList.map((img) => (
                            <li
                                key={img.key}
                                className={selectedThumb === img.key ? "active" : ""}
                            >
                                <button
                                    type="button"
                                    onClick={() => setSelectedThumb(img.key)}
                                >
                                    <p className="image-error-path">{img.src}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="detail-right">
                    <p className="detail-artist">{item.artist || "CASETiFY"}</p>
                    <h2 className="detail-title">{item.productName}</h2>
                    <p className="detail-price">{Number(item.price || 0).toLocaleString()}원</p>

                    {!!item.modelLabel && (
                        <div className="detail-info-box">
                            <p className="label">기종</p>
                            <p>{item.modelLabel}</p>
                        </div>
                    )}

                    {!!item.caseCategory && (
                        <div className="detail-info-box">
                            <p className="label">종류</p>
                            <p>{item.caseCategory}</p>
                        </div>
                    )}

                    {!!item.caseColors?.length && (
                        <div className="detail-info-box">
                            <p className="label">컬러</p>
                            <div className="detail-colors">
                                {item.caseColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={selectedColor === color ? "active" : ""}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setSelectedThumb("main");
                                        }}
                                    >
                                        <span
                                            className="color-chip"
                                            style={{ backgroundColor: colorMap[color] || "#ddd" }}
                                        />
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {!!item.compatibleModels?.length && (
                        <div className="detail-info-box">
                            <p className="label">호환 모델</p>
                            <ul className="compatible-list">
                                {item.compatibleModels.map((model) => (
                                    <li key={model}>{model}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button className="buy-btn">장바구니 담기</button>

                    <div className="detail-desc">
                        <h3>상품 안내</h3>
                        <p>
                            현재 이 페이지는 데이터 연결과 이미지 경로 확인용 임시 상세페이지야.
                            <br />
                            이미지 파일명:
                            <br />
                            {isPhone
                                ? `${item.id}_${item.modelKey}_${deviceColorKey}_${selectedColor}_main.jpg`
                                : `${item.id}_${selectedColor}_main.jpg`}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DetailThumb({ img, isActive, onClick }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <li className={isActive ? "active" : ""}>
            <button type="button" onClick={onClick}>
                <img
                    src={img.src}
                    alt=""
                    onError={() => setIsVisible(false)}
                />
            </button>
        </li>
    );
}