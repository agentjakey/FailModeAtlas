import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead } from '@/components/ui/Typography'

interface ResourceItem {
  title: string
  description: string
  type: 'path' | 'read' | 'explore'
}

const NONTECHNICAL_RESOURCES: ResourceItem[] = [
  {
    title: 'Start with Objectives Gone Wrong',
    description: 'The first learning path introduces reward hacking and specification gaming through toy examples. No math required.',
    type: 'path',
  },
  {
    title: 'Read: The Alignment Problem (Brian Christian)',
    description: 'The most accessible book-length treatment of why getting AI to do what we want is harder than it looks.',
    type: 'read',
  },
  {
    title: 'Explore the Atlas map',
    description: 'Click through nodes to get a feel for the landscape before reading any definition closely.',
    type: 'explore',
  },
  {
    title: 'Try the Failure Mode Cards with "All families" + "Foundational"',
    description: 'Filter to foundational difficulty and read the beginner takeaway for each card.',
    type: 'explore',
  },
]

const TECHNICAL_RESOURCES: ResourceItem[] = [
  {
    title: 'Start with Evaluation Not Safety',
    description: 'Covers sandbagging, evaluation gaming, and deceptive alignment. Assumes comfort with the idea of training objectives.',
    type: 'path',
  },
  {
    title: 'Read: Concrete Problems in AI Safety (Amodei et al., 2016)',
    description: 'The canonical paper that formalized reward hacking, safe exploration, and scalable oversight. arXiv:1606.06565.',
    type: 'read',
  },
  {
    title: 'Read: Risks from Learned Optimization (Hubinger et al., 2019)',
    description: 'Introduces mesa-optimization and deceptive alignment. arXiv:1906.01820.',
    type: 'read',
  },
  {
    title: 'Compare: Reward Hacking vs. Specification Gaming',
    description: 'Use the Compare Concepts tool to see where these two closely related modes differ.',
    type: 'explore',
  },
]

const RESEARCHER_RESOURCES: ResourceItem[] = [
  {
    title: 'Start with Hard Boundaries',
    description: 'The fifth learning path covers power-seeking, corrigibility failure, and instrumental convergence. Intended for readers already familiar with basic alignment concepts.',
    type: 'path',
  },
  {
    title: 'Read: Scalable Oversight (Christiano et al.)',
    description: 'Core motivation for the monitoring and evaluation failure modes in this atlas.',
    type: 'read',
  },
  {
    title: 'Read: Goal Misgeneralization (Langosco et al., 2022)',
    description: 'arXiv:2105.14111. Direct source for the goal_misgeneralization entry.',
    type: 'read',
  },
  {
    title: 'Critique the taxonomy',
    description: 'If you disagree with a family assignment or a relationship edge, open an issue. The graph is a first draft.',
    type: 'explore',
  },
]

const TYPE_LABELS: Record<ResourceItem['type'], string> = {
  path: 'learning path',
  read: 'reading',
  explore: 'explore',
}

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <div
      className="border border-border rounded"
      style={{ background: '#FFFFFF', padding: '16px 18px' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-mono text-[10px] text-accent tracking-widest uppercase"
          style={{ whiteSpace: 'nowrap' }}
        >
          {TYPE_LABELS[item.type]}
        </span>
      </div>
      <p className="font-sans font-medium text-primary" style={{ fontSize: '14px', marginBottom: '6px', lineHeight: 1.4 }}>
        {item.title}
      </p>
      <p className="font-sans text-[12px] text-secondary leading-[1.65]">
        {item.description}
      </p>
    </div>
  )
}

function AudienceColumn({
  label,
  description,
  resources,
}: {
  label: string
  description: string
  resources: ResourceItem[]
}) {
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <p className="font-sans font-semibold text-primary" style={{ fontSize: '15px', marginBottom: '4px' }}>
          {label}
        </p>
        <p className="font-sans text-[13px] text-secondary leading-[1.6]">{description}</p>
      </div>
      <div className="flex flex-col gap-3">
        {resources.map((item) => (
          <ResourceCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  )
}

export function Section9StartHere() {
  return (
    <SectionWrapper id="start" label="Start Here">
      <SectionHeading n={9}>Start Here</SectionHeading>
      <Lead>
        Different readers will get the most out of different parts of this atlas. Here are starting
        points tailored to where you are.
      </Lead>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <AudienceColumn
          label="If you are new to AI safety"
          description="No technical background needed. Start with the concepts, not the math."
          resources={NONTECHNICAL_RESOURCES}
        />
        <AudienceColumn
          label="If you build or study ML systems"
          description="You have the background to go deeper on the mechanics of each failure mode."
          resources={TECHNICAL_RESOURCES}
        />
        <AudienceColumn
          label="If you research AI alignment"
          description="Use this as a teaching reference or a prompt for disagreement."
          resources={RESEARCHER_RESOURCES}
        />
      </div>

      <div
        className="border border-border rounded"
        style={{ background: '#F2F0EB', padding: '28px 32px', marginTop: '32px' }}
      >
        <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">
          Feedback
        </p>
        <p className="font-sans text-[14px] text-secondary leading-[1.75]">
          This atlas is a draft. If you find an error, a missing concept, or a framing that seems
          wrong, the most useful thing you can do is say so. Open an issue on GitHub or reach out
          directly. The goal is accuracy, not elegance.
        </p>
      </div>
    </SectionWrapper>
  )
}
