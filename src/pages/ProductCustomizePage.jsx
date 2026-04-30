import React, { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { BRANDS, CASE_TYPES, CASE_COLORS, PHOTO_FILTERS, FONT_COLORS } from '../components/sub/custom/constants'
import './scss/ProductCustomizePage.scss'

// 필터 CSS
function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro':   return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono':    return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default:        return {}
    }
}

export function ProductCustomizePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, onAddToCart } = useAuthStore()
    const initialDeviceType = location.state?.deviceType || 'phone'
    const fileInputRef = useRef(null)

    // 선택값
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [selectedModel, setSelectedModel] = useState(null)
    const [selectedCaseColor, setSelectedCaseColor] = useState(null)
    const [selectedCaseType, setSelectedCaseType] = useState(null)
    const [designType, setDesignType] = useState(null) // 'photo' | 'text'
    const [photoFile, setPhotoFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(null)
    const [photoFilter, setPhotoFilter] = useState(null)
    const [filterStrength, setFilterStrength] = useState(50)
    const [textValue, setTextValue] = useState('')
    const [fontColor, setFontColor] = useState(null)

    // UI 상태
    const [modelOpen, setModelOpen] = useState(false)
    const [caseTypeOpen, setCaseTypeOpen] = useState(false)

    // 팝업
    const [cartMsg, setCartMsg] = useState('')
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false)
    const [isPopupErr, setIsPopupErr] = useState(false)

    const price = 89000
    const models = BRANDS.find(b => b.id === selectedBrand)?.models || []
    const selectedModelLabel = models.find(m => m.id === selectedModel)?.label
    const selectedCaseLabel = CASE_TYPES.find(c => c.id === selectedCaseType)?.label
    const photoStyle = photoFilter && photoURL ? getFilterStyle(photoFilter, filterStrength) : {}
    const deviceTypeLabel = { phone: '핸드폰', laptop: '노트북', tablet: '태블릿' }[initialDeviceType] || ''

    // 장바구니 가능 여부
    const canAddCart =
        selectedModel && selectedCaseColor && selectedCaseType && designType &&
        (designType === 'photo' ? (photoFile && photoFilter) : (textValue.trim().length > 0 && fontColor))

    const optionSummary = [
        selectedModelLabel,
        selectedCaseColor ? CASE_COLORS.find(c => c.hex === selectedCaseColor)?.label : null,
        selectedCaseLabel,
        designType === 'photo' ? '포토 커스텀' : designType === 'text' ? '텍스트 커스텀' : null,
    ].filter(Boolean).join(' / ')

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPhotoFile(file)
        const reader = new FileReader()
        reader.onload = (ev) => setPhotoURL(ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleAddCart = async () => {
        if (!user) { navigate('/login'); return }
        const result = await onAddToCart({
            id: `CUSTOM-${Date.now()}`,
            productName: '커스텀 케이스',
            price,
            device: selectedModelLabel || '',
            deviceKey: selectedModel || '',
            color: selectedCaseColor || '',
            imgUrl: '/images/main/custom/CU/custom1.png',
            colorList: [], deviceList: [],
            isPhone: initialDeviceType === 'phone',
            deviceBrand: selectedBrand || '',
            caseCategory: selectedCaseType || '',
            quantity: 1, isCustom: true,
            customMode: designType,
            customContent: designType === 'text' ? textValue : photoURL,
        })
        if (result) { setCartMsg('장바구니에 담겼습니다!'); setIsPopupErr(false) }
        else        { setCartMsg('장바구니 담기에 실패했습니다.'); setIsPopupErr(true) }
        setIsCartPopupOpen(true)
    }

    return (
        <section className="detail-page">
            <div className="detail-inner">

                {/* ── 왼쪽: 케이스 컬러 바 + 프리뷰 ── */}
                <div className="detail-left">
                    <div className="detail-image-wrap">

                        <div className="detail-main-image custom-preview-main">
                            {/* 케이스 컬러 세로 바 (이미지처럼 왼쪽에 위치) */}
                            <div className="color-remote">
                                {CASE_COLORS.map(c => (
                                    <button
                                        key={c.id}
                                        className={selectedCaseColor === c.hex ? 'active' : ''}
                                        onClick={() => setSelectedCaseColor(c.hex)}
                                    >
                                        <span
                                            className="remote-chip"
                                            style={{
                                                backgroundColor: c.hex,
                                                border: c.id === 'white' ? '1px solid #ccc' : 'none'
                                            }}
                                        />
                                        <span className="remote-label">{c.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* 케이스 프리뷰 */}
                            <div className="custom-phone-preview" style={{ '--case-color': selectedCaseColor || '#111111' }}>
                                <div className="custom-phone-body">
                                    <div className="custom-phone-camera">
                                        <div className="custom-phone-lens" />
                                        <div className="custom-phone-lens" />
                                        <div className="custom-phone-lens" />
                                    </div>
                                    <div className="custom-phone-screen">
                                        {designType === 'photo' && photoURL && (
                                            <img src={photoURL} alt="커스텀 사진" style={photoStyle} />
                                        )}
                                        {designType === 'text' && textValue && (
                                            <span style={{ color: fontColor || '#fff' }}>{textValue}</span>
                                        )}
                                        {!((designType === 'photo' && photoURL) || (designType === 'text' && textValue)) && (
                                            <p className="custom-phone-placeholder">
                                                {designType === 'photo' ? '사진을\n업로드하세요'
                                                    : designType === 'text' ? '텍스트를\n입력하세요'
                                                    : '커스텀\n내용을 선택하세요'}
                                            </p>
                                        )}
                                    </div>
                                    <div className="custom-phone-grid" />
                                </div>
                            </div>

                            {/* 위시 버튼 자리 */}
                            <button className="image-wish-btn">
                                <img src="/images/icon/UNLIKE.svg" alt="찜하기" />
                            </button>
                        </div>

                        {/* 썸네일 리스트 (디자인 타입 미리보기) */}
                        <ul className="detail-thumb-list">
                            {[
                                { key: 'default', label: '기본' },
                                { key: 'photo',   label: '포토' },
                                { key: 'text',    label: '텍스트' },
                            ].map(t => (
                                <li key={t.key} style={{ display: 'block' }}>
                                    <button type="button">
                                        <div className="custom-thumb-inner" style={{ background: selectedCaseColor || '#111' }}>
                                            <span style={{ color: '#fff', fontSize: 10 }}>{t.label}</span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── 오른쪽: 옵션 ── */}
                <div className="detail-right">

                    <div className="detail-meta">
                        <span className="badge-free-ship">무료 배송</span>
                        <span className="detail-product-id">CUSTOM · {deviceTypeLabel}</span>
                    </div>

                    <h2 className="detail-title">나만의 커스텀 케이스</h2>
                    <p className="detail-price">{price.toLocaleString()}원</p>

                    <div className="right-info-wrap">

                        {/* 케이스 타입 표시 */}
                        {selectedCaseType && (
                            <div className="detail-info-box">
                                <p className="label">{selectedCaseLabel}</p>
                            </div>
                        )}

                        {/* 1. 기종 선택 */}
                        <div className="detail-info-box">
                            <p className="label">기종</p>

                            {/* 브랜드 탭 */}
                            <div className="model-accordion">
                                <div className="model-brand-tabs" style={{ padding: '12px 16px 0', background: '#fff', position: 'relative', zIndex: 1 }}>
                                    {BRANDS.map(b => (
                                        <button
                                            key={b.id}
                                            className={selectedBrand === b.id ? 'active' : ''}
                                            onClick={() => {
                                                setSelectedBrand(b.id)
                                                setSelectedModel(null)
                                                setModelOpen(true)
                                            }}
                                        >
                                            {b.label}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className="model-accordion-trigger"
                                    style={{ borderTop: '1px solid #eee' }}
                                    onClick={() => setModelOpen(v => !v)}
                                >
                                    <span>{selectedModelLabel || '기종을 선택하세요'}</span>
                                    <span className={`model-accordion-arrow ${modelOpen ? 'open' : ''}`}>▼</span>
                                </button>

                                {modelOpen && selectedBrand && (
                                    <div className="model-accordion-list">
                                        <ul className="model-sub-list">
                                            {models.map(m => (
                                                <li
                                                    key={m.id}
                                                    className={selectedModel === m.id ? 'active' : ''}
                                                    onClick={() => { setSelectedModel(m.id); setModelOpen(false) }}
                                                >
                                                    {m.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. 케이스 컬러 */}
                        <div className="detail-info-box">
                            <p className="label">케이스 컬러</p>
                            <div className="detail-colors">
                                {CASE_COLORS.map(c => (
                                    <button
                                        key={c.id}
                                        className={selectedCaseColor === c.hex ? 'active' : ''}
                                        onClick={() => setSelectedCaseColor(c.hex)}
                                    >
                                        <span
                                            className="color-chip"
                                            style={{
                                                backgroundColor: c.hex,
                                                border: c.id === 'white' ? '1px solid #ddd' : 'none'
                                            }}
                                        />
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. 케이스 타입 */}
                        <div className="detail-info-box">
                            <p className="label">케이스 타입</p>
                            <div className="model-accordion">
                                <button
                                    className="model-accordion-trigger"
                                    onClick={() => setCaseTypeOpen(v => !v)}
                                >
                                    <span>{selectedCaseLabel || '케이스 타입을 선택하세요'}</span>
                                    <span className={`model-accordion-arrow ${caseTypeOpen ? 'open' : ''}`}>▼</span>
                                </button>
                                {caseTypeOpen && (
                                    <div className="model-accordion-list">
                                        <ul className="model-sub-list">
                                            {CASE_TYPES.map(ct => (
                                                <li
                                                    key={ct.id}
                                                    className={selectedCaseType === ct.id ? 'active' : ''}
                                                    onClick={() => { setSelectedCaseType(ct.id); setCaseTypeOpen(false) }}
                                                >
                                                    {ct.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 4. 커스텀 타입 선택 */}
                        <div className="detail-info-box">
                            <p className="label">커스텀 타입</p>
                            <div className="custom-type-btns">
                                <button
                                    className={`custom-type-btn ${designType === 'photo' ? 'active' : ''}`}
                                    onClick={() => setDesignType('photo')}
                                >
                                    🖼️ 사진 넣기
                                </button>
                                <button
                                    className={`custom-type-btn ${designType === 'text' ? 'active' : ''}`}
                                    onClick={() => setDesignType('text')}
                                >
                                    ✏️ 텍스트 넣기
                                </button>
                            </div>
                        </div>

                        {/* 5-a. 사진 업로드 */}
                        {designType === 'photo' && (
                            <>
                                <div className="detail-info-box">
                                    <p className="label">사진 업로드</p>
                                    <div
                                        className="custom-upload-zone"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {photoURL
                                            ? <img src={photoURL} alt="업로드 사진" />
                                            : <><span className="custom-upload-icon">+</span><p>클릭해서 사진을 업로드해주세요</p></>
                                        }
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handlePhotoUpload}
                                    />
                                    {photoURL && (
                                        <button className="custom-reupload-btn" onClick={() => fileInputRef.current?.click()}>
                                            다시 업로드
                                        </button>
                                    )}
                                </div>

                                {photoURL && (
                                    <div className="detail-info-box">
                                        <p className="label">필터 선택</p>
                                        <div className="custom-filter-grid">
                                            {PHOTO_FILTERS.map(f => (
                                                <button
                                                    key={f.id}
                                                    className={`custom-filter-card ${photoFilter === f.id ? 'active' : ''}`}
                                                    onClick={() => setPhotoFilter(f.id)}
                                                >
                                                    <div className="custom-filter-img-wrap">
                                                        <img
                                                            src={photoURL}
                                                            alt={f.label}
                                                            style={getFilterStyle(f.id, filterStrength)}
                                                        />
                                                    </div>
                                                    <span>{f.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        {photoFilter && (
                                            <div className="custom-slider-wrap">
                                                <label className="label">필터 강도</label>
                                                <input
                                                    type="range" min={0} max={100} step={1}
                                                    value={filterStrength}
                                                    onChange={e => setFilterStrength(Number(e.target.value))}
                                                    className="custom-slider"
                                                />
                                                <div className="custom-slider-ticks">
                                                    <span>약</span><span>강</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {/* 5-b. 텍스트 입력 */}
                        {designType === 'text' && (
                            <div className="detail-info-box">
                                <p className="label">텍스트 입력</p>
                                <div className="custom-text-input-wrap">
                                    <input
                                        type="text"
                                        className="custom-text-input"
                                        placeholder="원하시는 글씨를 입력하세요 (최대 20자)"
                                        value={textValue}
                                        maxLength={20}
                                        onChange={e => setTextValue(e.target.value)}
                                    />
                                    <span className="custom-char-count">{textValue.length} / 20</span>
                                </div>

                                <p className="label" style={{ marginTop: 16 }}>폰트 색상</p>
                                <div className="detail-colors">
                                    {FONT_COLORS.map(c => (
                                        <button
                                            key={c.id}
                                            className={fontColor === c.hex ? 'active' : ''}
                                            onClick={() => setFontColor(c.hex)}
                                        >
                                            <span
                                                className="color-chip"
                                                style={{
                                                    backgroundColor: c.hex,
                                                    border: c.id === 'white' ? '1px solid #ddd' : 'none'
                                                }}
                                            />
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 주문 요약 + 장바구니 */}
                    <div className="right-btn-wrap">
                        {canAddCart && (
                            <div className="order-result">
                                <hr className="left-line" />
                                <div className="order-result-row">
                                    <span className="order-option-name">
                                        커스텀 케이스
                                        {optionSummary && <em className="order-option-detail"> / {optionSummary}</em>}
                                    </span>
                                    <div className="order-quantity">
                                        <button type="button">−</button>
                                        <span>1</span>
                                        <button type="button">+</button>
                                    </div>
                                    <span className="order-row-price">{price.toLocaleString()}원</span>
                                </div>
                                <div className="order-total">
                                    <span>총 상품금액 (수량 1개)</span>
                                    <strong>{price.toLocaleString()}원</strong>
                                </div>
                            </div>
                        )}

                        <button
                            className="buy-btn"
                            onClick={() => {
                                if (!canAddCart) {
                                    setCartMsg('모든 옵션을 선택해주세요.')
                                    setIsPopupErr(true)
                                    setIsCartPopupOpen(true)
                                    return
                                }
                                handleAddCart()
                            }}
                        >
                            <span className="icon">
                                <img src="/images/icon/btn_shopping-cart.svg" alt="" />
                            </span>
                            장바구니에 담기
                        </button>
                    </div>
                </div>

                {/* 팝업 */}
                {isCartPopupOpen && (
                    <div className="popup-overlay">
                        <div className="popup-wrap">
                            <div className="popup">
                                <p>{cartMsg}</p>
                                {isPopupErr ? (
                                    <div className="popup-buttons">
                                        <button className="btn-close" onClick={() => setIsCartPopupOpen(false)}>닫기</button>
                                    </div>
                                ) : (
                                    <div className="popup-buttons">
                                        <button className="btn-continue" onClick={() => setIsCartPopupOpen(false)}>계속 쇼핑하기</button>
                                        <button className="btn-go-wish" onClick={() => navigate('/cart')}>장바구니 보기</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductCustomizePage
