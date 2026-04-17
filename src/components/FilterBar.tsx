'use client'

import type { Filter } from '@/types'

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
    <div className="flex gap-2 mb-4">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`flex-1 py-2 text-sm rounded-md cursor-pointer border-2 transition-all ${
            current === key
              ? 'border-accent text-accent bg-accent-bg'
              : 'border-transparent text-text bg-bg-card'
          }`}
          onClick={() => onChange(key)}
        >
          {label} ({counts[key]})
        </button>
      ))}
    </div>
  )
}
