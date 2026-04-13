import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "../scss/custom.scss"
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import SectionTitle from '../SectionTitle';

const CUmain = [
    {
        src: "./images/main/section/custom/CU/custom1.png",
        alt: "slider1",
        Cuproduct: [
            {
                id: 1,
                title: "핸드폰 케이스 텍스트 커스터마이징",
                price: 102000,
                CUimage: "./images/main/section/custom/CUProduct05.png"
            },
            ,

            {
                id: 2,
                title: "이어폰 케이스 텍스트 커스터마이징",
                price: 58000,
                CUimage: "./images/main/section/custom/CUProduct06.png"
            },

            {
                id: 3,
                title: "노트북 케이스 텍스트 커스터마이징",
                price: 83000,
                CUimage: "./images/main/section/custom/CUProduct07.png"
            },


            {
                id: 4,
                title: "태블릿 케이스 텍스트 커스터마이징",
                price: 101000,
                CUimage: "./images/main/section/custom/CUProduct08.png"
            }]
    },
    {
        src: "./images/main/section/custom/CU/custom2.png",
        alt: "slider2",
        Cuproduct: [
            {
                id: 5,
                title: "핸드폰 케이스 포토 커스터마이징",
                price: 89000,
                CUimage: "./images/main/section/custom/CUProduct09.png"
            },
            ,

            {
                id: 6,
                title: "그립 스탠드 포토 커스터마이징",
                price: 45000,
                CUimage: "./images/main/section/custom/CUProduct10.png"
            },

            {
                id: 7,
                title: "카드홀더 스탠드 포토 커스터마이징",
                price: 51000,
                CUimage: "./images/main/section/custom/CUProduct11.png"
            },


            {
                id: 8,
                title: "노트북 케이스 포토 커스터마이징",
                price: 83000,
                CUimage: "./images/main/section/custom/CUProduct12.png"
            }]

    }

];

// 배열 구조분해
const [slide1, slide2] = CUmain;




export default function Custom() {
    const [activeIndex, setActiveIndex] = useState(0); // ✅ 초기값 추가

    return (<>


        <div className="inner">

            <div className="all">

                <div className="left">
                    <Swiper modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
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
                    </Swiper>
                </div>
                <div className="right">
                    <SectionTitle
                        title="Customize Your Case"
                        subtitle="케이스티파이에서 나만의 케이스를 제작해보세요" />

                    <ul >

                        {CUmain[activeIndex]?.Cuproduct.map((item) => ( // ✅ 안전 처리 + index 제거

                            <li key={item.id}> {/* ✅ key 수정 */}
                                <div>
                                    <img src={item.CUimage} alt="" />
                                </div>
                                <div>
                                    <p>{item.title}</p>
                                    <p> ₩{item.price}</p>
                                </div>

                            </li>

                        ))}


                    </ul>
                    <button>커스텀하기</button>
                </div>
            </div>
        </div ></>
    )
}