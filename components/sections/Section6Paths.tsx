import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead } from '@/components/ui/Typography'
import { LearningPaths } from '@/components/visualizations/LearningPaths'

export function Section6Paths() {
  return (
    <SectionWrapper id="paths" label="Learning Paths">
      <SectionHeading n={6}>Learning Paths</SectionHeading>
      <Lead>
        Five curated sequences that group failure modes into coherent themes. Each path takes
        roughly 20 to 30 minutes and ends with a reflection question designed to help you
        connect the concepts to systems you already know.
      </Lead>
      <LearningPaths />
    </SectionWrapper>
  )
}
