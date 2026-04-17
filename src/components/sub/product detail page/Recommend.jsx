import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./scss/recomand.scss"

import { accessoryData } from "../../../data/accessoryData";

export default function Recommend() {
    const items = accessoryData.slice(0, 8);

    return (
        <div className="recommend-list">
            <h3 className="title">추천 번들 상품</h3>

            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                grabCursor={true}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="card">
                            {/* <img
                                src={`/images/category/${item.lastCategory}/${item.id}_1.jpg`}
                                alt={item.productName}
                                onError={(e) => {
                                    e.target.src = "/no-image.png";
                                }}
                            /> */}

                            <p className="name">{item.productName}</p>
                            <p className="price">
                                ₩{Number(item.price).toLocaleString()}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}