import React from 'react'
import styles from './BottomActions.module.css'

export function BottomActions({ onBack, onReset, onUndo, canUndo, canBack }) {
  return (
    <div className={styles.wrap}>
      <button className={styles.btn} onClick={onBack} disabled={!canBack}>← 한단계 뒤로</button>
      <button className={styles.btn} onClick={onReset}>🗑 버리기</button>
      <button className={styles.btn} onClick={onUndo} disabled={!canUndo}>되돌리기 ↺</button>
    </div>
  )
}
