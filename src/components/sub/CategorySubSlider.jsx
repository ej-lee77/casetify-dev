import React from "react";
import { useSearchParams } from "react-router-dom";
import CategoryMiniIcon from "./CategoryMiniIcon";
import { MINI_QUERY_MAP, MINI_REVERSE_MAP } from "../../data/categoryMap";

export default function CategorySubSlider({ miniCate = [] }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const activeMiniKey = searchParams.get("mini") || "";
    const activeMini = MINI_REVERSE_MAP[activeMiniKey] || "";

    const handleMiniClick = (mini) => {
        const nextParams = new URLSearchParams(searchParams);
        const nextMiniKey = MINI_QUERY_MAP[mini];
        const isSameMini = activeMini === mini;

        if (isSameMini) {
            nextParams.delete("mini");
        } else {
            nextParams.set("mini", nextMiniKey);
        }

        setSearchParams(nextParams);
    };

    if (!miniCate.length) return null;

    return (
        <div className="category-sub-slider-wrap">
            <ul
                className={`category-sub-slider ${activeMini ? "has-active" : ""}`}
                onClick={() => setSearchParams({})}
            >
                {miniCate.map((mini) => (
                    <CategoryMiniIcon
                        key={mini}
                        mini={mini}
                        isActive={activeMini === mini}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleMiniClick(mini);
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}