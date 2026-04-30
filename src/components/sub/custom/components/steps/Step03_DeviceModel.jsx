import React, { useState } from 'react'
import { BRANDS, CASE_COLORS } from '../../constants'
import { StepPanel } from '../StepPanel'
import styles from './Step03_DeviceModel.module.css'

export function Step03_DeviceModel({ selections, onSelect, update, goNext }) {
  const [modelOpen, setModelOpen] = useState(false)
  const canNext = selections.brand !== null && selections.model !== null && selections.color !== null
  const currentBrand = BRANDS.find(b => b.id === selections.brand)
  const models = currentBrand?.models ?? []

  const handleBrand = (brandId) => {
    update('brand', brandId)
    update('model', null)
    update('color', null)
    setModelOpen(false)
  }

  const handleModel = (modelId) => {
    update('model', modelId)
    setModelOpen(false)
  }

  const selectedModelLabel = models.find(m => m.id === selections.model)?.label

  return (
    <StepPanel title="03.기기 모델" canNext={canNext} onNext={goNext}>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>브랜드</label>
        <div className={styles.selectWrap}>
          <select className={styles.select} value={selections.brand ?? ''} onChange={e => handleBrand(e.target.value)}>
            <option value="" disabled>브랜드 선택</option>
            {BRANDS.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
          <span className={styles.arrow}>▼</span>
        </div>
      </div>

      {selections.brand && (
        <div className={styles.field}>
          <label className={styles.fieldLabel}>기종</label>
          <div className={styles.selectWrap}>
            <button className={styles.selectBtn} onClick={() => setModelOpen(v => !v)}>
              {selectedModelLabel ?? '기종 선택'}
              <span className={styles.arrow}>{modelOpen ? '▲' : '▼'}</span>
            </button>
          </div>
          {modelOpen && (
            <div className={styles.modelList}>
              {models.map(m => (
                <button
                  key={m.id}
                  className={[styles.modelItem, selections.model === m.id ? styles.modelSelected : ''].join(' ')}
                  onClick={() => handleModel(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selections.model && (
        <div className={styles.field}>
          <label className={styles.fieldLabel}>색상선택</label>
          <div className={styles.colorRow}>
            {CASE_COLORS.map(c => (
              <div key={c.id} className={styles.colorItem}>
                <button
                  className={[styles.colorDot, selections.color === c.hex ? styles.colorSelected : '', c.id === 'white' ? styles.colorWhite : ''].join(' ')}
                  style={{ background: c.hex }}
                  onClick={() => update('color', c.hex)}
                  aria-label={c.label}
                />
                <span className={styles.colorLabel}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </StepPanel>
  )
}
