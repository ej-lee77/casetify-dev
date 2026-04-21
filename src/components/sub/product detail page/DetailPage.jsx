import React, { useEffect, useState, useMemo } from "react";
import "./scss/DetailPage.scss";
import { modelColorOptions, colorMap } from "../../../data/finalData";

// ✅ 추가
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { items } from "../../../data/finalData"; // ✅ 추가

export default function DetailPage({ item }) {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(""); // ✅ 빈값으로
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedDeviceColor, setSelectedDeviceColor] = useState("");
    const [selectedThumb, setSelectedThumb] = useState("main");
    const [quantity, setQuantity] = useState(1);
    const [userSelected, setUserSelected] = useState(false); // ✅ 추가

    // ✅ 추가
    const [isWished, setIsWished] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // ✅ 추가: 번들 상품 랜덤 3개
    const bundleItems = useMemo(() => {
        if (!items || !item) return [];
        const others = items.filter((d) => d.id !== item.id);
        const shuffled = [...others].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, [item]);

    // ✅ 추가: 선택된 번들 (id -> quantity 맵)
    const [selectedBundles, setSelectedBundles] = useState({});

    // ✅ 추가: 할인율 랜덤 (50% 확률로 없음, 최대 50%)
    const discountRate = useMemo(() => {
        if (!item) return 0;
        const hasDiscount = Math.random() > 0.5;
        if (!hasDiscount) return 0;
        const rates = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        return rates[Math.floor(Math.random() * rates.length)];
    }, [item]);

    const discountedPrice = discountRate
        ? Math.round(item?.price * (1 - discountRate / 100) / 100) * 100
        : item?.price;

    useEffect(() => {
        if (!item) return;
        setSelectedColor(item.mainCaseColor || item.caseColors?.[0] || "");
        setQuantity(1);           // ✅ 추가
        setUserSelected(false);   // ✅ 추가
        setSelectedBundles({});   // ✅ 추가
    }, [item]);

    // ✅ 추가: 로그인 상태 감지 + 위시 여부 확인
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser && item?.id) {
                const ref = doc(db, "wishlist", `${currentUser.uid}_${item.id}`);
                const snap = await getDoc(ref);
                setIsWished(snap.exists());
            } else {
                setIsWished(false);
            }
        });
        return () => unsubscribe();
    }, [item]);

    // ✅ 추가: 위시 핸들러 — 비회원이면 alert 후 로그인 페이지 이동
    const handleWish = async () => {
        if (!user) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }
        const ref = doc(db, "wishlist", `${user.uid}_${item.id}`);
        if (isWished) {
            await deleteDoc(ref);
            setIsWished(false);
        } else {
            await setDoc(ref, {
                userId: user.uid,
                productId: item.id,
                productName: item.productName,
                price: item.price,
                createdAt: new Date(),
            });
            setIsWished(true);
        }
    };

    // ✅ 추가: 번들 체크박스 토글
    const handleBundleToggle = (bundleItem) => {
        setSelectedBundles((prev) => {
            const next = { ...prev };
            if (next[bundleItem.id]) {
                delete next[bundleItem.id];
            } else {
                next[bundleItem.id] = 1;
                setUserSelected(true);
            }
            return next;
        });
    };

    // ✅ 추가: 번들 수량 변경
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

    // ✅ 추가: 번들 이미지 경로 (mainImagePath 방식 동일)
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

    // ✅ 총액: 메인(할인가 * 수량) + 번들(원가 * 0.9 * 수량)
    const bundleTotal = bundleItems.reduce((acc, b) => {
        const qty = selectedBundles[b.id] || 0;
        return acc + Math.round(b.price * 0.9) * qty;
    }, 0);
    const totalPrice = (discountedPrice || 0) * quantity + bundleTotal;
    const totalQty = quantity + Object.values(selectedBundles).reduce((a, q) => a + q, 0);

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

                    {/* ✅ 추가: 할인율 있으면 할인가/원가 일렬 표시 */}
                    {discountRate > 0 ? (
                        <p className="detail-price">
                            <span className="price-discount-rate">{discountRate}%</span>
                            <span className="price-discounted">{Number(discountedPrice).toLocaleString()}원</span>
                            <span className="price-origin">{Number(item.price).toLocaleString()}원</span>
                        </p>
                    ) : (
                        <p className="detail-price">
                            {Number(item.price || 0).toLocaleString()}원
                        </p>
                    )}

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

                            {/* 메인 상품 행 */}
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
                                    {((discountedPrice || 0) * quantity).toLocaleString()}원
                                </span>
                            </div>

                            {/* ✅ 추가: 선택된 번들 행 */}
                            {bundleItems
                                .filter((b) => selectedBundles[b.id])
                                .map((b) => {
                                    const qty = selectedBundles[b.id] || 1;
                                    const bundlePrice = Math.round(b.price * 0.9);
                                    return (
                                        <div key={b.id} className="order-result-row">
                                            <span className="order-option-name">
                                                {b.productName}
                                                <em className="order-option-detail"> / 함께 구매 할인</em>
                                            </span>
                                            <div className="order-quantity">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleBundleQty(b.id, -1);
                                                    }}
                                                >−</button>
                                                <span>{qty}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleBundleQty(b.id, 1);
                                                    }}
                                                >+</button>
                                            </div>
                                            <span className="order-row-price">
                                                {(bundlePrice * qty).toLocaleString()}원
                                            </span>
                                        </div>
                                    );
                                })}

                            <div className="order-total">
                                <span>총 상품금액 (수량 {totalQty}개)</span>
                                <strong>{totalPrice.toLocaleString()}원</strong>
                            </div>
                        </div>
                    )}

                    {/* ====================  ~~ 아래부터 버튼 ~~======================== */}

                    <div className="button-list">
                        {/* ✅ 수정: 위시 버튼 */}
                        <button className={`sub-btn wish-btn ${isWished ? "wished" : ""}`} onClick={handleWish}>
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                        <button className="sub-btn">장바구니 담기</button>
                    </div>
                    <button className="buy-btn">바로 구매</button>

                    {/* ✅ 추가: 번들 섹션 — 가로 3열 그리드 */}
                    {bundleItems.length > 0 && (
                        <div className="bundle-section">
                            <p className="bundle-title">번들 할인상품</p>
                            <ul className="bundle-list">
                                {bundleItems.map((b) => {
                                    const isChecked = !!selectedBundles[b.id];
                                    return (
                                        <li
                                            key={b.id}
                                            className={`bundle-item ${isChecked ? "selected" : ""}`}
                                            onClick={() => handleBundleToggle(b)}
                                        >
                                            <input
                                                type="checkbox"
                                                className="bundle-checkbox"
                                                checked={isChecked}
                                                onChange={() => handleBundleToggle(b)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <div className="bundle-img-wrap">
                                                <img src={getBundleImagePath(b)} alt={b.productName} />
                                            </div>
                                            <span className="bundle-name">{b.productName}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
{/* 
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
                    </div> */}
                </div>
            </div>
        </section>
    );
}
