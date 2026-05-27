'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead } from '@/components/ui/Typography'
import { AtlasMap } from '@/components/visualizations/AtlasMap'
import { SelectedConceptPanel } from '@/components/visualizations/SelectedConceptPanel'
import { CareNote } from '@/components/ui/CareNote'
import { getFailureModeById } from '@/src/data/failureModes'
import type { FailureMode } from '@/src/types'

export function Section3Atlas() {
  const [selected, setSelected] = useState<FailureMode | null>(null)

  function handleSelectById(id: string) {
    const mode = getFailureModeById(id)
    setSelected(mode ?? null)
  }

  return (
    <SectionWrapper id="atlas" label="The Atlas" fullWidth>
      <div className="max-w-[720px] mx-auto px-6 mb-10">
        <SectionHeading n={3}>The Atlas</SectionHeading>
        <Lead>
          Twenty-two failure modes, six families, and the conceptual edges between them. Click any
          node to read its definition, analogy, and connections.
        </Lead>
        <CareNote>
          This map is meant to help you ask better questions, not to decide what a system is
          doing. Distance and layout are teaching aids. The clusters represent editorial judgment,
          not empirical measurement.
        </CareNote>
      </div>

      <div
        className="w-full px-6"
        style={{ maxWidth: '1060px', margin: '0 auto' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <AtlasMap
            onSelect={setSelected}
            selectedId={selected?.id ?? null}
          />

          <div>
            {selected ? (
              <SelectedConceptPanel
                mode={selected}
                onSelectMode={handleSelectById}
              />
            ) : (
              <div
                className="border border-border rounded flex items-center justify-center"
                style={{ background: '#F2F0EB', minHeight: '200px', padding: '32px 24px' }}
              >
                <p
                  className="font-serif italic text-secondary text-center"
                  style={{ fontSize: '16px', lineHeight: 1.7 }}
                >
                  Click any point on the map to read its definition, analogy, and connections.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
