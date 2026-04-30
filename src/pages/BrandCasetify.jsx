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
                    <img src="/images/brand/story-ceo-left.png" alt="제품사진" />
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
                {/* <div className="standard-feature-text">
                    <p>
                        더 오래 견디는 기기를 위해 케이스티파이는 항상 여러분 곁에 있습니다.<br />
                        경험한 적 없는 낙하 충격 보호 성능을 경험해보세요.<br /><br />
                        일상을 더 안전하게, 더 스타일리시하게, 그 모든 게<br />
                        케이스티파이에 담겨 있습니다.<br /><br />
                        그리고 저희의 품질 기준이 곧 서비스와의 연결이기도 합니다.<br />
                        우리가 자랑하는 케이스의 품질이 진짜인지,<br />
                        케이스티파이의 제품을 통해 직접 경험해 보세요.
                    </p>
                </div> */}
            </section>

            {/* 기술 소개 */}
            <section className="standard-tech">
                <p>케이스티파이의 전문 연구 개발팀은 혁신적인 보호 솔루션을 찾기위해 끊임없이 연구하고 있습니다.</p>
                <p>Duo-Lock™ by CASETIFY 본딩 기술이 적용된 케이스는 한층 견고해진 범퍼 결합력으로 일상 속 모든<br />모험에서 안심할 수 있는 안전감을 선사하죠.</p>
                <div className="standard-tech-cards">
                    <div className="tech-card">
                        <img src="/images/brand/standard-tech1.png" alt="바운스 케이스" />
                        <p>바운스 케이스</p>
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
                <div className="highlight-img">
                    <img src="/images/brand/standard-highlight.png" alt="글레이즈 케이스" />
                    <div className="highlight-left">
                        <p className="highlight-label">글레이즈 케이스<br />이너 프린팅<br />글레이즈 기법<br />Glaze</p>
                    </div>
                    <div className="highlight-right">
                        <p>변치 않는 당신의 컬러, 당신의 스타일.<br />당신이 선택한 유쾌한 패턴과 컬러풀한<br />색상들은 글레이즈 케이스의 글로시한<br />백플레이트 아래 견고하게 봉인되어,<br />색이 바래거나 벗겨질 염려 없이<br />변함없는 아름다움을 선사합니다.</p>
                    </div>
                </div>
            </section>

            {/* 100% 만족 배너 */}
            <section className="standard-warranty">
                <div className="warranty-hero">
                    <div className="warranty-hero-top" />
                    <div className="warranty-satisfaction">
                        <p>100%</p>
                        <p>Satisfaction</p>
                    </div>
                    <div className="warranty-hero-bottom" />
                </div>

                <div className="warranty-content">
                    <h3 className="warranty-title">제품 보증 기간</h3>
                    <div className="warranty-grid">
                        <div className="warranty-card blue">
                            <div className="warranty-card-header">
                                <span className="warranty-period">10일 이내</span>
                                <span className="warranty-tag">모든 고객님</span>
                            </div>
                            <div className="warranty-card-body">
                                <p>구매하신 제품이 마음에 들지 않으신다면, <strong>10일 내에 주문하신 모든 제품을 조건 없이 반품</strong> 또는 교환해드립니다.</p>
                                <ol>
                                    <li>일부 제품 및 주문 건에만 적용</li>
                                    <li>제품 구매 후 10일 이내 | <u>T&C applies*</u></li>
                                </ol>
                            </div>
                        </div>

                        <div className="warranty-card blue">
                            <div className="warranty-card-header">
                                <span className="warranty-period">6개월</span>
                                <span className="warranty-tag">모든 고객님</span>
                            </div>
                            <div className="warranty-card-body">
                                <p>당사의 <strong>6개월 제품 보증</strong>은 손상된 제품을 교환해 드립니다.</p>
                                <ol>
                                    <li>일부 제품 및 주문 건에만 적용됩니다.</li>
                                    <li>한 번 교환 | <u>T&C applies*</u></li>
                                    <li>반품/교환된 제품이 단종된 제품일 경우 동일한 금액 또는 그보다 낮은 금액의 제품으로 적용됩니다.</li>
                                </ol>
                            </div>
                        </div>

                        <div className="warranty-card pink">
                            <div className="warranty-card-header">
                                <span className="warranty-period">12개월</span>
                                <span className="warranty-tag gold">골드 등급 회원</span>
                            </div>
                            <div className="warranty-card-body">
                                <p><strong>골드 등급 회원</strong>에게는 6개월 제품 보증 기간 외의 <strong>6개월 특별 연장을 제공</strong>합니다.</p>
                                <ol>
                                    <li>골드 회원으로 업그레이드 이후 발생한 주문 및 제품에 한하여 적용됩니다.</li>
                                    <li>CASETiFY Club 골드 등급 회원에게만 해당 (전 지역)</li>
                                    <li>구매 후 12개월 이내</li>
                                    <li>한 번 교환 | T&C applies*</li>
                                    <li>반품/교환된 제품이 단종된 제품일 경우 동일한 금액 또는 그보다 낮은 금액의 제품으로 적용됩니다.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
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

        </div>
    )
}

function RecastifyTab() {
    return (
        <div className="store-recastify">

            {/* ① 히어로 */}
            <div className="rc-hero">
                <img src="/images/brand/rc-hero.png" alt="Re:CASTiFY" />
                <div className="rc-hero-text">
                    <h2>Re:CASTIFY</h2>
                    <div className="rc-hero-badges">
                        <span className="badge">Re:CASETiFY™</span>
                        <span className="badge">Re:CASETiFY™ 이트</span>
                        <span className="badge">Re:CASETiFY™ 플라네타리</span>
                    </div>
                </div>
            </div>

            {/* ② 이미지 + 플라스틱 위기 텍스트 */}
            <section className="rc-crisis">
                <div className="rc-crisis-img">
                    <img src="/images/brand/rc-crisis.png" alt="플라스틱 위기" />
                </div>
                <div className="rc-crisis-text">
                    <p className="rc-crisis-title">플라스틱 위기</p>
                    <p>전 세계에서는 매년 4억 6천만<br />톤에 달하는 플라스틱이 생산되고 있습니다.</p>
                    <p>이는 세상에서 가장 큰 포유류인 대왕고래 320만 마리와<br />맞먹는 무게이죠.</p>
                    <p>하지만 친환경 기술로 플라스틱 사용을<br />줄이고, 다시 쓰고, 재활용한다면 이 거대한 숫자도<br />바꿔나갈 수 있습니다</p>
                </div>
            </section>

            {/* ③ 숫자 통계 마퀴 */}
            <section className="rc-stats">
                <div className="rc-stats-track">
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">01</span>
                        <p>2021년부터 210만 개<br />이상의 폰케이스를<br />재활용했습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">02</span>
                        <p>10만 5천 킬로그램이 넘는 물<br />라스틱이 매립되지 않도록 막<br />았습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">03</span>
                        <p>Earthday.org 팀과<br />함께 503 그루의 나무가<br />남는 나무를 심었습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">04</span>
                        <p>탄소 배출을<br />절감하였습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                </div>
            </section>

            {/* ④ 폐기물 re:IMAGINE */}
            <section className="rc-reimagine">
                <div className="rc-reimagine-title">
                    <p>폐기물을 <em>re:IMAGINE</em> 하다</p>
                    <p>: Re/CASETiFY™을 소개합니다</p>
                </div>
                <div className="rc-reimagine-cards">
                    <div className="rc-reimagine-card">
                        <img src="/images/brand/rc-step1.png" alt="낡은 케이스 수거" />
                        <p>낡은 케이스를 우리에게 건네주세요</p>
                    </div>
                    <div className="rc-reimagine-card">
                        <img src="/images/brand/rc-step2.png" alt="재활용 파트너" />
                        <p>독립된 재활용 파트너와협력<br />하여 케이스를 처리합니다</p>
                    </div>
                    <div className="rc-reimagine-card">
                        <img src="/images/brand/rc-step3.png" alt="재활용 소재" />
                        <p>재활용 소재를 추출합니다</p>
                    </div>
                </div>
                <div className="rc-reimagine-btn">
                    <button>Re/CASETiFY™: 생각의 틀을 열다</button>
                </div>
            </section>

            {/* ⑤ 생각의 틀을 열다 */}
            <section className="rc-open">
                <div className="rc-open-bg">
                    <img src="/images/brand/rc-open-bg.png" alt="생각의 틀" />
                </div>
                <div className="rc-open-content">
                    <p className="rc-open-lead">창의력이 모여 생각의 틀을 넘어설 때, 놀라운 일들이 일어납니다.</p>
                    <p>이것은 하나의 창의적인 실험과도 같습니다: 디자이너와 아티스트, 그리고 버려진 케이스가 만나면 무엇이 가능해질까요? 그<br />결과는 상상 이상이었습니다.</p>
                    <p>Re/CASETIFY 프로그램은 익숙했던 물건에 완전히 새로운 시선을 불어넣고, 그 변화는 한눈에 다시 보게 만드는 작품으로 이<br />어집니다.</p>
                    <p className="rc-open-quote">이번 지구의 날, 우리는 예상을 뛰어 넘는 상상에서 시작된 변화를 기념하고자 합니다.<br />"만약 우리가 고정된 생각의 틀에서 벗어나 생각한다면, 무엇이 가능해질까요?"<br />우리가 모든 답을 알고 이어가기 아니라,</p>
                    <p className="rc-open-em">가장 의미 있는 변화는 늘 그 질문에서 시작되기 때문입니다.</p>
                </div>
            </section>

            {/* ⑥ 아티스트 + 제품 갤러리 */}
            <section className="rc-gallery">
                <div className="rc-gallery-left">
                    <p className="rc-gallery-title">폐기물에 새로운 시선을,<br />창작자에게는 새로운 가능성을</p>
                    <div className="rc-gallery-artist-row">
                        <div className="rc-artist-card">
                            <img src="/images/brand/rc-artist1.png" alt="차인필" />
                            <p className="rc-artist-name">차인필, 서울</p>
                            <p className="rc-artist-desc">서울 도시의 음영을 담는 거리 예술가, 라는 수식어로 불리는 차인필은 케이스티파이와 협업으로 폐케이스를 재료로 도시의 이야기를 담은 독창적인 작품을 만들었습니다.</p>
                        </div>
                        <div className="rc-artist-card">
                            <img src="/images/brand/rc-artist2.png" alt="코디 호이트" />
                            <p className="rc-artist-name">코디 호이트(Cody Hoyt)</p>
                            <p className="rc-artist-desc">뉴욕에서 활동 중인 코디 호이트는 2012년 Parsons 대학교 재학 시절부터 재활용 소재를 활용한 독창적인 조각 작품으로 주목받았으며, 케이스티파이의 Re/CASETIFY를 통해 단순한 폐케이스를 독창적인 예술로 새롭게 탄생시켰습니다.</p>
                        </div>
                    </div>
                </div>
                <div className="rc-gallery-right">
                    <p className="rc-gallery-title">지속가능한 스타일, 분명한 목적을 담다</p>
                    <div className="rc-gallery-product-row">
                        <div className="rc-product-card">
                            <img src="/images/brand/rc-product1.png" alt="RE/CLAIMED" />
                            <p className="rc-product-name">RE/CLAIMED 대항 설치물<br />K11 MUSEA에 설치된 뱅커</p>
                            <p className="rc-product-desc">RE/CLAIMED은 케이스티파이 CE와 Re/RECLAIMED 아티스트 팀이 CASETIFY를 대표하여 기획하였으며, 폐케이스를 활용한 조각물을 통해 환경의 중요성을 알렸습니다.</p>
                        </div>
                        <div className="rc-product-card">
                            <img src="/images/brand/rc-product2.png" alt="스마트폰 스탠드" />
                            <p className="rc-product-name">스마트폰 스탠드</p>
                            <p className="rc-product-desc">재활용 소재로 만들어진 스마트폰 스탠드로, 지속 가능한 디자인과 실용성을 동시에 갖추고 있으며 케이스티파이 공식 홈페이지를 통해 구매 가능합니다.</p>
                        </div>
                    </div>
                </div>
            </section>

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