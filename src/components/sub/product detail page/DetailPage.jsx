import React, { useEffect, useState } from "react";
import "./scss/DetailPage.scss";
import { modelColorOptions, colorMap } from "../../../data/finalData";

export default function DetailPage({ item }) {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(""); // ✅ 빈값으로
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedDeviceColor, setSelectedDeviceColor] = useState("");
    const [selectedThumb, setSelectedThumb] = useState("main");
    const [quantity, setQuantity] = useState(1);
    const [userSelected, setUserSelected] = useState(false); // ✅ 추가

    useEffect(() => {
        if (!item) return;
        setSelectedColor(item.mainCaseColor || item.caseColors?.[0] || "");
        setQuantity(1);           // ✅ 추가
        setUserSelected(false);   // ✅ 추가
    }, [item]);

    if (!item) {
        return (
            <div className="detail-page">
                <p>상품을 찾을 수 없습니다.</p>
            </div>
        );
    }

    const isPhone = item?.productTarget === "phone";
    const modelColors = isPhone ? modelColorOptions?.[item?.modelKey] || [] : [];

    const fixedThumbDeviceColor = isPhone ? modelColors?.[0]?.key || "" : "";

    const mainImagePath = isPhone
        ? `/images/category/products/${item.id}_${item.modelKey}_${selectedDeviceColor}_${selectedColor}_main.jpg`
        : item.modelKey
            ? `/images/category/products/${item.id}_${item.modelKey}_${selectedColor}_main.jpg`
            : `/images/category/products/${item.id}_${selectedColor}_main.jpg`;

    const imageList = [
        { key: "main", src: mainImagePath },
        {
            key: "1",
            src: isPhone
                ? `/images/category/products/${item.id}_${item.modelKey}_${fixedThumbDeviceColor}_${selectedColor}_1.jpg`
                : item.modelKey
                    ? `/images/category/products/${item.id}_${item.modelKey}_${selectedColor}_1.jpg`
                    : `/images/category/products/${item.id}_${selectedColor}_1.jpg`,
        },
        {
            key: "2",
            src: isPhone
                ? `/images/category/products/${item.id}_${item.modelKey}_${fixedThumbDeviceColor}_${selectedColor}_2.jpg`
                : item.modelKey
                    ? `/images/category/products/${item.id}_${item.modelKey}_${selectedColor}_2.jpg`
                    : `/images/category/products/${item.id}_${selectedColor}_2.jpg`,
        },
        {
            key: "3",
            src: isPhone
                ? `/images/category/products/${item.id}_${item.modelKey}_${fixedThumbDeviceColor}_${selectedColor}_3.jpg`
                : item.modelKey
                    ? `/images/category/products/${item.id}_${item.modelKey}_${selectedColor}_3.jpg`
                    : `/images/category/products/${item.id}_${selectedColor}_3.jpg`,
        },
    ];

    const mainImage =
        imageList.find((img) => img.key === selectedThumb)?.src || imageList[0].src;

    const optionSummary = [
        item.modelLabel,
        selectedDeviceColor,
        selectedColor,
        selectedModel,
    ].filter(Boolean).join(" / ");

    const totalPrice = (item.price || 0) * quantity;

    return (
        <section className="detail-page">
            <div className="detail-inner">
                <div className="detail-left">
                    <div className="detail-main-image">
                        <img src={mainImage} alt={item.productName} />
                    </div>
                    <ul className="detail-thumb-list">
                        {imageList.map((img) => (
                            <li key={img.key} className={selectedThumb === img.key ? "active" : ""}>
                                <button type="button" onClick={() => setSelectedThumb(img.key)}>
                                    <img src={img.src} alt={`${item.productName} 썸네일`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="detail-right">
                    <p className="detail-artist">{item.artist || "CASETiFY"}</p>
                    <h2 className="detail-title">{item.productName}</h2>
                    <p className="detail-price">
                        {Number(item.price || 0).toLocaleString()}원
                    </p>

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

                    {isPhone && !!modelColors.length && (
                        <div className="detail-info-box">
                            <p className="label">기기 컬러</p>
                            <div className="detail-device-colors">
                                {modelColors.map((deviceColor) => (
                                    <button
                                        key={deviceColor.key}
                                        type="button"
                                        className={selectedDeviceColor === deviceColor.key ? "active" : ""}
                                        onClick={() => {
                                            setSelectedDeviceColor(deviceColor.key);
                                            setSelectedThumb("main");
                                            setUserSelected(true); // ✅
                                        }}
                                    >
                                        {deviceColor.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {!!item.caseColors?.length && (
                        <div className="detail-info-box">
                            <p className="label">케이스 컬러</p>
                            <div className="detail-colors">
                                {item.caseColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={selectedColor === color ? "active" : ""}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setSelectedThumb("main");
                                            setUserSelected(true); // ✅
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
                            <div className="accordion">
                                <button
                                    type="button"
                                    className="accordion-trigger"
                                    onClick={() => setAccordionOpen((prev) => !prev)}
                                >
                                    <span>호환 모델 — <strong>{selectedModel}</strong></span>
                                    <span className={`accordion-arrow ${accordionOpen ? "open" : ""}`}>▼</span>
                                </button>
                                {accordionOpen && (
                                    <ul className="accordion-list">
                                        {item.compatibleModels.map((model) => (
                                            <li
                                                key={model}
                                                className={selectedModel === model ? "active" : ""}
                                                onClick={() => {
                                                    setSelectedModel(model);
                                                    setAccordionOpen(false);
                                                    setUserSelected(true); // ✅
                                                }}
                                            >
                                                {model}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ✅ userSelected 일때만 표시, 1에서 − 누르면 사라짐 */}
                    {userSelected && (
                        <div className="order-result">
                            <hr className="left-line" />
                            <div className="order-result-row">
                                <span className="order-option-name">
                                    {item.productName}
                                    {optionSummary && (
                                        <em className="order-option-detail"> / {optionSummary}</em>
                                    )}
                                </span>
                                <div className="order-quantity">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (quantity <= 1) {
                                                setUserSelected(false); // ✅ 사라짐
                                                setQuantity(1);
                                            } else {
                                                setQuantity((q) => q - 1);
                                            }
                                        }}
                                    >−</button>
                                    <span>{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setQuantity((q) => q + 1);
                                        }}
                                    >+</button>
                                </div>
                                <span className="order-row-price">
                                    {totalPrice.toLocaleString()}원
                                </span>
                            </div>
                            <div className="order-total">
                                <span>총 상품금액 (수량 {quantity}개)</span>
                                <strong>{totalPrice.toLocaleString()}원</strong>
                            </div>
                        </div>
                    )}

                    {/* ====================  ~~ 아래부터 버튼 ~~======================== */}

                    <div className="button-list">
                        <button className="sub-btn">♡</button>
                        <button className="sub-btn">장바구니 담기</button>
                    </div>
                    <button className="buy-btn">바로 구매</button>

                    <div className="detail-desc">
                        <h3>상품 안내</h3>
                        <p>
                            현재 이 페이지는 데이터 연결과 이미지 경로 확인용 임시 상세페이지야.
                            <br /><br />
                            메인 이미지:<br />
                            {isPhone
                                ? `${item.id}_${item.modelKey}_${selectedDeviceColor}_${selectedColor}_main.jpg`
                                : item.modelKey
                                    ? `${item.id}_${item.modelKey}_${selectedColor}_main.jpg`
                                    : `${item.id}_${selectedColor}_main.jpg`}
                            <br /><br />
                            상세 이미지:<br />
                            {isPhone
                                ? `${item.id}_${item.modelKey}_${fixedThumbDeviceColor}_${selectedColor}_1.jpg`
                                : item.modelKey
                                    ? `${item.id}_${item.modelKey}_${selectedColor}_1.jpg`
                                    : `${item.id}_${selectedColor}_1.jpg`}
                            <br />
                            {isPhone
                                ? `${item.id}_${item.modelKey}_${fixedThumbDeviceColor}_${selectedColor}_2.jpg`
                                : item.modelKey
                                    ? `${item.id}_${item.modelKey}_${selectedColor}_2.jpg`
                                    : `${item.id}_${selectedColor}_2.jpg`}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}