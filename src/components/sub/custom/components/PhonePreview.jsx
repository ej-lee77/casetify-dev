import React, { useMemo } from 'react'
import styles from './PhonePreview.module.css'

const FILTER_CSS = {
  retro:   (s) => `saturate(${1 + s * 0.015}) hue-rotate(${s * 0.3}deg) contrast(${1 + s * 0.005})`,
  digicam: (s) => `saturate(${1 + s * 0.01}) brightness(${1 + s * 0.003})`,
  mono:    (s) => `grayscale(${s / 100}) contrast(${1 + s * 0.005})`,
}

function isStepComplete(stepId, s) {
  switch (stepId) {
    case 'design':      return s.designType !== null
    case 'deviceType':  return s.deviceType !== null
    case 'deviceModel': return s.brand !== null && s.model !== null && s.color !== null
    case 'caseType':    return s.caseType !== null
    case 'photo':       return s.photoFile !== null && s.photoFilter !== null
    case 'font':        return s.textValue.trim().length > 0 && s.fontColor !== null
    default:            return false
  }
}

function NextLabel() {
  return <div className={styles.label}>NEXT →</div>
}

/** 화면 내용 (사진/텍스트/플레이스홀더) */
function ScreenContent({ designType, photoURL, photoStyle, textValue, fontColor }) {
  if (designType === 'photo' && photoURL) {
    return <img src={photoURL} alt="업로드된 사진" className={styles.photo} style={photoStyle} />
  }
  if (designType === 'text' && textValue) {
    return (
      <span className={styles.textOverlay} style={{ color: fontColor ?? '#ffffff' }}>
        {textValue}
      </span>
    )
  }
  return (
    <div className={styles.placeholder}>
      {designType === 'photo' ? '사진을\n업로드하세요' : '텍스트를\n입력하세요'}
    </div>
  )
}

/** 폰 모형 */
function PhoneDevice({ caseColor, children }) {
  return (
    <div className={styles.phoneOuter} style={{ '--case-color': caseColor }}>
      <div className={styles.caseBody}>
        <div className={styles.cameraIsland}>
          <div className={styles.lens} />
          <div className={styles.lens} />
          <div className={styles.lens} />
        </div>
        <div className={styles.screen}>
          {children}
        </div>
        <div className={styles.gridOverlay} />
      </div>
    </div>
  )
}

/** 태블릿 모형 */
function TabletDevice({ caseColor, children }) {
  return (
    <div className={styles.tabletOuter} style={{ '--case-color': caseColor }}>
      <div className={styles.tabletBody}>
        <div className={styles.tabletCamera} />
        <div className={styles.tabletScreen}>
          {children}
        </div>
        <div className={styles.tabletHomeBtn} />
        <div className={styles.gridOverlay} />
      </div>
    </div>
  )
}

/** 노트북 모형 */
function LaptopDevice({ caseColor, children }) {
  return (
    <div className={styles.laptopOuter} style={{ '--case-color': caseColor }}>
      {/* 화면부 */}
      <div className={styles.laptopLid}>
        <div className={styles.laptopCamera} />
        <div className={styles.laptopScreen}>
          {children}
        </div>
        <div className={styles.gridOverlay} />
      </div>
      {/* 본체/키보드 */}
      <div className={styles.laptopBase}>
        <div className={styles.laptopKeyboard}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.laptopKeyRow} />
          ))}
        </div>
        <div className={styles.laptopTrackpad} />
      </div>
    </div>
  )
}

export function PhonePreview({ selections, currentStepId }) {
  const { designType, photoURL, photoFilter, filterStrength, textValue, fontColor, color, deviceType } = selections

  const photoStyle = useMemo(() => {
    if (!photoFilter || !photoURL) return {}
    const fn = FILTER_CSS[photoFilter]
    return fn ? { filter: fn(filterStrength) } : {}
  }, [photoFilter, filterStrength, photoURL])

  const caseColor = color ?? '#111111'
  const showNext = isStepComplete(currentStepId, selections)

  const screenContent = (
    <ScreenContent
      designType={designType}
      photoURL={photoURL}
      photoStyle={photoStyle}
      textValue={textValue}
      fontColor={fontColor}
    />
  )

  const renderDevice = () => {
    if (deviceType === 'tablet') {
      return <TabletDevice caseColor={caseColor}>{screenContent}</TabletDevice>
    }
    if (deviceType === 'laptop') {
      return <LaptopDevice caseColor={caseColor}>{screenContent}</LaptopDevice>
    }
    // 기본: 폰
    return <PhoneDevice caseColor={caseColor}>{screenContent}</PhoneDevice>
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.labelWrap}>
        {showNext && <NextLabel key={currentStepId} />}
      </div>
      {renderDevice()}
    </div>
  )
}