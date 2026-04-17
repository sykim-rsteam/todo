'use client'

import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import type { Todo, Filter } from '@/types'
import { supabase } from '@/lib/supabase'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import FilterBar from './FilterBar'

type Props = {
  user: User
}

export default function TodoPage({ user }: Props) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (cancelled) return
        if (data) {
          setTodos(
            data.map((row) => ({
              id: row.id,
              text: row.text,
              done: row.done,
              createdAt: new Date(row.created_at).getTime(),
            }))
          )
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  const addTodo = async (text: string) => {
    const { data } = await supabase
      .from('todos')
      .insert({ text, user_id: user.id })
      .select()
      .single()

    if (data) {
      setTodos((prev) => [
        {
          id: data.id,
          text: data.text,
          done: data.done,
          createdAt: new Date(data.created_at).getTime(),
        },
        ...prev,
      ])
    }
  }

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return

    await supabase.from('todos').update({ done: !todo.done }).eq('id', id)
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const deleteTodo = async (id: string) => {
    await supabase.from('todos').delete().eq('id', id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  }

  if (loading) {
    return <p className="text-center text-text mt-8">불러오는 중...</p>
  }

  return (
    <>
      <TodoInput onAdd={addTodo} />
      <FilterBar current={filter} onChange={setFilter} counts={counts} />
      <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
    </>
  )
}
