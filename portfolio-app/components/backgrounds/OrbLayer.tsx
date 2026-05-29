const ACCENT = '#1d55e0'

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

export default function OrbLayer() {
  return (
    <div className="bg-orbs" aria-hidden="true">
      <div
        className="orb orb-1"
        style={{ background: `radial-gradient(circle, ${hexToRgba(ACCENT, 0.06)}, transparent 62%)` }}
      />
      <div
        className="orb orb-2"
        style={{ background: `radial-gradient(circle, rgba(245,180,60,0.04), transparent 65%)` }}
      />
      <div
        className="orb orb-3"
        style={{ background: `radial-gradient(circle, ${hexToRgba(ACCENT, 0.04)}, transparent 60%)` }}
      />
      <div className="bg-grain" />
      <div className="bg-vignette" />
    </div>
  )
}
