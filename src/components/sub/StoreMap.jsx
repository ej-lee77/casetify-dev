import React, { useEffect } from 'react'

export default function StoreMap() {
    useEffect(() => {
        let map; // 외부 참조 목적

        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map'); // 지도 표시 div

                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.52611, 126.9285), // 지도 중심좌표
                    level: 2, // 지도 확대 레벨
                };

                map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

                // 마커 이미지
                const makerImgSrc = "../images/app-icon-colab.png";
                const markerImgSize = new window.kakao.maps.Size(48, 48);
                const markerImgOption = {
                    offset: new window.kakao.maps.Point(19, 60),
                };

                // 마커 이미지 생성
                const markerImage = new window.kakao.maps.MarkerImage(
                    makerImgSrc, markerImgSize, markerImgOption
                );

                // 마커 위치
                const markerPosition = new window.kakao.maps.LatLng(37.52611, 126.9285);

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage,
                });

                marker.setMap(map);

                // 창 크기 변경 대응
                window.addEventListener("resize", handleResize);
            });
        };

        const handleResize = () => {
            if (map) { map.relayout(); }
        };

        document.head.appendChild(script);

        // cleanup
        return () => { window.removeEventListener("resize", handleResize); };
    }, []);

    return (
        <div className="store-map" style={{ width: "100%", height: "100%" }}>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
    )
}
