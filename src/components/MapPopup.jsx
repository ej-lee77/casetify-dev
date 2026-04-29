import React from 'react'

export default function MapPopup({ onClose, location }) {
  return (
    <div className='MapPopup'>
      <div>
        <p>매장 상세정보</p>
        <button onClick={onClose}>닫기</button>
      </div>

      <h2>지점 : {location.name}</h2>

      {location.img && (
        <img src={location.img} alt={location.name} />
      )}

      <div>
        <h3>주소</h3>
        <p>{location.address}</p>
      </div>

      <div>
        <h3>영업시간</h3>
        <p>{location.hours?.[0]}</p>
      </div>
    </div>
  )
}