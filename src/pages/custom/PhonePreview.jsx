import React from 'react'

// ── 베이스 경로 ───────────────────────────────────
const PHONE_BASE_MAP = {
    'impact': '/images/custom/model/impact',
    'magsafe-bounce': '/images/custom/model/bounce',
    'magsafe-compact': '/images/custom/model/ring',
}
const IPAD_BASE = '/images/custom/model/ipad'
const LAPTOP_BASE = '/images/custom/model/macbook'

// ── impact 파일명 ─────────────────────────────────
const MODEL_FILE_MAP = {
    'iphone17promax': 'IPHONE17PROMAX',
    'iphone17pro': 'IPHONE17PRO',
    'iphone17': 'IPHONE17',
    'iphone16promax': 'IPHONE16PROMAX',
    'iphone16': 'IPHONE16',
    'iphone15': 'IPHONE15',
    'iphone14plus': 'IPHONE14PLUS',
    'iphone13promax': 'IPHONE13PROMAX',
    'iphoneMini': 'IPHONEMINI',
    's25ultra': 'GALAXYS25ULTRA',
    's25plus': 'GALAXYS25PLUS',
    's25': null,
    's24': 'GALAXYS24',
    'z6fold': 'ZFOLDER6',
    'z6flip': 'ZFLIP6',
    'pixel9pro': 'PIXELPRO9',
    'pixel9': 'GOOGLE9',
    'pixel8pro': 'GOOGLEPRO9',
}

const CAMERA_FILE_OVERRIDE = {
    'z6fold': 'ZFOLDER6-CAMEARA',
    's25': null,
}

// ── bounce 파일명 ─────────────────────────────────
// ✅ 실제 파일명 그대로 입력하세요 (확장자 제외)
// null = 해당 기종 이미지 없음 → 케이스타입 메뉴에서 자동 숨김
export const BOUNCE_FILE_MAP = {
    'iphone17promax': '17pro-bouce',
    'iphone17pro': '17pro-bouce',
    'iphone17': 'iphone17-bouce',
    'iphone16promax': '16pro-bouce',
    'iphone16': 'iphone16-bouce',
    'iphone15': 'iphone15-bouce',
    'iphone15promax': '15pro-bouce',   // ← 15pro가 있다면
    'iphone14plus': null,
    'iphone13promax': null,
    'iphoneMini': null,
    's25ultra': null,
    's25plus': null,
    's25': null,
    's24': null,
    'z6fold': null,
    'z6flip': null,
    'pixel9pro': null,
    'pixel9': null,
    'pixel8pro': null,
}

// ── ring 파일명 ───────────────────────────────────
// ✅ 실제 파일명 그대로 입력하세요 (확장자 제외)
// null = 해당 기종 이미지 없음 → 케이스타입 메뉴에서 자동 숨김
export const RING_FILE_MAP = {
    'iphone17promax': '17pro-ring',        // 17pro-ring.png
    'iphone17pro': '17pro-ring',        // 17pro-ring.png
    'iphone17': 'iphone17-ring',     // iphone17-ring.png
    'iphone16promax': '16pro-ring',        // 16pro-ring.png
    'iphone16': 'iphone16-ring',     // iphone16-ring.png
    'iphone15': 'iphone15-ring',     // iphone15-ring.png
    'iphone14plus': null,
    'iphone13promax': null,
    'iphoneMini': null,
    's25ultra': null,
    's25plus': null,
    's25': null,
    's24': null,
    'z6fold': '26plus-ring',       // 26plus-ring.png
    'z6flip': '26-ring',           // 26-ring.png
    'pixel9pro': null,
    'pixel9': null,
    'pixel8pro': null,
}

// ── 아이패드 파일명 ───────────────────────────────
const IPAD_FILE_MAP = {
    'ipad': 'ipad',
    'ipadmini': 'ipadmini',
    'ipadair4': 'ipadair4',
    'ipadair11': 'ipadair11',
    'ipadair13': 'ipadair13',
    'ipadpro11': 'ipadpro11',
    'ipadpro11s3': 'ipadpro11s3',
    'ipadpro12.9': 'ipadpro12.9',
    'ipadpro13': 'ipadpro13',
}
const IPAD_NO_CAMERA = ['ipadair11', 'ipadair13', 'ipadpro11']

// ── 맥북 파일명 ───────────────────────────────────
const LAPTOP_FILE_MAP = {
    'macbook13': 'macbook13',
    'macbook15': 'macbook15',
    'macbookair13': 'macbookair13',
    'macbookair13s1': 'macbookair13s1',
    'macbookpro14': 'macbookpro14',
    'macbookpro16': 'macbookpro16',
}

// ── 기본 레이아웃 ─────────────────────────────────
const DEFAULT_LAYOUT = {
    scale: 1.5,
    bodyW: 200, bodyH: 358,
    bodyRadius: 30,
    canvas: { top: 63, left: 43, w: 128, h: 269, radius: 10 },
    camera: { top: 59, left: 38, width: 67, height: 105 },
}

// ── impact 레이아웃 ───────────────────────────────
const MODEL_LAYOUT = {
    'iphone17promax': {
        scale: 1.5, bodyW: 280, bodyH: 358, bodyRadius: 44,
        canvas: { top: 30, left: 60, w: 140, h: 299, radius: 20 },
        camera: { top: 32, left: 55, width: 150, height: 90 },
    },
    'iphone17pro': {
        scale: 1.5, bodyW: 250, bodyH: 358, bodyRadius: 44,
        canvas: { top: 33, left: 49, w: 140, h: 300, radius: 30 },
        camera: { top: 30, left: 43, width: 150, height: 100 },
    },
    'iphone17': {
        scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
        canvas: { top: 30, left: 38, w: 137, h: 298, radius: 20 },
        camera: { top: 27, left: 35, width: 70, height: 75 },
    },
    'iphone16promax': {
        scale: 1.5, bodyW: 260, bodyH: 358, bodyRadius: 44,
        canvas: { top: 20, left: 69, w: 140, h: 320, radius: 30 },
        camera: { top: 22, left: 62, width: 80, height: 80 },
    },
    'iphone16': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 44,
        canvas: { top: 43, left: 27, w: 140, h: 300, radius: 30 },
        camera: { top: 45, left: 28, width: 73, height: 80 },
    },
    'iphone15': {
        scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 44,
        canvas: { top: 35, left: 43, w: 135, h: 300, radius: 30 },
        camera: { top: 35, left: 42, width: 77, height: 80 },
    },
    'iphone14plus': {
        scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 44,
        canvas: { top: 39, left: 43, w: 143, h: 300, radius: 20 },
        camera: { top: 38, left: 42, width: 77, height: 80 },
    },
    'iphone13promax': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 44,
        canvas: { top: 33, left: 28, w: 140, h: 309, radius: 20 },
        camera: { top: 30, left: 24, width: 87, height: 86 },
    },
    'iphoneMini': {
        scale: 1.5, bodyW: 180, bodyH: 358, bodyRadius: 44,
        canvas: { top: 63, left: 23, w: 128, h: 269, radius: 10 },
        camera: { top: 28, left: 20, width: 80, height: 80 },
    },
    's25ultra': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
        canvas: { top: 28, left: 22, w: 154, h: 320, radius: 10 },
        camera: { top: 24, left: 20, width: 87, height: 130 },
    },
    's25plus': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
        canvas: { top: 38, left: 30, w: 150, h: 303, radius: 20 },
        camera: { top: 40, left: 32, width: 67, height: 110, background: '#221f1f', radius: 20 },
    },
    's24': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
        canvas: { top: 38, left: 26, w: 148, h: 300, radius: 20 },
        camera: { top: 38, left: 23, width: 77, height: 115 },
    },
    'z6fold': {
        scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 20,
        canvas: { top: 44, left: 58, w: 140, h: 295, radius: 10 },
        camera: { top: 40, left: 53, width: 74, height: 120 },
    },
    'z6flip': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
        canvas: { top: 193, left: 33, w: 140, h: 147, radius: 7 },
        camera: { top: 45, left: 30, width: 56, height: 33 },
    },
    'pixel9pro': {
        scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 30,
        canvas: { top: 43, left: 38, w: 148, h: 300, radius: 10 },
        camera: { top: 23, left: 37, width: 150, height: 55 },
    },
    'pixel9': {
        scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 30,
        canvas: { top: 33, left: 52, w: 146, h: 310, radius: 30 },
        camera: { top: 34, left: 48, width: 150, height: 60 },
    },
    'pixel8pro': {
        scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 30,
        canvas: { top: 38, left: 38, w: 150, h: 300, radius: 25 },
        camera: { top: 40, left: 34, width: 154, height: 64 },
    },
    'ipad': {
        scale: 1.2, bodyW: 260, bodyH: 358, bodyRadius: 20,
        canvas: { top: 32, left: 41, w: 187, h: 310, radius: 20 },
        camera: { top: 40, left: 50, width: 30, height: 48, background: '#e6e6e6', radius: 30 },
    },
    'ipadmini': {
        scale: 1.2, bodyW: 240, bodyH: 338, bodyRadius: 20,
        canvas: { top: 23, left: 35, w: 186, h: 300, radius: 8 },
        camera: { top: 30, left: 40, width: 24, height: 40 },
    },
    'ipadair4': {
        scale: 1.2, bodyW: 250, bodyH: 348, bodyRadius: 18,
        canvas: { top: 30, left: 34, w: 184, h: 302, radius: 12 },
        camera: { top: 40, left: 40, width: 40, height: 40, background: '#e6e6e6', radius: 10 },
    },
    'ipadpro11s3': {
        scale: 1.2, bodyW: 250, bodyH: 348, bodyRadius: 16,
        canvas: { top: 26, left: 40, w: 168, h: 303, radius: 12 },
        camera: { top: 30, left: 44, width: 40, height: 40 },
    },
    'ipadpro12.9': {
        scale: 1.0, bodyW: 290, bodyH: 390, bodyRadius: 16,
        canvas: { top: 14, left: 22, w: 248, h: 355, radius: 15 },
        camera: { top: 20, left: 25, width: 50, height: 50 },
    },
    'ipadpro13': {
        scale: 1.0, bodyW: 290, bodyH: 390, bodyRadius: 16,
        canvas: { top: 26, left: 28, w: 248, h: 350, radius: 18 },
        camera: { top: 29, left: 30, width: 60, height: 60 },
    },
    'macbook13': {
        scale: 1.2, bodyW: 380, bodyH: 240, bodyRadius: 10,
        canvas: { top: 19, left: 29, w: 338, h: 203, radius: 47 },
        camera: null,
    },
    'macbook15': {
        scale: 1.1, bodyW: 420, bodyH: 260, bodyRadius: 10,
        canvas: { top: 29, left: 34, w: 370, h: 210, radius: 45 },
        camera: null,
    },
    'macbookair13': {
        scale: 1.2, bodyW: 380, bodyH: 240, bodyRadius: 10,
        canvas: { top: 30, left: 35, w: 329, h: 191, radius: 46 },
        camera: null,
    },
    'macbookair13s1': {
        scale: 1.2, bodyW: 380, bodyH: 240, bodyRadius: 10,
        canvas: { top: 21.2, left: 40, w: 320, h: 195, radius: 9 },
        camera: null,
    },
    'macbookpro14': {
        scale: 1.15, bodyW: 400, bodyH: 252, bodyRadius: 10,
        canvas: { top: 17.6, left: 32, w: 348.8, h: 219, radius: 49.8 },
        camera: null,
    },
    'macbookpro16': {
        scale: 1.05, bodyW: 440, bodyH: 275, bodyRadius: 10,
        canvas: { top: 25, left: 27, w: 388.8, h: 232.5, radius: 49 },
        camera: null,
    },
}

// ── bounce 레이아웃 ───────────────────────────────
// ✅ canvas/camera 값을 각 기종 bounce 이미지에 맞게 조절하세요
const BOUNCE_LAYOUT = {
    'iphone17promax': {
        scale: 1.5, bodyW: 280, bodyH: 358, bodyRadius: 44,
        canvas: { top: 30, left: 60, w: 140, h: 299, radius: 20 },
        camera: { top: 32, left: 55, width: 150, height: 90 },
    },
    'iphone17pro': {
        scale: 1.5, bodyW: 250, bodyH: 358, bodyRadius: 44,
        canvas: { top: 33, left: 49, w: 140, h: 300, radius: 30 },
        camera: { top: 30, left: 43, width: 150, height: 100 },
    },
    'iphone17': {
        scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
        canvas: { top: 30, left: 38, w: 137, h: 298, radius: 20 },
        camera: { top: 27, left: 35, width: 70, height: 75 },
    },
    'iphone16promax': {
        scale: 1.5, bodyW: 260, bodyH: 358, bodyRadius: 44,
        canvas: { top: 20, left: 69, w: 140, h: 320, radius: 30 },
        camera: { top: 22, left: 62, width: 80, height: 80 },
    },
    'iphone16': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 44,
        canvas: { top: 43, left: 27, w: 140, h: 300, radius: 30 },
        camera: { top: 45, left: 28, width: 73, height: 80 },
    },
    'iphone15': {
        scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 44,
        canvas: { top: 35, left: 43, w: 135, h: 300, radius: 30 },
        camera: { top: 35, left: 42, width: 77, height: 80 },
    },
}

// ── ring 레이아웃 ─────────────────────────────────
// ✅ canvas/camera 값을 각 기종 ring 이미지에 맞게 조절하세요
const RING_LAYOUT = {
    'iphone17promax': {
        scale: 1.5, bodyW: 280, bodyH: 358, bodyRadius: 44,
        canvas: { top: 30, left: 60, w: 140, h: 299, radius: 20 },
        camera: { top: 32, left: 55, width: 150, height: 90 },
    },
    'iphone17pro': {
        scale: 1.5, bodyW: 250, bodyH: 358, bodyRadius: 44,
        canvas: { top: 33, left: 49, w: 140, h: 300, radius: 30 },
        camera: { top: 30, left: 43, width: 150, height: 100 },
    },
    'iphone17': {
        scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 44,
        canvas: { top: 30, left: 38, w: 137, h: 298, radius: 20 },
        camera: { top: 27, left: 35, width: 70, height: 75 },
    },
    'iphone16promax': {
        scale: 1.5, bodyW: 260, bodyH: 358, bodyRadius: 44,
        canvas: { top: 20, left: 69, w: 140, h: 320, radius: 30 },
        camera: { top: 22, left: 62, width: 80, height: 80 },
    },
    'iphone16': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 44,
        canvas: { top: 43, left: 27, w: 140, h: 300, radius: 30 },
        camera: { top: 45, left: 28, width: 73, height: 80 },
    },
    'iphone15': {
        scale: 1.5, bodyW: 230, bodyH: 358, bodyRadius: 44,
        canvas: { top: 35, left: 43, w: 135, h: 300, radius: 30 },
        camera: { top: 35, left: 42, width: 77, height: 80 },
    },
    'z6fold': {
        scale: 1.5, bodyW: 220, bodyH: 358, bodyRadius: 20,
        canvas: { top: 44, left: 58, w: 140, h: 295, radius: 10 },
        camera: { top: 40, left: 53, width: 74, height: 120 },
    },
    'z6flip': {
        scale: 1.5, bodyW: 200, bodyH: 358, bodyRadius: 30,
        canvas: { top: 193, left: 33, w: 140, h: 147, radius: 7 },
        camera: { top: 45, left: 30, width: 56, height: 33 },
    },
}

// ── 케이스타입별 지원 여부 체크 (숨김 처리용) ────────
// ✅ ProductCustomizePage에서 import해서 사용
export function isCaseTypeSupported(modelId, caseTypeId) {
    if (caseTypeId === 'magsafe-bounce') return !!BOUNCE_FILE_MAP[modelId]
    if (caseTypeId === 'magsafe-compact') return !!RING_FILE_MAP[modelId]
    return true // impact는 항상 표시
}

// ── 필터 스타일 ──────────────────────────────────
function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro': return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono': return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default: return {}
    }
}

// ── 케이스타입별 레이아웃 선택 ────────────────────
function getLayout(selectedModel, selectedCaseType) {
    if (selectedCaseType === 'magsafe-bounce') {
        return BOUNCE_LAYOUT[selectedModel] || MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
    }
    if (selectedCaseType === 'magsafe-compact') {
        return RING_LAYOUT[selectedModel] || MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
    }
    return MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
}

// ── PhonePreview 컴포넌트 ─────────────────────────
export function PhonePreview({
    selectedModel,
    selectedCaseType,
    designType,
    previewURL,
    photoFilter,
    filterStrength,
    textValue,
    fontColor,
    photoTab,
    selectedCaseColor,
    deviceType,
}) {
    const isTablet = deviceType === 'tablet'
    const isLaptop = deviceType === 'laptop'

    let bodySrc = null
    let cameraSrc = null

    if (isTablet) {
        const fileKey = IPAD_FILE_MAP[selectedModel]
        if (fileKey) {
            bodySrc = `${IPAD_BASE}/${fileKey}.png`
            if (!IPAD_NO_CAMERA.includes(selectedModel)) {
                cameraSrc = `${IPAD_BASE}/${fileKey}-camera.png`
            }
        }
    } else if (isLaptop) {
        const fileKey = LAPTOP_FILE_MAP[selectedModel]
        if (fileKey) bodySrc = `${LAPTOP_BASE}/${fileKey}.png`
        cameraSrc = null
    } else {
        if (selectedCaseType === 'magsafe-bounce') {
            const fileKey = BOUNCE_FILE_MAP[selectedModel]
            if (fileKey) {
                bodySrc = `${PHONE_BASE_MAP['magsafe-bounce']}/${fileKey}.png`
                cameraSrc = `${PHONE_BASE_MAP['magsafe-bounce']}/${fileKey}-camera.png`
            }
        } else if (selectedCaseType === 'magsafe-compact') {
            const fileKey = RING_FILE_MAP[selectedModel]
            if (fileKey) {
                bodySrc = `${PHONE_BASE_MAP['magsafe-compact']}/${fileKey}.png`
                cameraSrc = `${PHONE_BASE_MAP['magsafe-compact']}/${fileKey}-camera.png`
            }
        } else {
            const phoneBase = PHONE_BASE_MAP['impact']
            const fileKey = MODEL_FILE_MAP[selectedModel]
            const cameraKey = selectedModel in CAMERA_FILE_OVERRIDE
                ? CAMERA_FILE_OVERRIDE[selectedModel]
                : (fileKey ? `${fileKey}-CAMERA` : null)
            bodySrc = fileKey ? `${phoneBase}/${fileKey}.png` : null
            cameraSrc = cameraKey ? `${phoneBase}/${cameraKey}.png` : null
        }
    }

    const showPreview = !!selectedModel && !!selectedCaseType && !!bodySrc
    const layout = getLayout(selectedModel, selectedCaseType)
    const { scale, bodyW, bodyH, bodyRadius, canvas, camera } = layout

    // ── Placeholder ───────────────────────────────
    if (!showPreview) {
        return (
            <div className="custom-phone-preview" style={{ '--case-color': selectedCaseColor || '#111111' }}>
                <div className="custom-phone-body">
                    <div className="custom-phone-camera">
                        <div className="custom-phone-lens" />
                        <div className="custom-phone-lens" />
                        <div className="custom-phone-lens" />
                    </div>
                    <div className="custom-phone-screen">
                        <p className="custom-phone-placeholder">
                            {!selectedModel
                                ? '기종을\n선택하세요'
                                : !selectedCaseType
                                    ? '케이스 타입을\n선택하세요'
                                    : !bodySrc
                                        ? '해당 케이스 타입의\n이미지 준비 중입니다'
                                        : '커스텀 내용을\n선택하세요'}
                        </p>
                    </div>
                    <div className="custom-phone-grid" />
                </div>
            </div>
        )
    }

    return (
        <div style={{
            position: 'relative',
            width: bodyW * scale,
            height: bodyH * scale,
            margin: '0 auto',
            flexShrink: 0,
        }}>
            {/* ❶ 폰 본체 + 컬러 오버레이 */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                overflow: 'hidden', borderRadius: bodyRadius * scale,
            }}>
                <img src={bodySrc} alt={selectedModel} style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'fill', display: 'block',
                }} />
                {selectedCaseColor && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: selectedCaseColor,
                        mixBlendMode: 'multiply',
                        opacity: 0.45,
                        pointerEvents: 'none',
                        WebkitMaskImage: `url(${bodySrc})`,
                        maskImage: `url(${bodySrc})`,
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                    }} />
                )}
            </div>

            {/* ❷ 디자인 캔버스 */}
            <div style={{
                position: 'absolute',
                top: canvas.top * scale,
                left: canvas.left * scale,
                width: canvas.w * scale,
                height: canvas.h * scale,
                overflow: 'hidden',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: canvas.radius * scale,
            }}>
                {designType === 'photo' && previewURL && (
                    <img src={previewURL} alt="미리보기" style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        ...(photoFilter && getFilterStyle(photoFilter, filterStrength)),
                    }} />
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
                        whiteSpace: 'pre-line',
                    }}>
                        {textValue}
                    </span>
                )}
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

            {/* ❸ 카메라 */}
            {cameraSrc && camera && (
                <img src={cameraSrc} alt="camera" style={{
                    position: 'absolute',
                    top: camera.top * scale,
                    left: camera.left * scale,
                    width: camera.width * scale,
                    height: camera.height * scale,
                    backgroundColor: camera.background || 'transparent',
                    borderRadius: (camera.radius || 0) * scale,
                    zIndex: 4,
                    pointerEvents: 'none',
                }} />
            )}
        </div>
    )
}

export default PhonePreview