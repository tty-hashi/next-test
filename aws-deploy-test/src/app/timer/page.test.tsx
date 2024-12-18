import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import TimerPage from './page'
import '@testing-library/jest-dom'

jest.useFakeTimers()

describe('TimerPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TimerPage />)
    expect(getByText('Timer Page')).toBeInTheDocument()
    expect(getByText('0')).toBeInTheDocument()
  })

  it('starts the timer when the Start button is clicked', () => {
    const { getByText } = render(<TimerPage />)
    const startButton = getByText('Start')

    act(() => {
      fireEvent.click(startButton)
      jest.advanceTimersByTime(100)
    })

    expect(
      getByText(
        (content, element) => element?.tagName.toLowerCase() === 'p' && parseFloat(content) > 0,
      ),
    ).toBeInTheDocument()
  })

  it('stops the timer when the Stop button is clicked', () => {
    const { getByText } = render(<TimerPage />)
    const startButton = getByText('Start')
    const stopButton = getByText('Stop')

    act(() => {
      fireEvent.click(startButton)
      jest.advanceTimersByTime(100)
      fireEvent.click(stopButton)
      jest.advanceTimersByTime(100)
    })

    const timeValue = parseFloat(
      getByText((content, element) => element?.tagName.toLowerCase() === 'p').textContent || '0',
    )
    expect(timeValue).toBeGreaterThan(0)
  })

  it('resets the timer when the Reset button is clicked', async () => {
    const { getByText } = render(<TimerPage />)
    const startButton = getByText('Start')
    const resetButton = getByText('Reset')

    // Start ボタンをクリックしてタイマーを進める
    act(() => {
      fireEvent.click(startButton) // タイマーを開始
      jest.advanceTimersByTime(100) // タイマーを100ミリ秒進める
    })

    // タイマーの値が 0 より大きいことを確認
    const timeAfterStart = parseFloat(
      getByText((content, element) => element?.tagName.toLowerCase() === 'p')?.textContent || '0',
    )
    expect(timeAfterStart).toBeGreaterThan(0)

    // Reset ボタンをクリックしてリセット
    act(() => {
      fireEvent.click(resetButton)
    })

    // リセット後にタイマーの値が 0 になっていることを確認
    await waitFor(() => {
      const timeAfterReset = parseFloat(
        getByText((content, element) => element?.tagName.toLowerCase() === 'p')?.textContent || '0',
      )
      expect(timeAfterReset).toBe(0)
    })
  })
})
