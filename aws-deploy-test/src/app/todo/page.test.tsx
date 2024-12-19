// __tests__/InputArea.test.tsx
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { InputArea } from './page'
import '@testing-library/jest-dom'

describe('InputArea Component', () => {
  const addTodoMock = jest.fn()
  test('入力後、送信ボタンをクリックすると addTodo が呼び出される', () => {
    render(<InputArea addTodo={addTodoMock} />)
    const input = screen.getByLabelText('todo')
    const button = screen.getByText('送信')

    fireEvent.change(input, { target: { value: '新しいタスク' } }) // 入力
    fireEvent.click(button) // 送信

    expect(addTodoMock).toHaveBeenCalledWith('新しいタスク') // addTodo が正しい引数で呼び出される
  })

  test('空の状態で送信ボタンをクリックしても addTodo が呼び出されない', () => {
    render(<InputArea addTodo={addTodoMock} />)

    const button = screen.getByText('送信')
    fireEvent.click(button) // 送信

    expect(button).toBeDisabled() // addTodo が呼び出されない
  })

  test('送信後に入力フィールドがクリアされる', () => {
    render(<InputArea addTodo={addTodoMock} />)

    const input = screen.getByLabelText('todo')
    const button = screen.getByText('送信')

    fireEvent.change(input, { target: { value: '新しいタスク' } }) // 入力
    fireEvent.click(button) // 送信

    expect(input).toHaveValue('') // 入力フィールドがクリアされる
  })
})
