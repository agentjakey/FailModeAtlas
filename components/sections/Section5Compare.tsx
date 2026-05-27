import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead } from '@/components/ui/Typography'
import { CompareConcepts } from '@/components/visualizations/CompareConcepts'

export function Section5Compare() {
  return (
    <SectionWrapper id="compare" label="Compare Concepts">
      <SectionHeading n={5}>Compare Concepts</SectionHeading>
      <Lead>
        Select any two failure modes to see their definitions, analogies, and examples side by
        side. Where a direct relationship exists in the graph, it is shown explicitly.
      </Lead>
      <CompareConcepts />
    </SectionWrapper>
  )
}
