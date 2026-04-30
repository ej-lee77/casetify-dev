import { useState, useCallback, useMemo } from 'react'
import { INITIAL_SELECTIONS } from '../constants'

const STEPS_COMMON = [
  { id: 'design',      label: '디자인' },
  { id: 'deviceModel', label: '기기 모델' },
  { id: 'caseType',    label: '케이스 타입' },
]

const STEP_LAST = {
  photo: { id: 'photo', label: '사진' },
  text:  { id: 'font',  label: '텍스트' },
}

export function useCustomizer(initialDeviceType = null) {
  const [selections, setSelections] = useState({
    ...INITIAL_SELECTIONS,
    deviceType: initialDeviceType,
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [history, setHistory] = useState([])

  const steps = useMemo(() => {
    const last = selections.designType ? STEP_LAST[selections.designType] : null
    return last ? [...STEPS_COMMON, last] : STEPS_COMMON
  }, [selections.designType])

  const isComplete = currentStep >= steps.length

  const select = useCallback((key, value, goNextFlag = true) => {
    setHistory(h => [...h, selections])
    setSelections(prev => ({ ...prev, [key]: value }))
    if (goNextFlag) setCurrentStep(s => s + 1)
  }, [selections])

  const update = useCallback((key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }))
  }, [])

  const goNext = useCallback(() => {
    setCurrentStep(s => Math.min(s + 1, steps.length))
  }, [steps.length])

  const goBack = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0))
  }, [])

  const goToStep = useCallback((idx) => {
    setCurrentStep(idx)
  }, [])

  const undo = useCallback(() => {
    if (history.length === 0) return
    setSelections(history[history.length - 1])
    setHistory(h => h.slice(0, -1))
  }, [history])

  const reset = useCallback(() => {
    setSelections({ ...INITIAL_SELECTIONS, deviceType: initialDeviceType })
    setCurrentStep(0)
    setHistory([])
  }, [initialDeviceType])

  const isStepUnlocked = useCallback((idx) => {
    return idx <= currentStep
  }, [currentStep])

  const currentStepId = steps[currentStep]?.id

  const price = 89000

  return {
    selections, steps, currentStep, currentStepId,
    isComplete, price, select, update,
    goNext, goBack, goToStep, undo, reset,
    isStepUnlocked, canUndo: history.length > 0,
  }
}
