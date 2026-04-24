import React, { useEffect, useState } from 'react'
import "./scss/SearchOverlay.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import ImageSearchModal from './ImageSearchModal';

// 임시 배열
const tempRecoItem = [
    {
        id: "CTF-34942803-16006188",
        badge: [
            "무료 배송"
        ],
        price: "127000",
        productName: "Enjoy Where I Am",
        caseCategory: "2-in-1 충전 스탠드",
        color: [
            "White"
        ],
        collabo: "By nothing here",
        mainCategory: "악세서리",
        subCategory: "충전기",
        miniCategory: "충전기",
        lastCategory: "charger",
        deviceCategory: ""
    },
    {
        id: "CTF-35461019-16008668",
        badge: [
            "무료 배송"
        ],
        price: "127000",
        productName: "Where are we going",
        caseCategory: "2-in-1 충전 스탠드",
        color: [
            "White",
            "Matte Black"
        ],
        collabo: "By Shinkiru",
        mainCategory: "악세서리",
        subCategory: "충전기",
        miniCategory: "충전기",
        lastCategory: "charger",
        deviceCategory: ""
    },
    {
        id: "CTF-37181334-16010330",
        badge: [],
        price: "45000",
        productName: "Black Sakura Bloom",
        caseCategory: "데스크 매트",
        color: [
            "White"
        ],
        collabo: "",
        mainCategory: "악세서리",
        subCategory: "기타",
        miniCategory: "기타",
        lastCategory: "etc",
        deviceCategory: ""
    },
    {
        id: "CTF-34735868-16010810",
        badge: [],
        price: "45000",
        productName: "Snappy Grip Holder Customizer",
        caseCategory: "",
        color: [
            "Pink",
            "Glitter Black",
            "Clear",
            "Matte Black",
            "Soft Blue"
        ],
        collabo: "",
        mainCategory: "악세서리",
        subCategory: "맥세이프",
        miniCategory: "맥세이프",
        lastCategory: "magsafe",
        deviceCategory: ""
    },
]

export default function SearchOverlay({ isActive, onClose }) {
    //전역변수 searchWord, onSetSearchWorld
    const { searchWord, onSetSearchWord, searchWordList, onAddSearchList, onRemoveSearchList, onRemoveAllSearch } = useProductStore();

    // 검색한 단어를 저장하는 변수
    useEffect(() => {
        if (searchWordList.length === 0) { setSearchCheck(false) } else { setSearchCheck(true) }
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 검색어 빈 값 방지
        if (!searchWord.trim()) return;

        onAddSearchList();

        // 검색어 페이지로 이동
        navigate();

        console.log("찾는 단어 있음", searchWordList);
    }
    const [searchCheck, setSearchCheck] = useState(false);
    const [modalCheck, setModalCheck] = useState(false);

    return (
        <div className={`search-overlay-wrap ${isActive ? "active" : ""}`}>
            <div className="search-content-outer-wrap">
                <h1 className="logo">
                    <Link to="/"><img src="/images/casetify-logo-15th.png" alt="casetify" /></Link>
                </h1>
                <div className="search-center-wrap">
                    <div className="search-content-inner-wrap">
                        <form className="search-bar" onSubmit={handleSubmit}>
                            <label>
                                <input type="text" placeholder="궁금한 내용의 단어나 키워드로 검색하세요"
                                    value={searchWord}
                                    onChange={(e) => onSetSearchWord(e.target.value)}
                                />
                            </label>
                            <button className="btn-search">
                                <img src="/images/icon/search_var.svg" alt="검색" />
                            </button>
                            {searchWord.length > 0 && (
                                <button className="btn-reset" onClick={() => onSetSearchWord("")}>
                                    <img src="/images/icon/btn_reset.svg" alt="검색초기화" />
                                </button>
                            )}
                        </form>
                        <div className="recent-search-wrap">
                            <div className="inner-title">최근 검색어</div>
                            {searchCheck ?
                                (<div className="recent-result-wrap">
                                    <button className="remove-all" onClick={onRemoveAllSearch}>모두 지우기</button>
                                    <ul className="recent-result-list">
                                        {searchWordList.map((s) => (
                                            <li key={s.id}>{s.text} <button onClick={(e) => onRemoveSearchList(s.id)}> ×</button></li>
                                        ))}
                                    </ul>
                                </div>
                                )
                                : (<p className="txt-recent">최근 검색어가 없습니다.</p>)}
                        </div>
                        <div className="pop-search-wrap">
                            <div className="inner-title">인기 검색어</div>
                            <ol className="pop-search-list">
                                <li>클리어 케이스</li>
                                <li>맥세이프 케이스</li>
                                <li>블루 스트랩 케이스</li>
                                <li>아이폰 17 Pro Max</li>
                                <li>gdragon</li>
                                <li>아이폰 17 Pro</li>
                                <li>크롬</li>
                                <li>아이폰 17</li>
                                <li>아이폰 Air</li>
                                <li>메탈 참 큐브</li>
                            </ol>
                        </div>
                        <div className="recommend-wrap">
                            <div className="inner-title">추천 상품</div>
                            <ul className="s-overlay-reco-item-list">
                                {tempRecoItem.map((item) => (
                                    <li key={item.id} className="s-reommend-item">
                                        <div className="goods-img">
                                            <img
                                                src={`/images/category/accessory/${item.id}_${item.color[0]}_0.jpg`}
                                                alt={item.productName} />
                                        </div>
                                        <div className="goods-text">
                                            <p className="item-name">{item.productName}</p>
                                            <p className="item-price">₩ {Number(item.price).toLocaleString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="search-content-extra-wrap">
                        <div className="img-search" onClick={() => setModalCheck(true)} >
                            <img src="/images/icon/icon-img-search-camera.svg" alt="이미지검색_카메라아이콘" />
                            <span>이미지 검색</span>
                        </div>
                    </div>
                </div>
            </div>
            <ImageSearchModal modalCheck={modalCheck} setModalCheck={setModalCheck} />
            {/* 검색 닫기 */}
            <p className="close-btn" onClick={onClose}><img src="/images/icon/close.svg" alt="검색닫기" /></p>
        </div>
    )
}
