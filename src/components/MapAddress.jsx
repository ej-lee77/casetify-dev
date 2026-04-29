import React from 'react'
import { useMapStore } from '../store/useMapStore'

const MapAddress = ({ sendList }) => {
    const { onSetLocation } = useMapStore();
    const handleClick = () => {
        onSetLocation({
            name: sendList.storeName,
            lat: sendList.lat,
            lng: sendList.lng,
            address:sendList.storeAddress,
            hours:sendList.openHour,
            img:sendList.storeImg
        });
    }
    return (
        <li onClick={handleClick}>
            <h3>{sendList.storeName}</h3>
            <div><span>오픈!!!</span> 현위치에서 거리표시:<span></span></div>
        </li>
    )
}


export default MapAddress