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
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        autoFocus
      />
      <button type="submit">추가</button>
    </form>
  )
}
