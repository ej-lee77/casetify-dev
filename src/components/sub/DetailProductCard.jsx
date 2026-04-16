import React from 'react';
import "./scss/detailProductCard.scss";

const colorMap = {
  Black: "#111111",
  Orange: "#ff8a00",
  Pink: "#f58bb6",
  Lavendar: "#c8b4ff",
  "Matte Black": "#2b2b2b",
  Clear: "#f1f1f1",
  Purple: "#7b61ff",
  Blue: "#4c8dff",
  Navy: "#1f3b73",
};

export default function DetailProductCard({ item }) {
  const colors = Array.isArray(item.caseColors) ? item.caseColors : [];
  const visibleColors = colors.slice(0, 5);
  const extraCount = colors.length - visibleColors.length;

  return (
    <li className="product-card">
      <div className="card-img placeholder">
        <span>{item.selectedDevice}</span>
      </div>

      <div className="card-info">
        <p className="card-artist">{item.artist}</p>
        <p className="card-name">{item.productName}</p>
        <p className="card-category">{item.caseCategory}</p>
        <p className="card-price">
          {Number(item.price || 0).toLocaleString()}원
        </p>

        <div className="card-meta">
          <span>추천순 {item.recommendRank ?? "-"}</span>
          <span>평점 {item.popularity ?? "-"}</span>
        </div>

        {!!colors.length && (
          <div className="card-colors">
            {visibleColors.map((color) => {
              const bg = colorMap[color] || "#ddd";

              return (
                <span
                  key={color}
                  className="color-chip"
                  title={color}
                  style={{ backgroundColor: bg }}
                />
              );
            })}

            {extraCount > 0 && (
              <span className="color-more">+{extraCount}</span>
            )}
          </div>
        )}
      </div>
    </li>
  );
}