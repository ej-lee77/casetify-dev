import React, { useEffect, useState } from 'react'
import "./scss/Cart.scss"
import { useAuthStore } from '../store/useAuthStore';

// 임시 배열
const tempItem = [
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
    { id: "CTF-29455151-16009386", title: "Love the Freedom KKOTKA", price: 108000, device: "iphone17pro", color: "Black", imgUrl: "Deep-Blue_Black"},
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
  // 체크박스 선택 확인
  const [chekedItems, setCheckedItems] = useState([]);
  // 체크박스 실행 메서드
  const handleChecked = (item) => {
    console.log(item);
    const key = item.id;
    setCheckedItems((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key])
  }
  // 전체 체크 메서드
  const handleAllChecked = (e) => {
    if (e.target.checked) {
      const allKeys = tempItem.map((item) => item.id)
      setCheckedItems(allKeys)
    } else { setCheckedItems([]) }
  }

  const {user, cartlist, onFetchCartList} = useAuthStore();
  const [cartItemList, setCartItemList] = useState([]);
  
  useEffect(()=>{ 
      if (!user) return;
      onFetchCartList();
      // setCartItemList(wishlist);
      setCartItemList(tempItem);
  }, [user, cartlist]);

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
                <img src="./images/cart/cart-bag.svg" alt="장바구니" />
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
                <label className="checkbox-label">
                  <input type="checkbox"
                    checked={chekedItems.length === tempItem.length}
                    onChange={handleAllChecked} />
                  <span className={`checkbox-icon ${chekedItems.length === tempItem.length ? "on" : "off"}`}></span>
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
              {cartItemList.map((item) => (
                <li key={item.id} className="cart-item">
                  <label className="checkbox-label">
                    <input type="checkbox"
                      checked={chekedItems.includes(item.id)}
                      onChange={() => handleChecked(item)} />
                    <span className={`checkbox-icon ${chekedItems.includes(item.id) ? "on" : "off"}`}></span>
                  </label>
                  <div className="cart-card-wrap">
                    <div className="cart-goods-info">
                      <div className="goods-img">
                        <img
                          src={`/images/category/products/${item.id}_${item.device}_${item.imgUrl}_main.jpg`}
                          alt={item.title} />
                      </div>
                      <div className="goods-text">
                        <p className="title">{item.title}</p>
                        <div className="goods-detail-product">
                          <p>{item.device}</p>
                          <p>{item.color}</p>
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
                      <p className="price"><span>{Number(item.price).toLocaleString()}원</span></p>
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
                <p className="price-sum">총 금액<span>{Number("100000").toLocaleString()}원</span></p>
                <p className="price-discount">할인 금액<span>-{Number("100000").toLocaleString()}원</span></p>
                <p className="price-delevery">배송비<span>{Number("100000").toLocaleString()}원</span></p>
              </div>
              <div className="price-total">
                <p className="free-info">50,000원 이상 배송비 무료</p>
                <p className="est-price">결제예정금액<span>{Number("100000").toLocaleString()}원</span></p>
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
                  <p className="item-price">{Number(item.price).toLocaleString()}원</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
