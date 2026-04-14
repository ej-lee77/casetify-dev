import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import "./scss/CategoryPage.scss"

export default function CategoryPage() {
    const { mainCate, subCate } = useParams();
    console.log("메인카테고리", mainCate, subCate)
    const { items, onFetchItems, mainMenuList, filterItems, onFilterMainCate, onLastCategoryMenu, deviceFilter } = useProductStore();

    // 한글로 변환
    const mainCateKo = mainMenuList.find((main) => main.link === mainCate).name;
    const subCateKo = mainMenuList.find((main) => main.link === mainCate).sub?.find((sub) => sub.link === subCate).name;
    const miniCate = mainMenuList.find((main) => main.link === mainCate).sub?.find((sub) => sub.link === subCate).mini;

    //미니 영문으로 변환
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

    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, [items]);


    const onhandleMiniCategory = (mini) => {
        // console.log("minicateClick");
        onFilterMainCate(mainCateKo, subCateKo, mini);
    }

    useEffect(() => {
        if (items.length > 0) {
            onFilterMainCate(mainCateKo, subCateKo);
        }
    }, [items, mainCate, subCate]);

    useEffect(() => {
        console.log("filterItems 변경됨", filterItems.length);
        if (filterItems.length > 0) {
            onLastCategoryMenu();
        }
    }, [filterItems]);

    // console.log("최종 카테", filterItems);

    const [selectedDevice, setSelectedDevice] = useState(null);

    const onHandleDeviceFilter = (brand, model) => {
        if (!model) {
            setSelectedDevice(null);
            return;
        }
        setSelectedDevice({ brand, model });
    }

    // 필터링된 상품
    const displayItems = selectedDevice
        ? filterItems.filter(item =>
            item.deviceCategory?.[selectedDevice.brand]?.includes(selectedDevice.model)
        )
        : filterItems;


    return (
        <div className="sub-page-wrap">
            {/* 슬라이더  */}
            <div className="sub-slider">
                <img src={subCate
                    ? `/images/category/slider/${mainCate}-${subCate}.png`
                    : `/images/category/slider/${mainCate}.png`
                }
                    alt={subCateKo} />
            </div>
            {/* <h2>{subCateKo}</h2> */}
            {/* 경로 */}
            <div className="breadcrumb">
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

            {/* 필터 바 */}
            <div className="filter-dropdowns">
                {Object.entries(deviceFilter).map(([brand, models]) => (
                    <select key={brand} onChange={(e) => onHandleDeviceFilter(brand, e.target.value)}>
                        <option value="">{brand}</option>
                        {models.map((model, id) => (
                            <option key={id} value={model}>{model}</option>
                        ))}
                    </select>
                ))}
            </div>

            {/* 활성 태그 + 정렬 */}
            <div className="filter-result-bar">
                <div className="active-tags">
                    {/* 활성 태그 들어올 자리 */}
                </div>
                <select className="sort-select">
                    <option>추천순</option>
                    <option>신상품순</option>
                    <option>낮은가격순</option>
                    <option>높은가격순</option>
                </select>
            </div>

            {/* 상품 목록 */}
            <ul className='product-list'>
                {filterItems.map((item) => (
                    <li key={item.id}>
                        {item.productName}
                    </li>
                ))}
            </ul>
        </div>
    )
}
