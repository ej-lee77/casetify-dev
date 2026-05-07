import React, { useMemo } from "react";
import "./scss/CategoryHero.scss";

const HERO_TEXT_MAP = {
    "case-device": {
        title: "디바이스",
        subtitle: "다양한 기종의 케이스티파이를 입혀보세요",
    },
    "case-design": {
        title: "디자인",
        subtitle: "고심하여 고안한 하나의 디자인",
    },
    "case-magsafe": {
        title: "맥세이프",
        subtitle: "케이스티파이만의 안전한 부착력",
    },

    "accessory-tech-pouch": {
        title: "테크 파우치",
        subtitle: "완벽한 여행을 위한 마지막 하이라이트",
    },
    "accessory-carrier": {
        title: "캐리어",
        subtitle: "여행에 더하는 반짝이는 디자인 한 스푼",
    },
    "accessory-charm": {
        title: "참",
        subtitle: "작은 포인트가 주는 큰 매력",
    },
    "accessory-strap": {
        title: "스트랩",
        subtitle: "한층 더 안전하게, 작은 디테일",
    },
    "accessory-etc": {
        title: "기타",
        subtitle: "일상에 더하는 실용적인 포인트",
    },

    "colab-sports": {
        title: "스포츠",
        subtitle: "팀의 열기를 담은 강렬한 컬렉션",
    },
    "colab-fashion": {
        title: "패션&라이프스타일",
        subtitle: "메이저 브랜드와 케이스티파이의 콜라보레이션",
    },
    "colab-entertainment": {
        title: "영화&엔터",
        subtitle: "트렌드 물결에 빠져보는 패션문화",
    },
    "colab-art": {
        title: "아트",
        subtitle: "예술이 주는 깊이있는 미학",
        dark: true,
    },
    "colab-character": {
        title: "캐릭터",
        subtitle: "일상에 힘이 되는 작은 조력자",
    },
    colab: {
        title: "콜라보",
        subtitle: "다양한 아티스트들이 선보이는 독자적 컬렉션",
    },

    set: {
        title: "세트",
        subtitle: "함께일 때 더 빛이 나는 세트 상품",
    },
};

export default function CategoryHero({
    mainCate,
    subCate,
    mainCateKo,
    subCateKo,
}) {
    const heroKey = subCate ? `${mainCate}-${subCate}` : mainCate;

    const heroText = useMemo(() => {
        return HERO_TEXT_MAP[heroKey] || {
            title: subCateKo || mainCateKo || "",
            subtitle: "",
        };
    }, [heroKey, mainCateKo, subCateKo]);

    const imagePath = subCate
        ? `/images/category/slider/${mainCate}-${subCate}.png`
        : `/images/category/slider/${mainCate}.png`;

    return (
        <section className={`category-hero ${heroText.dark ? "is-dark" : ""}`}>
            <img
                className="category-hero-img"
                src={imagePath}
                alt={heroText.title}
            />

            <div className="category-hero-text">
                <h2>
                    {heroText.title}
                    <span className="category-hero-line" />
                </h2>

                {heroText.subtitle && <p>{heroText.subtitle}</p>}
            </div>
        </section>
    );
}