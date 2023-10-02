/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'

const Confettis = forwardRef((props: any, ref: any) => {
  const refAnimationInstance = useRef<any>(null)
  const [intervalId, setIntervalId] = useState<any>()

  useImperativeHandle(ref, () => ({
    startAnimation() {
      setIntervalId(setInterval(nextTickAnimation, 16))
    },
    stopAnimation() {
      clearInterval(intervalId)
      setIntervalId(null)
      refAnimationInstance.current && refAnimationInstance.current.reset()
    },
  }))

  useEffect(() => {
    return () => {
      clearInterval(intervalId)
    }
  }, [intervalId])

  function getAnimationSettings(angle: any, originX: any) {
    return {
      particleCount: 3,
      angle,
      spread: 55,
      origin: { x: originX },
      colors: ['#21eab1', '#e1f811'],
    }
  }

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0))
      refAnimationInstance.current(getAnimationSettings(120, 1))
    }
  }, [])

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 999999,
      }}
    />
  )
})

export default Confettis
