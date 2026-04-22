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

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();
    const [searchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const activeMini = searchParams.get("mini") || null;

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

    const visibleCategoryItems = useMemo(() => {
        const seen = new Set();

        return categoryItems.filter((item) => {
            const key = `${item.productName}_${item.caseCategory}`;

            if (seen.has(key)) return false;

            seen.add(key);
            return true;
        });
    }, [categoryItems]);

    const handleToggleFilter = () => {
        setIsFilterOpen((prev) => !prev);
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

                <div className="filter-btn-wrap">
                    <CategoryFilterButton
                        onClick={handleToggleFilter}
                        isOpen={isFilterOpen}
                    />
                </div>

                <ul className="category-product-list">
                    {visibleCategoryItems.map((item) =>
                        item.productTarget === "phone" ? (
                            <CategoryPhoneProductCard key={item.id} item={item} />
                        ) : (
                            <CategoryEtcProductCard key={item.id} item={item} />
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}