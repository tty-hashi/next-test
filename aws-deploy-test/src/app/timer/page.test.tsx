import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
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
    expect(timeValue).toBeLessThan(0.4)
  })

  it('resets the timer when the Reset button is clicked', () => {
    const { getByText } = render(<TimerPage />)
    const startButton = getByText('Start')
    const resetButton = getByText('Reset')

    act(() => {
      fireEvent.click(startButton)
      jest.advanceTimersByTime(100)
      fireEvent.click(resetButton)
    })
  })
})
