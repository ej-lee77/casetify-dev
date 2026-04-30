import React from 'react'
import { DEVICE_TYPES } from '../../constants'
import { StepPanel } from '../StepPanel'
import styles from './Step02_DeviceType.module.css'

export function Step02_DeviceType({ selections, onSelect, goNext }) {
  const canNext = selections.deviceType !== null
  return (
    <StepPanel title="02.기기 타입" canNext={canNext} onNext={goNext}>
      <div className={styles.grid}>
        {DEVICE_TYPES.map(dt => (
          <button
            key={dt.id}
            className={[styles.card, selections.deviceType === dt.id ? styles.selected : ''].join(' ')}
            onClick={() => onSelect('deviceType', dt.id, false)}
          >
            <div className={styles.imgWrap}>
              <img src={dt.image} alt={dt.label} className={styles.img} />
            </div>
            <span className={styles.label}>{dt.label}</span>
          </button>
        ))}
      </div>
    </StepPanel>
  )
}
