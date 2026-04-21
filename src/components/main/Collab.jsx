import React, { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'


import 'swiper/css'
import 'swiper/css/pagination'
import "../scss/Collab.scss"
import FadeInSection from '../FadeInSection'

export default function Collab() {
    const slides = [
        {
            id: "1",
            colImg: "./images/main/collab/collab-prod1.png",
            title: "The Powerpuff Girls Special Set",
            themeImg: "./images/main/collab/collab-th1.png",
            price: "₩165,000"
        },
        {
            id: "2",
            colImg: "./images/main/collab/collab-prod2.png",
            title: "Zootopia 2 Special Set",
            themeImg: "./images/main/collab/collab-th2.png",
            price: "₩197,000"
        },
        {
            id: "3",
            colImg: "./images/main/collab/collab-prod3.png",
            title: "70 Years of Miffy Joy Set",
            themeImg: "./images/main/collab/collab-th3.png",
            price: "₩184,000"
        },
        {
            id: "4",
            colImg: "./images/main/collab/collab-prod4.png",
            title: "Bridgerton Secrecy in the Garden Set",
            themeImg: "./images/main/collab/collab-th4.png",
            price: "₩172,000"
        },
        {
            id: "5",
            colImg: "./images/main/collab/collab-prod5.png",
            title: "Maison Kitsune Black Fox Special Set",
            themeImg: "./images/main/collab/collab-th5.png",
            price: "₩213,000"
        },
        {
            id: "6",
            colImg: "./images/main/collab/collab-prod6.png",
            title: "SUSAN FANG Lavender Mist Spe cial Set",
            themeImg: "./images/main/collab/collab-th6.png",
            price: "₩215,000"
        },
        {
            id: "7",
            colImg: "./images/main/collab/collab-prod7.png",
            title: "FLOWERS STICKER MANIA SET",
            themeImg: "./images/main/collab/collab-th7.png",
            price: "₩191,000"
        },
        {
            id: "8",
            colImg: "./images/main/collab/collab-prod8.png",
            title: "Meri Meri Special Set",
            themeImg: "./images/main/collab/collab-th8.png",
            price: "₩165,000"
        },
        {
            id: "9",
            colImg: "./images/main/collab/collab-prod9.png",
            title: "Mickey Mouse & Rose Case Special Set",
            themeImg: "./images/main/collab/collab-th9.png",
            price: "₩224,000"
        },
        {
            id: "10",
            colImg: "./images/main/collab/collab-prod10.png",
            title: "FIFA WORLD CUP 26™ 스페셜 세트",
            themeImg: "./images/main/collab/collab-th10.png",
            price: "₩178,000"
        },
        {
            id: "11",
            colImg: "./images/main/collab/collab-prod11.png",
            title: "BBNEXDO Festival Special Set",
            themeImg: "./images/main/collab/collab-th11.png",
            price: "₩102,000"
        },
        {
            id: "12",
            colImg: "./images/main/collab/collab-prod12.png",
            title: "KBO Collage 스페셜 세트",
            themeImg: "./images/main/collab/collab-th12.png",
            price: "₩119,000"
        },
    ]

    const swiperRef = useRef(null);

    return (
        <section className='collab-wrap'>
            <Swiper modules={[Autoplay,]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                slidesPerView={5}
                spaceBetween={30}>

                {slides.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="card"
                            onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                            onMouseLeave={() => swiperRef.current?.autoplay.start()}>
                            <Link>
                                <div className="card-inner">
                                    <div className='card-brand'>
                                        <img src={item.themeImg} alt={item.title} className='theme-img' />
                                    </div>
                                    <div className="card-back">
                                        <div className="card-img">
                                            <img src={item.colImg} alt="" /></div>
                                        <div className="card-content">
                                            <div>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                        <button className="more-btn">컬렉션 더보기 +</button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section >

    )
}
