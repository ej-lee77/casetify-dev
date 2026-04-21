import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./scss/recomand.scss";

import { items as allItems } from "../../../data/finalData";

export default function Recommend({ item }) {
    if (!item) return null;

    // 같은 카테고리 or 같은 타겟 기준 추천
    const recommendedItems = allItems
        .filter((p) =>
            p.id !== item.id &&
            p.productTarget === item.productTarget
        )
        .slice(0, 8);

    return (
        <div className="recommend-list">
            <h3 className="title">추천 번들 상품</h3>

            <Swiper slidesPerView={5} spaceBetween={20} grabCursor={true}>
                {recommendedItems.map((p) => (
                    <SwiperSlide key={p.id}>
                        <div className="card">
                            <img
                                src={`/images/category/products/${p.id}_main.jpg`}
                                alt={p.productName}
                                onError={(e) => {
                                    e.target.src = "/no-image.png";
                                }}
                            />

                            <p className="name">{p.productName}</p>

                            <p className="price">
                                ₩{Number(p.price).toLocaleString()}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}