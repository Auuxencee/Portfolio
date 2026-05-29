'use client'

const NAME_WORDS = ['Auxence', 'Massieux']
const META = [
  { label: 'Focus',      value: 'AppSec · PQC' },
  { label: 'Discipline', value: 'Pentest · PKI · Risk' },
  { label: 'Stack',      value: 'Java · Python · TS' },
  { label: 'Studies',    value: 'Mines Saint-Étienne' },
]

export default function HeroSection() {
  return (
    <section id="hero" className="hero" data-section="hero">
      <div className="shell">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="bar" />
            <span>Portfolio · MMXXVI · v1.0</span>
            <span style={{ marginLeft: 'auto', color: 'var(--silver-3)' }}>
              48.857°N · 2.352°E
            </span>
          </div>

          <h1 className="hero-name" aria-label="Auxence Massieux">
            {NAME_WORDS.map((word, wi) => (
              <span className="word" key={wi}>
                {word.split('').map((ch, ci) => (
                  <span
                    className="letter"
                    key={ci}
                    style={{ animationDelay: `${0.3 + (wi * word.length + ci) * 0.035}s` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-tagline">
            <span className="accent">Cybersecurity Engineer</span> &amp; Secure Software Developer.
            Designing resilient architectures, post-quantum primitives, and the quiet infrastructure of trust.
          </p>

          <div className="hero-meta">
            {META.map((m) => (
              <div className="hero-meta-cell" key={m.label}>
                <div className="label">{m.label}</div>
                <div className="value">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroOrbital />
      </div>

      <div className="hero-scroll-hint">
        <span className="line" />
        <span>Scroll to enter</span>
      </div>
    </section>
  )
}

function HeroOrbital() {
  const rings = [120, 170, 220, 270]
  const satellites = [
    { r: 170, a: 30 }, { r: 220, a: 110 }, { r: 170, a: 220 },
    { r: 270, a: 290 }, { r: 120, a: 80 },
  ]

  return (
    <div
      className="hero-orbital"
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 'calc(var(--gutter) * -0.4)',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(380px, 38vw, 620px)',
        height: 'clamp(380px, 38vw, 620px)',
        pointerEvents: 'none',
        opacity: 0,
        animation: 'heroOrbIn 2s cubic-bezier(0.16,1,0.3,1) 0.6s forwards',
        mixBlendMode: 'multiply',
      }}
    >
      <svg viewBox="0 0 600 600" width="100%" height="100%">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(29,85,224,0.55)" />
            <stop offset="40%" stopColor="rgba(29,85,224,0.2)" />
            <stop offset="100%" stopColor="rgba(29,85,224,0)" />
          </radialGradient>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(29,85,224,0)" />
            <stop offset="50%" stopColor="rgba(29,85,224,0.35)" />
            <stop offset="100%" stopColor="rgba(29,85,224,0)" />
          </linearGradient>
        </defs>

        {rings.map((r, i) => (
          <g
            key={r}
            style={{
              transformOrigin: '300px 300px',
              animation: `orbSpin ${80 + i * 30}s linear infinite`,
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }}
          >
            <circle cx="300" cy="300" r={r} fill="none" stroke="rgba(29,85,224,0.08)" strokeWidth="1" />
            <circle cx="300" cy="300" r={r} fill="none" stroke="url(#ring)" strokeWidth="1.2"
              strokeDasharray={`${r * 0.3} ${r * 5}`} />
          </g>
        ))}

        {satellites.map((p, i) => {
          const x = 300 + Math.cos((p.a * Math.PI) / 180) * p.r
          const y = 300 + Math.sin((p.a * Math.PI) / 180) * p.r
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="rgba(29,85,224,0.75)" />
              <circle cx={x} cy={y} r="10" fill="rgba(29,85,224,0.12)" />
            </g>
          )
        })}

        <circle cx="300" cy="300" r="60" fill="url(#core)" />
        <circle cx="300" cy="300" r="22" fill="none" stroke="rgba(29,85,224,0.3)" strokeWidth="1" />
        <circle cx="300" cy="300" r="3" fill="rgba(29,85,224,0.8)" />

        <text x="50" y="40" fill="rgba(100,110,130,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
          SYS · TOPOLOGY · 06
        </text>
        <text x="50" y="570" fill="rgba(100,110,130,0.35)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
          NODE INTEGRITY · OK
        </text>
        <text x="430" y="570" fill="rgba(100,110,130,0.35)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
          PQ-CHANNEL · STABLE
        </text>
      </svg>
    </div>
  )
}
