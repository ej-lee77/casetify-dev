import React, { useState } from "react";
import "./scss/change.scss";

export default function Change() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="change">
            <h3>배송관련</h3>

            <div className="top-btns">
                <button>반품 및 교환</button>
                <button>배송관련 문의</button>
            </div>

            <ul className="faq">
                <li>
                    <button onClick={() => toggle(0)}>
                        반품해서 환불을 받아도 됩니까?
                        <span>{openIndex === 0 ? "▲" : "▼"}</span>
                    </button>

                    <div className={openIndex === 0 ? "open" : ""}>
                        만일 제품의 반품을 원하신다면, 반품 사유와 함께 상품을 받으신 날짜로부터 10일 안에 저희쪽에 연락을 주시기 바랍니다...
                    </div>
                </li>

                <li>
                    <button onClick={() => toggle(1)}>
                        반품해서 환불을 받아도 됩니까?
                        <span>{openIndex === 1 ? "▲" : "▼"}</span>
                    </button>

                    <div className={openIndex === 1 ? "open" : ""}>
                        만일 제품의 반품을 원하신다면, 반품 사유와 함께 상품을 받으신 날짜로부터 10일 안에 저희쪽에 연락을 주시기 바랍니다...
                    </div>
                </li>
            </ul>
        </div>
    );
}