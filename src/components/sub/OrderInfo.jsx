import React, { useEffect } from 'react'
import MypageTitle from './MypageTitle'
import { useAuthStore } from '../../store/useAuthStore'

export default function OrderInfo() {
    const {user, orderList, onFetchOrder} = useAuthStore();
    console.log(orderList);
    useEffect(()=>{ 
        if (!user) return;
        onFetchOrder();
    }, [user]);
    return (
        <div className="order-list-container">
            <div>
                <MypageTitle title={"주문 정보"} />
            </div>
            {/* 상단 탭 및 필터 (생략 가능) */}
            <div className="order-status-tabs">
                <button className="active">전체</button>
                <button>배송중</button>
                <button>배송완료</button>
                <button>취소/반품</button>
            </div>

            <div className="order-table-header">
                <div className="col">날짜/주문번호</div>
                <div className="col">상품명/옵션</div>
                <div className="col">상품금액/수량</div>
                <div className="col">주문상태</div>
            </div>

            {orderList.length === 0 ? (
                <div className="empty-order">주문 내역이 없습니다.</div>
            ) : (
                orderList.map((order) => (
                <div className="order-group" key={order.orderId}>
                    {/* 왼쪽: 날짜 및 주문번호 */}
                    <div className="order-info-col">
                    <p className="date">{order.orderDate}</p>
                    <button className="detail-btn">주문정보 상세보기 〉</button>
                    </div>

                    {/* 중간: 상품 리스트 (한 주문 내의 상품들) */}
                    <div className="order-items-col">
                    {order.orderItems.map((item, idx) => (
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
                    </div>

                    {/* 오른쪽: 주문 상태 */}
                    <div className="order-status-col">
                    <p className="status-txt">배송준비중</p>
                    <button className="cancel-btn">배송취소</button>
                    </div>
                </div>
                ))
            )}
        </div>
    )
}
