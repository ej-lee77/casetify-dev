import React from 'react'
import "./scss/Cart.scss"

// 임시 배열
const tempItem = [
  {
    id: "CTF-28302256-16009387",
    badge: [
      "무료 배송"
    ],
    price: "89000",
    productName: "Punny Orange&Berry",
    caseCategory: "맥세이프 호환 임팩트 케이스",
    color: [
      "Black",
      "Orange",
      "Pink",
      "Soft Blue",
      "Matte Black"
    ],
    collabo: "By Number D",
    mainCategory: "케이스",
    subCategory: "디바이스",
    miniCategory: "핸드폰",
    lastCategory: [
      "iPhone 17 Pro"
    ],
    deviceCategory: {
      Apple: [
        "아이폰 17 Pro",
        "아이폰 17",
        "아이폰 16 Pro",
        "아이폰 16",
        "아이폰 15 Pro",
        "아이폰 15"
      ],
      Samsung: [
        "갤럭시 S26",
        "갤럭시 S26+",
        "갤럭시 Z 폴드7",
        "갤럭시 Z 플립7",
        "갤럭시 S25",
        "갤럭시 S25+",
        "갤럭시 Z 폴드6",
        "갤럭시 Z 플립6"
      ],
      Google: [
        "Pixel 10 Pro",
        "Pixel 10",
        "Pixel 9 Pro",
        "Pixel 9"
      ]
    }
  },
  {
    id: "CTF-30073724-16009386",
    badge: [
      "무료 배송"
    ],
    price: "89000",
    productName: "Cheek-to-cheek",
    caseCategory: "맥세이프 호환 임팩트 케이스",
    color: [
      "Black",
      "Orange",
      "Pink",
      "Soft Blue"
    ],
    collabo: "By matsui",
    mainCategory: "케이스",
    subCategory: "디바이스",
    miniCategory: "핸드폰",
    lastCategory: [
      "iPhone 17 Pro"
    ],
    deviceCategory: {
      Apple: [
        "아이폰 17 Pro",
        "아이폰 17",
        "아이폰 16 Pro",
        "아이폰 16",
        "아이폰 15 Pro",
        "아이폰 15"
      ],
      Samsung: [
        "갤럭시 S26",
        "갤럭시 S26+",
        "갤럭시 Z 폴드7",
        "갤럭시 Z 플립7",
        "갤럭시 S25",
        "갤럭시 S25+",
        "갤럭시 Z 폴드6",
        "갤럭시 Z 플립6"
      ],
      Google: [
        "Pixel 10 Pro",
        "Pixel 10",
        "Pixel 9 Pro",
        "Pixel 9"
      ]
    }
  },
];

export default function Cart() {
  return (
    <div className="sub-page-wrap cart-page-wrap">
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
        <div className="cart-list-wrap">
          {/* 좌측 - 장바구니 목록 */}
          <div className="cart-list-area">
            {/* 장바구니 제목 */}
            <div className="cart-title">
              <div className="cart-title-left">
                <input type="checkbox" />
                <p>상품정보</p>
              </div>
              <div className="cart-title-right">
                <p>수량</p>
                <p>가격</p>
              </div>
            </div>
            {/* 장바구니 제품 목록 */}
            <ul className="cart-item-list">
              {tempItem.map((item) => (
                <li key={item.id} className="cart-item">
                  <input type="checkbox" />
                  <div className="cart-card-wrap">
                    <div className="cart-goods-info">
                      <div className="goods-img">
                        <img
                          src={`/images/category/case/${item.id}_${item.color[0]}_0.jpg`}
                          alt={item.productName} />
                      </div>
                      <div className="goods-text">
                        <p className="title">{item.productName}</p>
                        <div className="goods-detail-product">
                          <p>{item.lastCategory}</p>
                          <p>{item.caseCategory}</p>
                          <p>{item.color[0]}</p>
                        </div>
                        <button>옵션변경</button>
                      </div>
                    </div>
                    <div className="cart-goods-count-price">
                      <div className="cart-count-ctrl">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                      <p className="price">₩ <span>{Number(item.price).toLocaleString()}</span></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* 체크박스 취소 버튼 */}
            <div className="cart-cancel-btn-wrap">
              <button>선택 상품 삭제</button>
              <button>전체 상품 삭제</button>
            </div>
          </div>
          {/* 우측 - 주문 컨트롤 */}
          <div className="payment-ctrl-area">
            {/* 장바구니 제목 */}
            <div className="cart-title">
              <p>주문 예상 금액</p>
            </div>
            <div className="price-info-wrap">
              {/* 총 금액 */}
              <div className="price-detail">
                <p className="price-sum">총 금액<span>₩ {Number("100000").toLocaleString()}</span></p>
                <p className="price-discount">할인 금액<span>- ₩ {Number("100000").toLocaleString()}</span></p>
                <p className="price-delevery">배송비<span>₩ {Number("100000").toLocaleString()}</span></p>
              </div>
              <div className="price-total">
                <p className="free-info">₩ 50,000원 이상 배송비 무료</p>
                <p className="est-price"><span>결제예정금액</span><span>₩ {Number("100000").toLocaleString()}</span></p>
              </div>
            </div>
            {/* 주문 버튼 */}
            <ul className="order-btn-wrap">
              <li><button className="order-all">전체 상품 주문</button></li>
              <li><button>선택 상품 주문</button></li>
            </ul>
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
