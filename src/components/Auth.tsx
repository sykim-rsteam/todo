'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/app/actions'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setError('')
    setMessage('')
    setLoading(true)

    const result = isLogin ? await signIn(formData) : await signUp(formData)

    if (result && 'error' in result && result.error) setError(result.error)
    if (result && 'message' in result && result.message) setMessage(result.message)
    setLoading(false)
  }

  const inputClass =
    'w-full px-3.5 py-3 text-base border-2 border-border rounded-lg bg-bg text-text-h outline-none focus:border-accent transition-colors'

  return (
    <div className="max-w-[360px] mx-auto pt-20 text-center">
      <h1 className="text-3xl font-semibold text-text-h mb-8">Todo App</h1>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="이메일"
          required
          className={inputClass}
        />
        <input
          type="password"
          name="password"
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
