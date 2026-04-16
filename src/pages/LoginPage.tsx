import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import Auth from '../components/Auth'

type Props = {
  user: User | null
}

export default function LoginPage({ user }: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return <Auth />
}
