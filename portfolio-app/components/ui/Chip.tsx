interface ChipProps {
  label: string
  accent?: boolean
}

export default function Chip({ label, accent = false }: ChipProps) {
  return (
    <span
      className="chip"
      style={accent ? { borderColor: 'rgba(77,139,255,0.35)', color: 'var(--accent-hex)' } : undefined}
    >
      {label}
    </span>
  )
}
