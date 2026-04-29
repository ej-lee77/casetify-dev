import React from 'react'
import Benefit from '../../Benefit'
import "./scss/detail.scss"

const detailImages = {
    phone: [
        "/images/KY/productdetail/detail/case-detail.png",
    ],
    earbuds: [                          // ← "earphone" → "earbuds"
        "/images/KY/productdetail/detail/earphone-detail.png",
    ],
    laptop: [
        "/images/KY/productdetail/detail/laptop-detail.png",
    ],
    tablet: [                           // ← "ipad" → "tablet"
        "/images/KY/productdetail/detail/ipad-detail.png",
    ],
    etc: [
        "/images/KY/productdetail/detail/etc-detail.png",
    ],
    travel: [
        "/images/KY/productdetail/detail/travel-detail.png",
    ],
    watch: [
        "/images/KY/productdetail/detail/watch-detail.png",
    ],
}

export default function Detail({ item }) {
    const target = item?.productTarget || "phone"
    const images = detailImages[target] || detailImages["phone"]

    return (
        <div className="detail">
            <div className="img-box">
                {images.map((src, idx) => (
                    <img key={idx} src={src} alt={`상세이미지 ${idx + 1}`} />
                ))}
            </div>
            <Benefit />
        </div>
    )
}