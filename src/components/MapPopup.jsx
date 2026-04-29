import React from 'react';
import { useMapStore } from '../store/useMapStore';
import "./scss/MapPopup.scss"

export default function MapPopup({ onClose }) {
  const { selectedLocation } = useMapStore();

  if (!selectedLocation) return null;

  return (
    <div className='MapPopup'>
      <div className="map-popup-title">
        <p>매장 상세정보</p>
        <button onClick={onClose}>닫기</button>
      </div>

      <h2>{selectedLocation.name}</h2>

      <img src={selectedLocation.img} alt="" />

      <div className="store-address-area">
        <span>주소</span>
        <p>{selectedLocation.address}</p>
      </div>
      <div className="store-hours-area">
        <span>영업시간</span>
        <div className="store-hours-info-area">
          <p>{selectedLocation.hours?.[0]}</p>
          <p>{selectedLocation.hours?.[1]}</p>
        </div>
      </div>
    </div>
  );
}