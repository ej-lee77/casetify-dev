import React from 'react'

export default function DetailProductCard({ item }) {
  return (
    <div className="product-card">
      {/* 이미지 */}
      <div className="card-img">
        <img src={`/images/category/case/${item.id}_${item.color[0]}_0.jpg`} alt={item.productName} />
      </div>

      {/* 정보 */}
      <div className="card-info">
        <p className="card-name">{item.productName}</p>
        <p className="card-price">
          {Number(item.price).toLocaleString()}원
        </p>
      </div>
    </div>
  )
}
