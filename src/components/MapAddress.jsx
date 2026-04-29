import React from 'react';
import { useMapStore } from '../store/useMapStore';

const MapAddress = ({ sendList }) => {
    const { setSelectedLocation } = useMapStore();

    return (
        <li onClick={() => {
            setSelectedLocation({
                name: sendList.storeName,
                lat: sendList.lat,
                lng: sendList.lng,
                address: sendList.storeAddress,
                hours: sendList.openHour,
                img: sendList.storeImg
            });
        }}>
            <h3>{sendList.storeName}</h3>
            <p>{sendList.storeAddress}</p>
            {sendList.distance && (
                <p>
                    {sendList.distance.toFixed(2)} km
                </p>
            )}
        </li>
    );
};

export default MapAddress;