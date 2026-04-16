import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { useCategoryStore } from '../store/useCategoryStore';
import "./scss/CategoryPage.scss";
import DetailProductCard from '../components/sub/DetailProductCard';

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();
    const [activeMini, setActiveMini] = useState(null);

    const {
        items,
        onFetchItems,
        mainMenuList,
        filterItems,
        onFilterMainCate,
    } = useProductStore();

    const {
        setBaseItems,
        displayItems,
        currentMiniCategory,

        isFilterOpen,
        isDeviceOpen,
        openFilterPanel,
        openDevicePanel,
        closePanels,

        selectedBrand,
        setSelectedBrand,

        selectedFilters,
        colorOptions,
        caseCategoryOptions,
        brandDeviceOptions,
        deviceOptions,

        toggleColor,
        toggleCaseCategory,
        toggleDevice,
        setFreeShipping,
        removeFilter,
        clearAllFilters,
    } = useCategoryStore();

    const currentMain = mainMenuList.find((main) => main.link === mainCate);
    const currentSub = currentMain?.sub?.find((sub) => sub.link === subCate);

    const mainCateKo = currentMain?.name;
    const subCateKo = currentSub?.name;
    const miniCate = currentSub?.mini;

    const MINI_ICON = {
        "핸드폰": "phone",
        "이어폰": "earphone",
        "노트북": "laptop",
        "워치": "watch",
        "태블릿": "tablet",
        "컬러": "color",
        "패턴": "pattern",
        "시그니처": "signature",
        "캐릭터": "character",
        "아트": "art",
        "영화&엔터": "movie",
        "패션&라이프스타일": "fashion",
        "스포츠": "sports",
    };

    useEffect(() => {
        onFetchItems();
    }, []);

    useEffect(() => {
        if (!items.length || !mainCateKo || !subCateKo) return;

        setActiveMini(null);
        onFilterMainCate(mainCateKo, subCateKo);
    }, [items, mainCateKo, subCateKo]);

    useEffect(() => {
        setBaseItems(filterItems, activeMini);
    }, [filterItems, activeMini, setBaseItems]);

    const onHandleMiniCategory = (mini) => {
        setActiveMini(mini);
        onFilterMainCate(mainCateKo, subCateKo, mini);
        closePanels();
    };

    const currentMini = currentMiniCategory || filterItems?.[0]?.miniCategory || null;
    const isPhoneMini = currentMini === "핸드폰";

    const showDeviceButton =
        (mainCateKo === "케이스" || mainCateKo === "악세서리") &&
        (deviceOptions.length > 0 ||
            brandDeviceOptions.Apple.length > 0 ||
            brandDeviceOptions.Samsung.length > 0 ||
            brandDeviceOptions.Google.length > 0);

    const hasColorFilter = colorOptions.length > 0;
    const hasCaseCategoryFilter = caseCategoryOptions.length > 0;
    const hasDeviceFilter = isPhoneMini
        ? (
            brandDeviceOptions.Apple.length > 0 ||
            brandDeviceOptions.Samsung.length > 0 ||
            brandDeviceOptions.Google.length > 0
        )
        : deviceOptions.length > 0;

    const selectedTagList = useMemo(() => {
        return [
            ...selectedFilters.colors.map((color) => ({
                type: "color",
                label: color,
            })),
            ...selectedFilters.caseCategories.map((category) => ({
                type: "caseCategory",
                label: category,
            })),
            ...selectedFilters.devices.map((device) => ({
                type: "device",
                label: device,
            })),
            ...(selectedFilters.freeShipping
                ? [{ type: "freeShipping", label: "무료 배송" }]
                : []),
        ];
    }, [selectedFilters]);

    return (
        <div className="sub-page-wrap">
            <div className="sub-slider">
                <img
                    src={`/images/category/slider/${mainCate}-${subCate}.png`}
                    alt={subCateKo}
                />
            </div>

            <div className="inner">
                <div className="menu-map">
                    <span>홈</span>
                    <span> &gt; </span>
                    <span>{subCateKo}</span>
                    {currentMini && (
                        <>
                            <span> &gt; </span>
                            <span>{currentMini}</span>
                        </>
                    )}
                </div>

                {miniCate ? (
                    <ul className="mini-menu">
                        {miniCate.map((mini, id) => (
                            <li
                                key={id}
                                onClick={() => onHandleMiniCategory(mini)}
                                className={activeMini === mini ? "active" : ""}
                            >

                                <img
                                    src={`/images/category/mini/${MINI_ICON[mini]}.png`}
                                    alt={mini}
                                />
                                <p>{mini}</p>

                            </li>
                        ))}
                    </ul>
                ) : null}

                <div className="filtering">
                    <button type="button" onClick={openFilterPanel}>
                        필터
                    </button>

                    {showDeviceButton && (
                        <button type="button" onClick={openDevicePanel}>
                            기기선택
                        </button>
                    )}
                </div>

                {selectedTagList.length > 0 && (
                    <div className="selected-filter-tags">
                        {selectedTagList.map((tag, index) => (
                            <button
                                key={`${tag.type}-${tag.label}-${index}`}
                                type="button"
                                className="selected-tag"
                                onClick={() => removeFilter(tag.type, tag.label)}
                            >
                                <span>{tag.label}</span>
                                <span>×</span>
                            </button>
                        ))}

                        <button
                            type="button"
                            className="clear-all-btn"
                            onClick={clearAllFilters}
                        >
                            전체삭제
                        </button>
                    </div>
                )}

                {(isFilterOpen || isDeviceOpen) && (
                    <button
                        type="button"
                        className="filter-dim"
                        onClick={closePanels}
                        aria-label="패널 닫기"
                    />
                )}

                {isFilterOpen && (
                    <aside className="side-panel">
                        <div className="side-panel__inner">
                            <div className="side-panel__top">
                                <h3>필터</h3>
                                <button type="button" onClick={closePanels}>
                                    닫기
                                </button>
                            </div>

                            {hasColorFilter && (
                                <div className="filter-group">
                                    <h4>컬러</h4>
                                    <ul>
                                        {colorOptions.map((color) => (
                                            <li key={color}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters.colors.includes(color)}
                                                        onChange={() => toggleColor(color)}
                                                    />
                                                    <span>{color}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {hasCaseCategoryFilter && (
                                <div className="filter-group">
                                    <h4>케이스 종류</h4>
                                    <ul>
                                        {caseCategoryOptions.map((category) => (
                                            <li key={category}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters.caseCategories.includes(category)}
                                                        onChange={() => toggleCaseCategory(category)}
                                                    />
                                                    <span>{category}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="filter-group">
                                <h4>배송</h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.freeShipping}
                                        onChange={(e) => setFreeShipping(e.target.checked)}
                                    />
                                    <span>무료 배송만 보기</span>
                                </label>
                            </div>
                        </div>
                    </aside>
                )}

                {isDeviceOpen && hasDeviceFilter && (
                    <aside className="side-panel">
                        <div className="side-panel__inner">
                            <div className="side-panel__top">
                                <h3>기기선택</h3>
                                <button type="button" onClick={closePanels}>
                                    닫기
                                </button>
                            </div>

                            {isPhoneMini ? (
                                <>
                                    <div className="device-brand-tabs">
                                        {["Apple", "Samsung", "Google"].map((brand) => (
                                            <button
                                                key={brand}
                                                type="button"
                                                className={selectedBrand === brand ? "active" : ""}
                                                onClick={() => setSelectedBrand(brand)}
                                            >
                                                {brand}
                                            </button>
                                        ))}
                                    </div>

                                    <ul className="device-list">
                                        {(brandDeviceOptions[selectedBrand] || []).map((device) => (
                                            <li key={device}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters.devices.includes(device)}
                                                        onChange={() => toggleDevice(device)}
                                                    />
                                                    <span>{device}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <ul className="device-list">
                                    {deviceOptions.map((device) => (
                                        <li key={device}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters.devices.includes(device)}
                                                    onChange={() => toggleDevice(device)}
                                                />
                                                <span>{device}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </aside>
                )}

                <ul className='product-list'>
                    {displayItems.map((item) => (
                        <li key={item.id}>
                            <DetailProductCard item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}