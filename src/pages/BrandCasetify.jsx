import React, { useState } from 'react'
import './scss/BrandCasetify.scss'

// ─── STORY 탭 ───────────────────────────────────────
function StoryTab() {
    return (
        <div className="store-story">
            {/* 히어로 */}
            <div className="story-hero">
                <img src="/images/brand/story-hero.png" alt="CASTIFY STORY" />
                <h2 className="story-hero-title">CASTIFY STORY</h2>
            </div>

            {/* 인트로 */}
            <section className="story-intro">
                <h3>우리는 케이스티파이입니다!</h3>
                <p>케이스티파이는 일상의 품격을 높이는 테크 액세서리를 만듭니다.</p>
                <div className="story-icon-row">
                    <img src="/images/brand/story-icon.png" alt="icon" />
                </div>
                <p className="story-desc">
                    홍콩과 로스앤젤레스에 본사를 두고 있는 케이스티파이는 크리에이티브 정신을 전하는 글로벌 브랜드입니다.<br />
                    2011년 아이폰이 출시되었을 때, 케이스티파이의 공동 창업자이자 CEO인 Wes Ng에게 영감이 찾아왔습니다.<br />
                    새로운 아이폰을 보호하기 위한 케이스들을 살펴보던 중, 무겁고 지루하고, 그의 스타일과도 전혀 어울리지 않는 선택지들에 실망했죠.
                </p>
            </section>

            {/* 제품 이미지 풀블리드 */}
            <section className="story-product-img">
                <img src="/images/brand/story-product.png" alt="케이스티파이 제품" />
            </section>

            {/* CEO 섹션 */}
            <section className="story-ceo">
                <div className="story-ceo-left">
                    <img src="/images/brand/story-ceo-left.png" alt="CEO" />
                </div>
                <div className="story-ceo-right">
                    <p className="story-ceo-tag">디자이너이자 혁신가인 그는<br />이를 도전으로 받아들였습니다</p>
                    <p>목표는 갖고 싶고, 세련되고, 독특한 케이스였습니다</p>
                    <p>부담스럽지 않은 부피에 어떤 스타일이든 포인트를<br />줄 수 있는 케이스를 만드는 것이었죠</p>
                    <img src="/images/brand/story-ceo-right.png" alt="케이스" className="story-ceo-img" />
                </div>
            </section>

            {/* CEO 인용구 */}
            <section className="story-quote">
                <blockquote>
                    "디자이너로서 보호 기능과<br />
                    아름다움을 동시에 갖춘 무언가를 창조하고 싶었습니다.<br />
                    누구나 자신의 개성과 열정, 독창성을 표현할 수 있는<br />
                    새하얀 빈 캔버스처럼요."
                </blockquote>
                <cite>-Wes Ngm , 케이스티파이 공동 창업자&amp;CED</cite>
            </section>

            {/* 제품 이미지 2 */}
            <section className="story-product-img2">
                <img src="/images/brand/story-product2.png" alt="케이스티파이 제품2" />
            </section>

            {/* 브랜드 철학 */}
            <section className="story-philosophy">
                <p>" 케이스티파이는 자신의 사진으로 케이스를 커스텀하는 것에서 시작되었습니다.</p>
                <p>10년이 지난 지금, 케이스티파이는 유니크한 디자인으로 자신만의 바이브를 표현할 수 있는 신나는 방법을 제시합니다.</p>
                <p>게다가, 최고의소재로 테크 기기를 보호할 수도 있죠."</p>
            </section>

            {/* 마무리 CTA */}
            <section className="story-cta">
                <p>
                    케이스티파이를 통해<br />
                    당신의 생활을 한층더 자유롭고 돋보이게<br />
                    마음껏 누려보세요!
                </p>
            </section>
        </div>
    )
}

// ─── STANDARD 탭 ────────────────────────────────────
function StandardTab() {
    const [openFaqId, setOpenFaqId] = useState(null)

    const faqs = [
        { id: 1, q: "케이스티파이의 100% 만족 보장이 정확한가?요?" },
        { id: 2, q: "제품 보증이 어떻게 제공되나요?" },
        { id: 3, q: "제품 보증은 무슨 경우에 적용되나요?" },
        { id: 4, q: "제 손상된 케이스가 이 케이스에도 보증을 청구할 수 있나요?" },
        { id: 5, q: "보증 케이스 하자나 제품으로 교체 요청을 할 수 있나요?" },
    ]

    return (
        <div className="store-standard">
            {/* 히어로 */}
            <div className="standard-hero">
                <img src="/images/brand/standard-hero.png" alt="CASTIFY STANDARD" />
                <div className="standard-hero-text">
                    <h2>CASTIFY<br />STANDARD</h2>
                    <div className="standard-hero-badges">
                        <span className="badge">케이스티파이 스탠다드</span>
                        <span className="badge">100% 만족보장</span>
                    </div>
                </div>
            </div>

            {/* 슬로건 */}
            <section className="standard-slogan">
                <h3>삶은 예측불가! 케이스티파이는 늘 당신과 함께</h3>
                <p>잃어버지 않을 거에요, 당신이 기준이 곧 삶이 케이스티파이의 기준이니까요</p>
            </section>

            {/* 이미지 + 텍스트 */}
            <section className="standard-feature">
                <div className="standard-feature-img">
                    <img src="/images/brand/standard-feature.png" alt="standard feature" />
                </div>
                <div className="standard-feature-text">
                    <p>
                        더 오래 견디는 기기를 위해 케이스티파이는 항상 여러분 곁에 있습니다.<br />
                        경험한 적 없는 낙하 충격 보호 성능을 경험해보세요.<br /><br />
                        일상을 더 안전하게, 더 스타일리시하게, 그 모든 게<br />
                        케이스티파이에 담겨 있습니다.<br /><br />
                        그리고 저희의 품질 기준이 곧 서비스와의 연결이기도 합니다.<br />
                        우리가 자랑하는 케이스의 품질이 진짜인지,<br />
                        케이스티파이의 제품을 통해 직접 경험해 보세요.
                    </p>
                </div>
            </section>

            {/* 기술 소개 */}
            <section className="standard-tech">
                <p>케이스티파이의 전문 연구 개발팀은 혁신적인 보호 솔루션을 찾기위해 끊임없이 연구하고 있습니다.</p>
                <p>Duo-Lock™ by CASETIFY 본딩 기술이 적용된 케이스는 한층 견고해진 범퍼 결합력으로 일상 속 모든<br />모험에서 안심할 수 있는 안전감을 선사하죠.</p>
                <div className="standard-tech-cards">
                    <div className="tech-card">
                        <img src="/images/brand/standard-tech1.png" alt="임팩트 케이스" />
                        <p>임팩트 케이스</p>
                    </div>
                    <div className="tech-card">
                        <img src="/images/brand/standard-tech2.png" alt="크로스바디 스트랩" />
                        <p>크로스바디 스트랩<br />블로그레이드 잠금 시스템 버전</p>
                    </div>
                    <div className="tech-card">
                        <img src="/images/brand/standard-tech3.png" alt="클리어 케이스" />
                        <p>클리어 케이스<br />에어리 컬렉션으로 보호받고 가볍게</p>
                    </div>
                </div>
            </section>

            {/* 임팩트 케이스 하이라이트 */}
            <section className="standard-highlight">
                <div className="highlight-left">
                    <p className="highlight-label">임팩트 케이스<br />Duo-Lock by<br />CASETIFY™<br />본딩</p>
                </div>
                <div className="highlight-img">
                    <img src="/images/brand/standard-highlight.png" alt="임팩트 케이스" />
                </div>
                <div className="highlight-right">
                    <p>임팩트 케이스는 EcoShock™ 디자인과<br />최신 이슈를 위한 업그레이드된<br />Duo-Lock by CASETIFY™ 본딩<br />구조를 결합하여 심층적 충격 완화를<br />내구성을 제공합니다.</p>
                </div>
            </section>

            {/* 100% 만족 배너 */}
            <section className="standard-satisfaction">
                <div className="satisfaction-banner">
                    <p className="satisfaction-pct">100%</p>
                    <p className="satisfaction-label">Satisfaction</p>
                </div>
                <p className="satisfaction-desc">
                    고객님의 만족이 저희의 최우선 입니다.<br />
                    구매하시는 모든 CASETIFY 제품에 대해 다음과 같은<br />
                    품질 보증 및 만족 보장 계획을 도입하고 있습니다.
                </p>
            </section>

            {/* 제품 보증 기간 */}
            <section className="standard-warranty">
                <h3>제품 보증 기간</h3>
                <div className="warranty-cards">
                    <div className="warranty-card">
                        <img src="/images/brand/warranty1.png" alt="10일" />
                        <p className="warranty-period">10일 내</p>
                        <p className="warranty-tag">보상 교리</p>
                        <p className="warranty-desc">구매하신 제품에 하자가 있거나 잘못된 상품이 배송되었을 경우 10일 내 반품 요청이 가능합니다. · 새 제품 으로 교환해 드립니다. · 제품 구매 가격(배송비 제외)이 T&C applies*</p>
                    </div>
                    <div className="warranty-card">
                        <img src="/images/brand/warranty2.png" alt="6개월" />
                        <p className="warranty-period">6개월</p>
                        <p className="warranty-tag best">Best 교리</p>
                        <p className="warranty-desc">당사의 엄격한 제품 보증 순위는 배송비는 고객에게 부담됩니다. · 동일한 제품으로 교환됩니다. · 스토어 크레딧은 CASETIFY Store Credit 이용약관에 따름. T&C applies*</p>
                    </div>
                    <div className="warranty-card">
                        <img src="/images/brand/warranty3.png" alt="12개월" />
                        <p className="warranty-period">12개월</p>
                        <p className="warranty-desc">
                            · 달러 / 법원의 제품에 한해 당사 제품의 불량이 맞거나 7일이 이내의 경우에도 반품을 도와드립니다.<br />
                            · 렌즈 가드나 EcoShock™의 기본이 CASETIFY Studio Case의 최신 버전으로 교환됩니다.<br />
                            · CASETIFY Club의 별도 적립을 위한 배송비 지원이 진행되며 반품 기간은 14일이며 반품 가능 기간은 제품 수령 후 7일이내입니다.
                        </p>
                    </div>
                </div>
                <p className="warranty-note">*타의 CASETIFY 케이스 기타 제 케이스는 해당 보증이 적용 가능 여부가 다를 수 있습니다.</p>
            </section>

            {/* 제품 케어 팁 */}
            <section className="standard-care">
                <h3>제품 케어 팁</h3>
                <div className="care-cards">
                    <div className="care-card">
                        <p className="care-num">1</p>
                        <img src="/images/brand/care1.png" alt="케어팁1" />
                        <p>깨끗하고 부드러운 전용 물에 적신 천으로 케이스를 청소해 주세요.</p>
                    </div>
                    <div className="care-card">
                        <p className="care-num">2</p>
                        <img src="/images/brand/care2.png" alt="케어팁2" />
                        <p>알코올 성분이 함유된 소독제 사용을 삼가 주십시오.</p>
                    </div>
                    <div className="care-card">
                        <p className="care-num">3</p>
                        <img src="/images/brand/care3.png" alt="케어팁3" />
                        <p>표백 제품이나 유사 화학 물질을 사용하여 케이스를 청소하지 마십시오.</p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="standard-faq">
                <h3>Frequently Asked Question</h3>
                <div className="faq-list">
                    {faqs.map((faq) => (
                        <div key={faq.id} className={`faq-item ${openFaqId === faq.id ? 'open' : ''}`}>
                            <button onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}>
                                <span>{faq.q}</span>
                                <span className="faq-icon">{openFaqId === faq.id ? '−' : '+'}</span>
                            </button>
                            {openFaqId === faq.id && (
                                <div className="faq-answer">
                                    <p>해당 내용에 대한 답변이 준비 중입니다.</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

// ─── RE:CASTiFY 탭 (추후 추가) ───────────────────────
function RecastifyTab() {
    return (
        <div className="store-recastify">
            <div className="recastify-placeholder">
                <img src="/images/brand/recastify-hero.png" alt="RE:CASTiFY" />
                {/* 추후 콘텐츠 추가 예정 */}
            </div>
        </div>
    )
}

// ─── 메인 Store 페이지 ───────────────────────────────
const TABS = [
    { id: 'story', label: 'STORY' },
    { id: 'standard', label: 'STANDARED' },
    { id: 'recastify', label: 'RE:CASTiFY' },
]

export default function Store() {
    const [activeTab, setActiveTab] = useState('story')

    return (
        <div className="store-page">
            {/* 탭 네비게이션 */}
            <nav className="store-tab-nav">
                <div className="inner">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`store-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* 탭 콘텐츠 */}
            <div className="store-tab-content">
                {activeTab === 'story' && <StoryTab />}
                {activeTab === 'standard' && <StandardTab />}
                {activeTab === 'recastify' && <RecastifyTab />}
            </div>
        </div>
    )
}
