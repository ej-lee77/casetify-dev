import React from 'react'
import SectionTitle from '../components/SectionTitle'
import ProductCustomizePage from '../components/sub/custom/pages/ProductCustomizePage'

export default function CustomPage() {
  return (
    <div className='sub-page-wrap'>
      <div className="inner">
        <SectionTitle title={"custom"} subtitle={""} />
        <ProductCustomizePage/>
      </div>
    </div>
  )
}
