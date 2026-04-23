import React, { useMemo } from "react";
import "./scss/CategoryFilterPanel.scss";

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
    White: "#f5f5f5",
    Red: "#e54848",
    Green: "#3fae5a",
    Yellow: "#f2d533",
    Gray: "#9a9a9a",
    Silver: "#c9ced6",
    Gold: "#c9a24a",
    Beige: "#d8c3a5",
    Brown: "#7a5230",
    Cream: "#f7f1de",
    Transparent: "#ececec",
};

export default function CategoryFilterPanel({
    isOpen,
    onClose,
    mini,
    filterOptions = {},
    selectedFilters = {},
    onToggleFilter,
    onPriceChange,
    onResetFilter,
    onRemoveFilter,
}) {
    const {
        models = [],
        caseCategories = [],
        colors = [],
    } = filterOptions;

    const {
        selectedModels = [],
        selectedCaseCategories = [],
        selectedColors = [],
        isMagSafe = null,
        stockOnly = false,
        minPrice = "",
        maxPrice = "",
    } = selectedFilters;

    const specificSections = useMemo(() => {
        const sections = [];

        if (mini === "phone") {
            sections.push({
                title: "기기모델",
                type: "model",
                items: models,
            });

            sections.push({
                title: "케이스 종류",
                type: "caseCategory",
                items: caseCategories,
            });

            sections.push({
                title: "맥세이프",
                type: "magsafe",
                items: [
                    { key: "true", label: "맥세이프 가능" },
                    { key: "false", label: "일반 케이스" },
                ],
            });
        }

        if (mini === "earphone" || mini === "watch" || mini === "tablet" || mini === "laptop") {
            if (models.length > 0) {
                sections.push({
                    title: "기기모델",
                    type: "model",
                    items: models,
                });
            }
        }

        if (
            mini === "strap" ||
            mini === "charm" ||
            mini === "holder" ||
            mini === "wallet" ||
            mini === "stand" ||
            mini === "bag" ||
            mini === "etc"
        ) {
            if (caseCategories.length > 0) {
                sections.push({
                    title: "상품 종류",
                    type: "caseCategory",
                    items: caseCategories,
                });
            }
        }

        return sections;
    }, [mini, models, caseCategories]);

    const renderSelectedTags = () => {
        const tags = [];

        selectedModels.forEach((item) => {
            const currentModel = models.find((model) => model.key === item);
            tags.push({
                type: "model",
                value: item,
                label: currentModel?.label || item,
            });
        });

        selectedCaseCategories.forEach((item) => {
            tags.push({
                type: "caseCategory",
                value: item,
                label: item,
            });
        });

        selectedColors.forEach((item) => {
            tags.push({
                type: "color",
                value: item,
                label: item,
            });
        });

        if (isMagSafe === true) {
            tags.push({
                type: "magsafe",
                value: true,
                label: "맥세이프 가능",
            });
        }

        if (isMagSafe === false) {
            tags.push({
                type: "magsafe",
                value: false,
                label: "일반 케이스",
            });
        }

        if (stockOnly) {
            tags.push({
                type: "stock",
                value: true,
                label: "품절 제외",
            });
        }

        if (minPrice || maxPrice) {
            tags.push({
                type: "price",
                value: "price",
                label: `${minPrice || 0}원 ~ ${maxPrice || "∞"}원`,
            });
        }

        if (tags.length === 0) return null;

        return (
            <div className="selected-filter-tags">
                {tags.map((tag, index) => (
                    <button
                        type="button"
                        key={`${tag.type}-${tag.value}-${index}`}
                        className="selected-filter-tag"
                        onClick={() => onRemoveFilter(tag.type, tag.value)}
                    >
                        <span>{tag.label}</span>
                        <strong>×</strong>
                    </button>
                ))}
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="filter-panel-dim" onClick={onClose}></div>

            <aside className="category-filter-panel">
                <div className="filter-panel-top">
                    <h3>필터</h3>

                    <div className="filter-panel-top-btns">
                        <button
                            type="button"
                            className="reset-btn"
                            onClick={onResetFilter}
                        >
                            전체 취소
                        </button>

                        <button
                            type="button"
                            className="close-btn"
                            onClick={onClose}
                        >
                            닫기
                        </button>
                    </div>
                </div>

                {renderSelectedTags()}

                <section className="filter-section">
                    <h4>가격범위</h4>

                    <div className="price-range-box">
                        <input
                            type="number"
                            placeholder="최소 금액"
                            value={minPrice}
                            onChange={(e) => onPriceChange("minPrice", e.target.value)}
                        />
                        <span>~</span>
                        <input
                            type="number"
                            placeholder="최대 금액"
                            value={maxPrice}
                            onChange={(e) => onPriceChange("maxPrice", e.target.value)}
                        />
                    </div>
                </section>

                <section className="filter-section">
                    <h4>색상</h4>

                    <div className="filter-chip-wrap color-chip-wrap">
                        {colors.map((color) => {
                            const isActive = selectedColors.includes(color);

                            return (
                                <button
                                    type="button"
                                    key={color}
                                    className={`filter-chip color-chip ${isActive ? "on" : ""}`}
                                    onClick={() => onToggleFilter("color", color)}
                                >
                                    <span
                                        className="color-dot"
                                        style={{ backgroundColor: colorMap[color] || "#ddd" }}
                                    ></span>
                                    <span>{color}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className="filter-section">
                    <h4>품절여부</h4>

                    <div className="filter-chip-wrap">
                        <button
                            type="button"
                            className={`filter-chip ${stockOnly ? "on" : ""}`}
                            onClick={() => onToggleFilter("stock", true)}
                        >
                            품절 제외
                        </button>
                    </div>
                </section>

                {specificSections.map((section) => (
                    <section className="filter-section" key={section.type}>
                        <h4>{section.title}</h4>

                        <div className="filter-chip-wrap">
                            {section.type === "magsafe" &&
                                section.items.map((item) => {
                                    const currentValue = item.key === "true";
                                    const isActive = isMagSafe === currentValue;

                                    return (
                                        <button
                                            type="button"
                                            key={item.key}
                                            className={`filter-chip ${isActive ? "on" : ""}`}
                                            onClick={() => onToggleFilter("magsafe", currentValue)}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}

                            {section.type === "model" &&
                                section.items.map((item) => {
                                    const label = item.label || item.name || item;
                                    const value = item.key || item.value || item;
                                    const isActive = selectedModels.includes(value);

                                    return (
                                        <button
                                            type="button"
                                            key={value}
                                            className={`filter-chip ${isActive ? "on" : ""}`}
                                            onClick={() => onToggleFilter("model", value)}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}

                            {section.type === "caseCategory" &&
                                section.items.map((item) => {
                                    const label = item.label || item.name || item;
                                    const value = item.key || item.value || item;
                                    const isActive = selectedCaseCategories.includes(value);

                                    return (
                                        <button
                                            type="button"
                                            key={value}
                                            className={`filter-chip ${isActive ? "on" : ""}`}
                                            onClick={() => onToggleFilter("caseCategory", value)}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                        </div>
                    </section>
                ))}

                <div className="filter-panel-bottom">
                    <button
                        type="button"
                        className="confirm-btn"
                        onClick={onClose}
                    >
                        적용하기
                    </button>
                </div>
            </aside>
        </>
    );
}