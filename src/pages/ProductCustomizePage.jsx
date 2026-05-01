import React, { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { BRANDS, CASE_TYPES, CASE_COLORS, PHOTO_FILTERS, FONT_COLORS } from '../components/sub/custom/constants'
import './scss/ProductCustomizePage.scss'

// ── 이미지 경로 (public/images/custom/ 에 두 파일 복사)
//   s25.png        468×839px  — 폰 본체
//   s25-camera.png 153×248px  — 카메라 모듈
const S25_BODY   = '/images/custom/model/s25.png'
const S25_CAMERA = '/images/custom/model/s25-camera.png'

// ─────────────────────────────────────────────
//  레퍼런스 이미지(갤럭시_s25_.png, 397×748) 기준 픽셀 분석 결과
//  → s25.png 200×358px 표시 기준으로 변환
//
//  카메라 모듈:  top=34  left=22  width=77  height=144
//  디자인 캔버스: top=63  left=43  right=29  bottom=26
// ─────────────────────────────────────────────

function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro':   return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono':    return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default:        return {}
    }
}

const STICKERS = [
    { id: 'sticker1', src: '/images/custom/alonedog.png', label: '강아지1' },
    { id: 'sticker2', src: '/images/custom/cat.jpg',      label: '강아지2' },
    { id: 'sticker3', src: '/images/custom/dogs.jpg',     label: '강아지3' },
    { id: 'sticker4', src: '/images/custom/dossiba.jpg',  label: '고양이'  },
]

function isS25Model(modelId) {
    if (!modelId) return false
    return modelId.toLowerCase().includes('s25') || modelId === 'galaxy-s25'
}

// ─────────────────────────────────────────────
//  S25 실사 프리뷰
//  레이어 (모두 position:absolute, 동일한 relative 컨테이너)
//
//  z:1  폰 본체 이미지  → inset:0, 100%×100%
//  z:2  컬러 오버레이   → inset:0, mixBlendMode:multiply
//  z:3  디자인 캔버스   → top:63 left:43 right:29 bottom:26
//  z:4  카메라 이미지   → top:34 left:22 w:77 h:144
// ─────────────────────────────────────────────
function S25PhonePreview({
    designType,
    previewURL,
    photoFilter,
    filterStrength,
    textValue,
    fontColor,
    photoTab,
    selectedCaseColor
}) {

    const scale = 1.5

return (
    <div style={{
        position: 'relative',
        width: 200 * scale,
        height: 358 * scale,
        margin: '0 auto',
        flexShrink: 0,
    }}>
        {/* ── ❶ 폰 본체 + ❷ 컬러 오버레이 묶음 ── */}
        <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            overflow: 'hidden',
            borderRadius: 30 * scale, // 전체적인 폰 곡률 적용
        }}>
            {/* ❶ 폰 본체 */}
            <img
                src={S25_BODY}
                alt="Galaxy S25"
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                    display: 'block',
                }}
            />

            {/* ❷ 컬러 오버레이 (마스크 적용으로 폰 영역 밖으로 안 튀어나감) */}
            {selectedCaseColor && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: selectedCaseColor,
                    mixBlendMode: 'multiply',
                    opacity: 0.45,
                    pointerEvents: 'none',
                    // 이미지 모양대로 색을 입히는 핵심 설정
                    WebkitMaskImage: `url(${S25_BODY})`,
                    maskImage: `url(${S25_BODY})`,
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                }} />
            )}
        </div>

        {/* ── ❸ 디자인 영역 (사진/텍스트) ── */}
        <div style={{
            position: 'absolute',
            top: 63 * scale,
            left: 43 * scale,
            right: 29 * scale,
            bottom: 26 * scale,
            overflow: 'hidden',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10 * scale, // 디자인 영역 내부 곡률
        }}>
            {designType === 'photo' && previewURL && (
                <img
                    src={previewURL}
                    alt="미리보기"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        ...(photoFilter && getFilterStyle(photoFilter, filterStrength)),
                    }}
                />
            )}

            {designType === 'text' && textValue && (
                <span style={{
                    color: fontColor || '#fff',
                    fontSize: 20 * scale,
                    fontWeight: 600,
                    textAlign: 'center',
                    textShadow: `0 ${1 * scale}px ${3 * scale}px rgba(0,0,0,.4)`,
                    padding: 8 * scale,
                    wordBreak: 'break-all',
                }}>
                    {textValue}
                </span>
            )}

            {/* 안내 문구 */}
            {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                <p style={{
                    fontSize: 11 * scale,
                    color: 'rgba(255,255,255,0.4)',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.4,
                }}>
                    {designType === 'photo'
                        ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                        : designType === 'text'
                            ? '텍스트를\n입력하세요'
                            : '커스텀 내용을\n선택하세요'}
                </p>
            )}
        </div>

        {/* ── ❹ 카메라 렌즈 ── */}
        <img
            src={S25_CAMERA}
            alt="camera"
            style={{
                position: 'absolute',
                top: 59 * scale,
                left: 38 * scale,
                width: 90 * scale * 0.75,
                height: 140 * scale * 0.75,
                zIndex: 4,
                pointerEvents: 'none',
            }}
        />
    </div>
);
}
// ── 기존 CSS 폰 프리뷰 (S25 외 기종용)
function DefaultPhonePreview({ designType, previewURL, photoFilter, filterStrength,
                               textValue, fontColor, photoTab, selectedCaseColor }) {
    return (
        <div className="custom-phone-preview" style={{ '--case-color': selectedCaseColor || '#111111' }}>
            <div className="custom-phone-body">
                <div className="custom-phone-camera">
                    <div className="custom-phone-lens" />
                    <div className="custom-phone-lens" />
                    <div className="custom-phone-lens" />
                </div>
                <div className="custom-phone-screen">
                    {designType === 'photo' && previewURL && (
                        <img
                            src={previewURL}
                            alt="커스텀 미리보기"
                            style={photoFilter ? getFilterStyle(photoFilter, filterStrength) : {}}
                        />
                    )}
                    {designType === 'text' && textValue && (
                        <span style={{ color: fontColor || '#fff' }}>{textValue}</span>
                    )}
                    {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                        <p className="custom-phone-placeholder">
                            {designType === 'photo'
                                ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                                : designType === 'text' ? '텍스트를\n입력하세요'
                                : '커스텀\n내용을 선택하세요'}
                        </p>
                    )}
                </div>
                <div className="custom-phone-grid" />
            </div>
        </div>
    )
}

// ── 메인 페이지
export function ProductCustomizePage() {
    const location  = useLocation()
    const navigate  = useNavigate()
    const { user, onAddToCart } = useAuthStore()
    const initialDeviceType = location.state?.deviceType || 'phone'
    const fileInputRef = useRef(null)

    const [selectedBrand,     setSelectedBrand]     = useState(BRANDS[0]?.id || null)
    const [selectedModel,     setSelectedModel]     = useState(null)
    const [selectedCaseColor, setSelectedCaseColor] = useState(null)
    const [selectedCaseType,  setSelectedCaseType]  = useState(null)
    const [designType,        setDesignType]        = useState(null)
    const [photoFile,         setPhotoFile]         = useState(null)
    const [photoURL,          setPhotoURL]          = useState(null)
    const [photoFilter,       setPhotoFilter]       = useState(null)
    const [filterStrength,    setFilterStrength]    = useState(50)
    const [textValue,         setTextValue]         = useState('')
    const [fontColor,         setFontColor]         = useState(null)
    const [photoTab,          setPhotoTab]          = useState('upload')
    const [selectedSticker,   setSelectedSticker]   = useState(STICKERS[0] || null)
    const [modelOpen,         setModelOpen]         = useState(false)
    const [caseTypeOpen,      setCaseTypeOpen]      = useState(false)
    const [cartMsg,           setCartMsg]           = useState('')
    const [isCartPopupOpen,   setIsCartPopupOpen]   = useState(false)
    const [isPopupErr,        setIsPopupErr]        = useState(false)

    const price              = 89000
    const models             = BRANDS.find(b => b.id === selectedBrand)?.models || []
    const selectedModelLabel = models.find(m => m.id === selectedModel)?.label
    const selectedCaseLabel  = CASE_TYPES.find(c => c.id === selectedCaseType)?.label
    const deviceTypeLabel    = { phone: 'Phone Custom Case', laptop: 'MacBook Custom Case', tablet: 'Tablet Custom Case' }[initialDeviceType] || ''
    const showS25Preview     = isS25Model(selectedModel)

    const previewURL = photoTab === 'sticker' ? selectedSticker?.src || null : photoURL

    const canAddCart =
        selectedModel && selectedCaseColor && selectedCaseType && designType &&
        (designType === 'photo'
            ? (photoTab === 'upload' ? (photoFile && photoFilter) : selectedSticker)
            : (textValue.trim().length > 0 && fontColor))

    const optionSummary = [
        selectedModelLabel,
        selectedCaseColor ? CASE_COLORS.find(c => c.hex === selectedCaseColor)?.label : null,
        selectedCaseLabel,
        designType === 'photo' ? (photoTab === 'sticker' ? '스티커 커스텀' : '포토 커스텀')
            : designType === 'text' ? '텍스트 커스텀' : null,
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
        const customContent = designType === 'text'
            ? textValue
            : photoTab === 'sticker' ? selectedSticker?.src : photoURL
        const result = await onAddToCart({
            id: `CUSTOM-${Date.now()}`,
            productName: '커스텀 케이스', price,
            device: selectedModelLabel || '', deviceKey: selectedModel || '',
            color: selectedCaseColor || '', imgUrl: '/images/main/custom/CU/custom1.png',
            colorList: [], deviceList: [], isPhone: initialDeviceType === 'phone',
            deviceBrand: selectedBrand || '', caseCategory: selectedCaseType || '',
            quantity: 1, isCustom: true, customMode: designType, customContent,
        })
        if (result) { setCartMsg('장바구니에 담겼습니다!');      setIsPopupErr(false) }
        else         { setCartMsg('장바구니 담기에 실패했습니다.'); setIsPopupErr(true) }
        setIsCartPopupOpen(true)
    }

    const previewProps = {
        designType, previewURL, photoFilter, filterStrength,
        textValue, fontColor, photoTab, selectedCaseColor,
    }

    return (
        <section className="detail-page">
            <div className="detail-inner">

                {/* ── 왼쪽: 프리뷰 ── */}
                <div className="detail-left">
                    <div className="detail-image-wrap">
                        <div className="detail-main-image custom-preview-main">
                            {showS25Preview
                                ? <S25PhonePreview {...previewProps} />
                                : <DefaultPhonePreview {...previewProps} />
                            }
                        </div>
                    </div>
                </div>

                {/* ── 오른쪽: 옵션 ── */}
                <div className="detail-right">
                    <div className="detail-meta">
                        <span className="badge-free-ship">무료 배송</span>
                        <span className="detail-product-id">CUSTOM · {deviceTypeLabel}</span>
                    </div>
                    <h2 className="detail-title">{deviceTypeLabel}</h2>
                    <p className="detail-price">{price.toLocaleString()}원</p>

                    <div className="right-info-wrap">
                        {selectedCaseType && (
                            <div className="detail-info-box">
                                <p className="label">{selectedCaseLabel}</p>
                            </div>
                        )}

                        {/* 1. 기종 선택 */}
                        <div className="detail-info-box">
                            <p className="label">기종</p>
                            <div className="model-accordion">
                                <button type="button" className="model-accordion-trigger"
                                    onClick={() => setModelOpen(v => !v)}>
                                    <span>{selectedModelLabel || '기종을 선택하세요'}</span>
                                    <span className={`model-accordion-arrow ${modelOpen ? 'open' : ''}`}>▼</span>
                                </button>
                                {modelOpen && (
                                    <div className="model-accordion-list">
                                        <div className="model-brand-tabs">
                                            {BRANDS.map(b => (
                                                <button key={b.id} type="button"
                                                    className={selectedBrand === b.id ? 'active' : ''}
                                                    onClick={() => { setSelectedBrand(b.id); setSelectedModel(null) }}>
                                                    {b.label}
                                                </button>
                                            ))}
                                        </div>
                                        <ul className="model-sub-list">
                                            {models.map(m => (
                                                <li key={m.id}
                                                    className={selectedModel === m.id ? 'active' : ''}
                                                    onClick={() => { setSelectedModel(m.id); setModelOpen(false) }}>
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
                                    <button key={c.id}
                                        className={selectedCaseColor === c.hex ? 'active' : ''}
                                        onClick={() => setSelectedCaseColor(c.hex)}>
                                        <span className="color-chip" style={{
                                            backgroundColor: c.hex,
                                            border: c.id === 'white' ? '1px solid #ddd' : 'none'
                                        }} />
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. 케이스 타입 */}
                        <div className="detail-info-box">
                            <p className="label">케이스 타입</p>
                            <div className="model-accordion">
                                <button className="model-accordion-trigger"
                                    onClick={() => setCaseTypeOpen(v => !v)}>
                                    <span>{selectedCaseLabel || '케이스 타입을 선택하세요'}</span>
                                    <span className={`model-accordion-arrow ${caseTypeOpen ? 'open' : ''}`}>▼</span>
                                </button>
                                {caseTypeOpen && (
                                    <div className="model-accordion-list">
                                        <ul className="model-sub-list">
                                            {CASE_TYPES.map(ct => (
                                                <li key={ct.id}
                                                    className={selectedCaseType === ct.id ? 'active' : ''}
                                                    onClick={() => { setSelectedCaseType(ct.id); setCaseTypeOpen(false) }}>
                                                    {ct.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 4. 커스텀 타입 */}
                        <div className="detail-info-box">
                            <p className="label">커스텀 타입</p>
                            <div className="custom-type-btns">
                                <button className={`custom-type-btn ${designType === 'photo' ? 'active' : ''}`}
                                    onClick={() => setDesignType('photo')}>🖼️ 사진 넣기</button>
                                <button className={`custom-type-btn ${designType === 'text' ? 'active' : ''}`}
                                    onClick={() => setDesignType('text')}>✏️ 텍스트 넣기</button>
                            </div>
                        </div>

                        {/* 5-a. 사진 모드 */}
                        {designType === 'photo' && (
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
                                        <div className="custom-upload-zone"
                                            onClick={() => fileInputRef.current?.click()}>
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
                        )}

                        {/* 5-b. 텍스트 입력 */}
                        {designType === 'text' && (
                            <div className="detail-info-box">
                                <p className="label">텍스트 입력</p>
                                <div className="custom-text-input-wrap">
                                    <input type="text" className="custom-text-input"
                                        placeholder="원하시는 글씨를 입력하세요 (최대 20자)"
                                        value={textValue} maxLength={20}
                                        onChange={e => setTextValue(e.target.value)} />
                                    <span className="custom-char-count">{textValue.length} / 20</span>
                                </div>
                                <p className="label" style={{ marginTop: 16 }}>폰트 색상</p>
                                <div className="detail-colors">
                                    {FONT_COLORS.map(c => (
                                        <button key={c.id}
                                            className={fontColor === c.hex ? 'active' : ''}
                                            onClick={() => setFontColor(c.hex)}>
                                            <span className="color-chip" style={{
                                                backgroundColor: c.hex,
                                                border: c.id === 'white' ? '1px solid #ddd' : 'none'
                                            }} />
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
                        <button className="buy-btn" onClick={() => {
                            if (!canAddCart) {
                                setCartMsg('모든 옵션을 선택해주세요.')
                                setIsPopupErr(true); setIsCartPopupOpen(true); return
                            }
                            handleAddCart()
                        }}>
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