import type { Filter } from '../types'

type Props = {
  current: Filter
  onChange: (filter: Filter) => void
  counts: { all: number; active: number; done: number }
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행중' },
  { key: 'done', label: '완료' },
]

export default function FilterBar({ current, onChange, counts }: Props) {
  return (
    <div className="filter-bar">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={current === key ? 'active' : ''}
          onClick={() => onChange(key)}
        >
          {label} ({counts[key]})
        </button>
      ))}
    </div>
  )
}
