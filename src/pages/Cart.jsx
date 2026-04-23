import React, { useEffect, useState } from 'react'
import "./scss/Cart.scss"
import { useAuthStore } from '../store/useAuthStore';

import { modelColorOptions, colorMap, phoneModelOptions } from '../data/finalData';
import CartOption from '../components/sub/CartOption';

// 임시
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
  const {user, cart, onFetchCart, onRemoveSelected, onClearCart, updateQuantity} = useAuthStore();
  const [cartItemList, setCartItemList] = useState([]);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 체크박스 선택 확인
  const [chekedItems, setCheckedItems] = useState([]);
  // 체크박스 실행 메서드
  const handleChecked = (item) => {
    // console.log(item);
    const key = `${item.productId}-${item.deviceKey}-${item.color}`;
    setCheckedItems((prev) =>
      prev.includes(key) ? prev.filter((v) => v !== key) : [...prev, key])
  }
  // 전체 체크 메서드
  const handleAllChecked = (e) => {
    if (e.target.checked) {
      const allKeys = cartItemList.map((item) => `${item.productId}-${item.deviceKey}-${item.color}`)
      setCheckedItems(allKeys)
    } else { setCheckedItems([]) }
  }
  
  // 장바구니 정보 가져오기
  useEffect(()=>{ 
      if (!user) return;
      onFetchCart();
      setCartItemList(cart);
  }, [user, cart]);
  // 선택 제품
  const selectedItems = cartItemList.filter((item) =>
    chekedItems.includes(`${item.productId}-${item.deviceKey}-${item.color}`))
  // 선택 제품 총가격 
  const selectedTotal = selectedItems.reduce((acc, cur) =>
    acc + cur.price * cur.quantity, 0);

  // 할인 로직 더 
  const discount = selectedTotal * 0.1;
  // 배송비 기본 9000원
  const [shipping, setShipping] = useState(9000);
  useEffect(()=>{ 
    if(selectedTotal - discount > 50000){
      setShipping(0);
    }else{
      setShipping(9000)
    }
  }, [selectedTotal, discount]);

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
                    checked={chekedItems.length === cartItemList.length}
                    onChange={handleAllChecked} />
                  <span className={`checkbox-icon ${chekedItems.length === cartItemList.length ? "on" : "off"}`}></span>
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
              {cartItemList.map((item, id) => (
                <li key={`${item.productId}-${item.deviceKey}-${item.color}`} className="cart-item">
                  <label className="checkbox-label">
                    <input type="checkbox"
                      checked={chekedItems.includes(`${item.productId}-${item.deviceKey}-${item.color}`)}
                      onChange={() => handleChecked(item)} />
                    <span className={`checkbox-icon ${chekedItems.includes(`${item.productId}-${item.deviceKey}-${item.color}`) ? "on" : "off"}`}></span>
                  </label>
                  <div className="cart-card-wrap">
                    <div className="cart-goods-info">
                      <div className="goods-img">
                        <img
                          src={`/images/category/products/${item.productId}_${item.imgUrl}_main.jpg`}
                          alt={item.title} />
                      </div>
                      <div className="goods-text">
                        <p className="title">{item.title}</p>
                        <div className="goods-detail-product">
                          <p>{item.device}</p>
                          <p>{item.color}</p>
                        </div>
                        <button onClick={() => setEditingItem(item)}>옵션변경</button>
                      </div>
                    </div>
                    <div className="cart-goods-count-price">
                      <div className="cart-count-ctrl">
                        <button onClick={()=>updateQuantity(id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={()=>updateQuantity(id, 1)}>+</button>
                      </div>
                      <p className="price"><span>{Number(item.price).toLocaleString()}원</span></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {editingItem && (
              <CartOption item={editingItem} colorMap={colorMap} phoneModelOptions={phoneModelOptions} onClose={() => setEditingItem(null)}/>
            )}
            {/* 체크박스 취소 버튼 */}
            <div className="cart-cancel-btn-wrap">
              <button onClick={()=>onRemoveSelected(selectedItems)}>선택 상품 삭제</button>
              <button onClick={()=>onClearCart()}>전체 상품 삭제</button>
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
                <p className="price-sum">총 금액<span>{selectedTotal}원</span></p>
                <p className="price-discount">할인 금액<span>{discount === 0 ? 0 : -discount}원</span></p>
                <p className="price-delevery">배송비<span>{shipping === 0 ? "무료" : `${shipping}원`}</span></p>
              </div>
              <div className="price-total">
                <p className="free-info">50,000원 이상 배송비 무료</p>
                <p className="est-price">결제예정금액<span>{selectedTotal - discount <= 50000 ? selectedTotal - discount + 7000 : selectedTotal - discount}원</span></p>
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
