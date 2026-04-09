import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "./scss/KY.scss"
import BpList from './BpList'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

const BPmain = [
    { src: "./images/KY/B/BP/Bp01.png", alt: "slider1" },
    { src: "./images/KY/B/BP/Bp02.png", alt: "slider2" },
    { src: "./images/KY/B/BP/Bp03.png", alt: "slider2" },
    { src: "./images/KY/B/BP/Bp04.png", alt: "slider2" }
];

// 배열 구조분해
const [slide1, slide2, slide3, slide4] = BPmain;

export default function SwiperKY() {
    return (
        <div className="inner">
            <Swiper modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                loop={true}>
                <SwiperSlide>
                    <div className="all">
                        <div className="right"><img src={slide1.src} alt={slide1.alt} /></div>
                        <div className="left"><BpList />
                            <button>더보기</button>

                        </div>
                    </div>


                </SwiperSlide>
                <SwiperSlide>
                    <div className="all">
                        <div className="right"><img src={slide2.src} alt={slide2.alt} /></div>
                        <div className="left"><BpList />
                            <button>더보기</button>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="all">
                        <div className="right"><img src={slide3.src} alt={slide3.alt} /></div>
                        <div className="left"><BpList />
                            <button>더보기</button>

                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="all">
                        <div className="right"><img src={slide4.src} alt={slide4.alt} /></div>
                        <div className="left"><BpList />
                            <button>더보기</button> </div>
                    </div>

                </SwiperSlide>




            </Swiper>
        </div >
    )
}
