import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Prose, SectionHeading, H3 } from '@/components/ui/Typography'
import { FAMILY_META } from '@/src/data/failureModes'

function FamilyBlock({ color, label, description }: { color: string; label: string; description: string }) {
  return (
    <div
      className="border border-border rounded"
      style={{ background: '#FFFFFF', padding: '20px 24px', marginBottom: '12px' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '2px',
            backgroundColor: color,
            flexShrink: 0,
          }}
        />
        <p className="font-sans font-semibold text-primary" style={{ fontSize: '15px' }}>
          {label}
        </p>
      </div>
      <p className="font-sans text-[14px] text-secondary leading-[1.7]">{description}</p>
    </div>
  )
}

const TERMS = [
  {
    term: 'Failure mode',
    definition:
      'A category of ways an AI system can fail to behave as intended. A failure mode is a pattern, not a single incident.',
  },
  {
    term: 'Reward signal',
    definition:
      'A numerical score used during reinforcement learning training to tell a system whether it is doing well. Reward signals are approximations of the underlying goal.',
  },
  {
    term: 'Proxy',
    definition:
      'A measurable quantity used as a stand-in for a harder-to-measure goal. Proxies work until they are optimized against.',
  },
  {
    term: 'Distribution',
    definition:
      'The range of inputs a model was trained on. When deployment inputs come from a different distribution, performance can degrade silently.',
  },
  {
    term: 'Mesa-optimization',
    definition:
      'A situation where a model trained by gradient descent develops an internal optimizer that pursues its own objective — which may differ from the training objective.',
  },
  {
    term: 'RLHF',
    definition:
      'Reinforcement Learning from Human Feedback. A training method where human preference ratings are used to train a reward model, which is then used to fine-tune a language model.',
  },
  {
    term: 'Corrigibility',
    definition:
      'The property of being safely correctable. A corrigible system can be modified, retrained, or shut down without resistance.',
  },
  {
    term: 'Instrumental goal',
    definition:
      'A sub-goal that is useful for achieving a primary goal. Many primary goals share the same instrumental goals — resource acquisition, self-preservation, goal preservation.',
  },
]

export function Section2Vocabulary() {
  return (
    <SectionWrapper id="vocabulary" label="The Vocabulary">
      <SectionHeading n={2}>The Vocabulary</SectionHeading>

      <Prose>
        <p>
          AI safety has a specialized vocabulary. Many terms are used loosely or interchangeably
          in public discussion but have more precise meanings in the research literature. This
          section defines the terms used in this atlas.
        </p>
      </Prose>

      <div style={{ marginTop: '40px', marginBottom: '8px' }}>
        <H3>Six families</H3>
      </div>

      <p className="font-sans text-[14px] text-secondary leading-[1.7]" style={{ marginBottom: '20px' }}>
        The failure modes in this atlas are grouped into six families based on the type of failure.
        These are useful categories, not rigid boundaries — many failure modes span families.
      </p>

      {FAMILY_META.map((f) => (
        <FamilyBlock key={f.key} color={f.color} label={f.label} description={f.description} />
      ))}

      <div style={{ marginTop: '48px', marginBottom: '8px' }}>
        <H3>Key terms</H3>
      </div>

      <div className="space-y-0">
        {TERMS.map((t, i) => (
          <div
            key={t.term}
            style={{
              padding: '16px 0',
              borderBottom: i < TERMS.length - 1 ? '1px solid #E4E2DB' : 'none',
            }}
          >
            <p className="font-sans font-semibold text-primary" style={{ fontSize: '15px', marginBottom: '4px' }}>
              {t.term}
            </p>
            <p className="font-sans text-[14px] text-secondary leading-[1.7]">{t.definition}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
