import React, { useState } from 'react'
import "./scss/Gift.scss"
import Benefit from '../components/Benefit'
import { Link, useNavigate } from 'react-router-dom'


const designs = [
  { id: 1, src: "./images/gift/gift-card1.png" },
  { id: 2, src: "./images/gift/gift-card2.png" },
  { id: 3, src: "./images/gift/gift-card3.png" },
  { id: 4, src: "./images/gift/gift-card4.png" },
  { id: 5, src: "./images/gift/gift-card5.png" },
  { id: 6, src: "./images/gift/gift-card6.png" },
]

const amounts = [20000, 50000, 80000, 100000, 150000, 200000]

const faqList = [
  { q: "기프트 카드 사용 기한은 어떻게 되나요?", a: "기프트 카드는 구매일로부터 5년간 사용할 수 있습니다." },
  { q: "기프트 카드를 구매한 후, 금액을 변경할 수 있나요?", a: "아니요. 모든 구매 완료된 기프트 카드는 수정, 반품 또는 환불이 불가능합니다." },
  { q: "기프트 카드는 언제 발송되나요?", a: "케이스티파이에서 결제가 승인되면 기프트 카드가 받는 분에게 발송됩니다. 구매자에게는 주문 확인 이메일이 전송됩니다." },
  { q: "기프트 카드를 이메일로 받지 못했어요.", a: "구매 시 올바른 이메일 주소를 입력했는지 확인해 주세요. 핫메일 계정의 경우, 기프트 카드 이메일이 프로모션/스팸/정크 이메일 폴더로 들어갈 수 있습니다. 받은 편지함의 용량이 초과된 경우, 기프트 카드를 포함한 새 메시지를 받을 수 없으니, 이메일 폴더 용량을 확인하고 비워주세요. 여전히 이메일을 찾을 수 없는 경우, 케이스티파이에게 이메일을 보내주세요." },
  { q: "기프트 카드로 다른 기프트 카드를 구매할 수 있나요?", a: "죄송합니다. 기프트 카드로 구매 시 기프트 카드를 사용할 수 없습니다." },
  { q: "구매 시 1개 이상의 기프트 카드를 사용할 수 있나요?", a: "네! 제품 구매 시, 여러 개의 기프트 카드를 사용할 수 있습니다." },
  { q: "기프트 카드로 구매할 경우 멤버십 포인트가 적립되나요?", a: "구매 시 사용한 기프트 카드 금액은 케이스티파이 클럽 프로그램 총 결제 금액에서 제외됩니다." },
  { q: "보유하고 있는 기프트 카드에 금액을 충전할 수 있나요?", a: "이미 보유하고 있는 기프트 카드에는 금액을 충전할 수 없습니다." },
  { q: "다른 회원 계정에서 기프트 카드를 사용할 수 있나요?", a: "기프트 카드를 사용하려면 회원가입 및 로그인이 필요합니다. 기프트 카드가 성공적으로 회원 계정에 추가되면 해당 기프트 카드는 계정을 보유한 회원만 사용할 수 있습니다. 등록이 완료된 기프트 카드는 양도할 수 없습니다." },
]

export default function Gift() {
  const [selectedDesign, setSelectedDesign] = useState(designs[0])
  const [selectedAmount, setSelectedAmount] = useState(amounts[0])
  const [openIndex, setOpenIndex] = useState(null)  // 여기로 이동
  const navigate = useNavigate();


  //에러
  const [errors, setErrors] = useState({})
  const [toName, setToName] = useState('')
  const [toEmail, setToEmail] = useState('')
  const [fromName, setFromName] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const handleAddToCart = () => {
    const newErrors = {}
    if (!toName) newErrors.toName = '받는 분 성함을 입력해주세요.'
    if (!toEmail) newErrors.toEmail = '받는 분 이메일 주소를 입력해주세요.'
    if (!fromName) newErrors.fromName = '보내는 분 성함을 입력해주세요.'
    if (!fromEmail) newErrors.fromEmail = '보내는 분 이메일 주소를 입력해주세요.'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      // 장바구니 담기 로직
    }
  }



  return (
    <>
      <div className='sub-page-wrap'>
        <div className='gift-title'>
          <h1>디지털 기프트 카드</h1>
          <p>한 장의 카드로 전하는 무궁무진한 선물!</p>
        </div>
      </div>

      <div className='banner-wrap'>
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
            <button onClick={() => navigate('/mypage', { state: { menu: '기프트 카드/쿠폰' } })}>
              기프트 카드 등록하기
            </button>
          </div>
        </div>
      </div>

      <div className="gift-purchase-wrap">
        <div className="gift-purchase-left">
          <div className="gift-thumbnail-wrap">
            <img src={selectedDesign.src} alt="선택된 기프트카드" />
            {selectedAmount && (
              <span className="gift-amount-badge">
                {selectedAmount.toLocaleString()}원
              </span>
            )}
          </div>
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
          <div className="gift-amount-select">
            <p>금액 선택하기</p>
            <div className="gift-amount-list">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  className={`gift-amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount.toLocaleString()}원
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="gift-purchase-right">
          <div className="gift-form">
            <p className="gift-form-label">To</p>
            <div className="gift-input-wrap">
              <input type="text" placeholder="받는 분 성함" value={toName} onChange={(e) => {
                setToName(e.target.value)
                if (errors.toName) setErrors(prev => ({ ...prev, toName: '' }))
              }} />
              {errors.toName && <p className="gift-form-error">{errors.toName}</p>}
            </div>
            <div className="gift-input-wrap">
              <input type="email" placeholder="받는 분 이메일 주소" value={toEmail} onChange={(e) => {
                setToEmail(e.target.value)
                if (errors.toEmail) setErrors(prev => ({ ...prev, toEmail: '' }))
              }} />
              {errors.toEmail && <p className="gift-form-error">{errors.toEmail}</p>}
            </div>

            <p className="gift-form-label">From</p>
            <div className="gift-input-wrap">
              <input type="text" placeholder="보내는 분 성함" value={fromName} onChange={(e) => {
                setFromName(e.target.value)
                if (errors.fromName) setErrors(prev => ({ ...prev, fromName: '' }))
              }} />
              {errors.fromName && <p className="gift-form-error">{errors.fromName}</p>}
            </div>
            <div className="gift-input-wrap">
              <input type="email" placeholder="보내는 분 이메일 주소" value={fromEmail} onChange={(e) => {
                setFromEmail(e.target.value)
                if (errors.fromEmail) setErrors(prev => ({ ...prev, fromEmail: '' }))
              }} />
              {errors.fromEmail && <p className="gift-form-error">{errors.fromEmail}</p>}
            </div>

            <p className="gift-form-label">메시지 (옵션)</p>
            <textarea placeholder="특별한 선물을 준비해 봤어요! 마음에 들었으면 좋겠네요." maxLength={160} />

            <button className="gift-cart-btn" onClick={handleAddToCart}>
              <img src="/images/icon/btn_shopping-cart.svg" alt="" />
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>

      <div className="gift-notice-wrap">
        <p className="gift-notice-title">Please Note:</p>
        <ul>
          <li>해당 제품은 케이스티파이 보증 프로그램과 10일 이내 무조건 반품 및 교환 정책에서 제외됩니다.</li>
          <li>기프트 카드는 다른 통화를 사용하는 지역에서 사용할 수 없습니다.</li>
          <li>환불 불가</li>
          <li>현금으로 환급 불가</li>
          <li>기프트 카드 구매 시, 프로모션 코드나 할인 코드를 적용해 구매할 수 없습니다.</li>
          <li>자세한 내용은 이용약관을 확인해 주세요.</li>
        </ul>
      </div>

      <div className="gift-faq-wrap">
        <h2>자주 묻는 질문</h2>
        {faqList.map((item, idx) => (
          <div key={idx} className={`faq-item ${openIndex === idx ? 'open' : ''}`}>
            <div className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
              <span className='faq-text'>{item.q}</span>
              <span className="faq-arrow">{openIndex === idx ? '▲' : '▼'}</span>
            </div>
            <div className="faq-answer-wrap">
              <div className="faq-answer">{item.a}</div>
            </div>
          </div>
        ))}
        <div className="gift-faq-more">
          <Link to="/brand/qna"><button>더 알아보기</button></Link>
        </div>
      </div>

      <Benefit />
    </>
  )
}