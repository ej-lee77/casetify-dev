import React, { useEffect, useState } from 'react'
import "./scss/Store.scss"
import "../components/sub/scss/storeMap.scss"
import SectionTitle from '../components/SectionTitle'
import StoreMap from '../components/sub/StoreMap'
import { studioPosData } from '../data/studioPosData'
import MapAddress from '../components/MapAddress'
import { useMapStore } from '../store/useMapStore'

export default function Store() {
  const [show, setShow] = useState(false);
  const [areas, setArea] = useState([])
  const [areaList, setAreaList] = useState([])
  const [selectCity, setSelectCity] = useState("지역을 선택하세요")

  //########## 현재 위치 체크할 변수
  const [currentPos, setCurrentPos] = useState(null);

  const { setSelectedLocation } = useMapStore();

  //######################## 거리
  const handleSelectArea = (area) => {
    const select = studioPosData
      .filter(item => item.storeArea === area)
      .map(item => {
        if (!currentPos) return item;

        const distance = getDistance(
          currentPos.lat,
          currentPos.lng,
          item.lat,
          item.lng
        );

        return {
          ...item,
          distance
        };
      });

    setAreaList(select);

    if (select.length > 0) {
      setSelectedLocation({
        name: select[0].storeName,
        lat: select[0].lat,
        lng: select[0].lng,
        address: select[0].storeAddress,
        hours: select[0].openHour,
        img: select[0].storeImg
      });
    }

    setShow(false);
    setSelectCity(area);
  };

  useEffect(() => {
    setArea([...new Set(studioPosData.map(item => item.storeArea))])
    console.log("지도내역", areas)
  }, [])

  // ############## 현 위치값 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        console.log("위치 실패", err);
      }
    );
  }, []);


  //############## 현 위치에서 매장까지의 거리 구하기
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  const handleShow = () => {
    setShow(true)
  }

  return (
    <div className="sub-page-wrap store-page">
      <div className="inner store-title">
        <SectionTitle title={"Store"} subtitle={""} />
      </div>
      <div className="store-map-wrap">
        <StoreMap />
        <div className="store-info-wrap">
          <div className="store-search-wrap">
            <label>
              <input type="text" placeholder="매장지역 검색" />
            </label>
            <div className="btn-search">
              <img src="/images/icon/search_var.svg" alt="검색" />
            </div>
          </div>
          <div className="store-select-wrap">
            <div className='city-select'>
              <button className="select-btn" onClick={handleShow}>
                <span>{selectCity}</span>
                <span className="arrow"><img src="/images/icon/icon-arrow-down.svg" alt="arrow-icon" /></span>
              </button>
              {show && <ul className='city-list'>
                {areas.map((area, id) => (
                  <li key={id}><button
                    onClick={() => handleSelectArea(area)}>{area}</button></li>
                ))}
              </ul>
              }
            </div>
            <div className='near-list'>
              <button className="select-btn" onClick={handleSelectArea}>
                <span>가까운 지점 순으로 보기</span>
                <span className="arrow"><img src="/images/icon/icon-arrow-down.svg" alt="arrow-icon" /></span>
              </button>
            </div>
          </div>
          <div>
            {/* ############### <p>현재위치 사용</p>          
          (매장 리스트) */}
            <ul>
              {areaList.map((list, id) => (
                <MapAddress sendList={list} key={id}
                />
              ))}
            </ul>
          </div>

          <div className="store-list-pager"></div>
        </div>
      </div>
    </div >
  )
}
