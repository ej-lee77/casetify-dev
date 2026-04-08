import { create } from "zustand";
import { caseData } from "../data/caseData";

export const useProductStore = create((set, get)=>({

    items: [],

    // 전체 아이템
    onFetchItems: async()=>{
        const existing = get().items;
        if(existing.length > 0) return;
        set({items: caseData});
    },

    // 메인메뉴랑 서브메뉴
    mainMenuList: [
        {name: "케이스", link: "case", 
            sub: [
                {name: "디바이스", link: "device"},
                {name: "디자인", link: "design"},
                {name: "맥세이프", link: "magsafe"},
                {name: "커스텀", link: "custom"},
                {name: "세트", link: "set"},
                {name: "콜라보", link: "collabo"}
            ]
        },
        {name: "악세서리", link: "accessory",
            sub: [
                {name: "스트랩", link: "strap"},
                {name: "참", link: "charm"},
                {name: "보호필름", link: "protector"},
                {name: "맥세이프", link: "magsafe"},
                {name: "기타", link: "etc"}
            ]
        },
        {name: "트래블", link: "travel",
            sub: [
                {name: "캐리어", link: "suitcase"},
                {name: "악세서리", link: "accessory"}
            ]
        },
        {name: "기프트카드", link: "giftcard"},
        {name: "브랜드", link: "brand",
            sub: [
                {name: "케이스티파이", link: "casetify"},
                {name: "매장찾기", link: "store"},
                {name: "정품인증", link: "certify"},
                {name: "Q&A", link: "qa"}
            ]
        }
    ],

    // 카테고리 페이지에 뿌릴 메뉴들

    menus: [],
    onMakeMenu: ()=>{
        const items = get().items;
        // 임시 저장
        const menuList = [
            {name: "케이스", link: "/case", 
                sub: [
                    {name: "디바이스", link: "/case/device"},
                    {name: "디자인", link: "/case/design"},
                    {name: "맥세이프", link: "/case/magsafe"},
                    {name: "커스텀", link: "/case/custom"},
                    {name: "세트", link: "/case/set"},
                    {name: "콜라보", link: "/case/collabo"}
                ]
            },
            {name: "악세서리", link: "/accessory",
                sub: [
                    {name: "스트랩", link: "/accessory/strap"},
                    {name: "참", link: "/accessory/charm"},
                    {name: "보호필름", link: "/accessory/protector"},
                    {name: "맥세이프", link: "/accessory/magsafe"},
                    {name: "기타", link: "/accessory/etc"}
                ]
            },
            {name: "트래블", link: "/travel",
                sub: [
                    {name: "캐리어", link: "/travel"},
                    {name: "악세서리", link: "/travel"}
                ]
            },
            {name: "기프트카드", link: "/giftcard"},
            {name: "브랜드", link: "/brand",
                sub: [
                    {name: "케이스티파이", link: "/brand/casetify"},
                    {name: "매장찾기", link: "/brand/store"},
                    {name: "정품인증", link: "/brand/certify"},
                    {name: "Q&A", link: "/brand/qa"}
                ]
            }
        ];
        items.forEach(({caseCategory, color, collabo, deviceCategory, miniCategory})=>{
            // 한글로 메뉴 변경하기
            const koCategory1 = categoryMap[category1] || category1;
            const koCategory2 = subCategoryMap[category2] || category2;

            // let mainMenu = menuList.find((m)=>m.name === category1);
            let mainMenu = menuList.find((m)=>m.name === koCategory1);
            if(!mainMenu){
                // mainMenu = {name: category1, link: `/${category1}`, subMenu: []}
                mainMenu = {name: koCategory1, link: `/${category1}`, subMenu: []}
                menuList.push(mainMenu);
            }

            // 서브메뉴 추가
            // let hasSub = mainMenu.subMenu.find((s)=>s.name === category2);
            let hasSub = mainMenu.subMenu.find((s)=>s.name === koCategory2);
            if(!hasSub && category2){
                // mainMenu.subMenu.push({name: category2, link:`/${category1}/${category2}`});
                mainMenu.subMenu.push({name: koCategory2, link:`/${category1}/${category2}`});
            }
        });

        // 카테고리에 없는 메
        const defaultMenus = [
            {name: "고객센터", link:"/custom"},
            {name: "이벤트", link:"/event"},
        ]

        menuList.push(...defaultMenus);
        set({menus: menuList});
        // console.log(menuList);
    },
}));