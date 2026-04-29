import React from 'react';
import { useMapStore } from '../store/useMapStore';
import "./scss/MapPopup.scss"

export default function MapPopup({ onClose }) {
  const { selectedLocation } = useMapStore();

  if (!selectedLocation) return null;

  return (
    <div className='MapPopup'>
      <div>
        <p>매장 상세정보</p>
        <button onClick={onClose}>닫기</button>
      </div>

      <h2>{selectedLocation.name}</h2>

      <img src={selectedLocation.img} alt="" />

      <p>{selectedLocation.address}</p>
      <p>{selectedLocation.hours?.[0]}</p>
    </div>
  );
}