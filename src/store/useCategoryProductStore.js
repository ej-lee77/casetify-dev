import { create } from "zustand";
import { items } from "../data/finalData";

const MAIN_ALIAS_MAP = {
    case: ["case", "케이스"],
    accessory: ["accessory", "악세서리"],
    travel: ["travel", "트래블"],
    colab: ["colab", "collabo", "콜라보"],
    giftcard: ["giftcard", "기프트카드"],
    brand: ["brand", "브랜드"],
};

const SUB_ALIAS_MAP = {
    device: ["device", "디바이스"],
    design: ["design", "디자인"],
    magsafe: ["magsafe", "맥세이프"],
    custom: ["custom", "커스텀"],
    strap: ["strap", "스트랩"],
    charm: ["charm", "참"],
    protector: ["protector", "보호필름"],
    etc: ["etc", "기타"],
    suitcase: ["suitcase", "캐리어"],
    pouch: ["pouch", "테크파우치"],
    character: ["character", "캐릭터"],
    art: ["art", "아트"],
    movie: ["movie", "영화&엔터"],
    fashion: ["fashion", "패션&라이프스타일"],
    sports: ["sports", "스포츠"],
    casetify: ["casetify", "케이스티파이"],
    store: ["store", "매장찾기"],
    certify: ["certify", "정품인증"],
    qa: ["qa", "Q&A"],
};

const MINI_ALIAS_MAP = {
    phone: ["phone", "핸드폰"],
    earphone: ["earphone", "이어폰"],
    laptop: ["laptop", "노트북"],
    watch: ["watch", "워치"],
    tablet: ["tablet", "태블릿"],
    color: ["color", "컬러"],
    pattern: ["pattern", "패턴"],
    signature: ["signature", "시그니처"],
    character: ["character", "캐릭터"],
    art: ["art", "아트"],
    movie: ["movie", "영화&엔터"],
    fashion: ["fashion", "패션&라이프스타일"],
    sports: ["sports", "스포츠"],
    strap: ["strap", "스트랩"],
};

const toArray = (value) => {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string" && value.trim()) return [value];
    return [];
};

const includesAlias = (values, key, aliasMap) => {
    if (!key) return true;
    const aliases = aliasMap[key] || [key];
    return aliases.some((alias) => values.includes(alias));
};

export const useCategoryProductStore = create((set, get) => ({
    items,
    categoryItems: [],
    groupedItems: [],

    mainMenuList: [
        {
            name: "케이스", link: "case",
            sub: [
                {
                    name: "디바이스", link: "device",
                    mini: ["핸드폰", "이어폰", "노트북", "워치", "태블릿"]
                },
                {
                    name: "디자인", link: "design",
                    mini: ["컬러", "패턴", "시그니처"]
                },
                { name: "맥세이프", link: "magsafe" },
                { name: "커스텀", link: "custom" }
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
        {
            name: "콜라보", link: "colab",
            sub: [
                { name: "캐릭터", link: "character" },
                { name: "아트", link: "art" },
                { name: "영화&엔터", link: "movie" },
                { name: "패션&라이프스타일", link: "fashion" },
                { name: "스포츠", link: "sports" }
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