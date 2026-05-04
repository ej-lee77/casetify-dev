import React, { useRef } from 'react'
import { PHOTO_FILTERS } from './constants'

const STICKERS = [
    { id: 'sticker1', src: '/images/custom/alonedog.png', label: '큰강아지' },
    { id: 'sticker2', src: '/images/custom/cat.png', label: '고양이' },
    { id: 'sticker3', src: '/images/custom/dogs.png', label: '강아지들' },
    { id: 'sticker4', src: '/images/custom/dossiba.png', label: '일본강아지' },
]

function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro': return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono': return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default: return {}
    }
}

export function PhotoSection({
    photoTab, setPhotoTab,
    photoURL, setPhotoURL, setPhotoFile,
    photoFilter, setPhotoFilter,
    filterStrength, setFilterStrength,
    selectedSticker, setSelectedSticker,
}) {
    const fileInputRef = useRef(null)

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPhotoFile(file)
        const reader = new FileReader()
        reader.onload = (ev) => setPhotoURL(ev.target.result)
        reader.readAsDataURL(file)
    }

    return (
        <div className="detail-info-box">
            <div className="photo-tab">
                <div className="photo-tab-wrap">
                    <button
                        className={`photo-tab-btn ${photoTab === 'upload' ? 'active' : ''}`}
                        onClick={() => setPhotoTab('upload')}
                    >
                        📷 사진 업로드
                    </button>
                    <button
                        className={`photo-tab-btn ${photoTab === 'sticker' ? 'active' : ''}`}
                        onClick={() => {
                            setPhotoTab('sticker')
                            if (!selectedSticker) setSelectedSticker(STICKERS[0])
                        }}
                    >
                        🐾 스티커
                    </button>
                </div>
            </div>

            {photoTab === 'upload' && (
                <>
                    <div className="custom-upload-zone" onClick={() => fileInputRef.current?.click()}>
                        {photoURL
                            ? <img src={photoURL} alt="업로드 사진" />
                            : <><span className="custom-upload-icon">+</span><p>클릭해서 사진을 업로드해주세요</p></>
                        }
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*"
                        style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    {photoURL && (
                        <button className="custom-reupload-btn"
                            onClick={() => fileInputRef.current?.click()}>다시 업로드</button>
                    )}
                    {photoURL && (
                        <>
                            <p className="label" style={{ marginTop: 16 }}>필터 선택</p>
                            <div className="custom-filter-grid">
                                {PHOTO_FILTERS.map(f => (
                                    <button key={f.id}
                                        className={`custom-filter-card ${photoFilter === f.id ? 'active' : ''}`}
                                        onClick={() => setPhotoFilter(f.id)}>
                                        <div className="custom-filter-img-wrap">
                                            <img src={photoURL} alt={f.label}
                                                style={getFilterStyle(f.id, filterStrength)} />
                                        </div>
                                        <span>{f.label}</span>
                                    </button>
                                ))}
                            </div>
                            {photoFilter && (
                                <div className="custom-slider-wrap">
                                    <label className="label">필터 강도</label>
                                    <input type="range" min={0} max={100} step={1}
                                        value={filterStrength}
                                        onChange={e => setFilterStrength(Number(e.target.value))}
                                        className="custom-slider" />
                                    <div className="custom-slider-ticks">
                                        <span>약</span><span>강</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {photoTab === 'sticker' && (
                <>
                    <div className="custom-filter-grid">
                        {STICKERS.map(s => (
                            <button key={s.id}
                                className={`custom-filter-card ${selectedSticker?.id === s.id ? 'active' : ''}`}
                                onClick={() => setSelectedSticker(s)}>
                                <div className="custom-filter-img-wrap">
                                    <img src={s.src} alt={s.label} />
                                </div>
                                <span>{s.label}</span>
                            </button>
                        ))}
                    </div>
                    {selectedSticker && (
                        <>
                            <p className="label" style={{ marginTop: 16 }}>필터 선택</p>
                            <div className="custom-filter-grid">
                                {PHOTO_FILTERS.map(f => (
                                    <button key={f.id}
                                        className={`custom-filter-card ${photoFilter === f.id ? 'active' : ''}`}
                                        onClick={() => setPhotoFilter(f.id)}>
                                        <div className="custom-filter-img-wrap">
                                            <img src={selectedSticker.src} alt={f.label}
                                                style={getFilterStyle(f.id, filterStrength)} />
                                        </div>
                                        <span>{f.label}</span>
                                    </button>
                                ))}
                            </div>
                            {photoFilter && (
                                <div className="custom-slider-wrap">
                                    <label className="label">필터 강도</label>
                                    <input type="range" min={0} max={100} step={1}
                                        value={filterStrength}
                                        onChange={e => setFilterStrength(Number(e.target.value))}
                                        className="custom-slider" />
                                    <div className="custom-slider-ticks">
                                        <span>약</span><span>강</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}