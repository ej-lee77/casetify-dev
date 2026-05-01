import React, { useState } from 'react'
import './scss/BrandCasetify.scss'

// ─── STORY 탭 ───────────────────────────────────────
function StoryTab() {
    return (
        <div className="store-story">
            {/* 히어로 - 기존 유지 */}
            <div className="story-hero">
                <img src="/images/brand/story-hero.png" alt="CASTIFY STORY" />
                <h2 className="story-hero-title">CASTIFY STORY</h2>
            </div>

            {/* 이니스프리 스타일: 큰 배경 텍스트 + 이미지왼쪽/텍스트오른쪽 */}
            <div className="innisfree-section">
                <p className="innisfree-bg-title">CASETIFY</p>
                <div className="innisfree-row">
                    <div className="innisfree-row-img">
                        <img src="/images/brand/story-product.png" alt="케이스티파이 제품" />
                    </div>
                    <div className="innisfree-row-text">
                        <p>
                            홍콩과 로스앤젤레스에 본사를 두고 있는 케이스티파이는<br />
                            크리에이티브 정신을 전하는 글로벌 브랜드입니다.
                        </p>
                        <p>
                            2011년 아이폰이 출시되었을 때,<br />
                            케이스티파이의 공동 창업자이자 CEO인 Wes Ng에게<br />
                            영감이 찾아왔습니다.
                        </p>
                        <p>
                            새로운 아이폰을 보호하기 위한 케이스들을 살펴보던 중,<br />
                            무겁고 지루하고, 그의 스타일과도 전혀 어울리지 않는<br />
                            선택지들에 실망했죠.
                        </p>
                    </div>
                </div>
            </div>

            {/* 텍스트 왼쪽 + 이미지 오른쪽 */}
            <div className="innisfree-section">
                <p className="innisfree-bg-title right">DESIGN</p>
                <div className="innisfree-row reverse">
                    <div className="innisfree-row-text">
                        <p className="innisfree-headline">
                            디자이너이자 혁신가인 그는<br />이를 도전으로 받아들였습니다
                        </p>
                        <p>목표는 갖고 싶고, 세련되고, 독특한 케이스였습니다</p>
                        <p>부담스럽지 않은 부피에 어떤 스타일이든<br />포인트를 줄 수 있는 케이스를 만드는 것이었죠</p>
                    </div>
                    <div className="innisfree-row-img">
                        <img src="/images/brand/story-ceo-left.png" alt="제품사진" />
                    </div>
                </div>
            </div>

            {/* 풀 이미지 */}
            <section className="innisfree-full-img">
                <img src="/images/brand/story-ceo-right.png" alt="케이스티파이 케이스" />
            </section>

            {/* 인용구 */}
            <section className="innisfree-quote">
                <blockquote>
                    "디자이너로서 보호 기능과<br />
                    아름다움을 동시에 갖춘 무언가를 창조하고 싶었습니다.<br />
                    누구나 자신의 개성과 열정, 독창성을 표현할 수 있는<br />
                    새하얀 빈 캔버스처럼요."
                </blockquote>
                <cite>— Wes Ng, 케이스티파이 공동 창업자 &amp; CEO</cite>
            </section>

            {/* 텍스트 중앙 */}
            <section className="innisfree-center-text">
                <h3>
                    자신의 개성을<br />
                    표현하는 새로운 방법
                </h3>
                <p>
                    케이스티파이는 자신의 사진으로 케이스를 커스텀하는 것에서 시작되었습니다.<br />
                    10년이 지난 지금, 케이스티파이는 유니크한 디자인으로<br />
                    자신만의 바이브를 표현할 수 있는 신나는 방법을 제시합니다.<br />
                    게다가, 최고의 소재로 테크 기기를 보호할 수도 있죠.
                </p>
            </section>

            {/* 풀 이미지 2 */}
            <section className="innisfree-full-img">
                <img src="/images/brand/story-product2.png" alt="케이스티파이 제품2" />
            </section>

            {/* CTA */}
            <section className="innisfree-cta">
                <p>
                    케이스티파이를 통해<br />
                    당신의 생활을 한층 더 자유롭고 돋보이게<br />
                    마음껏 누려보세요!
                </p>
            </section>

            {/* 하단 2분할 배너 */}
            <section className="innisfree-bottom-banners">
                <div className="innisfree-bottom-banner">
                    <img src="/images/brand/standard-hero.png" alt="스탠다드" />
                    <div className="innisfree-banner-text">
                        <p className="eyebrow">CASETIFY</p>
                        <p className="title">STANDARD</p>
                    </div>
                </div>
                <div className="innisfree-bottom-banner">
                    <img src="/images/brand/rc-hero.png" alt="리캐스티파이" />
                    <div className="innisfree-banner-text">
                        <p className="eyebrow">CASETIFY</p>
                        <p className="title">RE:CASTiFY</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

// ─── STANDARD 탭 ────────────────────────────────────
function StandardTab() {
    return (
        <div className="store-standard">
            {/* 히어로 - 기존 유지 */}
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

            {/* 이니스프리 스타일: 큰 배경 텍스트 + 이미지왼쪽/텍스트오른쪽 */}
            <div className="innisfree-section">
                <p className="innisfree-bg-title">PROTECT</p>
                <div className="innisfree-row">
                    <div className="innisfree-row-img">
                        <img src="/images/brand/standard-feature.png" alt="standard feature" />
                    </div>
                    <div className="innisfree-row-text">
                        <p className="innisfree-headline">
                            더 오래 견디는<br />기기를 위해
                        </p>
                        <p>
                            케이스티파이는 항상 여러분 곁에 있습니다.<br />
                            경험한 적 없는 낙하 충격 보호 성능을 경험해보세요.
                        </p>
                        <p>
                            일상을 더 안전하게, 더 스타일리시하게,<br />
                            그 모든 게 케이스티파이에 담겨 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 텍스트 중앙 */}
            <section className="innisfree-center-text">
                <h3>
                    자연의 힘을<br />
                    피부에 전하는<br />
                    K-Tech Protection
                </h3>
                <p>
                    케이스티파이의 전문 연구 개발팀은 혁신적인 보호 솔루션을 찾기 위해<br />
                    끊임없이 연구하고 있습니다.
                </p>
                <p>
                    Duo-Lock™ by CASETiFY 본딩 기술이 적용된 케이스는<br />
                    한층 견고해진 범퍼 결합력으로 일상 속 모든 모험에서<br />
                    안심할 수 있는 안전감을 선사하죠.
                </p>
            </section>

            {/* 기술 카드 3열 */}
            <section className="innisfree-3col">
                <div className="innisfree-3col-grid">
                    <div className="innisfree-3col-card">
                        <img src="/images/brand/standard-tech1.png" alt="바운스 케이스" />
                        <p className="card-title">바운스 케이스</p>
                    </div>
                    <div className="innisfree-3col-card">
                        <img src="/images/brand/standard-tech2.png" alt="크로스바디 스트랩" />
                        <p className="card-title">크로스바디 스트랩<br />블로그레이드 잠금 시스템</p>
                    </div>
                    <div className="innisfree-3col-card">
                        <img src="/images/brand/standard-tech3.png" alt="클리어 케이스" />
                        <p className="card-title">클리어 케이스<br />에어리 컬렉션</p>
                    </div>
                </div>
            </section>

            {/* 글레이즈 - 텍스트 왼쪽 + 이미지 오른쪽 */}
            <div className="innisfree-section">
                <p className="innisfree-bg-title right">GLAZE</p>
                <div className="innisfree-row reverse">
                    <div className="innisfree-row-text">
                        <p className="innisfree-headline">
                            글레이즈 케이스<br />
                            이너 프린팅 글레이즈 기법
                        </p>
                        <p>
                            변치 않는 당신의 컬러, 당신의 스타일.<br />
                            당신이 선택한 유쾌한 패턴과 컬러풀한 색상들은<br />
                            글레이즈 케이스의 글로시한 백플레이트 아래<br />
                            견고하게 봉인되어, 색이 바래거나 벗겨질 염려 없이<br />
                            변함없는 아름다움을 선사합니다.
                        </p>
                    </div>
                    <div className="innisfree-row-img">
                        <img src="/images/brand/standard-highlight.png" alt="글레이즈 케이스" />
                    </div>
                </div>
            </div>

            {/* 100% 만족 + 보증 */}
            <section className="standard-warranty">
                <div className="warranty-hero">
                    <div className="warranty-hero-top" />
                    <div className="warranty-satisfaction">
                        <p>100%</p>
                        <p>Satisfaction😊</p>
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

            {/* 케어 팁 */}
            <section className="innisfree-center-text">
                <h3>제품 케어 팁</h3>
            </section>
            <section className="innisfree-3col">
                <div className="innisfree-3col-grid">
                    <div className="innisfree-3col-card">
                        <p className="card-num">1</p>
                        <img src="/images/brand/care1.png" alt="케어팁1" />
                        <p>깨끗하고 부드러운 전용 물에 적신 천으로 케이스를 청소해 주세요.</p>
                    </div>
                    <div className="innisfree-3col-card">
                        <p className="card-num">2</p>
                        <img src="/images/brand/care2.png" alt="케어팁2" />
                        <p>알코올 성분이 함유된 소독제 사용을 삼가 주십시오.</p>
                    </div>
                    <div className="innisfree-3col-card">
                        <p className="card-num">3</p>
                        <img src="/images/brand/care3.png" alt="케어팁3" />
                        <p>표백 제품이나 유사 화학 물질을 사용하여 케이스를 청소하지 마십시오.</p>
                    </div>
                </div>
            </section>

            {/* 하단 2분할 배너 */}
            <section className="innisfree-bottom-banners">
                <div className="innisfree-bottom-banner">
                    <img src="/images/brand/story-hero.png" alt="스토리" />
                    <div className="innisfree-banner-text">
                        <p className="eyebrow">CASETIFY</p>
                        <p className="title">STORY</p>
                    </div>
                </div>
                <div className="innisfree-bottom-banner">
                    <img src="/images/brand/rc-hero.png" alt="리캐스티파이" />
                    <div className="innisfree-banner-text">
                        <p className="eyebrow">CASETIFY</p>
                        <p className="title">RE:CASTiFY</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

// ─── RE:CASTiFY 탭 ───────────────────────────────────
function RecastifyTab() {
    return (
        <div className="store-recastify">
            {/* 히어로 - 기존 유지 */}
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

            {/* 플라스틱 위기 - 이미지 왼쪽 + 텍스트 오른쪽 */}
            <div className="innisfree-section">
                <p className="innisfree-bg-title">PLASTIC</p>
                <div className="innisfree-row">
                    <div className="innisfree-row-img">
                        <img src="/images/brand/rc-crisis.png" alt="플라스틱 위기" />
                    </div>
                    <div className="innisfree-row-text">
                        <p className="innisfree-headline">플라스틱 위기</p>
                        <p>
                            전 세계에서는 매년 4억 6천만 톤에 달하는<br />
                            플라스틱이 생산되고 있습니다.
                        </p>
                        <p>
                            이는 세상에서 가장 큰 포유류인 대왕고래 320만 마리와<br />
                            맞먹는 무게이죠.
                        </p>
                        <p>
                            하지만 친환경 기술로 플라스틱 사용을<br />
                            줄이고, 다시 쓰고, 재활용한다면<br />
                            이 거대한 숫자도 바꿔나갈 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 숫자 통계 */}
            <section className="rc-stats">
                <div className="rc-stats-track">
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">01</span>
                        <p>2021년부터 210만 개<br />이상의 폰케이스를<br />재활용했습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">02</span>
                        <p>10만 5천 킬로그램이 넘는<br />플라스틱이 매립되지 않도록<br />막았습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">03</span>
                        <p>Earthday.org 팀과<br />함께 503 그루의 나무를<br />심었습니다.</p>
                    </div>
                    <div className="rc-stat-divider"><img src="/images/brand/rc-logo-sm.png" alt="casetify" /></div>
                    <div className="rc-stat-item">
                        <span className="rc-stat-num">04</span>
                        <p>탄소 배출을<br />절감하였습니다.</p>
                    </div>
                </div>
            </section>

            {/* re:IMAGINE - 텍스트 중앙 */}
            <section className="innisfree-center-text">
                <h3>
                    폐기물을 <em>re:IMAGINE</em> 하다<br />
                    : Re/CASETiFY™을 소개합니다
                </h3>
            </section>

            {/* 3단계 카드 */}
            <section className="innisfree-3col">
                <div className="innisfree-3col-grid">
                    <div className="innisfree-3col-card">
                        <img src="/images/brand/rc-step1.png" alt="낡은 케이스 수거" />
                        <p>낡은 케이스를 우리에게 건네주세요</p>
                    </div>
                    <div className="innisfree-3col-card">
                        <img src="/images/brand/rc-step2.png" alt="재활용 파트너" />
                        <p>독립된 재활용 파트너와 협력하여 케이스를 처리합니다</p>
                    </div>
                    <div className="innisfree-3col-card">
                        <img src="/images/brand/rc-step3.png" alt="재활용 소재" />
                        <p>재활용 소재를 추출합니다</p>
                    </div>
                </div>
            </section>

            {/* 풀 이미지 */}
            <section className="innisfree-full-img">
                <img src="/images/brand/rc-open-bg.png" alt="생각의 틀" />
            </section>

            {/* 인용구 */}
            <section className="innisfree-quote">
                <blockquote>
                    "창의력이 모여 생각의 틀을 넘어설 때,<br />
                    놀라운 일들이 일어납니다."
                </blockquote>
                <p>
                    이것은 하나의 창의적인 실험과도 같습니다: 디자이너와 아티스트,<br />
                    그리고 버려진 케이스가 만나면 무엇이 가능해질까요?
                </p>
            </section>

            {/* 텍스트 중앙 */}
            <section className="innisfree-center-text">
                <h3>
                    건강한 아름다움의<br />
                    완성
                </h3>
                <p>
                    "만약 우리가 고정된 생각의 틀에서 벗어나 생각한다면, 무엇이 가능해질까요?"<br />
                    가장 의미 있는 변화는 늘 그 질문에서 시작되기 때문입니다.
                </p>
            </section>

            {/* 아티스트 - 텍스트 왼쪽 + 이미지 오른쪽 */}
            <div className="innisfree-section">
                <p className="innisfree-bg-title right">ARTIST</p>
                <div className="innisfree-row reverse">
                    <div className="innisfree-row-text">
                        <p className="innisfree-headline">
                            폐기물에 새로운 시선을,<br />창작자에게는 새로운 가능성을
                        </p>
                        <p>
                            <strong>차인필, 서울</strong><br />
                            서울 도시의 음영을 담는 거리 예술가, 차인필은<br />
                            케이스티파이와 협업으로 폐케이스를 재료로<br />
                            도시의 이야기를 담은 독창적인 작품을 만들었습니다.
                        </p>
                        <p>
                            <strong>코디 호이트(Cody Hoyt)</strong><br />
                            뉴욕에서 활동 중인 코디 호이트는<br />
                            재활용 소재를 활용한 독창적인 조각 작품으로 주목받았습니다.
                        </p>
                    </div>
                    <div className="innisfree-row-img">
                        <img src="/images/brand/rc-artist1.png" alt="아티스트" />
                    </div>
                </div>
            </div>

            {/* 하단 2분할 배너 */}
            <section className="innisfree-bottom-banners">
                <div className="innisfree-bottom-banner">
                    <img src="/images/brand/story-hero.png" alt="스토리" />
                    <div className="innisfree-banner-text">
                        <p className="eyebrow">CASETIFY</p>
                        <p className="title">STORY</p>
                    </div>
                </div>
                <div className="innisfree-bottom-banner">
                    <img src="/images/brand/standard-hero.png" alt="스탠다드" />
                    <div className="innisfree-banner-text">
                        <p className="eyebrow">CASETIFY</p>
                        <p className="title">STANDARD</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

// ─── 메인 페이지 ─────────────────────────────────────
const TABS = [
    { id: 'story',     label: 'STORY' },
    { id: 'standard',  label: 'STANDARED' },
    { id: 'recastify', label: 'RE:CASTiFY' },
]

export default function Store() {
    const [activeTab, setActiveTab] = useState('story')

    return (
        <div className="store-page">
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

            <div className="store-tab-content">
                {activeTab === 'story'     && <StoryTab />}
                {activeTab === 'standard'  && <StandardTab />}
                {activeTab === 'recastify' && <RecastifyTab />}
            </div>
        </div>
    )
}
