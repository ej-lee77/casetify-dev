import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { brandDeviceOptions } from "../data/ysData";
import { useCategoryProductStore } from "../store/useCategoryProductStore";
import DetailProductCard from "../components/sub/DetailProductCard";
import "./scss/CategoryPage.scss";

const colorMap = {
    Black: "#111111",
    Orange: "#ff8a00",
    Pink: "#f58bb6",
    Lavendar: "#c8b4ff",
    "Matte Black": "#2b2b2b",
    Clear: "#f1f1f1",
    Purple: "#7b61ff",
    Blue: "#4c8dff",
    Navy: "#1f3b73",
};

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();

    const {
        mainMenuList,
        categoryItems,
        onFetchItems,
        onFilterCategory,
    } = useCategoryProductStore();

    const [activeMini, setActiveMini] = useState("");

    const [sortType, setSortType] = useState("recommend");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [selectedDevice, setSelectedDevice] = useState("");
    const [isDeviceOpen, setIsDeviceOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("Apple");

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCaseCategory, setSelectedCaseCategory] = useState("");
    const [selectedMagSafe, setSelectedMagSafe] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const currentMain = mainMenuList.find((main) => main.link === mainCate);
    const currentSub = currentMain?.sub?.find((sub) => sub.link === subCate);

    const mainCateKo = currentMain?.name || "";
    const subCateKo = currentSub?.name || "";
    const miniCate = currentSub?.mini || [];

    const canSelectDevice = !!activeMini;

    const MINI_ICON = {
        핸드폰: "phone",
        이어폰: "earphone",
        노트북: "laptop",
        워치: "watch",
        태블릿: "tablet",
        컬러: "color",
        패턴: "pattern",
        시그니처: "signature",
        캐릭터: "character",
        아트: "art",
        "영화&엔터": "movie",
        "패션&라이프스타일": "fashion",
        스포츠: "sports",
    };

    const SORT_OPTIONS = [
        { key: "recommend", label: "추천순" },
        { key: "popular", label: "인기순" },
        { key: "highPrice", label: "높은가격순" },
        { key: "lowPrice", label: "낮은가격순" },
    ];

    useEffect(() => {
        onFetchItems();
    }, [onFetchItems]);

    useEffect(() => {
        setActiveMini("");
        setSortType("recommend");
        setIsSortOpen(false);

        setSelectedDevice("");
        setIsDeviceOpen(false);
        setSelectedBrand("Apple");

        setSelectedCaseCategory("");
        setSelectedMagSafe("");
        setSelectedColor("");
        setIsFilterOpen(false);
    }, [mainCate, subCate]);

    useEffect(() => {
        if (!mainCateKo || !subCateKo) return;

        if (activeMini) {
            onFilterCategory(mainCateKo, subCateKo, activeMini);
        } else {
            onFilterCategory(mainCateKo, subCateKo);
        }
    }, [mainCateKo, subCateKo, activeMini, onFilterCategory]);

    const onHandleMiniCategory = (mini) => {
        const nextMini = activeMini === mini ? "" : mini;

        setActiveMini(nextMini);

        setSelectedDevice("");
        setIsDeviceOpen(false);

        setSelectedCaseCategory("");
        setSelectedMagSafe("");
        setSelectedColor("");
        setIsFilterOpen(false);
    };

    const onHandleDeviceSelect = (device) => {
        setSelectedDevice((prev) => (prev === device ? "" : device));
        setIsDeviceOpen(false);
    };

    const resetFilters = () => {
        setSelectedCaseCategory("");
        setSelectedMagSafe("");
        setSelectedColor("");
        setSelectedDevice("");
    };

    const caseCategoryOptions = [...new Set(categoryItems.map((item) => item.caseCategory))];
    const colorOptions = Object.keys(colorMap);

    const deviceFilteredItems = selectedDevice
        ? categoryItems.filter((item) => item.selectedDevice === selectedDevice)
        : categoryItems;

    const filteredItems = deviceFilteredItems.filter((item) => {
        if (selectedCaseCategory && item.caseCategory !== selectedCaseCategory) return false;

        if (selectedMagSafe !== "") {
            const isMagSafeValue = selectedMagSafe === "true";
            if (item.isMagSafe !== isMagSafeValue) return false;
        }

        if (selectedColor && !(item.caseColors || []).includes(selectedColor)) return false;

        return true;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortType === "popular") {
            return b.popularity - a.popularity;
        }

        if (sortType === "highPrice") {
            return b.price - a.price;
        }

        if (sortType === "lowPrice") {
            return a.price - b.price;
        }

        return 0;
    });

    const selectedFilterTags = useMemo(() => {
        const tags = [];

        if (activeMini) {
            tags.push({
                key: "mini",
                label: activeMini,
                onRemove: () => {
                    setActiveMini("");
                    setSelectedDevice("");
                    setIsDeviceOpen(false);
                },
            });
        }

        if (selectedDevice) {
            tags.push({
                key: "device",
                label: selectedDevice,
                onRemove: () => setSelectedDevice(""),
            });
        }

        if (selectedCaseCategory) {
            tags.push({
                key: "caseCategory",
                label: selectedCaseCategory,
                onRemove: () => setSelectedCaseCategory(""),
            });
        }

        if (selectedMagSafe) {
            tags.push({
                key: "magSafe",
                label: selectedMagSafe === "true" ? "맥세이프 지원" : "맥세이프 미지원",
                onRemove: () => setSelectedMagSafe(""),
            });
        }

        if (selectedColor) {
            tags.push({
                key: "color",
                label: selectedColor,
                onRemove: () => setSelectedColor(""),
            });
        }

        return tags;
    }, [activeMini, selectedDevice, selectedCaseCategory, selectedMagSafe, selectedColor]);

    return (
        <div className="sub-page-wrap category-wrap">
            <div className="inner">
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
                        <span>{mainCateKo}</span>
                        <span> &gt; </span>
                        <span>{subCateKo}</span>
                    </div>

                    {miniCate.length > 0 && (
                        <ul className="mini-menu">
                            {miniCate.map((mini) => (
                                <li
                                    key={mini}
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
                    )}

                    <div className="category-control-wrap">
                        <div className="category-control-left">
                            <div className="filter-wrap">
                                <button
                                    type="button"
                                    className="filter-open-btn"
                                    onClick={() => setIsFilterOpen((prev) => !prev)}
                                >
                                    필터
                                </button>

                                {isFilterOpen && (
                                    <div className="filter-panel">
                                        <div className="filter-group">
                                            <p className="filter-title">케이스 종류</p>
                                            <div className="filter-option-list">
                                                {caseCategoryOptions.map((category) => (
                                                    <button
                                                        key={category}
                                                        type="button"
                                                        className={selectedCaseCategory === category ? "active" : ""}
                                                        onClick={() =>
                                                            setSelectedCaseCategory((prev) =>
                                                                prev === category ? "" : category
                                                            )
                                                        }
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="filter-group">
                                            <p className="filter-title">맥세이프</p>
                                            <div className="filter-option-list">
                                                <button
                                                    type="button"
                                                    className={selectedMagSafe === "true" ? "active" : ""}
                                                    onClick={() =>
                                                        setSelectedMagSafe((prev) => (prev === "true" ? "" : "true"))
                                                    }
                                                >
                                                    지원
                                                </button>
                                                <button
                                                    type="button"
                                                    className={selectedMagSafe === "false" ? "active" : ""}
                                                    onClick={() =>
                                                        setSelectedMagSafe((prev) => (prev === "false" ? "" : "false"))
                                                    }
                                                >
                                                    미지원
                                                </button>
                                            </div>
                                        </div>

                                        <div className="filter-group">
                                            <p className="filter-title">컬러</p>
                                            <div className="filter-option-list color">
                                                {colorOptions.map((color) => (
                                                    <button
                                                        key={color}
                                                        type="button"
                                                        className={`color-chip ${selectedColor === color ? "active" : ""}`}
                                                        onClick={() =>
                                                            setSelectedColor((prev) =>
                                                                prev === color ? "" : color
                                                            )
                                                        }
                                                        style={{ backgroundColor: colorMap[color] }}
                                                        title={color}
                                                        aria-label={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="filter-bottom">
                                            <button
                                                type="button"
                                                className="filter-reset-btn"
                                                onClick={resetFilters}
                                            >
                                                초기화
                                            </button>

                                            <button
                                                type="button"
                                                className="filter-close-btn"
                                                onClick={() => setIsFilterOpen(false)}
                                            >
                                                닫기
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="device-select-wrap">
                                <button
                                    type="button"
                                    className={`device-select-btn ${!canSelectDevice ? "disabled" : ""}`}
                                    onClick={() => {
                                        if (!canSelectDevice) return;
                                        setIsDeviceOpen((prev) => !prev);
                                    }}
                                >
                                    {!canSelectDevice
                                        ? "mini 먼저 선택"
                                        : (selectedDevice || "기기 선택")}
                                </button>

                                {isDeviceOpen && canSelectDevice && (
                                    <div className="device-select-panel">
                                        <div className="device-brand-tabs">
                                            {Object.keys(brandDeviceOptions).map((brand) => (
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

                                        <div className="device-model-list">
                                            {brandDeviceOptions[selectedBrand]?.map((device) => (
                                                <button
                                                    key={device}
                                                    type="button"
                                                    className={selectedDevice === device ? "active" : ""}
                                                    onClick={() => onHandleDeviceSelect(device)}
                                                >
                                                    {device}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="device-panel-bottom">
                                            <button
                                                type="button"
                                                className="device-clear-btn"
                                                onClick={() => {
                                                    setSelectedDevice("");
                                                    setIsDeviceOpen(false);
                                                }}
                                            >
                                                선택취소
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="category-control-right">
                            <div className="sort-wrap">
                                <button
                                    type="button"
                                    className="sort-btn"
                                    onClick={() => setIsSortOpen((prev) => !prev)}
                                >
                                    {SORT_OPTIONS.find((option) => option.key === sortType)?.label}
                                </button>

                                {isSortOpen && (
                                    <ul className="sort-list">
                                        {SORT_OPTIONS.map((option) => (
                                            <li key={option.key}>
                                                <button
                                                    type="button"
                                                    className={sortType === option.key ? "active" : ""}
                                                    onClick={() => {
                                                        setSortType(option.key);
                                                        setIsSortOpen(false);
                                                    }}
                                                >
                                                    {option.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {selectedFilterTags.length > 0 && (
                        <div className="selected-filter-wrap">
                            <ul className="selected-filter-list">
                                {selectedFilterTags.map((tag) => (
                                    <li key={tag.key} className="selected-filter-tag">
                                        <span>{tag.label}</span>
                                        <button
                                            type="button"
                                            onClick={tag.onRemove}
                                            aria-label={`${tag.label} 삭제`}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className="selected-filter-reset"
                                onClick={() => {
                                    setActiveMini("");
                                    resetFilters();
                                }}
                            >
                                전체 삭제
                            </button>
                        </div>
                    )}

                    {sortedItems.length > 0 ? (
                        <ul className="product-list">
                            {sortedItems.map((item) => (
                                <DetailProductCard key={item.id} item={item} />
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-message">해당 조건의 상품이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}