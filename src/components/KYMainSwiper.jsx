import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./scss/KY.scss"
import 'swiper/css';




import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

export default function KYMainSwiper({ slides }) {
    return (
        <div className="Left-Swiper">
            <Swiper
                modules={[Autoplay,]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}

                loop={true}
                className="mySwiper"
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.src} alt={item.alt} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}