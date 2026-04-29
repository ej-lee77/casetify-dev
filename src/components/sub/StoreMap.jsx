import React, { useEffect, useState } from 'react'
import { useMapStore } from '../../store/useMapStore';
import MapPopup from '../MapPopup';

export default function StoreMap() {
    const { location } = useMapStore();
    // ######### 팝업창 열기 체크할 변수
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        let map;

        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');

                const mapOption = {
                    center: new window.kakao.maps.LatLng(location.lat, location.lng),
                    level: 4,
                };

                map = new window.kakao.maps.Map(mapContainer, mapOption);

                const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);

                // 마커 이미지
                const makerImgSrc = "/images/app-icon-colab.png";
                const markerImgSize = new window.kakao.maps.Size(48, 48);
                const markerImgOption = {
                    offset: new window.kakao.maps.Point(24, 48),
                };

                // 마커 이미지 생성
                const markerImage = new window.kakao.maps.MarkerImage(
                    makerImgSrc, markerImgSize, markerImgOption
                );

                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage,
                });

                marker.setMap(map);

                //  ####### 마커 클릭 이벤트
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    setShowPopup(true);
                    console.log("위치정보", location)

                });

                window.addEventListener("resize", handleResize);
            });
        };

        const handleResize = () => {
            if (map) map.relayout();
        };

        document.head.appendChild(script);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [location]);

    return (
        <div className="store-map" style={{ width: "100%", height: "100%" }}>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>

            {/*  ################## 조건부 렌더링 팝업창 */}
            {showPopup && (
                <MapPopup onClose={() => setShowPopup(false)} location={location} />
            )}
        </div>
    );
}

