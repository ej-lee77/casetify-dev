import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';

const methodMap = {
card: "신용/체크 카드",
transfer: "무통장 입금",
vbank: "가상계좌",
mobile: "핸드폰 결제",
kakaopay: "카카오페이",
naverpay: "네이버페이"
};

const STATUS_MAP = {
  1: { text: "취소중", className: "cancel-ing" },
  2: { text: "취소완료", className: "cancel-done" },
  3: { text: "교환/반품중", className: "return-ing" },
  4: { text: "교환/반품완료", className: "return-done" },
};

export default function OrderDetailModal({ order, onClose }) {
    // 데이터가 없을 경우 방어 코드
    if (!order) return null;

    // 배경 클릭 시 닫히게 하는 핸들러
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
        }
    };

    // 체크된 상품들
    const [checkedItems, setCheckedItems] = useState([]);

    // 체크박스 핸들러
    const handleCheck = (idx) => {
        if (checkedItems.includes(idx)) {
        setCheckedItems(checkedItems.filter(item => item !== idx));
        } else {
        setCheckedItems([...checkedItems, idx]);
        }
    };
    const onUpdateItemStatus = useAuthStore((state) => state.onUpdateItemStatus);

    const isCancelable = order.orderStatus === '배송준비중';

    const handleStatusChange = async () => {
        if (checkedItems.length === 0) {
            alert("상품을 선택해주세요.");
            return;
        }

        const confirmMsg = isCancelable 
        ? "선택한 상품을 취소하시겠습니까?" 
        : "선택한 상품의 반품/교환을 신청하시겠습니까?";

        if (window.confirm(confirmMsg)) {
            // 스토어 메서드 호출 (주문ID, 체크된 인덱스 배열, 취소가능여부)
            const success = await onUpdateItemStatus(order.orderId, checkedItems, isCancelable);
            
            if (success) {
                setCheckedItems([]); // 체크박스 초기화
                onClose(); 
            }
        }
    };  
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* 헤더: 타이틀 & 닫기 버튼 */}
        <div className="modal-header">
          <h2>주문정보 상세</h2>
          <button className="close-btn" onClick={onClose}>
            &times; {/* X 아이콘 */}
          </button>
        </div>

        {/* 바디: 상세 내용 */}
        <div className="modal-body">
          {/* 1. 배송 및 구매자 정보 */}
          <section className="info-section customer-info">
            <div className="info-row">
              <span className="label">주문날짜</span>
              <span className="value">{order.orderDate}</span>
            </div>
            <div className="info-row">
              <span className="label">주문번호</span>
              <span className="value">{order.orderId}</span>
            </div>
            <div className="info-row">
              <span className="label">받는 분</span>
              <span className="value">{order.deliveryInfo.username}</span>
            </div>
            <div className="info-row">
              <span className="label">연락처</span>
              <span className="value">{order.deliveryInfo.phone}</span>
            </div>
            <div className="info-row">
              <span className="label">주소</span>
              <span className="value">{order.deliveryInfo.zonecode + " " + order.deliveryInfo.address + order.deliveryInfo.detailaddress}</span>
            </div>
            <div className="info-row">
              <span className="label">배송 메모</span>
              <span className="value">{order.deliveryMemo || '없음'}</span>
            </div>
            <div className="info-row">
              <span className="label">주문 상태</span>
              <span className="value">{order.orderStatus}</span>
            </div>
          </section>

          {/* 2. 상품 리스트 영역 */}
          <section className="product-list-section">
            <div className="product-header">
              <div className="col-check">선택</div>
              <div className="col-name">상품명/옵션</div>
              <div className="col-price">가격/수량</div>
            </div>
            
            <div className="product-items">
              {order.orderItems.map((item, idx) => {
                const statusInfo = STATUS_MAP[item.status];
                return(
                <div className={`product-item ${item.status ? 'has-status' : ''}`} key={idx}>
                    <div className="col-check">
                        {statusInfo ? (
                        // 상태 코드가 (1,2,3,4) 있으면 텍스트 표시
                        <span className={`status-badge ${statusInfo.className}`}>
                            {statusInfo.text}
                        </span>
                        ) : (
                        // 상태 코드가 없거나 0이면 체크박스 표시
                        <input 
                            type="checkbox" 
                            checked={checkedItems.includes(idx)}
                            onChange={() => handleCheck(idx)}
                        />
                        )}
                    </div>
                    <div className="col-name item-info">
                        <img src={item.imgUrl} alt={item.title} />
                        <div className="item-txt">
                        <p className="title">{item.title}</p>
                        <p className="option">{item.device} / {item.color}</p>
                        </div>
                    </div>
                    <div className="col-price item-price-qty">
                        <p className="price">
                        {item.price.toLocaleString()}
                        {item.title.includes('OPANCHU') ? 'W' : '원'} {/* 이미지 맞춤 */}
                        </p>
                        <p className="qty">{item.quantity}개</p>
                    </div>
                </div>
              )})}
            </div>
          </section>

          {/* 3. 결제 및 금액 상세 */}
          <section className="info-section payment-info">
            <div className="info-row">
              <span className="label">결제방법</span>
              <span className="value">{methodMap[order.paymentMethod] || order.paymentMethod}</span>
            </div>
            <div className="info-row">
              <span className="label">쿠폰</span>
              <span className="value">{order.priceSummary.coupon ? order.priceSummary.coupon.title : '없음'}</span>
            </div>
            <div className="info-row">
              <span className="label">기프트카드</span>
              <span className="value">{order.priceSummary.giftCard ? `${order.priceSummary.giftCard.toLocaleString()}원` : '없음'}</span>
            </div>
            <div className="info-row">
              <span className="label">할인</span>
              <span className="value">
                {order.priceSummary.totalDiscount > 0 ? `-${order.priceSummary.totalDiscount.toLocaleString()}원` : '없음'}
              </span>
            </div>
            <div className="info-row total">
              <span className="label">총 금액</span>
              <span className="value final-price">{order.priceSummary.finalPayment.toLocaleString()}원</span>
            </div>
          </section>
             
          {checkedItems.length > 0 && (
            <div className="order-action-area">
              {isCancelable ? (
                <button className="action-btn cancel" onClick={handleStatusChange}>선택상품 주문취소</button>
              ) : (
                <button className="action-btn return" onClick={handleStatusChange}>선택상품 반품/교환 신청</button>
              )}
            </div>
          )}
          {/* 4. 하단 버튼 */}
          <div className="modal-footer">
            <button className="faq-btn">주문배송 F&Q</button>
          </div>
        </div>
      </div>
    </div>
  )
}
