import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { BRANDS, TABLET_BRANDS, LAPTOP_BRANDS, CASE_TYPES, CASE_COLORS } from './constants'
import { PhonePreview } from './PhonePreview'
import { TextInputSection } from './TextInputSection'
import { PhotoSection } from './PhotoSection'
import './scss/ProductCustomizePage.scss'

export function ProductCustomizePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, onAddToCart } = useAuthStore()
    const initialDeviceType = location.state?.deviceType || 'phone'

    // deviceType에 따라 브랜드 목록 결정
    const brandList =
        initialDeviceType === 'tablet' ? TABLET_BRANDS :
            initialDeviceType === 'laptop' ? LAPTOP_BRANDS :
                BRANDS

    const isNonPhone = initialDeviceType === 'tablet' || initialDeviceType === 'laptop'

    const [selectedBrand, setSelectedBrand] = useState(brandList[0]?.id || null)
    const [selectedModel, setSelectedModel] = useState(null)
    const [selectedCaseColor, setSelectedCaseColor] = useState(null)
    // tablet/laptop은 케이스타입 자동으로 첫번째로 고정
    const [selectedCaseType, setSelectedCaseType] = useState(
        isNonPhone ? CASE_TYPES[0]?.id : null
    )
    const [designType, setDesignType] = useState(null)
    const [photoFile, setPhotoFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(null)
    const [photoFilter, setPhotoFilter] = useState(null)
    const [filterStrength, setFilterStrength] = useState(50)
    const [textValue, setTextValue] = useState('')
    const [fontColor, setFontColor] = useState(null)
    const [photoTab, setPhotoTab] = useState('upload')
    const [selectedSticker, setSelectedSticker] = useState(null)
    const [modelOpen, setModelOpen] = useState(false)
    const [caseTypeOpen, setCaseTypeOpen] = useState(false)
    const [cartMsg, setCartMsg] = useState('')
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false)
    const [isPopupErr, setIsPopupErr] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const price = 89000
    const models = brandList.find(b => b.id === selectedBrand)?.models || []
    const selectedModelLabel = models.find(m => m.id === selectedModel)?.label
    const selectedCaseLabel = CASE_TYPES.find(c => c.id === selectedCaseType)?.label
    const deviceTypeLabel = {
        phone: 'Phone Custom Case',
        laptop: 'MacBook Custom Case',
        tablet: 'Tablet Custom Case'
    }[initialDeviceType] || ''

    const previewURL = photoTab === 'sticker' ? selectedSticker?.src || null : photoURL

    const canAddCart =
        selectedModel && selectedCaseColor && selectedCaseType && designType &&
        (designType === 'photo'
            ? (photoTab === 'upload' ? (photoFile && photoFilter) : selectedSticker)
            : (textValue.trim().length > 0 && fontColor))

    useEffect(() => {
        // 모바일에서는 전체 스크롤 허용 (반응형에서 내부 스크롤 없음)
        if (window.innerWidth <= 768) return
        document.body.style.overflow = !!canAddCart ? '' : 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [canAddCart])

    const optionSummary = [
        selectedModelLabel,
        selectedCaseColor ? CASE_COLORS.find(c => c.hex === selectedCaseColor)?.label : null,
        selectedCaseLabel,
        designType === 'photo' ? (photoTab === 'sticker' ? '스티커 커스텀' : '포토 커스텀')
            : designType === 'text' ? '텍스트 커스텀' : null,
    ].filter(Boolean).join(' / ')

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
        if (result) { setCartMsg('장바구니에 담겼습니다!'); setIsPopupErr(false) }
        else { setCartMsg('장바구니 담기에 실패했습니다.'); setIsPopupErr(true) }
        setIsCartPopupOpen(true)
    }

    const previewProps = {
        selectedModel,
        selectedCaseType,
        deviceType: initialDeviceType,
        designType, previewURL, photoFilter, filterStrength,
        textValue, fontColor, photoTab, selectedCaseColor,
    }

    return (
        <section className="custom detail-page">
            <div className="detail-inner">

                {/* 왼쪽: 프리뷰 */}
                <div className="detail-left">
                    <div className="detail-image-wrap">
                        <div className="detail-main-image custom-preview-main">
                            <PhonePreview {...previewProps} />
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 옵션 */}
                <div className="detail-right-custom">
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

                        {/* 1. 기종 */}
                        <div className="detail-info-box">
                            <p className="label">기종</p>
                            <div className="model-accordion">
                                <button type="button" className="model-accordion-trigger"
                                    onClick={() => { setModelOpen(v => !v); setCaseTypeOpen(false) }}>
                                    <span>{selectedModelLabel || '기종을 선택하세요'}</span>
                                    <span className={`model-accordion-arrow ${modelOpen ? 'open' : ''}`}>▼</span>
                                </button>
                                {modelOpen && (
                                    <div className="model-accordion-list">
                                        <div className="model-brand-tabs">
                                            {brandList.map(b => (
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

                        {/* 3. 케이스 타입 - 폰만 표시 */}
                        {!isNonPhone && (
                            <div className="detail-info-box">
                                <p className="label">케이스 타입</p>
                                <div className="model-accordion">
                                    <button className="model-accordion-trigger"
                                        onClick={() => { setCaseTypeOpen(v => !v); setModelOpen(false) }}>
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
                        )}

                        {/* 4. 커스텀 타입 */}
                        <div className="detail-info-box">
                            <p className="label">커스텀 타입</p>
                            <div className="custom-type-btns">
                                <button className={`custom-type-btn ${designType === 'photo' ? 'active' : ''}`}
                                    onClick={() => setDesignType('photo')}>포토 커스텀</button>
                                <button className={`custom-type-btn ${designType === 'text' ? 'active' : ''}`}
                                    onClick={() => setDesignType('text')}>텍스트 커스텀</button>
                            </div>
                        </div>

                        {/* 5-a. 사진 */}
                        {designType === 'photo' && (
                            <PhotoSection
                                photoTab={photoTab} setPhotoTab={setPhotoTab}
                                photoURL={photoURL} setPhotoURL={setPhotoURL} setPhotoFile={setPhotoFile}
                                photoFilter={photoFilter} setPhotoFilter={setPhotoFilter}
                                filterStrength={filterStrength} setFilterStrength={setFilterStrength}
                                selectedSticker={selectedSticker} setSelectedSticker={setSelectedSticker}
                            />
                        )}

                        {/* 5-b. 텍스트 */}
                        {designType === 'text' && (
                            <TextInputSection
                                textValue={textValue} setTextValue={setTextValue}
                                fontColor={fontColor} setFontColor={setFontColor}
                                showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker}
                            />
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