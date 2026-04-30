import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { items as finalData } from '../data/finalData'
import { AUTH_FAQS } from '../data/authFaqs'
import './scss/BrandAuthentication.scss'

export default function BrandAuthentication() {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const [serialNumber, setSerialNumber] = useState('')
    const [openFaqId, setOpenFaqId] = useState(null)

    // 팝업 상태
    const [popup, setPopup] = useState(null)
    // popup: null | 'login' | 'success' | 'fail'

    const handleAuthenticate = () => {
        if (!serialNumber.trim()) return

        // 로그인 안 된 경우
        if (!user) {
            setPopup('login')
            return
        }

        // finalData에서 id 일치 여부 확인
        const matched = finalData.find(item => item.id === serialNumber.trim())
        if (matched) {
            setPopup('success')
        } else {
            setPopup('fail')
        }
    }

    const closePopup = () => {
        setPopup(null)
    }

    return (
        <div className="brand-auth-page">

            {/* 히어로 배너 */}
            <div className="auth-hero">
                <img src="/images/brand/auth-hero.png" alt="정품인증" />
                <div className="auth-hero-text">
                    <h1>정품인증</h1>
                    <p>정품인증을 통해서 보호하고 혜택을 즐기세요</p>
                </div>
            </div>

            {/* 인증방법 */}
            <section className="auth-steps-section">
                <h2 className="auth-section-title">인증방법</h2>
                <div className="auth-steps">
                    <div className="auth-step-card">
                        <div className="auth-step-icon">
                            <img src="/images/brand/auth-step1.png" alt="일련번호 등록" />
                        </div>
                        <p>01: 제품의 일렬번호를 등록해주세요</p>
                    </div>
                    <div className="auth-step-card">
                        <div className="auth-step-icon">
                            <img src="/images/brand/auth-step2.png" alt="정품인증 확인" />
                        </div>
                        <p>02: 제품의 정품인증을 확인해보세요</p>
                    </div>
                    <div className="auth-step-card">
                        <div className="auth-step-icon">
                            <img src="/images/brand/auth-step3.png" alt="쿠폰 받기" />
                        </div>
                        <p>03: 인증 완료 후 쿠폰을 받으세요</p>
                    </div>
                </div>
            </section>

            {/* 일련번호 입력 */}
            <section className="auth-input-section">
                <div className="auth-input-wrap">
                    <input
                        type="text"
                        className="auth-serial-input"
                        placeholder="일련 번호를 입력"
                        value={serialNumber}
                        onChange={e => setSerialNumber(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAuthenticate()}
                    />
                    <button className="auth-submit-btn" onClick={handleAuthenticate}>
                        제품 인증 하기
                    </button>
                </div>
            </section>

            {/* FAQ */}
            <section className="auth-faq-section">
                <h2 className="auth-faq-title">제품 인증 관련 (FAQs)</h2>
                <div className="auth-faq-list">
                    {AUTH_FAQS.map(faq => (
                        <div
                            key={faq.id}
                            className={`auth-faq-item ${openFaqId === faq.id ? 'open' : ''}`}
                        >
                            <button
                                className="auth-faq-question"
                                onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                            >
                                <span>{faq.q}</span>
                                <span className="auth-faq-icon">
                                    {openFaqId === faq.id ? '×' : '+'}
                                </span>
                            </button>
                            {openFaqId === faq.id && (
                                <div className="auth-faq-answer">
                                    {faq.a.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 팝업: 로그인 필요 ─── */}
            {popup === 'login' && (
                <div className="popup-overlay">
                    <div className="popup-wrap">
                        <div className="popup">
                            <p>로그인이 필요한 서비스입니다.<br />로그인 후 정품인증을 진행해주세요.</p>
                            <div className="popup-buttons">
                                <button
                                    className="btn-continue"
                                    onClick={closePopup}
                                >
                                    닫기
                                </button>
                                <button
                                    className="btn-go-wish"
                                    onClick={() => {
                                        closePopup()
                                        navigate('/login')
                                    }}
                                >
                                    로그인 페이지 이동하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── 팝업: 인증 성공 ─── */}
            {popup === 'success' && (
                <div className="popup-overlay">
                    <div className="popup-wrap">
                        <div className="popup">
                            <p>정품인증이 완료되었습니다! 🎉</p>
                            <div className="popup-buttons">
                                <button
                                    className="btn-continue"
                                    onClick={() => {
                                        closePopup()
                                        navigate('/')
                                    }}
                                >
                                    계속 홈가기
                                </button>
                                <button
                                    className="btn-go-wish"
                                    onClick={() => {
                                        closePopup()
                                        setSerialNumber('')
                                    }}
                                >
                                    계속 인증하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── 팝업: 인증 실패 ─── */}
            {popup === 'fail' && (
                <div className="popup-overlay">
                    <div className="popup-wrap">
                        <div className="popup">
                            <p>일련번호를 확인해주세요.<br />입력하신 번호와 일치하는 제품을 찾을 수 없습니다.</p>
                            <div className="popup-buttons">
                                <button
                                    className="btn-close"
                                    onClick={closePopup}
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
