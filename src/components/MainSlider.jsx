import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import "./scss/MainSlider.scss"

export default function MainSlider() {
    const slides = [
        {
            src: "./images/main-slider/main-slider1.png", alt: "main-slider1",
            titleImg: "./images/main-slider/main-slider-title1.png",
            text: "나를 만난 모든 순간, 그 모든 여정에 함께."
        },
        {
            src: "./images/main-slider/main-slider2.png", alt: "main-slider2",
            titleImg: "./images/main-slider/main-slider-title2.webp",
            text: "에스더 버니와 함께하는 즐거운 여정!"
        },
        {
            src: "./images/main-slider/main-slider3.png", alt: "main-slider3",
            titleImg: "./images/main-slider/main-slider-title3.png",
            text: "Infinity In Bloom Collection",
            sub: "천상의 리본과 끝없는 가능성이 만나는 곳"
        },
        {
            src: "./images/main-slider/main-slider4.png", alt: "main-slider4",
            titleImg: "./images/main-slider/main-slider-title4.png",
            text: "완벽하게 당신다운,",
            sub: " 세상에 없던 단 하나의 케이스."
        },
        {
            src: "./images/main-slider/main-slider5.png", alt: "main-slider5",
            titleImg: "./images/main-slider/main-slider-title5.png",
            text: "단 하나의 마그네틱 스타, 단 하나의 독보적인 에딧.",
            sub: "아일릿 원희의 감성으로 채운 Y2K"
        },
    ]
    return (
        <div>
            <Swiper className='main-slider-img'
                modules={[Autoplay, Pagination]}
                // autoplay={{
                //     delay: 5000,
                //     disableOnInteraction: false
                // }}
                pagination={{ clickable: true }}
                loop={true}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <img src={slide.src} alt={slide.alt} />

                        {/* 슬라이더 제목 */}
                        <div className="slide-title">
                            <img src={slide.titleImg} alt="title" className='title-img' />
                            {slide.text && <h2>{slide.text}</h2>}
                            {slide.sub && <h2>{slide.sub}</h2>}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
