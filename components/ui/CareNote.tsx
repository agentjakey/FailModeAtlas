import { ReactNode } from 'react'

interface CareNoteProps {
  children: ReactNode
  icon?: string
}

export function CareNote({ children, icon = '~' }: CareNoteProps) {
  return (
    <div
      className="border border-border rounded"
      style={{
        background: '#F2F0EB',
        padding: '16px 20px',
        margin: '24px 0',
      }}
    >
      <p
        className="font-mono text-accent"
        style={{ fontSize: '11px', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase' }}
      >
        {icon} Care note
      </p>
      <div className="font-sans text-[14px] leading-[1.7] text-secondary">{children}</div>
    </div>
  )
}
