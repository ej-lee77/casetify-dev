import React from 'react'
import "./scss/Store.scss"
import SectionTitle from '../components/SectionTitle'
import StoreMap from '../components/sub/StoreMap'

export default function Store() {
  return (
    <div className="sub-page-wrap store-page">
      <div className="inner store-title">
        <SectionTitle title={"Store"} subtitle={""} />
      </div>
      <div className="store-map-wrap">
        <StoreMap />
        <div className="store-info-wrap">
          <div className="store-search-wrap">
            <label>
              <input type="text" placeholder="매장지역 검색" />
            </label>
            <div className="btn-search">
              <img src="/images/icon/search_var.svg" alt="검색" />
            </div>
          </div>
          <div className="store-select-wrap">
            <button className="select-btn">
              <span>지역을 고르세요</span>
              <span className="arrow"><img src="/images/icon/icon-arrow-down.svg" alt="arrow-icon" /></span>
            </button>
            <button className="select-btn">
              <span>가까운 지점 순으로 보기</span>
              <span className="arrow"><img src="/images/icon/icon-arrow-down.svg" alt="arrow-icon" /></span>
            </button>
          </div>
          <p>현재위치 사용</p>
          (매장 리스트)
          <div className="store-list-pager"></div>
        </div>
      </div>
    </div>
  )
}
