import React from 'react'
import { useNavigate } from 'react-router-dom'
import './scss/CustomPage.scss'

export default function CustomPage() {
    const navigate = useNavigate()

    const devices = [
        { key: 'phone', label: '핸드폰', img: '/images/category/mini/phone.png', desc: 'iPhone · Galaxy' },
        { key: 'laptop', label: '노트북', img: '/images/category/mini/laptop.png', desc: 'MacBook' },
        { key: 'tablet', label: '태블릿', img: '/images/category/mini/tablet.png', desc: 'iPad' },
    ]

    return (
        <div className="custom-page">

            {/* Hero */}
            <section className="custom-hero">
                <div className="custom-hero-text">
                    <p className="custom-hero-sub">MAKE IT YOURS</p>
                    <h1>나만의 케이스 만들기</h1>
                    <p>텍스트, 사진을 넣어 세상에 하나뿐인 케이스를 만들어보세요.</p>
                </div>
            </section>

            {/* 디바이스 선택 */}
            <div className="custom-content">
                <section className="custom-section">
                    <h2>어떤 기기에 맞는 케이스를 만드시겠어요?</h2>
                    <div className="device-cards">
                        {devices.map(d => (
                            <button
                                key={d.key}
                                className="device-card"
                                onClick={() => navigate('/custom/studio', { state: { deviceType: d.key } })}
                            >
                                <div className="device-img-wrap">
                                    <img src={d.img} alt={d.label} />
                                </div>
                                <span className="device-label">{d.label}</span>
                                <span className="device-desc">{d.desc}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
