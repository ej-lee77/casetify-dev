import React, { useEffect, useState, useRef } from 'react';
import { useMapStore } from '../store/useMapStore';
import "./scss/MapPopup.scss"

export default function MapPopup({ onClose }) {
  const { selectedLocation } = useMapStore();

  if (!selectedLocation) return null;

  const popupRef = useRef(null);

  // 매장 정보 팝업 위치 상태관리
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 초기 중앙 위치 계산
  useEffect(() => {
    if (!popupRef.current) return;

    const rect = popupRef.current.getBoundingClientRect();

    //  set position
    setPosition({
      x: window.innerWidth / 2 - rect.width / 2,
      y: window.innerHeight / 2 - rect.height / 2 - 260
    });
  }, []);

  // 드래그 이동
  useEffect(() => {
    const move = (e) => {
      if (!isDrag) return;

      const popupWidth = popupRef.current.offsetWidth;
      const popupHeight = popupRef.current.offsetHeight;

      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      // 화면 범위 제한
      const maxX = window.innerWidth - popupWidth;
      const maxY = window.innerHeight - popupHeight;

      newX = Math.max(16, Math.min(newX, maxX - 16));
      newY = Math.max(16, Math.min(newY, maxY));

      setPosition({
        x: newX,
        y: newY
      });
    };
    const up = () => setIsDrag(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

  }, [isDrag, offset])

  // 마우스 이벤트 - 드래그 시작
  const handleMouseDown = (e) => {
    setIsDrag(true);

    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  return (
    <div
      ref={popupRef}
      className='MapPopup'
      style={{ top: position.y, left: position.x }}
    >
      {/* <div className="map-popup-title">
        <p>매장 상세정보</p>
        <button onClick={onClose}>
          <img src="../images/icon/close-24dp.svg" alt="닫기" />
        </button>
      </div> */}

      <button onClick={onClose}>
        <img src="../images/icon/close-24dp.svg" alt="닫기" />
      </button>

      <div className="drag-area" onMouseDown={handleMouseDown}>
        <h2>{selectedLocation.name}</h2>
      </div>
      <div className="store-img-area">
        <img src={selectedLocation.img} alt="" />
      </div>

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