'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import Navbar from './Navbar'
import Auth from './Auth'
import TodoPage from './TodoPage'
import ProfilePage from './ProfilePage'

export default function AppShell() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const newUser = session?.user ?? null
        setUser(newUser)
        if (!newUser) router.push('/login')
        else if (pathname === '/login') router.push('/')
      }
    )

    return () => subscription.unsubscribe()
  }, [pathname, router])

  if (loading) {
    return (
      <div className="max-w-[520px] mx-auto px-5 py-10">
        <p className="text-center text-text mt-8">불러오는 중...</p>
      </div>
    )
  }

  if (!user) {
    return <Auth />
  }

  return (
    <>
      <Navbar user={user} />
      <main className="max-w-[520px] mx-auto px-5 py-10">
        {pathname === '/profile' ? (
          <ProfilePage user={user} />
        ) : (
          <TodoPage user={user} />
        )}
      </main>
    </>
  )
}
