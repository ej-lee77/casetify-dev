import React, { useEffect } from 'react'
import "./scss/OrderInfo.scss"
import MypageTitle from './MypageTitle'
import { useAuthStore } from '../../store/useAuthStore'
import { div } from 'framer-motion/client';

const statusBtn = {
    "배송준비중": "배송취소",
    "배송중": "",
    "배송완료": "교환/반품"
};

export default function OrderInfo() {
    const {user, orderList, onFetchOrder} = useAuthStore();
    // console.log(orderList);

    useEffect(()=>{ 
        if (!user) return;
        onFetchOrder();
    }, [user]);

    return (
        <div className="order-list-container">
            <div>
                <MypageTitle title={"주문 정보"} />
            </div>

            {/* 상단 탭 및 필터 */}
            <div className="order-status-tabs">
                <button className="active">전체</button>
                <button>배송중</button>
                <button>배송완료</button>
                <button>취소/반품</button>
            </div>

            <div className='order-length'>총 {orderList.length}건</div>

            <div className="order-table-header">
                <div className="col">날짜/주문번호</div>
                <div className="col">상품명/옵션</div>
                <div className="col">상품금액/수량</div>
                <div className="col">주문상태</div>
            </div>

            {orderList.length === 0 ? (
                <div className="empty-order">주문 내역이 없습니다.</div>
            ) : (
                orderList.map((order) => {
                    // 상품이 3개보다 많은지 확인
                    const isMoreThanThree = order.orderItems.length > 3;
                    // 실제로 보여줄 리스트 (최대 3개)
                    const displayItems = order.orderItems.slice(0, 3);
                    // 숨겨진 상품 개수
                    const extraCount = order.orderItems.length - 3;
                return(
                <div className="order-group" key={order.orderId}>
                    {/* 왼쪽: 날짜 및 주문번호 */}
                    <div className="order-info-col">
                        <p className="date">{order.orderDate}</p>
                        <p className="order-id">{order.orderId}</p>
                        <button className="detail-btn">주문정보 상세보기 〉</button>
                    </div>

                    {/* 중간: 상품 리스트 (한 주문 내의 상품들) */}
                    <div className="order-items-col">
                        {displayItems.map((item, idx) => (
                            <div className="item-row" key={`${order.orderId}-${idx}`}>
                                <div className="item-img">
                                    <img src={item.imgUrl} alt={item.title} />
                                </div>
                                <div className="item-txt">
                                    <p className="item-title">{item.title}</p>
                                    <p className="item-option">{item.device} / {item.color}</p>
                                </div>
                                <div className="item-price-qty">
                                    <p className="price">{item.price.toLocaleString()}원</p>
                                    <p className="qty">{item.quantity}개</p>
                                </div>
                            </div>  
                        ))}
                        {/* 3개 이상일 경우 '그 외 몇 개' 표시 */}
                        {isMoreThanThree && (
                            <div className="more-items-tag">
                                <p>그 외 <strong>{extraCount}</strong>개의 상품이 더 있습니다.</p>
                            </div>
                        )}                  
                    </div>
                        
                    {/* 오른쪽: 주문 상태 */}
                    <div className="order-status-col">
                        <p className="status-txt">{order.orderStatus}</p>
                        {statusBtn[order.orderStatus] !== "" ? (<button className="cancel-btn">{statusBtn[order.orderStatus]}</button>) : ("")}
                    </div>
                </div>
                )})
            )}
        </div>
    )
}
