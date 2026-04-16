import type { Todo } from '../types'
import TodoItem from './TodoItem'

type Props = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return <p className="text-center text-text mt-8">할 일이 없습니다</p>
  }

  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
