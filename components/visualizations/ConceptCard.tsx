'use client'

import { useState } from 'react'
import { FamilyBadge, DifficultyBadge } from '@/components/ui/Badge'
import { getExamplesByMode } from '@/src/data/examples'
import { getFailureModeById } from '@/src/data/failureModes'
import type { FailureMode } from '@/src/types'

interface ConceptCardProps {
  mode: FailureMode
  initialOpen?: boolean
}

export function ConceptCard({ mode, initialOpen = false }: ConceptCardProps) {
  const [open, setOpen] = useState(initialOpen)
  const examples = getExamplesByMode(mode.id)
  const relatedModes = mode.relatedModes
    .map((id) => getFailureModeById(id))
    .filter(Boolean) as FailureMode[]

  return (
    <div
      className="border border-border rounded"
      style={{ background: '#FFFFFF', marginBottom: '12px' }}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left"
        style={{ padding: '20px 24px' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <FamilyBadge family={mode.family} />
              <DifficultyBadge difficulty={mode.difficulty} />
            </div>
            <h3
              className="font-sans font-semibold text-primary"
              style={{ fontSize: '17px', marginBottom: '6px', lineHeight: 1.3 }}
            >
              {mode.displayName}
            </h3>
            <p className="font-sans text-[13px] text-secondary leading-[1.65]">
              {mode.shortDefinition}
            </p>
          </div>
          <div
            style={{
              flexShrink: 0,
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5C5A54',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            {open ? '−' : '+'}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div style={{ padding: '0 24px 24px', borderTop: '1px solid #E4E2DB' }}>
          <div style={{ paddingTop: '20px', marginBottom: '20px' }}>
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Analogy
            </p>
            <p className="font-serif text-[15px] text-secondary leading-[1.8] italic">
              {mode.plainLanguageAnalogy}
            </p>
          </div>

          <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Why it matters
            </p>
            <p className="font-sans text-[14px] text-secondary leading-[1.7]">
              {mode.whyItMatters}
            </p>
          </div>

          {examples.length > 0 && (
            <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">
                Safe examples ({examples.length})
              </p>
              <div className="flex flex-col gap-4">
                {examples.map((ex) => (
                  <div
                    key={ex.id}
                    style={{
                      background: '#F2F0EB',
                      borderRadius: '3px',
                      padding: '14px 16px',
                    }}
                  >
                    <p className="font-sans font-medium text-primary" style={{ fontSize: '13px', marginBottom: '6px' }}>
                      {ex.title}
                    </p>
                    <p className="font-sans text-[13px] text-secondary leading-[1.65]">
                      {ex.content}
                    </p>
                    <p
                      className="font-mono text-[10px] text-[#8A8880] mt-2"
                      style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                      {ex.style.replace('_', ' ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Non-example
            </p>
            <p className="font-sans text-[13px] text-secondary leading-[1.7]">
              {mode.nonExample}
            </p>
          </div>

          <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Beginner takeaway
            </p>
            <p className="font-sans font-medium text-primary" style={{ fontSize: '14px', lineHeight: 1.65 }}>
              {mode.beginnerTakeaway}
            </p>
          </div>

          <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '16px' }}>
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Reflect
            </p>
            <p className="font-serif italic text-[14px] text-secondary leading-[1.7]">
              {mode.reflectionQuestion}
            </p>
          </div>

          {relatedModes.length > 0 && (
            <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px' }}>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                Related concepts
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedModes.map((rm) => (
                  <span
                    key={rm.id}
                    className="font-sans text-[12px] border border-border rounded"
                    style={{
                      padding: '4px 10px',
                      background: '#F2F0EB',
                      color: '#5C5A54',
                    }}
                  >
                    {rm.displayName}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginTop: '16px' }}>
            <p className="font-mono text-[10px] text-[#8A8880] tracking-widest uppercase mb-1">
              Further reading
            </p>
            <p className="font-sans text-[12px] text-[#8A8880] italic">
              {mode.recommendedReadingPlaceholder}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
