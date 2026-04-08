import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'

export default function Main() {
  const {onFetchItems} = useProductStore();

  useEffect(()=>{
    onFetchItems();
  }, []);
  return (
    <div className="sub-page-wrap">
      Main
    </div>
  )
}
