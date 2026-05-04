import React from 'react'

function getFilterStyle(filterId, strength) {
    const s = strength / 100
    switch (filterId) {
        case 'retro': return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
        case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
        case 'mono': return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
        default: return {}
    }
}

export function DefaultPhonePreview({
    designType, previewURL, photoFilter, filterStrength,
    textValue, fontColor, photoTab, selectedCaseColor
}) {
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
                        <img src={previewURL} alt="커스텀 미리보기"
                            style={photoFilter ? getFilterStyle(photoFilter, filterStrength) : {}} />
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