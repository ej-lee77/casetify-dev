import React from 'react'
import { BRANDS, CASE_TYPES } from '../constants'
import styles from './ProductInfoCard.module.css'

export function ProductInfoCard({ selections, price }) {
  const modelLabel = BRANDS
    .find(b => b.id === selections.brand)
    ?.models.find(m => m.id === selections.model)?.label ?? '-'
  const caseLabel = CASE_TYPES.find(c => c.id === selections.caseType)?.label ?? '-'
  const 기종 = selections.model ? modelLabel : '제품을 선택하세요'
  const 타입 = selections.caseType ? caseLabel : '제품을 선택하세요'

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.key}>기종</span>
        <span className={styles.val}>{기종}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>타입</span>
        <span className={styles.val}>{타입}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>가격</span>
        <span className={styles.price}>₩{price.toLocaleString()}</span>
      </div>
    </div>
  )
}
