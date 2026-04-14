import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import "./scss/CategoryPage.scss"

export default function CategoryPage() {
    const { mainCate, subCate } = useParams();

    const {
        items,
        onFetchItems,
        mainMenuList,
        filterItems,
        onFilterMainCate,
        onLastCategoryMenu,
        deviceFilter,
        colorFilter
    } = useProductStore();

    // 카테고리 찾기
    const main = mainMenuList.find((m) => m.link === mainCate);
    const sub = main?.sub?.find((s) => s.link === subCate);

    const mainCateKo = main?.name;
    const subCateKo = sub?.name;
    const miniCate = sub?.mini;

    // 디바이스 페이지 여부
    const isDevicePage = mainCate === "case" && subCate === "device";

    // 데이터 로딩
    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, [items]);

    // 기본 카테고리 필터
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
    const [selectedColors, setSelectedColors] = useState([]);
    const [openBrand, setOpenBrand] = useState(null);

    // 페이지 이동 시 초기화
    useEffect(() => {
        setSelectedDevice(null);
        setSelectedColors([]);
        setOpenBrand(null);
    }, [mainCate, subCate]);

    // 미니카테 클릭
    const onhandleMiniCategory = (mini) => {
        onFilterMainCate(mainCateKo, subCateKo, mini);

        // 🔥 필터 초기화 (중요)
        setSelectedDevice(null);
        setSelectedColors([]);
    };

    // 브랜드 토글
    const toggleBrand = (brand) => {
        setOpenBrand(prev => prev === brand ? null : brand);
    };

    // 🔥 최종 필터
    const displayItems = filterItems.filter(item => {

        // 디바이스
        if (isDevicePage && selectedDevice) {
            const deviceData = item.deviceCategory?.[selectedDevice.brand];

            if (!deviceData) return false;

            if (selectedDevice.model) {
                if (!deviceData.includes(selectedDevice.model)) {
                    return false;
                }
            }
        }

        // 컬러
        if (selectedColors.length > 0) {
            const matchColor = selectedColors.some(color =>
                item.color.includes(color)
            );
            if (!matchColor) return false;
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

            {/* 🔥 미니 카테고리 */}
            {miniCate &&
                <ul className="mini-menu">
                    {miniCate.map((mini, id) =>
                        <li key={id} onClick={() => onhandleMiniCategory(mini)}>
                            <p>{mini}</p>
                        </li>
                    )}
                </ul>
            }

            {/* 🔥 상단 필터 바 */}
            <div className="top-filter-bar">

                {/* 필터 버튼 (토글) */}
                <button onClick={() => setIsFilterOpen(prev => !prev)}>
                    필터
                </button>

                {/* 빠른 브랜드 필터 */}
                {isDevicePage && (
                    <div className="device-quick-filter">
                        <button onClick={() => setSelectedDevice({ brand: "Apple" })}>
                            아이폰
                        </button>
                        <button onClick={() => setSelectedDevice({ brand: "Samsung" })}>
                            갤럭시
                        </button>
                        <button onClick={() => setSelectedDevice({ brand: "Google" })}>
                            픽셀
                        </button>
                    </div>
                )}

                {/* 정렬 */}
                <select>
                    <option>추천순</option>
                    <option>신상품순</option>
                </select>
            </div>

            {/* 🔥 필터 팝업 */}
            {isFilterOpen && (
                <div
                    className="filter-overlay"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div
                        className="filter-panel"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <h3>필터</h3>

                        {/* 디바이스 */}
                        {isDevicePage && (
                            <div>
                                <h4>기기</h4>

                                {Object.entries(deviceFilter).map(([brand, models]) => (
                                    <div key={brand}>
                                        <button onClick={() => toggleBrand(brand)}>
                                            {brand}
                                        </button>

                                        {openBrand === brand && (
                                            <div>
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
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 컬러 */}
                        <div>
                            <h4>컬러</h4>

                            {colorFilter.map((color) => (
                                <button
                                    key={color}
                                    onClick={() =>
                                        setSelectedColors(prev =>
                                            prev.includes(color)
                                                ? prev.filter(c => c !== color)
                                                : [...prev, color]
                                        )
                                    }
                                >
                                    {color}
                                </button>
                            ))}
                        </div>

                        {/* 버튼 */}
                        <button onClick={() => setIsFilterOpen(false)}>
                            적용
                        </button>

                        <button onClick={() => {
                            setSelectedDevice(null);
                            setSelectedColors([]);
                        }}>
                            초기화
                        </button>

                    </div>
                </div>
            )}

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