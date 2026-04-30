import React, { useState } from "react";
import "./scss/change.scss";

// FAQ 데이터
const FAQ_CATEGORIES = [
    { id: "all", label: "전체" },
    { id: "delivery", label: "배송" },
    { id: "return", label: "반품 및 교환" }
];

const FAQ_LIST = [
        {
            id: 8,
            category: "return",
            question: "커스텀 제품도 반품이 가능한가요?",
            answer:
                "커스텀 제품은 개인 맞춤 제작 특성상 전액 환불 반품이 불가합니다. 반품을 원하실 경우 고객서비스팀에 문의해 주세요. 상품은 미사용 상태로 원래 포장 그대로 선불 배송비를 부담하여 반송해야 하며, 반송 상품 확인 후 실제 구매가의 50%가 원결제 수단 또는 크레딧으로 환불됩니다.",
        },
        {
            id: 9,
            category: "return",
            question: "일반 상품의 교환 및 반품 조건은 어떻게 되나요?",
            answer:
                "일반 상품은 상품 수령 후 마이페이지 > 주문 내역을 통해 교환/반품 신청이 가능합니다. 단, 이미 할인이 적용된 상품, 아카이브 컬렉션, 콜라보 컬렉션 등 세일 중인 상품은 추가 할인 및 반품 조건이 다를 수 있으니 상품 상세 페이지를 확인해 주세요.",
        },
        {
            id: 4,
            category: "delivery",
            question: "배송 방법에는 어떤 것이 있나요?",
            answer:
                '배송은 "일반배송"과 "익스프레스 배송" 두 가지로 나뉩니다. 일반배송은 국제 우체국을 통해 배달되며, 익스프레스 배송은 FedEx나 DHL Express 등 특송사를 통해 운송됩니다. 배송 형태는 도착지 국가의 서비스에 따라 다를 수 있습니다.',
        },
        {
            id: 5,
            category: "delivery",
            question: "예상 배송일은 정확한가요?",
            answer:
                "웹사이트에 표시된 예상 배송일은 단순 참고용이며, 세관 통관 절차 및 도착지 국가의 배송 기준에 따라 실제 도착일이 달라질 수 있습니다. CASETiFY는 예상 배송일 내 도착을 보장하지 않으며, 기재된 날짜를 준수할 의무를 가지지 않습니다.",
        },
        {
            id: 6,
            category: "delivery",
            question: "무료배송 혜택은 어떻게 적용되나요?",
            answer:
                "무료배송이 제공되는 경우, 별도 언급이 없는 한 '표준 배송(일반 배송)'에만 해당됩니다. 또한 무료배송은 오직 주문의 첫 번째 배송에만 적용됩니다. 배송지 오기재나 수취인 부재 등으로 재배송이 필요한 경우 재배송 비용이 부과되며, 모든 배송비는 환불이 불가합니다.",
        },
        {
            id: 7,
            category: "delivery",
            question: "해외 배송 시 추가 비용이 발생하나요?",
            answer:
                "해외 주문 시 수입세, 관세, 부가세 및 운송 관련 비용이 발생할 수 있으며, 이는 웹사이트 결제 금액에 포함되어 있지 않습니다. 상품 수령 전 해당 국가 유관 기관에 비용을 납부해야 할 수 있으며, 이와 관련하여 CASETiFY는 어떠한 책임도 지지 않습니다.",
        }
    ];

export default function Change() {
    const [activeTab, setActiveTab] = useState("returns");
    const [openIndex, setOpenIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setOpenIndex(null);
    };

    // const { faqs } = TABS[activeTab];
    const [openFaqId, setOpenFaqId] = useState(null);
    const toggleFaq = (id) => {
        setOpenFaqId((prev) => (prev === id ? null : id));
    };

    const filteredFaqs = FAQ_LIST.filter((faq) =>
        activeCategory === "all" || faq.category === activeCategory
    );

    console.log(filteredFaqs);


    return (
        <div className="change">
            <h3>배송관련</h3>

            <div className="top-btns">
                {FAQ_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        className={`faq-tab-btn ${activeCategory === cat.id ? "on" : ""}`}
                        onClick={() => {
                            setActiveCategory(cat.id);
                            setOpenFaqId(null);
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {filteredFaqs.map((faq) => (
                <div
                    key={faq.id}
                    className={`faq-item ${openFaqId === faq.id ? "open" : ""}`}
                >
                    <button
                        type="button"
                        className="faq-question"
                        onClick={() => toggleFaq(faq.id)}
                    >
                        <span>{faq.question}</span>
                        <svg
                            className="faq-chevron"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {openFaqId === faq.id && (
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* <ul className="faq">
                {faqs.map((faq, index) => (
                    <li key={index}>
                        <button onClick={() => toggle(index)}>
                            {faq.q}
                            <span>{openIndex === index ? "▲" : "▼"}</span>
                        </button>
                        <div className={openIndex === index ? "open" : ""}>
                            {faq.a}
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}