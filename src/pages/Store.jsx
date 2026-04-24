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
          (매장 리스트)
          (지역검색)
        </div>
      </div>
    </div>
  )
}
