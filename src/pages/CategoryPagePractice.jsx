import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import "./scss/CategoryPage.scss"

export default function CategoryPagePractice() {
    const { mainCate, subCate } = useParams();

    const {
        items,
        onFetchItems,
        mainMenuList,
        filterItems,
        onFilterMainCate,
        onLastCategoryMenu,
        deviceFilter
    } = useProductStore();

    // 카테고리 찾기
    const main = mainMenuList.find((m) => m.link === mainCate);
    const sub = main?.sub?.find((s) => s.link === subCate);

    const mainCateKo = main?.name;
    const subCateKo = sub?.name;
    const miniCate = sub?.mini;
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

    // 데이터 로딩
    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, [items]);

    // 기본 필터
    useEffect(() => {
        if (items.length > 0) {
            onFilterMainCate(mainCateKo, subCateKo);
        }
    }, [items, mainCate, subCate]);

    // 필터 데이터 생성
    useEffect(() => {
        if (filterItems.length > 0) {
            onLastCategoryMenu();
        }
    }, [filterItems]);

    // 상태
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    // 페이지 이동 시 초기화
    useEffect(() => {
        setSelectedDevice(null);
    }, [mainCate, subCate]);

    // 미니카테 클릭
    const onhandleMiniCategory = (mini) => {
        onFilterMainCate(mainCateKo, subCateKo, mini);
        setSelectedDevice(null);
    };

    // 🔥 device 구조 판별
    const isPhone = !Array.isArray(deviceFilter);

    // 🔥 최종 필터
    const displayItems = filterItems.filter(item => {

        if (selectedDevice) {

            // 📱 핸드폰
            if (selectedDevice.brand) {
                const deviceData = item.deviceCategory?.[selectedDevice.brand];

                if (!deviceData) return false;

                if (!deviceData.includes(selectedDevice.model)) {
                    return false;
                }
            }

            // 🎧 액세서리
            else {
                if (!item.deviceCategory?.includes(selectedDevice.model)) {
                    return false;
                }
            }
        }

        return true;
    });

    return (
        <div className="sub-page-wrap">

            {/* 슬라이더 */}
            <div className="sub-slider">
                <img
                    src={subCate
                        ? `/images/category/slider/${mainCate}-${subCate}.png`
                        : `/images/category/slider/${mainCate}.png`
                    }
                    alt={subCateKo}
                />
            </div>

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
                            <img
                                src={`/images/category/mini/${MINI_ICON[mini] || "default"}.png`}
                                alt={mini}
                            />
                            <p>{mini}</p>
                        </li>
                    )}
                </ul>
                : null
            }

            {/* 🔥 필터 버튼 */}
            <div className="filter-bar">
                <button onClick={() => setIsFilterOpen(prev => !prev)}>
                    필터
                </button>
            </div>

            {/* 🔥 기기 선택 */}
            <div className="device-section">

                <h3>기기 선택</h3>

                {isPhone ? (
                    <div className="device-phone">

                        {Object.entries(deviceFilter).map(([brand, models]) => (
                            <div key={brand} className="brand-block">

                                <p className="brand-title">{brand}</p>

                                <div className="model-list">
                                    {models.map((model) => (
                                        <button
                                            key={model}
                                            onClick={() =>
                                                setSelectedDevice({ brand, model })
                                            }
                                        >
                                            {model}
                                        </button>
                                    ))}
                                </div>

                            </div>
                        ))}

                    </div>
                ) : (
                    <div className="device-etc">

                        {deviceFilter.map((model) => (
                            <button
                                key={model}
                                onClick={() =>
                                    setSelectedDevice({ model })
                                }
                            >
                                {model}
                            </button>
                        ))}

                    </div>
                )}

            </div>

            {/* 상품 리스트 */}
            <ul className='product-list'>
                {displayItems.map((item) => (
                    <li key={item.id}>
                        {item.productName}
                    </li>
                ))}
            </ul>

        </div>
    )
}