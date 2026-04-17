import React from 'react';
import "./scss/detailProductCard.scss";
import { deviceColorOptions } from "../../data/ysData";
import { Link } from 'react-router-dom';

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
  if (!item) return null;

  const colors = Array.isArray(item.caseColors) ? item.caseColors : [];
  const deviceColors = deviceColorOptions[item.deviceKey] || [];
  const deviceColorKey = deviceColors[0]?.key || "Black";
  const visibleColors = colors.slice(0, 5);
  const extraCount = colors.length - visibleColors.length;
  const imagePath = `/images/category/products/${item.id}_${item.deviceKey}_${deviceColorKey}_${item.mainCaseColor}_main.jpg`;

  return (
    <li className="product-card">
      <div className="card-img">
        <img
          src={imagePath}
          alt={item.productName}
        />
      </div>
      <div className="card-info">
        <p className="card-name">{item.productName}</p>
        <p className="card-selectedDevice">{item.selectedDevice}</p>
        <p className="card-category">{item.caseCategory}</p>
        <p className="card-price">
          {Number(item.price || 0).toLocaleString()}원
        </p>


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