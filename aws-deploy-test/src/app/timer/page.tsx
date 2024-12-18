'use client'
import React, { useCallback, useRef, useState } from 'react'

const TimerPage = () => {
  const [time, setTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null) // タイマーIDを保持するためのref

  const countUp = (startTime: number, toFixed = 2) => {
    const currentTime = Date.now()
    const convertedTime = Number(((currentTime - startTime) / 1000 + time).toFixed(toFixed))
    setTime(convertedTime)
  }

  const startTimer = () => {
    if (timerRef.current) return
    const startTime = Date.now()

    timerRef.current = setInterval(() => countUp(startTime), 10)
  }

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current) // タイマーを停止
      timerRef.current = null // タイマーIDをクリア
    }
  }, [])

  const resetTimer = () => {
    stopTimer()
    setTime(0)
  }

  return (
    <div>
      <h1>Timer Page</h1>
      <p>{time}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer} disabled={time === 0}>
        Stop
      </button>
      <button onClick={resetTimer} disabled={time === 0}>
        Reset
      </button>
    </div>
  )
}

export default TimerPage
