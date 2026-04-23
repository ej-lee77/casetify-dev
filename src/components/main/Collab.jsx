import React, { useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "../scss/Collab.scss";
import { items } from "../../data/finalData";

export default function Collab() {
    const slides = [
        {
            id: "CTF-37408746-16011285",
            colImg: "./images/main/collab/collab-prod1.png",
            themeImg: "./images/main/collab/collab-th1.png",
        },
        {
            id: "CTF-36428690-16010993",
            colImg: "./images/main/collab/collab-prod2.png",
            themeImg: "./images/main/collab/collab-th2.png",
        },
        {
            id: "CTF-35993212-16010877",
            colImg: "./images/main/collab/collab-prod3.png",
            themeImg: "./images/main/collab/collab-th3.png",
        },
        {
            id: "CTF-37499781-16011325",
            colImg: "./images/main/collab/collab-prod4.png",
            themeImg: "./images/main/collab/collab-th4.png",
        },
        {
            id: "CTF-36419745-16010991",
            colImg: "./images/main/collab/collab-prod5.png",
            themeImg: "./images/main/collab/collab-th5.png",
        },
        {
            id: "CTF-37898905-16011462",
            colImg: "./images/main/collab/collab-prod6.png",
            themeImg: "./images/main/collab/collab-th6.png",
        },
        {
            id: "CTF-36136601-16010921",
            colImg: "./images/main/collab/collab-prod7.png",
            themeImg: "./images/main/collab/collab-th7.png",
        },
        {
            id: "CTF-37473568-16011322",
            colImg: "./images/main/collab/collab-prod8.png",
            themeImg: "./images/main/collab/collab-th8.png",
        },
        {
            id: "CTF-34890170-16009687",
            colImg: "./images/main/collab/collab-prod9.png",
            themeImg: "./images/main/collab/collab-th9.png",
        },
        {
            id: "CTF-37354478-16011267",
            colImg: "./images/main/collab/collab-prod10.png",
            themeImg: "./images/main/collab/collab-th10.png",
        },
        {
            id: "CTF-37880847-16011447",
            colImg: "./images/main/collab/collab-prod11.png",
            themeImg: "./images/main/collab/collab-th11.png",
        },
        {
            id: "CTF-35114497-16009996",
            colImg: "./images/main/collab/collab-prod12.png",
            themeImg: "./images/main/collab/collab-th12.png",
        },
    ];

    const swiperRef = useRef(null);

    const productMap = useMemo(() => {
        const map = {};
        items.forEach((item) => {
            map[String(item.id)] = item;
        });
        return map;
    }, []);

    return (
        <section className="collab-wrap">
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                slidesPerView={5}
                spaceBetween={30}
            >
                {slides.map((item) => {
                    const product = productMap[String(item.id)];

                    return (
                        <SwiperSlide key={item.id}>
                            <div
                                className="card"
                                onMouseEnter={() => swiperRef.current?.autoplay.stop()}
                                onMouseLeave={() => swiperRef.current?.autoplay.start()}
                            >
                                <Link to={`/detail/${item.id}`}>
                                    <div className="card-inner">
                                        <div className="card-brand">
                                            <img
                                                src={item.themeImg}
                                                alt={product?.productName || "collab brand"}
                                                className="theme-img"
                                            />
                                        </div>

                                        <div className="card-back">
                                            <div className="card-img">
                                                <img
                                                    src={item.colImg}
                                                    alt={product?.productName || "collab product"}
                                                />
                                            </div>

                                            <div className="card-content">
                                                <div>
                                                    <p>
                                                        {product?.productName || "상품명 없음"}
                                                    </p>
                                                    <p className="price">
                                                        {product?.price != null
                                                            ? `${Number(product.price).toLocaleString()}원`
                                                            : "가격 정보 없음"}
                                                    </p>
                                                </div>
                                            </div>

                                            <button type="button" className="more-btn">
                                                컬렉션 더보기 +
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
}