import { NavLink } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../supabase'

type Props = {
  user: User
}

export default function Navbar({ user }: Props) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b border-border bg-bg sticky top-0 z-10">
      <NavLink to="/" className="text-lg font-semibold text-text-h no-underline">
        Todo App
      </NavLink>
      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `text-sm no-underline px-2 py-1 rounded ${isActive ? 'text-accent bg-accent-bg' : 'text-text hover:text-text-h'}`
          }
        >
          할 일
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-sm no-underline px-2 py-1 rounded ${isActive ? 'text-accent bg-accent-bg' : 'text-text hover:text-text-h'}`
          }
        >
          프로필
        </NavLink>
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
