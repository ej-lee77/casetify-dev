import React, { useEffect } from 'react'

export default function StoreMap() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map'); // 지도 표시 div

                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.5012617, 127.0251333), // 지도 중심좌표
                    level: 4, // 지도 확대 레벨
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성
            });
        };

        document.head.appendChild(script);
    }, []);

    return (
        <div className="store-map">
            <div id="map" style={{ width: "100%", height: "1500px" }}></div>
        </div>
    )
}
