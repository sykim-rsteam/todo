import type { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item ${todo.done ? 'done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        삭제
      </button>
    </li>
  )
}
