import React from 'react'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import Studio from '../components/Studio'
import Quality from '../components/Quality'
import NewArrival from '../components/NewArrival'
import BestProduct from '../components/main/BestProduct'
import Custom from '../components/main/Custom'
import MainTravel from '../components/MainTravel'
import Instagram from '../components/Instagram'
import MainSlider from '../components/MainSlider'

export default function Main() {
  return (
    <>
      <MainSlider />
      <div className="sub-page-wrap">
        <BestProduct />
        <NewArrival />
        <MainTravel />
        <Custom />
        <Instagram />
        <Studio />
        <Quality />
      </div>
    </>
  )
}
