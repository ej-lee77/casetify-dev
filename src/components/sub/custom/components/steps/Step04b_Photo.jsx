import React, { useRef } from 'react'
import { PHOTO_FILTERS } from '../../constants'
import { StepPanel } from '../StepPanel'
import styles from './Step04b_Photo.module.css'

function getFilterStyle(filterId, strength) {
  const s = strength / 100
  switch (filterId) {
    case 'retro':   return { filter: `saturate(${1 + s * 1.5}) hue-rotate(${s * 30}deg)` }
    case 'digicam': return { filter: `saturate(${1 + s}) brightness(${1 + s * 0.3})` }
    case 'mono':    return { filter: `grayscale(${s}) contrast(${1 + s * 0.5})` }
    default:        return {}
  }
}

export function Step04b_Photo({ selections, update, goNext }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    update('photoFile', file)
    const reader = new FileReader()
    reader.onload = (ev) => update('photoURL', ev.target.result)
    reader.readAsDataURL(file)
  }

  const isReady = selections.photoFile !== null

  return (
    <StepPanel title="04.사진" canNext={isReady && !!selections.photoFilter} onNext={goNext}>
      <div
        className={[styles.uploadZone, selections.photoURL ? styles.hasPhoto : ''].join(' ')}
        onClick={() => inputRef.current?.click()}
      >
        {selections.photoURL ? (
          <img src={selections.photoURL} alt="업로드된 사진" className={styles.preview} />
        ) : (
          <span className={styles.uploadHint}>원하시는 사진을 업로드 해주세요</span>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className={styles.hiddenInput} onChange={handleFile} />

      <button className={styles.uploadBtn} onClick={() => inputRef.current?.click()}>
        사진 업로드하기
      </button>

      {selections.photoURL && (
        <>
          <div className={styles.filterGrid}>
            {PHOTO_FILTERS.map(f => (
              <button
                key={f.id}
                className={[styles.filterCard, selections.photoFilter === f.id ? styles.filterSelected : ''].join(' ')}
                onClick={() => update('photoFilter', f.id)}
              >
                <div className={styles.filterImgWrap}>
                  <img
                    src={selections.photoURL}
                    alt={f.label}
                    className={styles.filterThumb}
                    style={getFilterStyle(f.id, selections.filterStrength)}
                  />
                </div>
                <span className={styles.filterLabel}>{f.label}</span>
              </button>
            ))}
          </div>
          {selections.photoFilter && (
            <div className={styles.sliderSection}>
              <label className={styles.sliderLabel}>강도</label>
              <input
                type="range" min={0} max={100} step={1}
                value={selections.filterStrength}
                onChange={e => update('filterStrength', Number(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.sliderTicks}>
                <span>약</span><span>강</span>
              </div>
            </div>
          )}
        </>
      )}
    </StepPanel>
  )
}
