import React from 'react'
import { FONT_COLORS } from '../../constants'
import { StepPanel } from '../StepPanel'
import styles from './Step04b_Font.module.css'

export function Step04b_Font({ selections, update, goNext }) {
  const isReady = selections.textValue.trim().length > 0 && selections.fontColor !== null
  return (
    <StepPanel title="06.폰트" canNext={isReady} onNext={goNext}>
      <div className={styles.field}>
        <input
          type="text"
          className={styles.textInput}
          placeholder="원하시는 글씨를 입력하세요"
          value={selections.textValue}
          maxLength={20}
          onChange={e => update('textValue', e.target.value)}
        />
        <span className={styles.emoji}>🙂</span>
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel}>폰트색상 선택</label>
        <div className={styles.colorRow}>
          {FONT_COLORS.map(c => (
            <div key={c.id} className={styles.colorItem}>
              <button
                className={[styles.colorDot, selections.fontColor === c.hex ? styles.selected : ''].join(' ')}
                style={{ background: c.hex }}
                onClick={() => update('fontColor', c.hex)}
                aria-label={c.label}
              />
              <span className={styles.colorLabel}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </StepPanel>
  )
}
