import React, { useEffect, useState, useMemo } from "react";
import "./scss/DetailPage.scss";
import { modelColorOptions, colorMap } from "../../../data/finalData";


import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { items } from "../../../data/finalData"; 
import { useAuthStore } from "../../../store/useAuthStore";

export default function DetailPage({ item }) {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(""); // ✅ 빈값으로
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedDeviceColor, setSelectedDeviceColor] = useState("");
    const [selectedThumb, setSelectedThumb] = useState("main");
    const [quantity, setQuantity] = useState(1);
    const [userSelected, setUserSelected] = useState(false); 

    const [isWished, setIsWished] = useState(false);
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {user, onAddWishlist} = useAuthStore();


useEffect(() => {
    if (!item) return;
    setSelectedColor(item.mainCaseColor || item.caseColors?.[0] || "");
    setSelectedDeviceColor(modelColorOptions?.[item?.modelKey]?.[0]?.key || ""); // ✅ 추가
    setQuantity(1);
    setUserSelected(false);
    setSelectedBundles({});
}, [item]);


    // 번들 상품 랜덤 3개
    const bundleItems = useMemo(() => {
        if (!items || !item) return [];
        const others = items.filter((d) => d.id !== item.id);
        const shuffled = [...others].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, [item]);

    // 선택된 번들 (id -> quantity 맵)
    const [selectedBundles, setSelectedBundles] = useState({});

    // 로그인 상태 감지 + 위시 여부 확인
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    //         setUser(currentUser);
    //         if (currentUser && item?.id) {
    //             const ref = doc(db, "wishlist", `${currentUser.uid}_${item.id}`);
    //             const snap = await getDoc(ref);
    //             setIsWished(snap.exists());
    //         } else {
    //             setIsWished(false);
    //         }
    //     });
    //     return () => unsubscribe();
    // }, [item]);

    // 위시 핸들러 — 비회원이면 alert 후 로그인 페이지 이동
    // const handleWish = async () => {
    //     if (!user) {
    //         alert("로그인이 필요한 서비스입니다.");
    //         navigate("/login");
    //         return;
    //     }
    //     const ref = doc(db, "wishlist", `${user.uid}_${item.id}`);
    //     if (isWished) {
    //         await deleteDoc(ref);
    //         setIsWished(false);
    //     } else {
    //         await setDoc(ref, {
    //             userId: user.uid,
    //             productId: item.id,
    //             productName: item.productName,
    //             price: item.price,
    //             createdAt: new Date(),
    //         });
    //         setIsWished(true);
    //     }
    // };


    // 번들 체크박스 토글
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

        const wishItem = {
            id: item.id,
            productName: item.productName,
            price: item.price,
            device: selectedModel === "" ? item.modelKey : selectedModel,
            color: isPhone ? `${fixedThumbDeviceColor}_${selectedColor}` : selectedColor
        }
        
        onAddWishlist(wishItem);
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
        item.modelLabel,
        selectedDeviceColor,
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
                    <div className="detail-main-image">
                        <img src={mainImage} alt={item.productName} />
                    </div>
                    {/* <ul className="detail-thumb-list">
                        {imageList.map((img) => (
                            <li key={img.key} className={selectedThumb === img.key ? "active" : ""}>
                                <button type="button" onClick={() => setSelectedThumb(img.key)}>
                                    <img src={img.src} alt={`${item.productName} 썸네일`} />
                                </button>
                            </li>
                        ))}
                    </ul> */}
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

                <div className="detail-right">
                   
                    <p className="detail-artist">{item.artist || "CASETiFY"}</p>
                    <h2 className="detail-title">{item.productName}</h2>
                    <p className="detail-price">
                        {Number(item.price || 0).toLocaleString()}원
                    </p>
 <div className="right-info-wrap">
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
</div>
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
                                    {((item.price || 0) * quantity).toLocaleString()}원
                                </span>
                            </div>

                            {/* 선택된 번들 행 */}
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
    <em className="bundle-row-origin">{b.price.toLocaleString()}원</em>
    {(bundlePrice * qty).toLocaleString()}원
</span>
                                        </div>
                                    );
                                })}

                            {/* ✅ 번들 선택 시 총액에 할인 반영 */}
                            <div className="order-total">
                                <span>총 상품금액 (수량 {totalQty}개)</span>
                                <strong>{totalPrice.toLocaleString()}원</strong>
                            </div>
                        </div>
                    )}

                    {/* ====================  ~~ 아래부터 버튼 ~~======================== */}
<div className="right-btn-wrap">
                    <div className="button-list">
  <button
    className={`sub-btn wish-btn ${isWished ? "wished" : ""}`}
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
                        {/* ✅ 장바구니 버튼 - 미선택 시 alert */}
                        <button className="sub-btn" onClick={() => {
                            if (!userSelected) {
                                alert("제품을 선택해주세요.");
                                return;
                            }
                        }}>장바구니 담기</button>
                    </div>
                    {/* ✅ 바로구매 버튼 - 미선택 시 alert */}
  <button className="buy-btn" onClick={() => {
    if (!userSelected) {
        alert("제품을 선택해주세요.");
        return;
    }
}}>
    {Object.keys(selectedBundles).length > 0
        ? `함께 구매하기 (${Object.keys(selectedBundles).length})`
        : "바로 구매하기"}
</button>

                    {/* 번들 섹션 — 가로 3열 그리드 */}
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

                </div>
            </div></div>
        </section>
    );
}
