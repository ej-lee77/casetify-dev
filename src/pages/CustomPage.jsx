import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './scss/CustomPage.scss'

const DEVICE_VIDEOS = {
    phone: '/images/custom/phonecustom.mp4',
    laptop: '/images/custom/macbookcustom.mp4',
    tablet: '/images/custom/Tabletcustom.mp4',
}

// 임시 = 영상으로교체예정
const DEVICE_IMAGES = {
    tablet: '/images/custom/Tabletcustom.png',
}

export default function CustomPage() {
    const navigate = useNavigate()
    const [activeVideo, setActiveVideo] = useState('phone')
    const [videoReady, setVideoReady] = useState(false)
    const videoRef = useRef(null)

    const devices = [
        { key: 'phone', label: '핸드폰', img: '/images/category/mini/phone.png', desc: 'iPhone · Galaxy' },
        { key: 'laptop', label: '노트북', img: '/images/category/mini/laptop.png', desc: 'MacBook' },
        { key: 'tablet', label: '태블릿', img: '/images/category/mini/tablet.png', desc: 'iPad' },
    ]

    // src 변경 시 수동으로 load → play (loop 속성은 유지되므로 끊김 없이 반복)
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        setVideoReady(false)
        video.src = DEVICE_VIDEOS[activeVideo]
        video.load()
        video.play().catch(() => { })
    }, [activeVideo])

    const handleVideoChange = (key) => {
        if (key === activeVideo) return
        setActiveVideo(key)
    }

    return (
        <div className="custom-page">
            <section className="custom-hero">

                <video
                    ref={videoRef}
                    className={`custom-hero-video ${videoReady ? 'ready' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlayThrough={() => setVideoReady(true)}
                />
                {/* 태블릿일 때 이미지 표시 */}
                {/* {activeVideo === 'tablet' && (
                    <img
                        src={DEVICE_IMAGES.tablet}
                        alt="tablet"
                        className="custom-hero-video ready"
                        style={{ objectFit: 'cover' }}
                    /> */}
                )}
                <div className="custom-hero-overlay" />

                <div className="custom-hero-text" style={{ animationDelay: '0.1s' }}>
                    <p className="custom-hero-sub" style={{ animationDelay: '0.1s' }}>MAKE IT YOURS</p>
                    <h1 style={{ animationDelay: '0.35s' }}>Customize</h1>
                    <p className="cus-title" style={{ animationDelay: '0.6s' }}></p>
                    <p style={{ animationDelay: '0.75s' }}>사진과 글귀들로 세상에 하나뿐인 케이스를 만들어보세요</p>
                </div>

                <div className="custom-content">
                    <div className="custom-section">
                        {/* <h2 className="fade-up" style={{ animationDelay: '0.9s' }}>
                            커스텀할 기종을 선택해주세요
                        </h2> */}

                    </div>
                    <div className="device-cards">
                        {devices.map((d, i) => (
                            <button
                                key={d.key}
                                className="device-card fade-up"
                                style={{ animationDelay: `${0.9 + i * 0.12}s` }}
                                onMouseEnter={() => handleVideoChange(d.key)}
                                onClick={() => navigate('/custom/studio', { state: { deviceType: d.key } })}
                            >
                                <div className="device-img-wrap">
                                    <img src={d.img} alt={d.label} loading="eager" />
                                </div>
                                <span className="device-label">{d.label}</span>
                                <span className="device-desc">{d.desc}</span>
                            </button>
                        ))}
                    </div>

                </div>

            </section>
        </div>
    )
}