import { AUTHOR, GITHUB_URL, LAST_UPDATED, SIBLING_PROJECTS, UCSD_URL, KOFI_URL } from '@/lib/config'

export function Footer() {
  const linkStyle = {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(92, 90, 84, 0.45)',
    textUnderlineOffset: '2px',
  } as React.CSSProperties

  return (
    <footer className="border-t border-border">
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <p
              className="font-mono text-[11px] text-accent tracking-widest uppercase"
              style={{ marginBottom: '14px' }}
            >
              About
            </p>
            <p className="font-serif text-[16px] text-secondary leading-[1.8]">
              Built by{' '}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {AUTHOR}
              </a>{' '}
              as a learning tool and public-interest resource. The failure modes are educational
              descriptions grounded in the AI safety literature. This is not a safety oracle,
              a classifier, or a benchmark.
            </p>
          </div>

          <div>
            <p
              className="font-mono text-[11px] text-accent tracking-widest uppercase"
              style={{ marginBottom: '14px' }}
            >
              Sibling Projects
            </p>
            <div className="flex flex-col gap-3">
              {SIBLING_PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] text-secondary hover:text-primary transition-colors"
                  style={{
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(92, 90, 84, 0.35)',
                    textUnderlineOffset: '2px',
                  }}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mb-8">
          <p
            className="font-mono text-[11px] text-accent tracking-widest uppercase"
            style={{ marginBottom: '14px' }}
          >
            About this project
          </p>
          <p className="font-sans text-[14px] text-secondary leading-[1.75]" style={{ marginBottom: '10px' }}>
            Built as a learning tool and technical portfolio piece by{' '}
            <a href="https://www.linkedin.com/in/jacob-ortiz-ab6421348/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Jacob Ortiz
            </a>
            , a physics student at{' '}
            <a href={UCSD_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              UCSD
            </a>
            {' '}working on AI safety, interpretability, and ML research.
          </p>
          <p className="font-sans text-[14px] text-secondary leading-[1.75]" style={{ marginBottom: '10px' }}>
            Interactive visualizations run in the browser using toy models and illustrative demos.
            They are not reproductions of frontier model behavior.
          </p>
          <p className="font-sans text-[14px] text-secondary leading-[1.75]" style={{ marginBottom: '14px' }}>
            Citations link to original papers where available.
          </p>
          <p className="font-sans text-[13px] text-secondary leading-[1.7]">
            If this was useful, you can{' '}
            <a href={KOFI_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              support my work on Ko-fi
            </a>
            .
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <p
            className="font-serif italic text-[14px] text-[#8A8880] leading-[1.7] mb-4"
            style={{ maxWidth: '560px' }}
          >
            Part of a broader effort to learn AI safety in public, make difficult concepts more
            accessible, and invite careful feedback. The map is not the territory, but it can help
            you ask better questions.
          </p>
          <p className="font-mono text-[11px] text-[#8A8880]">
            Last updated: {LAST_UPDATED} &middot; MIT License &middot; Errors are mine.
          </p>
        </div>
      </div>
    </footer>
  )
}
