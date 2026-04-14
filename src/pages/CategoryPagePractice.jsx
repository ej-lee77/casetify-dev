import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import "./scss/CategoryPage.scss"
import DetailProductCard from '../components/sub/DetailProductCard';


export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();
    const { items, onFetchItems, mainMenuList, filterItems, onFilterMainCate, onLastCategoryMenu, deviceFilter } = useProductStore();

    // 한글로 변환
    const mainCateKo = mainMenuList.find((main) => main.link === mainCate).name;
    const subCateKo = mainMenuList.find((main) => main.link === mainCate).sub?.find((sub) => sub.link === subCate).name;
    const miniCate = mainMenuList.find((main) => main.link === mainCate).sub?.find((sub) => sub.link === subCate).mini;
    const MINI_ICON = {
        "핸드폰": "phone",
        "이어폰": "earphone",
        "노트북": "laptop",
        "워치": "watch",
        "태블릿": "tablet",
        "컬러": "color",
        "패턴": "pattern",
        "시그니처": "signature",
        "캐릭터": "character",
        "아트": "art",
        "영화&엔터": "movie",
        "패션&라이프스타일": "fashion",
        "스포츠": "sports",
        "기타": "etc",
    };
    const onhandleMiniCategory = (mini) => {
        // console.log("minicateClick");
        onFilterMainCate(mainCateKo, subCateKo, mini);
    }
    return (
        <div className="sub-page-wrap">
            {/* 슬라이더 */}
            <div className="sub-slider">
                <img
                    src={
                        subCate
                            ? `/images/category/slider/${mainCate}-${subCate}.png`
                            : `/images/category/slider/${mainCate}.png`
                    }
                    alt={subCateKo}
                />
            </div>
            <div className="inner">
                {/* 경로 */}
                <div className="menu-map">
                    <span>홈</span>
                    <span> &gt; </span>
                    <span>{subCateKo}</span>
                </div>
                {/* 미니 카테고리 */}
                {miniCate ?
                    <ul className="mini-menu">
                        {miniCate.map((mini, id) =>
                            <li key={id} onClick={() => onhandleMiniCategory(mini)}>
                                <img src={`/images/category/mini/${MINI_ICON[mini]}.png`} alt={mini} />
                                <p>{mini}</p>
                            </li>
                        )}
                    </ul>
                    : null
                }

                {/* 필터 */}
                <div className="filtering">
                    <button><img src="" alt="" />필터</button>
                    <button>기기선택</button>
                </div>
                {/* 상품 목록 */}
                <ul className='product-list'>
                    {filterItems.map((item) => (
                        <li key={item.id}>
                            <DetailProductCard item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
