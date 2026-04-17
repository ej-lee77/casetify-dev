import { create } from "zustand";
import { items as ysItems } from "../data/ysData";

export const useCategoryProductStore = create((set, get) => ({
    items: [],
    categoryItems: [],


    mainMenuList: [
        {
            name: "케이스", link: "case",
            sub: [
                {
                    name: "디바이스", link: "device",
                    mini: [
                        "핸드폰", "이어폰", "노트북", "워치", "태블릿"
                    ]
                },
                {
                    name: "디자인", link: "design",
                    mini: [
                        "컬러", "패턴", "시그니처"
                    ]
                },
                { name: "맥세이프", link: "magsafe" },
                { name: "커스텀", link: "custom" },
                { name: "세트", link: "set" },
                {
                    name: "콜라보", link: "collabo",
                    mini: [
                        '캐릭터', "아트", "영화&엔터", "패션&라이프스타일", "스포츠"
                    ]
                }
            ]
        },
        {
            name: "악세서리", link: "accessory",
            sub: [
                { name: "스트랩", link: "strap" },
                { name: "참", link: "charm" },
                { name: "보호필름", link: "protector" },
                { name: "맥세이프", link: "magsafe" },
                { name: "기타", link: "etc" }
            ]
        },
        {
            name: "트래블", link: "travel",
            sub: [
                { name: "캐리어", link: "suitcase" },
                { name: "테크파우치", link: "pouch" }
            ]
        },
        { name: "기프트카드", link: "giftcard" },
        {
            name: "브랜드", link: "brand",
            sub: [
                { name: "케이스티파이", link: "casetify" },
                { name: "매장찾기", link: "store" },
                { name: "정품인증", link: "certify" },
                { name: "Q&A", link: "qa" }
            ]
        }
    ],

    onFetchItems: () => {
        const existing = get().items;
        if (existing.length > 0) return;

        set({ items: ysItems });
    },

    onFilterCategory: (mainCate, subCate, miniCate = null) => {
        const items = get().items;

        const filtered = items.filter((item) => {
            if (item.mainCategory !== mainCate) return false;
            if (item.subCategory !== subCate) return false;
            if (miniCate !== null && item.miniCategory !== miniCate) return false;
            return true;
        });

        set({ categoryItems: filtered });
    },
}));