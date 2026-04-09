import React from 'react'
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
  )
}
