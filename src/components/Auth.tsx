import { useState } from 'react'
import { supabase } from '../supabase'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else if (data.user && !data.session) {
        setMessage('확인 이메일을 보냈습니다. 이메일을 확인해주세요.')
      }
    }
    setLoading(false)
  }

  const inputClass =
    'w-full px-3.5 py-3 text-base border-2 border-border rounded-lg bg-bg text-text-h outline-none focus:border-accent transition-colors'

  return (
    <div className="max-w-[360px] mx-auto pt-20 text-center">
      <h1 className="text-3xl font-semibold text-text-h mb-8">Todo App</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
          className={inputClass}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (6자 이상)"
          minLength={6}
          required
          className={inputClass}
        />
        {error && <p className="text-danger text-sm m-0">{error}</p>}
        {message && <p className="text-accent text-sm m-0">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="py-3 text-base bg-accent text-white border-none rounded-lg cursor-pointer font-medium hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
        </button>
      </form>
      <button
        className="mt-4 bg-transparent border-none text-accent cursor-pointer text-sm hover:underline"
        onClick={() => {
          setIsLogin(!isLogin)
          setError('')
          setMessage('')
        }}
      >
        {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
      </button>
    </div>
  )
}
