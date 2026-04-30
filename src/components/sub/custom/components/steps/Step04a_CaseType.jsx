import React from 'react'
import { CASE_TYPES } from '../../constants'
import { StepPanel } from '../StepPanel'
import styles from './Step04a_CaseType.module.css'

export function Step04a_CaseType({ selections, onSelect, goNext }) {
  const canNext = selections.caseType !== null
  return (
    <StepPanel title="04.케이스 타입" canNext={canNext} onNext={goNext}>
      <div className={styles.grid}>
        {CASE_TYPES.map(ct => (
          <button
            key={ct.id}
            className={[styles.card, selections.caseType === ct.id ? styles.selected : ''].join(' ')}
            onClick={() => onSelect('caseType', ct.id, false)}
          >
            <div className={styles.imgWrap}>
              <img src={ct.image} alt={ct.label} className={styles.img} />
            </div>
            <span className={styles.label}>{ct.label}</span>
          </button>
        ))}
      </div>
    </StepPanel>
  )
}
