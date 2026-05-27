import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading, Lead, Callout } from '@/components/ui/Typography'
import { CareNote } from '@/components/ui/CareNote'

function PolicyBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">{title}</p>
      <div className="font-sans text-[14px] text-secondary leading-[1.75]">{children}</div>
    </div>
  )
}

export function Section7Safety() {
  return (
    <SectionWrapper id="safety" label="Safety Policy">
      <SectionHeading n={7}>Safety Policy</SectionHeading>
      <Lead>
        This project exists to help people understand AI failure modes, not to enable them. The
        following policy describes how that boundary was drawn and why it matters.
      </Lead>

      <CareNote>
        Every example in this atlas was reviewed for safety. If you believe any content could
        cause harm or be misused, please open an issue or contact the author directly.
      </CareNote>

      <div
        className="border border-border rounded"
        style={{ background: '#FFFFFF', padding: '28px 32px', marginTop: '24px' }}
      >
        <PolicyBlock title="Intended use">
          <p>
            Failure Mode Atlas is designed for learning. It is appropriate for anyone who wants to
            develop a clearer mental model of how AI systems can behave unexpectedly: students,
            researchers, engineers, policy writers, and curious non-experts.
          </p>
        </PolicyBlock>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <PolicyBlock title="Not intended for">
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>Auditing or certifying any specific AI system</li>
              <li>Diagnosing whether a deployed model has a given failure mode</li>
              <li>Benchmarking model safety or alignment</li>
              <li>Use as a compliance checklist or legal document</li>
              <li>Any adversarial purpose, including crafting inputs to trigger specific failures</li>
            </ul>
          </PolicyBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <PolicyBlock title="What this project does not claim">
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>The taxonomy is not exhaustive or official</li>
              <li>The relationship graph is editorial judgment, not empirical measurement</li>
              <li>The cluster positions in the atlas do not encode semantic distance</li>
              <li>No failure mode description constitutes a complete technical account</li>
              <li>This is not affiliated with any AI lab, regulatory body, or standards organization</li>
            </ul>
          </PolicyBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <PolicyBlock title="Content choices">
            <p style={{ marginBottom: '12px' }}>
              All examples are fictional, harmless, and designed to illustrate the concept without
              providing actionable harm. Specifically, this project does not include:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>Real or plausible jailbreak prompts</li>
              <li>Specific exploit techniques or attack chains</li>
              <li>Biosecurity, weapons, or mass-harm adjacent content</li>
              <li>Fraud, manipulation, or social engineering guidance</li>
              <li>Instructions that could be extracted and applied directly</li>
            </ul>
            <p style={{ marginTop: '12px' }}>
              Where a failure mode is inherently sensitive (prompt injection, data poisoning), the
              example shows the structure of the problem with a toy scenario rather than a realistic
              attack.
            </p>
          </PolicyBlock>
        </div>

        <div style={{ borderTop: '1px solid #E4E2DB', paddingTop: '24px' }}>
          <PolicyBlock title="Corrections and feedback">
            <p>
              This atlas is a personal learning project and will contain errors. If you notice a
              factual mistake, a missing failure mode, or a framing that seems off, please open an
              issue on GitHub or email the author. The goal is to get this right, not to defend any
              particular version of it.
            </p>
          </PolicyBlock>
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Callout variant="info">
          This project is open to corrections. Nothing here is final. If you are an AI safety
          researcher and you think a categorization is wrong, that is valuable signal.
        </Callout>
      </div>
    </SectionWrapper>
  )
}
