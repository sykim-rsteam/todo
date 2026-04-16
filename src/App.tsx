import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
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

  if (loading) {
    return (
      <div className="app">
        <p className="empty-message">불러오는 중...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      {user && <Navbar user={user} />}
      <main className="app">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage user={user} />}
          />
          <Route
            path="/"
            element={user ? <TodoPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
