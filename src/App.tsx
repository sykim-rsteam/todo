import { useState, useEffect } from 'react'
import type { Todo, Filter } from './types'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import Auth from './components/Auth'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) fetchTodos()
  }, [user])

  const fetchTodos = async () => {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

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
  }

  const addTodo = async (text: string) => {
    const { data } = await supabase
      .from('todos')
      .insert({ text, user_id: user!.id })
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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setTodos([])
  }

  if (loading) {
    return (
      <div className="app">
        <h1>Todo App</h1>
        <p className="empty-message">불러오는 중...</p>
      </div>
    )
  }

  if (!user) {
    return <Auth />
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
        <div className="user-info">
          <span>{user.email}</span>
          <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
        </div>
      </header>
      <TodoInput onAdd={addTodo} />
      <FilterBar current={filter} onChange={setFilter} counts={counts} />
      <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App
