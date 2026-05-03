import React from 'react'

const BASE_PATH = '/images/custom/model/impact'

// 모델 id → 파일명 변환
const MODEL_FILE_MAP = {
    // Apple
    'iphone17promax': 'IPHONE17PROMAX',
    'iphone17pro': 'IPHONE17PRO',
    'iphone17': 'IPHONE17',
    'iphone16promax': 'IPHONE16PROMAX',
    'iphone16': 'IPHONE16',
    'iphone15': 'IPHONE15',
    'iphone14plus': 'IPHONE14PLUS',
    'iphone13promax': 'IPHONE13PROMAX',
    'iphoneMini': 'IPHONEMINI',
    // Samsung
    's25ultra': 'GALAXYS25ULTRA',
    's25plus': 'GALAXYS25PLUS',
    's25': null,
    // 's24ultra': 'GALAXYS24ULTRA',
    's24': 'GALAXYS24',
    'z6fold': 'ZFOLDER6',
    'z6flip': 'ZFLIP6',
    // Google
    'pixel9pro': 'PIXELPRO9',
    'pixel9': 'GOOGLE9',
    'pixel8pro': 'GOOGLEPRO9',
}

// 카메라 파일명 예외
const CAMERA_FILE_OVERRIDE = {
    'z6fold': 'ZFOLDER6-CAMEARA',
    's25': null,
}

// ─────────────────────────────────────────────
//  모델별 레이아웃 설정 (scale=1 기준, 실제 렌더는 *scale)
//  bodyRadius  : 폰 본체 모서리 곡률
//  canvas      : 디자인 영역 { top, left, right, bottom }
//  camera      : 카메라 { top, left, width, height }
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  모델별 레이아웃 설정 (scale=1 기준)
//  scale       : 전체 확대율 (기본 1.5)
//  bodyW/bodyH : 기준 본체 크기 (기본 200×358)
//  bodyRadius  : 폰 본체 모서리 곡률
//  canvas      : 디자인 영역 { top, left, right, bottom }
//  camera      : 카메라 { top, left, width, height }
// ─────────────────────────────────────────────
const DEFAULT_LAYOUT = {
    scale: 1.5,
    bodyW: 200, bodyH: 358,
    bodyRadius: 30,
    canvas: { top: 63, left: 43, w: 128, h: 269, radius: 10 },
    camera: { top: 59, left: 38, width: 67, height: 105 },
}

const MODEL_LAYOUT = {
    // ── Apple ──────────────────────────────
    'iphone17promax': {
        scale: 1.5, bodyW: 280, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 30, left: 60, w: 140, h: 299, radius: 20 },
        camera: { top: 32, left: 55, width: 150, height: 90 },
    },
    'iphone17pro': {
        scale: 1.5, bodyW: 250, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 33, left: 49, w: 140, h: 300, radius: 30 },
        camera: { top: 30, left: 43, width: 150, height: 100 },
    },
    'iphone17': {
        scale: 1.5, bodyW: 220, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 30, left: 38, w: 137, h: 298, radius: 20 },
        camera: { top: 27, left: 35, width: 70, height: 75 },
    },
    'iphone16promax': {
        scale: 1.5, bodyW: 260, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 20, left: 69, w: 140, h: 320, radius: 30 },
        camera: { top: 22, left: 62, width: 80, height: 80 },
    },
    'iphone16': {
        scale: 1.5, bodyW: 200, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 43, left: 27, w: 140, h: 300, radius: 30 },
        camera: { top: 45, left: 28, width: 73, height: 80 },
    },
    'iphone15': {
        scale: 1.5, bodyW: 230, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 35, left: 43, w: 135, h: 300, radius: 30 },
        camera: { top: 35, left: 42, width: 77, height: 80 },
    },
    'iphone14plus': {
        scale: 1.5, bodyW: 230, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 39, left: 43, w: 143, h: 300, radius: 20 },
        camera: { top: 38, left: 42, width: 77, height: 80 },
    },
    'iphone13promax': {
        scale: 1.5, bodyW: 200, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 33, left: 28, w: 140, h: 309, radius: 20 },
        camera: { top: 30, left: 24, width: 87, height: 86 },
    },
    'iphoneMini': {
        scale: 1.5, bodyW: 180, bodyH: 358,
        bodyRadius: 44,
        canvas: { top: 63, left: 23, w: 128, h: 269, radius: 10 },
        camera: { top: 28, left: 20, width: 80, height: 80 },
    },
    // ── Samsung ────────────────────────────
    's25ultra': {
        scale: 1.5, bodyW: 200, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 28, left: 22, w: 154, h: 320, radius: 10 },
        camera: { top: 24, left: 20, width: 87, height: 130 },
    },
    's25plus': {
        scale: 1.5, bodyW: 200, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 38, left: 30, w: 150, h: 303, radius: 20 },
        camera: { background: '#221f1f', top: 40, left: 32, width: 67, height: 110, radius: 20 },
    },
    // 's24ultra': {
    //     scale: 1.5, bodyW: 200, bodyH: 358,
    //     bodyRadius: 30,
    //     canvas: { top: 63, left: 43, w: 128, h: 269, radius: 10 },
    //     camera: { background: '#221f1f', radius: 20, top: 20, left: 38, width: 67, height: 120 },
    // },
    's24': {
        scale: 1.5, bodyW: 200, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 38, left: 26, w: 148, h: 300, radius: 20 },
        camera: { top: 38, left: 23, width: 77, height: 115 },
    },
    'z6fold': {
        scale: 1.5, bodyW: 220, bodyH: 358,
        bodyRadius: 20,
        canvas: { top: 44, left: 58, w: 140, h: 295, radius: 10 },
        camera: { top: 40, left: 53, width: 74, height: 120 },
    },
    'z6flip': {
        scale: 1.5, bodyW: 200, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 193, left: 33, w: 140, h: 147, radius: 7 },
        camera: { top: 45, left: 30, width: 56, height: 33 },
    },
    // ── Google ─────────────────────────────
    'pixel9pro': {
        scale: 1.5, bodyW: 220, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 43, left: 38, w: 148, h: 300, radius: 10 },
        camera: { top: 23, left: 37, width: 150, height: 55 },
    },
    'pixel9': {
        scale: 1.5, bodyW: 230, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 33, left: 52, w: 146, h: 310, radius: 30 },
        camera: { top: 34, left: 48, width: 150, height: 60 },
    },
    'pixel8pro': {
        scale: 1.5, bodyW: 230, bodyH: 358,
        bodyRadius: 30,
        canvas: { top: 38, left: 38, w: 150, h: 300, radius: 25 },
        camera: { top: 40, left: 34, width: 154, height: 64 },
    },
}

function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro': return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono': return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default: return {}
    }
}

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
}) {
    const fileKey = MODEL_FILE_MAP[selectedModel]
    const cameraKey = selectedModel in CAMERA_FILE_OVERRIDE
        ? CAMERA_FILE_OVERRIDE[selectedModel]
        : (fileKey ? `${fileKey}-CAMERA` : null)

    const bodySrc = fileKey ? `${BASE_PATH}/${fileKey}.png` : null
    const cameraSrc = cameraKey ? `${BASE_PATH}/${cameraKey}.png` : null

    const showPreview = !!selectedModel && !!selectedCaseType && !!bodySrc
    const layout = MODEL_LAYOUT[selectedModel] || DEFAULT_LAYOUT
    const { scale, bodyW, bodyH, bodyRadius, canvas, camera } = layout

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
                        mixBlendMode: 'multiply', opacity: 0.45,
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
                overflow: 'hidden', zIndex: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                        fontSize: 20 * scale, fontWeight: 600,
                        textAlign: 'center',
                        textShadow: `0 ${1 * scale}px ${3 * scale}px rgba(0,0,0,.4)`,
                        padding: 8 * scale, wordBreak: 'break-all',
                        whiteSpace: 'pre-line',
                    }}>
                        {textValue}
                    </span>
                )}
                {!((designType === 'photo' && previewURL) || (designType === 'text' && textValue)) && (
                    <p style={{
                        fontSize: 11 * scale, color: 'rgba(255,255,255,0.4)',
                        textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.4,
                    }}>
                        {designType === 'photo'
                            ? (photoTab === 'sticker' ? '스티커를\n선택하세요' : '사진을\n업로드하세요')
                            : designType === 'text' ? '텍스트를\n입력하세요'
                                : '커스텀 내용을\n선택하세요'}
                    </p>
                )}
            </div>

            {cameraSrc && (
                <img src={cameraSrc} alt="camera" style={{
                    position: 'absolute',
                    top: camera.top * scale,
                    left: camera.left * scale,
                    width: camera.width * scale,
                    height: camera.height * scale,
                    backgroundColor: camera.background || 'transparent',
                    borderRadius: (camera.radius || 0) * scale,
                    zIndex: 4, pointerEvents: 'none',
                }} />
            )}
        </div>
    )
}