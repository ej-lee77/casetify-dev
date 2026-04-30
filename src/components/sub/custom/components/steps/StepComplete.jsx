import React from 'react'
import styles from './StepComplete.module.css'

export function StepComplete({ onCart, onBuy }) {
  return (
    <div className={styles.outer}>
      <div className={styles.card}>
        <p className={styles.italic}>Complicate !</p>
        <p className={styles.sub}>모든 단계가 끝났습니다</p>
        <button className={styles.cartBtn} onClick={onCart}>
          <span className={styles.btnIcon}><img className="c-img" src="/images/custom/card.svg" alt="" /></span>카트에담기
        </button>
        <button className={styles.buyBtn} onClick={onBuy}>
          <span className={styles.btnIcon}><img className="c-img" src="/images/custom/cart.svg" alt="" /></span>바로 구매
        </button>
      </div>
    </div>
  )
}
