import React from 'react'
import { StepPanel } from '../StepPanel'
import styles from './Step01_Design.module.css'

const OPTIONS = [
  { id: 'photo', label: '포토 커스텀', desc: '내 사진으로 케이스를 꾸며보세요',   image: '/images/custom/photo_custom.png' },
  { id: 'text',  label: '텍스트 커스텀', desc: '이름이나 문구를 새겨보세요',   image: '/images/custom/text_custom.png'},
]

export function Step01_Design({ selections, onSelect, goNext }) {
  const canNext = selections.designType !== null
  return (
    <StepPanel title="01.디자인" canNext={canNext} onNext={goNext}>
      <div className={styles.grid}>
        {OPTIONS.map(opt => (
          <button
            key={opt.id}
            className={[styles.card, selections.designType === opt.id ? styles.selected : ''].join(' ')}
            onClick={() => onSelect('designType', opt.id, false)}
          >
            <span className={styles.icon}>           <img src={opt.image} alt={opt.label} className={styles.img} /></span>
            <span className={styles.label}>{opt.label}</span>
            <span className={styles.desc}>{opt.desc}</span>
          </button>
        ))}
      </div>
    </StepPanel>
  )
}
