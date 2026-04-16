import React from 'react'

export default function Qa() {
    return (
        <div className="qa">
            <h3>상품문의</h3>
            <div className="top-bar">
                <button>상품관련 문의</button>
                <button>배송관련 문의</button>
                <div className="search-box">
                    {/* <input type="text" placeholder="궁금한 내용의 단어나 키워드로 검색하세요"> */}
                    <span className="icon">🔍</span>
                </div>
                <div className="qa-list">
                    <div className="product-header">
                        <div>답변상태</div>
                        <div>제목</div>
                        <div>날짜</div>
                    </div>
                    <div className="row">
                        <div className="status done">답변완료</div>
                        <div className="title">튼튼한가요?</div>
                        <div className="date">2026.04.10</div>
                    </div>

                    <div class="row">
                        <div class="status wait">답변</div>
                        <div class="title">네 고객님 튼튼합니다 ^^</div>
                        <div class="date"></div>
                    </div>


                </div>

            </div>

        </div>
    )
}
