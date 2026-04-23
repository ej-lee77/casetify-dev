import React, { useEffect, useMemo, useState } from "react";
import { colorMap } from "../../data/finalData";
import { MINI_QUERY_MAP } from "../../data/categoryMap";
import "./scss/CategoryFilterPanel.scss";

function uniqueModelOptions(items = []) {
    return Array.from(
        new Map(
            items
                .filter((item) => item.modelKey && item.modelLabel)
                .map((item) => [
                    item.modelKey,
                    { key: item.modelKey, label: item.modelLabel },
                ])
        ).values()
    );
}

function uniqueColorOptions(items = []) {
    return Array.from(
        new Set(items.flatMap((item) => item.caseColors || []).filter(Boolean))
    );
}

export default function CategoryFilterPanel({
    isOpen,
    onClose,
    onApply,
    mainCate,
    currentMain,
    currentSub,
    currentMini,
    allItems = [],
    selectedFilters,
}) {
    const [draft, setDraft] = useState({
        subCateLink: currentSub?.link || "",
        mini: currentMini || "",
        models: [],
        isCollabo: null,
        isMagSafe: null,
        stockOnly: false,
        minPrice: "",
        maxPrice: "",
        colors: [],
    });

    useEffect(() => {
        if (!isOpen) return;

        setDraft({
            subCateLink: currentSub?.link || "",
            mini: currentMini || "",
            models: selectedFilters.models || [],
            isCollabo: selectedFilters.isCollabo ?? null,
            isMagSafe: selectedFilters.isMagSafe ?? null,
            stockOnly: selectedFilters.stockOnly || false,
            minPrice: selectedFilters.minPrice || "",
            maxPrice: selectedFilters.maxPrice || "",
            colors: selectedFilters.colors || [],
        });
    }, [isOpen, currentSub, currentMini, selectedFilters]);

    const subOptions = useMemo(() => {
        return currentMain?.sub || [];
    }, [currentMain]);

    const selectedSubObj = useMemo(() => {
        return subOptions.find((sub) => sub.link === draft.subCateLink);
    }, [subOptions, draft.subCateLink]);

    const deviceOptions = useMemo(() => {
        return (selectedSubObj?.mini || []).map((miniLabel) => ({
            key: MINI_QUERY_MAP[miniLabel] || miniLabel,
            label: miniLabel,
        }));
    }, [selectedSubObj]);

    const sourceItems = useMemo(() => {
        return (allItems || []).filter((item) => {
            const matchMain =
                item.mainCategory === mainCate ||
                (Array.isArray(item.mainCategory) && item.mainCategory.includes(mainCate));

            const matchSub = draft.subCateLink
                ? (item.displaySubCategories || []).includes(draft.subCateLink)
                : true;

            const matchMini = draft.mini
                ? (item.displayMiniCategories || []).includes(draft.mini)
                : true;

            return matchMain && matchSub && matchMini;
        });
    }, [allItems, mainCate, draft.subCateLink, draft.mini]);

    const modelOptions = useMemo(() => uniqueModelOptions(sourceItems), [sourceItems]);
    const colorOptions = useMemo(() => uniqueColorOptions(sourceItems), [sourceItems]);

    const toggleArray = (key, value) => {
        setDraft((prev) => {
            const exists = prev[key].includes(value);

            return {
                ...prev,
                [key]: exists
                    ? prev[key].filter((item) => item !== value)
                    : [...prev[key], value],
            };
        });
    };

    const toggleSingle = (key, value) => {
        setDraft((prev) => ({
            ...prev,
            [key]: prev[key] === value ? null : value,
        }));
    };

    const onChangeSubCate = (subLink) => {
        setDraft((prev) => ({
            ...prev,
            subCateLink: subLink,
            mini: "",
            models: [],
            colors: [],
        }));
    };

    const onChangeMini = (miniKey) => {
        setDraft((prev) => ({
            ...prev,
            mini: prev.mini === miniKey ? "" : miniKey,
            models: [],
            colors: [],
        }));
    };

    const resetAll = () => {
        setDraft({
            subCateLink: currentSub?.link || "",
            mini: currentMini || "",
            models: [],
            isCollabo: null,
            isMagSafe: null,
            stockOnly: false,
            minPrice: "",
            maxPrice: "",
            colors: [],
        });
    };

    const applyFilters = () => {
        onApply({
            nextSubCateLink: draft.subCateLink || currentSub?.link || "",
            nextMini: draft.mini || "",
            filters: {
                models: draft.models,
                isCollabo: draft.isCollabo,
                isMagSafe: draft.isMagSafe,
                stockOnly: draft.stockOnly,
                minPrice: draft.minPrice,
                maxPrice: draft.maxPrice,
                colors: draft.colors,
            },
        });
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="category-filter-dim" onClick={onClose}></div>

            <aside className="category-filter-panel">
                <div className="filter-panel-header">
                    <h3>필터</h3>

                    <div className="filter-panel-actions">
                        <button
                            type="button"
                            className="filter-reset-btn"
                            onClick={resetAll}
                        >
                            전체 취소
                        </button>

                        <button
                            type="button"
                            className="filter-close-btn"
                            onClick={onClose}
                        >
                            닫기
                        </button>
                    </div>
                </div>

                <div className="filter-panel-body">
                    <section className="filter-section">
                        <h4 className="filter-section-title">카테고리</h4>

                        <div className="filter-chip-wrap">
                            {subOptions.map((sub) => (
                                <button
                                    type="button"
                                    key={sub.link}
                                    className={`filter-chip ${draft.subCateLink === sub.link ? "on" : ""}`}
                                    onClick={() => onChangeSubCate(sub.link)}
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    </section>

                    {!!deviceOptions.length && (
                        <section className="filter-section">
                            <h4 className="filter-section-title">디바이스</h4>

                            <div className="filter-chip-wrap">
                                {deviceOptions.map((device) => (
                                    <button
                                        type="button"
                                        key={device.key}
                                        className={`filter-chip ${draft.mini === device.key ? "on" : ""}`}
                                        onClick={() => onChangeMini(device.key)}
                                    >
                                        {device.label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {!!modelOptions.length && (
                        <section className="filter-section">
                            <h4 className="filter-section-title">기기모델 선택</h4>

                            <div className="filter-chip-wrap">
                                {modelOptions.map((model) => (
                                    <button
                                        type="button"
                                        key={model.key}
                                        className={`filter-chip ${draft.models.includes(model.key) ? "on" : ""}`}
                                        onClick={() => toggleArray("models", model.key)}
                                    >
                                        {model.label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="filter-section">
                        <h4 className="filter-section-title">콜라보 여부</h4>

                        <div className="filter-chip-wrap">
                            <button
                                type="button"
                                className={`filter-chip ${draft.isCollabo === true ? "on" : ""}`}
                                onClick={() => toggleSingle("isCollabo", true)}
                            >
                                콜라보만
                            </button>

                            <button
                                type="button"
                                className={`filter-chip ${draft.isCollabo === false ? "on" : ""}`}
                                onClick={() => toggleSingle("isCollabo", false)}
                            >
                                일반 상품만
                            </button>
                        </div>
                    </section>

                    <section className="filter-section">
                        <h4 className="filter-section-title">맥세이프 여부</h4>

                        <div className="filter-chip-wrap">
                            <button
                                type="button"
                                className={`filter-chip ${draft.isMagSafe === true ? "on" : ""}`}
                                onClick={() => toggleSingle("isMagSafe", true)}
                            >
                                맥세이프 가능
                            </button>

                            <button
                                type="button"
                                className={`filter-chip ${draft.isMagSafe === false ? "on" : ""}`}
                                onClick={() => toggleSingle("isMagSafe", false)}
                            >
                                일반 케이스
                            </button>
                        </div>
                    </section>

                    <section className="filter-section">
                        <h4 className="filter-section-title">가격범위</h4>

                        <div className="price-range-box">
                            <input
                                type="number"
                                placeholder="최소 금액"
                                value={draft.minPrice}
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        minPrice: e.target.value,
                                    }))
                                }
                            />

                            <span>~</span>

                            <input
                                type="number"
                                placeholder="최대 금액"
                                value={draft.maxPrice}
                                onChange={(e) =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        maxPrice: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </section>

                    <section className="filter-section">
                        <h4 className="filter-section-title">색상</h4>

                        <div className="filter-color-grid">
                            {colorOptions.map((color) => (
                                <button
                                    type="button"
                                    key={color}
                                    className={`color-swatch-btn ${draft.colors.includes(color) ? "on" : ""}`}
                                    onClick={() => toggleArray("colors", color)}
                                    title={color}
                                >
                                    <span
                                        className="color-swatch"
                                        style={{ backgroundColor: colorMap[color] || "#ddd" }}
                                    ></span>
                                    <span className="color-label">{color}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="filter-section">
                        <h4 className="filter-section-title">품절여부</h4>

                        <div className="filter-chip-wrap">
                            <button
                                type="button"
                                className={`filter-chip ${draft.stockOnly ? "on" : ""}`}
                                onClick={() =>
                                    setDraft((prev) => ({
                                        ...prev,
                                        stockOnly: !prev.stockOnly,
                                    }))
                                }
                            >
                                품절 제외
                            </button>
                        </div>
                    </section>
                </div>

                <div className="filter-panel-bottom">
                    <button
                        type="button"
                        className="filter-apply-btn"
                        onClick={applyFilters}
                    >
                        적용하기
                    </button>
                </div>
            </aside>
        </>
    );
}