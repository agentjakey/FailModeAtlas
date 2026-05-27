import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead, Callout } from '@/components/ui/Typography'
import { FAILURE_MODES } from '@/src/data/failureModes'
import { RELATIONSHIPS } from '@/src/data/relationships'

function MethodBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">{title}</p>
      <div className="font-sans text-[14px] text-secondary leading-[1.75]">{children}</div>
    </div>
  )
}

export function Section8Methods() {
  return (
    <SectionWrapper id="methods" label="Methods">
      <SectionHeading n={8}>Methods</SectionHeading>
      <Lead>
        How this atlas was built, what choices were made, and what those choices mean for how you
        should interpret it.
      </Lead>

      <div
        className="border border-border rounded"
        style={{ background: '#FFFFFF', padding: '28px 32px', marginTop: '8px' }}
      >
        <MethodBlock title="Taxonomy construction">
          <p>
            The {FAILURE_MODES.length} failure modes were selected from the AI safety and alignment literature, focusing
            on concepts that appear repeatedly across multiple research threads and that have clear
            educational value for non-experts. The six-family grouping is editorial: it reflects
            where problems originate in a simplified pipeline (objective specification, oversight,
            deployment, interaction, representation, governance) rather than any formal ontology.
          </p>
        </MethodBlock>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <MethodBlock title="Safe examples">
            <p>
              Each example was written or adapted specifically for this project. The goal was to
              illustrate the mechanism of the failure mode using a fictional, low-stakes scenario.
              No example was taken from a real AI system incident without significant abstraction.
              Examples were chosen to be memorable rather than comprehensive.
            </p>
          </MethodBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <MethodBlock title="Relationship graph">
            <p>
              The {RELATIONSHIPS.length} edges in the graph represent cases where two failure modes share a meaningful
              conceptual relationship: one can cause the other, both are instances of a more general
              pattern, or understanding one helps explain the other. Strength scores (1-5) reflect
              how direct and well-established the relationship is in the literature. These are
              estimates, not measurements.
            </p>
          </MethodBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <MethodBlock title="Atlas layout">
            <p>
              Node positions in the atlas were pre-computed to place each family in a distinct
              region of the canvas and to keep related nodes close. This is a teaching aid, not an
              embedding. The distance between two nodes does not encode semantic similarity. A
              real similarity map would require running a language model over all definitions, which
              is not done here and would add more noise than signal at this scale.
            </p>
          </MethodBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <MethodBlock title="Why no live inference">
            <p style={{ marginBottom: '12px' }}>
              This project deliberately uses no runtime API calls. There are three reasons:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>Static data is reproducible and auditable in a way that live inference is not</li>
              <li>Adding a model would introduce failure modes into a project about failure modes</li>
              <li>
                The educational goal is to build your own mental model, not to defer to a model&apos;s
                answers
              </li>
            </ul>
          </MethodBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <MethodBlock title="Limitations">
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>The taxonomy misses many failure modes, especially in emerging agentic systems</li>
              <li>
                Family assignments are sometimes ambiguous; a mode could reasonably belong to
                multiple families
              </li>
              <li>The relationship graph is incomplete; many real edges are missing</li>
              <li>All examples are simplified and may not capture the full complexity of the failure</li>
              <li>Difficulty ratings are rough estimates that may not match your background</li>
              <li>The atlas has not been peer-reviewed</li>
            </ul>
          </MethodBlock>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Callout variant="warning">
          This atlas reflects one person&apos;s reading of the AI safety literature as of May 2026. It
          is not a consensus document. Treat it as a starting point, not a reference.
        </Callout>
      </div>
    </SectionWrapper>
  )
}
