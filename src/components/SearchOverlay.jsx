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
                        <div className="recent-search-wrap">
                            <div className="inner-title">최근 검색어</div>
                            <p className="txt-recent">최근 검색어가 없습니다.</p>
                            <ul className="recent-result-list">
                            </ul>
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
                        </div>
                    </div>
                    <div className="img-search">이미지 검색</div>
                </div>
            </div>
            {/* 검색 닫기 */}
            <p className="close-btn" onClick={onClose}><img src="/images/icon/close.svg" alt="검색닫기" /></p>
        </div>
    )
}
