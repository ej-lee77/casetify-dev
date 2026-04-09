import React from 'react'
import MainSlider from '../components/MainSlider'
import StudioInfoSection from '../components/StudioInfoSection'
import QualityInfoSection from '../components/QualityInfoSection'
import NewArrivalSection from '../components/NewArrivalSection'

export default function Main() {
  return (
    <>
      <MainSlider />
      <div className="sub-page-wrap">
        <NewArrivalSection />
        <StudioInfoSection />
        <QualityInfoSection />
      </div>
    </>
  )
}
