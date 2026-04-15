import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/pagination'
import "../scss/Collab.scss"

export default function Collab() {
    const slides = [
        {
            id: "1",
            colImg: "./images/main/collab/collab-prod1.png",
            title: "The Powerpuff Girls Special Set",
            themeImg: "./images/main/collab/collab-th1.png"
        },
        {
            id: "2",
            colImg: "./images/main/collab/collab-prod2.png",
            title: "Zootopia 2 Special Set",
            themeImg: "./images/main/collab/collab-th2.png"
        },
        {
            id: "3",
            colImg: "./images/main/collab/collab-prod3.png",
            title: "70 Years of Miffy Joy Set",
            themeImg: "./images/main/collab/collab-th3.png"
        },
        {
            id: "4",
            colImg: "./images/main/collab/collab-prod4.png",
            title: "Bridgerton Secrecy in the Garden Set",
            themeImg: "./images/main/collab/collab-th4.png"
        },
        {
            id: "5",
            colImg: "./images/main/collab/collab-prod5.png",
            title: "Maison Kitsune Black Fox Special Set",
            themeImg: "./images/main/collab/collab-th5.png"
        },
        {
            id: "6",
            colImg: "./images/main/collab/collab-prod6.png",
            title: "SUSAN FANG Lavender Mist Special Set",
            themeImg: "./images/main/collab/collab-th6.png"
        },
        {
            id: "7",
            colImg: "./images/main/collab/collab-prod7.png",
            title: "FLOWERS STICKERMANIA SET",
            themeImg: "./images/main/collab/collab-th7.png"
        },
        {
            id: "8",
            colImg: "./images/main/collab/collab-prod8.png",
            title: "Meri Meri Special Set",
            themeImg: "./images/main/collab/collab-th8.png"
        },
        {
            id: "9",
            colImg: "./images/main/collab/collab-prod9.png",
            title: "Mickey Mouse & Rose Case Special Set",
            themeImg: "./images/main/collab/collab-th9.png"
        },
        {
            id: "10",
            colImg: "./images/main/collab/collab-prod10.png",
            title: "FIFA WORLD CUP 26™ 스페셜 세트",
            themeImg: "./images/main/collab/collab-th10.png"
        },
        {
            id: "11",
            colImg: "./images/main/collab/collab-prod11.png",
            title: "BBNEXDO Festival Special Set",
            themeImg: "./images/main/collab/collab-th11.png"
        },
        {
            id: "12",
            colImg: "./images/main/collab/collab-prod12.png",
            title: "KBO Collage 스페셜 세트",
            themeImg: "./images/main/collab/collab-th12.png"
        },
    ]
    return (
        <section className='collab-wrap'>
            <Swiper modules={[Autoplay,]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                loop={true}

                slidesPerView={5}
                spaceBetween={30}>

                {slides.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="card">
                            <div className="card-img">
                                <img src={item.colImg} alt="" /></div>
                            <div className="card-content">
                                <img src={item.themeImg} alt="" className='theme-img' />
                                <p>{item.title}</p>
                            </div>
                            <button className="more-btn">컬렉션 더보기 +</button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>

    )
}
