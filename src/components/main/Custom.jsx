import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/scrollbar";
import "../scss/bestProduct.scss"
import "../scss/custom.scss"
import { Autoplay, Scrollbar } from 'swiper/modules'
import SectionTitle from '../SectionTitle';
import SlideInSection from '../SlideInSection';
import FadeInSection from '../FadeInSection';
import { Link } from 'react-router-dom';

const CUmain = [
    {
        src: "./images/main/custom/CU/custom1.png", alt: "slider1",
        Cuproduct: [
            { id: 1, title: "S26 포토 커스텀 케이스", price: 102000, CUimage: "/images/main/custom/CUProduct05.png" },
            { id: 2, title: "아이폰 텍스트 커스텀 케이스", price: 58000, CUimage: "/images/main/custom/CUProduct06.png" },
            { id: 3, title: "아이폰 스티커 커스텀 케이스", price: 83000, CUimage: "/images/main/custom/CUProduct07.png" },
            { id: 4, title: "태블릿 스티커 커스텀 케이스", price: 101000, CUimage: "/images/main/custom/CUProduct08.png" }
        ]
    },
    {
        src: "./images/main/custom/CU/custom2.png", alt: "slider2",
        Cuproduct: [
            { id: 5, title: "랩탑 케이스 커스터마이징", price: 89000, CUimage: "/images/main/custom/CUProduct09.png" },
            { id: 6, title: "울트라 바운스 케이스", price: 45000, CUimage: "/images/main/custom/CUProduct10.png" },
            { id: 7, title: "울트라 바운스 케이스", price: 51000, CUimage: "/images/main/custom/CUProduct11.png" },
            { id: 8, title: "아이폰 포토 커스터마이징", price: 83000, CUimage: "/images/main/custom/CUProduct12.png" }
        ]
    }
];

const [slide1, slide2] = CUmain;

export default function Custom() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollbarRef = useRef(null);

    return (
        <section className='custom-wrap bp-wrap'>
            <div className="inner">
                <div className="all">
                    <div className="left">
                        <Swiper
                            modules={[Autoplay, Scrollbar]}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            scrollbar={{ el: '.cu-scrollbar', draggable: true }}
                            loop={true}
                            onSlideChange={(swiper) => { setActiveIndex(swiper.realIndex); }}
                        >
                            <SwiperSlide><img src={slide1.src} alt={slide1.alt} /></SwiperSlide>
                            <SwiperSlide><img src={slide2.src} alt={slide2.alt} /></SwiperSlide>
                        </Swiper>
                        <div className="cu-scrollbar" ref={scrollbarRef} />
                    </div>
                    <div className="right">
                        <FadeInSection direction="up" delay={0.2}>
                            <SectionTitle title="Customize Your Case" subtitle="케이스티파이에서 나만의 케이스를 제작해보세요" />
                        </FadeInSection>
                        <SlideInSection direction="right" delay={0.4} className='w-100'>
                            <ul>
                                {CUmain[activeIndex]?.Cuproduct.map((item) => (
                                    <li key={item.id}>
                                        <Link to="/custom">
                                            <div>
                                                <img src={item.CUimage} alt="" />
                                            </div>
                                            <div>
                                                <p className='name'>{item.title}</p>
                                                <p className='price'>{item.price.toLocaleString()}원</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <button><Link to="/custom">커스텀하기</Link></button>
                        </SlideInSection>
                    </div>
                </div>
            </div>
        </section>
    )
}