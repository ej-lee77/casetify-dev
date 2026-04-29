import React, { useState } from 'react'
import "./scss/Gift.scss"

const designs = [
  { id: 1, src: "./images/gift/gift-card1.png" },
  { id: 2, src: "./images/gift/gift-card2.png" },
  { id: 3, src: "./images/gift/gift-card3.png" },
  { id: 4, src: "./images/gift/gift-card4.png" },
  { id: 5, src: "./images/gift/gift-card5.png" },
  { id: 6, src: "./images/gift/gift-card6.png" },
]

const amounts = [20000, 50000, 80000, 100000, 150000]

export default function Gift() {
  const [selectedDesign, setSelectedDesign] = useState(designs[0])
  const [selectedAmount, setSelectedAmount] = useState(null)

  return (
    <>
      <div className='sub-page-wrap'>
        <div className='gift-title'>
          <h1>디지털 기프트 카드</h1>
          <p>한 장의 카드로 전하는 무궁무진한 선물!</p>
        </div>
      </div>

      <div>
        <div className="gift-card-wrap">
          <div className="gift-card-info instant">
            <p>즉시 사용 가능</p>
            <img src="./images/gift/giftcard-instant.png" alt="" />
            <p>기프트 카드는 받는 분의 이메일로 바로 전달됩니다 <br />
              웹사이트와 매장에서 사용 가능합니다</p>
          </div>
          <div className="gift-card-info custom">
            <p>커스텀 디자인</p>
            <img src="./images/gift/giftcard-custom.png" alt="" />
            <p>마음을 담은 메시지를 작성하고, <br />
              다양한 디자인을 더해 특별한 선물을 완성해 보세요.</p>
          </div>
          <div className="gift-card-info register">
            <p>이미 기프트 카드를 보유하고 계시나요?</p>
            <button>기프트 카드 등록하기</button>
          </div>
        </div>
      </div>

      {/* 구매 섹션 */}
      <div className="gift-purchase-wrap">

        {/* 왼쪽 */}
        <div className="gift-purchase-left">

          {/* 썸네일 */}
          <div className="gift-thumbnail-wrap">
            <img src={selectedDesign.src} alt="선택된 기프트카드" />
            {selectedAmount && (
              <span className="gift-amount-badge">
                {selectedAmount.toLocaleString()}원
              </span>
            )}
          </div>

          {/* 디자인 선택 */}
          <div className="gift-design-select">
            <p>기프트 카드 디자인</p>
            <div className="gift-design-list">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className={`gift-design-item ${selectedDesign.id === design.id ? 'active' : ''}`}
                  onClick={() => setSelectedDesign(design)}
                >
                  <img src={design.src} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* 금액 선택 */}
          <div className="gift-amount-select">
            <p>금액 선택하기</p>
            <div className="gift-amount-list">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  className={`gift-amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  ₩{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="gift-purchase-right">
          <div className="gift-form">
            <p className="gift-form-label">To</p>
            <input type="text" placeholder="받는 분 성함" />
            <input type="email" placeholder="받는 분 이메일 주소" />

            <p className="gift-form-label">From</p>
            <input type="text" placeholder="보내는 분 성함" />
            <input type="email" placeholder="보내는 분 이메일 주소" />

            <div className="gift-message-header">
              <p className="gift-form-label">메시지 (옵션)</p>
            </div>
            <textarea placeholder="특별한 선물을 준비해 봤어요! 마음에 들었으면 좋겠네요." maxLength={160} />

            <button className="gift-cart-btn">장바구니에 담기</button>
          </div>
        </div>

      </div>
    </>
  )
}