'use client'

import { useState, useOptimistic, startTransition } from 'react'
import type { Todo, Filter } from '@/types'
import { addTodo, toggleTodo, deleteTodo } from '@/app/actions'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import FilterBar from './FilterBar'

type Props = {
  initialTodos: Todo[]
}

export default function TodoView({ initialTodos }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(initialTodos)

  const handleAdd = async (text: string) => {
    const fd = new FormData()
    fd.set('text', text)
    startTransition(() => {
      setOptimisticTodos((prev) => [
        {
          id: `temp-${Date.now()}`,
          text,
          done: false,
          createdAt: Date.now(),
        },
        ...prev,
      ])
    })
    await addTodo(fd)
  }

  const handleToggle = async (id: string) => {
    const todo = optimisticTodos.find((t) => t.id === id)
    if (!todo) return
    startTransition(() => {
      setOptimisticTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      )
    })
    await toggleTodo(id, todo.done)
  }

  const handleDelete = async (id: string) => {
    startTransition(() => {
      setOptimisticTodos((prev) => prev.filter((t) => t.id !== id))
    })
    await deleteTodo(id)
  }

  const filtered = optimisticTodos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const counts = {
    all: optimisticTodos.length,
    active: optimisticTodos.filter((t) => !t.done).length,
    done: optimisticTodos.filter((t) => t.done).length,
  }

  return (
    <>
      <TodoInput onAdd={handleAdd} />
      <FilterBar current={filter} onChange={setFilter} counts={counts} />
      <TodoList todos={filtered} onToggle={handleToggle} onDelete={handleDelete} />
    </>
  )
}
