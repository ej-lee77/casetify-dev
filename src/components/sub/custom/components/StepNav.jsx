import React from 'react'
import styles from './StepNav.module.css'

function isStepDone(stepId, selections) {
  switch (stepId) {
    case 'design':      return selections.designType !== null
    case 'deviceType':  return selections.deviceType !== null
    case 'deviceModel': return selections.model !== null && selections.color !== null
    case 'caseType':    return selections.caseType !== null
    case 'photo':       return selections.photoFile !== null
    case 'font':        return selections.textValue.trim().length > 0 && selections.fontColor !== null
    default:            return false
  }
}

export function StepNav({ steps, currentStep, selections, onStepClick, isStepUnlocked }) {
  const row1 = steps.slice(0, 3)
  const row2 = steps.slice(3)

  const renderBtn = (step, index) => {
    const done = isStepDone(step.id, selections)
    const active = index === currentStep
    const unlocked = isStepUnlocked(index)
    return (
      <button
        key={step.id}
        className={[
          styles.btn,
          active    ? styles.active  : '',
          done      ? styles.done    : '',
          !unlocked ? styles.locked  : '',
        ].join(' ')}
        onClick={() => unlocked && onStepClick(index)}
        disabled={!unlocked}
        aria-current={active ? 'step' : undefined}
      >
        {step.label}
        {done && !active && <span className={styles.check}>✓</span>}
      </button>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.row1}>
        {row1.map((step, i) => renderBtn(step, i))}
      </div>
      <div className={styles.row2}>
        {row2.map((step, i) => renderBtn(step, i + 3))}
      </div>
    </div>
  )
}
