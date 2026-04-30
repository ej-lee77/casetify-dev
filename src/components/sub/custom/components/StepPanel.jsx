import React from 'react'
import styles from './StepPanel.module.css'

export function StepPanel({ title, children, canNext, onNext }) {
  const showFooter = onNext !== undefined

  return (
    <div className={styles.outer}>
      <div className={styles.header}>{title}</div>
      <div className={styles.body}>
        {children}
      </div>
      {showFooter && (
        <div className={styles.footer}>
          <button
            key={String(canNext)}
            className={[styles.nextBtn, canNext ? styles.nextBtnVisible : ''].join(' ')}
            onClick={onNext}
            disabled={!canNext}
          >
            다음으로 →
          </button>
        </div>
      )}
    </div>
  )
}
