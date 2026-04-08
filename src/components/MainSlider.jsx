import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function MainSlider() {
    const slides = [
        { src: "./images/main-slider/main-slider1.png", alt: "main-slider1" },
        { src: "./images/main-slider/main-slider2.png", alt: "main-slider2" },
        { src: "./images/main-slider/main-slider3.png", alt: "main-slider3" },
        { src: "./images/main-slider/main-slider4.png", alt: "main-slider4" },
        { src: "./images/main-slider/main-slider5.png", alt: "main-slider5" },
    ]
    return (
        <div>
            <Swiper
                modules={[Autoplay, Pagination, Scrollbar]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                loop={true}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <img src={slide.src} alt={slide.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
