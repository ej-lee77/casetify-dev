import React from 'react'
import SectionTitle from '../components/SectionTitle'
import { Link } from 'react-router-dom'
import Studio from '../components/Studio'
import Quality from '../components/Quality'
import NewArrival from '../components/NewArrival'

export default function Main() {
  return (
    <div className="sub-page-wrap">
      <NewArrival />
      <Studio />
      <Quality />
    </div>
  )
}
