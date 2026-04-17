import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "../scss/bestProduct.scss"
import { Autoplay, Pagination } from 'swiper/modules'
import SectionTitle from '../SectionTitle';
import SlideInSection from '../SlideInSection';
import FadeInSection from '../FadeInSection';

const BPmain = [
    {
        src: "./images/main/bestproduct/BP/Bp04.png",
        alt: "slider1",
        Bpproduct: [
            {
                id: 1,
                title: "Party Teddy Bears",
                price: 89000,
                BPimage: "./images/main/bestproduct/BpProduct001.png"
            },
            ,

            {
                id: 2,
                title: "Daisy by Katie-s Collective",
                price: 108000,
                BPimage: "./images/main/bestproduct/BpProduct002.png"
            },

            {
                id: 3,
                title: "Flower Phone Charm - Chrome Blossom",
                price: 58000,
                BPimage: "./images/main/bestproduct/BpProduct003.png"
            },


            {
                id: 4,
                title: "체리 폰 팔찌",
                price: 26000,
                BPimage: "./images/main/bestproduct/BpProduct004.png"
            }]
    },
    {
        src: "./images/main/bestproduct/BP/Bp02.png",
        alt: "slider2",
        Bpproduct: [
            {
                id: 5,
                title: "Kuromi Utility Cross-body Lanyard",
                price: 83000,
                BPimage: "./images/main/bestproduct/BpProduct005.png"
            },
            ,

            {
                id: 6,
                title: "Snappy Grip Holder Customizer",
                price: 45000,
                BPimage: "./images/main/bestproduct/BpProduct006.png"
            },
            {
                id: 7,
                title: "Stitch Earbuds Case",
                price: 45000,
                BPimage: "./images/main/bestproduct/BpProduct007.png"
            },
            {
                id: 8,
                title: "Shiro Earbuds Case",
                price: 45000,
                BPimage: "./images/main/bestproduct/BpProduct008.png"
            }]

    },
    {
        src: "./images/main/bestproduct/BP/Bp03.png",
        alt: "slider3",
        Bpproduct: [
            {
                id: 9,
                title: "SOSO CAT&DOG",
                price: 115000,
                BPimage: "./images/main/bestproduct/BpProduct009.png"
            },
            {
                id: 10,
                title: "플라워 스티커 마니아 랩탑 케이스",
                price: 108000,
                BPimage: "./images/main/bestproduct/BpProduct010.png"
            },
            {
                id: 11,
                title: "Happiest KKOTKA in the world",
                price: 89000,
                BPimage: "./images/main/bestproduct/BpProduct011.png"
            },
            {
                id: 12,
                title: "Molecular Bubbles - Purple",
                price: 89000,
                BPimage: "./images/main/bestproduct/BpProduct012.png"
            }]
    },
    {
        src: "./images/main/bestproduct/BP/Bp01.png", alt: "slider4",
        Bpproduct: [
            {
                id: 13,
                title: "Yoo Youngkuk Work 1940 SUITCASE",
                price: 837000,
                BPimage: "./images/main/bestproduct/BpProduct013.png"
            },
            ,
            {
                id: 14,
                title: "멀티 플라워 (레드) 바운스 캐빈",
                price: 888000,
                BPimage: "./images/main/bestproduct/BpProduct014.png"
            },
            {
                id: 15,
                title: "카이카이와 키키 - 하나미(글로시 프림로즈 핑크) 바운스 캐빈",
                price: 888000,
                BPimage: "./images/main/bestproduct/BpProduct015.png"
            },
            {
                id: 16,
                title: "스마일 (블랙) 바운스 캐빈",
                price: 888000,
                BPimage: "./images/main/bestproduct/BpProduct016.png"
            }]
    }
];

// 배열 구조분해
const [slide1, slide2, slide3, slide4] = BPmain;


export default function BestProduct() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className='bp-wrap'>
            <div className="inner">
                <FadeInSection direction="up" delay={0.2}>
                    <SectionTitle
                        title="Best Product"
                        subtitle="지금 케이스티파이에서 가장핫한 제품" />
                </FadeInSection>
                <div className="all">
                    <div className="left">
                        <SlideInSection direction="left" delay={0.4}>
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
                                <SwiperSlide>
                                    <img src={slide3.src} alt={slide3.alt} />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={slide4.src} alt={slide4.alt} />
                                </SwiperSlide>
                            </Swiper>
                        </SlideInSection>
                    </div>
                    {/* <div className="right"> */}
                        <SlideInSection className="right" direction="right" delay={0.4}>
                            <ul >
                                {BPmain[activeIndex]?.Bpproduct.map((item) => ( 

                                    <li key={item.id}>
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
                        </SlideInSection>
                    {/* </div> */}
                </div>
            </div >
        </section>
    )
}