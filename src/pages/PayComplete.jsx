import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

const methodMap = {
    card: "신용/체크 카드",
    transfer: "무통장 입금",
    vbank: "가상계좌",
    mobile: "핸드폰 결제",
    kakaopay: "카카오페이",
    naverpay: "네이버페이"
};

export default function PayComplete() {
    const location = useLocation();
    const { orderId } = location.state || {};

    // 스토어에서 주문 내역 가져오기
    const {orderList} = useAuthStore();
    
    // 내역 중 아이디가 일치하는 주문 찾기
    const currentOrder = orderList.find(order => order.orderId === orderId);

    // 만약 데이터가 없으면 예외 처리
    if (!currentOrder) {
        return <div className='error-box'>주문 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="sub-page-wrap pay-page-wrap">
            {/* 페이지 상단 제목 */}
            <div className="inner">
                {/* 상단 제목, 결제 과정 표시 영역 */}
                <div className="title-wrap">
                    {/* 결제 과정 */}
                    <ul className="payment-progress-wrap">
                        <li className="payment-progress-item">
                            <div className="icon-box">
                                <img src="/images/cart/cart-bag.svg" alt="장바구니" />
                            </div>
                            <p>장바구니</p>
                        </li>
                        <li className="payment-progress-item">
                            <div className="icon-box">
                                <img src="/images/cart/bank-card.svg" alt="주문/결제" />
                            </div>
                            <p>주문/결제</p>
                        </li>
                        <li className="payment-progress-item active">
                            <div className="icon-box">
                                <img src="/images/cart/order_completed.svg" alt="장바구니" />
                            </div>
                            <p>주문완료</p>
                        </li>
                    </ul>
                </div>
                <div className="complete-msg">
                    <span className='coupon'>주문이 완료 되었습니다</span>
                    <p>{currentOrder.orderDate} 주문하신 상품의</p>
                    <p>주문번호는 {orderId}입니다.</p>

                    <div className='complete-details'>
                        {/* 배송지 정보 */}
                        <div>
                            <h3>배송지 정보</h3>
                            <div className='detail-row'>
                                <span className='detail-title'>받는 분</span>
                                <span>{currentOrder.deliveryInfo.username}</span>
                            </div>
                            <div className='detail-row'>
                                <span className='detail-title'>연락처</span>
                                <span>{currentOrder.deliveryInfo.phone}</span>
                            </div>
                            <div className='detail-row'>
                                <span className='detail-title'>주소</span>
                                <span>{currentOrder.deliveryInfo.address + currentOrder.deliveryInfo.detailaddress}</span>
                            </div>
                            <div className='detail-row'>
                                <span className='detail-title'>배송 메모</span>
                                <span>{currentOrder.deliveryMemo}</span>
                            </div>
                        </div>

                        {/* 결제 정보 */}
                        <div className='detail-section'>
                            <h3>결제 정보</h3>
                            <div className='detail-row'>
                                <span className='detail-title'>결제 방법</span>
                                <span>{methodMap[currentOrder.paymentMethod] || currentOrder.paymentMethod}</span>
                            </div>
                            <div className='detail-row final'>
                                <span className='detail-title'>결제 금액</span>
                                <span className='final-price'>{currentOrder.priceSummary.finalPayment.toLocaleString()}원</span>
                            </div>
                        </div>
                    </div>

                    <Link to="/mypage" state={{ menu: "주문" }}><button className='input-btn'>주문 내역 보기</button></Link>
                </div>
            </div>
        </div>
    )
}
