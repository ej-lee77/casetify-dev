import React from 'react'
import "./scss/SearchOverlay.scss";
import { Link } from 'react-router-dom';

export default function SearchOverlay({ isActive, onClose }) {
    return (
        <div className={`search-overlay-wrap ${isActive ? "active" : ""}`}>
            <div className="search-content-outer-wrap">
                <h1 className="logo">
                    <Link to="/"><img src="/images/casetify-logo-15th.png" alt="casetify" /></Link>
                </h1>
                <div className="search-center-wrap">
                    <div className="search-content-inner-wrap">
                        <div className="search-bar">
                            <label>
                                <input type="text" placeholder="궁금한 내용의 단어나 키워드로 검색하세요" />
                            </label>
                            <button className="btn-search">
                                <img src="/images/icon/search_var.svg" alt="" />
                            </button>
                            <button className="btn-reset">초기화</button>
                        </div>
                        <div className="recent-search-wrap">최근 검색어</div>
                        <div className="fav-search-wrap">인기 검색어</div>
                        <div className="recommend-wrap">추천 상품</div>
                    </div>
                    <div className="img-search">이미지 검색</div>
                </div>
            </div>
            {/* 검색 닫기 */}
            <p className="close-btn" onClick={onClose}><img src="/images/icon/close.svg" alt="검색닫기" /></p>
        </div>
    )
}
