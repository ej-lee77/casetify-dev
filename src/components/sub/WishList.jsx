import React from 'react'
import "./scss/WishList.scss"
import MypageTitle from './MypageTitle'
import DetailProductCard from './DetailProductCard';


// 임시 배열
const tempItem = [
    {
        id: "CTF-28302256-16009387",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "Punny Orange&Berry",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue",
            "Matte Black"
        ],
        collabo: "By Number D",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-27729581-16009387",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "Daisy by Katie-s Collective",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue",
            "Matte Black"
        ],
        collabo: "By Katie's Collective",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-25610159-16009386",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "Bunnies",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue",
            "Matte Black"
        ],
        collabo: "By foxy illustrations",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-27290091-16009387",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "Interlude by Andhika Ramadhian",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue",
            "Matte Black"
        ],
        collabo: "By Andhika Ramadhian",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-21150934-16009386",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "Split Contrast",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue"
        ],
        collabo: "By aquabumps",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-30073724-16009386",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "Cheek-to-cheek",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue"
        ],
        collabo: "By matsui",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-31942005-16009387",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "PEACE PEACE PEACE",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue",
            "Matte Black"
        ],
        collabo: "By INAPSQUARE",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-30688515-16009386",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "VEN FLOWER",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Orange",
            "Pink",
            "Soft Blue",
            "Matte Black"
        ],
        collabo: "By Pink & Ven",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ],
            Google: [
                "Pixel 10 Pro",
                "Pixel 10",
                "Pixel 9 Pro",
                "Pixel 9"
            ]
        }
    },
    {
        id: "CTF-36436113-16010997",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "리플 케이스 - 화이트",
        caseCategory: "iPhone 17 Pro Impact HD Screen Protector + Camera Lens Protector",
        color: [],
        collabo: "Essentials by CASETiFY™",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {}
    },
    {
        id: "CTF-35674870-16009387",
        badge: [
            "무료 배송"
        ],
        price: "89000",
        productName: "TIGERS Collage Case",
        caseCategory: "맥세이프 호환 임팩트 케이스",
        color: [
            "Black",
            "Matte Black"
        ],
        collabo: "",
        mainCategory: "케이스",
        subCategory: "디바이스",
        miniCategory: "핸드폰",
        lastCategory: [
            "iPhone 17 Pro"
        ],
        deviceCategory: {
            Apple: [
                "아이폰 17 Pro",
                "아이폰 17",
                "아이폰 16 Pro",
                "아이폰 16",
                "아이폰 15 Pro",
                "아이폰 15"
            ],
            Samsung: [
                "갤럭시 S26",
                "갤럭시 S26+",
                "갤럭시 Z 폴드7",
                "갤럭시 Z 플립7",
                "갤럭시 S25",
                "갤럭시 S25+",
                "갤럭시 Z 폴드6",
                "갤럭시 Z 플립6"
            ]
        }
    }
];

export default function WishList() {
    return (
        <div>
            <MypageTitle title={"위시리스트"} />
            <ul className="wish-list">
                {/* component item */}
                {/* <li>
                    <div className="img-box">
                        <img src="./images/main/bestproduct/BpProduct001.png" alt="test-img" />
                        <span className="fav-icon"><img src="./images/icon/icon_favorite_fill.svg" alt="" /> </span>
                    </div>
                    <div className="text-box">
                        <p className="item-name">Happiest KKOTKA in the world</p>
                        <p className="item-price">₩{Number("29000").toLocaleString()} <span className="free-shipping">#무료배송</span></p>
                        <p className="color-list"></p>
                    </div>
                </li> */}
                {tempItem.map((item) => (
                    <DetailProductCard key={item.id} item={item} />
                ))}

            </ul>
        </div>
    )
}
