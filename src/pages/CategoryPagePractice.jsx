import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./scss/CategoryPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { items as allItems } from "../data/finalData";
import { MINI_QUERY_MAP } from "../data/categoryMap";
import { useCategoryProductStore } from "../store/useCategoryProductStore";
import { groupModelsByProductName } from "../utils/groupProducts";

import CategoryHero from "../components/sub/CategoryHero";
import CategoryMiniIcon from "../components/sub/CategoryMiniIcon";
import CategoryPhoneProductCard from "../components/sub/CategoryPhoneProductCard";
import CategoryEtcProductCard from "../components/sub/CategoryEtcProductCard";
import CategoryFilterPanel from "../components/sub/CategoryFilterPanel";
import CategoryFilterButton from "../components/sub/CategoryFilterButton";

const ITEMS_PER_PAGE = 20;

const SORT_OPTIONS = [
    { key: "recommend", label: "추천순" },
    { key: "popular", label: "인기순" },
    { key: "priceLow", label: "낮은 가격순" },
    { key: "priceHigh", label: "높은 가격순" },
    { key: "new", label: "신상품순" },
];

function makeArtistIconKey(artist = "") {
    return artist
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function getPageNumbers(totalPages, currentPage) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
}

function getItemMainCategories(item) {
    if (Array.isArray(item.mainCategory)) return item.mainCategory;
    if (Array.isArray(item.mainCategories)) return item.mainCategories;
    if (item.mainCategory) return [item.mainCategory];
    if (item.mainCategories) return [item.mainCategories];
    return [];
}

function getMiniMode(mainCate, subCate) {
    if (mainCate === "accessory") {
        if (["protector", "magsafe", "etc"].includes(subCate)) return "caseCategory";
        return "none";
    }

    return "displayMini";
}

function getBaseItemsByRoute(items, mainCate, subCate) {
    return (items || []).filter((item) => {
        const itemMainCategories = getItemMainCategories(item);
        const subCategories = Array.isArray(item.displaySubCategories)
            ? item.displaySubCategories
            : [];

        if (mainCate === "colab") {
            if (!itemMainCategories.includes("colab")) return false;
            if (!subCate) return true;
            return subCategories.includes(subCate);
        }

        const matchMain = itemMainCategories.includes(mainCate);
        if (!matchMain) return false;

        if (!subCate) return true;

        return subCategories.includes(subCate);
    });
}

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const mini = searchParams.get("mini") || "";
    const sort = searchParams.get("sort") || "recommend";

    const { mainMenuList } = useCategoryProductStore();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeviceModelPopupOpen, setIsDeviceModelPopupOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("Apple");

    const [selectedFilters, setSelectedFilters] = useState({
        device: "",
        model: "",
        isCollabo: null,
        isMagSafe: null,
        stockOnly: false,
        minPrice: "",
        maxPrice: "",
        colors: [],
    });

    const currentMain = useMemo(() => {
        return mainMenuList?.find((item) => item.link === mainCate);
    }, [mainMenuList, mainCate]);

    const currentSub = useMemo(() => {
        return currentMain?.sub?.find((item) => item.link === subCate);
    }, [currentMain, subCate]);

    const miniMode = useMemo(() => {
        return getMiniMode(mainCate, subCate);
    }, [mainCate, subCate]);

    const routeItemsWithoutMini = useMemo(() => {
        return getBaseItemsByRoute(allItems, mainCate, subCate);
    }, [mainCate, subCate]);

    const visibleMiniItems = useMemo(() => {
        if (!currentSub) return [];

        // ⭐ 콜라보 전용 (artist mini)
        if (mainCate === "colab") {
            const artists = Array.from(
                new Set(
                    routeItemsWithoutMini
                        .map((item) => item.artist)
                        .filter(Boolean)
                )
            );

            return artists.map((artist) => ({
                key: artist,
                label: artist,
                iconKey: makeArtistIconKey(artist),
            }));
        }

        if (miniMode === "none") {
            return [];
        }

        if (miniMode === "caseCategory") {
            const categories = Array.from(
                new Set(
                    routeItemsWithoutMini
                        .map((item) => item.caseCategory)
                        .filter(Boolean)
                )
            );

            return categories.map((category) => ({
                key: category,
                label: category,
            }));
        }

        const rawMiniList = currentSub?.mini || [];

        return rawMiniList
            .map((miniLabel) => ({
                key: MINI_QUERY_MAP[miniLabel] || miniLabel,
                label: miniLabel,
            }))
            .filter((miniItem) =>
                routeItemsWithoutMini.some((item) =>
                    (item.displayMiniCategories || []).includes(miniItem.key)
                )
            );
    }, [currentSub, miniMode, routeItemsWithoutMini, mainCate]);

    const currentMiniLabel = useMemo(() => {
        const found = visibleMiniItems.find((item) => item.key === mini);
        return found?.label || "";
    }, [visibleMiniItems, mini]);

    const routeBaseItems = useMemo(() => {
        if (!mini) return routeItemsWithoutMini;

        // ⭐ 콜라보는 artist 기준 필터
        if (mainCate === "colab") {
            return routeItemsWithoutMini.filter((item) => item.artist === mini);
        }

        if (miniMode === "caseCategory") {
            return routeItemsWithoutMini.filter((item) => item.caseCategory === mini);
        }

        return routeItemsWithoutMini.filter((item) =>
            (item.displayMiniCategories || []).includes(mini)
        );
    }, [routeItemsWithoutMini, mini, miniMode, mainCate]);

    const filteredBaseItems = useMemo(() => {
        return routeBaseItems.filter((item) => {
            const {
                device,
                model,
                isCollabo,
                isMagSafe,
                stockOnly,
                minPrice,
                maxPrice,
                colors,
            } = selectedFilters;

            if (device && !(item.displayMiniCategories || []).includes(device)) return false;
            if (model && item.modelKey !== model) return false;
            if (isCollabo !== null && Boolean(item.collabo) !== isCollabo) return false;
            if (isMagSafe !== null && Boolean(item.isMagSafe) !== isMagSafe) return false;
            if (stockOnly && item.stockStatus !== "inStock") return false;
            if (minPrice !== "" && Number(item.price) < Number(minPrice)) return false;
            if (maxPrice !== "" && Number(item.price) > Number(maxPrice)) return false;

            if (colors.length > 0) {
                const hasColor = colors.some((color) => (item.caseColors || []).includes(color));
                if (!hasColor) return false;
            }

            return true;
        });
    }, [routeBaseItems, selectedFilters]);

    const groupedItems = useMemo(() => {
        return groupModelsByProductName(filteredBaseItems);
    }, [filteredBaseItems]);

    const sortedGroups = useMemo(() => {
        const copied = [...groupedItems];

        copied.sort((a, b) => {
            const aItem = a.items?.[0];
            const bItem = b.items?.[0];

            if (!aItem || !bItem) return 0;

            if (sort === "popular") return (bItem.popularity || 0) - (aItem.popularity || 0);
            if (sort === "priceLow") return (aItem.price || 0) - (bItem.price || 0);
            if (sort === "priceHigh") return (bItem.price || 0) - (aItem.price || 0);
            if (sort === "new") return Number(bItem.isNew) - Number(aItem.isNew);

            return (aItem.recommendRank || 9999) - (bItem.recommendRank || 9999);
        });

        return copied;
    }, [groupedItems, sort]);

    const deviceModelOptions = useMemo(() => {
        const filteredByBrand = routeBaseItems.filter((item) => {
            if (!item.modelKey || !item.modelLabel) return false;
            if (!selectedBrand) return true;
            return item.brand === selectedBrand;
        });

        return Array.from(
            new Map(
                filteredByBrand.map((item) => [
                    item.modelKey,
                    { key: item.modelKey, label: item.modelLabel },
                ])
            ).values()
        );
    }, [routeBaseItems, selectedBrand]);

    const totalPages = Math.ceil(sortedGroups.length / ITEMS_PER_PAGE);

    const pagedGroups = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sortedGroups.slice(startIndex, endIndex);
    }, [sortedGroups, currentPage]);

    const pageNumbers = useMemo(() => {
        return getPageNumbers(totalPages, currentPage);
    }, [totalPages, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [mainCate, subCate, mini, sort, selectedFilters]);

    useEffect(() => {
        setSelectedFilters({
            device: "",
            model: "",
            isCollabo: null,
            isMagSafe: null,
            stockOnly: false,
            minPrice: "",
            maxPrice: "",
            colors: [],
        });
        setIsFilterOpen(false);
        setIsDeviceModelPopupOpen(false);
    }, [mainCate, subCate]);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
        setIsDeviceModelPopupOpen(false);

        if (mini !== "phone" && selectedFilters.model) {
            setSelectedFilters((prev) => ({
                ...prev,
                model: "",
            }));
        }
    }, [mini, selectedFilters.model]);

    const onHandleMiniCategory = (miniValue) => {
        const next = new URLSearchParams(searchParams);

        if (mini === miniValue) {
            next.delete("mini");
        } else {
            next.set("mini", miniValue);
        }

        if (sort) next.set("sort", sort);

        setSearchParams(next);
    };

    const onChangeSort = (e) => {
        const next = new URLSearchParams(searchParams);
        next.set("sort", e.target.value);
        if (mini) next.set("mini", mini);
        setSearchParams(next);
    };

    const appliedTags = useMemo(() => {
        const tags = [];

        if (currentSub?.name) {
            tags.push({ type: "sub", value: currentSub.link, label: currentSub.name });
        }

        if (currentMiniLabel) {
            tags.push({ type: "mini", value: mini, label: currentMiniLabel });
        }

        if (selectedFilters.model) {
            const modelItem = routeBaseItems.find(
                (item) => item.modelKey === selectedFilters.model
            );

            tags.push({
                type: "model",
                value: selectedFilters.model,
                label: modelItem?.modelLabel || selectedFilters.model,
            });
        }

        if (selectedFilters.isCollabo === true) {
            tags.push({ type: "isCollabo", value: true, label: "콜라보만" });
        }

        if (selectedFilters.isCollabo === false) {
            tags.push({ type: "isCollabo", value: false, label: "일반 상품만" });
        }

        if (selectedFilters.isMagSafe === true) {
            tags.push({ type: "isMagSafe", value: true, label: "맥세이프 가능" });
        }

        if (selectedFilters.isMagSafe === false) {
            tags.push({ type: "isMagSafe", value: false, label: "일반 케이스" });
        }

        if (selectedFilters.stockOnly) {
            tags.push({ type: "stockOnly", value: true, label: "품절 제외" });
        }

        if (selectedFilters.minPrice || selectedFilters.maxPrice) {
            tags.push({
                type: "price",
                value: "price",
                label: `${selectedFilters.minPrice || 0}원 ~ ${selectedFilters.maxPrice || "∞"}원`,
            });
        }

        selectedFilters.colors.forEach((color) => {
            tags.push({ type: "colors", value: color, label: color });
        });

        return tags;
    }, [currentSub, currentMiniLabel, mini, selectedFilters, routeBaseItems]);

    const removeTag = (tag) => {
        if (tag.type === "mini") {
            const next = new URLSearchParams(searchParams);
            next.delete("mini");
            if (sort) next.set("sort", sort);
            setSearchParams(next);
            return;
        }

        if (tag.type === "model") {
            setSelectedFilters((prev) => ({
                ...prev,
                model: "",
            }));
            return;
        }

        if (tag.type === "isCollabo") {
            setSelectedFilters((prev) => ({ ...prev, isCollabo: null }));
            return;
        }

        if (tag.type === "isMagSafe") {
            setSelectedFilters((prev) => ({ ...prev, isMagSafe: null }));
            return;
        }

        if (tag.type === "stockOnly") {
            setSelectedFilters((prev) => ({ ...prev, stockOnly: false }));
            return;
        }

        if (tag.type === "price") {
            setSelectedFilters((prev) => ({ ...prev, minPrice: "", maxPrice: "" }));
            return;
        }

        if (tag.type === "colors") {
            setSelectedFilters((prev) => ({
                ...prev,
                colors: prev.colors.filter((item) => item !== tag.value),
            }));
        }
    };

    const handleApplyFilters = ({ nextSubCateLink, nextMini, filters }) => {
        const nextParams = new URLSearchParams();

        if (nextMini) nextParams.set("mini", nextMini);
        if (sort) nextParams.set("sort", sort);

        setSelectedFilters(filters);
        setIsFilterOpen(false);

        navigate(`/${mainCate}/${nextSubCateLink}${nextParams.toString() ? `?${nextParams.toString()}` : ""}`);
    };

    const renderCard = (group) => {
        const baseItem = group.items?.[0];
        if (!baseItem) return null;

        if (baseItem.productTarget === "phone") {
            return <CategoryPhoneProductCard item={baseItem} modelLabels={group.modelLabels} />;
        }

        return <CategoryEtcProductCard item={baseItem} modelLabels={group.modelLabels} />;
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
                    <Link to="/">홈</Link>
                    {currentMain?.name && (
                        <>
                            <span> &gt; </span>
                            <span>{currentMain.name}</span>
                        </>
                    )}
                    {/* {currentSub?.name && (
                        <>
                            <span> &gt; </span>
                            <span>{currentSub.name}</span>
                        </>
                    )}
                    {currentMiniLabel && (
                        <>
                            <span> &gt; </span>
                            <span>{currentMiniLabel}</span>
                        </>
                    )} */}
                </div>

                {!!visibleMiniItems.length && (
                    <>
                        {visibleMiniItems.length > 10 ? (
                            <Swiper
                                modules={[Autoplay]}
                                className={`category-sub-slider-swiper ${mini ? "has-active" : ""}`}
                                slidesPerView="auto"
                                spaceBetween={36}
                                loop={visibleMiniItems.length > 10}
                                speed={600}
                                grabCursor={true}
                                simulateTouch={true}
                                touchRatio={1}
                                touchStartPreventDefault={false}
                                autoplay={{
                                    delay: 2800,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                            >
                                {visibleMiniItems.map((miniItem, idx) => (
                                    <SwiperSlide key={`${miniItem.key}-${idx}`}>
                                        <CategoryMiniIcon
                                            miniKey={
                                                mainCate === "colab"
                                                    ? miniItem.iconKey || "etc"
                                                    : miniMode === "caseCategory"
                                                        ? (MINI_QUERY_MAP[miniItem.key] || "etc")
                                                        : miniItem.key
                                            }
                                            label={miniItem.label}
                                            isActive={mini === miniItem.key}
                                            onClick={() => onHandleMiniCategory(miniItem.key)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <ul className={`category-sub-slider ${mini ? "has-active" : ""}`}>
                                {visibleMiniItems.map((miniItem, idx) => (
                                    <CategoryMiniIcon
                                        key={`${miniItem.key}-${idx}`}
                                        miniKey={
                                            mainCate === "colab"
                                                ? miniItem.iconKey || "etc"
                                                : miniMode === "caseCategory"
                                                    ? (MINI_QUERY_MAP[miniItem.key] || "etc")
                                                    : miniItem.key
                                        }
                                        label={miniItem.label}
                                        isActive={mini === miniItem.key}
                                        onClick={() => onHandleMiniCategory(miniItem.key)}
                                    />
                                ))}
                            </ul>
                        )}
                    </>
                )}

                <div className="category-top-row">
                    <div className="category-top-left">
                        <CategoryFilterButton onClick={() => setIsFilterOpen(true)} />

                        {mini === "phone" && mainCate !== "colab" && (
                            <div className="device-model-popup-wrap">
                                <button
                                    type="button"
                                    className={`device-model-inline-box ${isDeviceModelPopupOpen ? "on" : ""}`}
                                    onClick={() => setIsDeviceModelPopupOpen((prev) => !prev)}
                                >
                                    <span className="device-model-label">모델 선택</span>

                                    <span className="device-model-value">
                                        {selectedFilters.model
                                            ? routeBaseItems.find(
                                                (item) => item.modelKey === selectedFilters.model
                                            )?.modelLabel || "선택됨"
                                            : "선택 안됨"}
                                    </span>
                                </button>

                                {isDeviceModelPopupOpen && (
                                    <div className="device-model-popup-panel">
                                        <div className="device-popup-header-inline">
                                            <div className="device-brand-tabs">
                                                {["Apple", "Samsung", "Google"].map((brand) => (
                                                    <button
                                                        key={brand}
                                                        className={selectedBrand === brand ? "on" : ""}
                                                        onClick={() => setSelectedBrand(brand)}
                                                    >
                                                        {brand}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                className="device-popup-close"
                                                onClick={() => setIsDeviceModelPopupOpen(false)}
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <ul className="device-model-list">
                                            {deviceModelOptions.map((model) => (
                                                <li
                                                    key={model.key}
                                                    className={selectedFilters.model === model.key ? "on" : ""}
                                                    onClick={() => {
                                                        setSelectedFilters((prev) => ({
                                                            ...prev,
                                                            model: prev.model === model.key ? "" : model.key,
                                                        }));
                                                    }}
                                                >
                                                    {model.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <p className="result-count">
                            총 <strong>{sortedGroups.length}</strong>개
                        </p>
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

                {!!appliedTags.length && (
                    <div className="selected-tags-row">
                        {appliedTags.map((tag, index) => (
                            <button
                                type="button"
                                key={`${tag.type}-${tag.value}-${index}`}
                                className="selected-tag"
                                onClick={() => removeTag(tag)}
                            >
                                {tag.label} ×
                            </button>
                        ))}
                    </div>
                )}

                <ul className="category-product-list">
                    {pagedGroups.map((group) => (
                        <li key={`${group.productName}-${group.caseCategory}`}>
                            {renderCard(group)}
                        </li>
                    ))}
                </ul>

                {totalPages > 1 && (
                    <div className="category-pagination">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            &laquo;
                        </button>

                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            &lsaquo;
                        </button>

                        {pageNumbers[0] > 1 && (
                            <>
                                <button type="button" onClick={() => setCurrentPage(1)}>1</button>
                                {pageNumbers[0] > 2 && <span className="page-ellipsis">…</span>}
                            </>
                        )}

                        {pageNumbers.map((pageNumber) => (
                            <button
                                type="button"
                                key={pageNumber}
                                className={currentPage === pageNumber ? "on" : ""}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        {pageNumbers[pageNumbers.length - 1] < totalPages && (
                            <>
                                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                    <span className="page-ellipsis">…</span>
                                )}
                                <button type="button" onClick={() => setCurrentPage(totalPages)}>
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            type="button"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            &rsaquo;
                        </button>

                        <button
                            type="button"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            &raquo;
                        </button>
                    </div>
                )}
            </div>

            <CategoryFilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={handleApplyFilters}
                mainCate={mainCate}
                currentMain={currentMain}
                currentSub={currentSub}
                currentMini={mini}
                allItems={allItems}
                selectedFilters={selectedFilters}
            />
        </div>
    );
}