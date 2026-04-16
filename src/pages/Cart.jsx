import React from 'react'
import "./scss/Cart.scss"

export default function Cart() {
  return (
    <div className="sub-page-wrap cart-wrap">
      {/* 페이지 상단 제목 */}
      <div className="inner">
        {/* 상단 제목, 결제 과정 표시 영역 */}
        <div className="title-wrap">
          {/* 제목 */}
          <h2 className="title">장바구니</h2>
          {/* 결제 과정 */}
          <ul className="payment-progress-wrap">
            <li className="payment-progress-item active">
              <div className="icon-box">
                <img src="./images/icon/cart_white.svg" alt="장바구니" />
              </div>
              <p>장바구니</p>
            </li>
            <li className="payment-progress-item">
              <div className="icon-box">
                <img src="./images/icon/cart.svg" alt="장바구니" />
              </div>
              <p>주문/결제</p>
            </li>
            <li className="payment-progress-item">
              <div className="icon-box">
                <img src="./images/icon/cart.svg" alt="장바구니" />
              </div>
              <p>주문완료</p>
            </li>
          </ul>
        </div>
        {/* 장바구니 상품 리스트 영역 */}
        <div className="cart-wrap">
          <div className="cart-list-area">
            <div className="cart-title">
              <input type="checkbox" />
              <p>상품정보</p>
              <p>수량</p>
              <p>가격</p>
            </div>
            장바구니 리스트
          </div>
          <div className="payment-ctrl-area">
            <div className="cart-title">
              <p>주문 예상 금액</p>
            </div>
            금액영역(주문금액,상품주문 버튼)
          </div>
        </div>
        {/* 추천상품 */}
        <div className="recommend-wrap">
          추천상품
        </div>
      </div>
    </div>
  )
}
