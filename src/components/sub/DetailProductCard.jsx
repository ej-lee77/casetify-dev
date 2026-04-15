import React from 'react'
import "./scss/DetailProductCard.scss"

const colorMap = {
  Black: "#111111",
  Orange: "#ff8a00",
  Pink: "#f58bb6",
  "Soft Blue": "#a9c9ff",
  "Matte Black": "#2b2b2b",
  Frost: "#dfe7ef",
  Silver: "#c0c0c0",
  Multicolor: "linear-gradient(135deg, #ff7a7a, #ffd36e, #7ed6ff, #c79bff)",
  "Matte Charcoal": "#4a4a4a",
  "Matte Dusty Rose": "#c78f96",
  "Matte Taupe": "#9b8b7a",
  "Matte Deep Purple": "#5f4b8b",
  "Glossy Primrose Pink": "#ff8fb1",
  "Cobalt Blue": "#2457d6",
  "Cherry Red": "#c91f37",
};

export default function DetailProductCard({ item }) {
  const colors = Array.isArray(item.color) ? item.color : [];
  const visibleColors = colors.slice(0, 5);
  const extraCount = colors.length - visibleColors.length;

  return (
    <div className="product-card">
      {/* 이미지 */}
      <div className="card-img">
        <img
          src={`/images/category/case/${item.id}_${colors[0]}_0.jpg`}
          alt={item.productName}
        />
      </div>

      {/* 정보 */}
      <div className="card-info">
        <p className="card-name">{item.productName}</p>
        <p className="card-price">
          {Number(item.price).toLocaleString()}원
        </p>

        {!!colors.length && (
          <div className="card-colors">
            {visibleColors.map((color) => {
              const bg = colorMap[color] || "#ddd";
              const isGradient = bg.startsWith("linear-gradient");

              return (
                <span
                  key={color}
                  className="color-chip"
                  title={color}
                  style={
                    isGradient
                      ? { backgroundImage: bg }
                      : { backgroundColor: bg }
                  }
                />
              );
            })}

            {extraCount > 0 && (
              <span className="color-more">+{extraCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}