import React from 'react'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import Studio from '../components/Studio'
import Quality from '../components/Quality'
import NewArrival from '../components/NewArrival'
import BestProduct from '../components/main/BestProduct'
import Custom from '../components/main/Custom'


export default function Main() {
  return (
    <div className="sub-page-wrap">
      <BestProduct />
      <NewArrival />
      <Custom />
      <Studio />
      <Quality />
    </div>
  )
}
