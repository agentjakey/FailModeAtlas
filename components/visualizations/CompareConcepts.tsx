'use client'

import { useState } from 'react'
import { FAILURE_MODES } from '@/src/data/failureModes'
import { getRelationshipBetween } from '@/src/data/relationships'
import { getExamplesByMode } from '@/src/data/examples'
import { FamilyBadge, DifficultyBadge } from '@/components/ui/Badge'
import type { FailureMode } from '@/src/types'

function ModeSelector({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string
  value: string
  onChange: (id: string) => void
  exclude: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] text-accent tracking-widest uppercase">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border rounded font-sans text-[14px] text-primary focus:outline-none focus:border-secondary transition-colors"
        style={{
          background: '#FFFFFF',
          padding: '10px 14px',
          cursor: 'pointer',
        }}
      >
        <option value="">-- Select a concept --</option>
        {FAILURE_MODES.filter((m) => m.id !== exclude).map((m) => (
          <option key={m.id} value={m.id}>
            {m.displayName}
          </option>
        ))}
      </select>
    </div>
  )
}

function ModeColumn({ mode }: { mode: FailureMode }) {
  const examples = getExamplesByMode(mode.id)

  return (
    <div
      className="border border-border rounded"
      style={{ background: '#FFFFFF', padding: '20px', flex: 1 }}
    >
      <div className="flex flex-wrap gap-2 mb-3">
        <FamilyBadge family={mode.family} />
        <DifficultyBadge difficulty={mode.difficulty} />
      </div>

      <h3
        className="font-sans font-semibold text-primary"
        style={{ fontSize: '17px', marginBottom: '10px', lineHeight: 1.3 }}
      >
        {mode.displayName}
      </h3>

      <div style={{ marginBottom: '16px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
          Definition
        </p>
        <p className="font-sans text-[13px] text-secondary leading-[1.7]">
          {mode.shortDefinition}
        </p>
      </div>

      <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '14px', marginBottom: '14px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
          Analogy
        </p>
        <p className="font-serif text-[13px] text-secondary leading-[1.75] italic">
          {mode.plainLanguageAnalogy}
        </p>
      </div>

      {examples.length > 0 && (
        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '14px', marginBottom: '14px' }}>
          <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
            Example
          </p>
          <div
            style={{
              background: '#F2F0EB',
              borderRadius: '3px',
              padding: '12px 14px',
            }}
          >
            <p className="font-sans font-medium text-primary" style={{ fontSize: '12px', marginBottom: '4px' }}>
              {examples[0].title}
            </p>
            <p className="font-sans text-[12px] text-secondary leading-[1.65]">
              {examples[0].content}
            </p>
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '14px', marginBottom: '14px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
          Why it matters
        </p>
        <p className="font-sans text-[13px] text-secondary leading-[1.7]">
          {mode.whyItMatters}
        </p>
      </div>

      <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '14px' }}>
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
          Beginner takeaway
        </p>
        <p className="font-sans font-medium text-primary" style={{ fontSize: '13px', lineHeight: 1.65 }}>
          {mode.beginnerTakeaway}
        </p>
      </div>
    </div>
  )
}

export function CompareConcepts() {
  const [leftId, setLeftId] = useState('')
  const [rightId, setRightId] = useState('')

  const leftMode = FAILURE_MODES.find((m) => m.id === leftId) ?? null
  const rightMode = FAILURE_MODES.find((m) => m.id === rightId) ?? null
  const relationship = leftId && rightId ? getRelationshipBetween(leftId, rightId) : null

  const sharedRelated =
    leftMode && rightMode
      ? leftMode.relatedModes.filter((id) => rightMode.relatedModes.includes(id))
      : []

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <ModeSelector
          label="Concept A"
          value={leftId}
          onChange={setLeftId}
          exclude={rightId}
        />
        <ModeSelector
          label="Concept B"
          value={rightId}
          onChange={setRightId}
          exclude={leftId}
        />
      </div>

      {leftMode && rightMode ? (
        <div className="flex flex-col gap-6">
          {relationship && (
            <div
              className="border border-border rounded"
              style={{ background: '#F2F0EB', padding: '16px 20px' }}
            >
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                Direct relationship
              </p>
              <p className="font-sans text-[13px] text-secondary leading-[1.7]">
                {relationship.reason}
              </p>
              <p className="font-mono text-[11px] text-[#8A8880] mt-2">
                Edge strength: {relationship.strength}/5
              </p>
            </div>
          )}

          {sharedRelated.length > 0 && (
            <div
              className="border border-border rounded"
              style={{ background: '#F2F0EB', padding: '16px 20px' }}
            >
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                Shared related concepts
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {sharedRelated.map((id) => {
                  const m = FAILURE_MODES.find((x) => x.id === id)
                  if (!m) return null
                  return (
                    <span
                      key={id}
                      className="font-sans text-[12px] border border-border rounded"
                      style={{ padding: '4px 10px', background: '#FFFFFF', color: '#5C5A54' }}
                    >
                      {m.displayName}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          <div
            className="border border-border rounded"
            style={{ background: '#F2F0EB', padding: '14px 18px' }}
          >
            <p className="font-sans text-[12px] text-secondary leading-[1.7] italic">
              These concepts can interact and reinforce each other, but this comparison is educational, not diagnostic. Treat it as a starting point for careful thinking, not a definitive categorization.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <ModeColumn mode={leftMode} />
            <ModeColumn mode={rightMode} />
          </div>
        </div>
      ) : (
        <div
          className="border border-border rounded flex items-center justify-center"
          style={{ background: '#F2F0EB', minHeight: '200px', padding: '32px 24px' }}
        >
          <p
            className="font-serif italic text-secondary text-center"
            style={{ fontSize: '16px', lineHeight: 1.7 }}
          >
            Select two concepts above to compare their definitions, analogies, and connections.
          </p>
        </div>
      )}
    </div>
  )
}
