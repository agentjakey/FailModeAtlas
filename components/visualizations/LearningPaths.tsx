'use client'

import { useState } from 'react'
import { LEARNING_PATHS } from '@/src/data/learningPaths'
import { getFailureModeById } from '@/src/data/failureModes'

export function LearningPaths() {
  const [activePathId, setActivePathId] = useState<string | null>(null)
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set())

  function toggleStep(id: string) {
    setExpandedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {LEARNING_PATHS.map((path, i) => {
        const isActive = activePathId === path.id
        return (
          <div key={path.id}>
            <button
              type="button"
              onClick={() => {
                setActivePathId(isActive ? null : path.id)
                setExpandedSteps(new Set())
              }}
              className="w-full text-left border border-border rounded transition-colors"
              style={{
                background: isActive ? '#FFFFFF' : '#F2F0EB',
                padding: '18px 20px',
                borderColor: isActive ? '#1A1915' : '#E4E2DB',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="font-mono text-[11px] text-accent"
                      style={{ minWidth: '24px' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans font-semibold text-primary" style={{ fontSize: '15px' }}>
                      {path.title}
                    </span>
                  </div>
                  <p className="font-sans text-[13px] text-secondary leading-[1.6]" style={{ paddingLeft: '36px' }}>
                    {path.description}
                  </p>
                  <div className="flex gap-4 mt-2" style={{ paddingLeft: '36px' }}>
                    <span className="font-mono text-[10px] text-[#8A8880]">
                      {path.orderedModeIds.length} concepts
                    </span>
                    <span className="font-mono text-[10px] text-[#8A8880]">
                      {path.estimatedTime}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    flexShrink: 0,
                    color: '#5C5A54',
                    fontSize: '18px',
                    lineHeight: 1,
                    marginTop: '2px',
                  }}
                >
                  {isActive ? '−' : '+'}
                </div>
              </div>
            </button>

            {isActive && (
              <div
                className="border border-border rounded"
                style={{
                  background: '#FFFFFF',
                  padding: '24px',
                  marginTop: '4px',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <p className="font-sans font-semibold text-primary" style={{ fontSize: '17px', marginBottom: '6px' }}>
                    {path.title}
                  </p>
                  <p className="font-sans text-[13px] text-secondary leading-[1.7]">
                    {path.whyItMatters}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px', marginBottom: '20px' }}>
                  <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-4">
                    Sequence ({path.orderedModeIds.length} steps)
                  </p>
                  <div className="flex flex-col gap-3">
                    {path.orderedModeIds.map((modeId, stepIdx) => {
                      const mode = getFailureModeById(modeId)
                      if (!mode) return null
                      const isExpanded = expandedSteps.has(modeId)
                      return (
                        <div key={modeId}>
                          <button
                            type="button"
                            onClick={() => toggleStep(modeId)}
                            className="w-full text-left border border-border rounded transition-colors"
                            style={{
                              background: isExpanded ? '#F2F0EB' : '#FAFAF8',
                              padding: '14px 16px',
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className="font-mono text-[11px] text-accent flex-shrink-0"
                                style={{ minWidth: '20px', marginTop: '1px' }}
                              >
                                {stepIdx + 1}.
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-sans font-medium text-primary" style={{ fontSize: '14px' }}>
                                    {mode.displayName}
                                  </p>
                                  <span style={{ color: '#5C5A54', fontSize: '14px', flexShrink: 0, marginLeft: '12px' }}>
                                    {isExpanded ? '−' : '+'}
                                  </span>
                                </div>
                                {!isExpanded && (
                                  <p className="font-sans text-[12px] text-secondary leading-[1.6] mt-1">
                                    {mode.shortDefinition.slice(0, 100)}{mode.shortDefinition.length > 100 ? '...' : ''}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <div
                              className="border border-border rounded"
                              style={{
                                background: '#FAFAF8',
                                padding: '16px 20px',
                                marginTop: '-1px',
                                borderTop: 'none',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                              }}
                            >
                              <div style={{ marginBottom: '12px' }}>
                                <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                                  Definition
                                </p>
                                <p className="font-sans text-[13px] text-secondary leading-[1.7]">
                                  {mode.shortDefinition}
                                </p>
                              </div>
                              <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '12px', marginBottom: '12px' }}>
                                <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                                  Analogy
                                </p>
                                <p className="font-serif text-[13px] text-secondary leading-[1.75] italic">
                                  {mode.plainLanguageAnalogy}
                                </p>
                              </div>
                              <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '12px' }}>
                                <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                                  Takeaway
                                </p>
                                <p className="font-sans font-medium text-primary" style={{ fontSize: '13px', lineHeight: 1.65 }}>
                                  {mode.beginnerTakeaway}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '16px' }}>
                  <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
                    Reflect after this path
                  </p>
                  <p className="font-serif italic text-[14px] text-secondary leading-[1.75]">
                    {path.reflectionQuestion}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
