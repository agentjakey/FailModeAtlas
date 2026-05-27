import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead } from '@/components/ui/Typography'
import { FailureModeCards } from '@/components/visualizations/FailureModeCards'

export function Section4Cards() {
  return (
    <SectionWrapper id="cards" label="Failure Mode Cards">
      <SectionHeading n={4}>Failure Mode Cards</SectionHeading>
      <Lead>
        Each card covers one failure mode in depth: its definition, a plain-language analogy, why
        it matters, a safe example, and a reflection question. Filter by family or difficulty to
        find what you need.
      </Lead>
      <FailureModeCards />
    </SectionWrapper>
  )
}
