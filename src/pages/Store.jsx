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
          <div className="store-search-wrap"></div>
          <div className="store-select-wrap">
            <p>지역을 고르세요</p>
            <p>가까운 지점 순으로 보기</p>
          </div>
          <p>현재위치 사용</p>
          (매장 리스트)
          <div className="store-list-pager"></div>
        </div>
      </div>
    </div>
  )
}
