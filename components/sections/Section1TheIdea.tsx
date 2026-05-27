import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Prose, SectionHeading, Callout, H3 } from '@/components/ui/Typography'
import { CareNote } from '@/components/ui/CareNote'
import { MetricCard } from '@/components/ui/MetricCard'
import { FAILURE_MODES } from '@/src/data/failureModes'
import { LEARNING_PATHS } from '@/src/data/learningPaths'
import { RELATIONSHIPS } from '@/src/data/relationships'

export function Section1TheIdea() {
  const families = new Set(FAILURE_MODES.map((m) => m.family)).size
  return (
    <SectionWrapper id="the-idea" label="The Idea">
      <SectionHeading n={1}>The Idea</SectionHeading>

      <Prose>
        <p>
          AI systems fail. Sometimes they fail in obvious ways: the wrong answer, the crashed
          program. But many of the failure modes that safety researchers study are subtler. They
          involve systems that are performing well by every metric while failing in ways the metrics
          cannot see.
        </p>
        <p>
          I started building this because I kept encountering the same terms without a clear sense
          of how they related. Reward hacking and specification gaming felt similar. Deceptive
          alignment and sandbagging felt connected. Distribution shift and goal misgeneralization
          seemed like the same idea described at different levels of abstraction.
        </p>
        <p>
          This atlas tries to make those connections visible. It is organized around twenty-two
          failure modes, grouped into six families, with edges showing conceptual relationships.
          The layout is educational, not empirical. The geometry is designed to help you orient,
          not to make claims about the structure of the real problem.
        </p>
      </Prose>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-10">
        <MetricCard label="Failure modes" value={FAILURE_MODES.length} />
        <MetricCard label="Families" value={families} />
        <MetricCard label="Relationships" value={RELATIONSHIPS.length} />
        <MetricCard label="Learning paths" value={LEARNING_PATHS.length} />
      </div>

      <div style={{ marginTop: '40px', marginBottom: '8px' }}>
        <H3>What this is not</H3>
      </div>

      <Prose>
        <p>
          This is not a safety benchmark. It does not score systems. It does not classify inputs
          as safe or unsafe. It does not represent the internal architecture of any deployed AI
          system. The descriptions are educational summaries grounded in the research literature,
          not ground truth about any specific model.
        </p>
        <p>
          Several of the failure modes described here (deceptive alignment, instrumental
          convergence, corrigibility failure) are theoretical concerns about future or sufficiently
          capable systems, not confirmed empirical findings in current deployed models. The atlas
          treats these with the appropriate epistemic status: important to understand, speculative in
          their current applicability.
        </p>
      </Prose>

      <CareNote>
        This map is not the territory. The categories are one useful way to organize the space,
        not the only way, and not a claim about where the real boundaries are. Safety researchers
        actively disagree about taxonomy. This is a starting point for learning, open to
        correction.
      </CareNote>

      <Callout variant="info">
        The map is meant to help you ask better questions, not decide what a system is doing. Use
        it as a vocabulary reference and a starting point for reading, not a diagnostic tool.
      </Callout>
    </SectionWrapper>
  )
}
