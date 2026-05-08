import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { BRANDS, TABLET_BRANDS, LAPTOP_BRANDS, CASE_TYPES, TABLET_CASE_TYPES, LAPTOP_CASE_TYPES, CASE_COLORS } from './constants'
import { PhonePreview, isCaseTypeSupported } from './PhonePreview'
import { TextInputSection } from './TextInputSection'
import { PhotoSection } from './PhotoSection'
import ShippingInfo from '../../components/sub/product detail page/ShippingInfo'
import './scss/ProductCustomizePage.scss'

// ✅ 빠른 메뉴 데이터
const QUICK_MENUS = [
    { id: 'phone', label: 'Phone Case', sub: '폰 케이스 커스텀', icon: '📱' },
    { id: 'tablet', label: 'Tablet Case', sub: '태블릿 케이스 커스텀', icon: '⬛' },
    { id: 'laptop', label: 'MacBook Case', sub: '맥북 케이스 커스텀', icon: '💻' },
]

// ✅ 라이브러리 없이 hex → 한글 색상명 자동매칭
const COLOR_NAME_TABLE = [
    { name: '블랙',       hex: '#000000' },
    { name: '화이트',     hex: '#ffffff' },
    { name: '레드',       hex: '#ff0000' },
    { name: '오렌지',     hex: '#ff8000' },
    { name: '옐로우',     hex: '#ffff00' },
    { name: '라임',       hex: '#80ff00' },
    { name: '그린',       hex: '#00ff00' },
    { name: '민트',       hex: '#00ff80' },
    { name: '시안',       hex: '#00ffff' },
    { name: '스카이블루', hex: '#0080ff' },
    { name: '블루',       hex: '#0000ff' },
    { name: '바이올렛',   hex: '#8000ff' },
    { name: '퍼플',       hex: '#ff00ff' },
    { name: '마젠타',     hex: '#ff0080' },
    { name: '핑크',       hex: '#ffb6c1' },
    { name: '살몬',       hex: '#fa8072' },
    { name: '코랄',       hex: '#ff6b6b' },
    { name: '브라운',     hex: '#8b4513' },
    { name: '베이지',     hex: '#f5f5dc' },
    { name: '아이보리',   hex: '#fffff0' },
    { name: '골드',       hex: '#ffd700' },
    { name: '실버',       hex: '#c0c0c0' },
    { name: '그레이',     hex: '#808080' },
    { name: '다크그레이', hex: '#404040' },
    { name: '네이비',     hex: '#001f5b' },
    { name: '틸',         hex: '#008080' },
    { name: '올리브',     hex: '#808000' },
    { name: '인디고',     hex: '#4b0082' },
    { name: '마룬',       hex: '#800000' },
    { name: '라벤더',     hex: '#e6e6fa' },
]

const hexToRgb = (hex) => {
    const h = hex.replace('#', '')
    return {
        r: parseInt(h.substring(0, 2), 16),
        g: parseInt(h.substring(2, 4), 16),
        b: parseInt(h.substring(4, 6), 16),
    }
}

const colorDistance = (hex1, hex2) => {
    const a = hexToRgb(hex1)
    const b = hexToRgb(hex2)
    return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2)
}

const getColorLabel = (hex) => {
    if (!hex) return null
    const preset = CASE_COLORS.find(c => c.hex.toLowerCase() === hex.toLowerCase())
    if (preset) return preset.label
    let minDist = Infinity
    let matched = COLOR_NAME_TABLE[0].name
    for (const color of COLOR_NAME_TABLE) {
        const dist = colorDistance(hex, color.hex)
        if (dist < minDist) {
            minDist = dist
            matched = color.name
        }
    }
    return matched
}

// ✅ 커스텀 컬러 피커 컴포넌트 (케이스 컬러용)
function ColorPickerButton({ value, onChange, presetColors }) {
    const inputRef = useRef(null)
    const isCustom = value && !presetColors.some(c => c.hex.toLowerCase() === value.toLowerCase())
    const label = isCustom ? value.toUpperCase() : '직접 선택'

    return (
        <button
            type="button"
            className={`color-picker-btn ${isCustom ? 'active' : ''}`}
            onClick={() => inputRef.current?.click()}
            style={{ position: 'relative' }}
            title="직접 색상 선택"
        >
            <span
                className="color-chip color-chip-custom"
                style={{
                    background: isCustom
                        ? value
                        : 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                    border: '1px solid #ddd',
                }}
            />
            {label}
            <input
                ref={inputRef}
                type="color"
                value={isCustom ? value.toLowerCase() : '#ffffff'}
                onChange={e => onChange(e.target.value)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                tabIndex={-1}
            />
        </button>
    )
}

// ✅ 내부 컨텐츠 컴포넌트 (key로 완전 리마운트 트리거)
function ProductCustomizeContent({ deviceType }) {
    const navigate = useNavigate()
    const { user, onAddToCart } = useAuthStore()

    const brandList =
        deviceType === 'tablet' ? TABLET_BRANDS :
        deviceType === 'laptop' ? LAPTOP_BRANDS :
        BRANDS

    const caseTypeList =
        deviceType === 'tablet' ? TABLET_CASE_TYPES :
        deviceType === 'laptop' ? LAPTOP_CASE_TYPES :
        CASE_TYPES

    const isNonPhone = deviceType === 'tablet' || deviceType === 'laptop'

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

    // ✅ ref를 객체 리터럴이 아닌 개별 useRef로 선언 (렌더마다 새로 생성되는 문제 방지)
    const step1Ref = useRef(null)
    const step2Ref = useRef(null)
    const step3Ref = useRef(null)
    const step4Ref = useRef(null)
    const step5Ref = useRef(null)
    const rightPanelRef = useRef(null)
    const filterSectionRef = useRef(null) // ✅ 필터 선택 영역 ref

    // ✅ 초기 마운트 여부 추적 — 초기 세팅으로 인한 불필요한 스크롤 방지
    const isMounted = useRef(false)
    useEffect(() => {
        isMounted.current = true
    }, [])

    // ✅ 오른쪽 패널 내부만 스크롤 — 요소의 bottom + 여유값만큼 내려감
    const scrollToStep = (ref, extra = 80) => {
        const el = ref?.current
        const panel = rightPanelRef.current
        if (!el || !panel) return

        const panelRect = panel.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        const offset = elRect.bottom - panelRect.bottom + panel.scrollTop + extra
        panel.scrollTo({ top: offset, behavior: 'smooth' })
    }

    // ✅ 포토/스티커 선택 후 필터 섹션까지 스크롤 (더 많이 내려감)
    const scrollToFilter = () => {
        const el = filterSectionRef.current
        const panel = rightPanelRef.current
        if (!el || !panel) return

        const panelRect = panel.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        const offset = elRect.bottom - panelRect.bottom + panel.scrollTop + 120
        panel.scrollTo({ top: offset, behavior: 'smooth' })
    }

    const price = 89000

    const selectedModelLabel = brandList.flatMap(b => b.models).find(m => m.id === selectedModel)?.label
    const models = brandList.find(b => b.id === selectedBrand)?.models || []
    const selectedCaseLabel = caseTypeList.find(c => c.id === selectedCaseType)?.label
    const deviceTypeLabel = {
        phone: 'Phone Custom Case',
        laptop: 'MacBook Custom Case',
        tablet: 'Tablet Custom Case',
    }[deviceType] || ''

    const previewURL = photoTab === 'sticker' ? selectedSticker?.src || null : photoURL

    const resetDesign = () => {
        setDesignType(null)
        setPhotoFile(null)
        setPhotoURL(null)
        setPhotoFilter(null)
        setFilterStrength(50)
        setTextValue('')
        setFontColor(null)
        setPhotoTab('upload')
        setSelectedSticker(null)
    }

    const isModelSupportedByCaseType = (modelId) => {
        if (!selectedCaseType) return true
        return isCaseTypeSupported(modelId, selectedCaseType)
    }

    const isCaseTypeSupportedByModel = (caseTypeId) => {
        if (!selectedModel) return true
        return isCaseTypeSupported(selectedModel, caseTypeId)
    }

    useEffect(() => {
        if (!selectedCaseType) return
        const ok = (brandList.find(b => b.id === selectedBrand)?.models || [])
            .some(m => isCaseTypeSupported(m.id, selectedCaseType))
        if (!ok) {
            const first = brandList.find(b => b.models.some(m => isCaseTypeSupported(m.id, selectedCaseType)))
            if (first) setSelectedBrand(first.id)
        }
    }, [selectedCaseType])

    // ✅ 단계 완료 시 자동 스크롤 — isMounted 체크로 초기 렌더 스크롤 방지

    // step1(기종) 완료 → step2(케이스 컬러)로 스크롤
    useEffect(() => {
        if (!isMounted.current) return
        if (selectedModel) setTimeout(() => scrollToStep(step2Ref), 150)
    }, [selectedModel])

    // step2(케이스 컬러) 완료 → step3(케이스 타입)으로 스크롤
    useEffect(() => {
        if (!isMounted.current) return
        if (selectedCaseColor) setTimeout(() => scrollToStep(step3Ref), 150)
    }, [selectedCaseColor])

    // step3(케이스 타입) 완료 → step4(커스텀 타입)으로 스크롤
    // isNonPhone이면 초기값이 세팅돼 있으므로 마운트 직후는 건너뜀
    useEffect(() => {
        if (!isMounted.current) return
        if (selectedCaseType && selectedCaseColor) setTimeout(() => scrollToStep(step4Ref), 150)
    }, [selectedCaseType])

    // step4(커스텀 타입) 완료 → step5(사진/텍스트)으로 스크롤
    useEffect(() => {
        if (!isMounted.current) return
        if (designType) setTimeout(() => scrollToStep(step5Ref), 150)
    }, [designType])

    const canAddCart =
        selectedModel && selectedCaseColor && selectedCaseType && designType &&
        (designType === 'photo'
            ? (photoTab === 'upload' ? (photoFile && photoFilter) : selectedSticker)
            : (textValue.trim().length > 0 && fontColor))

    const totalSteps = 5
    const doneSteps = [
        !!selectedModel,
        !!selectedCaseColor,
        !!selectedCaseType,
        !!designType,
        designType === 'photo'
            ? (photoTab === 'upload' ? !!(photoFile && photoFilter) : !!selectedSticker)
            : designType === 'text' ? !!(textValue.trim().length > 0 && fontColor) : false,
    ].filter(Boolean).length
    const percent = Math.round((doneSteps / totalSteps) * 100)
    const isAllDone = doneSteps === totalSteps

    useEffect(() => {
        let wasMobile = window.innerWidth <= 860
        const apply = () => {
            const isMobile = window.innerWidth <= 860
            if (wasMobile && !isMobile) window.scrollTo({ top: 0, behavior: 'smooth' })
            wasMobile = isMobile
            if (isMobile) { document.body.style.overflow = ''; return }
            document.body.style.overflow = canAddCart ? '' : 'hidden'
        }
        apply()
        window.addEventListener('resize', apply)
        return () => { window.removeEventListener('resize', apply); document.body.style.overflow = '' }
    }, [canAddCart])

    const optionSummary = [
        selectedModelLabel,
        selectedCaseColor ? getColorLabel(selectedCaseColor) : null,
        selectedCaseLabel,
        designType === 'photo'
            ? (photoTab === 'sticker' ? '스티커 커스텀' : '포토 커스텀')
            : designType === 'text' ? '텍스트 커스텀' : null,
    ].filter(Boolean).join(' / ')

    const handleAddCart = async () => {
        if (!user) { navigate('/login'); return }

        const cartImgUrl =
            deviceType === 'tablet' ? '/images/custom/cart/ipad-cart-go.png' :
            deviceType === 'laptop' ? '/images/custom/cart/macbbok-cart-go.png' :
            '/images/custom/cart/phone-cart-go.png'

        const productName =
            deviceType === 'tablet' ? '태블릿 커스텀 케이스' :
            deviceType === 'laptop' ? '맥북 커스텀 케이스' :
            '폰 커스텀 케이스'

        const customContent = designType === 'text'
            ? textValue
            : photoTab === 'sticker' ? selectedSticker?.src : photoURL

        const result = await onAddToCart({
            id: `CUSTOM-${Date.now()}`,
            productName,
            title: productName,
            price,
            device: selectedModelLabel || '', deviceKey: selectedModel || '',
            color: getColorLabel(selectedCaseColor) || '',
            imgUrl: cartImgUrl,
            colorList: [], deviceList: [], isPhone: deviceType === 'phone',
            deviceBrand: selectedBrand || '', caseCategory: selectedCaseType || '',
            quantity: 1, isCustom: true, customMode: designType, customContent, isWish: false
        })

        if (result) { setCartMsg('장바구니에 담겼습니다!'); setIsPopupErr(false) }
        else { setCartMsg('장바구니 담기에 실패했습니다.'); setIsPopupErr(true) }
        setIsCartPopupOpen(true)
    }

    const previewProps = {
        selectedModel, selectedCaseType,
        deviceType,
        designType, previewURL, photoFilter, filterStrength,
        textValue, fontColor, photoTab, selectedCaseColor,
    }

    const quickMenus = QUICK_MENUS.filter(m => m.id !== deviceType)

    const QuickMenu = () => (
        <div className="custom-quick-menu">
            <p className="quick-menu-label">다른 커스텀 하러가기</p>
            <div className="quick-menu-list">
                {quickMenus.map(menu => (
                    <button
                        key={menu.id}
                        className="quick-menu-item"
                        onClick={() => navigate('/custom/studio', { state: { deviceType: menu.id } })}
                    >
                        <span className="quick-menu-icon">{menu.icon}</span>
                        <span className="quick-menu-text">
                            <strong>{menu.label}</strong>
                            <small>{menu.sub}</small>
                        </span>
                        <span className="quick-menu-arrow">→</span>
                    </button>
                ))}
            </div>
        </div>
    )

    // ✅ 단계 상태 클래스 계산 함수
    const stepClass = (locked, done) => {
        if (locked) return 'step-locked'
        if (done) return 'step-done'
        return 'step-active'
    }

    return (
        <section className="custom detail-page-custom">
            <div className="inner">
            <div className="detail-inner-custom">

                {/* 왼쪽: 프리뷰 */}
                <div className="detail-left-custom">
                    <div className="detail-image-wrap">
                        <div className="detail-main-image custom-preview-main" style={{ minHeight: '70vh' }}>
                            <PhonePreview {...previewProps} />
                        </div>
                        <div className="progress-bar-wrap">
                            <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                        </div>
                        <p className={`progress-complete-msg ${isAllDone ? 'visible' : ''}`}>
                            COMPLETE! · 모든 단계를 완료했습니다
                        </p>
                    </div>
                    {isAllDone && (
                        <div className="quick-menu-desktop">
                            <QuickMenu />
                        </div>
                    )}
                </div>

                {/* 오른쪽: 옵션 패널 */}
                <div className="detail-right-custom" ref={rightPanelRef}>
                    <div className="detail-meta">
                        <span className="badge-free-ship">무료 배송</span>
                        <span className="detail-product-id">CUSTOM · {deviceTypeLabel}</span>
                    </div>
                    <h2 className="detail-title">{deviceTypeLabel}</h2>
                    <p className="detail-price">{price.toLocaleString()}원</p>

                    <div className="right-info-wrap">

                        {/* ① 기종 */}
                        <div
                            ref={step1Ref}
                            className={`detail-info-box step-block ${stepClass(false, !!selectedModel)}`}
                        >
                            <div className="step-label-row">
                                <p className="label">① 기종</p>
                                {selectedModel && (
                                    <button type="button" className="step-back-btn"
                                        onClick={() => { setSelectedModel(null); setModelOpen(true); resetDesign(); setSelectedCaseColor(null); setSelectedCaseType(isNonPhone ? caseTypeList[0]?.id : null); setTimeout(() => scrollToStep(step1Ref, 40), 100) }}>
                                        ← 다시 선택
                                    </button>
                                )}
                            </div>
                            <div className="model-accordion">
                                <button type="button" className="model-accordion-trigger"
                                    disabled={!!selectedModel}
                                    style={{ cursor: selectedModel ? 'default' : 'pointer' }}
                                    onClick={() => { setModelOpen(v => !v); setCaseTypeOpen(false) }}>
                                    <span>{selectedModelLabel || '기종을 선택하세요'}</span>
                                    {!selectedModel && <span className={`model-accordion-arrow ${modelOpen ? 'open' : ''}`}>▼</span>}
                                </button>
                                {modelOpen && (
                                    <div className="model-accordion-list">
                                        {selectedModel && (
                                            <button type="button" className="reset-btn"
                                                onClick={() => { setSelectedModel(null); setModelOpen(false) }}>
                                                기종 다시 고르기
                                            </button>
                                        )}
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
                                        <ul className="model-sub-list">
                                            {models
                                                .filter(m => isModelSupportedByCaseType(m.id))
                                                .map(m => (
                                                    <li key={m.id}
                                                        className={selectedModel === m.id ? 'active' : ''}
                                                        onClick={() => {
                                                            setSelectedModel(m.id)
                                                            setModelOpen(false)
                                                            resetDesign()
                                                        }}>
                                                        {m.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ② 케이스 컬러 — 기종 선택 후 활성화 */}
                        <div
                            ref={step2Ref}
                            className={`detail-info-box step-block ${stepClass(!selectedModel, !!selectedCaseColor)}`}
                        >
                            <div className="step-label-row">
                                <p className="label">② 케이스 컬러</p>
                                {selectedCaseColor && (
                                    <button type="button" className="step-back-btn"
                                        onClick={() => { setSelectedCaseColor(null); setTimeout(() => scrollToStep(step2Ref, 40), 100) }}>
                                        ← 다시 선택
                                    </button>
                                )}
                            </div>
                            <div className="detail-colors">
                                {CASE_COLORS.map(c => (
                                    <button key={c.id}
                                        disabled={!selectedModel}
                                        className={selectedCaseColor?.toLowerCase() === c.hex.toLowerCase() ? 'active' : ''}
                                        onClick={() => setSelectedCaseColor(c.hex)}>
                                        <span className="color-chip" style={{
                                            backgroundColor: c.hex,
                                            border: c.id === 'white' ? '1px solid #ddd' : 'none',
                                        }} />
                                        {c.label}
                                    </button>
                                ))}
                                {/* 기종 선택 후에만 컬러피커 렌더 */}
                                {selectedModel && (
                                    <ColorPickerButton
                                        value={selectedCaseColor}
                                        onChange={setSelectedCaseColor}
                                        presetColors={CASE_COLORS}
                                    />
                                )}
                            </div>
                        </div>

                        {/* ③ 케이스 타입 — 컬러 선택 후 활성화 */}
                        <div
                            ref={step3Ref}
                            className={`detail-info-box step-block ${stepClass(!selectedCaseColor, !!selectedCaseType)}`}
                        >
                            <div className="step-label-row">
                                <p className="label">③ 케이스 타입</p>
                                {selectedCaseType && !isNonPhone && (
                                    <button type="button" className="step-back-btn"
                                        onClick={() => { setSelectedCaseType(null); resetDesign(); setTimeout(() => scrollToStep(step3Ref, 40), 100) }}>
                                        ← 다시 선택
                                    </button>
                                )}
                            </div>
                            <div className="model-accordion">
                                <button
                                    className="model-accordion-trigger"
                                    onClick={() => {
                                        if (!selectedCaseColor || isNonPhone) return
                                        setCaseTypeOpen(v => !v)
                                        setModelOpen(false)
                                    }}
                                    style={{
                                        cursor: (!selectedCaseColor || isNonPhone) ? 'default' : 'pointer',
                                        background: isNonPhone ? '#f7f7f7' : '#fff',
                                    }}
                                >
                                    <span>{selectedCaseLabel || '케이스 타입을 선택하세요'}</span>
                                    {!isNonPhone && (
                                        <span className={`model-accordion-arrow ${caseTypeOpen ? 'open' : ''}`}>▼</span>
                                    )}
                                </button>
                                {!isNonPhone && caseTypeOpen && (
                                    <div className="model-accordion-list">
                                        {selectedCaseType && (
                                            <button type="button" className="reset-btn"
                                                onClick={() => { setSelectedCaseType(null); setCaseTypeOpen(false) }}>
                                                케이스타입 다시 고르기
                                            </button>
                                        )}
                                        <ul className="model-sub-list">
                                            {caseTypeList
                                                .filter(ct => isCaseTypeSupportedByModel(ct.id))
                                                .map(ct => (
                                                    <li key={ct.id}
                                                        className={selectedCaseType === ct.id ? 'active' : ''}
                                                        onClick={() => {
                                                            setSelectedCaseType(ct.id)
                                                            setCaseTypeOpen(false)
                                                            resetDesign()
                                                        }}>
                                                        {ct.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ④ 커스텀 타입 — 케이스 타입 선택 후 활성화 */}
                        <div
                            ref={step4Ref}
                            className={`detail-info-box step-block ${stepClass(!selectedCaseType, !!designType)}`}
                        >
                            <div className="step-label-row">
                                <p className="label">④ 커스텀 타입</p>
                                {designType && (
                                    <button type="button" className="step-back-btn"
                                        onClick={() => { resetDesign(); setTimeout(() => scrollToStep(step4Ref, 40), 100) }}>
                                        ← 다시 선택
                                    </button>
                                )}
                            </div>
                            <div className="custom-type-btns">
                                <button
                                    disabled={!selectedCaseType}
                                    className={`custom-type-btn ${designType === 'photo' ? 'active' : ''}`}
                                    onClick={() => setDesignType('photo')}
                                >
                                    포토 커스텀
                                </button>
                                <button
                                    disabled={!selectedCaseType}
                                    className={`custom-type-btn ${designType === 'text' ? 'active' : ''}`}
                                    onClick={() => setDesignType('text')}
                                >
                                    텍스트 커스텀
                                </button>
                            </div>
                        </div>

                        {/* ⑤ 사진 / 텍스트 — 커스텀 타입 선택 후 표시 */}
                        <div ref={step5Ref}>
                            {designType === 'photo' && (
                                <PhotoSection
                                    photoTab={photoTab} setPhotoTab={setPhotoTab}
                                    photoURL={photoURL} setPhotoURL={setPhotoURL} setPhotoFile={setPhotoFile}
                                    photoFilter={photoFilter} setPhotoFilter={setPhotoFilter}
                                    filterStrength={filterStrength} setFilterStrength={setFilterStrength}
                                    selectedSticker={selectedSticker} setSelectedSticker={setSelectedSticker}
                                    filterSectionRef={filterSectionRef}
                                    onScrollToFilter={scrollToFilter}
                                />
                            )}
                            {designType === 'text' && (
                                <TextInputSection
                                    textValue={textValue} setTextValue={setTextValue}
                                    fontColor={fontColor} setFontColor={setFontColor}
                                    showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker}
                                />
                            )}
                        </div>

                    </div>

                    {/* 주문 요약 + 장바구니 */}
                    <div className="right-btn-wrap">
                        {canAddCart ? (
                            <>
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
                                <button className="buy-btn" onClick={handleAddCart}>
                                    <span className="icon">
                                        <img src="/images/icon/btn_shopping-cart.svg" alt="" />
                                    </span>
                                    장바구니에 담기
                                </button>
                            </>
                        ) : (
                            <button className="buy-btn buy-btn-disabled" onClick={() => {
                                setCartMsg('모든 옵션을 선택해주세요.')
                                setIsPopupErr(true)
                                setIsCartPopupOpen(true)
                            }}>
                                <span className="icon">
                                    <img src="/images/icon/btn_shopping-cart.svg" alt="" />
                                </span>
                                장바구니에 담기
                            </button>
                        )}
                    </div>

                    {isAllDone && (
                        <div className="quick-menu-mobile">
                            <QuickMenu />
                        </div>
                    )}
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

<div className='shipping-margin' style={{ marginTop: '60px' }}>
    <ShippingInfo />
</div></div>

        </section>
    )
}

// ✅ 외부 래퍼: deviceType이 바뀌면 key가 바뀌어 내부 컴포넌트 완전 리마운트 → 모든 state 자동 초기화
export function ProductCustomizePage() {
    const location = useLocation()
    const deviceType = location.state?.deviceType || 'phone'
    return <ProductCustomizeContent key={deviceType} deviceType={deviceType} />
}

export default ProductCustomizePage