import React from 'react'

const S25_BODY = '/images/custom/model/s25.png'
const S25_CAMERA = '/images/custom/model/s25-camera.png'

function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro': return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono': return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default: return {}
    }
}

export function S25PhonePreview({
    designType, previewURL, photoFilter, filterStrength,
    textValue, fontColor, photoTab, selectedCaseColor
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
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                overflow: 'hidden', borderRadius: 30 * scale,
            }}>
                <img src={S25_BODY} alt="Galaxy S25" style={{
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
                        WebkitMaskImage: `url(${S25_BODY})`,
                        maskImage: `url(${S25_BODY})`,
                        WebkitMaskSize: '100% 100%',
                        maskSize: '100% 100%',
                    }} />
                )}
            </div>

            <div style={{
                position: 'absolute',
                top: 63 * scale, left: 43 * scale,
                right: 29 * scale, bottom: 26 * scale,
                overflow: 'hidden', zIndex: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 10 * scale,
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

            <img src={S25_CAMERA} alt="camera" style={{
                position: 'absolute',
                top: 59 * scale, left: 38 * scale,
                width: 90 * scale * 0.75, height: 140 * scale * 0.75,
                zIndex: 4, pointerEvents: 'none',
            }} />
        </div>
    )
}