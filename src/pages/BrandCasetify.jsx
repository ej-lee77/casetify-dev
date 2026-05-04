import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'
import './scss/BrandCasetify.scss'

// ─── STORY 탭 ───────────────────────────────────────
function StoryTab() {
    return (
        <div className="bc-story">
            <div className="bc-hero">
                <img src="/images/brand/story-hero.png" alt="STORY" />
                <h2 className="bc-hero-title">STORY</h2>
            </div>
            <section className="bc-intro">
                <h3>우리는 케이스티파이입니다!</h3>
                <p>케이스티파이는 일상의 품격을 높이는 테크 액세서리를 만듭니다.</p>
            </section>
            <section className="bc-img-center">
                <img src="/images/brand/story-product.png" alt="케이스티파이 매장" />
            </section>
            <section className="bc-split">
                <div className="bc-split-text">
                    <p className="bc-lead">홍콩과 로스앤젤레스에 본사를 두고 있는 케이스티파이는 크리에이티브 정신을 전하는 글로벌 브랜드입니다.</p>
                    <p>2011년 아이폰이 출시되었을 때, 케이스티파이의 공동 창업자이자 CEO인 Wes Ng에게 영감이 찾아왔습니다.</p>
                    <p>새로운 아이폰을 보호하기 위한 케이스들을 살펴보던 중, 무겁고 지루하고, 그의 스타일과도 전혀 어울리지 않는 선택지들에 실망했죠.</p>
                </div>
                <div className="bc-split-img">
                    <img src="/images/brand/story-ceo-left.png" alt="케이스티파이 제품" />
                    <div className="bc-split-caption">
                        <p>디자이너이자 혁신가인 그는<br />이를 도전으로 받아들였습니다</p>
                        <p>목표는 갖고 싶고, 세련되고, 독특한 케이스였습니다</p>
                        <p>부담스럽지 않은 부피에 어떤 스타일이든 포인트를 줄 수 있는 케이스를 만드는 것이었죠</p>
                    </div>
                </div>
            </section>
            <section className="bc-full-img">
                <img src="/images/brand/story-ceo-right.png" alt="케이스티파이 케이스" />
            </section>
            <section className="bc-quote">
                <blockquote>" 케이스티파이는 자신의 사진으로 케이스를 커스텀하는 것에서 시작되었습니다.</blockquote>
                <p>10년이 지난 지금,<br />케이스티파이는 유니크한 디자인으로 자신만의 바이브를 표현할 수 있는 신나는 방법을 제시합니다.</p>
                <p>게다가, 최고의소재로 테크 기기를 보호할 수도 있죠."</p>
            </section>
        </div>
    )
}

// ─── STANDARD 탭 ────────────────────────────────────
const STANDARD_SLIDES = [
    { img: '/images/brand/clear-case.png', alt: '클리어 케이스', link: '/search?q=클리어케이스' },
    { img: '/images/brand/travel.png', alt: '트래블 캐리어', link: '/search?q=수트케이스' },
    { img: '/images/brand/glaze-case.png', alt: '글레이즈 케이스', link: '/search?q=글레이즈케이스' },
    { img: '/images/brand/ring-stand.png', alt: '링스탠드', link: '/search?q=링스탠드' },
    { img: '/images/brand/body-strap.png', alt: '바디스트랩', link: '/search?q=바디스트랩' },
    { img: '/images/brand/bounce-case.png', alt: '바운스 케이스', link: '/search?q=바운스케이스' },
    { img: '/images/brand/impact-case.png', alt: '임팩트 케이스', link: '/search?q=임팩트케이스' },
]

function StandardTab() {
    const navigate = useNavigate()
    return (
        <div className="bc-standard">
            <div className="bc-hero">
                <img src="/images/brand/standard-hero.png" alt="STANDARD" />
                <h2 className="bc-hero-title">STANDARD</h2>
            </div>
            <section className="bc-intro">
                <h3>삶은 예측불가! 케이스티파이는 늘 당신과 함께!</h3>
                <p>케이스티파이와 함께라면 실망하지 않을 거에요.<br />당신의 기준이 곧 케이스티파이의 기준이니까요.</p>
            </section>
            <section className="bc-img-center bc-img-center--narrow">
                <img src="/images/brand/standard-feature.png" alt="standard feature" />
            </section>
            <section className="bc-std-text">
                <p className="bc-std-emphasis">다른 이들이 <strong>'이 정도면 충분한'</strong> 보호력을 이야기할 때,<br />케이스티파이의 기준은 당신의 실제 삶에서 시작됩니다.</p>
                <p>일상 속의 사소한 낙하부터 짜릿한 모험, 그리고 케이스의 진정한 성능을 시험하는 생생한 도전까지,<br />케이스티파이는 당신의 모든 순간을 지키기 위해 끊임없이 혁신합니다.</p>
                <p>우리가 만들어내는 모든 제품은 현실에서 만들어진 끝없는 도전에서 비로소 탄생할 수 있습니다.</p>
                <p className="bc-std-cta-text">케이스티파이가 선보이는 기준을 경험해 보세요.</p>
            </section>
            <section className="bc-swiper-section">
                <Swiper modules={[Navigation]} navigation slidesPerView={1} loop={true} className="bc-swiper">
                    {STANDARD_SLIDES.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div className="bc-slide">
                                <img src={slide.img} alt={slide.alt} />
                                <button className="bc-slide-btn" onClick={() => navigate(slide.link)}>제품보러가기</button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <section className="bc-warranty">
                <div className="bc-warranty-inner">
                    <div className="bc-warranty-left">
                        <h4>100% 만족 보장</h4>
                        <p>고객님의 만족이 저희의 최우선 입니다.<br />구매하신 모든 CASETIFY 제품에 대해 다음과 같은 품질 보증 및 만족 보장 계획을 도입하고 있습니다.</p>
                    </div>
                    <div className="bc-warranty-badge">
                        <span>100%</span>
                        <span>Satisfaction</span>
                    </div>
                </div>
            </section>
            <section className="bc-guarantee">
                <h3 className="bc-section-title">제품 보증 기간</h3>
                <div className="bc-guarantee-grid">
                    <div className="bc-guarantee-card bc-guarantee-card--blue">
                        <div className="bc-guarantee-header">
                            <span className="bc-guarantee-period">10일 이내</span>
                            <span className="bc-guarantee-tag">모든 고객님</span>
                        </div>
                        <p>구매하신 제품이 마음에 들지 않으신다면, <strong>10일 내에 주문하신 모든 제품을 조건 없이 반품</strong> 또는 교환해드립니다.</p>
                        <ol><li>일부 제품 및 주문 건에만 적용</li><li>제품 구매 후 10일 이내 | T&C applies*</li></ol>
                    </div>
                    <div className="bc-guarantee-card bc-guarantee-card--blue">
                        <div className="bc-guarantee-header">
                            <span className="bc-guarantee-period">6개월</span>
                            <span className="bc-guarantee-tag">모든 고객님</span>
                        </div>
                        <p>당사의 <strong>6개월 제품 보증</strong>은 손상된 제품을 교환해 드립니다.</p>
                        <ol><li>일부 제품 및 주문 건에만 적용됩니다.</li><li>한 번 교환 | T&C applies*</li><li>반품/교환된 제품이 단종된 제품일 경우 동일한 금액 또는 그보다 낮은 금액의 제품으로 적용됩니다.</li></ol>
                    </div>
                    <div className="bc-guarantee-card bc-guarantee-card--pink">
                        <div className="bc-guarantee-header">
                            <span className="bc-guarantee-period">12개월</span>
                            <span className="bc-guarantee-tag bc-guarantee-tag--gold">골드 등급 회원</span>
                        </div>
                        <p><strong>골드 등급 회원</strong>에게는 6개월 제품 보증 기간 외의 <strong>6개월 특별 연장을 제공</strong>합니다.</p>
                        <ol><li>골드 회원으로 업그레이드 이후 발생한 주문 및 제품에 한하여 적용됩니다.</li><li>CASETiFY Club 골드 등급 회원에게만 해당 (전 지역)</li><li>구매 후 12개월 이내</li><li>한 번 교환 | T&C applies*</li><li>반품/교환된 제품이 단종된 제품일 경우 동일한 금액 또는 그보다 낮은 금액의 제품으로 적용됩니다.</li></ol>
                    </div>
                </div>
            </section>
            <section className="bc-care">
                <p className="bc-care-sub">다음은 CASETIFY 제품의 사용 수명을 보장하기 위한 소재별 관리 팁입니다.</p>
                <h3 className="bc-section-title">제품 케어 팁</h3>
                <div className="bc-care-grid">
                    <div className="bc-care-card"><span className="bc-care-num">1</span><img src="/images/brand/care1.png" alt="케어팁1" /><p>깨끗하고 부드러운 천을 물에 약간 적셔 케이스를 청소해 주십시오.</p></div>
                    <div className="bc-care-card"><span className="bc-care-num">2</span><img src="/images/brand/care2.png" alt="케어팁2" /><p>알코올 성분이 함유된 소독제 사용을 삼가 주십시오</p></div>
                    <div className="bc-care-card"><span className="bc-care-num">3</span><img src="/images/brand/care3.png" alt="케어팁3" /><p>표백 제품이나 유사 화학 물질을 사용하여 케이스를 청소하지 마십시오.</p></div>
                </div>
            </section>
        </div>
    )
}

// ─── RE:CASTiFY 탭 ───────────────────────────────────
function RecastifyTab() {
    return (
        <div className="bc-recastify">
            <div className="bc-hero">
                <img src="/images/brand/rc-hero.png" alt="RE:CASTiFY" />
                <h2 className="bc-hero-title">RE:CASETiFY</h2>
            </div>
            <section className="bc-intro">
                <h3>케이스티파이의 지속 가능한 미래</h3>
                <p>우리는 지속 가능한 미래를 향한 여정에 사명감을 갖고 나아가고 있습니다.<br />보다 친환경적인 미래에 대한 명확한 비전을 가지고<br />버진 플라스틱 사용을 줄이기 위해 전념하고 있습니다.</p>
            </section>
            <section className="bc-rc-goal">
                <div className="bc-rc-goal-img">
                    <img src="/images/brand/rc-goal.png" alt="2030년까지의 목표" />

                    <div className="bc-rc-goal-overlay">
                        <h3 className="rc-title">
                            <span>RE:Castify</span>
                            <br />
                            <span>2030년까지의 목표</span>
                        </h3>

                        <div className="rc-goal-circle">
                            <div>
                                <p>-6.42%</p>
                                <p>에너지 집중도</p>
                                <p>홍콩 리테일 매장 및 사무실 연면적(GFA)당 생산량 기준</p>
                            </div>

                            <div>
                                <p>-22%</p>
                                <p>온실가스 배출량</p>
                                <p>홍콩 리테일 매장 및 사무실 연면적(GFA)당 생산량 기준</p>
                            </div>

                            <div>
                                <p>100%</p>
                                <p>재활용 비율</p>
                                <p>홍콩 생산 기지의 생산 폐기물</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bc-rc-crisis">
                <div className="bc-rc-crisis-img"><img src="/images/brand/rc-crisis.png" alt="플라스틱 위기" /></div>
                <div className="bc-rc-crisis-text">
                    <p>플라스틱 위기<br />전 세계에서는 매년 4억 6천만 톤에 달하는 플라스틱이 생산되고 있습니다.</p>
                    <p>이는 세상에서 가장 큰 포유류인 대왕고래 320만 마리와 맞먹는 무게이죠.</p>
                    <p>하지만 친환경 기술로 플라스틱 사용을 줄이고, 다시 쓰고, 재활용한다면 이 거대한 숫자도 바꿔나갈 수 있습니다</p>
                </div>
            </section>
            <section className="bc-rc-stats">
                <div className="bc-rc-stat"><span>01</span><p>2021년부터 210만 개<br />이상의 폰케이스를<br />재활용했습니다.</p></div>
                <div className="bc-rc-stat"><span>02</span><p>10만 5천 킬로그램이 넘는<br />플라스틱이 매립되지 않도록<br />막았습니다.</p></div>
                <div className="bc-rc-stat"><span>03</span><p>Earthday.org 팀과<br />함께 503,000 그루가<br />넘는 나무를 심었습니다.</p></div>
                <div className="bc-rc-stat"><span>04</span><p>탄소 배출을<br />절감하였습니다.</p></div>
            </section>
            <section className="bc-intro">
                <h3>폐기물을 re/IMAGINE 하다<br />: Re/CASETiFY™를 소개합니다</h3>
            </section>
            <section className="bc-rc-steps">
                <div className="bc-rc-step">
                    <div className="img-box">
                        <img src="/images/brand/rc-step1.png" alt="낡은 케이스 수거" />
                    </div>
                    <p>낡은 케이스를<br />우리에게 건네주세요</p>
                </div>

                <div className="bc-rc-step">
                    <div className="img-box">
                        <img src="/images/brand/rc-step2.png" alt="재활용 파트너" />
                    </div>
                    <p>독립된 재활용 파트너와 협력<br />하여 케이스를 처리합니다</p>
                </div>

                <div className="bc-rc-step">
                    <div className="img-box">
                        <img src="/images/brand/rc-step3.png" alt="재활용 소재" />
                    </div>
                    <p>재활용 소재를 추출합니다</p>
                </div>
            </section>
            <section className="bc-rc-artist">
                <div className="br-rc-artist-left">
                    <h3>폐기물에 새로운 시선을,<br />창작자에게는 새로운 가능성을</h3>
                    <div className="bc-rc-artist-card-wrapper">
                        <div className="bc-rc-artist-card"><img src="/images/brand/rc-artist1.png" alt="차인필" /><p className="bc-rc-artist-name">차인철, 서울</p><p>서울 도시의 생명감 넘치는 거리 예술가 차인철은 케이스티파이와의 함께 만든 환경 친친 폰케이스를 통해 도시의 음영과 함께 직접 만들었습니다.</p></div>
                        <div className="bc-rc-artist-card"><img src="/images/brand/rc-artist2.png" alt="코디 호이트" /><p className="bc-rc-artist-name">코디 호이트(Cody Hoyt)</p><p>브루클린을 기반으로 활동하는 아티스트 코디 호이트(CodyHoyt)는 금속 폐문 및 잡체적인 협력에 영향을 받아 재해석된 폰케이스를 재탄생시켰습니다.</p></div>
                    </div>
                </div>
                <div className="br-rc-artist-right">
                    <h3>지속가능한 스타일,<br />분명한 목적을 담다</h3>
                    <div className="bc-rc-artist-card-wrapper">
                        <div className="bc-rc-artist-card"><img src="/images/brand/rc-artist3.png" alt="RE/CLAIMED" /><p className="bc-rc-artist-name">RE/CLAIMED 대형 설치를 K11 MUSEA에 설치된 벤치</p><p>RE/CLAIMED의 대형 설치물은 지속 가능성이 아름다움과의 대화와 영향력을 동시에 거둘 수 있음을 보여줍니다.</p></div>
                        <div className="bc-rc-artist-card"><img src="/images/brand/rc-artist4.png" alt="스마트폰 스탠드" /><p className="bc-rc-artist-name">스마트폰 스탠드</p><p>한편, 폰 하여서만 한국 성기들 대구 및 패밀리에서 이 아이폰-RE/IMAGINED 기프트도 100% 재활용 소재로 제작됩니다.</p></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

// ─── CLUB 탭 ────────────────────────────────────────
function ClubTab() {
    const [openFaq, setOpenFaq] = useState(null)
    const navigate = useNavigate()

    const faqs = [
        { q: 'CASETiFY Club은 어떻게 가입하나요?', a: 'CASETiFY 웹사이트에서 회원가입을 완료하시면 자동으로 CLUB 멤버가 되십니다. 별도의 가입 절차나 비용이 없으며, 신규 가입 시 첫 구매에 사용 가능한 15% 웰컴 쿠폰이 즉시 발급됩니다.' },
        { q: '등급은 언제, 어떻게 올라가나요?', a: '최근 12개월 누적 구매 금액이 USD 50 / 120 / 200을 넘으면 각각 BRONZE · SILVER · GOLD 등급으로 자동 승급됩니다. 결제 후 10일이 지난 시점에 포인트가 확정됩니다.' },
        { q: '멤버십 유효 기간은 얼마인가요?', a: '멤버십은 마지막 구매일 기준 12개월 동안 유지되며, 새 주문이 발생할 때마다 자동으로 12개월이 연장됩니다.' },
        { q: '여러 개의 계정을 하나로 합칠 수 있나요?', a: '현재 계정 통합 기능은 제공되지 않습니다. 다만 비회원 게스트 결제 후 100일 이내에 동일한 이메일로 회원가입을 진행하시면 해당 주문 금액이 자동 누적되어 적립됩니다.' },
        { q: '어떤 구매가 포인트 적립 대상에서 제외되나요?', a: '10일 이내 취소 또는 환불된 주문, 재판매를 위한 구매, 배송비 및 수수료는 포인트 적립 대상에서 제외됩니다.' },
        { q: '생일 기프트는 매년 받을 수 있나요?', a: 'SILVER · GOLD 등급을 유지하시는 한 매년 생일 달 첫째 날 자동으로 발급됩니다.' },
    ]

    const benefits = [
        { label: '등급 할인 바우처', bronze: '15%', silver: '20%', gold: '30%' },
        { label: '웰컴 쿠폰', bronze: '✓', silver: '✓', gold: '✓' },
        { label: '신제품 사전 주문', bronze: '—', silver: '✓', gold: '✓' },
        { label: '비공개 세일 초대', bronze: '—', silver: '✓', gold: '✓' },
        { label: '생일 기프트 바우처', bronze: '—', silver: '✓', gold: '✓' },
        { label: '전 상품 상시 할인', bronze: '—', silver: '—', gold: '15% OFF' },
        { label: '제품 보증 기간', bronze: '6개월', silver: '6개월', gold: '12개월' },
        { label: '한정판 우선 구매', bronze: '—', silver: '—', gold: '✓' },
        { label: '전용 고객지원', bronze: '—', silver: '—', gold: '✓' },
    ]

    return (
        <div className="bc-club">
            <div className="bc-hero">
                <img src="/images/brand/club-hero.png" alt="CASETiFY CLUB" />
                <h2 className="bc-hero-title">CASETiFY CLUB</h2>
            </div>

            <section className="bc-club-intro">
                <div className="bc-inner">
                    <p className="bc-club-eyebrow">CASETiFY CLUB</p>
                    <h3>케이스티파이의 새로운 일상,<br />지금 클럽에서 시작하세요</h3>
                    <p className="bc-club-lead">CASETiFY Club은 무료로 가입할 수 있는 멤버십 프로그램입니다.<br />쇼핑하며 적립한 포인트로 등급을 올리고, 등급에 따라 다양한 혜택을 누려보세요.<br />선주문 권한, 비공개 세일 초대, 생일 기프트, 연장 보증까지 — 케이스티파이만의 특별한 경험이 시작됩니다.</p>
                    <div className="bc-club-stats">
                        <div className="bc-club-stat"><span className="bc-club-stat-num">3<em>단계</em></span><span className="bc-club-stat-lbl">BRONZE / SILVER / GOLD 등급</span></div>
                        <div className="bc-club-stat"><span className="bc-club-stat-num">$1<em> = 1P</em></span><span className="bc-club-stat-lbl">USD 1당 1포인트 적립</span></div>
                        <div className="bc-club-stat"><span className="bc-club-stat-num">12<em>개월</em></span><span className="bc-club-stat-lbl">멤버십 유효 기간</span></div>
                        <div className="bc-club-stat"><span className="bc-club-stat-num">$0</span><span className="bc-club-stat-lbl">평생 무료 가입</span></div>
                    </div>
                </div>
            </section>

            <section className="bc-club-how">
                <div className="bc-inner">
                    <div className="bc-club-how-head">
                        <div><p className="bc-club-eyebrow">HOW IT WORKS</p><h3>간단한 세 단계,<br />지금 바로 시작하세요</h3></div>
                        <p>별도의 멤버십 비용 없이,<br />누구나 케이스티파이 회원이 되는 순간 자동으로 클럽에 가입됩니다.</p>
                    </div>
                    <div className="bc-club-steps">
                        <div className="bc-club-step"><p className="bc-club-step-num">STEP 01</p><p className="bc-club-step-title">무료로 가입하기</p><p>CASETiFY 계정을 만들면 자동으로 CLUB 멤버가 됩니다. 신규 가입 시 첫 구매에 사용할 수 있는 15% 웰컴 쿠폰이 즉시 발급됩니다.</p><span className="bc-club-step-glyph">＋</span></div>
                        <div className="bc-club-step"><p className="bc-club-step-num">STEP 02</p><p className="bc-club-step-title">포인트 적립하기</p><p>USD 1당 1포인트가 자동 적립됩니다. 결제 후 10일이 지난 시점에 적립이 확정되며, 누적 포인트에 따라 등급이 결정됩니다.</p><span className="bc-club-step-glyph">＄</span></div>
                        <div className="bc-club-step"><p className="bc-club-step-num">STEP 03</p><p className="bc-club-step-title">등급별 혜택 누리기</p><p>Bronze → Silver → Gold 순으로 등급이 올라갈 때마다 더 큰 할인과 단독 혜택이 열립니다. 마지막 구매일 기준 12개월 동안 유지됩니다.</p><span className="bc-club-step-glyph">★</span></div>
                    </div>
                </div>
            </section>

            <section className="bc-club-tiers">
                <div className="bc-inner">
                    <p className="bc-club-eyebrow">MEMBERSHIP TIERS</p>
                    <h3>세 가지 등급, 점점 커지는 즐거움</h3>
                    <p className="bc-club-tier-sub">연간 누적 구매 금액에 따라 자동으로 등급이 변경됩니다.<br />상위 등급으로 올라갈수록 더 많은 혜택을 만나보실 수 있습니다.</p>
                    <div className="bc-club-tier-grid">
                        <div className="bc-club-tier bc-club-tier--bronze">
                            <div className="bc-club-tier-ribbon" /><p className="bc-club-tier-tag">TIER 01</p>
                            <div className="bc-club-tier-coin">B</div>
                            <p className="bc-club-tier-name">BRONZE</p><p className="bc-club-tier-req">연간 누적 <strong>USD 50+</strong> · 50P</p>
                            <ul><li>15% 할인 바우처</li><li>신규 가입 웰컴 쿠폰</li><li>회원 전용 뉴스레터</li><li>주문 추적 우선 알림</li></ul>
                        </div>
                        <div className="bc-club-tier bc-club-tier--silver">
                            <div className="bc-club-tier-ribbon" /><p className="bc-club-tier-tag">TIER 02</p>
                            <div className="bc-club-tier-coin">S</div>
                            <p className="bc-club-tier-name">SILVER</p><p className="bc-club-tier-req">연간 누적 <strong>USD 120+</strong> · 120P</p>
                            <ul><li>20% 할인 바우처</li><li>신제품 사전 주문 권한</li><li>비공개 세일 우선 초대</li><li>생일 기프트 바우처</li><li>Bronze 등급의 모든 혜택</li></ul>
                        </div>
                        <div className="bc-club-tier bc-club-tier--gold">
                            <div className="bc-club-tier-ribbon" /><p className="bc-club-tier-tag">TIER 03 · TOP</p>
                            <div className="bc-club-tier-coin">G</div>
                            <p className="bc-club-tier-name">GOLD</p><p className="bc-club-tier-req">연간 누적 <strong>USD 200+</strong> · 200P</p>
                            <ul><li>30% 할인 바우처</li><li>전 상품 상시 15% 할인</li><li>12개월 연장 제품 보증</li><li>한정판 컬렉션 우선 구매</li><li>전용 고객지원 라인</li><li>Silver 등급의 모든 혜택</li></ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bc-club-compare">
                <div className="bc-inner">
                    <p className="bc-club-eyebrow">BENEFITS AT A GLANCE</p>
                    <h3>한눈에 보는 등급별 혜택</h3>
                    <table className="bc-club-table">
                        <thead><tr><th>혜택</th><th className="bronze">BRONZE</th><th className="silver">SILVER</th><th className="gold">GOLD</th></tr></thead>
                        <tbody>{benefits.map((row, i) => (<tr key={i}><td>{row.label}</td><td>{row.bronze}</td><td>{row.silver}</td><td className="gold">{row.gold}</td></tr>))}</tbody>
                        <tfoot><tr><td colSpan={4}>* 모든 혜택은 유효한 멤버십 기간 동안 적용되며, 일부 컬래버레이션 / 아카이브 / 세일 컬렉션은 제외될 수 있습니다.</td></tr></tfoot>
                    </table>
                </div>
            </section>

            <section className="bc-club-earn">
                <div className="bc-inner">
                    <p className="bc-club-eyebrow">EARN POINTS</p>
                    <h3>포인트는 이렇게 쌓여요</h3>
                    <p className="bc-club-earn-sub">쇼핑할 때마다 자동으로 포인트가 적립됩니다.<br />마지막 구매일로부터 12개월 동안의 누적 포인트가 등급을 결정합니다.</p>
                    <div className="bc-club-earn-grid">
                        <div className="bc-club-earn-card"><div className="bc-club-earn-ico bc-club-earn-ico--usd">$1</div><div><h4>구매 금액 적립</h4><p>온라인 / 오프라인 매장에서의 정상가 구매 금액 USD 1당 1포인트가 자동 적립됩니다.</p><span className="bc-club-earn-pts">+1 POINT / $1</span></div></div>
                        <div className="bc-club-earn-card"><div className="bc-club-earn-ico">✦</div><div><h4>신규 회원 보너스</h4><p>처음 가입하시면 첫 구매에 사용 가능한 15% 웰컴 쿠폰을 즉시 받으실 수 있어요.</p><span className="bc-club-earn-pts">WELCOME 15%</span></div></div>
                        <div className="bc-club-earn-card"><div className="bc-club-earn-ico">🎂</div><div><h4>생일 기프트</h4><p>SILVER · GOLD 등급 회원분께는 매년 생일 달에 단독 기프트 바우처가 발급됩니다.</p><span className="bc-club-earn-pts">SILVER · GOLD ONLY</span></div></div>
                        <div className="bc-club-earn-card"><div className="bc-club-earn-ico">↻</div><div><h4>자동 등급 갱신</h4><p>새 주문이 발생할 때마다 멤버십 유효 기간이 12개월 자동 연장됩니다.</p><span className="bc-club-earn-pts">AUTO RENEWAL · 12M</span></div></div>
                    </div>
                    <div className="bc-club-duo">
                        <div className="bc-club-duo-blk bc-club-duo-blk--welcome"><p className="bc-club-duo-lbl">WELCOME GIFT</p><p className="bc-club-duo-title">신규 가입 즉시 받는 첫 쇼핑 쿠폰</p><p className="bc-club-duo-big">15% OFF</p><p>CASETiFY Club에 처음 합류하신 분께 드리는 단 한 번의 첫 구매 혜택입니다.</p></div>
                        <div className="bc-club-duo-blk bc-club-duo-blk--bday"><p className="bc-club-duo-lbl">BIRTHDAY GIFT</p><p className="bc-club-duo-title">생일 달, 케이스티파이가 드리는 선물</p><p className="bc-club-duo-big">매년 ₩</p><p>SILVER 이상 등급 회원께 매년 생일 달 첫째 날 자동으로 발급됩니다.</p></div>
                    </div>
                </div>
            </section>

            <section className="bc-club-faq faq-section">
                <div className="faq-inner">
                    <h2 className="section-heading">자주 묻는 질문(FAQ)</h2>

                    <div className="faq-accordion">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`faq-item ${openFaq === i ? "open" : ""}`}
                            >
                                <button
                                    type="button"
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span>{faq.q}</span>

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

                                {openFaq === i && (
                                    <div className="faq-answer">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bc-club-cta">
                <div className="bc-inner">
                    <p className="bc-club-eyebrow">JOIN CASETiFY CLUB</p>
                    <h3>지금 바로,<br />CLUB의 일원이 되세요</h3>
                    <p>무료 가입과 동시에 첫 구매 15% 쿠폰이 발급됩니다.</p>
                    <div className="bc-club-cta-btns">
                        <button className="bc-club-cta-primary" onClick={() => navigate('/join')}>무료로 가입하기 →</button>
                        <button className="bc-club-cta-ghost">멤버십 약관 보기</button>
                    </div>
                    <p className="bc-club-cta-legal">* 본 페이지의 혜택 내용은 운영 정책에 따라 사전 고지 없이 변경될 수 있습니다.</p>
                </div>
            </section>
        </div>
    )
}

// ─── 메인 페이지 ─────────────────────────────────────
const TABS = [
    { id: 'story', label: 'STORY' },
    { id: 'standard', label: 'STANDARD' },
    { id: 'recastify', label: 'RE:CASTiFY' },
    { id: 'club', label: 'CLUB' },
]

export default function BrandCasetify() {
    const [activeTab, setActiveTab] = useState('story')
    return (
        <div className="bc-page">
            <nav className="bc-tab-nav">
                <div className="bc-inner">
                    {TABS.map((tab) => (
                        <button key={tab.id} className={`bc-tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>
            <div className="bc-tab-content">
                {activeTab === 'story' && <StoryTab />}
                {activeTab === 'standard' && <StandardTab />}
                {activeTab === 'recastify' && <RecastifyTab />}
                {activeTab === 'club' && <ClubTab />}
            </div>
        </div>
    )
}