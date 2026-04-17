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

const tempRecoItem = [
  {
    id: "CTF-34942803-16006188",
    badge: [
      "무료 배송"
    ],
    price: "127000",
    productName: "Enjoy Where I Am",
    caseCategory: "2-in-1 충전 스탠드",
    color: [
      "White"
    ],
    collabo: "By nothing here",
    mainCategory: "악세서리",
    subCategory: "충전기",
    miniCategory: "충전기",
    lastCategory: "charger",
    deviceCategory: ""
  },
  {
    id: "CTF-35069870-16009970",
    badge: [
      "무료 배송"
    ],
    price: "51000",
    productName: "Pearl Phone Charm - Classic Pearl",
    caseCategory: "",
    color: [
      "Classic Pearl (Silver)",
      "Pearly Heart",
      "Classic Pearl"
    ],
    collabo: "",
    mainCategory: "악세서리",
    subCategory: "스트랩",
    miniCategory: "스트랩",
    lastCategory: "strap",
    deviceCategory: ""
  },
  {
    id: "CTF-37181334-16010330",
    badge: [],
    price: "45000",
    productName: "Black Sakura Bloom",
    caseCategory: "데스크 매트",
    color: [
      "White"
    ],
    collabo: "",
    mainCategory: "악세서리",
    subCategory: "기타",
    miniCategory: "기타",
    lastCategory: "etc",
    deviceCategory: ""
  },
  {
    id: "CTF-34735868-16010810",
    badge: [],
    price: "45000",
    productName: "Snappy Grip Holder Customizer",
    caseCategory: "",
    color: [
      "Pink",
      "Glitter Black",
      "Clear",
      "Matte Black",
      "Soft Blue"
    ],
    collabo: "",
    mainCategory: "악세서리",
    subCategory: "맥세이프",
    miniCategory: "맥세이프",
    lastCategory: "magsafe",
    deviceCategory: ""
  },
]

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
                <img src="./images/cart/bank-card.svg" alt="주문/결제" />
              </div>
              <p>주문/결제</p>
            </li>
            <li className="payment-progress-item">
              <div className="icon-box">
                <img src="./images/cart/order_completed.svg" alt="장바구니" />
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
                <label>
                  <input type="checkbox" />
                </label>
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
                  <label>
                    <input type="checkbox" />
                  </label>
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
                <p className="est-price">결제예정금액<span>₩ {Number("100000").toLocaleString()}</span></p>
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
          <h3>추천 상품</h3>
          {/* 추천 상품 목록 */}
          <ul className="recommend-item-list">
            {tempRecoItem.map((item) => (
              <li key={item.id} className="recommend-item">
                <div className="goods-img">
                  <img
                    src={`/images/category/accessory/${item.id}_${item.color[0]}_0.jpg`}
                    alt={item.productName} />
                </div>
                <div className="goods-text">
                  <p className="item-name">{item.productName}</p>
                  <p className="item-price">₩ {Number(item.price).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
