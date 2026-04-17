'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type Props = {
  user: User
}

export default function Navbar({ user }: Props) {
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const linkClass = (path: string) =>
    `text-sm no-underline px-2 py-1 rounded ${
      pathname === path ? 'text-accent bg-accent-bg' : 'text-text hover:text-text-h'
    }`

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b border-border bg-bg sticky top-0 z-10">
      <Link href="/" className="text-lg font-semibold text-text-h no-underline">
        Todo App
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className={linkClass('/')}>할 일</Link>
        <Link href="/profile" className={linkClass('/profile')}>프로필</Link>
        <span className="text-xs text-text">{user.email}</span>
        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1 bg-transparent text-text border border-border rounded cursor-pointer hover:bg-accent hover:text-white hover:border-accent transition-all"
        >
          로그아웃
        </button>
      </div>
    </nav>
  )
}
