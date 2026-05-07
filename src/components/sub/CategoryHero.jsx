import React from "react";

export default function CategoryHero({
    mainCate,
    subCate,
    mainCateKo,
    subCateKo,
}) {
    const imagePath = subCate
        ? `/images/category/slider/${mainCate}-${subCate}.png`
        : `/images/category/slider/${mainCate}.png`;

    const altText = subCateKo || mainCateKo || mainCate;

    return (
        <div className="category-hero">
            <img src={imagePath} alt={altText} />
            <h2 className={`${mainCate}-${subCate}` === "colab-art" ? "text-white" : ""}>{subCateKo}</h2>
        </div>
    );
}