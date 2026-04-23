import React, { useEffect, useState } from 'react'
import "./scss/Payment.scss"
import { useAuthStore } from '../store/useAuthStore';
import AddressSearch from '../components/sub/AddressSearch'

const memoList = [
  "부재 시 문 앞에 놓아주세요",
  "배송 전 미리 연락 바랍니다",
  "벨을 누르지 말고 문자로 남겨주세요"
];

export default function Payment() {
  const {user, cart, onFetchCart, onRemoveSelected, onClearCart, updateQuantity} = useAuthStore();
  const [cartItemList, setCartItemList] = useState([]);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState('배송 메모를 선택해주세요');

  const [formData, setFormData] = useState({
    username: user.name,
    phone: user.phone,
    zonecode: user.zonecode,
    address: user.address,
    detailaddress: user.detailaddress
  });

  const [touched, setTouched] = useState({
      username: false, 
      phone: false
  });

  const [joinErr, setJoinErr] = useState("");
  const [joinAllErr, setJoinAllErr] = useState({
      username: "",
      phone: "",
      zonecode: "",
      address: "",
      detailaddress: ""
  });

  // 각각 입력한 input요소를 name속성으로 찾아서 값 변경시키기
  const handleChange = (e)=>{
      const {name, value} = e.target;
      // console.log(name, value);
      setFormData({...formData, [name]:value});

      // 검증 결과 업데이트
      const error = validate(name, value);
      setJoinAllErr(prev => ({ ...prev, [name]: error }));
  }

  const handleBlur = (e) => {
      // 입력창에서 나가는 순간, 해당 필드를 '터치'한 것으로 간주
      setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const setAddressData = (data) => {
    setFormData((prev) => ({
    ...prev,
    zonecode: data.zonecode,
    address: data.address,
    }));
  };

  // 실시간 검증 로직
  const validate = (name, value) => {
      let error = '';
      if (name === 'username') {
          if (!value || value.trim() === '') error = '필수 입력 항목입니다.';
      }
      if (name === 'email'){
          if(!value.includes('@') || !value || value.trim() === '') error = '이메일 형식이 올바르지 않습니다.';
      }
      if (name === 'phone'){
          const numberRegex = /^[0-9]+$/;
          if(!numberRegex.test(value) || value.includes('-') || !value || value.trim() === '') error = '-없이 숫자만 입력해주세요.';
      }
      if (name === 'password') {
          const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
          if (!passwordRegex.test(value) || !value || value.trim() === '') error = '영문, 숫자를 포함한 6~12자로 입력해주세요.';
      }
      if (name === 'passwordcon'){
          if (formData.password !== value || !value || value.trim() === '') error = '비밀번호가 일치하지 않습니다.';
      }
      return error;
  };
  
  // 장바구니 정보 가져오기
  useEffect(()=>{ 
      if (!user) return;
      onFetchCart();

      setFormData({
        username: user.name || "",
        phone: user.phone || "",
        zonecode: user.zonecode || "",
        address: user.address || "",
        detailaddress: user.detailaddress || ""
      });
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
    <div className="sub-page-wrap pay-page-wrap">
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
            {/* 배송지 정보 */}
            <div className="cart-title">
              <div className="cart-title-left">
                <p>배송지 정보</p>
              </div>
            </div>
            <div className='gray-box'>
              <div className='user-info-wrap'>
                <div className='input-box'>
                    <div className='label-div'><label htmlFor='username'>수령인</label></div>
                    <div className='input-div'>
                        <input type="text" id='username' name='username' placeholder='수령인' value={formData.username} onBlur={handleBlur} onChange={handleChange}/>
                        <p className='err-box'>{touched.username && joinAllErr.username}</p>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='label-div'><label htmlFor='phone'>연락처</label></div>
                    <div className='input-div'>
                        <input type="text" id='phone' name='phone' placeholder='-없이 입력' value={formData.phone} onBlur={handleBlur} onChange={handleChange}/>
                        <p className='err-box'>{touched.phone && joinAllErr.phone}</p>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='label-div'><label htmlFor='detailaddress'>주소</label></div>
                    <div className='input-div address-box'>
                        <div className='zonecode-box'>
                            <input value={formData.zonecode} readOnly placeholder="우편번호" />
                            <AddressSearch setAddressData={setAddressData} />
                        </div>
                        <input value={formData.address} readOnly placeholder="기본주소" />
                        <input type="text" id='detailaddress' name='detailaddress' placeholder="상세주소" value={formData.detailaddress} onChange={handleChange}/>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='label-div'><label>배송 메모</label></div>
                    <div className='input-div'>
                        <div className='deli-memo' onClick={() => setIsMemoOpen(!isMemoOpen)}>
                          {selectedMemo}
                          <span className={`accordion-arrow ${isMemoOpen ? "open" : ""}`}>▼</span>
                        </div>
                        {isMemoOpen && (
                          <div>
                            {memoList.map((item, index) => (
                              <div 
                                key={index} 
                                onClick={() => {
                                  setSelectedMemo(item);
                                  setIsMemoOpen(false);
                                }}
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                </div>
              </div>
            </div>
            {/* 장바구니 */}
            <div className="cart-title">
              <div className="cart-title-left">
                <p>주문 상품정보</p>
              </div>
            </div>
            <div className='gray-box'>
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
                            <p>{item.quantity}개</p>
                          </div>
                        </div>
                      </div>
                      <div className="cart-goods-count-price">
                        <p className="price"><span>{Number(item.price).toLocaleString()}원</span></p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='cart-price'>소계 <span>{selectedTotal}원</span></div>
            </div>
            {/* 쿠폰/기프트 카드 */}
            <div className="cart-title">
              <div className="cart-title-left">
                <p>쿠폰/기프트 카드</p>
              </div>
            </div>
            <div className='gray-box'>
              <div className='coupon-wrap'>
                <div className='input-box'>
                  <div className='label-div'><label>쿠폰 선택</label></div>
                  <div className='input-div'>
                      <div className='deli-memo' onClick={() => setIsMemoOpen(!isMemoOpen)}>
                        {selectedMemo}
                        <span className={`accordion-arrow ${isMemoOpen ? "open" : ""}`}>▼</span>
                      </div>
                      {isMemoOpen && (
                        <div>
                          {memoList.map((item, index) => (
                            <div 
                              key={index} 
                              onClick={() => {
                                setSelectedMemo(item);
                                setIsMemoOpen(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
                <div className='input-box'>
                  <div className='label-div'><label>기프트 카드</label></div>
                  <div className='input-div'>
                      <div className='deli-memo' onClick={() => setIsMemoOpen(!isMemoOpen)}>
                        {selectedMemo}
                        <span className={`accordion-arrow ${isMemoOpen ? "open" : ""}`}>▼</span>
                      </div>
                      {isMemoOpen && (
                        <div>
                          {memoList.map((item, index) => (
                            <div 
                              key={index} 
                              onClick={() => {
                                setSelectedMemo(item);
                                setIsMemoOpen(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {/* 결제 수단 선택 */}
            <div className="cart-title">
              <div className="cart-title-left">
                <p>결제 수단 선택</p>
              </div>
            </div>
            <div className='gray-box payment-method-box'>
              <ul className="payment-method-list">
                <li>
                  <label>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card"
                    />
                    <span>신용/체크 카드</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="transfer" 
                    />
                    <span>무통장 입금</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="vbank" 
                    />
                    <span>가상계좌</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="mobile" 
                    />
                    <span>핸드폰 결제</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="kakaopay" 
                    />
                    <span>카카오페이</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="naverpay" 
                    />
                    <span>네이버페이</span>
                  </label>
                </li>
              </ul>
            </div>
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
                <p className="price-discount">쿠폰 할인<span>{discount === 0 ? 0 : -discount}원</span></p>
                <p className="price-discount">기프트 카드<span>{discount === 0 ? 0 : -discount}원</span></p> 
                <p className="price-delevery">배송비<span>{shipping === 0 ? "무료" : `${shipping}원`}</span></p>
              </div>
              <div className="price-total">
                <p className="free-info">50,000원 이상 배송비 무료</p>
                <p className="est-price">최종결제금액<span>{selectedTotal - discount <= 50000 ? selectedTotal - discount + 7000 : selectedTotal - discount}원</span></p>
              </div>
            </div>
            {/* 주문 버튼 */}
            <ul className="order-btn-wrap">
              <li><button className="order-all">결제하기</button></li>
            </ul>
            <div className='agree-div'>
              <p>주문을 완료함으로써,</p>
              <p><span>이용약관</span> 및 <span>개인정보 처리방침</span>에 동의합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
