import React from 'react'
import { Link } from 'react-router-dom'

export default function PayComplete() {
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
                    <p>2026.4.24 주문하신 상품의</p>
                    <p>주문번호는 123456입니다.</p>
                    <Link to="/mypage" state={{ menu: "주문" }}><button className='input-btn'>주문확인하기</button></Link>
                </div>
            </div>
        </div>
    )
}
