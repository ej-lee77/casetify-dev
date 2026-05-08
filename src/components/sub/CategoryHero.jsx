import React, { useMemo } from "react";
import "./scss/CategoryHero.scss";

const HERO_TEXT_MAP = {
    "case-device": {
        title: "디바이스",
        subtitle: "다양한 기종에 맞는 케이스를 만나보세요",
    },
    "case-design": {
        title: "디자인",
        subtitle: "취향에 맞는 패턴과 컬러를 고르는 시간",
    },
    "case-magsafe": {
        title: "맥세이프",
        subtitle: "편리함과 안정감을 더한 MagSafe 컬렉션",
    },

    "accessory-tech-pouch": {
        title: "테크 파우치",
        subtitle: "여행과 일상을 정리해주는 포인트 아이템",
    },
    "accessory-carrier": {
        title: "캐리어",
        subtitle: "여행을 더 산뜻하게 만드는 디자인",
    },
    "accessory-charm": {
        title: "참",
        subtitle: "작은 디테일로 완성하는 나만의 스타일",
    },
    "accessory-strap": {
        title: "스트랩",
        subtitle: "손끝에 더해지는 안정감과 포인트",
    },
    "accessory-etc": {
        title: "기타",
        subtitle: "일상에 더하는 실용적인 액세서리",
    },

    "colab-sports": {
        title: "스포츠",
        subtitle: "팀의 무드를 담은 스페셜 컬렉션",
    },
    "colab-fashion": {
        title: "패션&라이프스타일",
        subtitle: "브랜드 감성을 담은 콜라보레이션",
    },
    "colab-entertainment": {
        title: "영화&엔터",
        subtitle: "콘텐츠의 매력을 담은 컬렉션",
    },
    "colab-art": {
        title: "아트",
        subtitle: "예술적 감성을 더한 케이스 컬렉션",
    },
    "colab-character": {
        title: "캐릭터",
        subtitle: "귀여운 캐릭터로 완성하는 일상",
    },
    colab: {
        title: "콜라보",
        subtitle: "다양한 아티스트와 함께한 컬렉션",
    },

    set: {
        title: "세트",
        subtitle: "함께 고르면 더 완성도 있는 조합",
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
        <section className={`category-hero category-hero-${heroKey}`}>
            <img
                className="category-hero-img"
                src={imagePath}
                alt={heroText.title}
            />

            <div className="category-hero-overlay" />

            <div className="category-hero-text">
                <span className="category-hero-label">CASETiFY COLLECTION</span>
                <h2>{heroText.title}</h2>
                {heroText.subtitle && <p>{heroText.subtitle}</p>}
            </div>
        </section>
    );
}