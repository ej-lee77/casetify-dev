import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./scss/CategoryPage.scss";

import { useCategoryProductStore } from "../store/useCategoryProductStore";

import CategoryHero from "../components/sub/CategoryHero";
import CategoryMenuMap from "../components/sub/CategoryMenuMap";
import CategorySubSlider from "../components/sub/CategorySubSlider";
import CategoryPhoneProductCard from "../components/sub/CategoryPhoneProductCard";
import CategoryEtcProductCard from "../components/sub/CategoryEtcProductCard";
import CategoryFilterButton from "../components/sub/CategoryFilterButton";
import CategoryFilterPanel from "../components/sub/CategoryFilterPanel";

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();
    const [searchParams] = useSearchParams();

    const activeMini = searchParams.get("mini") || null;

    const [panelType, setPanelType] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    // { brand, modelKey, modelLabel } | null

    const {
        items,
        mainMenuList,
        categoryItems,
        onFilterCategory,
    } = useCategoryProductStore();

    const currentMain = mainMenuList.find((main) => main.link === mainCate);
    const currentSub = currentMain?.sub?.find((sub) => sub.link === subCate);

    const mainCateKo = currentMain?.name || "";
    const subCateKo = currentSub?.name || "";
    const mainSubList = currentMain?.sub || [];
    const miniCate = currentSub?.mini || [];

    useEffect(() => {
        if (!mainCate || !subCate) return;
        if (!items.length) return;

        onFilterCategory(mainCate, subCate, activeMini);
    }, [items, mainCate, subCate, activeMini, onFilterCategory]);

    useEffect(() => {
        setSelectedDevice(null);
    }, [mainCate, subCate, activeMini]);

    const filteredCategoryItems = useMemo(() => {
        if (!selectedDevice?.modelKey) return categoryItems;

        return categoryItems.filter(
            (item) => item.modelKey === selectedDevice.modelKey
        );
    }, [categoryItems, selectedDevice]);

    const visibleCategoryItems = useMemo(() => {
        const seen = new Set();

        return filteredCategoryItems.filter((item) => {
            const key = `${item.productName}_${item.caseCategory}`;

            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [filteredCategoryItems]);

    const handleOpenFilter = () => {
        setPanelType("filter");
    };

    const handleOpenDevice = () => {
        setPanelType("device");
    };

    const handleClosePanel = () => {
        setPanelType(null);
    };

    const handleSelectDevice = (device) => {
        setSelectedDevice(device);
        setPanelType(null);
    };

    const handleResetDevice = () => {
        setSelectedDevice(null);
    };

    return (
        <div className="sub-page-wrap category-wrap">
            <div className="inner">
                <CategoryHero
                    mainCate={mainCate}
                    subCate={subCate}
                    mainCateKo={mainCateKo}
                    subCateKo={subCateKo}
                />

                <CategoryMenuMap
                    mainCate={mainCate}
                    mainCateKo={mainCateKo}
                    subCateKo={subCateKo}
                    mainSubList={mainSubList}
                />

                {miniCate.length > 0 && (
                    <CategorySubSlider miniCate={miniCate} />
                )}

                <div className="category-action-row">
                    {activeMini && (
                        <>
                            <button
                                type="button"
                                className={`device-select-btn ${panelType === "device" ? "on" : ""}`}
                                onClick={handleOpenDevice}
                            >
                                {selectedDevice?.modelLabel || "모델 선택"}
                            </button>

                            {selectedDevice && (
                                <button
                                    type="button"
                                    className="device-reset-btn"
                                    onClick={handleResetDevice}
                                >
                                    선택취소
                                </button>
                            )}
                        </>
                    )}

                    <div className="filter-btn-wrap">
                        <CategoryFilterButton
                            onClick={handleOpenFilter}
                            isOpen={panelType === "filter"}
                        />
                    </div>
                </div>

                <CategoryFilterPanel
                    isOpen={!!panelType}
                    onClose={handleClosePanel}
                    panelType={panelType}
                    activeMini={activeMini}
                    items={categoryItems}
                    onSelectDevice={handleSelectDevice}
                />

                <ul className="category-product-list">
                    {visibleCategoryItems.map((item) =>
                        item.productTarget === "phone" ? (
                            <CategoryPhoneProductCard
                                key={item.id}
                                item={item}
                            />
                        ) : (
                            <CategoryEtcProductCard
                                key={item.id}
                                item={item}
                            />
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}