import { create } from "zustand";
import { items } from "../data/finalData";

export const useCategoryProductStore = create((set, get) => ({
    items,
    categoryItems: items,

    mainMenuList: [
        {
            name: "케이스",
            link: "case",
            sub: [
                {
                    name: "디바이스",
                    link: "device",
                    mini: ["핸드폰", "이어폰", "노트북", "워치", "태블릿"],
                },
                {
                    name: "디자인",
                    link: "design",
                    mini: ["컬러", "패턴", "시그니처"],
                },
                {
                    name: "맥세이프",
                    link: "magsafe",
                    mini: ["핸드폰", "이어폰"],
                },
                {
                    name: "커스텀",
                    link: "custom",
                    mini: ["핸드폰", "이어폰"],
                },
                {
                    name: "콜라보",
                    link: "collabo",
                    mini: ["캐릭터", "아트", "영화&엔터", "패션&라이프스타일", "스포츠"],
                },
            ],
        },
        {
            name: "악세서리",
            link: "accessory",
            sub: [
                { name: "스트랩", link: "strap", mini: ["스트랩"] },
                { name: "참", link: "charm", mini: ["참"] },
                { name: "보호필름", link: "protector", mini: ["보호필름"] },
                { name: "맥세이프", link: "magsafe", mini: ["맥세이프"] },
                { name: "가방", link: "bag", mini: ["가방"] },
                { name: "스탠드", link: "stand", mini: ["스탠드"] },
                { name: "지갑형", link: "wallet", mini: ["지갑형"] },
                { name: "홀더", link: "holder", mini: ["홀더"] },
                { name: "기타", link: "etc", mini: ["기타"] },
            ],
        },
        {
            name: "트래블",
            link: "travel",
            sub: [
                { name: "트래블", link: "travel", mini: ["가방", "기타"] },
            ],
        },
    ],

    onFilterCategory: (mainCate, subCate, mini) => {
        const { items } = get();

        const filtered = items.filter((item) => {
            const matchMain =
                item.mainCategory === mainCate ||
                (Array.isArray(item.mainCategory) && item.mainCategory.includes(mainCate));

            const matchSub = subCate
                ? (item.displaySubCategories || []).includes(subCate)
                : true;

            const matchMini = mini
                ? (item.displayMiniCategories || []).includes(mini)
                : true;

            return matchMain && matchSub && matchMini;
        });

        set({ categoryItems: filtered });
    },
}));