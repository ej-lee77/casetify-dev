import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./scss/CategoryPage.scss";
import { MINI_QUERY_MAP } from "../data/categoryMap";
import { useCategoryProductStore } from "../store/useCategoryProductStore";
import { groupModelsByProductName } from "../utils/groupProducts";
import CategoryHero from "../components/sub/CategoryHero";
import CategoryMiniIcon from "../components/sub/CategoryMiniIcon";
import CategoryPhoneProductCard from "../components/sub/CategoryPhoneProductCard";
import CategoryEtcProductCard from "../components/sub/CategoryEtcProductCard";

const DEVICE_SELECT_MINI = ["phone", "earphone", "watch", "tablet", "laptop"];

const SORT_OPTIONS = [
    { key: "recommend", label: "추천순" },
    { key: "popular", label: "인기순" },
    { key: "priceLow", label: "낮은 가격순" },
    { key: "priceHigh", label: "높은 가격순" },
    { key: "new", label: "신상품순" },
];

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const mini = searchParams.get("mini") || "";
    const sort = searchParams.get("sort") || "recommend";

    const {
        categoryItems,
        mainMenuList,
        onFilterCategory,
    } = useCategoryProductStore();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDeviceSelectOpen, setIsDeviceSelectOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("Apple");
    const [selectedModelKey, setSelectedModelKey] = useState("");

    const [selectedFilters, setSelectedFilters] = useState({
        stockOnly: false,
        selectedColors: [],
        minPrice: "",
        maxPrice: "",
    });

    useEffect(() => {
        if (!mainCate) return;
        onFilterCategory(mainCate, subCate, mini);
    }, [mainCate, subCate, mini, onFilterCategory]);

    useEffect(() => {
        setSelectedModelKey("");
        setIsDeviceSelectOpen(false);
    }, [mini, mainCate, subCate]);

    const currentMain = useMemo(() => {
        return mainMenuList?.find((item) => item.link === mainCate);
    }, [mainMenuList, mainCate]);

    const currentSub = useMemo(() => {
        return currentMain?.sub?.find((item) => item.link === subCate);
    }, [currentMain, subCate]);

    const miniCate = currentSub?.mini || [];

    const currentMiniLabel = useMemo(() => {
        const found = miniCate.find((item) => {
            const itemKey = MINI_QUERY_MAP[item] || item;
            return itemKey === mini;
        });

        return found || "";
    }, [miniCate, mini]);

    const canOpenDeviceSelect = DEVICE_SELECT_MINI.includes(mini);

    const onHandleMiniCategory = (miniValue) => {
        const next = new URLSearchParams(searchParams);
        next.set("mini", miniValue);
        setSearchParams(next);
    };

    const groupedItems = useMemo(() => {
        return groupModelsByProductName(categoryItems || []);
    }, [categoryItems]);

    const availableModelOptions = useMemo(() => {
        const allItems = groupedItems.flatMap((group) => group.items);

        const filteredByMini = allItems.filter((item) => {
            if (!mini) return true;
            return (item.displayMiniCategories || []).includes(mini);
        });

        const brandFiltered = filteredByMini.filter((item) => {
            if (!selectedBrand) return true;
            return item.brand === selectedBrand;
        });

        return Array.from(
            new Map(
                brandFiltered
                    .filter((item) => item.modelKey && item.modelLabel)
                    .map((item) => [
                        item.modelKey,
                        { key: item.modelKey, label: item.modelLabel },
                    ])
            ).values()
        );
    }, [groupedItems, mini, selectedBrand]);

    const filteredGroups = useMemo(() => {
        return groupedItems.filter((group) => {
            const groupItems = group.items || [];

            if (selectedModelKey) {
                const hasSelectedModel = groupItems.some(
                    (item) => item.modelKey === selectedModelKey
                );
                if (!hasSelectedModel) return false;
            }

            if (selectedFilters.stockOnly) {
                const hasStock = groupItems.some(
                    (item) => item.stockStatus === "inStock"
                );
                if (!hasStock) return false;
            }

            if (selectedFilters.selectedColors.length > 0) {
                const hasColor = groupItems.some((item) =>
                    selectedFilters.selectedColors.some((color) =>
                        (item.caseColors || []).includes(color)
                    )
                );
                if (!hasColor) return false;
            }

            if (selectedFilters.minPrice !== "") {
                const hasMinPrice = groupItems.some(
                    (item) => Number(item.price) >= Number(selectedFilters.minPrice)
                );
                if (!hasMinPrice) return false;
            }

            if (selectedFilters.maxPrice !== "") {
                const hasMaxPrice = groupItems.some(
                    (item) => Number(item.price) <= Number(selectedFilters.maxPrice)
                );
                if (!hasMaxPrice) return false;
            }

            return true;
        });
    }, [groupedItems, selectedModelKey, selectedFilters]);

    const sortedGroups = useMemo(() => {
        const copied = [...filteredGroups];

        copied.sort((a, b) => {
            const aItem = a.items?.[0];
            const bItem = b.items?.[0];

            if (!aItem || !bItem) return 0;

            if (sort === "popular") {
                return (bItem.popularity || 0) - (aItem.popularity || 0);
            }

            if (sort === "priceLow") {
                return (aItem.price || 0) - (bItem.price || 0);
            }

            if (sort === "priceHigh") {
                return (bItem.price || 0) - (aItem.price || 0);
            }

            if (sort === "new") {
                return Number(bItem.isNew) - Number(aItem.isNew);
            }

            return (aItem.recommendRank || 9999) - (bItem.recommendRank || 9999);
        });

        return copied;
    }, [filteredGroups, sort]);

    const pagedGroups = useMemo(() => {
        return sortedGroups.slice(0, 20);
    }, [sortedGroups]);

    const onChangeSort = (e) => {
        const next = new URLSearchParams(searchParams);
        next.set("sort", e.target.value);
        setSearchParams(next);
    };

    const onToggleDeviceSelect = () => {
        if (!canOpenDeviceSelect) return;
        setIsDeviceSelectOpen((prev) => !prev);
    };

    const renderCard = (group) => {
        const baseItem =
            selectedModelKey
                ? group.items.find((item) => item.modelKey === selectedModelKey) || group.items[0]
                : group.items[0];

        if (!baseItem) return null;

        if (baseItem.productTarget === "phone") {
            return (
                <CategoryPhoneProductCard
                    item={baseItem}
                    modelLabels={group.modelLabels}
                />
            );
        }

        return (
            <CategoryEtcProductCard
                item={baseItem}
                modelLabels={group.modelLabels}
            />
        );
    };

    return (
        <div className="sub-page-wrap category-wrap">
            <CategoryHero
                mainCate={mainCate}
                subCate={subCate}
                mainCateKo={currentMain?.name}
                subCateKo={currentSub?.name}
            />

            <div className="inner">
                <div className="category-breadcrumb">
                    홈 &gt; {currentSub?.name || currentMain?.name || ""}
                </div>

                {!!miniCate.length && (
                    <ul className="category-sub-slider">
                        {miniCate.map((miniItem, idx) => {
                            const miniKey = MINI_QUERY_MAP[miniItem] || miniItem;

                            return (
                                <CategoryMiniIcon
                                    key={`${miniItem}-${idx}`}
                                    miniKey={miniKey}
                                    label={miniItem}
                                    isActive={mini === miniKey}
                                    onClick={() => onHandleMiniCategory(miniKey)}
                                />
                            );
                        })}
                    </ul>
                )}

                <div className="category-action-row">
                    <div className="filter-btn-wrap">
                        <button
                            type="button"
                            className={`category-filter-btn ${isFilterOpen ? "on" : ""}`}
                            onClick={() => setIsFilterOpen((prev) => !prev)}
                        >
                            <span className="label">필터</span>
                        </button>
                    </div>

                    <div className="device-select-wrap">
                        <button
                            type="button"
                            className={`device-select-btn ${isDeviceSelectOpen ? "on" : ""}`}
                            onClick={onToggleDeviceSelect}
                            disabled={!canOpenDeviceSelect}
                        >
                            {selectedModelKey
                                ? availableModelOptions.find((item) => item.key === selectedModelKey)?.label || "기기선택"
                                : "기기모델 선택"}
                        </button>

                        {selectedModelKey && (
                            <button
                                type="button"
                                className="device-reset-btn"
                                onClick={() => setSelectedModelKey("")}
                            >
                                선택취소
                            </button>
                        )}

                        {isDeviceSelectOpen && canOpenDeviceSelect && (
                            <div className="device-select-panel">
                                <div className="device-select-header">
                                    <h3>기기모델 선택</h3>
                                    <button
                                        type="button"
                                        className="device-panel-close"
                                        onClick={() => setIsDeviceSelectOpen(false)}
                                    >
                                        닫기
                                    </button>
                                </div>

                                <div className="device-brand-tabs">
                                    {["Apple", "Samsung", "Google"].map((brand) => (
                                        <button
                                            type="button"
                                            key={brand}
                                            className={selectedBrand === brand ? "on" : ""}
                                            onClick={() => setSelectedBrand(brand)}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>

                                <ul className="device-model-list">
                                    {availableModelOptions.length > 0 ? (
                                        availableModelOptions.map((model) => (
                                            <li
                                                key={model.key}
                                                className={selectedModelKey === model.key ? "on" : ""}
                                                onClick={() => {
                                                    setSelectedModelKey(model.key);
                                                    setIsDeviceSelectOpen(false);
                                                }}
                                            >
                                                {model.label}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="empty">선택 가능한 모델이 없어요.</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="sort-select-wrap">
                        <select value={sort} onChange={onChangeSort}>
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="selected-tags-row">
                    {selectedModelKey && (
                        <button
                            type="button"
                            className="selected-tag"
                            onClick={() => setSelectedModelKey("")}
                        >
                            {availableModelOptions.find((item) => item.key === selectedModelKey)?.label} ×
                        </button>
                    )}

                    {currentMiniLabel && (
                        <button
                            type="button"
                            className="selected-tag"
                            onClick={() => {
                                const next = new URLSearchParams(searchParams);
                                next.delete("mini");
                                setSearchParams(next);
                            }}
                        >
                            {currentMiniLabel} ×
                        </button>
                    )}
                </div>

                <ul className="category-product-list">
                    {pagedGroups.map((group) => (
                        <li key={`${group.productName}-${group.caseCategory}`}>
                            {renderCard(group)}
                        </li>
                    ))}
                </ul>

                <div className="category-pagination">
                    <button type="button">&laquo;</button>
                    <button type="button">&lsaquo;</button>
                    <button type="button" className="on">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">&rsaquo;</button>
                    <button type="button">&raquo;</button>
                </div>
            </div>
        </div>
    );
}