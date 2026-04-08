import React from 'react'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'

export default function KYMain() {
  const slides = [
    { src: "../../public/images/KY/B/BP/Bp01.png", alt: "slider1" },
    { src: "../../public/images/KY/B/BP/Bp02.png", alt: "slider2" },
    { src: "../../public/images/KY/B/BP/Bp03.png", alt: "slider3" },
    { src: "../../public/images/KY/B/BP/Bp04.png", alt: "slider4" }]



  return (
    <>
      <Swiper>
        <SwiperSlide><div className="left">
          {slides.map((item) => (<img src={item.src} alt={item.alt} />))}</div><div className="right"><ul>
            { }</ul></div></SwiperSlide>
        <SwiperSlide><div className="left">{ }</div><div className="right"><ul>
          { }</ul></div></SwiperSlide>
        <SwiperSlide><div className="left">{ }</div><div className="right"><ul>
          { }</ul></div></SwiperSlide>
        <SwiperSlide><div className="left">{ }</div><div className="right"><ul>
          { }</ul></div></SwiperSlide>




      </Swiper>
    </>
  )
}
