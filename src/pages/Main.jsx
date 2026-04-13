import React from 'react'
import Studio from '../components/main/Studio'
import Quality from '../components/main/Quality'
import NewArrival from '../components/main/NewArrival'
import BestProduct from '../components/main/BestProduct'
import Custom from '../components/main/Custom'
import MainTravel from '../components/main/Travel'
import Instagram from '../components/main/Instagram'
import MainSlider from '../components/main/MainSlider'


export default function Main() {
  return (
    <div className='main-wrap'>
      <MainSlider />
      <BestProduct />
      <NewArrival />
      <MainTravel />
      <Custom />
      <Instagram />
      <Studio />
      <Quality />
    </div>
  )
}
