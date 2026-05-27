'use client'

interface SearchBoxProps {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder = 'Search...' }: SearchBoxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-border rounded font-sans text-[14px] text-primary placeholder:text-[#8A8880] focus:outline-none focus:border-secondary transition-colors"
      style={{
        background: '#FFFFFF',
        padding: '10px 14px',
      }}
    />
  )
}
