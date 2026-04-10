import React from 'react'
import MainTravel from '../components/MainTravel'
import Instagram from '../components/Instagram'
import Studio from '../components/Studio'
import Quality from '../components/Quality'
import NewArrival from '../components/NewArrival'

export default function Main() {
  return (
    <div className="sub-page-wrap">
      <NewArrival />
      <MainTravel />
      <Instagram />
      <Studio />
      <Quality />
    </div>
  )
}
