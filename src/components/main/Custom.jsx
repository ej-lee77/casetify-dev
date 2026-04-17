import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "../scss/bestProduct.scss"
import "../scss/custom.scss"
import { Autoplay, Pagination } from 'swiper/modules'
import SectionTitle from '../SectionTitle';
import SlideInSection from '../SlideInSection';
import FadeInSection from '../FadeInSection';

const CUmain = [
    {
        src: "./images/main/custom/CU/custom1.png",
        alt: "slider1",
        Cuproduct: [
            {
                id: 1,
                title: "S26 포토 커스텀 케이스",
                price: 102000,
                CUimage: "./images/main/custom/CUproduct05.png"
            },
            ,

            {
                id: 2,
                title: "아이폰 텍스트 커스텀 케이스",
                price: 58000,
                CUimage: "./images/main/custom/CUproduct06.png"
            },

            {
                id: 3,
                title: "아이폰 스티커 커스텀 케이스",
                price: 83000,
                CUimage: "./images/main/custom/CUproduct07.png"
            },


            {
                id: 4,
                title: "태블릿 스티커 커스텀 케이스",
                price: 101000,
                CUimage: "./images/main/custom/CUproduct08.png"
            }]
    },
    {
        src: "./images/main/custom/CU/custom2.png",
        alt: "slider2",
        Cuproduct: [
            {
                id: 5,
                title: "랩탑 케이스 커스터마이징",
                price: 89000,
                CUimage: "./images/main/custom/CUproduct09.png"
            },
            ,

            {
                id: 6,
                title: "울트라 바운스 케이스 커스터마이징",
                price: 45000,
                CUimage: "./images/main/custom/CUproduct10.png"
            },

            {
                id: 7,
                title: "울트라 바운스 케이스 커스터마이징",
                price: 51000,
                CUimage: "./images/main/custom/CUproduct11.png"
            },


            {
                id: 8,
                title: "아이폰 포토 커스터마이징 케이스",
                price: 83000,
                CUimage: "./images/main/custom/CUproduct12.png"
            }]

    }

];

// 배열 구조분해
const [slide1, slide2] = CUmain;




export default function Custom() {
    const [activeIndex, setActiveIndex] = useState(0); 

    return (
        <section className='custom-wrap bp-wrap'>
            <div className="inner">
                <div className="all">
                    <div className="left">
                        <Swiper modules={[Autoplay, Pagination]}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                            pagination={{ clickable: true }}
                            loop={true}
                            onSlideChange={(Swiper) => {
                                setActiveIndex(Swiper.realIndex); 
                            }}>
                            <SwiperSlide>
                                <img src={slide1.src} alt={slide1.alt} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={slide2.src} alt={slide2.alt} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="right">
                        <FadeInSection direction="up" delay={0.2}>
                            <SectionTitle
                                title="Customize Your Case"
                                subtitle="케이스티파이에서 나만의 케이스를 제작해보세요" />
                        </FadeInSection>
                        <SlideInSection direction="right" delay={0.4} className='w-100'>
                            <ul >
                                {CUmain[activeIndex]?.Cuproduct.map((item) => (
                                    <li key={item.id}>
                                        <div>
                                            <img src={item.CUimage} alt="" />
                                        </div>
                                        <div>
                                            <p className='name'>{item.title}</p>
                                            <p className='price'> ₩{item.price.toLocaleString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        <button>커스텀하기</button>
                        </SlideInSection>
                    </div>
                </div>
            </div >
        </section>
    )
}