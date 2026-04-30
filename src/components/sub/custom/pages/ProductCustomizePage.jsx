import React from 'react'
import { useCustomizer } from '../hooks/useCustomizer'
import { StepNav }         from '../components/StepNav'
import { PhonePreview }    from '../components/PhonePreview'
import { ProductInfoCard } from '../components/ProductInfoCard'
import { BottomActions }   from '../components/BottomActions'

import { Step01_Design }     from '../components/steps/Step01_Design'
import { Step02_DeviceType } from '../components/steps/Step02_DeviceType'
import { Step03_DeviceModel } from '../components/steps/Step03_DeviceModel'
import { Step04a_CaseType }  from '../components/steps/Step04a_CaseType'
import { Step04b_Photo }     from '../components/steps/Step04b_Photo'
import { Step04b_Font }      from '../components/steps/Step04b_Font'
import { StepComplete }      from '../components/steps/StepComplete'

import styles from './ProductCustomizePage.module.css'

export function ProductCustomizePage() {
  const {
    selections, steps, currentStep, currentStepId,
    isComplete, price, select, update,
    goNext, goBack, goToStep, undo, reset,
    isStepUnlocked, canUndo,
  } = useCustomizer()

  const renderStep = () => {
    if (isComplete) {
      return (
        <StepComplete
          onCart={() => console.log('카트에 담기', selections)}
          onBuy={() => console.log('바로 구매', selections)}
        />
      )
    }
    const commonProps = { selections, onSelect: select, goNext }
    switch (currentStepId) {
      case 'design':      return <Step01_Design {...commonProps} />
      case 'deviceType':  return <Step02_DeviceType {...commonProps} />
      case 'deviceModel': return <Step03_DeviceModel selections={selections} onSelect={select} update={update} goNext={goNext} />
      case 'caseType':    return <Step04a_CaseType {...commonProps} />
      case 'photo':       return <Step04b_Photo selections={selections} update={update} goNext={goNext} />
      case 'font':        return <Step04b_Font selections={selections} update={update} goNext={goNext} />
      default:            return null
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* 좌측: 상품정보 + 폰 프리뷰 + 액션버튼 */}
        <div className={styles.left}>
          <ProductInfoCard selections={selections} price={price} />
          <PhonePreview selections={selections} currentStepId={currentStepId} />
          <BottomActions
            onBack={goBack}
            onReset={reset}
            onUndo={undo}
            canUndo={canUndo}
            canBack={currentStep > 0}
          />
        </div>

        {/* 우측: 스텝 네비 + 패널 */}
        <div className={styles.right}>
          <StepNav
            steps={steps}
            currentStep={currentStep}
            selections={selections}
            onStepClick={goToStep}
            isStepUnlocked={isStepUnlocked}
          />
          <div className={styles.panelWrap}>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductCustomizePage;