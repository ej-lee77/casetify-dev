import React from 'react'
<<<<<<< HEAD
import MainSlider from '../components/MainSlider'

export default function Main() {
  return (
    <>
      <MainSlider />
      <div className="sub-page-wrap">
        Main
      </div>
    </>
=======
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import StudioInfoSection from '../components/StudioInfoSection'
import QualityInfoSection from '../components/QualityInfoSection'
import NewArrivalSection from '../components/NewArrivalSection'

export default function Main() {
  return (
    <div className="sub-page-wrap">
      <NewArrivalSection />
      <StudioInfoSection />
      <QualityInfoSection />
    </div>
>>>>>>> c7735dd3ed630f647ac4aa5df1a69518af3f3387
  )
}
