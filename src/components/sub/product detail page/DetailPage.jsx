import React, { useEffect, useState, useMemo } from "react";
import "./scss/DetailPage.scss";
import { modelColorOptions, colorMap, phoneModelOptions  } from "../../../data/finalData";


import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { items } from "../../../data/finalData"; 
import { useAuthStore } from "../../../store/useAuthStore";

export default function DetailPage({ item }) {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const [modelAccordionOpen, setModelAccordionOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(""); // ✅ 빈값으로
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedDeviceColor, setSelectedDeviceColor] = useState("");
    const [selectedThumb, setSelectedThumb] = useState("main");
    const [quantity, setQuantity] = useState(1);
    const [userSelected, setUserSelected] = useState(false); 
    const [selectedBrandTab, setSelectedBrandTab] = useState(item?.brand || "Apple");


    const [isWished, setIsWished] = useState(false);
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {user, onAddWishlist, onAddToCart} = useAuthStore();


    useEffect(() => {
        if (!item) return;
        setSelectedColor(item.mainCaseColor || item.caseColors?.[0] || "");
        setSelectedDeviceColor(modelColorOptions?.[item?.modelKey]?.[0]?.key || ""); 
        setQuantity(1);
        setSelectedBundles({});
        setAccordionOpen(false);        
        setModelAccordionOpen(false);   
        setSelectedModel("");

        // ✅ 선택할 옵션이 없는 상품은 바로 선택된 상태로
        const hasNoOption =
            !phoneModelOptions[item?.brand] &&
            !item?.compatibleModels?.length &&
            !item?.caseColors?.length;

        setUserSelected(hasNoOption);

    }, [item]);


    // 번들 상품 랜덤 3개
    const bundleItems = useMemo(() => {
        if (!items || !item) return [];

        // ✅ accessory만 필터
        const accessories = items.filter((d) => d.mainCategory === "accessory");

        // ✅ item.id에서 숫자 합산으로 고유 시드 생성
        const seed = item.id.replace(/\D/g, "").split("").reduce((acc, n) => acc + Number(n), 0);

        // ✅ 시드로 서로 다른 인덱스 2개 선택
        const len = accessories.length;
        const idx1 = seed % len;
        const idx2 = (seed * 3 + 7) % len === idx1 
            ? (seed * 3 + 8) % len 
            : (seed * 3 + 7) % len;

        // ✅ 첫번째 현재 상품 고정 + 액세서리 2개
        return [item, accessories[idx1], accessories[idx2]];
    }, [item]);


    // 선택된 번들 (id -> quantity 맵)
    const [selectedBundles, setSelectedBundles] = useState({});


    // 번들 체크박스 토글
    const handleBundleToggle = (bundleItem) => {
        setSelectedBundles((prev) => {
            const next = { ...prev };
            if (next[bundleItem.id]) {
                delete next[bundleItem.id];
            } else {
                next[bundleItem.id] = 1;
             
            }
            return next;
        });
    };

    // 번들 수량 변경
    const handleBundleQty = (bundleId, delta) => {
        setSelectedBundles((prev) => {
            const next = { ...prev };
            const current = next[bundleId] || 1;
            const nextQty = current + delta;
            if (nextQty <= 0) {
                delete next[bundleId];
            } else {
                next[bundleId] = nextQty;
            }
            return next;
        });
    };

    // 번들 이미지 경로 (mainImagePath 방식 동일)
    const getBundleImagePath = (b) => {
        const isPhoneB = b?.productTarget === "phone";
        const modelColorsB = isPhoneB ? modelColorOptions?.[b?.modelKey] || [] : [];
        const fixedDeviceColorB = isPhoneB ? modelColorsB?.[0]?.key || "" : "";
        if (isPhoneB) {
            return `/images/category/products/${b.id}_${b.modelKey}_${fixedDeviceColorB}_${b.mainCaseColor}_main.jpg`;
        } else if (b.modelKey) {
            return `/images/category/products/${b.id}_${b.modelKey}_${b.mainCaseColor}_main.jpg`;
        } else {
            return `/images/category/products/${b.id}_${b.mainCaseColor}_main.jpg`;
        }
    };

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

    const handleAddWish = (item)=>{
        const modelKey = phoneModelOptions[selectedBrandTab].find((model) => (selectedModel === model.label)).key

        const wishItem = {
            id: item.id,
            productName: item.productName,
            price: item.price,
            device: selectedModel,
            deviceKey: modelKey,
            color: selectedColor,
            imgUrl: isPhone ? `${modelKey}_${fixedThumbDeviceColor}_${selectedColor}` : selectedColor
        }
        
        onAddWishlist(wishItem);
    }

    const handleAddCart = (item)=>{
        const modelKey = phoneModelOptions[selectedBrandTab].find((model) => (selectedModel === model.label)).key

        const cartItem = {
            id: item.id,
            productName: item.productName,
            price: item.price,
            device: selectedModel,
            deviceKey: modelKey,
            color: selectedColor,
            imgUrl: isPhone ? `${modelKey}_${fixedThumbDeviceColor}_${selectedColor}` : selectedColor,
            colorList: item.caseColors,
            deviceList: item.compatibleModels ? "" : ""
        }
        
        onAddToCart(cartItem);
    }

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
        // item.modelLabel,
        // selectedDeviceColor,
        selectedColor,
        selectedModel,
    ].filter(Boolean).join(" / ");

    // ✅ 번들 선택 여부에 따라 총액에만 10% 할인 반영 (원래 가격은 고정)
    const bundleTotal = bundleItems.reduce((acc, b) => {
        const qty = selectedBundles[b.id] || 0;
        return acc + Math.round(b.price * 0.9) * qty;
    }, 0);
    const totalPrice = (item.price || 0) * quantity + bundleTotal;
    const totalQty = quantity + Object.values(selectedBundles).reduce((a, q) => a + q, 0);





    
    return (
        <section className="detail-page">
            <div className="detail-inner">
                <div className="detail-left">
                    <div className="detail-image-wrap">
                        <div className="detail-main-image" style={{ position: "relative" }}>
                            <img src={mainImage} alt={item.productName} />

                            {/* ✅ 컬러 리모콘 오버레이 */}
                            {isPhone && !!modelColors.length && (
                                <div className="color-remote">
                                    {modelColors.map((deviceColor) => (
                                        <button
                                            key={deviceColor.key}
                                            type="button"
                                            className={selectedDeviceColor === deviceColor.key ? "active" : ""}
                                            onClick={() => {
                                                setSelectedDeviceColor(deviceColor.key);
                                                setSelectedThumb("main");
                                                setUserSelected(true);
                                            }}
                                        >
                                            <span
                                                className="remote-chip"
                                                style={{ backgroundColor: colorMap[deviceColor.key] || "#ddd" }}
                                            />
                                            <span className="remote-label">{deviceColor.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* ✅ 왼쪽 하단 위시 버튼 */}
                            <button
                                className={`image-wish-btn ${isWished ? "wished" : ""}`}
                                onClick={() => {
                                    handleAddWish(item);
                                    setIsWished((prev) => !prev);
                                }}
                            >
                                <img
                                    src={isWished ? "/images/icon/LIKE.svg" : "/images/icon/UNLIKE.svg"}
                                    alt="위시"
                                />
                            </button>
                        </div>
                                    
                        <ul className="detail-thumb-list">
                        {imageList.map((img) => (
                            <li key={img.key} className={selectedThumb === img.key ? "active" : ""}
                                style={{ display: img.key === "main" ? "block" : "none" }}
                                ref={(el) => {
                                    if (el && img.key !== "main") {
                                        const image = el.querySelector("img");
                                        if (image) {
                                            image.onload = () => { el.style.display = "block"; };
                                            image.onerror = () => { el.style.display = "none"; };
                                        }
                                    }
                                }}
                            >
                                <button type="button" onClick={() => setSelectedThumb(img.key)}>
                                    <img src={img.src} alt={`${item.productName} 썸네일`} />
                                </button>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="detail-right">
                    {/* ✅ 1. 무료배송 뱃지 + 2. 상품 ID */}
                    <div className="detail-meta">
                        {item.badge?.includes("무료 배송") && (
                            <span className="badge-free-ship">무료 배송</span>
                        )}
                        <span className="detail-product-id">{item.id}</span>
                    </div>
                    {/* <p className="detail-artist">{item.artist || "CASETiFY"}</p> */}
                    <h2 className="detail-title">{item.productName}</h2>
                    <p className="detail-price">
                        {Number(item.price || 0).toLocaleString()}원
                    </p>
                    <div className="right-info-wrap">
                    {!!item.caseCategory && (
                        <div className="detail-info-box">
                            <p className="label"> <span className="label">{item.caseCategory}</span></p>
                 
                        </div>
                    )}
                    <div className="model-select-box">

                        {isPhone && item.brand && phoneModelOptions[item.brand] && (
                            <div className="detail-info-box">
                                <p className="label">기종</p>
                                <div className="model-accordion">
                                    <button
                                        type="button"
                                        className="model-accordion-trigger"
                                        onClick={() => setModelAccordionOpen((prev) => !prev)}
                                    >
                                        <span>{selectedModel || "기종을 선택하세요"}</span>
                                        <span className={`model-accordion-arrow ${modelAccordionOpen ? "open" : ""}`}>▼</span>
                                    </button>
                                    {modelAccordionOpen && (
                                        <div className="model-accordion-list">
                                            <div className="model-brand-tabs">
                                                {Object.keys(phoneModelOptions).map((brand) => (
                                                    <button
                                                        key={brand}
                                                        type="button"
                                                        className={selectedBrandTab === brand ? "active" : ""}
                                                        onClick={() => setSelectedBrandTab(brand)}
                                                    >
                                                        {brand}
                                                    </button>
                                                ))}
                                            </div>
                                            <ul className="model-sub-list">
                                                {(phoneModelOptions[selectedBrandTab] || []).map((model) => (
                                                    <li
                                                        key={model.key}
                                                        className={selectedModel === model.label ? "active" : ""}
                                                        onClick={() => {
                                                            setSelectedModel(model.label);
                                                            setModelAccordionOpen(false);
                                                            setUserSelected(true);
                                                        }}
                                                    >
                                                        {model.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
               

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
                               <p className="label">옵션</p>
                            <div className="accordion">
                                <button
                                    type="button"
                                    className="accordion-trigger"
                                    onClick={() => setAccordionOpen((prev) => !prev)}
                                >
                                    <span>{selectedModel || "옵션을 고르세요"}</span>
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
                </div>
               
                {/* ====================  ~~ 아래부터 버튼 ~~======================== */}
                <div className="right-btn-wrap">
                    {/* ✅ userSelected 일때만 표시, 1에서 − 누르면 사라짐 */}
                    {userSelected && (isPhone || !!item.compatibleModels?.length || !!item.caseColors?.length) && (
                        <div className="order-result">
                            <hr className="left-line" />

                            {/* ✅ 메인 상품 행만 */}
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
                                                setUserSelected(false);
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
                                    {((item.price || 0) * quantity).toLocaleString()}원
                                </span>
                            </div>

                            {/* ✅ 총액 - 메인 상품만 */}
                            <div className="order-total">
                                <span>총 상품금액 (수량 {quantity}개)</span>
                                <strong>{((item.price || 0) * quantity).toLocaleString()}원</strong>
                            </div>
                        </div>
                    )}

                    {/* ✅ 장바구니 버튼 - 미선택 시 alert */}
                    <button className="buy-btn" onClick={() => {
                        if (!userSelected) {
                            alert("제품을 선택해주세요.");
                            return;
                        }
                        handleAddCart(item)
                    }}>
                    <span className="icon"><img src="/images/icon/btn_shopping-cart.svg" alt="" /></span>  장바구니에 담기  
                    </button>
                </div>

                {/* 3개상품 */}
                <div className="budle-buy">
                {bundleItems.length > 0 && (
                    <div className="bundle-section">
                        <p className="bundle-title">번들 할인</p>
                        <ul className="bundle-list">
                            {bundleItems.map((b, index) => {
                                const isChecked = index === 0 || !!selectedBundles[b.id];
                                const isFirst = index === 0;
                                const bundlePrice = Math.round(b.price * 0.9);
                                const isSelected = !!selectedBundles[b.id];

                                return (
                                    <li
                                        key={b.id}
                                        className={`bundle-item ${isChecked ? "selected" : ""} ${isFirst ? "current" : ""}`}
                                        onClick={() => !isFirst && handleBundleToggle(b)}
                                    >
                                        <input
                                            type="checkbox"
                                            className="bundle-checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            disabled={isFirst}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isFirst) handleBundleToggle(b);
                                            }}
                                        />
                                        <div className="bundle-img-wrap">
                                            <img src={getBundleImagePath(b)} alt={b.productName} />
                                        </div>
                                        <span className="bundle-name">{b.productName}</span>

                                        {/*  번들 가격 */}
                                        <div className="bundle-price-wrap">
                                            <span className="bundle-default-price">{b.price.toLocaleString()}원</span>
                                        </div>
                                    </li>
                                );
                })}
                        </ul>

            {/*번들 선택 총 할인금액  */}
{Object.keys(selectedBundles).length > 0 && (
    <div className="bundle-total-wrap">
        <span className="bundle-total-label">번들 할인 총액</span>
        <div className="bundle-total-right">
            <em className="bundle-total-origin">
                {(
                    (item.price || 0) +
                    bundleItems
                        .filter((b) => selectedBundles[b.id])
                        .reduce((acc, b) => acc + b.price * (selectedBundles[b.id] || 1), 0)
                ).toLocaleString()}원
            </em>
            <strong className="bundle-total-discount">
                {(
                    (item.price || 0) +
                    bundleItems
                        .filter((b) => selectedBundles[b.id])
                        .reduce((acc, b) => acc + Math.round(b.price * 0.9) * (selectedBundles[b.id] || 1), 0)
                ).toLocaleString()}원
            </strong>
        </div>
    </div>
)}
        </div>
    )}
    

 {/* 장바구니 버튼 ++ 미선택 시 alert */}
    <button className="buy-btn" onClick={() => {
        if (!userSelected) {
            alert("제품을 선택해주세요.");
            return;
        }
    }}>
        <span className="icon"><img src="/images/icon/btn_shopping-cart.svg" alt="" /></span>
        {Object.keys(selectedBundles).length > 0
            ? `번들 장바구니에 담기 (${Object.keys(selectedBundles).length})`
            : "장바구니에 담기"}
    </button>
</div>


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


            </div></div>
        </section>
    );
}
