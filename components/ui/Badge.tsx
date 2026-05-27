import { FAMILY_COLORS, FAMILY_LABELS, DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '@/src/styles/tokens'
import type { FailureModeFamily, Difficulty } from '@/src/types'

interface FamilyBadgeProps {
  family: FailureModeFamily
}

export function FamilyBadge({ family }: FamilyBadgeProps) {
  const color = FAMILY_COLORS[family] ?? '#888888'
  const label = FAMILY_LABELS[family] ?? family
  return (
    <span
      className="font-mono text-[11px] tracking-wide"
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '3px',
        backgroundColor: `${color}18`,
        color: color,
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </span>
  )
}

interface DifficultyBadgeProps {
  difficulty: Difficulty
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const color = DIFFICULTY_COLORS[difficulty] ?? '#888888'
  const label = DIFFICULTY_LABELS[difficulty] ?? difficulty
  return (
    <span
      className="font-mono text-[11px] tracking-wide"
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '3px',
        border: `1px solid ${color}40`,
        color: color,
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </span>
  )
}
