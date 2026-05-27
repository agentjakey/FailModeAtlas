import { AUTHOR, GITHUB_URL, LAST_UPDATED, SIBLING_PROJECTS } from '@/lib/config'

export function Footer() {
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
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(92, 90, 84, 0.45)',
                  textUnderlineOffset: '2px',
                }}
              >
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
