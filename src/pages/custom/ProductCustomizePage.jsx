import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { BRANDS, TABLET_BRANDS, LAPTOP_BRANDS, CASE_TYPES, TABLET_CASE_TYPES, LAPTOP_CASE_TYPES, CASE_COLORS } from './constants'
import { PhonePreview, isCaseTypeSupported } from './PhonePreview'
import { TextInputSection } from './TextInputSection'
import { PhotoSection } from './PhotoSection'
import './scss/ProductCustomizePage.scss'

export function ProductCustomizePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, onAddToCart } = useAuthStore()
    const initialDeviceType = location.state?.deviceType || 'phone'

    const brandList =
        initialDeviceType === 'tablet' ? TABLET_BRANDS :
            initialDeviceType === 'laptop' ? LAPTOP_BRANDS :
                BRANDS

    const caseTypeList =
        initialDeviceType === 'tablet' ? TABLET_CASE_TYPES :
            initialDeviceType === 'laptop' ? LAPTOP_CASE_TYPES :
                CASE_TYPES

    const isNonPhone = initialDeviceType === 'tablet' || initialDeviceType === 'laptop'

    const [selectedBrand, setSelectedBrand] = useState(brandList[0]?.id || null)
    const [selectedModel, setSelectedModel] = useState(null)
    const [selectedCaseColor, setSelectedCaseColor] = useState(null)
    const [selectedCaseType, setSelectedCaseType] = useState(
        isNonPhone ? caseTypeList[0]?.id : null
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

    // 모든 브랜드에서 선택된 모델 라벨 찾기
    const selectedModelLabel = brandList.flatMap(b => b.models).find(m => m.id === selectedModel)?.label
    const models = brandList.find(b => b.id === selectedBrand)?.models || []
    const selectedCaseLabel = caseTypeList.find(c => c.id === selectedCaseType)?.label
    const deviceTypeLabel = {
        phone: 'Phone Custom Case',
        laptop: 'MacBook Custom Case',
        tablet: 'Tablet Custom Case'
    }[initialDeviceType] || ''

    const previewURL = photoTab === 'sticker' ? selectedSticker?.src || null : photoURL

    // ✅ 케이스타입 기준 기종 필터 (케이스타입 선택 시 적용)
    const isModelSupportedByCaseType = (modelId) => {
        if (!selectedCaseType) return true
        return isCaseTypeSupported(modelId, selectedCaseType)
    }

    // ✅ 기종 기준 케이스타입 필터 (기종 선택 시 적용)
    const isCaseTypeSupportedByModel = (caseTypeId) => {
        if (!selectedModel) return true
        return isCaseTypeSupported(selectedModel, caseTypeId)
    }

    // ✅ 케이스타입 선택됐을 때 현재 브랜드에 지원 기종 없으면 첫 번째 지원 브랜드로 이동
    useEffect(() => {
        if (!selectedCaseType) return
        const currentBrandHasSupported = (brandList.find(b => b.id === selectedBrand)?.models || [])
            .some(m => isCaseTypeSupported(m.id, selectedCaseType))
        if (!currentBrandHasSupported) {
            const firstSupported = brandList.find(b =>
                b.models.some(m => isCaseTypeSupported(m.id, selectedCaseType))
            )
            if (firstSupported) setSelectedBrand(firstSupported.id)
        }
    }, [selectedCaseType])

    const canAddCart =
        selectedModel && selectedCaseColor && selectedCaseType && designType &&
        (designType === 'photo'
            ? (photoTab === 'upload' ? (photoFile && photoFilter) : selectedSticker)
            : (textValue.trim().length > 0 && fontColor))

    useEffect(() => {
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
        const cartImgUrl =
            initialDeviceType === 'tablet' ? '/images/custom/cart/ipad-cart-go.png' :
                initialDeviceType === 'laptop' ? '/images/custom/cart/macbbok-cart-go.png' :
                    '/images/custom/cart/phone-cart-go.png'
        const customContent = designType === 'text'
            ? textValue
            : photoTab === 'sticker' ? selectedSticker?.src : photoURL
        const result = await onAddToCart({
            id: `CUSTOM-${Date.now()}`,
            productName: '커스텀 케이스', price,
            device: selectedModelLabel || '', deviceKey: selectedModel || '',
            color: selectedCaseColor || '', imgUrl: cartImgUrl,
            colorList: [], deviceList: [], isPhone: initialDeviceType === 'phone',
            deviceBrand: selectedBrand || '', caseCategory: selectedCaseType || '',
            quantity: 1, isCustom: true, customMode: designType, customContent,
        })
        if (result) { setCartMsg('장바구니에 담겼습니다!'); setIsPopupErr(false) }
        else { setCartMsg('장바구니 담기에 실패했습니다.'); setIsPopupErr(true) }
        setIsCartPopupOpen(true)
    }

    const previewProps = {
        selectedModel, selectedCaseType,
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
                                        {/* ✅ 기종 다시 고르기 버튼 */}
                                        {selectedModel && (
                                            <button
                                                type="button"
                                                className="reset-btn"
                                                onClick={() => {
                                                    setSelectedModel(null)
                                                    setModelOpen(false)
                                                }}>
                                                기종 다시 고르기
                                            </button>
                                        )}
                                        {/* ✅ 케이스타입 선택됐으면 지원 브랜드만 표시 */}
                                        <div className="model-brand-tabs">
                                            {brandList
                                                .filter(b => b.models.some(m => isModelSupportedByCaseType(m.id)))
                                                .map(b => (
                                                    <button key={b.id} type="button"
                                                        className={selectedBrand === b.id ? 'active' : ''}
                                                        onClick={() => { setSelectedBrand(b.id); setSelectedModel(null) }}>
                                                        {b.label}
                                                    </button>
                                                ))}
                                        </div>
                                        {/* ✅ 케이스타입 선택됐으면 지원 기종만 표시 */}
                                        <ul className="model-sub-list">
                                            {models
                                                .filter(m => isModelSupportedByCaseType(m.id))
                                                .map(m => (
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
                                    onClick={() => { if (isNonPhone) return; setCaseTypeOpen(v => !v); setModelOpen(false) }}
                                    style={{ cursor: isNonPhone ? 'default' : 'pointer', background: isNonPhone ? '#f7f7f7' : '#fff' }}>
                                    <span>{selectedCaseLabel || '케이스 타입을 선택하세요'}</span>
                                    {!isNonPhone && <span className={`model-accordion-arrow ${caseTypeOpen ? 'open' : ''}`}>▼</span>}
                                </button>
                                {!isNonPhone && caseTypeOpen && (
                                    <div className="model-accordion-list">
                                        {/* ✅ 케이스타입 다시 고르기 버튼 */}
                                        {selectedCaseType && (
                                            <button
                                                type="button"
                                                className="reset-btn"
                                                onClick={() => {
                                                    setSelectedCaseType(null)
                                                    setCaseTypeOpen(false)
                                                }}>
                                                케이스타입 다시 고르기
                                            </button>
                                        )}
                                        <ul className="model-sub-list">
                                            {caseTypeList
                                                // ✅ 기종 선택됐으면 지원 케이스타입만 표시
                                                .filter(ct => isCaseTypeSupportedByModel(ct.id))
                                                .map(ct => (
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