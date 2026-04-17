'use client'

import { useState } from 'react'

type Props = {
  onAdd: (text: string) => void
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        autoFocus
        className="flex-1 px-3.5 py-2.5 text-base border-2 border-border rounded-lg bg-bg text-text-h outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 text-base bg-accent text-white border-none rounded-lg cursor-pointer font-medium hover:opacity-85 transition-opacity"
      >
        추가
      </button>
    </form>
  )
}
