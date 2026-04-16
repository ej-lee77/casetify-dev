import React from 'react'
import "./scss/Cart.scss"

export default function Cart() {
  return (
    <div className="sub-page-wrap">
      {/* 페이지 상단 제목 */}
      <div className="inner">
        <div className="title-wrap">
          <h2 className="title">장바구니</h2>
        </div>
        <ul className="payment-progress-wrap">
          <li className="payment-progress-item">
            <div className="icon-box">
              <img src="./images/icon/cart.svg" alt="장바구니" />
            </div>
            <p>장바구니</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
