'use client'
import React, { MouseEvent, useState } from 'react'
import styles from './todo.module.scss'
import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import classNames from 'classnames/bind'
import DeleteIcon from '@mui/icons-material/Delete'

const cx = classNames.bind(styles)

const stateArray = ['todo', 'doing', 'done'] as const

type Todo = {
  id: string
  todo: string
  state: (typeof stateArray)[number]
}

type FilterValue = Todo['state'] | 'すべて'

const TodoPage = () => {
  const [primitiveTodos, setPrimitiveTodos] = useState<Todo[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterValue, setFilterValue] = useState<FilterValue>('すべて')

  const addTodo = (todo: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2),
      todo,
      state: 'todo',
    }
    setTodos([...todos, newTodo])
    setPrimitiveTodos([...primitiveTodos, newTodo])
  }

  const stateChangeHandler = (id: string, state: Todo['state']) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, state }
      }
      return todo
    })
    setTodos(newTodos)
    setPrimitiveTodos(newTodos)
  }

  const deleteHandler = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    setPrimitiveTodos(newTodos)
  }

  const filterHandler = (state: FilterValue) => {
    setFilterValue(state)
    if (state === 'すべて') {
      return setTodos(primitiveTodos)
    }
    const newTodos = primitiveTodos.filter((todo) => todo.state === state)
    setTodos(newTodos)
  }

  return (
    <Box p={'16px'} className={cx('wrapper')}>
      <Stack className={cx('inner')} spacing={8}>
        <InputArea addTodo={addTodo} />
        <ul>
          <li>
            <Stack
              direction='row'
              spacing={4}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Typography maxWidth={300}></Typography>
              <Stack direction={'row'}>
                <SelectAreaWithFiltering stateChangeHandler={filterHandler} value={filterValue} />
                <Box paddingX={4}></Box>
              </Stack>
            </Stack>
          </li>
          {todos.map((todo) => (
            <RowTodo
              key={todo.id}
              todo={todo}
              stateChangeHandler={stateChangeHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </ul>
      </Stack>
    </Box>
  )
}

export default TodoPage

const RowTodo = ({
  todo,
  stateChangeHandler,
  deleteHandler,
}: {
  todo: Todo
  stateChangeHandler: (id: string, state: Todo['state']) => void
  deleteHandler: (id: string) => void
}) => {
  return (
    <li key={todo.id}>
      <Stack direction='row' spacing={4} alignItems={'center'} justifyContent={'space-between'}>
        <Typography maxWidth={300}>{todo.todo}</Typography>
        <Stack direction={'row'}>
          <SelectArea stateChangeHandler={stateChangeHandler} id={todo.id} value={todo.state} />
          <Button onClick={() => deleteHandler(todo.id)}>
            <DeleteIcon />
          </Button>
        </Stack>
      </Stack>
    </li>
  )
}

type PropsInputArea = {
  addTodo: (todo: string) => void
}

export const InputArea: React.FC<PropsInputArea> = ({ addTodo }) => {
  const [value, setValue] = useState('')
  const onSubmit = (e: MouseEvent) => {
    if (value === '') return
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  return (
    <form>
      <Stack direction='row' spacing={2}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label='todo'
          variant='outlined'
        />
        <Button
          disabled={value === ''}
          onClick={(e) => onSubmit(e)}
          color='primary'
          variant='contained'
          type='submit'>
          送信
        </Button>
      </Stack>
    </form>
  )
}

const SelectArea = ({
  stateChangeHandler,
  id,
  value,
}: {
  stateChangeHandler: (id: string, state: Todo['state']) => void
  id: string
  value: Todo['state']
}) => {
  return (
    <Select
      value={value}
      label='Age'
      onChange={(e) => stateChangeHandler(id, e.target.value as Todo['state'])}>
      {stateArray.map((state) => (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      ))}
    </Select>
  )
}
const SelectAreaWithFiltering = ({
  stateChangeHandler,
  value,
}: {
  stateChangeHandler: (state: FilterValue) => void
  value: FilterValue
}) => {
  return (
    <Select
      value={value}
      label='Age'
      onChange={(e) => stateChangeHandler(e.target.value as FilterValue)}>
      {['すべて', ...stateArray].map((state) => (
        <MenuItem key={state} value={state}>
          {state}
        </MenuItem>
      ))}
    </Select>
  )
}
