import React, { useEffect, useState } from 'react'
import "./scss/Cart.scss"
import { useAuthStore } from '../store/useAuthStore';

export default function Payment() {
  const {user, cart, onFetchCart, onRemoveSelected, onClearCart, updateQuantity} = useAuthStore();
  const [cartItemList, setCartItemList] = useState([]);
  
  // 장바구니 정보 가져오기
  useEffect(()=>{ 
      if (!user) return;
      onFetchCart();
  }, [user]);

  // 선택 제품
  // const selectedItems = cart.filter((item) =>
  //   chekedItems.includes(`${item.productId}-${item.deviceKey}-${item.color}`))
  const selectedItems = cart;
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
          <h2 className="title">주문/결제</h2>
          {/* 결제 과정 */}
          <ul className="payment-progress-wrap">
            <li className="payment-progress-item">
              <div className="icon-box">
                <img src="./images/cart/cart-bag.svg" alt="장바구니" />
              </div>
              <p>장바구니</p>
            </li>
            <li className="payment-progress-item active">
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
                <p>주문 상품정보</p>
              </div>
            </div>
            {/* 장바구니 제품 목록 */}
            <ul className="cart-item-list">
              {cart.map((item, id) => (
                <li key={`${item.productId}-${item.deviceKey}-${item.color}`} className="cart-item">
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
          </div>
          {/* 우측 - 주문 컨트롤 */}
          <div className="payment-ctrl-area">
            {/* 장바구니 제목 */}
            <div className="cart-title">
              <p>주문 금액</p>
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
      </div>
    </div>
  )
}
