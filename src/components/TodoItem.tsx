'use client'

import type { Todo } from '@/types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li
      className={`flex items-center justify-between px-4 py-3 bg-bg-card rounded-lg transition-opacity ${
        todo.done ? 'opacity-50' : ''
      }`}
    >
      <label className="flex items-center gap-2.5 flex-1 cursor-pointer min-w-0">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="w-[18px] h-[18px] accent-accent cursor-pointer shrink-0"
        />
        <span
          className={`text-base break-words ${
            todo.done ? 'line-through text-text' : 'text-text-h'
          }`}
        >
          {todo.text}
        </span>
      </label>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-3 px-3 py-1 text-xs bg-transparent text-text border border-border rounded cursor-pointer shrink-0 hover:bg-danger hover:text-white hover:border-danger transition-all"
      >
        삭제
      </button>
    </li>
  )
}
