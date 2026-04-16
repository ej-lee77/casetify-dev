import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./scss/productwrap.scss";



import { items, deviceColorOptions, brandDeviceOptions } from "../../../data/ysData";


export default function ProductDetailPage() {
  const { id } = useParams();

  const product = useMemo(() => items.find((v) => v.id === id), [id]);

  const fallbackImage = "/no-image.png";

  if (!product) {
    return <div className="no-product">상품을 찾을 수 없습니다.</div>;
  }

  const initialDeviceColors = deviceColorOptions[product.deviceKey] || [];

  const [selectedModel, setSelectedModel] = useState(product.selectedDevice);
  const [selectedColor, setSelectedColor] = useState(product.mainCaseColor);
  const [selectedDeviceColor, setSelectedDeviceColor] = useState(initialDeviceColors[0]);
  const [isOpen, setIsOpen] = useState(false);

  const availableDevices = brandDeviceOptions[product.deviceBrand] || [];

  const deviceColorMap = {
    Silver: "#C0C0C0",
    "Cosmic-Orange": "#ff7a00",
    "Deep-Blue": "#1f3b73",
    White: "#f5f5f5",
    Black: "#111",
    Pink: "#f58bb6",
    Lavendar: "#c8b4ff",
    Sage: "#9CAF88",
    "Mist-Blue": "#a7c7e7",
    Natural: "#d6d1c4",
    Desert: "#c2a27c",
    Marine: "#1ca3ec",
    Teal: "#008080",
    Blue: "#4c8dff",
    Violet: "#7b61ff",
    Red: "#ff3b3b",
    Clear: "#e2e2e2",
  };

  // // 🔥 여기만 바뀜



  // const getImagePath = (num) => {
  //   // 실제 파일명 기준으로 강제 매칭
  //   const safeColor = product.caseColors.find(c => c === selectedColor) || selectedColor;

  //   return `/images/category/case/${product.id}_${safeColor}_${num}.jpg`;
  // };

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

  return (
    <div className="product-wrap">
      {/* LEFT */}
      <div className="left">
        <div className="img-color-bar">
          <div className="now-color">
            {selectedDeviceColor && (
              <>

                <span
                  className="color-chip"
                  style={{
                    backgroundColor:
                      deviceColorMap[selectedDeviceColor.key] || "#ddd",
                  }}
                />
                <span className="color-label">
                  {selectedDeviceColor.label}
                </span>
              </>
            )}
          </div>

          <div className="another-color">
            <ul>
              {initialDeviceColors.map((c) => (
                <li key={c.key} onClick={() => setSelectedDeviceColor(c)}>
                  <span
                    className={`color-chip ${selectedDeviceColor?.key === c.key ? "active" : ""
                      }`}
                    style={{
                      backgroundColor: deviceColorMap[c.key] || "#ddd",
                    }}
                  />
                  <span className="color-label">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product-img">
          <div className="product-main-img">

            <img
              src="/images/category/case/CTF-37498812-16008462_Classic Blue_1.jpg"
              alt=""
            />
          </div>

          <div className="product-sub-img">
            <ul>

              <li>
                <img
                  src="/images/category/case/CTF-37498812-16008462_Classic Blue_1.jpg"
                  alt=""
                />
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT (건드린거 없음) */}
      <div className="right">
        <div className="badge-area">
          {product.badge?.map((b, i) => (
            <span key={i} className="free-delivery">
              {b}
            </span>
          ))}
          {product.isBest && <span className="best-badge">BEST</span>}
        </div>

        <h2 className="product-title">{product.productName}</h2>
        <p className="product-price">
          {product.price.toLocaleString()}원
        </p>
        <div className="product-id">{product.id}</div>

        <hr />

        <div className="model-section">
          <p className="label">기종</p>

          <div className="accordion-container">
            <div
              className={`accordion-header ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="selected-text">{selectedModel}</span>
              <span className="arrow-icon">{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <ul className="model-list">
                {availableDevices.map((model, index) => (
                  <li
                    key={index}
                    className={`model-item ${selectedModel === model ? "selected" : ""
                      }`}
                    onClick={() => handleModelChange(model)}
                  >
                    {model}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="product-color">
          <p className="label">케이스 컬러</p>

          <ul className="color-list">
            {product.caseColors.map((color, i) => (
              <li
                key={i}
                onClick={() => setSelectedColor(color)}
                className={selectedColor === color ? "selected" : ""}
              >
                {color}
              </li>
            ))}
          </ul>
        </div>

        <button className="btn-cart">장바구니 담기</button>
      </div>

    </div>

  );
}