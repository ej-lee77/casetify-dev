import React, { useState } from "react";
import "./scss/qa.scss";

const DATA = [
    {
        question: "튼튼한가요?",
        answer: "네 고객님 튼튼합니다 ^^",
        date: "2026.04.10",
    },
    {
        question: "생활방수 되나요?",
        answer: "네, 일상 방수 가능합니다.",
        date: "2026.04.10",
    },
];

export default function Qa() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <div className="qa">
            <h3>상품문의</h3>

            <div className="top-bar">
                <div className="btns">
                    <button className="active">상품관련 문의</button>
                    <button>배송관련 문의</button>
                </div>

                <div className="search-box">
                    <span className="icon">🔍</span>
                    <input
                        type="text"
                        placeholder="궁금한 내용의 단어나 키워드로 검색하세요"
                    />
                </div>
            </div>

            <div className="qa-list">
                {/* 헤더 */}
                <div className="product-header">
                    <div>답변상태</div>
                    <div>제목</div>
                    <div>날짜</div>
                </div>

                {/* 리스트 */}
                {DATA.map((item, i) => (
                    <div key={i}>
                        {/* 질문 */}
                        <div className="row" onClick={() => toggle(i)}>
                            <div className="status done">답변완료</div>
                            <div className="title">{item.question}</div>
                            <div className="date">{item.date}</div>
                        </div>

                        {/* 답변 */}
                        {openIndex === i && (
                            <div className="row answer">
                                <div className="status wait">답변</div>
                                <div className="title">{item.answer}</div>
                                <div className="date"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}