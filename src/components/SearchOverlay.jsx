import React from 'react'
import "./scss/SearchOverlay.scss";

export default function SearchOverlay({ isActive, onClose }) {
    return (
        <div className={`search-overlay-wrap ${isActive ? "active" : ""}`}>
            (temp - 검색 오버레이)
            {/* 검색 닫기 */}
            <p onClick={onClose}><img src="/images/icon/close.svg" alt="검색닫기" /></p>
        </div>
    )
}
