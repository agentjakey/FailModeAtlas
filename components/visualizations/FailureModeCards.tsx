'use client'

import { useState, useMemo } from 'react'
import { FAILURE_MODES, FAMILY_META } from '@/src/data/failureModes'
import { ConceptCard } from '@/components/visualizations/ConceptCard'
import { SearchBox } from '@/components/visualizations/SearchBox'
import type { FailureModeFamily, Difficulty } from '@/src/types'

const DIFFICULTY_OPTIONS: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'All levels' },
  { value: 'foundational', label: 'Foundational' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'open_problem', label: 'Open problem' },
]

function FilterBtn({
  label,
  active,
  color,
  onClick,
}: {
  label: string
  active: boolean
  color?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono text-[11px] border rounded transition-all"
      style={{
        padding: '4px 12px',
        color: active ? '#FAFAF8' : color ?? '#5C5A54',
        backgroundColor: active ? (color ?? '#1A1915') : 'transparent',
        borderColor: active ? (color ?? '#1A1915') : '#E4E2DB',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

export function FailureModeCards() {
  const [query, setQuery] = useState('')
  const [activeFamily, setActiveFamily] = useState<FailureModeFamily | 'all'>('all')
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | 'all'>('all')

  const filtered = useMemo(() => {
    return FAILURE_MODES.filter((m) => {
      const matchesFamily = activeFamily === 'all' || m.family === activeFamily
      const matchesDifficulty = activeDifficulty === 'all' || m.difficulty === activeDifficulty
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        m.displayName.toLowerCase().includes(q) ||
        m.shortDefinition.toLowerCase().includes(q) ||
        m.beginnerTakeaway.toLowerCase().includes(q)
      return matchesFamily && matchesDifficulty && matchesQuery
    })
  }, [query, activeFamily, activeDifficulty])

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search failure modes..."
        />

        <div className="flex flex-wrap gap-2">
          <FilterBtn
            label="All families"
            active={activeFamily === 'all'}
            onClick={() => setActiveFamily('all')}
          />
          {FAMILY_META.map((f) => (
            <FilterBtn
              key={f.key}
              label={f.label}
              active={activeFamily === f.key}
              color={f.color}
              onClick={() => setActiveFamily(f.key)}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {DIFFICULTY_OPTIONS.map((d) => (
            <FilterBtn
              key={d.value}
              label={d.label}
              active={activeDifficulty === d.value}
              onClick={() => setActiveDifficulty(d.value as Difficulty | 'all')}
            />
          ))}
        </div>
      </div>

      <p className="font-mono text-[11px] text-secondary mb-4">
        Showing {filtered.length} of {FAILURE_MODES.length} failure modes
      </p>

      {filtered.length === 0 && (
        <div
          className="border border-border rounded text-center"
          style={{ padding: '48px 24px', background: '#F2F0EB' }}
        >
          <p className="font-serif italic text-secondary" style={{ fontSize: '16px' }}>
            No failure modes match the current filters.
          </p>
        </div>
      )}

      {filtered.map((mode) => (
        <ConceptCard key={mode.id} mode={mode} />
      ))}
    </div>
  )
}
