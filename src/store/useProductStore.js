import { create } from "zustand";
import { caseData } from "../data/caseData";
import { travelData } from "../data/travelData";
import { accessoryData } from "../data/accessoryData";
import { deviceData } from "../data/deviceData";

export const useProductStore = create((set, get) => ({

    items: [],

    // 검색 관련 변수(search)
    searchWord: "",
    onSetSearchWord:(word)=>set({searchWord:word}),

    // 검색 단어 저장 배열
    searchWordList:[],

    //검색 단어 저장 메서드
    onAddSearchList:()=>{
        set((state)=>({
            searchWordList:[...state.searchWordList,{
                id:Date.now(),
                text:state.searchWord}],
            searchWord:""
        }))
    },

    onRemoveSearchList:(id)=>{
        set((state)=>({
            searchWordList:state.searchWordList.filter(((s)=>s.id !==id))
        }))
    },
    onRemoveAllSearch:()=>{
        set({searchWordList:[]})
    },

    // 전체 아이템
    onFetchItems: async () => {
        const existing = get().items;
        if (existing.length > 0) return;
        const itemLists = [...caseData, ...deviceData, ...accessoryData, ...travelData];
        set({ items: itemLists });
    },

    // 메인메뉴랑 서브메뉴랑 미니메뉴
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
                {name: "캐릭터", link: "character"},
                {name: "아트", link: "art"},
                {name: "영화&엔터", link: "movie"},
                {name: "패션&라이프스타일", link: "fashion"},
                {name: "스포츠", link: "sports"}
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

    // 카테고리별 페이지에 뿌릴 제품들
    filterItems: [],
    onFilterMainCate: (mainCate, subCate, miniCate = null) => {
        const items = get().items;
        if (mainCate === "케이스") {
            subCate = "디바이스";
        }
        const cateItems = items.filter((item) => {
            // 메인 메뉴 카테고리 필터
            if (item.mainCategory !== mainCate) {
                return false;
            }
            if (item.subCategory !== subCate) {
                return false;
            }
            if (miniCate !== null && item.miniCategory !== miniCate) {
                return false;
            }
            return true;
        });
        set({ filterItems: cateItems });
    },

    // 필터용 카테고리들
    colorFilter: [],
    deviceFilter: [],
    // 카테고리페이지에 뿌릴 필터 내용
    onLastCategoryMenu: () => {
        const items = get().filterItems;
        const { colorFilter, deviceFilter } = get();

        // 모든 컬러를 담을 Set (중복 자동 제거)
        const colorList = new Set();

        // 브랜드별 모델을 담을 객체
        const deviceList = {
            Apple: new Set(),
            Samsung: new Set(),
            Google: new Set()
        };

        // 데이터 순회
        items.forEach(product => {
            // 컬러 추가
            product.color.forEach(c => colorList.add(c));

            // 기기 모델 추가
            Object.keys(product.deviceCategory).forEach(brand => {
                if (deviceList[brand]) {
                    product.deviceCategory[brand].forEach(model => deviceList[brand].add(model));
                }
            });
        });

        set({
            colorFilter: [...colorList],
            deviceFilter: {
                Apple: [...deviceList.Apple],
                Samsung: [...deviceList.Samsung],
                Google: [...deviceList.Google]
            }
        });

        console.log(colorList);
        console.log(deviceList);
    }

}));