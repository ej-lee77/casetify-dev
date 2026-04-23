import React, { useEffect, useMemo, useState } from "react";
import "./scss/CategoryFilterPanel.scss";

export default function CategoryFilterPanel({
    isOpen,
    onClose,
    panelType, // "device" | "filter" | null
    activeMini,
    items = [],
    onSelectDevice,
}) {
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedModelKey, setSelectedModelKey] = useState("");

    const deviceItems = useMemo(() => {
        if (panelType !== "device") return [];
        if (!activeMini) return [];

        return items.filter(
            (item) =>
                item.productTarget === activeMini &&
                item.brand &&
                item.modelKey &&
                item.modelLabel
        );
    }, [items, activeMini, panelType]);

    const deviceMap = useMemo(() => {
        if (panelType !== "device") return {};

        const map = {};

        deviceItems.forEach((item) => {
            if (!map[item.brand]) {
                map[item.brand] = [];
            }

            const exists = map[item.brand].some(
                (model) => model.key === item.modelKey
            );

            if (!exists) {
                map[item.brand].push({
                    key: item.modelKey,
                    label: item.modelLabel,
                });
            }
        });

        return map;
    }, [deviceItems, panelType]);

    const brandList = useMemo(() => Object.keys(deviceMap), [deviceMap]);

    const currentBrand = selectedBrand || brandList[0] || "";
    const currentModels = deviceMap[currentBrand] || [];

    useEffect(() => {
        if (!isOpen) return;

        if (panelType === "device") {
            if (!selectedBrand && brandList.length > 0) {
                setSelectedBrand(brandList[0]);
            }
        }
    }, [isOpen, panelType, brandList, selectedBrand]);

    const handleSelectBrand = (brand) => {
        setSelectedBrand(brand);
        setSelectedModelKey("");
    };

    const handleSelectModel = (model) => {
        setSelectedModelKey(model.key);

        if (onSelectDevice) {
            onSelectDevice({
                brand: currentBrand,
                modelKey: model.key,
                modelLabel: model.label,
            });
        }
    };

    if (!isOpen || !panelType) return null;

    return (
        <>
            <div className="category-filter-dim" onClick={onClose}></div>

            <aside className="category-filter-panel">
                <div className="filter-panel-header">
                    <h3>{panelType === "device" ? "기기모델 선택" : "필터"}</h3>

                    <button
                        type="button"
                        className="filter-close-btn"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>

                <div className="filter-panel-body">
                    {panelType === "device" && (
                        <div className="device-select-wrap">
                            {brandList.length > 0 ? (
                                <>
                                    <div className="device-brand-list">
                                        {brandList.map((brand) => (
                                            <button
                                                type="button"
                                                key={brand}
                                                className={`brand-btn ${currentBrand === brand ? "on" : ""}`}
                                                onClick={() => handleSelectBrand(brand)}
                                            >
                                                {brand}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="device-model-list">
                                        {currentModels.map((model) => (
                                            <button
                                                type="button"
                                                key={model.key}
                                                className={`model-btn ${selectedModelKey === model.key ? "on" : ""}`}
                                                onClick={() => handleSelectModel(model)}
                                            >
                                                {model.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="filter-empty">
                                    선택 가능한 기기모델이 없습니다.
                                </p>
                            )}
                        </div>
                    )}

                    {panelType === "filter" && (
                        <div className="default-filter-wrap">
                            <div className="filter-section">
                                <h4 className="filter-section-title">가격범위</h4>
                            </div>

                            <div className="filter-section">
                                <h4 className="filter-section-title">색상</h4>
                            </div>

                            <div className="filter-section">
                                <h4 className="filter-section-title">품절여부</h4>
                            </div>

                            {activeMini === "phone" && (
                                <div className="filter-section">
                                    <h4 className="filter-section-title">맥세이프 여부</h4>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}