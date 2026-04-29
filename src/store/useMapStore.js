import { create } from "zustand";
import { studioPosData } from "../data/studioPosData";

export const useMapStore = create((set, get) => ({
    // const

    //지도 위치를 나타낼 정보를 저장할 객체
    location: {
        name: "",
        lat: 0,
        lng: 0,
        address: "",
        hours: "",
        img: ""
    },
    onFetchMap: () => {
        const data = studioPosData[0];
        console.log("data", data)
        set({
            location: {
                name: data.storeName,
                lat: data.lat,
                lng: data.lng,
                address: data.storeAddress,
                hours: data.openHour,
                img: data.storeImg
            }
        })
    },
    //위치 정보를 변경할 메서드
    onSetLocation: (loc) => {
        set({
            location: loc
        })
        console.log("설정", loc)
    }
}))