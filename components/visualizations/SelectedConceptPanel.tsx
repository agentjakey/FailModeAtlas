import { FamilyBadge, DifficultyBadge } from '@/components/ui/Badge'
import { getFailureModeById, FAILURE_MODES } from '@/src/data/failureModes'
import { getRelationshipBetween, RELATIONSHIPS } from '@/src/data/relationships'
import { getExamplesByMode } from '@/src/data/examples'
import type { FailureMode } from '@/src/types'

interface SelectedConceptPanelProps {
  mode: FailureMode
  onSelectMode?: (id: string) => void
}

export function SelectedConceptPanel({ mode, onSelectMode }: SelectedConceptPanelProps) {
  const neighbors = RELATIONSHIPS.filter(
    (r) => r.source === mode.id || r.target === mode.id
  ).map((r) => {
    const otherId = r.source === mode.id ? r.target : r.source
    const other = getFailureModeById(otherId)
    return { mode: other, rel: r }
  }).filter((n) => n.mode !== undefined)

  const examples = getExamplesByMode(mode.id)

  return (
    <div
      className="border border-border rounded"
      style={{ background: '#FFFFFF', padding: '24px', overflow: 'auto', maxHeight: '600px' }}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <FamilyBadge family={mode.family} />
        <DifficultyBadge difficulty={mode.difficulty} />
      </div>

      <h3
        className="font-sans font-semibold text-primary"
        style={{ fontSize: '18px', marginBottom: '8px', lineHeight: 1.3 }}
      >
        {mode.displayName}
      </h3>

      <p className="font-sans text-[14px] text-secondary leading-[1.7]" style={{ marginBottom: '16px' }}>
        {mode.shortDefinition}
      </p>

      <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">Analogy</p>
        <p className="font-serif text-[14px] text-secondary leading-[1.75] italic">
          {mode.plainLanguageAnalogy}
        </p>
      </div>

      {examples.length > 0 && (
        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
          <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">Example</p>
          <p className="font-sans text-[13px] text-secondary leading-[1.7]">
            {examples[0].content}
          </p>
        </div>
      )}

      <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">Why it matters</p>
        <p className="font-sans text-[13px] text-secondary leading-[1.7]">{mode.whyItMatters}</p>
      </div>

      <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">Reflect</p>
        <p className="font-serif italic text-[13px] text-secondary leading-[1.7]">
          {mode.reflectionQuestion}
        </p>
      </div>

      {neighbors.length > 0 && (
        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px' }}>
          <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">
            Related ({neighbors.length})
          </p>
          <div className="flex flex-col gap-2">
            {neighbors.map(({ mode: nb, rel }) => (
              nb && (
                <button
                  key={nb.id}
                  type="button"
                  onClick={() => onSelectMode?.(nb.id)}
                  className="text-left border border-border rounded hover:border-secondary transition-colors"
                  style={{ padding: '10px 12px', background: '#FAFAF8' }}
                >
                  <p className="font-sans font-medium text-primary" style={{ fontSize: '13px' }}>
                    {nb.displayName}
                  </p>
                  <p className="font-sans text-[11px] text-secondary leading-[1.6] mt-1">
                    {rel.reason.slice(0, 80)}{rel.reason.length > 80 ? '...' : ''}
                  </p>
                  <p className="font-mono text-[10px] text-[#8A8880] mt-1">
                    Strength: {rel.strength}/5
                  </p>
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
