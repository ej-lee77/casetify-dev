import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "../scss/bestProduct.scss"
import { Autoplay, Pagination } from 'swiper/modules'
import SectionTitle from '../SectionTitle';

const BPmain = [
    {
        src: "./images/main/bestproduct/BP/Bp04.png",
        alt: "slider1",
        Bpproduct: [
            {
                id: 1,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct001.png"
            },
            ,

            {
                id: 2,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct002.png"
            },

            {
                id: 3,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct003.png"
            },


            {
                id: 4,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct004.png"
            }]
    },
    {
        src: "./images/main/bestproduct/BP/Bp02.png",
        alt: "slider2",
        Bpproduct: [
            {
                id: 5,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct005.png"
            },
            ,

            {
                id: 6,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct006.png"
            },

            {
                id: 7,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct007.png"
            },


            {
                id: 8,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct008.png"
            }]

    },

    {
        src: "./images/main/bestproduct/BP/Bp03.png",
        alt: "slider3",
        Bpproduct: [
            {
                id: 9,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct009.png"
            },
            ,

            {
                id: 10,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct010.png"
            },

            {
                id: 11,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct011.png"
            },


            {
                id: 12,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct012.png"
            }]





    },
    {
        src: "./images/main/bestproduct/BP/Bp01.png", alt: "slider4",
        Bpproduct: [
            {
                id: 13,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct013.png"
            },
            ,

            {
                id: 14,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct014.png"
            },

            {
                id: 15,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct015.png"
            },


            {
                id: 16,
                title: "Happiest KKOTKA in the world",
                price: 29000,
                BPimage: "./images/main/bestproduct/BpProduct016.png"
            }]






    }
];

// 배열 구조분해
const [slide1, slide2, slide3, slide4] = BPmain;




export default function BestProduct() {
    const [activeIndex, setActiveIndex] = useState(0); // ✅ 초기값 추가

    return (
        <section>
            <div className="inner">
                <SectionTitle
                    title="Best Product"
                    subtitle="지금 케이스티파이에서 가장핫한 제품" />

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
                                setActiveIndex(Swiper.realIndex); // ✅ 수정

                            }}>
                            <SwiperSlide>
                                <img src={slide1.src} alt={slide1.alt} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={slide2.src} alt={slide2.alt} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={slide3.src} alt={slide3.alt} />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={slide4.src} alt={slide4.alt} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="right">
                        <ul >

                            {BPmain[activeIndex]?.Bpproduct.map((item) => ( // ✅ 안전 처리 + index 제거

                                <li key={item.id}> {/* ✅ key 수정 */}
                                    <div>
                                        <img src={item.BPimage} alt="" />
                                    </div>
                                    <div>
                                        <p className='name'>{item.title}</p>
                                        <p className='price'> ₩{item.price.toLocaleString()}</p>
                                    </div>

                                </li>

                            ))}


                        </ul>
                        <button>더보기</button>
                    </div>
                </div>
            </div >
        </section>
    )
}