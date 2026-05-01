import React, { useState } from 'react'
import './scss/shippingInfo.scss'

export default function ShippingInfo() {
    const [openSection, setOpenSection] = useState(null)

    const toggle = (key) => {
        setOpenSection(prev => prev === key ? null : key)
    }

    return (
        <div className="shipping-info-wrap">

            {/* 교환/반품 안내 */}
            <div className="shipping-section">
                <button
                    className={`shipping-section-title${openSection === 'return' ? ' open' : ''}`}
                    onClick={() => toggle('return')}
                    type="button"
                >
                    <span>교환/반품 안내</span>
                    <svg className="chevron" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {openSection === 'return' && (
                    <div className="shipping-section-body">
                        <ul>
                            <li>교환/반품신청은 제품 수령후 14일 이내에 신청해 주세요.</li>
                            <li>제품불량 및 오배송 등으로 교환/반품신청의 경우 배송비 무료입니다.</li>
                            <li>고객님의 개인적인 사정에 의한 교환/반품신청은 고객님께서 왕복배송비 5,000원을 부담해 주셔야 교환/환불처리가 가능합니다.</li>
                            <li className="bold">우리은행 1005-204-717866 (주)이니스프리</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* 배송/교환/반품 유의사항 */}
            <div className="shipping-section">
                <button
                    className={`shipping-section-title${openSection === 'notice' ? ' open' : ''}`}
                    onClick={() => toggle('notice')}
                    type="button"
                >
                    <span>배송/교환/반품 유의사항</span>
                    <svg className="chevron" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {openSection === 'notice' && (
                    <div className="shipping-section-body">
                        <ul>
                            <li>이니스프리는 CJ 택배를 이용합니다.</li>
                            <li>증정품 품절시 공지 없이 대체제품이 발송됩니다.</li>
                            <li>주문번호/주문자/수취인/전화번호가 달라도 배송주소지가 동일 할 경우 자동 묶음 배송 될 수 있습니다.</li>
                            <li>이벤트 적용 및 증정품 증정은 장바구니에 담아두신 시점과 관계없이 결제 당시 증정품으로 제공됩니다.</li>
                            <li>교환/반품 신청은 마이페이지 내 주문관리에서 해주세요.</li>
                            <li>
                                신청 후, 2~3일 이내에 이니스프리 지정 택배사가 직접 방문하여 제품을 수거합니다. 제품 회수 확인 후 교환/반품 처리해 드립니다.<br />
                                (반송 주소 : 경상북도 김천시 대광동 1000-2번지 아모레퍼시픽 김천물류센터 이니스프리 담당자 : 오연정)
                            </li>
                            <li>제품 일부 구성품을 분실하셨거나 취급 부주의로 인해 파손/고장/오염된 경우, 제품 개봉 또는 사용 흔적이 확인될 경우 교환/반품이 불가능합니다. 받으신 증정품도 함께 반납해 주셔야 합니다. 이점 양해 부탁드립니다.</li>
                            <li>그 밖에 궁금하신 점이 있으시다면 이니스프리 1:1 고객문의 또는 고객상담실 (080-380-0114)을 이용해주세요. 언제나 친절하고 신속하게 답변드리겠습니다.</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* 여기서 잠깐 */}
            <div className="shipping-section">
                <button
                    className={`shipping-section-title${openSection === 'fyi' ? ' open' : ''}`}
                    onClick={() => toggle('fyi')}
                    type="button"
                >
                    <span>① 여기서 잠깐</span>
                    <svg className="chevron" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {openSection === 'fyi' && (
                    <div className="shipping-section-body">
                        <ul>
                            <li>상품에 이상이 있을 경우 공정거래위원회 고시에 의해 보상해 드립니다.</li>
                            <li>트러블에 의한 반품 시 의사의 소견서를 첨부해야 하며 기타 제반비용은 고객님이 부담하셔야 합니다. 다만 의사의 소견에 따라 구매 상품의 사용으로 인한 사유가 명백한 경우 소비자분쟁해결 기준에 따릅니다.</li>
                        </ul>
                    </div>
                )}
            </div>

        </div>
    )
}
