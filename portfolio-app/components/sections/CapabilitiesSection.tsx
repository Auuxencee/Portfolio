'use client'
import { useRef } from 'react'
import SectionTag from '@/components/ui/SectionTag'
import { capabilities } from '@/data/capabilities'

export default function CapabilitiesSection() {
  return (
    <section id="expertise" className="section" data-section="expertise">
      <div className="shell">
        <SectionTag num="02" label="Expertise" />

        <div className="reveal" style={{ marginBottom: 64 }}>
          <h2 className="display display-l" style={{ maxWidth: '18ch', margin: 0 }}>
            Security is invisible<br />
            <span style={{ color: 'var(--silver-2)' }}>until it fails.</span>
          </h2>
          <p className="body-l" style={{ maxWidth: 560, marginTop: 28 }}>
            Five domains I work in — from the application layer down to the cryptographic
            foundations that make trust possible.
          </p>
        </div>

        <div className="caps-grid reveal-stagger">
          {capabilities.map((cap) => (
            <CapCard key={cap.n} {...cap} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapCard({ n, title, desc, span, vis }: typeof capabilities[number]) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className={`cap ${span}`} ref={ref} onMouseMove={onMove}>
      <div className="cap-num">{n}</div>
      <h3 className="cap-title">{title}</h3>
      <p className="cap-desc">{desc}</p>
      <div className="cap-vis">
        <CapVisualization type={vis} />
      </div>
      <div className="cap-glow" />
    </div>
  )
}

function CapVisualization({ type }: { type: string }) {
  switch (type) {
    case 'shield': return <CapVisShield />
    case 'scan':   return <CapVisScan />
    case 'flow':   return <CapVisFlow />
    case 'pki':    return <CapVisPKI />
    case 'lattice':return <CapVisLattice />
    default:       return null
  }
}

function CapVisShield() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(77,139,255,0.4)" />
          <stop offset="1" stopColor="rgba(77,139,255,0)" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <path key={i}
          d={`M${160 - 40 + i * 4} ${20 + i * 6} L${160 + 40 - i * 4} ${20 + i * 6} L${160 + 40 - i * 4} ${60} Q ${160} ${100 + i * 2} ${160 - 40 + i * 4} ${60} Z`}
          fill="none" stroke={`rgba(255,255,255,${0.18 - i * 0.05})`} strokeWidth="1" />
      ))}
      <path d="M160 25 L195 25 L195 60 Q160 95 125 60 Z" fill="url(#shg)" opacity="0.7" />
      <text x="160" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(220,230,250,0.7)" letterSpacing="2">
        OWASP · A1—A10
      </text>
    </svg>
  )
}

function CapVisScan() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 20 + i * 12
        const open = [3, 7, 12, 18].includes(i)
        const ports = [22, 80, 443, 8080]
        return (
          <g key={i}>
            <rect x={x} y={40} width="6" height="24" rx="1"
              fill={open ? 'rgba(77,139,255,0.5)' : 'rgba(255,255,255,0.05)'}
              stroke={open ? 'rgba(120,170,255,0.8)' : 'rgba(255,255,255,0.12)'}
              strokeWidth="0.5" />
            {open && (
              <text x={x + 3} y={32} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(120,170,255,0.8)">
                {ports[[3, 7, 12, 18].indexOf(i)]}
              </text>
            )}
          </g>
        )
      })}
      <line x1="20" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 4" />
      <text x="20" y="100" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(180,190,205,0.5)" letterSpacing="2">
        PORT · SWEEP · 0—65535
      </text>
    </svg>
  )
}

function CapVisFlow() {
  const nodes = [
    { x: 30, y: 60 }, { x: 90, y: 30 }, { x: 90, y: 90 },
    { x: 160, y: 30 }, { x: 160, y: 90 }, { x: 230, y: 60 }, { x: 290, y: 60 },
  ]
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {nodes.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="10" fill="rgba(20,28,40,0.9)" stroke="rgba(180,200,230,0.4)" strokeWidth="0.8" />
          <circle cx={p.x} cy={p.y} r="3" fill="rgba(220,230,250,0.7)" />
        </g>
      ))}
      <g stroke="rgba(77,139,255,0.4)" strokeWidth="1" fill="none">
        <line x1="30" y1="60" x2="90" y2="30" /><line x1="30" y1="60" x2="90" y2="90" />
        <line x1="90" y1="30" x2="160" y2="30" /><line x1="90" y1="90" x2="160" y2="90" />
        <line x1="160" y1="30" x2="230" y2="60" /><line x1="160" y1="90" x2="230" y2="60" />
        <line x1="230" y1="60" x2="290" y2="60" />
      </g>
      <circle r="2" fill="#a8c8ff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M30 60 L90 30 L160 30 L230 60 L290 60" />
      </circle>
    </svg>
  )
}

function CapVisPKI() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      <g stroke="rgba(255,255,255,0.15)" fill="none">
        <line x1="160" y1="20" x2="80" y2="60" /><line x1="160" y1="20" x2="160" y2="60" />
        <line x1="160" y1="20" x2="240" y2="60" /><line x1="80" y1="60" x2="50" y2="100" />
        <line x1="80" y1="60" x2="110" y2="100" /><line x1="240" y1="60" x2="210" y2="100" />
        <line x1="240" y1="60" x2="270" y2="100" />
      </g>
      <rect x="142" y="10" width="36" height="18" rx="2" fill="rgba(77,139,255,0.18)" stroke="rgba(77,139,255,0.7)" />
      <text x="160" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(220,230,250,0.9)">ROOT</text>
      {[80, 160, 240].map((x, i) => (
        <g key={i}>
          <rect x={x - 16} y={52} width="32" height="14" rx="2" fill="rgba(20,28,40,0.9)" stroke="rgba(180,200,230,0.3)" />
          <text x={x} y={62} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(180,200,230,0.7)">CA·{i + 1}</text>
        </g>
      ))}
      {[50, 110, 210, 270].map((x, i) => (
        <rect key={i} x={x - 12} y={92} width="24" height="12" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />
      ))}
    </svg>
  )
}

function CapVisLattice() {
  return (
    <svg viewBox="0 0 320 120" width="100%" height="100%">
      {Array.from({ length: 9 }).map((_, c) =>
        Array.from({ length: 5 }).map((_, r) => (
          <circle key={`${c}-${r}`} cx={40 + c * 30} cy={20 + r * 18} r="1.2" fill="rgba(180,200,230,0.4)" />
        ))
      )}
      <line x1="160" y1="56" x2="220" y2="38" stroke="rgba(77,139,255,0.8)" strokeWidth="1.4" />
      <line x1="160" y1="56" x2="190" y2="92" stroke="rgba(180,210,255,0.7)" strokeWidth="1.4" />
      <circle cx="160" cy="56" r="3" fill="#fff" />
      <text x="226" y="36" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(180,200,230,0.7)">b₁</text>
      <text x="194" y="98" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(180,200,230,0.7)">b₂</text>
      <text x="40" y="112" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(180,190,205,0.5)" letterSpacing="2">
        LATTICE · ℤⁿ · LWE
      </text>
    </svg>
  )
}
